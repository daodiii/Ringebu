"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { KONTAKT } from "@/components/kontakt/data";
import { FELT, feilI, type Felt } from "@/components/kontakt/sjekk";

/**
 * Sends a message from the contact form to the clinic's inbox, by SMTP
 * through one.com with a mailbox of its own (nettside@…), so the clinic's
 * own password never reaches the site. Vercel holds the mailbox and its
 * password as SMTP_USER and SMTP_PASS. Without them `next dev` prints the
 * message instead of sending it, and a production build refuses, so a
 * missing setting shows up as the error text with the phone number rather
 * than as messages that quietly go nowhere.
 */

export type MeldingState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: Partial<Record<Felt, string>> }
  | { status: "error"; reason: "busy" | "failed" };

// A few messages per visitor in ten minutes. This lives in the memory of
// one server instance, so it slows a flood down; it is no hard limit.
const WINDOW = 10 * 60 * 1000;
const PER_WINDOW = 5;
const seen = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= PER_WINDOW) return true;
  recent.push(now);
  seen.set(ip, recent);
  if (seen.size > 5000) seen.clear();
  return false;
}

function read(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function sendMelding(_prev: MeldingState, form: FormData): Promise<MeldingState> {
  // The hidden field only a bot fills in. It is told it worked, and nothing is sent.
  if (read(form, "nettsted")) return { status: "sent" };

  const v = Object.fromEntries(FELT.map((f) => [f, read(form, f)])) as Record<Felt, string>;
  const errors: Partial<Record<Felt, string>> = {};
  for (const f of FELT) {
    const feil = feilI(f, v[f]);
    if (feil) errors[f] = feil;
  }
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "ukjent";
  if (tooMany(ip)) return { status: "error", reason: "busy" };

  const subject = `Melding fra nettsiden: ${v.navn.replace(/[\r\n]+/g, " ")}`;
  const text = `Navn: ${v.navn}\nTelefon: ${v.telefon}\nE-post: ${v.epost}\n\n${v.melding}\n`;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[kontaktskjema] SMTP_USER/SMTP_PASS mangler, så meldingen ble ikke sendt:\n${subject}\n${text}`);
      return { status: "sent" };
    }
    console.error("[kontaktskjema] SMTP_USER/SMTP_PASS mangler i produksjon");
    return { status: "error", reason: "failed" };
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  try {
    await nodemailer
      .createTransport({
        host: process.env.SMTP_HOST ?? "send.one.com",
        port,
        secure: port === 465,
        auth: { user, pass },
      })
      .sendMail({
        from: { name: "Nettsiden", address: user },
        to: process.env.SMTP_TO ?? KONTAKT.email.display,
        // The clinic answers by pressing Svar
        replyTo: { name: v.navn, address: v.epost },
        subject,
        text,
      });
    return { status: "sent" };
  } catch (err) {
    console.error("[kontaktskjema] Sending feilet", err);
    return { status: "error", reason: "failed" };
  }
}

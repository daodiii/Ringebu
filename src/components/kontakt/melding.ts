"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { KONTAKT } from "@/components/kontakt/data";

/**
 * Sends a message from the contact form to the clinic's inbox, by SMTP
 * through one.com with a mailbox of its own (nettside@…), so the clinic's
 * own password never reaches the site. Vercel holds the mailbox and its
 * password as SMTP_USER and SMTP_PASS. Without them `next dev` prints the
 * message instead of sending it, and a production build refuses, so a
 * missing setting shows up as the error text with the phone number rather
 * than as messages that quietly go nowhere.
 */

export type Felt = "navn" | "kontakt" | "melding";

export type MeldingState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: Partial<Record<Felt, string>> }
  | { status: "error"; reason: "busy" | "failed" };

const MAX = { navn: 100, kontakt: 200, melding: 4000 };

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

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function sendMelding(_prev: MeldingState, form: FormData): Promise<MeldingState> {
  // The hidden field only a bot fills in. It is told it worked, and nothing is sent.
  if (read(form, "nettsted")) return { status: "sent" };

  const navn = read(form, "navn");
  const kontakt = read(form, "kontakt");
  const melding = read(form, "melding");

  const errors: Partial<Record<Felt, string>> = {};
  if (!navn) errors.navn = "Skriv navnet ditt.";
  else if (navn.length > MAX.navn) errors.navn = "Navnet er for langt.";

  const erEpost = kontakt.includes("@");
  if (!kontakt) errors.kontakt = "Skriv telefon eller e-post, så vi kan svare deg.";
  else if (kontakt.length > MAX.kontakt) errors.kontakt = "Dette feltet er for langt.";
  else if (erEpost ? !EMAIL.test(kontakt) : kontakt.replace(/\D/g, "").length < 8)
    errors.kontakt = "Sjekk telefonnummeret eller e-posten.";

  if (!melding) errors.melding = "Skriv en melding.";
  else if (melding.length > MAX.melding) errors.melding = "Meldingen er for lang.";

  if (Object.keys(errors).length) return { status: "invalid", errors };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "ukjent";
  if (tooMany(ip)) return { status: "error", reason: "busy" };

  const subject = `Melding fra nettsiden: ${navn.replace(/[\r\n]+/g, " ")}`;
  const text = `Navn: ${navn}\n${erEpost ? "E-post" : "Telefon"}: ${kontakt}\n\n${melding}\n`;

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
        replyTo: erEpost ? { name: navn, address: kontakt } : undefined,
        subject,
        text,
      });
    return { status: "sent" };
  } catch (err) {
    console.error("[kontaktskjema] Sending feilet", err);
    return { status: "error", reason: "failed" };
  }
}

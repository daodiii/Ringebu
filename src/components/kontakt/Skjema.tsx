"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { KONTAKT } from "@/components/kontakt/data";
import { sendMelding, type MeldingState } from "@/components/kontakt/melding";
import { FELT, MAX, utfylt, type Felt, type Verdier } from "@/components/kontakt/sjekk";

/**
 * The contact form, on the front page beside «Velkommen til oss.» and on
 * /kontakt pinned to the notice board. It posts to sendMelding (melding.ts),
 * which mails it to the clinic. The fields are controlled so what the visitor
 * wrote stays put when sending fails; React empties uncontrolled fields after
 * every form action.
 */

const SOFT = "text-[rgba(14,42,48,0.74)]";
const LABEL = "block text-[14px] font-medium text-[var(--color-ink)]";
const FIELD =
  "mt-2 block w-full rounded-[12px] border border-[rgba(14,42,48,0.2)] bg-white px-4 py-3 text-[16px] leading-[1.4] text-[var(--color-ink)] transition-colors outline-none hover:border-[rgba(14,42,48,0.36)] focus:border-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] aria-[invalid=true]:border-[var(--color-urgent)]";
const LINK = "font-medium text-[var(--color-ink)] underline underline-offset-2 hover:text-[var(--color-brass)]";

const TOM: Verdier = { navn: "", telefon: "", epost: "", melding: "" };

export function Skjema({
  as: Heading = "h2",
  tittel = true,
  takk = "Takk for meldingen.",
  onSent,
  onFyll,
  className = "",
}: {
  as?: "h2" | "h3";
  /** false when the page around it already says «Send oss en melding» */
  tittel?: boolean;
  /** The first line once the message is sent */
  takk?: string;
  /** Called once the message is on its way */
  onSent?: () => void;
  /** Told what the visitor has written so far, for a picture that answers it */
  onFyll?: (verdier: Verdier, ok: Record<Felt, boolean>) => void;
  className?: string;
}) {
  const [state, action, pending] = useActionState<MeldingState, FormData>(sendMelding, { status: "idle" });
  const [values, setValues] = useState(TOM);
  const form = useRef<HTMLFormElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  // The form's height when it was sent, so the thanks keeps the room it had
  const [height, setHeight] = useState<number>();
  const id = useId();

  const errors = state.status === "invalid" ? state.errors : {};

  // After a send, move focus to what came of it: the first field to fix, or the thanks.
  useEffect(() => {
    if (state.status === "invalid") {
      const first = FELT.find((f) => state.errors[f]);
      if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    } else if (state.status === "sent") {
      done.current?.focus();
      onSent?.();
    }
  }, [state, onSent]);

  useEffect(() => {
    onFyll?.(values, utfylt(values));
  }, [values, onFyll]);

  if (state.status === "sent") {
    return (
      <div ref={done} tabIndex={-1} role="status" className={`flex flex-col justify-center outline-none ${className}`} style={{ minHeight: height }}>
        <Heading className="text-[24px] font-medium tracking-[-0.02em] text-[var(--color-ink)]">{takk}</Heading>
        <p className={`mt-3 text-[17px] leading-[1.55] ${SOFT}`}>Vi svarer deg så snart vi kan.</p>
      </div>
    );
  }

  const set = (f: Felt) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [f]: e.target.value }));

  const feil = (f: Felt) =>
    errors[f] ? (
      <p id={`${id}${f}-feil`} className="mt-1.5 text-[14px] text-[var(--color-urgent)]">
        {errors[f]}
      </p>
    ) : null;

  const felt = (f: Felt, more?: string) => ({
    name: f,
    required: true,
    maxLength: MAX[f],
    value: values[f],
    onChange: set(f),
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": [errors[f] ? `${id}${f}-feil` : "", more ?? ""].filter(Boolean).join(" ") || undefined,
  });

  return (
    <div ref={box} className={className}>
      {tittel && (
        <Heading className="mb-6 text-[24px] font-medium tracking-[-0.02em] text-[var(--color-ink)]">Send oss en melding</Heading>
      )}

      <form ref={form} action={action} noValidate onSubmit={() => setHeight(box.current?.offsetHeight)} className="@container">
        <label className={LABEL}>
          Navn
          <input autoComplete="name" className={FIELD} {...felt("navn")} />
          {feil("navn")}
        </label>

        {/* Side by side once the form itself is wide enough, wherever it sits */}
        <div className="mt-5 grid gap-x-4 gap-y-5 @md:grid-cols-2">
          <label className={LABEL}>
            Telefon
            <input type="tel" autoComplete="tel" className={FIELD} {...felt("telefon")} />
            {feil("telefon")}
          </label>
          <label className={LABEL}>
            E-post
            <input type="email" autoComplete="email" className={FIELD} {...felt("epost")} />
            {feil("epost")}
          </label>
        </div>

        <label className={`mt-5 ${LABEL}`}>
          Melding
          <textarea rows={5} className={`${FIELD} resize-y`} {...felt("melding", `${id}merk`)} />
          {feil("melding")}
        </label>
        <p id={`${id}merk`} className={`mt-2 text-[14px] leading-[1.5] ${SOFT}`}>
          Ikke skriv personnummer eller helseopplysninger her.
        </p>

        {/* Hidden from people; a bot that fills it in is quietly turned away */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Nettsted
            <input name="nettsted" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        {state.status === "error" && (
          <p role="alert" className="mt-5 text-[15px] leading-[1.55] text-[var(--color-ink)]">
            {state.reason === "busy" ? "Du har sendt mange meldinger på kort tid. " : "Det gikk ikke å sende meldingen. "}
            Ring oss på{" "}
            <a href={KONTAKT.phone.href} className={`${LINK} tabular-nums`}>
              {KONTAKT.phone.display}
            </a>{" "}
            eller skriv til{" "}
            <a href={KONTAKT.email.href} className={LINK}>
              {KONTAKT.email.display}
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#16414A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sender …" : "Send"}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

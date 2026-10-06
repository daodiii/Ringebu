import { Phone } from "lucide-react";
import { HOURS, KONTAKT, SEO_TEXT } from "@/components/kontakt/data";

/**
 * The words on /kontakt, apart from the picture around them and the form:
 * the heading, phone, e-mail and address, the hours, the Ring button, the
 * number for out of hours, and the paragraph under the picture. Postkassa
 * lays them out. The clinic's details all come from data.ts.
 */

const SOFT = "text-[rgba(14,42,48,0.74)]";
const RULE = "border-[rgba(14,42,48,0.14)]";
const FOCUS =
  "rounded-[3px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]";

export function Tittel() {
  return (
    <>
      <h1
        className="font-sans font-medium text-balance text-[var(--color-ink)]"
        style={{ fontSize: "clamp(40px, 4.8vw, 62px)", letterSpacing: "-0.035em", lineHeight: 1 }}
      >
        Kontakt oss.
      </h1>
      <p className={`mt-4 max-w-[40ch] text-pretty text-[17px] leading-[1.55] ${SOFT}`}>
        {KONTAKT.lead}
      </p>
    </>
  );
}

/** Phone, e-mail and address, one to a line. `onEpost` lets a picture answer the e-mail line. */
export function Linjer({ onEpost }: { onEpost?: () => void }) {
  const row = `border-t ${RULE}`;
  const link = `block py-3.5 transition-colors hover:text-[var(--color-brass)] ${FOCUS}`;
  return (
    <ul className="text-[var(--color-ink)]">
      <li className={row}>
        <a href={KONTAKT.phone.href} className={`${link} text-[30px] font-medium leading-[1.15] tracking-[-0.02em] tabular-nums`}>
          {KONTAKT.phone.display}
        </a>
      </li>
      <li className={row}>
        <a
          href={KONTAKT.email.href}
          onPointerEnter={onEpost}
          onFocus={onEpost}
          className={`${link} text-[19px] font-medium tracking-[-0.01em]`}
        >
          {KONTAKT.email.display}
        </a>
      </li>
      <li className={`${row} border-b`}>
        <a
          href={KONTAKT.address.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link} text-[19px] font-medium tracking-[-0.01em]`}
        >
          {KONTAKT.address.display}
        </a>
      </li>
    </ul>
  );
}

/**
 * The opening hours, two days to a row. A day needs 137px, so below 350px
 * wide there is room for one day to a row, or the hours break in two.
 */
export function Timer({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-1 gap-x-8 gap-y-1.5 text-[14.5px] min-[350px]:grid-cols-2 ${className}`}>
      {HOURS.map((h) => (
        <div key={h.code} className="flex items-baseline justify-between gap-3">
          <dt className="text-[rgba(14,42,48,0.62)]">{h.code}</dt>
          <dd className={h.closed ? "italic text-[rgba(14,42,48,0.5)]" : "font-medium tabular-nums text-[var(--color-ink)]"}>
            {h.hours}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Akutt() {
  return (
    <p className={`text-[14.5px] leading-[1.5] ${SOFT}`}>
      <span className="font-medium text-[var(--color-ink)]">Akutt hjelp</span>{" "}
      <a
        href={KONTAKT.akutt.after.href}
        className={`font-medium tabular-nums text-[var(--color-ink)] underline-offset-2 hover:underline ${FOCUS}`}
      >
        116 117
      </a>{" "}
      utenom åpningstid
    </p>
  );
}

export function RingKnapp() {
  return (
    <a
      href={KONTAKT.phone.href}
      className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#16414A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]"
    >
      <Phone className="size-4" aria-hidden="true" />
      Ring {KONTAKT.phone.display}
    </a>
  );
}

/** The paragraph for visitors and search engines, on a cream band under the picture. */
export function Omtale() {
  return (
    <section className="bg-[var(--color-paper)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-20 pt-10 md:pb-24 md:pt-12">
        <h2 className="text-[20px] font-medium tracking-[-0.015em] text-[var(--color-ink)]">Tannlegen i Gudbrandsdalen</h2>
        <p className={`mt-3 max-w-[64ch] text-pretty text-[15.5px] leading-[1.65] ${SOFT}`}>{SEO_TEXT}</p>
      </div>
    </section>
  );
}

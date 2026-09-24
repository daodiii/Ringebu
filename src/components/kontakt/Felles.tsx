import { ArrowUpRight, Phone } from "lucide-react";
import { HOURS, KONTAKT, MAPS_EMBED, MAPS_SEARCH, SEO_TEXT } from "@/components/kontakt/data";

/**
 * The words on /kontakt and the map, apart from the picture around them:
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

/**
 * The Google map, as big as the box it is given. From 640px wide our own way
 * out to Google Maps sits in its top right corner. Narrower, it ran into
 * Google's own «Åpne i Maps» button or place card at the top left, so phones
 * keep Google's alone.
 */
export function Kart({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#E6ECE8] ${className}`}>
      <iframe
        src={MAPS_EMBED}
        title={`Ringebu Tannlegesenter i ${KONTAKT.address.short} på kartet`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0, filter: "grayscale(0.3) contrast(1.03)" }}
      />
      <a
        href={MAPS_SEARCH}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full max-sm:hidden bg-white px-3.5 py-2 text-[13px] font-medium text-[var(--color-ink)] shadow-[0_3px_0_rgba(14,42,48,0.13)] transition-colors hover:bg-[#F2F5F3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        Åpne i Google Maps
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </div>
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

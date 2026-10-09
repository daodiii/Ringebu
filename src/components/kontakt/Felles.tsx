import { Fragment } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { HOURS, KART, KONTAKT, SEO_TEXT } from "@/components/kontakt/data";

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
      <h1 className="display-page text-balance text-[var(--color-ink)]">Kontakt oss</h1>
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
        <a href={KONTAKT.phone.href} className={`${link} text-[30px] font-medium leading-[1.15] tracking-[-0.02em]`}>
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
 * The opening hours, one day to a line, read straight down. Two days to a
 * row read across (Man, Tir, then Ons, Tor), and the eye had to zigzag.
 */
export function Timer({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid max-w-[320px] grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 text-[16px] ${className}`}>
      {HOURS.map((h) => (
        <Fragment key={h.code}>
          <dt className="text-[rgba(14,42,48,0.72)]">{h.day}</dt>
          <dd className={h.closed ? "italic text-[rgba(14,42,48,0.72)]" : "font-medium text-[var(--color-ink)]"}>
            {h.hours}
          </dd>
        </Fragment>
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
        className={`font-medium text-[var(--color-ink)] underline-offset-2 hover:underline ${FOCUS}`}
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
      className="knapp knapp-blekk"
    >
      <Phone aria-hidden="true" />
      Ring {KONTAKT.phone.display}
    </a>
  );
}

/**
 * On a cream band under the picture: how to find the clinic (the footer's
 * «Slik finner du oss» comes here), and the paragraph for visitors and search
 * engines. The way from the E6, parking and the entrance wait for the
 * owner's own words; until then the address and the two map apps.
 */
export function Omtale() {
  const knapp = "knapp knapp-papir knapp-liten";
  return (
    <section className="bg-[var(--color-paper)]">
      <div className="mx-auto grid w-full max-w-[var(--container-max,1280px)] gap-x-20 gap-y-12 px-[var(--container-px,24px)] pb-20 pt-12 md:grid-cols-2 md:pb-24 md:pt-16">
        <div id="slik-finner-du-oss" className="scroll-mt-28">
          <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">Slik finner du oss</h2>
          <p className="mt-3 text-[18px] text-[var(--color-ink)]">{KONTAKT.address.display}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={KART.google} target="_blank" rel="noopener noreferrer" className={knapp}>
              Åpne i Google Maps
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={KART.apple} target="_blank" rel="noopener noreferrer" className={knapp}>
              Åpne i Apple Kart
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">Tannlegen i Gudbrandsdalen</h2>
          <p className={`mt-3 max-w-[64ch] text-pretty text-[16.5px] leading-[1.65] ${SOFT}`}>{SEO_TEXT}</p>
        </div>
      </div>
    </section>
  );
}

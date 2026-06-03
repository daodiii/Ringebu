import { Phone, Mail, ArrowUpRight } from "lucide-react";
import {
  KONTAKT,
  HOURS,
  DISTANCES,
  SEO_TEXT,
  dirUrl,
  MAPS_EMBED,
  MAPS_SEARCH,
} from "./data";

export function SplitKontakt() {
  return (
    <main className="bg-[var(--color-ink)]">
      <div className="mx-auto grid min-h-[100dvh] w-full max-w-[var(--container-max,1280px)] grid-cols-1 items-center gap-x-16 gap-y-14 px-[var(--container-px,24px)] py-24 md:grid-cols-[1.05fr_0.95fr] md:py-12">
        {/* Left — primary contact */}
        <div className="w-full max-w-[500px]">
          <h1
            className="font-sans font-extralight text-[var(--color-amber)]"
            style={{ fontSize: "clamp(40px, 5vw, 66px)", letterSpacing: "-0.045em", lineHeight: 0.9 }}
          >
            Kontakt<span className="text-[var(--color-copper)]">.</span>
          </h1>
          <p className="mt-3 text-pretty text-[14px] leading-[1.5] text-[var(--color-amber)]/70">
            {KONTAKT.lead}
          </p>

          {/* Lines */}
          <div className="mt-6">
            {[
              { ...KONTAKT.phone, label: "Telefon", Icon: Phone, ext: false, size: "text-[36px]" },
              { ...KONTAKT.email, label: "E-post", Icon: Mail, ext: false, size: "text-[26px]" },
              { ...KONTAKT.address, label: "Adresse", Icon: ArrowUpRight, ext: true, size: "text-[22px]" },
            ].map((row) => (
              <a
                key={row.label}
                href={row.href}
                {...(row.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid grid-cols-[112px_1fr_auto] items-baseline gap-4 border-t border-[var(--color-rule-dark)] py-3 last:border-b last:border-[var(--color-rule-dark)] text-[var(--color-text-on-dark)]"
              >
                <span className="font-mono text-[18px] uppercase tracking-[0.12em] text-[var(--color-brass)]">
                  {row.label}
                </span>
                <span
                  className={`min-w-0 truncate font-sans font-light tracking-[-0.01em] transition-colors group-hover:text-[var(--color-copper)] ${row.size}`}
                >
                  {row.display}
                </span>
                <row.Icon className="size-3.5 self-center text-[var(--color-brass)] transition-colors group-hover:text-[var(--color-copper)]" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Hours compact */}
          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1.5">
            {HOURS.map((h) => (
              <div
                key={h.code}
                className="flex items-baseline justify-between gap-3 text-[var(--color-amber)]"
                style={{ opacity: h.closed ? 0.5 : 0.92 }}
              >
                <span className="text-[12.5px]">{h.code}</span>
                <span className={`text-[12.5px] tabular-nums ${h.closed ? "italic" : "font-medium text-[var(--color-paper)]"}`}>
                  {h.hours}
                </span>
              </div>
            ))}
          </div>

          {/* Akutt + CTA */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[var(--color-rule-dark)] pt-4">
            <div className="text-[12.5px] text-[var(--color-amber)]/80">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-brass)]">Akutt</span>{" "}
              <a href={KONTAKT.akutt.after.href} className="tabular-nums underline-offset-2 hover:underline">
                116 117
              </a>{" "}
              <span className="text-[var(--color-amber)]/50">utenom åpningstid</span>
            </div>
            <a
              href={KONTAKT.phone.href}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-copper)] px-5 py-2.5 text-[13px] font-semibold text-[var(--color-paper)] transition-colors hover:bg-[var(--color-copper)]/90"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              Ring {KONTAKT.phone.display}
            </a>
          </div>
        </div>

        {/* Right — small map + find us + SEO */}
        <div className="w-full md:border-l md:border-[var(--color-rule-dark)] md:pl-16">
          {/* Small map */}
          <div className="relative h-[150px] w-full overflow-hidden shadow-[inset_0_0_0_1px_var(--color-rule-dark)] sm:h-[180px]">
            <iframe
              src={MAPS_EMBED}
              title="Ringebu Tannlegesenter i Hanstadgata 2 på kartet"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full grayscale-[45%] contrast-[1.05]"
              style={{ border: 0 }}
            />
            <a
              href={MAPS_SEARCH}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-[var(--color-ink)] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-amber)] transition-colors hover:text-[var(--color-paper)]"
            >
              Åpne i Google Maps
              <ArrowUpRight className="size-2.5" aria-hidden="true" />
            </a>
          </div>

          {/* Find us */}
          <h2 className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
            Tannlegen i Gudbrandsdalen
          </h2>
          <ul className="mt-3">
            {DISTANCES.map((d) => (
              <li key={d.place}>
                <a
                  href={dirUrl(d.place)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[var(--color-rule-dark)] py-2 last:border-b last:border-[var(--color-rule-dark)]"
                >
                  <span className="font-sans text-[15px] font-light text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-copper)]">
                    {d.place}
                  </span>
                  <span className="flex items-baseline gap-3 font-mono tabular-nums">
                    <span className="text-[12px] text-[var(--color-amber)]">{d.drive}</span>
                    <span className="text-[11px] text-[var(--color-amber)]/50">{d.km}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-pretty text-[12.5px] leading-[1.6] text-[var(--color-amber)]/55">
            {SEO_TEXT}
          </p>
        </div>
      </div>
    </main>
  );
}

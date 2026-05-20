"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const POSTSCRIPT: ReadonlyArray<{ label: string; value: React.ReactNode }> = [
  { label: "Adresse", value: "Hanstadgata 2, 2630 Ringebu" },
  {
    label: "Telefon",
    value: <a href="tel:61280412" className="hover:text-[var(--color-stone)]">61 28 04 12</a>,
  },
  {
    label: "Åpningstid",
    value: (
      <>
        <span className="block">Man – Tor · 08:00–15:30</span>
        <span className="block">Fredag · 08:00–15:00</span>
      </>
    ),
  },
  { label: "Parkering", value: "Gratis ved klinikken" },
];

export function AboutLetter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-[var(--color-paper-warm)] py-[var(--space-section)]">
      <motion.div
        ref={ref}
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]"
      >
        {/* Letterhead */}
        <div className="mx-auto max-w-[780px]">
          <div className="mb-12 flex items-baseline justify-between border-b border-[var(--color-rule)] pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
              Brev fra dalen
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Ringebu · Gudbrandsdalen
            </span>
          </div>

          {/* Salutation */}
          <p
            className="font-sans italic text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(22px, 2.4vw, 32px)",
              lineHeight: 1.2,
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Kjære pasient,
          </p>

          {/* Body */}
          <div className="mt-8 space-y-7 font-sans text-[var(--color-text-primary)]">
            <p
              style={{
                fontSize: "clamp(17px, 1.6vw, 19px)",
                lineHeight: 1.7,
                fontWeight: 300,
                letterSpacing: "-0.005em",
              }}
            >
              Vi er et lite kontor i Gudbrandsdalen — få ansatte, fire stoler, og en
              klar overbevisning om at god tannhelse begynner med å ta seg tid.
            </p>

            <p
              style={{
                fontSize: "clamp(17px, 1.6vw, 19px)",
                lineHeight: 1.7,
                fontWeight: 300,
                letterSpacing: "-0.005em",
              }}
            >
              Vi har holdt til i Hanstadgata siden 1985. Mange av våre pasienter har
              vi sett gjennom flere tiår — og barn av barn av de første. Det er den
              slags klinikk vi er.
            </p>

            <p
              style={{
                fontSize: "clamp(17px, 1.6vw, 19px)",
                lineHeight: 1.7,
                fontWeight: 300,
                letterSpacing: "-0.005em",
              }}
            >
              Hos oss er ikke timen din en transaksjon. Vi husker hva vi snakket om
              forrige gang. Vi tegner opp behandlinger i ro før vi begynner. Og vi
              gjør jobben skikkelig, selv om det betyr en time til på avtale.
            </p>

            <p
              style={{
                fontSize: "clamp(17px, 1.6vw, 19px)",
                lineHeight: 1.7,
                fontWeight: 300,
                letterSpacing: "-0.005em",
              }}
            >
              Vi gleder oss til å møte deg.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-rule)] pb-10">
            <div>
              <p className="font-sans text-[13px] italic text-[var(--color-text-secondary)]">
                Med vennlig hilsen,
              </p>
              <p
                className="mt-2 font-sans text-[var(--color-text-primary)]"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.022em",
                  fontStyle: "italic",
                }}
              >
                Ringebu Tannlegesenter
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                Anno 1985
              </p>
            </div>

            {/* Brass stamp */}
            <div
              aria-hidden="true"
              className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
              style={{
                border: "1.5px solid var(--color-brass)",
                boxShadow:
                  "inset 0 0 0 4px var(--color-paper-warm), inset 0 0 0 5px rgba(184,148,92,0.35)",
              }}
            >
              <div className="flex flex-col items-center">
                <span className="font-mono text-[14px] font-bold uppercase tracking-[0.18em] text-[var(--color-brass)]">
                  RTS
                </span>
                <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
                  1985
                </span>
              </div>
            </div>
          </div>

          {/* Postscript */}
          <div className="mt-10">
            <span className="font-sans text-[15px] italic text-[var(--color-text-secondary)]">
              P.S.
            </span>
            <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              {POSTSCRIPT.map((row) => (
                <div key={row.label}>
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                    {row.label}
                  </dt>
                  <dd className="mt-1 font-sans text-[13px] font-medium tracking-[-0.005em] text-[var(--color-text-primary)] leading-[1.45]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

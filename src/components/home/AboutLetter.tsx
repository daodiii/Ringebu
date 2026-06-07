"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function AboutLetter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="om-oss"
      className="bg-[var(--color-paper-warm)] py-[var(--space-section)]"
    >
      <motion.div
        ref={ref}
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]"
      >
        <div className="mx-auto max-w-[780px]">
          {/* Letterhead */}
          <div
            aria-hidden="true"
            className="mb-12 h-px w-full bg-[var(--color-rule)]"
          />

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
                className="mt-2 font-sans italic text-[var(--color-text-primary)]"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.022em",
                }}
              >
                Ringebu Tannlegesenter
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
              <span className="font-mono text-[15px] font-bold uppercase tracking-[0.18em] text-[var(--color-brass)]">
                RTS
              </span>
            </div>
          </div>

          {/* Postscript */}
          <p
            className="mt-10 font-sans text-[var(--color-text-secondary)]"
            style={{
              fontSize: "clamp(16px, 1.5vw, 18px)",
              lineHeight: 1.7,
              fontWeight: 300,
              letterSpacing: "-0.005em",
            }}
          >
            <span className="italic">P.S.</span> Du finner oss i Hanstadgata 2 i
            Ringebu, med gratis parkering rett utenfor. Ring oss gjerne på{" "}
            <a
              href="tel:61280412"
              className="font-medium text-[var(--color-text-primary)] underline decoration-[var(--color-brass)]/40 underline-offset-4 transition-colors hover:text-[var(--color-copper)]"
            >
              61 28 04 12
            </a>
            , så finner vi en tid som passer.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

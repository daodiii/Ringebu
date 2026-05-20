"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const FACTS: ReadonlyArray<{ label: string; value: React.ReactNode }> = [
  { label: "Etablert", value: "Anno 1985" },
  { label: "Beliggenhet", value: "Hanstadgata 2, Ringebu" },
  { label: "Region", value: "Gudbrandsdalen" },
  { label: "Behandlingsrom", value: "Fire stoler" },
  { label: "Fagområder", value: "Seks (forebyggende → implantat)" },
  { label: "Refusjon", value: "HELFO direkte oppgjør" },
  { label: "Akuttberedskap", value: "Samme dag" },
  { label: "Parkering", value: "Gratis ved klinikken" },
];

export function AboutAlmanakEntry() {
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
        {/* Entry header */}
        <div className="mb-12 flex items-baseline justify-between border-b-2 border-[var(--color-text-primary)] pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
            Almanakken · Oppslag 02
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            Klinikken
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-sans text-[var(--color-text-primary)]"
          style={{
            fontWeight: 300,
            fontSize: "clamp(36px, 5.6vw, 76px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
          }}
        >
          Ringebu Tannlegesenter,{" "}
          <span className="italic text-[var(--color-stone)]">et lite kontor i dalen.</span>
        </h2>

        {/* Two-column body */}
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* LEFT — descriptive prose */}
          <div className="font-sans text-[var(--color-text-primary)]">
            {/* Drop cap on first paragraph */}
            <p
              style={{
                fontSize: "clamp(16px, 1.5vw, 18px)",
                lineHeight: 1.7,
                fontWeight: 300,
                letterSpacing: "-0.005em",
              }}
            >
              <span
                className="float-left mr-3 font-light text-[var(--color-stone)]"
                style={{
                  fontSize: "clamp(56px, 6vw, 80px)",
                  lineHeight: 0.86,
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  paddingTop: "0.04em",
                }}
              >
                K
              </span>
              linikken har holdt til i Hanstadgata siden 1985 — det er fire tiår i
              samme dal, med få utskiftninger i et lite, fast team. Få ansatte,
              fire stoler, og en bestemt overbevisning om at god tannhelse
              begynner med å ta seg tid.
            </p>

            <p
              className="mt-6"
              style={{
                fontSize: "clamp(16px, 1.5vw, 18px)",
                lineHeight: 1.7,
                fontWeight: 300,
                letterSpacing: "-0.005em",
              }}
            >
              Mange pasienter har vi sett gjennom flere tiår — og barn av barn
              av de første. Hos oss er ikke timen din en transaksjon. Vi husker
              hva vi snakket om sist gang.
            </p>

            <p
              className="mt-6 italic text-[var(--color-text-secondary)]"
              style={{
                fontSize: "clamp(15px, 1.4vw, 17px)",
                lineHeight: 1.65,
                fontWeight: 300,
              }}
            >
              Klinikken arbeider med direkte HELFO-oppgjør på all stønadsberettiget
              behandling, og holder akuttberedskap hver virkedag.
            </p>
          </div>

          {/* RIGHT — structured facts */}
          <aside className="md:border-l md:border-[var(--color-rule)] md:pl-12">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
              Personalia
            </div>
            <dl className="space-y-3.5">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-[110px_1fr] items-baseline gap-3 border-b border-dotted border-[var(--color-rule)] pb-2 last:border-b-0"
                >
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {f.label}
                  </dt>
                  <dd className="font-sans text-[13.5px] font-medium tracking-[-0.01em] text-[var(--color-text-primary)]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* Colophon */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-rule)] pt-5 sm:flex-row sm:justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
            Forfattet av klinikken selv
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            Innført i registeret 1985 · Gudbrandsdalen
          </span>
        </div>
      </motion.div>
    </section>
  );
}

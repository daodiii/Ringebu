"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type Stat = { value: string; label: string; sub?: string };

const STATS: ReadonlyArray<Stat> = [
  { value: "1985", label: "Etablert", sub: "i samme dal, samme gate" },
  { value: "40+", label: "År i drift", sub: "uten å skifte sjel" },
  { value: "6", label: "Fagområder", sub: "forebyggende → implantat" },
  { value: "0 kr", label: "Forskudd", sub: "HELFO direkte oppgjør" },
];

export function AboutVitalStatistics() {
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-stretch lg:gap-16">
          {/* LEFT — fresh portrait of the clinic */}
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[520px]">
            <Image
              src="/images/about-clinic.jpg"
              alt="Inne ved Ringebu Tannlegesenter"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "center 45%" }}
            />
            {/* Brass corner ticks */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-3"
            >
              <div className="absolute right-0 top-0 h-10 w-px bg-gradient-to-b from-[var(--color-amber)] to-transparent" />
              <div className="absolute right-0 top-0 h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-amber)]" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-3"
            >
              <div className="absolute bottom-0 left-0 h-10 w-px bg-gradient-to-t from-[var(--color-amber)] to-transparent" />
              <div className="absolute bottom-0 left-0 h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-amber)]" />
            </div>
          </div>

          {/* RIGHT — vital statistics */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3 border-b border-[var(--color-rule)] pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                Personalia · Klinikken
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-sans text-[var(--color-text-primary)]"
              style={{
                fontWeight: 300,
                fontSize: "clamp(32px, 4.2vw, 54px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              Et lite kontor, med{" "}
              <span className="italic text-[var(--color-stone)]">tid</span> til hver pasient.
            </h2>

            <p className="mt-5 max-w-[440px] text-[14px] leading-[1.65] text-[var(--color-text-secondary)]">
              Ringebu Tannlegesenter har holdt til midt i dalen siden 1985 — fire
              tiår med samme team og samme klare overbevisning om at god
              tannhelse begynner med å ta seg tid.
            </p>

            {/* Stats grid */}
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="border-t border-[var(--color-text-primary)] pt-3"
                >
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                    {s.label}
                  </dt>
                  <dd
                    className="mt-2 font-sans tabular-nums text-[var(--color-text-primary)]"
                    style={{
                      fontWeight: 300,
                      fontSize: "clamp(38px, 4.4vw, 56px)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.035em",
                    }}
                  >
                    {s.value}
                  </dd>
                  {s.sub && (
                    <p className="mt-2 text-[12px] italic leading-[1.4] text-[var(--color-text-secondary)]">
                      {s.sub}
                    </p>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

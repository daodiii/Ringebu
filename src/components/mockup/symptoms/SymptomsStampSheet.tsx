"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TOP_SYMPTOMS, mapSeverity, TIER_META } from "./symptomsShared";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// Subtle tonal variation across stamps — coordinated with the slipcase tones.
const STAMP_TONES = ["#F8F2E2", "#F4ECD8", "#F9F3E0", "#F5EFE2", "#F1E7CF", "#F7EFD9"];

const SEV_LABEL = { now: "Nå", soon: "Undersøk", watch: "Følg med" } as const;

function Stamp({
  symptom,
  i,
}: {
  symptom: (typeof TOP_SYMPTOMS)[number];
  i: number;
}) {
  const sev = mapSeverity(symptom.severity);
  const meta = TIER_META[sev];
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const tone = STAMP_TONES[i % STAMP_TONES.length];

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.65, delay: i * 0.07, ease: EASE }}
    >
      <Link
        href={`/symptomer/${symptom.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden transition-transform duration-500 hover:-translate-y-1"
        style={{
          // Perforation: dotted outline + drop shadow
          backgroundColor: tone,
          boxShadow:
            "0 1px 0 rgba(26,20,16,0.05), 0 14px 30px -16px rgba(26,20,16,0.18)",
        }}
      >
        {/* Perforated edge effect using radial mask + dashed border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0, transparent 3px, transparent 4px), " +
              "radial-gradient(circle at 50% 100%, transparent 3px, transparent 4px)",
          }}
        />
        {/* Border decoration */}
        <div
          aria-hidden="true"
          className="absolute inset-3 border border-dashed"
          style={{ borderColor: "rgba(26,20,16,0.18)" }}
        />

        {/* Top severity band */}
        <div
          aria-hidden="true"
          className="absolute left-3 right-3 top-3 h-1.5"
          style={{ backgroundColor: meta.dot, opacity: 0.85 }}
        />

        {/* Brass corner ornament */}
        <div
          aria-hidden="true"
          className="absolute right-5 top-7 size-3 origin-center transition-transform duration-500 group-hover:rotate-90"
        >
          <span
            className="absolute inset-0 m-auto block h-px w-3 bg-[var(--color-brass)]/70"
          />
          <span
            className="absolute inset-0 m-auto block h-3 w-px bg-[var(--color-brass)]/70"
          />
        </div>

        {/* Index — top left */}
        <div className="absolute left-5 top-7 font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
          Nr · {String(i + 1).padStart(2, "0")}
        </div>

        {/* Body content */}
        <div className="absolute inset-x-5 bottom-5 top-16 flex flex-col justify-between">
          <h3
            className="font-sans font-light tracking-[-0.025em] text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(24px, 2.4vw, 32px)",
              lineHeight: 1.05,
            }}
          >
            {symptom.title}
          </h3>

          <div>
            <p className="mb-4 text-[12.5px] leading-[1.5] text-[var(--color-text-secondary)]">
              {symptom.description.split(".")[0]}.
            </p>

            <div className="flex items-end justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em]" style={{
                color: sev === "now" ? "#A85838" : sev === "soon" ? "#6B4F2C" : "#8B7C6A",
              }}>
                {SEV_LABEL[sev]}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-primary)] transition-transform group-hover:translate-x-0.5">
                Les
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SymptomsStampSheet() {
  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <h2 className="display-section max-w-[680px] text-[var(--color-text-primary)]">
            Seks symptomer,{" "}
            <span className="font-light text-[var(--color-stone)]">arkivert</span>.
          </h2>
          <p className="max-w-[320px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            En liten samling — ikke selvdiagnose. Trykk et merke for å lese hele oppslaget.
          </p>
        </div>

        {/* Stamp grid — paper-warm tray underneath for the cabinet feel */}
        <div
          className="rounded-[2px] p-6 md:p-10 ring-1 ring-[var(--color-rule)]"
          style={{
            background:
              "linear-gradient(180deg, var(--color-paper-warm) 0%, var(--color-paper-warm) 100%)",
          }}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {TOP_SYMPTOMS.map((s, i) => (
              <Stamp key={s.title} symptom={s} i={i} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            href="/symptomer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-primary)] underline decoration-[var(--color-brass)] underline-offset-[6px] hover:decoration-[var(--color-text-primary)]"
          >
            Se hele samlingen
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/artikler"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            Les fra journalen
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

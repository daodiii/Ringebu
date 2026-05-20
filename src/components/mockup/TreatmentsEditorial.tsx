"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

type Entry = {
  name: string;
  body: string;
  refusjon: string;
  duration: string;
  urgency: "rutine" | "akutt" | "valgfri";
};

const ENTRIES: ReadonlyArray<Entry> = [
  {
    name: "Forebyggende",
    body: "Den enkleste timen er den du tar i tide. Kontroll, rens, fluor — i ro.",
    refusjon: "HELFO",
    duration: "30–45 min",
    urgency: "rutine",
  },
  {
    name: "Generell tannbehandling",
    body: "Fyllinger, kroner og broer. Tradisjonelt håndverk med moderne materialer.",
    refusjon: "HELFO",
    duration: "45–90 min",
    urgency: "rutine",
  },
  {
    name: "Akutt tannhjelp",
    body: "Hurtig vurdering, samme dag — ofte i løpet av timer.",
    refusjon: "HELFO",
    duration: "Samme dag",
    urgency: "akutt",
  },
  {
    name: "Bleking & estetikk",
    body: "Skånsom klinisk bleking. Varig resultat, ingen sjokkeffekter.",
    refusjon: "Egenandel",
    duration: "60–90 min",
    urgency: "valgfri",
  },
  {
    name: "Implantater",
    body: "Permanente løsninger som ser ut og føles som dine egne tenner.",
    refusjon: "Delvis HELFO",
    duration: "Flere timer",
    urgency: "rutine",
  },
  {
    name: "Rotbehandling",
    body: "Skånsom, smertefri behandling som bevarer din egen tann.",
    refusjon: "HELFO",
    duration: "60–90 min",
    urgency: "rutine",
  },
];

const URGENCY_DOT: Record<Entry["urgency"], string> = {
  rutine: "bg-[var(--color-brass)]",
  akutt: "bg-[var(--color-urgent)]",
  valgfri: "bg-[var(--color-stone)]",
};

const URGENCY_LABEL: Record<Entry["urgency"], string> = {
  rutine: "Rutine",
  akutt: "Akutt",
  valgfri: "Valgfri",
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

function PlateRow({ entry, index }: { entry: Entry; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
      className="relative"
    >
      <Link
        href="/behandlinger"
        className="group block border-t border-[var(--color-rule)] py-10 transition-colors md:py-14"
      >
        {/* Brass tick on hover — sits above the rule */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-px w-0 bg-[var(--color-brass)] transition-[width] duration-700 ease-[var(--ease-cinematic)] group-hover:w-24"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_minmax(280px,360px)] md:gap-12 md:items-baseline">
          {/* Name */}
          <h3
            className="font-sans text-[var(--color-text-primary)] transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:-translate-x-1"
            style={{
              fontWeight: 300,
              fontSize: "clamp(36px, 5.2vw, 64px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
          >
            {entry.name}
          </h3>

          {/* Status data — small mono labels */}
          <div className="flex items-center gap-7 md:flex-col md:items-end md:gap-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${URGENCY_DOT[entry.urgency]}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                {URGENCY_LABEL[entry.urgency]}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
              {entry.duration}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
              {entry.refusjon}
            </span>
          </div>

          {/* Body + Les mer */}
          <div className="flex flex-col gap-4">
            <p className="text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">
              {entry.body}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-stone)]">
              Les mer
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function TreatmentsEditorial() {
  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <h2 className="display-section max-w-[640px] text-[var(--color-text-primary)]">
            Skreddersydde løsninger for{" "}
            <span className="font-light text-[var(--color-stone)]">ditt</span> smil.
          </h2>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Seks fagområder, ett team. HELFO direkte oppgjør på alle stønadsberettigede behandlinger.
          </p>
        </div>

        {/* Editorial plates */}
        <div className="border-b border-[var(--color-rule)]">
          {ENTRIES.map((entry, i) => (
            <PlateRow key={entry.name} entry={entry} index={i} />
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-12">
          <Link
            href="/behandlinger"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-stone)]"
          >
            Se alle behandlinger
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

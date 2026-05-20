"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { symptoms } from "@/data/content";

type Severity = "now" | "soon" | "watch";

function mapSeverity(raw: string): Severity {
  const s = raw.toLowerCase();
  if (s.includes("snarest") || s.includes("oppsøk") || s.includes("haster")) return "now";
  if (s.includes("behandles") || s.includes("undersøk")) return "soon";
  return "watch";
}

const SEV_LABEL: Record<Severity, string> = {
  now: "Nå",
  soon: "Undersøk",
  watch: "Følg med",
};

// Use CSS vars where they map cleanly to tier semantics.
const SEV_DOT: Record<Severity, string> = {
  now: "var(--color-urgent)",
  soon: "var(--color-stone)",
  watch: "var(--color-text-muted)",
};

const SEV_TEXT: Record<Severity, string> = {
  now: "var(--color-urgent)",
  soon: "var(--color-stone)",
  watch: "var(--color-text-muted)",
};

const TOP_SYMPTOMS = symptoms.slice(0, 6);

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function SymptomsNewspaper() {
  const feature =
    TOP_SYMPTOMS.find((s) => mapSeverity(s.severity) === "now") ?? TOP_SYMPTOMS[0];
  const rest = TOP_SYMPTOMS.filter((s) => s !== feature);

  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="symptomer"
      className="bg-[var(--color-paper)] py-[var(--space-section)]"
    >
      <motion.div
        ref={ref}
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]"
      >
        {/* Masthead */}
        <div className="mb-2 flex items-center justify-between border-b-2 border-[var(--color-text-primary)] pb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
            Almanakken · Symptomer
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            Utgave 01 · Ringebu
          </span>
        </div>
        <div className="mb-12 flex items-center justify-between border-b border-[var(--color-rule)] py-1.5">
          <span className="font-sans text-[12px] italic text-[var(--color-text-secondary)]">
            Veiledning til de vanligste tegnene — ikke selvdiagnose.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            Anno 1985
          </span>
        </div>

        {/* Top story (no eyebrow — type leads) */}
        <div className="grid grid-cols-1 gap-10 border-b border-[var(--color-rule)] pb-12 md:grid-cols-[1.6fr_1fr] md:gap-14 md:pb-16">
          <div>
            <h3
              className="font-sans text-[var(--color-text-primary)]"
              style={{
                fontWeight: 300,
                fontSize: "clamp(40px, 6vw, 84px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
              }}
            >
              {feature.title}.
            </h3>
            <p
              className="mt-7 max-w-[640px] font-sans italic"
              style={{
                fontSize: "clamp(18px, 1.8vw, 22px)",
                lineHeight: 1.4,
                color: "var(--color-text-secondary)",
              }}
            >
              {feature.description}
            </p>
            <Link
              href={`/symptomer/${feature.slug}`}
              className="group mt-8 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-primary)] hover:text-[var(--color-stone)]"
            >
              Les hele oppslaget
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Sidebar */}
          <aside className="md:border-l md:border-[var(--color-rule)] md:pl-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
              Hva gjør jeg?
            </span>
            <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-text-primary)]">
              {feature.whatToDo}
            </p>
            <div className="mt-7 border-t border-[var(--color-rule)] pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
                Mulige årsaker
              </span>
              <ul className="mt-3 space-y-1.5 text-[13px] leading-[1.5] text-[var(--color-text-secondary)]">
                {feature.causes.slice(0, 4).map((cause) => (
                  <li key={cause} className="flex items-baseline gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-block size-1 shrink-0 rounded-full bg-[var(--color-brass)]"
                    />
                    {cause}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Below the fold */}
        <div className="mt-10 mb-6 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
            Også notert
          </span>
          <span className="inline-block h-px w-12 bg-[var(--color-brass)]/40" />
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3 md:gap-y-12">
          {rest.map((s) => {
            const sev = mapSeverity(s.severity);
            return (
              <Link
                key={s.title}
                href={`/symptomer/${s.slug}`}
                className="group block border-t border-[var(--color-text-primary)] pt-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block size-1.5 rounded-full"
                    style={{ backgroundColor: SEV_DOT[sev] }}
                  />
                  <span
                    className="font-mono text-[9.5px] uppercase tracking-[0.25em]"
                    style={{ color: SEV_TEXT[sev] }}
                  >
                    {SEV_LABEL[sev]}
                  </span>
                </div>
                <h4
                  className="font-sans font-medium tracking-[-0.022em] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-stone)]"
                  style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.12 }}
                >
                  {s.title}
                </h4>
                <p className="mt-2 text-[13px] leading-[1.55] text-[var(--color-text-secondary)]">
                  {s.description.split(".")[0]}.
                </p>
              </Link>
            );
          })}
        </div>

        {/* Colophon */}
        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--color-rule)] pt-6 sm:flex-row sm:justify-between">
          <Link
            href="/symptomer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-primary)] underline decoration-[var(--color-brass)] underline-offset-[6px] hover:decoration-[var(--color-text-primary)]"
          >
            Se alle symptomer
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
      </motion.div>
    </section>
  );
}

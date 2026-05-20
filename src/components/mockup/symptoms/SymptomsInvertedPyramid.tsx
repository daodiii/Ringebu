"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TOP_SYMPTOMS, mapSeverity, TIER_META } from "./symptomsShared";
import type { Severity } from "@/components/ui/SeverityPill";

const TIER_ORDER: ReadonlyArray<Severity> = ["now", "soon", "watch"];

const EASE = [0.25, 0.1, 0.25, 1] as const;

const SIZE_FOR_TIER: Record<Severity, string> = {
  now: "clamp(44px, 6.4vw, 92px)",
  soon: "clamp(26px, 3.2vw, 44px)",
  watch: "clamp(18px, 1.9vw, 24px)",
};

const WEIGHT_FOR_TIER: Record<Severity, number> = {
  now: 300,
  soon: 400,
  watch: 500,
};

function PyramidRow({
  symptom,
  tier,
  index,
}: {
  symptom: (typeof TOP_SYMPTOMS)[number];
  tier: Severity;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();
  const meta = TIER_META[tier];

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="group"
    >
      <Link
        href={`/symptomer/${symptom.slug}`}
        className="grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-3 md:gap-8 md:py-5"
      >
        <span
          aria-hidden="true"
          className="inline-block shrink-0 rounded-full transition-transform group-hover:scale-110"
          style={{
            backgroundColor: meta.dot,
            width: tier === "now" ? "12px" : tier === "soon" ? "8px" : "5px",
            height: tier === "now" ? "12px" : tier === "soon" ? "8px" : "5px",
          }}
        />
        <h3
          className="font-sans text-[var(--color-text-primary)] transition-transform duration-500 group-hover:-translate-x-1"
          style={{
            fontWeight: WEIGHT_FOR_TIER[tier],
            fontSize: SIZE_FOR_TIER[tier],
            lineHeight: 0.98,
            letterSpacing: tier === "now" ? "-0.035em" : "-0.025em",
          }}
        >
          {symptom.title}
        </h3>
        <ArrowUpRight
          className="size-4 text-[var(--color-brass)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </Link>
      {tier === "now" && (
        <p
          className="max-w-[640px] pl-[22px] text-[14px] leading-[1.55] text-[var(--color-text-secondary)] md:pl-[28px]"
        >
          {symptom.whatToDo}
        </p>
      )}
    </motion.div>
  );
}

export function SymptomsInvertedPyramid() {
  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    list: TOP_SYMPTOMS.filter((s) => mapSeverity(s.severity) === tier),
  }));

  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <h2 className="display-section max-w-[640px] text-[var(--color-text-primary)]">
            Hvor raskt{" "}
            <span className="font-light text-[var(--color-stone)]">bør</span> du handle?
          </h2>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Størrelsen forteller alvorlighet. Det største krever handling nå.
          </p>
        </div>

        {/* Pyramid groups */}
        <div className="flex flex-col gap-16 md:gap-20">
          {grouped.map((group) => {
            const meta = TIER_META[group.tier];
            return (
              <div key={group.tier}>
                {/* Tier eyebrow */}
                <div className="mb-6 flex items-center gap-4 border-b border-[var(--color-rule)] pb-3 md:mb-8">
                  <span
                    aria-hidden="true"
                    className="inline-block size-2 rounded-full"
                    style={{ backgroundColor: meta.dot }}
                  />
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{
                      color: group.tier === "now" ? "#A85838" : group.tier === "soon" ? "#6B4F2C" : "#8B7C6A",
                    }}
                  >
                    {meta.label}
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {group.list.length} av {TOP_SYMPTOMS.length}
                  </span>
                </div>

                {/* Symptoms in this tier */}
                <div className="flex flex-col">
                  {group.list.map((s, i) => (
                    <PyramidRow key={s.title} symptom={s} tier={group.tier} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:justify-between">
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
      </div>
    </section>
  );
}

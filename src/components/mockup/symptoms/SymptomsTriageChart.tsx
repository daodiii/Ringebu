"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TOP_SYMPTOMS, mapSeverity, TIER_META } from "./symptomsShared";
import type { Severity } from "@/components/ui/SeverityPill";

const TIER_ORDER: ReadonlyArray<Severity> = ["now", "soon", "watch"];

const EASE = [0.25, 0.1, 0.25, 1] as const;

function TierRow({
  symptom,
  tier,
  index,
}: {
  symptom: (typeof TOP_SYMPTOMS)[number];
  tier: Severity;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const onDark = tier === "now";

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
    >
      <Link
        href={`/symptomer/${symptom.slug}`}
        className="group block border-t border-dashed py-5 transition-colors md:py-6"
        style={{
          borderColor: onDark ? "rgba(245,233,203,0.18)" : "rgba(26,20,16,0.12)",
        }}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-8">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: onDark ? "rgba(245,233,203,0.55)" : "#8B7C6A" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3
              className="font-sans font-light tracking-[-0.025em]"
              style={{
                fontSize: "clamp(22px, 2.6vw, 32px)",
                lineHeight: 1.1,
                color: onDark ? "#F5E9CB" : "#1A1410",
              }}
            >
              {symptom.title}
            </h3>
            <p
              className="mt-1.5 max-w-[640px] text-[13px] leading-[1.5]"
              style={{
                color: onDark ? "rgba(245,233,203,0.65)" : "#4A3F33",
              }}
            >
              {symptom.description}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] transition-transform group-hover:translate-x-0.5"
            style={{ color: onDark ? "#F5E9CB" : "#1A1410" }}
          >
            Hva gjør jeg
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function SymptomsTriageChart() {
  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    list: TOP_SYMPTOMS.filter((s) => mapSeverity(s.severity) === tier),
  }));

  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <h2 className="display-section max-w-[720px] text-[var(--color-text-primary)]">
            En liten almanakk over kroppens{" "}
            <span className="font-light text-[var(--color-stone)]">tidlige tegn</span>.
          </h2>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Veiledning, ikke selvdiagnose. Tre nivåer av hva du bør gjøre.
          </p>
        </div>

        {/* Three tiers */}
        <div className="flex flex-col gap-12 md:gap-16">
          {grouped.map((group) => {
            const meta = TIER_META[group.tier];
            const onDark = group.tier === "now";
            return (
              <div
                key={group.tier}
                style={{ backgroundColor: meta.band }}
                className={`-mx-[var(--container-px,24px)] px-[var(--container-px,24px)] md:rounded-[2px] md:mx-0 md:px-10 ${
                  onDark ? "py-10 md:py-14" : group.tier === "soon" ? "py-9 md:py-12" : "py-8 md:py-11"
                }`}
              >
                {/* Tier header */}
                <div
                  className="mb-5 flex flex-wrap items-baseline justify-between gap-4 border-b pb-4"
                  style={{
                    borderColor: onDark ? "rgba(245,233,203,0.22)" : "rgba(26,20,16,0.16)",
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-block size-2.5 rounded-full"
                      style={{ backgroundColor: meta.dot }}
                    />
                    <h3
                      className="font-sans font-medium tracking-[-0.02em]"
                      style={{
                        fontSize: "clamp(20px, 2vw, 26px)",
                        color: onDark ? "#F5E9CB" : "#1A1410",
                      }}
                    >
                      {meta.label}
                    </h3>
                  </div>
                  <span
                    className="font-sans text-[13px] italic"
                    style={{
                      color: onDark ? "rgba(245,233,203,0.7)" : "#4A3F33",
                    }}
                  >
                    {meta.subtitle}
                  </span>
                </div>

                {/* Symptom rows */}
                <div>
                  {group.list.map((s, i) => (
                    <TierRow key={s.title} symptom={s} tier={group.tier} index={i} />
                  ))}
                  {group.list.length === 0 && (
                    <p
                      className="py-4 text-[13px] italic"
                      style={{ color: onDark ? "rgba(245,233,203,0.5)" : "#8B7C6A" }}
                    >
                      Ingen symptomer i denne kategorien.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer links */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-between">
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
            Eller les fra journalen
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

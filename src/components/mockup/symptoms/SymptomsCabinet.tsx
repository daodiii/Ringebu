"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { TOP_SYMPTOMS, mapSeverity, TIER_META } from "./symptomsShared";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// Subtle tonal variation across drawer faces — same warm-palette logic as the slipcase.
const DRAWER_TONES = ["#EFE8DA", "#EBE2CE", "#F0E8D6", "#ECE6D6", "#E8DCC2", "#EEE3CC"];

export function SymptomsCabinet() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <h2 className="display-section max-w-[680px] text-[var(--color-text-primary)]">
            Symptom-skapet —{" "}
            <span className="font-light text-[var(--color-stone)]">åpne</span> en skuff.
          </h2>
          <p className="max-w-[320px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Veiledning til de vanligste tegnene. Åpne for å se hva du bør gjøre.
          </p>
        </div>

        {/* Cabinet frame */}
        <div className="relative ring-1 ring-[var(--color-rule)] shadow-[0_24px_60px_-30px_rgba(26,20,16,0.18)]">
          {/* Brass header band (cabinet label plate) */}
          <div className="flex items-center justify-between border-b border-[var(--color-rule)] bg-[var(--color-paper-warm)] px-6 py-3 md:px-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
              Ringebu Tann · Almanak
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Anno 1985
            </span>
          </div>

          {/* Drawers */}
          <div>
            {TOP_SYMPTOMS.map((s, i) => {
              const isOpen = openIdx === i;
              const sev = mapSeverity(s.severity);
              const meta = TIER_META[sev];
              return (
                <div
                  key={s.title}
                  className="border-b border-[var(--color-rule)] last:border-b-0"
                >
                  {/* Drawer face (closed strip) */}
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    style={{ backgroundColor: DRAWER_TONES[i] }}
                    className="group flex w-full items-center gap-4 px-5 py-5 text-left transition-[filter] hover:brightness-[1.02] md:gap-7 md:px-8 md:py-6"
                    aria-expanded={isOpen}
                  >
                    {/* Index */}
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Severity dot */}
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full ring-2 ring-white/40"
                      style={{ backgroundColor: meta.dot }}
                    />

                    {/* Name */}
                    <span
                      className="flex-1 font-sans text-[18px] font-medium tracking-[-0.02em] text-[var(--color-text-primary)] md:text-[22px]"
                    >
                      {s.title}
                    </span>

                    {/* Tier label */}
                    <span
                      className="hidden font-mono text-[10px] uppercase tracking-[0.22em] md:inline"
                      style={{ color: sev === "now" ? "#A85838" : sev === "soon" ? "#6B4F2C" : "#8B7C6A" }}
                    >
                      {sev === "now" ? "Nå" : sev === "soon" ? "Undersøk" : "Følg med"}
                    </span>

                    {/* Brass drawer handle */}
                    <span
                      aria-hidden="true"
                      className="ml-2 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-brass)]/40 bg-white/30 transition-all duration-500 group-hover:bg-[var(--color-brass)]/15"
                    >
                      <ChevronDown
                        className={`size-3.5 text-[var(--color-brass)] transition-transform duration-500 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {/* Open contents */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden bg-[var(--color-ink)] text-[var(--color-text-on-dark)]"
                      >
                        <div className="grid grid-cols-1 gap-8 px-6 py-9 md:grid-cols-[1fr_auto_280px] md:gap-12 md:px-10 md:py-12">
                          {/* Description + what to do */}
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                              {s.severity}
                            </span>
                            <p
                              className="mt-3 font-sans font-light tracking-[-0.02em] text-[var(--color-amber)]"
                              style={{
                                fontSize: "clamp(20px, 2.2vw, 26px)",
                                lineHeight: 1.25,
                              }}
                            >
                              {s.description}
                            </p>
                            <p className="mt-5 max-w-[520px] text-[14px] leading-[1.6] text-[var(--color-text-on-dark-muted)]">
                              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
                                Hva gjør jeg?
                              </span>
                              <br />
                              {s.whatToDo}
                            </p>
                            <Link
                              href={`/symptomer/${s.slug}`}
                              className="mt-7 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-amber)] transition-colors hover:text-white"
                            >
                              Les hele oppslaget
                              <ArrowUpRight className="size-3.5" aria-hidden="true" />
                            </Link>
                          </div>

                          {/* Vertical divider */}
                          <div className="hidden h-full w-px bg-[var(--color-rule-dark)] md:block" />

                          {/* Causes list */}
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                              Mulige årsaker
                            </span>
                            <ul className="mt-3 space-y-2">
                              {s.causes.map((cause) => (
                                <li
                                  key={cause}
                                  className="flex items-baseline gap-2 text-[13px] leading-[1.5] text-[var(--color-text-on-dark)]"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-1 inline-block size-1 shrink-0 rounded-full bg-[var(--color-brass)]"
                                  />
                                  {cause}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-between">
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

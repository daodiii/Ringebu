"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { TOP_SYMPTOMS, mapSeverity, TIER_META } from "./symptomsShared";

const TIPS = [
  {
    eyebrow: "Hovedartikkel",
    title: "Kaffe, brunost og tennene dine",
    sub: "Norsk kosthold og tannhelse — en oversikt fra vår journal.",
    href: "/artikler",
  },
  {
    eyebrow: "Notert",
    title: "Munnskyll — når det hjelper og når du kaster bort penger",
    sub: "Tre myter, kort forklart.",
    href: "/artikler",
  },
  {
    eyebrow: "Notert",
    title: "Spyttets superkrefter",
    sub: "Kroppens egen tannbeskyttelse.",
    href: "/artikler",
  },
] as const;

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function SymptomsTwoStreams() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <h2 className="display-section max-w-[680px] text-[var(--color-text-primary)]">
            Hva er det egentlig —{" "}
            <span className="font-light text-[var(--color-stone)]">og hvor raskt</span> bør du handle?
          </h2>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Til venstre: triage. Til høyre: tre lesetips fra journalen.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* LEFT — typographic triage list */}
          <div>
            <div className="mb-4 flex items-center gap-3 border-b border-[var(--color-rule)] pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                Triage
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Trykk for å se hva du bør gjøre
              </span>
            </div>

            <div>
              {TOP_SYMPTOMS.map((s, i) => {
                const sev = mapSeverity(s.severity);
                const meta = TIER_META[sev];
                const isOpen = openIdx === i;
                return (
                  <div key={s.title} className="border-b border-[var(--color-rule)]">
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 text-left transition-colors md:gap-7"
                      aria-expanded={isOpen}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span
                          className="block font-sans font-light tracking-[-0.025em] text-[var(--color-text-primary)] transition-transform group-hover:-translate-x-0.5"
                          style={{
                            fontSize: "clamp(20px, 2.3vw, 28px)",
                            lineHeight: 1.12,
                          }}
                        >
                          {s.title}
                        </span>
                        <span className="mt-1 block text-[13px] leading-[1.5] text-[var(--color-text-secondary)]">
                          {s.description.split(".")[0]}.
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="size-2 rounded-full"
                          style={{ backgroundColor: meta.dot }}
                        />
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.22em]"
                          style={{ color: sev === "now" ? "#A85838" : sev === "soon" ? "#6B4F2C" : "#8B7C6A" }}
                        >
                          {sev === "now" ? "Nå" : sev === "soon" ? "Undersøk" : "Følg med"}
                        </span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-[auto_1fr] gap-5 pb-6 md:gap-7">
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-transparent">
                              00
                            </span>
                            <div>
                              <p className="text-[14px] leading-[1.65] text-[var(--color-text-secondary)]">
                                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
                                  Hva gjør jeg?
                                </span>
                                <br />
                                {s.whatToDo}
                              </p>
                              <Link
                                href={`/symptomer/${s.slug}`}
                                className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-primary)] hover:text-[var(--color-stone)]"
                              >
                                Les hele oppslaget
                                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                              </Link>
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

          {/* RIGHT — editorial journal column */}
          <aside>
            <div className="mb-4 flex items-center gap-3 border-b border-[var(--color-rule)] pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                Fra journalen
              </span>
            </div>

            {/* Feature article */}
            <Link
              href={TIPS[0].href}
              className="group block py-7"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                {TIPS[0].eyebrow}
              </span>
              <h3
                className="mt-3 font-sans font-light tracking-[-0.025em] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-stone)]"
                style={{
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  lineHeight: 1.15,
                }}
              >
                {TIPS[0].title}
              </h3>
              <p className="mt-3 max-w-[420px] text-[13px] leading-[1.55] text-[var(--color-text-secondary)]">
                {TIPS[0].sub}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-stone)]">
                Les
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            {/* Minimal mentions */}
            <div className="border-t border-[var(--color-rule)]">
              {TIPS.slice(1).map((t) => (
                <Link
                  key={t.title}
                  href={t.href}
                  className="group block border-b border-[var(--color-rule)] py-5 last:border-b-0"
                >
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
                    {t.eyebrow}
                  </span>
                  <h4 className="mt-2 text-[16px] font-medium leading-[1.25] tracking-[-0.018em] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-stone)]">
                    {t.title}
                  </h4>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* Footer */}
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
            Se alle artikler
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

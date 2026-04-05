"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Phone,
  ChevronDown,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import { symptoms } from "@/data/content";

/* ─────────────── Helpers ─────────────── */

function SectionFade({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────── Severity helpers ─────────────── */

function isUrgent(severity: string) {
  return severity.includes("Haster") || severity.includes("snarest");
}

function severityStyle(severity: string) {
  if (severity.includes("Haster"))
    return {
      bg: "bg-rose-50",
      text: "text-rose-800",
      border: "border-rose-200",
      accent: "bg-rose-500",
      tint: "bg-rose-50/60",
    };
  if (severity.includes("snarest"))
    return {
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-200",
      accent: "bg-amber-500",
      tint: "bg-amber-50/60",
    };
  if (severity.includes("behandles"))
    return {
      bg: "bg-[var(--color-bg-cream)]",
      text: "text-[var(--color-accent)]",
      border: "border-[var(--color-accent-light)]",
      accent: "bg-[var(--color-accent)]",
      tint: "bg-[var(--color-bg-cream)]",
    };
  return {
    bg: "bg-[var(--color-bg-blue)]",
    text: "text-[var(--color-primary)]",
    border: "border-[var(--color-border)]",
    accent: "bg-[var(--color-stone-400)]",
    tint: "bg-[var(--color-bg-blue)]",
  };
}

const severityLegend = [
  { label: "Haster", bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200" },
  { label: "Snarest", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  { label: "Bør behandles", bg: "bg-[var(--color-bg-cream)]", text: "text-[var(--color-accent)]", border: "border-[var(--color-accent-light)]" },
  { label: "Bør undersøkes", bg: "bg-[var(--color-bg-blue)]", text: "text-[var(--color-primary)]", border: "border-[var(--color-border)]" },
];

/* ─────────────── PAGE ─────────────── */

export default function SymptomerPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const urgentSymptoms = symptoms.filter((s) => isUrgent(s.severity));
  const routineSymptoms = symptoms.filter((s) => !isUrgent(s.severity));

  return (
    <main className="pt-20">
      {/* ── Hero — Warm & Empathetic ── */}
      <section className="relative bg-[var(--color-bg-cream)] py-20 md:py-28 overflow-hidden">
        {/* Decorative terracotta blob */}
        <div className="absolute -top-[20%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-[var(--color-accent)]/[0.06] blur-3xl" />
        <div className="absolute -bottom-[15%] -left-[5%] w-[25vw] h-[25vw] rounded-full bg-[var(--color-accent-light)]/[0.08] blur-2xl" />

        <div className="container-width relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="eyebrow text-[var(--color-accent)] mb-4">
              Symptomguiden
            </p>
            <h1 className="heading-display text-[var(--color-primary)] mb-5">
              Kjenner du deg igjen?
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed max-w-xl">
              Jo tidligere du oppsøker tannlegen, desto enklere er behandlingen.
              Her finner du de vanligste symptomene og hva de kan bety.
            </p>
          </motion.div>

          {/* Severity legend */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {severityLegend.map((item) => (
              <span
                key={item.label}
                className={`${item.bg} ${item.text} ${item.border} border text-xs font-sans font-600 px-4 py-2 rounded-full`}
              >
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Urgent Symptoms Band ── */}
      <section className="py-16 md:py-24 bg-rose-50/40">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <SectionFade>
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <AlertTriangle className="size-5 text-rose-700" />
                <span className="text-xs font-sans font-700 tracking-[0.2em] uppercase text-rose-700">
                  Krever rask oppfølging
                </span>
              </div>
            </SectionFade>

            <div className="space-y-5">
              {urgentSymptoms.map((s, i) => {
                const style = severityStyle(s.severity);
                const isOpen = expanded === s.title;
                return (
                  <SectionFade key={s.title} delay={i * 0.08}>
                    <button
                      onClick={() =>
                        setExpanded(isOpen ? null : s.title)
                      }
                      className={`w-full text-left bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "border-rose-300 shadow-lg shadow-rose-500/5"
                          : "border-[var(--color-border)] hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/5"
                      }`}
                    >
                      {/* Colored left border */}
                      <div className="flex">
                        <div
                          className={`w-1.5 shrink-0 ${style.accent} rounded-l-2xl`}
                        />
                        <div className="flex-1 p-6 md:p-8">
                          {/* Severity bar */}
                          <div
                            className={`inline-flex items-center gap-2 ${style.bg} ${style.text} ${style.border} border rounded-full px-4 py-1.5 text-xs font-sans font-600 mb-4`}
                          >
                            <AlertTriangle className="size-3.5" />
                            {s.severity}
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h2 className="font-heading font-700 text-xl md:text-2xl text-[var(--color-primary)] mb-2">
                                {s.title}
                              </h2>
                              <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans font-400">
                                {s.description}
                              </p>
                            </div>
                            <ChevronDown
                              className={`size-5 text-[var(--color-text-muted)] shrink-0 mt-1 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-6 space-y-5">
                                  <div>
                                    <span className="text-xs font-sans font-600 uppercase tracking-wider text-[var(--color-accent)]">
                                      Mulige årsaker
                                    </span>
                                    <ul className="mt-2 space-y-1.5">
                                      {s.causes.map((c) => (
                                        <li
                                          key={c}
                                          className="flex items-center gap-2 text-[var(--color-text-secondary)] font-sans font-400"
                                        >
                                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                                          {c}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div
                                    className={`${style.tint} rounded-xl p-5`}
                                  >
                                    <span className="text-xs font-sans font-600 uppercase tracking-wider text-[var(--color-accent)]">
                                      Hva bør du gjøre?
                                    </span>
                                    <p className="text-[var(--color-primary)] mt-2 font-sans font-400 leading-relaxed">
                                      {s.whatToDo}
                                    </p>
                                  </div>
                                  {s.slug && (
                                    <Link
                                      href={`/artikler/${s.slug}`}
                                      className="inline-flex items-center gap-1.5 text-sm font-500 text-[var(--color-accent)] hover:text-[var(--color-primary-light)] transition-colors"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      Les relatert artikkel
                                      <ArrowUpRight className="size-4" />
                                    </Link>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </button>
                  </SectionFade>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Routine Symptoms Grid ── */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-blue)]">
        <div className="container-width">
          <div className="max-w-5xl mx-auto">
            <SectionFade>
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <Stethoscope className="size-5 text-[var(--color-accent)]" />
                <span className="text-xs font-sans font-700 tracking-[0.2em] uppercase text-[var(--color-accent)]">
                  Bør sjekkes ved neste besøk
                </span>
              </div>
            </SectionFade>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {routineSymptoms.map((s, i) => {
                const style = severityStyle(s.severity);
                const isOpen = expanded === s.title;
                return (
                  <SectionFade key={s.title} delay={i * 0.06}>
                    <button
                      onClick={() =>
                        setExpanded(isOpen ? null : s.title)
                      }
                      className={`w-full text-left bg-white rounded-2xl p-7 border transition-all duration-300 ${
                        isOpen
                          ? "border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/5"
                          : "border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${style.accent} shrink-0`}
                          />
                          <h2 className="font-heading font-600 text-lg text-[var(--color-primary)]">
                            {s.title}
                          </h2>
                        </div>
                        <ChevronDown
                          className={`size-4 text-[var(--color-text-muted)] shrink-0 mt-0.5 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans font-400 text-[0.95rem] ml-[22px]">
                        {s.description}
                      </p>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 space-y-4 ml-[22px]">
                              <div>
                                <span className="text-xs font-sans font-600 uppercase tracking-wider text-[var(--color-accent)]">
                                  Mulige årsaker
                                </span>
                                <ul className="mt-2 space-y-1.5">
                                  {s.causes.map((c) => (
                                    <li
                                      key={c}
                                      className="flex items-center gap-2 text-[var(--color-text-secondary)] font-sans font-400 text-sm"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                                      {c}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-[var(--color-bg-cream)] rounded-xl p-4">
                                <span className="text-xs font-sans font-600 uppercase tracking-wider text-[var(--color-accent)]">
                                  Hva bør du gjøre?
                                </span>
                                <p className="text-[var(--color-primary)] mt-2 font-sans font-400 leading-relaxed text-sm">
                                  {s.whatToDo}
                                </p>
                              </div>
                              {s.slug && (
                                <Link
                                  href={`/artikler/${s.slug}`}
                                  className="inline-flex items-center gap-1.5 text-sm font-500 text-[var(--color-accent)] hover:text-[var(--color-primary-light)] transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Les relatert artikkel
                                  <ArrowUpRight className="size-4" />
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </SectionFade>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-cream)]">
        <div className="container-width">
          <SectionFade>
            <div className="text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-6">
                <Phone className="size-7 text-[var(--color-accent)]" />
              </div>
              <h2 className="heading-section text-[var(--color-primary)] mb-4">
                Usikker? Ring oss.
              </h2>
              <p className="text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed mb-8">
                Det koster ingenting å ringe. Vi kan gi deg råd over telefon og
                hjelpe deg å vurdere om du trenger en time.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/kontakt"
                  className="btn-primary px-8 py-4"
                >
                  <Calendar className="size-5" />
                  Bestill time
                </Link>
                <a
                  href="tel:61280412"
                  className="btn-outline px-8 py-4"
                >
                  <Phone className="size-5" />
                  Ring 61 28 04 12
                </a>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="relative z-10 container-width py-20 text-center">
          <SectionFade>
            <h2 className="heading-section text-white mb-4">
              Ikke vent – ta kontakt i dag
            </h2>
            <p className="text-lg text-white/80 font-sans font-400 max-w-lg mx-auto mb-8">
              Tidlig behandling er alltid enklere og mindre kostbart. Vi hjelper
              deg gjerne.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/kontakt"
                className="btn-primary bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-bg-cream)] px-8 py-4"
              >
                <Calendar className="size-5" />
                Bestill time
              </Link>
              <a
                href="tel:61280412"
                className="btn-secondary px-8 py-4"
              >
                <Phone className="size-5" />
                Ring 61 28 04 12
              </a>
            </div>
          </SectionFade>
        </div>
      </section>
    </main>
  );
}

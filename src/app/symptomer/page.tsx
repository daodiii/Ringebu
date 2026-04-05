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
      gradient: "linear-gradient(to bottom, #e11d48, #f97316)",
      tint: "bg-rose-50/60",
    };
  if (severity.includes("snarest"))
    return {
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-200",
      gradient: "linear-gradient(to bottom, #f59e0b, #d97706)",
      tint: "bg-amber-50/60",
    };
  if (severity.includes("behandles"))
    return {
      bg: "bg-[var(--color-bg-cream)]",
      text: "text-[var(--color-accent)]",
      border: "border-[var(--color-accent-light)]",
      gradient: "linear-gradient(to bottom, #C67B5C, #D4B896)",
      tint: "bg-[var(--color-bg-cream)]",
    };
  return {
    bg: "bg-[var(--color-bg-blue)]",
    text: "text-[var(--color-primary)]",
    border: "border-[var(--color-border)]",
    gradient: "linear-gradient(to bottom, #A89279, #D4B896)",
    tint: "bg-[var(--color-bg-blue)]",
  };
}

/* Gradient left-border colors for routine symptoms */
const routineGradients = [
  "linear-gradient(to bottom, #C67B5C, #D4B896)",
  "linear-gradient(to bottom, #D4B896, #5C3D2E)",
  "linear-gradient(to bottom, #5C3D2E, #10b981)",
  "linear-gradient(to bottom, #10b981, #C67B5C)",
  "linear-gradient(to bottom, #A89279, #D4B896)",
];

/* ─────────────── PAGE ─────────────── */

export default function SymptomerPage() {
  const urgentSymptoms = symptoms.filter((s) => isUrgent(s.severity));
  const routineSymptoms = symptoms.filter((s) => !isUrgent(s.severity));

  const [expanded, setExpanded] = useState<Set<string>>(
    () =>
      new Set([
        ...urgentSymptoms.slice(0, 2).map((s) => s.title),
        ...routineSymptoms.slice(0, 2).map((s) => s.title),
      ])
  );

  const toggleExpanded = (title: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <main className="pt-20">
      {/* ── Hero — Brown like other pages ── */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-accent-light)]/5 blur-3xl" />
        </div>

        <div className="container-width text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-display text-white mb-5">
              Vanlige symptomer du bør kjenne til
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-sans font-400 leading-relaxed max-w-xl mx-auto">
              Kjenner du igjen noen av disse symptomene? Jo tidligere du oppsøker
              tannlegen, desto enklere er behandlingen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Urgent Symptoms Band ── */}
      <section className="py-16 md:py-24 bg-rose-50/40">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
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
                const isOpen = expanded.has(s.title);
                return (
                  <SectionFade key={s.title} delay={i * 0.08}>
                    <button
                      onClick={() => toggleExpanded(s.title)}
                      className={`w-full text-left bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "border-rose-300 shadow-lg shadow-rose-500/5"
                          : "border-[var(--color-border)] hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/5"
                      }`}
                    >
                      {/* Gradient left border */}
                      <div className="flex">
                        <div
                          className="w-2 shrink-0 rounded-l-2xl"
                          style={{ background: style.gradient }}
                        />
                        <div className="flex-1 p-8 md:p-10">
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

                          {/* Cause pills — always visible */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {s.causes.slice(0, 3).map((c) => (
                              <span
                                key={c}
                                className="rounded-full bg-[var(--color-bg-cream)] border border-[var(--color-border)] px-3 py-1 text-xs font-sans font-500 text-[var(--color-text-secondary)]"
                              >
                                {c}
                              </span>
                            ))}
                            {s.causes.length > 3 && (
                              <span className="rounded-full bg-[var(--color-bg-blue)] px-3 py-1 text-xs font-sans font-500 text-[var(--color-text-muted)]">
                                +{s.causes.length - 3} til
                              </span>
                            )}
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
          <div className="max-w-6xl mx-auto">
            <SectionFade>
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <Stethoscope className="size-5 text-[var(--color-accent)]" />
                <span className="text-xs font-sans font-700 tracking-[0.2em] uppercase text-[var(--color-accent)]">
                  Bør sjekkes ved neste besøk
                </span>
              </div>
            </SectionFade>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {routineSymptoms.map((s, i) => {
                const isOpen = expanded.has(s.title);
                const leftGradient = routineGradients[i % routineGradients.length];
                return (
                  <SectionFade key={s.title} delay={i * 0.06}>
                    <button
                      onClick={() => toggleExpanded(s.title)}
                      className={`w-full text-left bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/5"
                          : "border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
                      }`}
                    >
                      <div className="flex">
                        <div
                          className="w-2 shrink-0 rounded-l-2xl"
                          style={{ background: leftGradient }}
                        />
                        <div className="flex-1 p-7 md:p-9">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h2 className="font-heading font-600 text-lg text-[var(--color-primary)]">
                              {s.title}
                            </h2>
                            <ChevronDown
                              className={`size-4 text-[var(--color-text-muted)] shrink-0 mt-0.5 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                          <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans font-400 text-[0.95rem]">
                            {s.description}
                          </p>

                          {/* Cause pills — always visible */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {s.causes.slice(0, 3).map((c) => (
                              <span
                                key={c}
                                className="rounded-full bg-[var(--color-bg-cream)] border border-[var(--color-border)] px-3 py-1 text-xs font-sans font-500 text-[var(--color-text-secondary)]"
                              >
                                {c}
                              </span>
                            ))}
                            {s.causes.length > 3 && (
                              <span className="rounded-full bg-[var(--color-bg-blue)] px-3 py-1 text-xs font-sans font-500 text-[var(--color-text-muted)]">
                                +{s.causes.length - 3} til
                              </span>
                            )}
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
                                <div className="mt-5 space-y-4">
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Phone } from "lucide-react";
import { symptoms } from "@/data/content";

export default function SymptomerPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
        </div>
        <div className="container-width text-center relative z-10">
          <span className="text-[var(--color-accent-light)] text-sm font-sans font-600 uppercase tracking-[0.15em] mb-4 block">
            Symptomer
          </span>
          <h1 className="heading-display text-white mb-5">
            Vanlige symptomer du bør kjenne til
          </h1>
          <p className="text-lg text-white/70 font-sans font-300 max-w-xl mx-auto">
            Kjenner du igjen noen av disse symptomene? Jo tidligere du oppsøker
            tannlegen, desto enklere er behandlingen.
          </p>
        </div>
      </section>

      {/* Symptoms Grid */}
      <section className="section-padding bg-[var(--color-bg-blue)]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {symptoms.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full text-left bg-white rounded-2xl p-8 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 group"
                >
                  <div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-heading font-600 text-xl text-[var(--color-primary)]">
                          {s.title}
                        </h2>
                        <span className={`text-xs font-sans font-500 px-3 py-1 rounded-full shrink-0 ml-3 ${
                          s.severity.includes("Haster")
                            ? "bg-rose-50 text-rose-700"
                            : s.severity.includes("snarest")
                            ? "bg-amber-50 text-amber-700"
                            : "bg-[var(--color-bg-cream)] text-[var(--color-accent)]"
                        }`}>
                          {s.severity}
                        </span>
                      </div>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans font-300">
                        {s.description}
                      </p>

                      {expanded === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 space-y-5"
                        >
                          <div>
                            <span className="text-xs font-sans font-600 uppercase tracking-wider text-[var(--color-accent)]">
                              Mulige årsaker
                            </span>
                            <ul className="mt-2 space-y-1.5">
                              {s.causes.map((c) => (
                                <li
                                  key={c}
                                  className="flex items-center gap-2 text-[var(--color-text-secondary)] font-sans font-300"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-[var(--color-bg-cream)] rounded-xl p-5">
                            <span className="text-xs font-sans font-600 uppercase tracking-wider text-[var(--color-accent)]">
                              Hva bør du gjøre?
                            </span>
                            <p className="text-[var(--color-primary-dark)] mt-2 font-sans font-300 leading-relaxed">
                              {s.whatToDo}
                            </p>
                          </div>
                          {s.slug && (
                            <Link
                              href={`/artikler/${s.slug}`}
                              className="inline-flex items-center gap-1.5 text-sm font-500 text-[var(--color-accent)] hover:text-[var(--color-primary-light)] transition-colors"
                            >
                              Les relatert artikkel
                              <ArrowUpRight className="size-4" />
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="relative z-10 container-width py-20 text-center">
          <h2 className="heading-section text-white mb-4">
            Ikke vent – ta kontakt i dag
          </h2>
          <p className="text-lg text-white/80 font-sans font-300 max-w-lg mx-auto mb-8">
            Tidlig behandling er alltid enklere og mindre kostbart. Vi hjelper
            deg gjerne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="btn-primary bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-bg-cream)] px-8 py-4">
              <Calendar className="size-5" />
              Bestill time
            </Link>
            <a href="tel:61280412" className="btn-secondary px-8 py-4">
              <Phone className="size-5" />
              Ring 61 28 04 12
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

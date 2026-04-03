"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Phone, ArrowRight } from "lucide-react";
import { symptoms } from "@/data/content";

export default function SymptomerPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="bg-[var(--color-emerald-950)] py-20 md:py-28">
        <div className="container-width text-center">
          <span className="text-[#C9B99A] text-sm font-sans font-600 uppercase tracking-[0.15em] mb-4 block">
            Symptomer
          </span>
          <h1 className="heading-display text-white mb-5">
            Vanlige symptomer du bør kjenne til
          </h1>
          <p className="text-lg text-[#F0E6D6]/70 font-sans font-300 max-w-xl mx-auto">
            Kjenner du igjen noen av disse symptomene? Jo tidligere du oppsøker
            tannlegen, desto enklere er behandlingen.
          </p>
        </div>
      </section>

      {/* Symptoms Grid */}
      <section className="section-padding bg-[var(--color-emerald-50)]">
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
                  className="w-full text-left bg-white rounded-2xl p-8 border border-[var(--color-emerald-100)] hover:border-[var(--color-emerald-300)] transition-all duration-300 hover:shadow-lg hover:shadow-[#B8976A]/5 group"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-emerald-100)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-emerald-200)] transition-colors">
                      <s.icon className="size-7 text-[var(--color-emerald-700)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-heading font-600 text-xl text-[var(--color-emerald-900)]">
                          {s.title}
                        </h2>
                        <span className={`text-xs font-sans font-500 px-3 py-1 rounded-full shrink-0 ml-3 ${
                          s.severity.includes("Haster")
                            ? "bg-rose-50 text-rose-700"
                            : s.severity.includes("snarest")
                            ? "bg-amber-50 text-amber-700"
                            : "bg-[#F0E6D6] text-[#7A6B55]"
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
                            <span className="text-xs font-sans font-600 uppercase tracking-wider text-[var(--color-emerald-600)]">
                              Mulige årsaker
                            </span>
                            <ul className="mt-2 space-y-1.5">
                              {s.causes.map((c) => (
                                <li
                                  key={c}
                                  className="flex items-center gap-2 text-[var(--color-text-secondary)] font-sans font-300"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald-400)]" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-[var(--color-emerald-50)] rounded-xl p-5">
                            <span className="text-xs font-sans font-600 uppercase tracking-wider text-[var(--color-emerald-600)]">
                              Hva bør du gjøre?
                            </span>
                            <p className="text-[var(--color-emerald-800)] mt-2 font-sans font-300 leading-relaxed">
                              {s.whatToDo}
                            </p>
                          </div>
                          {s.slug && (
                            <Link
                              href={`/artikler/${s.slug}`}
                              className="inline-flex items-center gap-1.5 text-sm font-500 text-[var(--color-emerald-600)] hover:text-[var(--color-emerald-700)] transition-colors"
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
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-emerald-800)] via-[var(--color-emerald-700)] to-[var(--color-emerald-600)]" />
        <div className="relative z-10 container-width py-20 text-center">
          <h2 className="heading-section text-white mb-4">
            Ikke vent – ta kontakt i dag
          </h2>
          <p className="text-lg text-[#F0E6D6]/80 font-sans font-300 max-w-lg mx-auto mb-8">
            Tidlig behandling er alltid enklere og mindre kostbart. Vi hjelper
            deg gjerne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="btn-primary bg-white text-[var(--color-emerald-800)] hover:bg-[#F0E6D6] px-8 py-4">
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

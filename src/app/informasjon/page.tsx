"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supportPages } from "@/data/content";

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

/* ─────────────── PAGE ─────────────── */

export default function InformasjonPage() {
  return (
    <main className="pt-20">
      {/* ── Header ── */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-primary-light)]/15 blur-3xl" />
        </div>
        <div className="container-width text-center relative z-10">
          <h1 className="heading-display text-white mb-5">
            Støtte og rettigheter
          </h1>
          <p className="text-lg text-white/70 font-sans font-300 max-w-2xl mx-auto leading-relaxed">
            Mange har rett på hel eller delvis dekning av tannlegekostnader uten
            å vite det. Her er en oversikt over ordningene som finnes i Norge.
          </p>
        </div>
      </section>

      {/* ── Støtte cards ── */}
      <section className="py-20 md:py-28 bg-[var(--color-bg-cream)]">
        <div className="container-width">
          <SectionFade>
            <div className="max-w-3xl mb-12 md:mb-16">
              <h2 className="heading-section text-[var(--color-primary)] mb-4">
                Støtte til tannbehandling
              </h2>
              <p className="text-[1.05rem] text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed max-w-xl">
                Finn ut hvilke ordninger som gjelder for deg — fra gratis
                behandling for barn til HELFO-refusjon og frikort.
              </p>
            </div>
          </SectionFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {supportPages.map((sp, i) => (
              <SectionFade key={sp.slug} delay={i * 0.06}>
                <Link
                  href={`/informasjon/${sp.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-2xl border border-[var(--color-border)] p-7 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:-translate-y-1 cursor-pointer">
                    <span className="inline-block self-start px-3 py-1 rounded-full bg-[var(--color-bg-cream)] text-[var(--color-accent)] text-xs font-700 font-sans tracking-wide mb-4">
                      {sp.badge}
                    </span>
                    <h3 className="font-heading font-600 text-lg text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                      {sp.shortTitle}
                    </h3>
                    <p className="text-[0.95rem] text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed mb-5 flex-1">
                      {sp.hubSummary}
                    </p>
                    <div className="flex items-center gap-2 text-[var(--color-accent)] font-sans font-500 text-sm group-hover:text-[var(--color-primary)] transition-colors">
                      Les mer
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>
        <div className="relative z-10 container-width py-20 md:py-28 text-center">
          <SectionFade>
            <h2 className="heading-section text-white mb-5">
              Har du spørsmål?
            </h2>
            <p className="text-xl text-white/80 font-sans font-400 leading-relaxed max-w-lg mx-auto mb-10">
              Finner du ikke svar på det du lurer på? Ta kontakt, så hjelper vi
              deg gjerne.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/kontakt"
                className="btn-primary bg-white text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)] px-8 py-4 text-base"
              >
                Kontakt oss
              </Link>
              <a href="tel:61280412" className="btn-secondary text-base px-8 py-4">
                Ring 61 28 04 12
              </a>
            </div>
          </SectionFade>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  SmilePlus,
  User,
  Stethoscope,
  Shield,
  HandHeart,
  Heart,
  Phone,
} from "lucide-react";
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

/* ─────────────── Data grouping ─────────────── */

const freePages = supportPages.filter((sp) => sp.badge === "Gratis");
const subsidyPages = supportPages.filter((sp) => sp.badge !== "Gratis");

const personaNav = [
  { slug: "barn", label: "Barn 0–18", icon: SmilePlus, badge: "Gratis" },
  { slug: "unge-voksne", label: "19–28 år", icon: User, badge: "75 % rabatt" },
  { slug: "helfo", label: "Diagnose", icon: Stethoscope, badge: "Refusjon" },
  { slug: "frikort", label: "Høye utgifter", icon: Shield, badge: "kr 3 278" },
  { slug: "nav", label: "Lav inntekt", icon: HandHeart, badge: "Behovsprøvd" },
  { slug: "eldre", label: "Eldre / uføre", icon: Heart, badge: "Gratis" },
];

const topBorderColors: Record<string, string> = {
  "unge-voksne": "border-t-[var(--color-accent)]",
  helfo: "border-t-[var(--color-accent-light)]",
  frikort: "border-t-[var(--color-primary-light)]",
  nav: "border-t-[var(--color-stone-400)]",
};

/* ─────────────── PAGE ─────────────── */

export default function InformasjonPage() {
  return (
    <main className="pt-20">
      {/* ── Hero — Reassuring ── */}
      <section className="relative bg-[var(--color-bg-cream)] py-20 md:py-28 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent)]/[0.05] blur-3xl" />
        <div className="absolute -bottom-[15%] -left-[8%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-accent-light)]/[0.07] blur-2xl" />

        <div className="container-width relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow text-[var(--color-accent)] mb-4">
              Støtte og rettigheter
            </p>
            <h1 className="heading-display text-[var(--color-primary)] mb-5">
              Du har kanskje allerede dekning
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed max-w-2xl mx-auto">
              Mange har rett på hel eller delvis dekning av tannlegekostnader
              uten å vite det. Her er en oversikt over ordningene som finnes.
            </p>
          </motion.div>

          {/* Badge preview row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {supportPages.map((sp, i) => (
              <motion.span
                key={sp.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                className="font-heading font-700 text-base md:text-lg px-5 py-2.5 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-primary)] shadow-sm"
              >
                {sp.badge}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured: Free Coverage (Barn + Eldre) ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-width">
          <div className="max-w-5xl mx-auto">
            <SectionFade>
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <ShieldCheck className="size-5 text-emerald-600" />
                <span className="text-xs font-sans font-700 tracking-[0.2em] uppercase text-emerald-700">
                  Helt gratis behandling
                </span>
              </div>
            </SectionFade>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {freePages.map((sp, i) => (
                <SectionFade key={sp.slug} delay={i * 0.1}>
                  <Link
                    href={`/informasjon/${sp.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-[var(--color-bg-cream)] rounded-2xl border border-[var(--color-border)] p-8 md:p-10 h-full flex flex-col transition-all duration-300 hover:shadow-[0_20px_60px_rgba(60,36,21,0.08)] hover:-translate-y-1 cursor-pointer">
                      {/* Badge as headline */}
                      <span className="font-heading font-700 text-3xl md:text-4xl text-emerald-700 mb-4">
                        {sp.badge}
                      </span>
                      <h3 className="font-heading font-600 text-xl text-[var(--color-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                        {sp.shortTitle}
                      </h3>
                      <p className="text-[0.95rem] text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed mb-6 flex-1">
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
        </div>
      </section>

      {/* ── Subsidy Cards Grid ── */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-blue)]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <SectionFade>
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <Stethoscope className="size-5 text-[var(--color-accent)]" />
                <span className="text-xs font-sans font-700 tracking-[0.2em] uppercase text-[var(--color-accent)]">
                  Delvis dekning og støtte
                </span>
              </div>
            </SectionFade>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {subsidyPages.map((sp, i) => (
                <SectionFade key={sp.slug} delay={i * 0.08}>
                  <Link
                    href={`/informasjon/${sp.slug}`}
                    className="group block h-full"
                  >
                    <div
                      className={`bg-white rounded-2xl border border-[var(--color-border)] border-t-4 ${
                        topBorderColors[sp.slug] || "border-t-[var(--color-accent)]"
                      } p-7 h-full flex flex-col transition-all duration-300 hover:shadow-[0_16px_48px_rgba(60,36,21,0.08)] hover:-translate-y-1 cursor-pointer`}
                    >
                      {/* Badge value — large */}
                      <span className="font-heading font-700 text-2xl md:text-3xl text-[var(--color-accent)] mb-2">
                        {sp.badge}
                      </span>
                      <div className="h-px bg-[var(--color-border)] mb-4" />
                      <h3 className="font-heading font-600 text-lg text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {sp.shortTitle}
                      </h3>
                      <p className="text-[0.95rem] text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed mb-5 flex-1">
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
        </div>
      </section>

      {/* ── Persona Navigator ── */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-cream)]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <SectionFade>
              <h2 className="heading-section text-[var(--color-primary)] text-center mb-10 md:mb-12">
                Hvem gjelder det for?
              </h2>
            </SectionFade>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {personaNav.map((item, i) => {
                const Icon = item.icon;
                return (
                  <SectionFade key={item.slug} delay={i * 0.06}>
                    <Link
                      href={`/informasjon/${item.slug}`}
                      className="group block"
                    >
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl border border-[var(--color-border)] p-5 text-center transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 hover:border-[var(--color-accent)]/30 cursor-pointer h-full flex flex-col items-center justify-center gap-3"
                      >
                        <div className="w-11 h-11 rounded-xl bg-[var(--color-accent)]/[0.08] flex items-center justify-center">
                          <Icon className="size-5 text-[var(--color-accent)]" />
                        </div>
                        <span className="font-sans font-600 text-sm text-[var(--color-primary)]">
                          {item.label}
                        </span>
                        <span className="font-heading font-700 text-xs text-[var(--color-accent)]">
                          {item.badge}
                        </span>
                      </motion.div>
                    </Link>
                  </SectionFade>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>
        <div className="relative z-10 container-width py-20 md:py-28 text-center">
          <SectionFade>
            {/* Trust signal */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <CheckCircle className="size-4 text-[var(--color-accent-light)]" />
              <span className="text-sm font-sans font-500 text-white/60">
                Vi hjelper deg å finne riktig ordning
              </span>
            </div>

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
              <a
                href="tel:61280412"
                className="btn-secondary text-base px-8 py-4"
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

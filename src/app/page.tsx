"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  ChevronDown,
} from "lucide-react";

/* ─────────────────────── Helpers ─────────────────────── */

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── HERO ─────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background: Valley landscape */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-valley-bg.jpg"
          alt=""
          fill
          className="object-cover scale-[1.03]"
          style={{ objectPosition: "center 40%", filter: "blur(0.5px)" }}
          priority
          quality={100}
          sizes="100vw"
        />
        {/* Gradient overlay — light scrim so the valley nature shows through */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(42,24,16,0.55) 0%, rgba(42,24,16,0.40) 25%, rgba(42,24,16,0.18) 50%, rgba(42,24,16,0.06) 75%, transparent 100%)",
          }}
        />
        {/* Subtle noise texture for depth */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-light)] to-transparent z-10" />

      {/* Content */}
      <div className="container-width relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="w-12 h-[2px] bg-[var(--color-accent)] mb-6" />
              <p className="text-xs font-sans font-600 uppercase tracking-[0.25em] text-[var(--color-accent-light)] mb-4" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
                Ringebu Tannlegesenter
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-heading font-700 text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl text-white leading-[1.1] mb-6"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)" }}
            >
              Vi tar vare på{" "}
              <span className="text-[var(--color-accent-light)]">
                smilet ditt
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 font-sans font-400 leading-relaxed max-w-lg mb-10"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)" }}
            >
              Moderne tannbehandling med personlig omsorg i hjertet av
              Gudbrandsdalen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] text-white px-8 py-3.5 font-sans text-sm font-600 tracking-[0.01em] transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--color-accent)]/20 cursor-pointer"
              >
                Bestill time
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="tel:61280412"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/30 text-white px-8 py-3.5 font-sans text-sm font-500 tracking-[0.01em] transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
              >
                <Phone className="size-4" />
                Ring 61 28 04 12
              </a>
            </motion.div>
          </div>

          {/* Right: Clinic photo card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:block"
          >
            <div className="relative rounded-sm overflow-hidden shadow-2xl shadow-black/30 border border-white/10 aspect-[4/5] max-w-[420px] ml-auto">
              <Image
                src="/images/hero-clinic.jpg"
                alt="Moderne behandlingsrom ved Ringebu Tannlegesenter"
                fill
                className="object-cover"
                style={{ objectPosition: "center 50%" }}
                sizes="(max-width: 1024px) 0vw, 35vw"
              />
              {/* Bottom label */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-16 pb-5 px-6">
                <p className="text-white/90 font-sans text-sm font-500 tracking-wide">
                  Moderne utstyr &middot; Trygg behandling
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to page background */}
      <div
        className="absolute bottom-0 inset-x-0 h-6 z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-bg-cream))",
        }}
      />
    </section>
  );
}

/* ─────────────────────── TREATMENTS (Bento Grid) ─────────────────────── */

function TreatmentsSection() {
  return (
    <section id="behandlinger" className="py-24 md:py-32 bg-[var(--color-bg-blue)]">
      <div className="container-width">
        {/* Header */}
        <SectionFade>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="heading-section text-[var(--color-primary)] mb-5">
                Skreddersydde løsninger for ditt smil
              </h2>
              <p className="body-large max-w-xl">
                Vi gjør behandlinger som både ser og føles helt naturlige.
              </p>
            </div>
            <Link
              href="/behandlinger"
              className="group flex items-center gap-2 text-[var(--color-primary)] font-heading font-600 tracking-wide border-b-2 border-[var(--color-primary)] pb-1 shrink-0 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            >
              Se alle behandlinger
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SectionFade>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {/* Large Featured Card - Forebyggende + Image */}
          <SectionFade className="md:col-span-8">
            <Link href="/behandlinger" className="group block h-full cursor-pointer">
              <div className="rounded-2xl bg-[var(--color-bg-cream)] border border-[var(--color-border)] overflow-hidden h-full transition-all duration-500 hover:shadow-[0_20px_60px_rgba(60,36,21,0.1)] hover:-translate-y-1">
                <div className="relative aspect-[21/9] overflow-hidden">
                  <Image
                    src="/images/ringebutannMain.jpg"
                    alt="Ringebu Tannlegesenter behandlingsrom"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: "center 60%" }}
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/30 to-transparent" />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-heading font-700 text-[var(--color-primary)] mb-3">
                    Forebyggende behandling
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans font-400 text-[1.05rem] max-w-lg">
                    Undersøkelse, profesjonell rens, fluorbehandling og personlig veiledning
                    for å holde smilet friskt gjennom hele livet.
                  </p>
                </div>
              </div>
            </Link>
          </SectionFade>

          {/* Tall Dark Card - Bleking */}
          <SectionFade className="md:col-span-4" delay={0.1}>
            <Link href="/behandlinger" className="group block h-full cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-[var(--color-primary)] p-10 md:p-12 text-white h-full min-h-[320px] md:min-h-[400px] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_60px_rgba(60,36,21,0.2)] hover:-translate-y-1">
                <Image
                  src="/images/dental-instruments.png"
                  alt="Profesjonelt tannlegeutstyr"
                  fill
                  className="object-cover opacity-15 transition-transform duration-700 group-hover:scale-105 scale-110"
                  style={{ objectPosition: "center 70%" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-heading font-700 mb-4">
                    Profesjonell Tannbleking
                  </h3>
                  <p className="text-white/70 text-[1.05rem] leading-relaxed font-sans font-400">
                    Få et strålende smil med vår skånsomme, kliniske blekeprosess
                    utviklet for varige resultater.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-2 font-heading font-600 tracking-wide mt-8 text-white group-hover:text-[var(--color-accent-light)] transition-colors">
                  Les mer
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </SectionFade>

          {/* Accent Card - Kron og Bro */}
          <SectionFade className="md:col-span-4" delay={0.15}>
            <Link href="/behandlinger" className="group block h-full cursor-pointer">
              <div className="relative rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/[0.08] to-[var(--color-bg-cream)] border-2 border-[var(--color-accent)]/20 p-8 md:p-10 h-full flex flex-col justify-between min-h-[220px] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(198,123,92,0.12)] hover:-translate-y-1 hover:border-[var(--color-accent)]/35 overflow-hidden">
                <Image
                  src="/images/toothbrush-colorful.png"
                  alt=""
                  fill
                  className="object-cover opacity-[0.12] scale-110 transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: "center" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-heading font-700 text-[var(--color-primary)] mb-3">
                    Kron, Bro & Fyllinger
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-[1.05rem] leading-relaxed font-sans font-400">
                    Naturlig utseende restaureringer som gjenoppretter form, funksjon og selvtillit.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-[var(--color-accent)] font-heading font-600 text-sm mt-6 group-hover:text-[var(--color-primary)] transition-colors">
                  Se behandlinger
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </SectionFade>

          {/* Wide Card - Akutt tannhjelp */}
          <SectionFade className="md:col-span-8" delay={0.2}>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-cream)] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 group h-full transition-all duration-500 hover:shadow-[0_20px_60px_rgba(60,36,21,0.08)] hover:-translate-y-1">
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-heading font-700 text-[var(--color-primary)] mb-3">
                  Akutt tannhjelp
                </h3>
                <p className="text-[var(--color-text-secondary)] text-[1.05rem] mb-6 leading-relaxed font-sans font-400">
                  Har du fått akutt tannpine? Vi prioriterer hastehenvendelser og hjelper deg
                  raskt.
                </p>
                <a
                  href="tel:61280412"
                  className="inline-flex items-center gap-2 border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] font-heading font-600 pb-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                >
                  <Phone className="size-4" />
                  Ring vakttelefon
                </a>
              </div>
              <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden relative">
                <Image
                  src="/images/clinic-sign.jpg"
                  alt="Ringebu Tannlegesenter skilt"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 scale-150"
                  style={{ objectPosition: "50% 35%" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </SectionFade>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── TRUST SIGNALS ─────────────────────── */

function TrustSection() {
  return (
    <section className="py-16 md:py-20 bg-[var(--color-bg-cream)]">
      <div className="container-width">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <SectionFade>
            <div className="flex items-center gap-4 mb-10 md:mb-12">
              <div className="h-px bg-[var(--color-border)] flex-grow" />
              <span className="text-xs font-sans font-700 tracking-[0.25em] text-[var(--color-accent)] uppercase whitespace-nowrap">
                Trygghet &amp; kvalitet
              </span>
              <div className="h-px bg-[var(--color-border)] flex-grow" />
            </div>
          </SectionFade>

          {/* Two trust cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* NTF Membership */}
            <SectionFade>
              <div className="relative bg-white rounded-2xl border border-[var(--color-border)] p-8 md:p-10 h-full overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(60,36,21,0.06)] hover:-translate-y-0.5">
                {/* Subtle decorative corner */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[var(--color-accent)]/[0.04] blur-2xl" />

                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-heading font-700 text-[var(--color-primary)] mb-3">
                    Medlem av Den norske tannlegeforening
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-[0.95rem] leading-relaxed font-sans font-400 mb-6">
                    Som NTF-medlem følger vi strenge etiske retningslinjer og
                    holder oss faglig oppdatert gjennom kontinuerlig
                    etterutdanning — din garanti for trygg og kvalitetssikret
                    behandling.
                  </p>

                  {/* Key points */}
                  <div className="space-y-2.5">
                    {[
                      "Etiske retningslinjer for pasientbehandling",
                      "Løpende faglig oppdatering og etterutdanning",
                      "Kvalitetssikret praksis og utstyr",
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                        <span className="text-sm text-[var(--color-text-secondary)] font-sans font-400">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionFade>

            {/* Direkte oppgjør med HELFO */}
            <SectionFade delay={0.12}>
              <div className="relative bg-[var(--color-primary)] rounded-2xl p-8 md:p-10 h-full overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(60,36,21,0.15)] hover:-translate-y-0.5">
                {/* Subtle texture */}
                <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-white/[0.04] blur-2xl" />
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[var(--color-accent)]/[0.08] blur-2xl" />

                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-heading font-700 text-white mb-3">
                    Direkte oppgjør med HELFO
                  </h3>
                  <p className="text-white/75 text-[0.95rem] leading-relaxed font-sans font-400 mb-6">
                    Du betaler kun din egenandel — vi ordner resten direkte med
                    HELFO. Ingen forskuddsbetaling, ingen refusjonskrav å sende
                    selv.
                  </p>

                  {/* Key points */}
                  <div className="space-y-2.5">
                    {[
                      "Slipper å legge ut for hele behandlingen",
                      "Vi sender refusjonskrav på dine vegne",
                      "Gjelder alle 15 HELFO-stønadspunkter",
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-light)] mt-2 shrink-0" />
                        <span className="text-sm text-white/70 font-sans font-400">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionFade>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── GUIDE (Unified Card) ─────────────────────── */

const guideItems = [
  {
    tag: "Hjelp deg selv",
    title: "Symptomer",
    description:
      "Tannpine, blødende tannkjøtt eller ising i tennene? Typen smerte avslører ofte hva som er galt — og hvor raskt du bør handle.",
    cta: "Finn årsaken",
    href: "/symptomer",
  },
  {
    tag: "Ekspertråd",
    title: "Tips & råd",
    description:
      "Artikler om tannhelse, forebygging og hverdagstips fra teamet ved Ringebu Tannlegesenter.",
    cta: "Les artiklene",
    href: "/artikler",
  },
  {
    tag: "Rettigheter",
    title: "Informasjon & støtte",
    description:
      "Støtteordninger, rettigheter og alt du lurer på om tannbehandling i Norge. Barn, unge voksne, HELFO, NAV og frikort.",
    cta: "Les mer",
    href: "/informasjon",
  },
];

function GuideSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-yellow)]">
      <div className="container-width">
        <div className="max-w-5xl mx-auto">
          <SectionFade>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[0_8px_40px_rgba(60,36,21,0.05)]">
              {/* Dark header bar */}
              <div className="bg-[var(--color-primary)] px-6 md:px-10 py-5 flex flex-wrap gap-2">
                {guideItems.map((item, i) => (
                  <span
                    key={item.title}
                    className={`px-5 py-2.5 rounded-lg font-sans text-sm font-600 transition-colors ${
                      i === 0
                        ? "bg-white/15 text-white"
                        : "text-white/50 hover:text-white/75 hover:bg-white/[0.06]"
                    }`}
                  >
                    {item.title}
                  </span>
                ))}
              </div>

              {/* Three columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
                {guideItems.map((item, i) => (
                  <SectionFade key={item.title} delay={i * 0.1}>
                    <Link
                      href={item.href}
                      className="group block p-7 md:p-8 transition-colors hover:bg-[var(--color-stone-50)] cursor-pointer h-full"
                    >
                      <p className="text-[0.65rem] font-sans font-700 tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3">
                        {item.tag}
                      </p>
                      <h3 className="text-lg md:text-xl font-heading font-700 text-[var(--color-primary)] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans font-400 mb-5">
                        {item.description}
                      </p>
                      <span className="text-sm font-heading font-600 text-[var(--color-accent)] group-hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1.5">
                        {item.cta}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </SectionFade>
                ))}
              </div>
            </div>
          </SectionFade>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── CTA ─────────────────────── */

function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]" />
      <div className="absolute inset-0">
        <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[15%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 container-width py-20 md:py-28">
        <SectionFade>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-section text-white mb-5">
              Klar for en trygg tannlegeopplevelse?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-sans font-400 leading-relaxed mb-10">
              Ta det første steget mot bedre tannhelse. Bestill en time hos oss
              – vi tar godt vare på deg.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kontakt" className="btn-primary bg-white text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)] px-8 py-4 text-base">
                Bestill time nå
              </Link>
              <a
                href="tel:61280412"
                className="btn-secondary text-base px-8 py-4"
              >
                Ring 61 28 04 12
              </a>
            </div>
          </div>
        </SectionFade>
      </div>
    </section>
  );
}

/* ─────────────────────── BETALINGSSTØTTE ─────────────────────── */

const supportCategories = [
  {
    title: "Barn og ungdom",
    subtitle: "0–18 år — offentlig tannklinikk",
    badge: "Gratis",
    details: [
      {
        label: "Hvem har rett?",
        text: "Alle barn og ungdom fra fødsel til det kalenderåret de fyller **18 år**. Automatisk innkalling fra offentlig tannklinikk i ditt område.",
      },
      {
        label: "Hva dekkes?",
        text: "All undersøkelse og behandling er **helt gratis** gjennom Den offentlige tannhelsetjenesten — unntatt tannregulering (kjeveortopedi).",
      },
    ],
  },
  {
    title: "Unge voksne (19–28 år)",
    subtitle: "Redusert egenandel på offentlig klinikk",
    badge: "75 % rabatt",
    details: [
      {
        label: "Hvem har rett?",
        text: "Unge voksne fra det kalenderåret de fyller 19 til og med det kalenderåret de fyller **28 år**. Du må selv ta kontakt — det er ikke automatisk.",
      },
      {
        label: "Hva koster det?",
        text: "Du betaler kun **25 % egenandel** basert på offentlige takster. Gjelder kun på offentlige tannklinikker.",
      },
    ],
    stat: { label: "Du betaler kun", value: "25 %", suffix: "av offentlige takster" },
  },
  {
    title: "HELFO-stønad",
    subtitle: "Refusjon fra folketrygden",
    badge: "15 tilstander",
    details: [
      {
        label: "Vanlige tilstander",
        text: "**Periodontitt** · Munntørrhet · Bittanomalier · Tannutviklingsforstyrrelser · Tannskade ved ulykke · Nedsatt egenomsorg ved kronisk sykdom — og flere. Totalt 15 stønadspunkter.",
      },
      {
        label: "Slik fungerer det",
        text: "Du trenger ikke søke selv. **Tannlegen vurderer** om du kvalifiserer og sender kravet til HELFO på dine vegne.",
      },
    ],
  },
  {
    title: "Frikort",
    subtitle: "Egenandelstak per kalenderår",
    badge: "kr 3 278",
    details: [
      {
        label: "Slik fungerer det",
        text: "Når du har betalt over **kr 3 278** i godkjente egenandeler i løpet av et kalenderår, får du frikort automatisk innen ca. 3 uker.",
      },
      {
        label: "For tannbehandling",
        text: "Kun egenandeler for HELFO-punkt **5 og 6** (kjevesykdom og periodontitt) teller mot frikortet. Vanlig tannbehandling teller ikke.",
      },
    ],
    stat: { label: "Egenandelstak 2025:", value: "kr 3 278", suffix: "" },
  },
  {
    title: "NAV sosialhjelp",
    subtitle: "Økonomisk støtte ved behov",
    badge: "Behovsprøvd",
    details: [
      {
        label: "Hvem kan søke?",
        text: "Alle som **ikke har råd** til nødvendig tannbehandling og ikke kvalifiserer for andre ordninger. NAV vurderer din totale økonomi.",
      },
      {
        label: "Slik søker du",
        text: "Få et skriftlig **behandlings- og kostnadsoverslag** fra tannlegen. Søk hos ditt lokale NAV-kontor **før** du starter behandlingen.",
      },
    ],
  },
  {
    title: "Eldre og uføre",
    subtitle: "Sykehjem og hjemmesykepleie",
    badge: "Gratis",
    details: [
      {
        label: "Hvem har rett?",
        text: "Beboere i **sykehjem**, personer med ukentlig **hjemmesykepleie** (min. 3 md. varighet), og personer med psykisk utviklingshemming.",
      },
      {
        label: "Viktig å vite",
        text: "Ordningen forutsetter at omsorgssituasjonen varer **mer enn 3 måneder**. Mottakere av kun praktisk bistand/hjemmehjelp kvalifiserer ikke.",
      },
    ],
  },
];

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-600 text-[var(--color-text-primary)]">
        {part.replace(/\*\*/g, "")}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function SupportCard({
  item,
  index,
}: {
  item: (typeof supportCategories)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <SectionFade delay={index * 0.06}>
      <div
        onClick={() => setOpen(!open)}
        className={`
          relative bg-white rounded-2xl border overflow-hidden cursor-pointer
          transition-all duration-300
          ${
            open
              ? "border-[var(--color-accent-light)] shadow-lg shadow-[var(--color-primary)]/5"
              : "border-[var(--color-border)] hover:border-[var(--color-accent-light)] hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:-translate-y-0.5"
          }
        `}
      >
        {/* Left accent bar */}
        <div
          className={`absolute top-0 left-0 w-[3px] h-full bg-[var(--color-accent)] rounded-r-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Header */}
        <div className="flex items-center gap-4 p-6">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-600 text-base text-[var(--color-primary)]">
              {item.title}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] font-sans font-400">
              {item.subtitle}
            </p>
          </div>
          <span className="hidden sm:inline-block bg-[var(--color-bg-cream)] text-[var(--color-accent)] text-[0.6875rem] font-700 px-3 py-1.5 rounded-lg tracking-wide shrink-0">
            {item.badge}
          </span>
          <ChevronDown
            className={`size-[18px] text-[var(--color-text-muted)] transition-all duration-300 shrink-0 ${
              open ? "rotate-180 text-[var(--color-accent)]" : ""
            }`}
            strokeWidth={2.5}
          />
        </div>

        {/* Expandable body */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="border-t border-[var(--color-border)] pt-5 space-y-3">
                  {item.details.map((d) => (
                    <div
                      key={d.label}
                      className="bg-[var(--color-stone-50)] rounded-xl p-5"
                    >
                      <p className="font-heading font-600 text-[var(--color-primary)] text-sm mb-1">
                        {d.label}
                      </p>
                      <p className="text-[0.95rem] text-[var(--color-text-secondary)] leading-relaxed font-sans font-300">
                        {renderBold(d.text)}
                      </p>
                    </div>
                  ))}
                  {item.stat && (
                    <div className="flex items-center gap-3 bg-[var(--color-primary)] text-white rounded-xl px-5 py-3 mt-2">
                      <span className="text-xs font-500">{item.stat.label}</span>
                      <span className="font-heading font-700 text-xl text-[var(--color-accent-light)]">
                        {item.stat.value}
                      </span>
                      {item.stat.suffix && (
                        <span className="text-xs font-500 text-white/80">
                          {item.stat.suffix}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionFade>
  );
}

function BetalingsstotteSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-yellow)]">
      <div className="container-width">
        {/* Header */}
        <SectionFade>
          <div className="text-center mb-14 md:mb-16">
            <h2 className="heading-section text-[var(--color-primary)] mb-4">
              Støtte til tannbehandling
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] font-sans font-300 max-w-xl mx-auto leading-relaxed">
              Visste du at mange har rett på hel eller delvis dekning av
              tannlegekostnader? Finn ut hva som gjelder for deg.
            </p>
          </div>
        </SectionFade>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {supportCategories.map((item, i) => (
            <SupportCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <SectionFade delay={0.4}>
          <div className="text-center mt-14">
            <p className="text-[var(--color-text-secondary)] font-sans font-400 text-sm mb-5">
              Usikker på hva du har rett på? Vi hjelper deg å finne ut av det.
            </p>
            <a
              href="tel:61280412"
              className="btn-primary px-8 py-4"
            >
              <Phone className="size-[18px]" />
              Ring 61 28 04 12
            </a>
          </div>
        </SectionFade>
      </div>
    </section>
  );
}

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TreatmentsSection />
      <TrustSection />
      <GuideSection />
      <CTASection />
    </main>
  );
}

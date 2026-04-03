"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import {
  treatments,
  treatmentColors,
  symptoms,
  articles,
  stats,
  tips,
} from "@/data/content";

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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative h-[100dvh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src="/images/hero-clinic.jpg"
          alt="Ringebu Tannlegesenter - Moderne behandlingsrom"
          fill
          className="object-cover"
          style={{ objectPosition: "center 75%", filter: "brightness(1.05)" }}
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Bottom gradient blend */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(61,50,37,0.5) 0%, transparent 25%)" }}
      />

      {/* Bottom espresso band */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ y: textY }}
      >
        <div
          className="w-full px-6 md:px-12 py-6 md:py-8"
          style={{ background: "rgba(61,50,37,0.93)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        >
          <div className="container-width flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xs font-sans font-600 uppercase tracking-[0.2em] text-[#B8976A] mb-3"
              >
                Ringebu Tannlegesenter
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="font-heading font-700 text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-2"
              >
                Vi tar vare på{" "}
                <span className="text-[#D4AF37]">smilet ditt</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-base md:text-lg text-white/70 font-sans font-400 leading-relaxed max-w-xl"
              >
                Moderne tannbehandling med personlig omsorg i hjertet av
                Gudbrandsdalen.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-3 md:flex-shrink-0"
            >
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full bg-[#B8976A] text-[#3D3225] px-7 py-3 text-sm font-sans font-600 transition-all duration-300 hover:bg-[#A68658] hover:shadow-lg"
              >
                Bestill time
              </Link>
              <a
                href="tel:61280412"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 text-white px-7 py-3 text-sm font-sans font-500 transition-all duration-300 hover:bg-white/10"
              >
                <Phone className="size-4" />
                Ring 61 28 04 12
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── TREATMENTS (Bento Grid) ─────────────────────── */

function TreatmentsSection() {
  return (
    <section id="behandlinger" className="py-24 md:py-32 bg-white">
      <div className="container-width">
        {/* Header */}
        <SectionFade>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="heading-section text-[var(--color-emerald-900)] mb-5">
                Skreddersydde løsninger for ditt smil
              </h2>
              <p className="body-large max-w-xl">
                Vi kombinerer klinisk presisjon med estetisk forståelse for å gi
                deg et resultat som føles like naturlig som det ser ut.
              </p>
            </div>
            <Link
              href="/behandlinger"
              className="group flex items-center gap-2 text-[var(--color-emerald-700)] font-heading font-600 tracking-wide border-b-2 border-[var(--color-emerald-700)] pb-1 shrink-0 hover:text-[var(--color-emerald-600)] hover:border-[var(--color-emerald-600)] transition-colors"
            >
              Se alle behandlinger
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SectionFade>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {/* Large Featured Card - Kosmetisk */}
          <SectionFade className="md:col-span-8">
            <div className="rounded-2xl bg-white border border-[var(--color-border)] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 group h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="w-full md:w-1/2">
                <span className="text-xs font-sans font-700 tracking-[0.2em] text-[var(--color-emerald-600)] uppercase mb-4 block">
                  Topp moderne estetikk
                </span>
                <h3 className="text-2xl md:text-3xl font-heading font-600 text-[var(--color-emerald-900)] mb-3">
                  Kosmetisk tannpleie
                </h3>
                <p className="text-[var(--color-stone-700)] mb-8 leading-relaxed font-sans font-400 text-xl">
                  Tannbleking, fasetter og estetiske behandlinger for et vakrere smil.
                  Gjenopprett selvtilliten med moderne, diskrete løsninger.
                </p>
                <Link
                  href="/behandlinger"
                  className="inline-flex items-center gap-2 bg-[var(--color-emerald-700)] text-white px-8 py-3 rounded-lg font-sans font-500 hover:bg-[var(--color-emerald-800)] transition-colors"
                >
                  Les mer
                </Link>
              </div>
              <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden relative">
                <Image
                  src="/images/ringebutannMain.jpg"
                  alt="Kosmetisk tannpleie"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center 60%" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </SectionFade>

          {/* Tall Card - Tannbleking */}
          <SectionFade className="md:col-span-4" delay={0.1}>
            <div className="group relative overflow-hidden rounded-2xl bg-[var(--color-emerald-800)] p-10 md:p-12 text-white h-full min-h-[320px] md:min-h-[400px] flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:bg-[var(--color-emerald-700)]">
              <Image
                src="/images/dental-instruments.png"
                alt="Profesjonelt tannlegeutstyr"
                fill
                className="object-cover opacity-20 transition-transform duration-700 group-hover:scale-105 scale-110"
                style={{ objectPosition: "center 70%" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-heading font-600 mb-4">
                  Profesjonell Tannbleking
                </h3>
                <p className="text-white/75 text-xl leading-relaxed font-sans font-400">
                  Få et strålende smil med vår skånsomme, kliniske blekeprosess
                  utviklet for varige resultater.
                </p>
              </div>
              <Link
                href="/kontakt"
                className="relative z-10 flex items-center gap-2 font-heading font-600 tracking-wide mt-8 hover:underline underline-offset-8 transition-all"
              >
                Bestill time
              </Link>
            </div>
          </SectionFade>

          {/* Small Card - Forebyggende */}
          <SectionFade className="md:col-span-4" delay={0.15}>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FAF3E8] to-[#F5EDE0] p-8 md:p-10 h-full flex flex-col justify-between min-h-[200px] transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:from-[#F5EDE0] hover:to-[#EFE5D6]">
              <Image
                src="/images/toothbrush-colorful.png"
                alt="Fargerik tannbørste"
                fill
                className="object-cover opacity-15 transition-transform duration-700 group-hover:scale-105 scale-110"
                style={{ objectPosition: "center 50%" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-heading font-600 text-[var(--color-emerald-900)] mb-3">
                  Forebyggende behandling
                </h3>
                <p className="text-[var(--color-stone-700)] text-xl leading-relaxed font-sans font-400">
                  Tannrens, fluorbehandling og veiledning for å unngå fremtidige problemer.
                </p>
              </div>
            </div>
          </SectionFade>

          {/* Wide Card - Akutt */}
          <SectionFade className="md:col-span-8" delay={0.2}>
            <div className="rounded-2xl border border-[var(--color-border)] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 group h-full transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:border-[var(--color-emerald-300)]">
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-heading font-600 text-[var(--color-emerald-900)] mb-3">
                  Akutt tannhjelp
                </h3>
                <p className="text-[var(--color-stone-700)] text-xl mb-6 leading-relaxed font-sans font-400">
                  Har du fått akutt tannpine? Vi prioriterer hastehenvendelser og hjelper deg
                  raskt.
                </p>
                <a
                  href="tel:61280412"
                  className="inline-flex items-center gap-2 border-b-2 border-[var(--color-emerald-700)] text-[var(--color-emerald-700)] font-heading font-600 pb-1 hover:text-[var(--color-emerald-600)] hover:border-[var(--color-emerald-600)] transition-colors"
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

/* ─────────────────────── TIPS & SYMPTOMER (Two Pathways) ─────────────────────── */

function TipsAndSymptomsSection() {
  const tipArticles = [
    { title: "Alt du trenger å vite om fluortilskudd", href: "/artikler" },
    { title: "Hvordan pusse tenner for maksimal effekt?", href: "/artikler" },
    { title: "Hvorfor bruke tanntråd og mellombørste?", href: "/artikler" },
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-emerald-50)]">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left: Symptomer (dark card) */}
          <SectionFade className="lg:col-span-2">
            <div className="bg-[var(--color-emerald-900)] rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between min-h-[360px]">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-700 text-white mb-6">
                  Symptomer
                </h2>
                <p className="text-[#F0E6D6]/85 text-xl leading-relaxed font-sans font-400">
                  Opplever du ubehag og er usikker på hva det kan være? Her får du
                  oversikt over vanlige symptomer forbundet med munnhelse.
                </p>
              </div>

              <Link
                href="/symptomer"
                className="inline-flex items-center gap-3 text-white font-heading font-600 mt-8 group"
              >
                Finn årsaken her
                <div className="w-10 h-10 rounded-full bg-[#7A6B55]/50 flex items-center justify-center group-hover:bg-[#B8976A]/50 transition-colors">
                  <ChevronRight className="size-5 text-[#E8DFCF]" />
                </div>
              </Link>
            </div>
          </SectionFade>

          {/* Right: Tips & råd (white card) */}
          <SectionFade className="lg:col-span-3" delay={0.15}>
            <div className="bg-white rounded-2xl p-8 md:p-10 h-full shadow-sm border border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-700 text-[var(--color-emerald-900)]">
                  Tips & råd
                </h2>
                <Link
                  href="/artikler"
                  className="text-[var(--color-emerald-600)] font-sans font-500 text-sm hover:underline underline-offset-4"
                >
                  Se alle
                </Link>
              </div>

              <div className="divide-y divide-[var(--color-border)]">
                {tipArticles.map((tip, i) => (
                  <SectionFade key={tip.title} delay={i * 0.08}>
                    <Link
                      href={tip.href}
                      className="flex items-center justify-between py-6 group"
                    >
                      <span className="text-lg md:text-xl font-sans font-400 text-[var(--color-emerald-900)] group-hover:text-[var(--color-emerald-700)] transition-colors pr-4">
                        {tip.title}
                      </span>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-emerald-50)] flex items-center justify-center group-hover:bg-[var(--color-emerald-100)] transition-colors">
                        <ChevronRight className="size-5 text-[var(--color-emerald-600)]" />
                      </div>
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

/* ─────────────────────── ARTICLES (Magazine Layout) ─────────────────────── */

function ArticlesSection() {
  const displayArticles = articles.slice(0, 2);

  return (
    <section id="artikler" className="py-12 md:py-16 bg-white">
      <div className="container-width">
        {/* Centered Divider Header */}
        <SectionFade>
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="h-px bg-[var(--color-border)] flex-grow" />
            <span className="text-xs font-sans font-700 tracking-[0.25em] text-[var(--color-emerald-600)] uppercase whitespace-nowrap">
              Journal &amp; Ekspertise
            </span>
            <div className="h-px bg-[var(--color-border)] flex-grow" />
          </div>
        </SectionFade>

        {/* Compact Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayArticles.map((article, i) => (
            <SectionFade key={article.slug} delay={i * 0.12}>
              <Link href={`/artikler/${article.slug}`} className="group flex gap-5 items-start">
                <div className="w-32 h-24 md:w-40 md:h-28 shrink-0 overflow-hidden rounded-lg relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="160px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-sans font-700 tracking-[0.15em] text-[var(--color-text-muted)] uppercase mb-2">
                    <span>{article.category}</span>
                    <span className="w-1 h-1 bg-[var(--color-emerald-500)] rounded-full" />
                    <span>{article.readTime} lesing</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-600 text-[var(--color-emerald-900)] mb-2 leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {article.title}
                  </h3>
                  <p className="text-[var(--color-stone-600)] text-sm leading-relaxed font-sans font-400 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </SectionFade>
          ))}
        </div>

        {/* CTA */}
        <SectionFade delay={0.3}>
          <div className="mt-8 md:mt-10 text-center">
            <Link
              href="/artikler"
              className="btn-outline px-10 py-4"
            >
              Besøk magasinet
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </SectionFade>
      </div>
    </section>
  );
}

/* ─────────────────────── CTA ─────────────────────── */

function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-emerald-950)]" />
      <div className="absolute inset-0">
        <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#C9B99A]/10 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[15%] w-[40vw] h-[40vw] rounded-full bg-[#C9B99A]/10 blur-3xl" />
      </div>

      <div className="relative z-10 container-width py-20 md:py-28">
        <SectionFade>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-section text-white mb-5">
              Klar for en trygg tannlegeopplevelse?
            </h2>
            <p className="text-xl md:text-2xl text-[#F0E6D6]/90 font-sans font-400 leading-relaxed mb-10">
              Ta det første steget mot bedre tannhelse. Bestill en time hos oss
              – vi tar godt vare på deg.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kontakt" className="btn-primary bg-white text-[var(--color-emerald-800)] hover:bg-[#F0E6D6] px-8 py-4 text-base">
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

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TreatmentsSection />
      <TipsAndSymptomsSection />
      <ArticlesSection />
      <CTASection />
    </main>
  );
}

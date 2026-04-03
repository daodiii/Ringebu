"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import {
  treatments,
  treatmentColors,
  articles,
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
  return (
    <section className="relative bg-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="accent-line mb-6" />
              <p className="text-xs font-sans font-600 uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
                Ringebu Tannlegesenter
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-heading font-700 text-4xl md:text-5xl lg:text-6xl text-[var(--color-primary)] leading-tight mb-5"
            >
              Vi tar vare på{" "}
              <span className="text-[var(--color-accent)]">smilet ditt</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-[var(--color-stone-600)] font-sans font-400 leading-relaxed max-w-lg mb-8"
            >
              Moderne tannbehandling med personlig omsorg i hjertet av
              Gudbrandsdalen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/kontakt"
                className="btn-primary px-7 py-3"
              >
                Bestill time
              </Link>
              <a
                href="tel:61280412"
                className="btn-outline px-7 py-3"
              >
                <Phone className="size-4" />
                Ring 61 28 04 12
              </a>
            </motion.div>
          </div>

          {/* Right: Staggered Photo Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Left column — offset down */}
            <div className="flex flex-col gap-4 pt-8 lg:pt-12">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src="/images/hero-clinic.jpg"
                  alt="Ringebu Tannlegesenter klinikk"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 75%" }}
                  priority
                  sizes="(max-width: 768px) 45vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/dental-instruments.png"
                  alt="Tannlegeutstyr"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 25vw"
                />
              </div>
            </div>
            {/* Right column — flush top */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/ringebutannMain.jpg"
                  alt="Behandlingsrom"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 60%" }}
                  priority
                  sizes="(max-width: 768px) 45vw, 25vw"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image
                  src="/images/clinic-sign.jpg"
                  alt="Ringebu Tannlegesenter skilt"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "50% 35%" }}
                  sizes="(max-width: 768px) 45vw, 25vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
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
                Vi kombinerer klinisk presisjon med estetisk forståelse for å gi
                deg et resultat som føles like naturlig som det ser ut.
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
          {/* Large Featured Card - Kosmetisk */}
          <SectionFade className="md:col-span-8">
            <div className="rounded-2xl bg-white border border-[var(--color-border)] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 group h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="w-full md:w-1/2">
                <span className="text-xs font-sans font-700 tracking-[0.2em] text-[var(--color-accent)] uppercase mb-4 block">
                  Topp moderne estetikk
                </span>
                <h3 className="text-2xl md:text-3xl font-heading font-600 text-[var(--color-primary)] mb-3">
                  Kosmetisk tannpleie
                </h3>
                <p className="text-[var(--color-stone-700)] mb-8 leading-relaxed font-sans font-400 text-xl">
                  Tannbleking, fasetter og estetiske behandlinger for et vakrere smil.
                  Gjenopprett selvtilliten med moderne, diskrete løsninger.
                </p>
                <Link
                  href="/behandlinger"
                  className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-sans font-500 hover:bg-[var(--color-primary-dark)] transition-colors"
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
            <div className="group relative overflow-hidden rounded-2xl bg-[var(--color-primary)] p-10 md:p-12 text-white h-full min-h-[320px] md:min-h-[400px] flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:bg-[var(--color-primary-light)]">
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
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-bg-cream)] to-[var(--color-bg-yellow)] p-8 md:p-10 h-full flex flex-col justify-between min-h-[200px] transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
              <Image
                src="/images/toothbrush-colorful.png"
                alt="Fargerik tannbørste"
                fill
                className="object-cover opacity-15 transition-transform duration-700 group-hover:scale-105 scale-110"
                style={{ objectPosition: "center 50%" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-heading font-600 text-[var(--color-primary)] mb-3">
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
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 group h-full transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:border-[var(--color-accent-light)]">
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-heading font-600 text-[var(--color-primary)] mb-3">
                  Akutt tannhjelp
                </h3>
                <p className="text-[var(--color-stone-700)] text-xl mb-6 leading-relaxed font-sans font-400">
                  Har du fått akutt tannpine? Vi prioriterer hastehenvendelser og hjelper deg
                  raskt.
                </p>
                <a
                  href="tel:61280412"
                  className="inline-flex items-center gap-2 border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] font-heading font-600 pb-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
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
    <section className="py-24 md:py-32 bg-[var(--color-bg-yellow)]">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left: Symptomer (dark card) */}
          <SectionFade className="lg:col-span-2">
            <div className="bg-[var(--color-primary)] rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between min-h-[360px]">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-700 text-white mb-6">
                  Symptomer
                </h2>
                <p className="text-white/80 text-xl leading-relaxed font-sans font-400">
                  Opplever du ubehag og er usikker på hva det kan være? Her får du
                  oversikt over vanlige symptomer forbundet med munnhelse.
                </p>
              </div>

              <Link
                href="/symptomer"
                className="inline-flex items-center gap-3 text-white font-heading font-600 mt-8 group"
              >
                Finn årsaken her
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[var(--color-accent)]/30 transition-colors">
                  <ChevronRight className="size-5 text-white" />
                </div>
              </Link>
            </div>
          </SectionFade>

          {/* Right: Tips & råd (white card) */}
          <SectionFade className="lg:col-span-3" delay={0.15}>
            <div className="bg-white rounded-2xl p-8 md:p-10 h-full shadow-sm border border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-700 text-[var(--color-primary)]">
                  Tips & råd
                </h2>
                <Link
                  href="/artikler"
                  className="text-[var(--color-accent)] font-sans font-500 text-sm hover:underline underline-offset-4"
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
                      <span className="text-lg md:text-xl font-sans font-400 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors pr-4">
                        {tip.title}
                      </span>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-bg-cream)] flex items-center justify-center group-hover:bg-[var(--color-bg-mint)] transition-colors">
                        <ChevronRight className="size-5 text-[var(--color-accent)]" />
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
    <section id="artikler" className="py-12 md:py-16 bg-[var(--color-bg-mint)]">
      <div className="container-width">
        {/* Centered Divider Header */}
        <SectionFade>
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="h-px bg-[var(--color-border)] flex-grow" />
            <span className="text-xs font-sans font-700 tracking-[0.25em] text-[var(--color-accent)] uppercase whitespace-nowrap">
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
                    <span className="w-1 h-1 bg-[var(--color-accent)] rounded-full" />
                    <span>{article.readTime} lesing</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-600 text-[var(--color-primary)] mb-2 leading-tight group-hover:underline decoration-1 underline-offset-4">
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

/* ─────────────────────── PRE-CTA BUFFER (Cream) ─────────────────────── */

function PreCTASection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-width" />
    </section>
  );
}

/* ─────────────────────── CTA ─────────────────────── */

function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-primary)]" />
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

/* ─────────────────────── MAIN PAGE ─────────────────────── */

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TreatmentsSection />
      <TipsAndSymptomsSection />
      <ArticlesSection />
      <PreCTASection />
      <CTASection />
    </main>
  );
}

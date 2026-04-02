"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Phone,
  ChevronDown,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import {
  treatments,
  treatmentColors,
  symptoms,
  articles,
  stats,
  tips,
} from "@/data/content";

/* ─────────────────────── Helpers ─────────────────────── */

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString("nb-NO")}
      {suffix}
    </span>
  );
}

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
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative h-[100dvh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src="/images/ringebutannMain.jpg"
          alt="Ringebu Tannlegesenter - Modern tannklinikk"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-emerald-950)] via-[var(--color-emerald-900)]/90 to-[var(--color-emerald-800)]/70" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-emerald-300/5 blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full container-width"
        style={{ y: textY }}
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-100 text-sm font-sans font-400">
              Din tannlege i Ringebu
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="heading-display text-white mb-6"
          >
            Vi tar vare på{" "}
            <span className="text-emerald-300">smilet ditt</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-emerald-100/80 font-sans font-300 leading-relaxed max-w-xl mb-10"
          >
            Moderne tannbehandling med personlig omsorg i hjertet av
            Gudbrandsdalen. Trygg, skånsom og alltid med ditt beste i tankene.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/kontakt" className="btn-primary text-base px-8 py-4">
              <Calendar className="size-5" />
              Bestill time
            </Link>
            <Link href="#behandlinger" className="btn-secondary text-base px-8 py-4">
              Våre behandlinger
              <ArrowRight className="size-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs font-sans tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5 text-white/50" />
        </motion.div>
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
            <div className="group relative overflow-hidden rounded-2xl bg-[var(--color-emerald-50)] p-10 md:p-12 h-full min-h-[320px] md:min-h-[400px] flex flex-col justify-end">
              <Image
                src="/images/service-cosmetic.jpg"
                alt="Kosmetisk tannpleie"
                fill
                className="object-cover mix-blend-multiply opacity-15 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="relative z-10 max-w-md">
                <span className="text-xs font-sans font-700 tracking-[0.2em] text-[var(--color-emerald-600)] uppercase mb-4 block">
                  Topp moderne estetikk
                </span>
                <h3 className="text-3xl md:text-4xl font-heading font-600 text-[var(--color-emerald-900)] mb-4">
                  Kosmetisk tannpleie
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed font-sans font-300">
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
            </div>
          </SectionFade>

          {/* Tall Card - Tannbleking / Featured */}
          <SectionFade className="md:col-span-4" delay={0.1}>
            <div className="group relative overflow-hidden rounded-2xl bg-[var(--color-emerald-800)] p-10 md:p-12 text-white h-full min-h-[320px] md:min-h-[400px] flex flex-col justify-between">
              <div className="relative z-10">
                <Sparkles className="size-10 text-emerald-300 mb-6" />
                <h3 className="text-2xl md:text-3xl font-heading font-600 mb-4">
                  Profesjonell Tannbleking
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-sans font-300">
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
            <div className="rounded-2xl bg-[var(--color-stone-50)] border border-[var(--color-border)] p-8 md:p-10 h-full flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="text-xl md:text-2xl font-heading font-600 text-[var(--color-emerald-900)] mb-3">
                  Forebyggende behandling
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed font-sans font-300">
                  Tannrens, fluorbehandling og veiledning for å unngå fremtidige problemer.
                </p>
              </div>
              <ShieldCheck className="size-14 text-[var(--color-emerald-200)] self-end mt-6" />
            </div>
          </SectionFade>

          {/* Wide Card - Akutt */}
          <SectionFade className="md:col-span-8" delay={0.2}>
            <div className="rounded-2xl border border-[var(--color-border)] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 group h-full">
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-heading font-600 text-[var(--color-emerald-900)] mb-3">
                  Akutt tannhjelp
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm mb-6 leading-relaxed font-sans font-300">
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
                  src="/images/service-emergency.jpg"
                  alt="Akutt tannbehandling"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
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

/* ─────────────────────── SYMPTOMS + TIPS (Combined) ─────────────────────── */

function SymptomsAndTipsSection() {
  const displaySymptoms = symptoms.slice(0, 4);

  return (
    <section id="symptomer" className="py-24 md:py-32 bg-[var(--color-stone-50)]">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Symptoms */}
          <SectionFade>
            <div>
              <span className="text-xs font-sans font-700 tracking-[0.25em] text-[var(--color-emerald-600)] uppercase mb-10 block">
                Symptomer du bør merke deg
              </span>
              <div className="space-y-7">
                {displaySymptoms.map((s, i) => (
                  <SectionFade key={s.title} delay={i * 0.08}>
                    <Link
                      href={s.slug ? `/artikler/${s.slug}` : "/symptomer"}
                      className="flex gap-6 md:gap-8 group cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-emerald-600)] shadow-sm group-hover:bg-[var(--color-emerald-700)] group-hover:text-white transition-all duration-300">
                        <s.icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-heading font-600 text-[var(--color-emerald-900)] mb-2 group-hover:text-[var(--color-emerald-700)] transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans font-300">
                          {s.description}
                        </p>
                      </div>
                    </Link>
                  </SectionFade>
                ))}
              </div>
              <SectionFade delay={0.35}>
                <Link
                  href="/symptomer"
                  className="inline-flex items-center gap-2 mt-10 text-[var(--color-emerald-700)] font-heading font-600 border-b-2 border-[var(--color-emerald-700)] pb-1 hover:text-[var(--color-emerald-600)] hover:border-[var(--color-emerald-600)] transition-colors"
                >
                  Se alle symptomer
                  <ArrowRight className="size-4" />
                </Link>
              </SectionFade>
            </div>
          </SectionFade>

          {/* Right: Tips & Advice */}
          <SectionFade delay={0.15}>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[var(--color-border)]">
              <span className="text-xs font-sans font-700 tracking-[0.25em] text-[var(--color-emerald-600)] uppercase mb-10 block">
                Tips og gode råd
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {tips.map((tip, i) => (
                  <SectionFade key={tip.number} delay={0.2 + i * 0.06}>
                    <div>
                      <span className="block text-[var(--color-emerald-600)] font-heading font-600 text-lg mb-2">
                        {tip.number}
                      </span>
                      <h4 className="font-heading font-600 text-sm text-[var(--color-emerald-900)] mb-2">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans font-300">
                        {tip.description}
                      </p>
                    </div>
                  </SectionFade>
                ))}
              </div>
              <Link
                href="/artikler"
                className="w-full mt-10 py-4 border-2 border-[var(--color-emerald-700)] text-[var(--color-emerald-700)] text-xs font-sans font-700 tracking-[0.15em] uppercase hover:bg-[var(--color-emerald-700)] hover:text-white transition-all rounded-lg flex items-center justify-center"
              >
                Se alle helseråd
              </Link>
            </div>
          </SectionFade>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── TRUST / STATS ─────────────────────── */

function TrustSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <SectionFade>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/about-clinic.jpg"
                  alt="Ringebu Tannlegesenter klinikk"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-5 border border-[var(--color-emerald-100)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-emerald-100)] flex items-center justify-center">
                    <Phone className="size-5 text-[var(--color-emerald-600)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-text-muted)] font-sans">Ring oss</div>
                    <a href="tel:61280412" className="font-heading font-600 text-[var(--color-emerald-900)]">
                      61 28 04 12
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SectionFade>

          {/* Text Side */}
          <div>
            <SectionFade delay={0.1}>
              <span className="eyebrow mb-4 block">Om oss</span>
              <h2 className="heading-section mb-5">
                Din trygghet er vår prioritet
              </h2>
              <p className="body-large mb-6">
                Hos Ringebu Tannlegesenter kombinerer vi moderne tannmedisin med
                ekte omsorg. Vårt erfarne team sørger for at hver pasient får en
                trygg og komfortabel opplevelse.
              </p>
              <p className="body-large mb-10">
                Vi investerer kontinuerlig i ny teknologi og faglig utvikling for
                å gi deg den beste behandlingen. Din tannhelse er vår lidenskap.
              </p>
            </SectionFade>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <SectionFade key={s.label} delay={0.15 + i * 0.08}>
                  <div className="bg-[var(--color-stone-50)] rounded-2xl p-5 text-center">
                    <div className="font-heading font-600 text-3xl md:text-4xl text-[var(--color-emerald-700)] mb-1">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)] font-sans">
                      {s.label}
                    </div>
                  </div>
                </SectionFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── ARTICLES (Editorial) ─────────────────────── */

function ArticlesSection() {
  const displayArticles = articles.slice(0, 2);

  return (
    <section id="artikler" className="py-24 md:py-32 bg-white">
      <div className="container-width">
        {/* Centered Divider Header */}
        <SectionFade>
          <div className="flex items-center gap-4 mb-16 md:mb-20">
            <div className="h-px bg-[var(--color-border)] flex-grow" />
            <span className="text-xs font-sans font-700 tracking-[0.25em] text-[var(--color-emerald-600)] uppercase whitespace-nowrap">
              Journal &amp; Ekspertise
            </span>
            <div className="h-px bg-[var(--color-border)] flex-grow" />
          </div>
        </SectionFade>

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {displayArticles.map((article, i) => (
            <SectionFade key={article.slug} delay={i * 0.12}>
              <Link href={`/artikler/${article.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-xl mb-6 md:mb-8 relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs font-sans font-700 tracking-[0.15em] text-[var(--color-text-muted)] uppercase mb-4">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-[var(--color-emerald-500)] rounded-full" />
                  <span>{article.readTime} lesing</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-600 text-[var(--color-emerald-900)] mb-4 leading-tight group-hover:underline decoration-1 underline-offset-4">
                  {article.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans font-300 line-clamp-3">
                  {article.excerpt}
                </p>
              </Link>
            </SectionFade>
          ))}
        </div>

        {/* CTA */}
        <SectionFade delay={0.3}>
          <div className="mt-16 md:mt-20 text-center">
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
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-emerald-800)] via-[var(--color-emerald-700)] to-[var(--color-emerald-600)]" />
      <div className="absolute inset-0">
        <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[15%] w-[40vw] h-[40vw] rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 container-width py-20 md:py-28">
        <SectionFade>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-section text-white mb-5">
              Klar for en trygg tannlegeopplevelse?
            </h2>
            <p className="text-lg text-emerald-100/80 font-sans font-300 leading-relaxed mb-10">
              Ta det første steget mot bedre tannhelse. Bestill en time hos oss
              – vi tar godt vare på deg.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kontakt" className="btn-primary bg-white text-[var(--color-emerald-800)] hover:bg-emerald-50 px-8 py-4 text-base">
                <Calendar className="size-5" />
                Bestill time nå
              </Link>
              <a
                href="tel:61280412"
                className="btn-secondary text-base px-8 py-4"
              >
                <Phone className="size-5" />
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
      <SymptomsAndTipsSection />
      <TrustSection />
      <ArticlesSection />
      <CTASection />
    </main>
  );
}

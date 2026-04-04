"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
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
    <section className="relative bg-[var(--color-bg-cream)] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
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

          {/* Right: Single Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/ringebutannMain.jpg"
              alt="Ringebu Tannlegesenter behandlingsrom"
              fill
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
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
                <p className="text-[var(--color-stone-700)] mb-8 leading-relaxed font-sans font-400 text-base">
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
                <p className="text-white/75 text-base leading-relaxed font-sans font-400">
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
                <p className="text-[var(--color-stone-700)] text-base leading-relaxed font-sans font-400">
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
                <p className="text-[var(--color-stone-700)] text-base mb-6 leading-relaxed font-sans font-400">
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

/* ─────────────────────── GUIDE (Symptoms + Tips + Info) ─────────────────────── */

function GuideSection() {
  const tipArticles = [
    { title: "Kaffe, brunost og tennene dine: norsk kosthold og tannhelse", href: "/informasjon" },
    { title: "Munnskyll — når det hjelper og når du kaster bort penger", href: "/informasjon" },
    { title: "Spyttets superkrefter: kroppens egen tannbeskyttelse", href: "/informasjon" },
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-yellow)]">
      <div className="container-width">
        <div className="max-w-5xl mx-auto space-y-5 md:space-y-6">

          {/* ── Top row: Symptomer (left) + Tips & Råd (right) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">

            {/* Symptomer — dark espresso card */}
            <SectionFade className="lg:col-span-2">
              <Link href="/symptomer" className="group block h-full">
                <div className="bg-[var(--color-primary)] rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between min-h-[360px] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(60,36,21,0.15)] hover:-translate-y-1 cursor-pointer">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-heading font-700 text-white mb-6">
                      Symptomer
                    </h2>
                    <p className="text-white/75 text-base leading-relaxed font-sans font-400">
                      Tannpine, blødende tannkjøtt eller ising i tennene? Typen smerte
                      avslører ofte hva som er galt — og hvor raskt du bør handle.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-white font-heading font-600 mt-8 group-hover:text-[var(--color-accent-light)] transition-colors">
                    Finn årsaken her
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[var(--color-accent)]/30 transition-colors">
                      <ChevronRight className="size-5 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </SectionFade>

            {/* Tips & råd — white card with article list */}
            <SectionFade className="lg:col-span-3" delay={0.15}>
              <div className="bg-white rounded-2xl p-8 md:p-10 h-full shadow-sm border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-heading font-700 text-[var(--color-primary)]">
                    Tips & råd
                  </h2>
                  <Link
                    href="/informasjon"
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
                        className="flex items-center justify-between py-6 group cursor-pointer"
                      >
                        <span className="text-lg md:text-xl font-sans font-400 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors pr-4">
                          {tip.title}
                        </span>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-bg-cream)] flex items-center justify-center">
                          <ChevronRight className="size-5 text-[var(--color-accent)]" />
                        </div>
                      </Link>
                    </SectionFade>
                  ))}
                </div>
              </div>
            </SectionFade>
          </div>

          {/* ── Bottom row: Informasjon — full-width featured card ── */}
          <SectionFade delay={0.25}>
            <Link href="/informasjon" className="group block">
              <div className="relative rounded-2xl bg-[var(--color-bg-cream)] border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(60,36,21,0.08)] hover:-translate-y-1 cursor-pointer">
                {/* Decorative warm gradient blobs */}
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[var(--color-accent)]/[0.05] blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[var(--color-accent-light)]/[0.07] blur-2xl" />

                <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                  {/* Left: accent stripe + text */}
                  <div className="flex gap-6 flex-1">
                    <div className="w-1 self-stretch rounded-full bg-[var(--color-accent)] shrink-0 hidden md:block" />
                    <div>
                      <span className="text-[10px] font-700 uppercase tracking-[0.2em] text-[var(--color-accent)] block mb-2">
                        Rettigheter & Økonomi
                      </span>
                      <h2 className="text-2xl md:text-3xl font-heading font-700 text-[var(--color-primary)] mb-3">
                        Informasjon & støtte
                      </h2>
                      <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed font-sans font-400 max-w-2xl">
                        Støtteordninger, rettigheter og alt du lurer på om tannbehandling
                        i Norge. Barn, unge voksne, HELFO, NAV og frikort — samlet på ett sted.
                      </p>
                    </div>
                  </div>

                  {/* Right: CTA arrow */}
                  <div className="flex items-center gap-3 text-[var(--color-accent)] font-heading font-600 shrink-0 group-hover:text-[var(--color-primary)] transition-colors">
                    Les mer
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center group-hover:bg-[var(--color-accent)]/20 transition-colors">
                      <ArrowRight className="size-5 text-[var(--color-accent)]" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
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
    <section id="artikler" className="py-12 md:py-16 bg-[var(--color-bg-blue)]">
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
            <h3 className="font-heading font-600 text-[17px] text-[var(--color-primary)]">
              {item.title}
            </h3>
            <p className="text-[13px] text-[var(--color-text-muted)] font-sans font-400">
              {item.subtitle}
            </p>
          </div>
          <span className="hidden sm:inline-block bg-[var(--color-bg-cream)] text-[var(--color-accent)] text-[11px] font-700 px-3 py-1.5 rounded-lg tracking-wide shrink-0">
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
                      <p className="text-[10px] font-700 uppercase tracking-[0.18em] text-[var(--color-accent)] mb-2">
                        {d.label}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans font-300">
                        {renderBold(d.text)}
                      </p>
                    </div>
                  ))}
                  {item.stat && (
                    <div className="flex items-center gap-3 bg-[var(--color-primary)] text-white rounded-xl px-5 py-3 mt-2">
                      <span className="text-[13px] font-500">{item.stat.label}</span>
                      <span className="font-heading font-700 text-xl text-[var(--color-accent-light)]">
                        {item.stat.value}
                      </span>
                      {item.stat.suffix && (
                        <span className="text-[13px] font-500 text-white/80">
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
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-0.5 rounded-full bg-[var(--color-accent)]" />
              <span className="text-[11px] font-700 uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Økonomi & Rettigheter
              </span>
              <div className="w-10 h-0.5 rounded-full bg-[var(--color-accent)]" />
            </div>
            <h2 className="heading-section text-[var(--color-primary)] mb-4">
              Støtte til tannbehandling
            </h2>
            <p className="text-[17px] text-[var(--color-text-secondary)] font-sans font-300 max-w-xl mx-auto leading-relaxed">
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
            <p className="text-[var(--color-text-secondary)] font-sans font-400 text-[15px] mb-5">
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
      <GuideSection />
      <ArticlesSection />
      <CTASection />
    </main>
  );
}

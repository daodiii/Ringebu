"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  Phone,
  ArrowRight,
} from "lucide-react";

/* ─────────────── Types ─────────────── */

interface PriceItem {
  name: string;
  description: string;
}

interface Treatment {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  category: string;
  prices: PriceItem[];
  /* Visual config for bento grid */
  variant: "dark" | "cream" | "accent" | "image";
  span: "wide" | "tall" | "standard";
  image?: string;
  gradient?: string;
}

/* ─────────────── Data ─────────────── */

const treatments: Treatment[] = [
  {
    title: "Forebyggende Behandling",
    subtitle: "Grunnlaget for god tannhelse",
    description:
      "Regelmessig forebygging holder tennene friske hele livet. Vi undersøker grundig, renser tennene og viser deg hvordan du best tar vare på dem hjemme.",
    features: [
      "Grundig tannundersøkelse med digitalt røntgen",
      "Profesjonell tannrens og polering",
      "Fluorbehandling for sterkere emalje",
      "Individuelle råd for munnhygiene hjemme",
    ],
    category: "Forebyggende",
    prices: [
      { name: "Undersøkelse med 2 røntgenbilder, rens og kostnadsoverslag", description: "Fullstendig tannhelsesjekk" },
      { name: "Studentrabatt på undersøkelse", description: "Gyldig med studentbevis" },
      { name: "Enkel etterkontroll", description: "Etter kirurgiske inngrep" },
      { name: "Omfattende etterkontroll", description: "Etter oralmedisinske undersøkelser" },
    ],
    variant: "image",
    span: "wide",
    image: "/images/ringebutannMain.jpg",
    gradient: "linear-gradient(135deg, rgba(139,115,85,0.22) 0%, rgba(212,184,150,0.30) 100%)",
  },
  {
    title: "Bleking",
    subtitle: "Et lysere, hvitere smil",
    description:
      "Få hvitere tenner med profesjonell bleking. Det er trygt, gjør ikke vondt, og resultatet holder lenge.",
    features: [
      "Klinikkbleking med raskt resultat",
      "Hjemmebleking med tilpassede skinner",
      "Skånsom behandling for emaljen",
      "Langvarig og naturlig resultat",
    ],
    category: "Kosmetisk",
    prices: [],
    variant: "dark",
    span: "tall",
    gradient: "linear-gradient(135deg, rgba(198,123,92,0.22) 0%, rgba(220,170,140,0.28) 100%)",
  },
  {
    title: "Fyllingsterapi",
    subtitle: "Moderne, usynlige fyllinger",
    description:
      "Fyllinger i tannfargen som fyller hull og gjør tenner hele igjen — du ser ikke forskjellen.",
    features: [
      "Tannfargede komposittfyllinger",
      "Utskifting av gamle amalgamfyllinger",
      "Smertefri behandling med lokalbedøvelse",
      "Holdbare materialer med naturlig utseende",
    ],
    category: "Restaurering",
    prices: [
      { name: "Fylling — liten", description: "Én flate" },
      { name: "Fylling — mellomstor", description: "To flater" },
      { name: "Fylling — stor", description: "Tre eller flere flater" },
    ],
    variant: "cream",
    span: "standard",
    gradient: "linear-gradient(135deg, rgba(180,160,120,0.20) 0%, rgba(235,225,200,0.30) 100%)",
  },
  {
    title: "Kron og Bro",
    subtitle: "Holdbare restaureringer",
    description:
      "Kroner og broer erstatter eller reparerer tenner som er skadet eller borte — og ser helt naturlige ut.",
    features: [
      "Helkeramiske kroner for naturlig utseende",
      "Broer som erstatter manglende tenner",
      "Lang holdbarhet med riktig vedlikehold",
      "Skreddersydd tilpasning til ditt bitt",
    ],
    category: "Restaurering",
    prices: [
      { name: "Fullkrone", description: "Hel krone over tann" },
    ],
    variant: "accent",
    span: "standard",
    gradient: "linear-gradient(135deg, rgba(195,150,110,0.25) 0%, rgba(240,220,200,0.30) 100%)",
  },
  {
    title: "Rotfylling",
    subtitle: "Redd tannen din",
    description:
      "Rotfylling redder tenner som er skadet eller infisert. Det er ikke vondt, og du får beholde tannen.",
    features: [
      "Moderne endodontisk behandling",
      "Smertefri med god bedøvelse",
      "Avansert utstyr for presis behandling",
      "Bevarer din naturlige tann",
    ],
    category: "Restaurering",
    prices: [
      { name: "Rotfylling — 1 rotkanal", description: "Tann med én rotkanal" },
      { name: "Rotfylling — 2 rotkanaler", description: "Tann med to rotkanaler" },
      { name: "Rotfylling — 3–4 rotkanaler", description: "Tann med tre til fire rotkanaler" },
    ],
    variant: "cream",
    span: "wide",
    gradient: "linear-gradient(135deg, rgba(160,140,130,0.20) 0%, rgba(210,200,190,0.28) 100%)",
  },
  {
    title: "Visdomstennene",
    subtitle: "Vurdering og fjerning",
    description:
      "Vi sjekker om visdomstennene dine trenger å fjernes, og hvis ja — gjør vi det skånsomt.",
    features: [
      "Grundig vurdering med røntgen",
      "Skånsom kirurgisk fjerning",
      "God smertelindring under og etter",
      "Tett oppfølging i etterkant",
    ],
    category: "Kirurgi",
    prices: [
      { name: "Ukomplisert ekstraksjon", description: "Enkel fjerning av tann eller rot" },
      { name: "Kirurgisk fjerning", description: "Fjerning av retinert tann" },
    ],
    variant: "dark",
    span: "standard",
    gradient: "linear-gradient(135deg, rgba(100,135,110,0.18) 0%, rgba(180,210,185,0.25) 100%)",
  },
  {
    title: "Tannkjøtt & Tannstein",
    subtitle: "Friskt tannkjøtt, sterke tenner",
    description:
      "Sunt tannkjøtt er det viktigste for at tennene skal holde lenge. Vi fjerner tannstein og behandler tannkjøttsykdom.",
    features: [
      "Grundig fjerning av tannstein over og under tannkjøttet",
      "Behandling av gingivitt og periodontitt",
      "Veiledning i effektiv munnhygiene",
      "Regelmessig oppfølging og vedlikehold",
    ],
    category: "Forebyggende",
    prices: [
      { name: "Periodontal behandling og rehabilitering", description: "Behandling av tannkjøttsykdom" },
      { name: "Behandling av marginal periodontitt", description: "Tannkjøttbetennelse" },
      { name: "Fiksering av tenner", description: "Stabilisering av løse tenner" },
    ],
    variant: "accent",
    span: "standard",
    gradient: "linear-gradient(135deg, rgba(175,155,130,0.20) 0%, rgba(230,215,195,0.28) 100%)",
  },
  {
    title: "Bittskinner",
    subtitle: "Beskyttelse mot tanngnissing",
    description:
      "Gnisser du tenner om natten? Det sliter dem ned og gir smerter. En bittskinne tilpasset deg beskytter og lindrer.",
    features: [
      "Individuelt tilpassede bittskinner",
      "Beskyttelse mot slitasje",
      "Lindring av kjevesmerter og hodepine",
      "Veiledning om årsaker og forebygging",
    ],
    category: "Spesialbehandling",
    prices: [],
    variant: "cream",
    span: "standard",
    gradient: "linear-gradient(135deg, rgba(145,130,155,0.18) 0%, rgba(210,200,220,0.25) 100%)",
  },
  {
    title: "Tannlegeskrekk",
    subtitle: "Vi forstår deg",
    description:
      "Hos oss møter du et trygt, rolig miljø med ekstra tid og omsorg. Vi tar tannlegeskrekk på alvor.",
    features: [
      "Rolig og trygt behandlingsmiljø",
      "Ekstra tid til å bli kjent og trygg",
      "Skånsomme behandlingsteknikker",
      "Mulighet for pauser underveis",
    ],
    category: "Spesialbehandling",
    prices: [],
    variant: "image",
    span: "wide",
    image: "/images/about-clinic.jpg",
    gradient: "linear-gradient(135deg, rgba(190,165,140,0.22) 0%, rgba(240,225,210,0.30) 100%)",
  },
];

/* ─────────────── Treatment Card ─────────────── */

function TreatmentCard({ treatment, index }: { treatment: Treatment; index: number }) {
  const [open, setOpen] = useState(false);
  const hasPrices = treatment.prices.length > 0;

  /* Grid span classes */
  const spanClass =
    treatment.span === "wide"
      ? "md:col-span-8"
      : treatment.span === "tall"
      ? "md:col-span-4 md:row-span-2"
      : "md:col-span-4";

  /* Variant styles */
  const variants = {
    dark: {
      bg: "bg-[var(--color-primary)]",
      text: "text-white",
      textMuted: "text-white/70",
      accent: "text-[var(--color-accent-light)]",
      border: "",
      detailBg: "bg-white/10",
      detailLabel: "text-[var(--color-accent-light)]",
      detailText: "text-white/80",
      priceBg: "bg-white/5 border-white/10",
      chevron: "text-white/50",
      hoverShadow: "hover:shadow-[0_20px_60px_rgba(60,36,21,0.2)]",
    },
    cream: {
      bg: "bg-[var(--color-bg-cream)]",
      text: "text-[var(--color-primary)]",
      textMuted: "text-[var(--color-text-secondary)]",
      accent: "text-[var(--color-accent)]",
      border: "border border-[var(--color-border)]",
      detailBg: "bg-white",
      detailLabel: "text-[var(--color-accent)]",
      detailText: "text-[var(--color-text-secondary)]",
      priceBg: "bg-white border-[var(--color-border)]",
      chevron: "text-[var(--color-text-muted)]",
      hoverShadow: "hover:shadow-[0_20px_60px_rgba(60,36,21,0.08)]",
    },
    accent: {
      bg: "bg-gradient-to-br from-[var(--color-accent)]/[0.08] to-[var(--color-bg-cream)]",
      text: "text-[var(--color-primary)]",
      textMuted: "text-[var(--color-text-secondary)]",
      accent: "text-[var(--color-accent)]",
      border: "border-2 border-[var(--color-accent)]/20",
      detailBg: "bg-white",
      detailLabel: "text-[var(--color-accent)]",
      detailText: "text-[var(--color-text-secondary)]",
      priceBg: "bg-white border-[var(--color-accent)]/15",
      chevron: "text-[var(--color-accent)]",
      hoverShadow: "hover:shadow-[0_20px_60px_rgba(198,123,92,0.12)]",
    },
    image: {
      bg: "bg-[var(--color-bg-cream)]",
      text: "text-[var(--color-primary)]",
      textMuted: "text-[var(--color-text-secondary)]",
      accent: "text-[var(--color-accent)]",
      border: "border border-[var(--color-border)]",
      detailBg: "bg-white",
      detailLabel: "text-[var(--color-accent)]",
      detailText: "text-[var(--color-text-secondary)]",
      priceBg: "bg-white border-[var(--color-border)]",
      chevron: "text-[var(--color-text-muted)]",
      hoverShadow: "hover:shadow-[0_20px_60px_rgba(60,36,21,0.1)]",
    },
  };

  const v = variants[treatment.variant];

  return (
    <motion.div
      className={spanClass}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        onClick={() => setOpen(!open)}
        className={`
          ${v.bg} ${v.border} rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 hover:-translate-y-1 ${v.hoverShadow}
          h-full flex flex-col relative
        `}
        style={
          treatment.gradient && (treatment.variant === "cream" || treatment.variant === "accent")
            ? { background: treatment.gradient }
            : undefined
        }
      >
        {/* Gradient overlay for dark variant cards */}
        {treatment.gradient && treatment.variant === "dark" && (
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: treatment.gradient }}
          />
        )}

        {/* Image header for image variants */}
        {treatment.variant === "image" && treatment.image && (
          <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
            <Image
              src={treatment.image}
              alt={treatment.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              style={{ objectPosition: "center 60%" }}
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 to-transparent" />
          </div>
        )}

        {/* Card body */}
        <div
          className="p-7 md:p-9 flex-1 flex flex-col"
          style={
            treatment.gradient && treatment.variant === "image"
              ? { background: treatment.gradient }
              : undefined
          }
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <span className={`text-[0.6875rem] font-700 uppercase tracking-[0.2em] ${v.accent} block mb-2`}>
                {treatment.category}
              </span>
              <h3 className={`text-xl md:text-2xl lg:text-3xl font-heading font-700 ${v.text} leading-tight`}>
                {treatment.title}
              </h3>
              <p className={`text-sm ${v.textMuted} font-sans font-400 mt-1`}>
                {treatment.subtitle}
              </p>
            </div>
            <ChevronDown
              className={`size-5 ${v.chevron} transition-all duration-300 shrink-0 mt-2 ${
                open ? "rotate-180" : ""
              }`}
              strokeWidth={2}
            />
          </div>

          {/* Description */}
          <p className={`${v.textMuted} text-base leading-relaxed font-sans font-400 mb-4 flex-1`}>
            {treatment.description}
          </p>

          {/* Expandable details */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className={`border-t ${treatment.variant === "dark" ? "border-white/15" : "border-[var(--color-border)]"} pt-6 mt-2`}>
                  <div className={`grid ${hasPrices ? "md:grid-cols-2" : "grid-cols-1"} gap-5`}>
                    {/* Features */}
                    <div>
                      <p className={`text-[0.6875rem] font-700 uppercase tracking-[0.18em] ${v.detailLabel} mb-4`}>
                        Hva inngår
                      </p>
                      <ul className="space-y-3">
                        {treatment.features.map((f) => (
                          <li key={f} className={`flex items-start gap-2.5 ${v.detailText} text-sm leading-relaxed font-sans font-400`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prices */}
                    {hasPrices && (
                      <div className={`${v.priceBg} rounded-xl p-5 border`}>
                        <p className={`text-[0.6875rem] font-700 uppercase tracking-[0.18em] ${v.detailLabel} mb-4`}>
                          Behandlinger
                        </p>
                        <div className="space-y-0">
                          {treatment.prices.map((item, idx) => (
                            <div
                              key={item.name}
                              className={`py-3 ${
                                idx < treatment.prices.length - 1
                                  ? treatment.variant === "dark"
                                    ? "border-b border-white/10"
                                    : "border-b border-[var(--color-border)]"
                                  : ""
                              }`}
                            >
                              <div className={`font-sans font-500 text-sm ${v.text}`}>
                                {item.name}
                              </div>
                              <div className={`text-xs ${v.textMuted} font-sans font-400 mt-0.5`}>
                                {item.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── Page ─────────────── */

export default function Behandlinger() {
  return (
    <main className="pt-20">
      {/* ── Header ── */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-accent-light)]/5 blur-3xl" />
        </div>
        <div className="container-width text-center relative z-10">
          <span className="text-[var(--color-accent-light)] text-sm font-sans font-600 uppercase tracking-[0.15em] mb-4 block">
            Våre tjenester
          </span>
          <h1 className="heading-display text-white mb-5">
            Behandlinger
          </h1>
          <p className="text-lg text-white/80 font-sans font-400 max-w-xl mx-auto leading-relaxed">
            Fra forebyggende pleie til avansert kosmetisk behandling.
            Klikk på en behandling for å se detaljer og priser.
          </p>
        </div>
      </section>

      {/* ── Bento Grid ── */}
      <section className="py-16 md:py-24 bg-[var(--color-bg)]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 max-w-6xl mx-auto">
            {treatments.map((t, i) => (
              <TreatmentCard key={t.title} treatment={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Payment Info ── */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-blue)]">
        <div className="container-width max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-8"
            >
              <h3 className="font-heading font-600 text-xl text-[var(--color-primary)] mb-5">
                Betalingsinformasjon
              </h3>
              <ul className="space-y-3">
                {[
                  "Betaling skjer ved endt behandling",
                  "Vi aksepterer kort, Vipps og kontant",
                  "Avbetalingsordninger kan avtales",
                  "Trygderefusjon for stønadberettigede behandlinger",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[var(--color-text-secondary)] font-sans font-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-8"
            >
              <h3 className="font-heading font-600 text-xl text-[var(--color-primary)] mb-5">
                Trygderefusjon
              </h3>
              <p className="text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed mb-4">
                Enkelte tannbehandlinger gir rett til refusjon fra HELFO. Vi
                hjelper deg med å sende refusjonskrav, slik at du får tilbake
                det du har krav på.
              </p>
              <p className="text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed">
                Spør oss gjerne om dette ved bestilling av time, så informerer
                vi deg om dine rettigheter.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>
        <div className="relative z-10 container-width py-16 md:py-20 text-center">
          <h2 className="heading-section text-white mb-4">
            Usikker på hvilken behandling du trenger?
          </h2>
          <p className="text-lg text-white/80 font-sans font-400 max-w-lg mx-auto mb-8">
            Ta kontakt med oss for en uforpliktende konsultasjon. Vi hjelper deg
            med å finne den beste løsningen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="btn-primary bg-white text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)] px-8 py-4 cursor-pointer">
              <Calendar className="size-5" />
              Kontakt oss
            </Link>
            <a href="tel:61280412" className="btn-secondary px-8 py-4 cursor-pointer">
              <Phone className="size-5" />
              Ring 61 28 04 12
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

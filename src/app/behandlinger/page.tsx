"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  Phone,
} from "lucide-react";

interface PriceItem {
  name: string;
  description: string;
}

const treatments = [
  {
    iconName: "Crown",
    title: "Kron og Bro",
    description:
      "Kroner og broer gjenoppretter skadede eller manglende tenner med holdbare, naturlig utseende restaureringer.",
    features: [
      "Helkeramiske kroner for naturlig utseende",
      "Broer som erstatter manglende tenner",
      "Lang holdbarhet med riktig vedlikehold",
      "Skreddersydd tilpasning til ditt bitt",
    ],
    category: "Restaurering",
    prices: [
      { name: "Fullkrone", description: "Hel krone over tann" },
    ] as PriceItem[],
  },
  {
    iconName: "ShieldCheck",
    title: "Forebyggende Behandling",
    description:
      "Regelmessig forebyggende behandling er nøkkelen til god tannhelse.",
    features: [
      "Grundig tannundersøkelse med digitalt røntgen",
      "Profesjonell tannrens og polering",
      "Fluorbehandling for sterkere emalje",
      "Individuelle råd for munnhygiene hjemme",
    ],
    category: "Forebyggende",
    prices: [
      { name: "Undersøkelse med 2 røntgenbilder, enkel rens og skriftlig kostnadsoverslag", description: "Fullstendig tannhelsesjekk" },
      { name: "Studentrabatt / studentpris på undersøkelse", description: "Gyldig med studentbevis" },
      { name: "Enkel etterkontroll", description: "Etter kirurgiske inngrep og periodontal behandling" },
      { name: "Omfattende etterkontroll", description: "Etter kirurgiske inngrep og oralmedisinske undersøkelser" },
    ] as PriceItem[],
  },
  {
    iconName: "Paintbrush",
    title: "Fyllingsterapi",
    description:
      "Moderne, tannfargede fyllinger som reparerer hull og gjenoppretter tennenes naturlige form og funksjon.",
    features: [
      "Tannfargede komposittfyllinger",
      "Utskifting av gamle amalgamfyllinger",
      "Smertefri behandling med lokalbedøvelse",
      "Holdbare materialer med naturlig utseende",
    ],
    category: "Restaurering",
    prices: [
      { name: "Fylling – liten", description: "Én flate" },
      { name: "Fylling – mellomstor", description: "To flater" },
      { name: "Fylling – stor", description: "Tre eller flere flater" },
    ] as PriceItem[],
  },
  {
    iconName: "Heart",
    title: "Rotfylling",
    description:
      "Rotfylling redder tenner som er skadet eller infisert i nerven. Skånsomt og effektivt.",
    features: [
      "Moderne endodontisk behandling",
      "Smertefri med god bedøvelse",
      "Avansert utstyr for presis behandling",
      "Bevarer din naturlige tann",
    ],
    category: "Restaurering",
    prices: [
      { name: "Rotfylling – 1 rotkanal", description: "Tann med én rotkanal" },
      { name: "Rotfylling – 2 rotkanaler", description: "Tann med to rotkanaler" },
      { name: "Rotfylling – 3 til 4 rotkanaler", description: "Tann med tre til fire rotkanaler" },
    ] as PriceItem[],
  },
  {
    iconName: "Sparkles",
    title: "Bleking",
    description:
      "Profesjonell tannbleking som gir deg et lysere og hvitere smil.",
    features: [
      "Klinikkbleking med raskt resultat",
      "Hjemmebleking med tilpassede skinner",
      "Skånsom behandling for emaljen",
      "Langvarig og naturlig resultat",
    ],
    category: "Kosmetisk",
    prices: [] as PriceItem[],
  },
  {
    iconName: "CircleDot",
    title: "Visdomstennene",
    description:
      "Vi vurderer om fjerning er nødvendig og utfører inngrepet trygt og skånsomt.",
    features: [
      "Grundig vurdering med røntgen",
      "Skånsom kirurgisk fjerning",
      "God smertelindring under og etter",
      "Tett oppfølging i etterkant",
    ],
    category: "Kirurgi",
    prices: [
      { name: "Ukomplisert ekstraksjon", description: "Enkel fjerning av tann eller rot" },
      { name: "Kirurgisk fjerning", description: "Fjerning av retinert tann eller dyptliggende rot" },
    ] as PriceItem[],
  },
  {
    iconName: "Droplets",
    title: "Tannkjøtt & Tannsteinsbehandling",
    description:
      "Friskt tannkjøtt er grunnlaget for god tannhelse. Vi behandler tannkjøttsykdom og fjerner tannstein.",
    features: [
      "Grundig fjerning av tannstein over og under tannkjøttet",
      "Behandling av gingivitt og periodontitt",
      "Veiledning i effektiv munnhygiene",
      "Regelmessig oppfølging og vedlikehold",
    ],
    category: "Forebyggende",
    prices: [
      { name: "Periodontal behandling og rehabilitering", description: "Behandling og oppfølging av tannkjøttsykdom" },
      { name: "Behandling av marginal periodontitt", description: "Behandling av tannkjøttbetennelse" },
      { name: "Fiksering av tenner", description: "Stabilisering av løse tenner" },
      { name: "Kirurgisk tilleggsbehandling", description: "Ved behandling av marginal periodontitt" },
    ] as PriceItem[],
  },
  {
    iconName: "AlarmClock",
    title: "Bittskinner / Tanngnising",
    description:
      "Tanngnising kan slite ned tennene og forårsake smerter. En tilpasset bittskinne beskytter og lindrer.",
    features: [
      "Individuelt tilpassede bittskinner",
      "Beskyttelse mot slitasje på tennene",
      "Lindring av kjevesmerter og hodepine",
      "Veiledning om årsaker og forebygging",
    ],
    category: "Spesialbehandling",
    prices: [] as PriceItem[],
  },
  {
    iconName: "HandHeart",
    title: "Tannlegeskrekk",
    description:
      "Hos oss møter du et trygt, rolig miljø med ekstra tid og omsorg.",
    features: [
      "Rolig og trygt behandlingsmiljø",
      "Ekstra tid til å bli kjent og trygg",
      "Skånsomme behandlingsteknikker",
      "Mulighet for pauser underveis",
    ],
    category: "Spesialbehandling",
    prices: [] as PriceItem[],
  },
];

const cardColors = { bg: "#FDFBF7", border: "#E8DFCF", dot: "#B8976A" };

export default function Behandlinger() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="bg-[var(--color-emerald-950)] py-20 md:py-28">
        <div className="container-width text-center">
          <h1 className="heading-display text-white mb-5">
            Behandlinger vi tilbyr
          </h1>
          <p className="text-lg text-white/80 font-sans font-400 max-w-xl mx-auto">
            Vi tilbyr et bredt spekter av tannbehandlinger – fra forebyggende
            pleie til avansert kosmetisk og kirurgisk behandling. Se priser
            direkte ved hver behandling.
          </p>
        </div>
      </section>

      {/* Treatments with Integrated Prices */}
      <section className="section-padding bg-white">
        <div className="container-width max-w-5xl">
          <div className="space-y-4">
            {treatments.map((treatment) => {
              const isOpen = expanded === treatment.title;
              const hasPrices = treatment.prices.length > 0;
              const colors = cardColors;

              return (
                <motion.div
                  key={treatment.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                    onClick={() => setExpanded(isOpen ? null : treatment.title)}
                  >
                    {/* Collapsed header — always visible */}
                    <div className="flex items-start gap-5 p-6 md:p-8">
                      {/* Left accent bar */}
                      <div
                        className="w-1.5 self-stretch rounded-full shrink-0 hidden md:block"
                        style={{ backgroundColor: colors.dot }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-heading font-700 text-2xl md:text-3xl text-[var(--color-emerald-900)] mb-3">
                              {treatment.title}
                            </h3>
                            <p className="text-[var(--color-stone-700)] text-lg md:text-xl font-sans font-400 leading-relaxed max-w-2xl">
                              {treatment.description}
                            </p>
                          </div>
                          <ChevronDown
                            className={`size-7 mt-2 transition-transform duration-300 shrink-0`}
                            style={{ color: colors.dot }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-6 md:px-8 pb-6 md:pb-8"
                      >
                        <div
                          className="pt-6 md:ml-6"
                          style={{ borderTop: `1px solid ${colors.border}` }}
                        >
                          <div className={`grid ${hasPrices ? "md:grid-cols-2" : "grid-cols-1"} gap-6 md:gap-8`}>
                            {/* Features */}
                            <div>
                              <h4 className="font-sans font-700 text-sm uppercase tracking-[0.15em] mb-5" style={{ color: colors.dot }}>
                                Hva inngår
                              </h4>
                              <ul className="space-y-4">
                                {treatment.features.map((feature) => (
                                  <li
                                    key={feature}
                                    className="flex items-start gap-3 text-[var(--color-stone-700)] font-sans font-400 text-base md:text-lg leading-relaxed"
                                  >
                                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: colors.dot }} />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Prices */}
                            {hasPrices && (
                              <div className="bg-white rounded-xl p-5 border" style={{ borderColor: colors.border }}>
                                <h4 className="font-sans font-700 text-sm uppercase tracking-[0.15em] mb-5" style={{ color: colors.dot }}>
                                  Behandlinger
                                </h4>
                                <div className="space-y-0">
                                  {treatment.prices.map((item, idx) => (
                                    <div
                                      key={item.name}
                                      className="py-4"
                                      style={
                                        idx < treatment.prices.length - 1
                                          ? { borderBottom: `1px solid ${colors.border}` }
                                          : undefined
                                      }
                                    >
                                      <div className="font-sans font-500 text-base text-[var(--color-text-primary)]">
                                        {item.name}
                                      </div>
                                      <div className="text-sm text-[var(--color-text-muted)] font-sans font-400 mt-1">
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
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Info */}
      <section className="section-padding bg-[var(--color-stone-50)]">
        <div className="container-width max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8">
              <h3 className="font-heading font-600 text-xl text-[var(--color-emerald-900)] mb-5">
                Betalingsinformasjon
              </h3>
              <ul className="space-y-3">
                {[
                  "Betaling skjer ved endt behandling",
                  "Vi aksepterer kort, Vipps og kontant",
                  "Avbetalingsordninger kan avtales",
                  "Trygderefusjon for stønadberettigede behandlinger",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[var(--color-text-secondary)] font-sans font-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald-500)] mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-8">
              <h3 className="font-heading font-600 text-xl text-[var(--color-emerald-900)] mb-5">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-emerald-950)]" />
        <div className="relative z-10 container-width py-16 text-center">
          <h2 className="heading-section text-white mb-4">
            Usikker på hvilken behandling du trenger?
          </h2>
          <p className="text-lg text-[#F0E6D6]/80 font-sans font-400 max-w-lg mx-auto mb-8">
            Ta kontakt med oss for en uforpliktende konsultasjon. Vi hjelper deg
            med å finne den beste løsningen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="btn-primary bg-white text-[var(--color-emerald-800)] hover:bg-[#F0E6D6] px-8 py-4">
              <Calendar className="size-5" />
              Kontakt oss
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

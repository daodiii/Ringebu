"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  ShieldCheck,
  Paintbrush,
  Heart,
  Sparkles,
  CircleDot,
  Droplets,
  AlarmClock,
  HandHeart,
  ChevronDown,
  Calendar,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Crown,
  ShieldCheck,
  Paintbrush,
  Heart,
  Sparkles,
  CircleDot,
  Droplets,
  AlarmClock,
  HandHeart,
};

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
  },
];

const categories = [...new Set(treatments.map((t) => t.category))];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Restaurering: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Forebyggende: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  Kosmetisk: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  Kirurgi: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  Spesialbehandling: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
};

export default function Behandlinger() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="bg-[var(--color-emerald-950)] py-20 md:py-28">
        <div className="container-width text-center">
          <span className="text-emerald-300 text-sm font-sans font-600 uppercase tracking-[0.15em] mb-4 block">
            Våre behandlinger
          </span>
          <h1 className="heading-display text-white mb-5">
            Behandlinger vi tilbyr
          </h1>
          <p className="text-lg text-emerald-100/70 font-sans font-300 max-w-xl mx-auto">
            Vi tilbyr et bredt spekter av tannbehandlinger – fra forebyggende
            pleie til avansert kosmetisk og kirurgisk behandling.
          </p>
        </div>
      </section>

      {/* Treatments by Category */}
      <section className="section-padding bg-white">
        <div className="container-width max-w-5xl">
          {categories.map((category) => {
            const colors = categoryColors[category];
            const catTreatments = treatments.filter((t) => t.category === category);

            return (
              <div key={category} className="mb-12 last:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-500 font-sans ${colors.bg} ${colors.text}`}>
                    {category}
                  </span>
                </motion.div>

                <div className="space-y-3">
                  {catTreatments.map((treatment) => {
                    const Icon = iconMap[treatment.iconName];
                    const isOpen = expanded === treatment.title;

                    return (
                      <motion.div
                        key={treatment.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <button
                          onClick={() => setExpanded(isOpen ? null : treatment.title)}
                          className={`w-full text-left rounded-2xl border transition-all duration-300 ${
                            isOpen
                              ? `${colors.border} ${colors.bg}`
                              : "border-[var(--color-border)] bg-white hover:border-[var(--color-emerald-200)]"
                          }`}
                        >
                          <div className="p-6 flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                              {Icon && <Icon className={`size-6 ${colors.text}`} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-heading font-600 text-lg text-[var(--color-emerald-900)]">
                                  {treatment.title}
                                </h3>
                                <ChevronDown
                                  className={`size-5 text-[var(--color-text-muted)] transition-transform duration-300 shrink-0 ml-4 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                              <p className="text-[var(--color-text-secondary)] text-sm font-sans font-300 mt-1">
                                {treatment.description}
                              </p>
                            </div>
                          </div>

                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="px-6 pb-6"
                            >
                              <div className="ml-16 pt-4 border-t border-[var(--color-border)]">
                                <ul className="space-y-2">
                                  {treatment.features.map((feature) => (
                                    <li
                                      key={feature}
                                      className="flex items-start gap-2 text-[var(--color-text-secondary)] font-sans font-300 text-sm"
                                    >
                                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${colors.text.replace("text-", "bg-")}`} />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-emerald-50)] py-16">
        <div className="container-width text-center max-w-2xl mx-auto">
          <h2 className="heading-section mb-4">
            Usikker på hvilken behandling du trenger?
          </h2>
          <p className="body-large mb-8">
            Ta kontakt med oss for en uforpliktende konsultasjon. Vi hjelper deg
            med å finne den beste løsningen.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary px-8 py-4">
              <Calendar className="size-5" />
              Kontakt oss
            </Link>
            <Link href="/priser" className="btn-outline px-8 py-4">
              Se priser
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

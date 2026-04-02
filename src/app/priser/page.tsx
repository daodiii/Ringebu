"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Calendar, Phone, Info } from "lucide-react";

const priceCategories = [
  {
    title: "Undersøkelse & Kontroll",
    items: [
      { name: "Undersøkelse med 2 røntgenbilder, enkel rens og skriftlig kostnadsoverslag", description: "Fullstendig tannhelsesjekk" },
      { name: "Studentrabatt / studentpris på undersøkelse", description: "Gyldig med studentbevis" },
      { name: "Enkel etterkontroll", description: "Etter kirurgiske inngrep og periodontal behandling" },
      { name: "Omfattende etterkontroll", description: "Etter kirurgiske inngrep og oralmedisinske undersøkelser" },
    ],
  },
  {
    title: "Fyllinger",
    items: [
      { name: "Fylling – liten", description: "Én flate" },
      { name: "Fylling – mellomstor", description: "To flater" },
      { name: "Fylling – stor", description: "Tre eller flere flater" },
    ],
  },
  {
    title: "Rotbehandling",
    items: [
      { name: "Rotfylling – 1 rotkanal", description: "Tann med én rotkanal" },
      { name: "Rotfylling – 2 rotkanaler", description: "Tann med to rotkanaler" },
      { name: "Rotfylling – 3 til 4 rotkanaler", description: "Tann med tre til fire rotkanaler" },
    ],
  },
  {
    title: "Tannkjøttbehandling (Periodonti)",
    items: [
      { name: "Periodontal behandling og rehabilitering", description: "Behandling og oppfølging av tannkjøttsykdom" },
      { name: "Behandling av marginal periodontitt", description: "Behandling av tannkjøttbetennelse" },
      { name: "Fiksering av tenner", description: "Stabilisering av løse tenner" },
      { name: "Kirurgisk tilleggsbehandling", description: "Ved behandling av marginal periodontitt" },
    ],
  },
  {
    title: "Krone & Protetikk",
    items: [
      { name: "Fullkrone", description: "Hel krone over tann" },
    ],
  },
  {
    title: "Kirurgi & Tannfjerning",
    items: [
      { name: "Ukomplisert ekstraksjon", description: "Enkel fjerning av tann eller rot" },
      { name: "Kirurgisk fjerning", description: "Fjerning av retinert tann eller dyptliggende rot" },
    ],
  },
];

export default function Priser() {
  const [openCategory, setOpenCategory] = useState<string | null>(priceCategories[0].title);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="bg-[var(--color-emerald-950)] py-20 md:py-28">
        <div className="container-width text-center">
          <span className="text-emerald-300 text-sm font-sans font-600 uppercase tracking-[0.15em] mb-4 block">
            Priser
          </span>
          <h1 className="heading-display text-white mb-5">
            Våre behandlingspriser
          </h1>
          <p className="text-lg text-emerald-100/70 font-sans font-300 max-w-xl mx-auto">
            Vi tror på åpen og ærlig prising. Her finner du en oversikt over
            våre behandlingspriser.
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-[var(--color-emerald-50)] py-5">
        <div className="container-width max-w-5xl">
          <div className="flex items-start gap-3">
            <Info className="size-5 text-[var(--color-emerald-600)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--color-emerald-800)] font-sans font-300">
              <strong className="font-600">Merk:</strong> Prisene er veiledende og kan variere
              avhengig av behandlingens omfang. Barn og ungdom under 18 år har
              rett på gratis tannbehandling gjennom den offentlige tannhelsetjenesten.
              Vi gir alltid et prisoverslag før behandling starter.
            </p>
          </div>
        </div>
      </section>

      {/* Price Tables */}
      <section className="section-padding bg-white">
        <div className="container-width max-w-5xl">
          <div className="space-y-3">
            {priceCategories.map((category) => {
              const isOpen = openCategory === category.title;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className={`rounded-2xl border transition-all duration-300 ${
                    isOpen ? "border-[var(--color-emerald-200)] bg-white shadow-sm" : "border-[var(--color-border)]"
                  }`}>
                    <button
                      onClick={() => setOpenCategory(isOpen ? null : category.title)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between"
                    >
                      <h3 className="font-heading font-600 text-lg text-[var(--color-emerald-900)]">
                        {category.title}
                      </h3>
                      <ChevronDown
                        className={`size-5 text-[var(--color-text-muted)] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-6 pb-5"
                      >
                        <div className="border-t border-[var(--color-border)] pt-4 space-y-0">
                          {category.items.map((item, idx) => (
                            <div
                              key={item.name}
                              className={`py-4 ${
                                idx < category.items.length - 1
                                  ? "border-b border-[var(--color-border)]/50"
                                  : ""
                              }`}
                            >
                              <div className="font-sans font-500 text-[var(--color-text-primary)]">
                                {item.name}
                              </div>
                              <div className="text-sm text-[var(--color-text-muted)] font-sans font-300 mt-0.5">
                                {item.description}
                              </div>
                            </div>
                          ))}
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
                  <li key={item} className="flex items-start gap-2 text-[var(--color-text-secondary)] font-sans font-300">
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
              <p className="text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed mb-4">
                Enkelte tannbehandlinger gir rett til refusjon fra HELFO. Vi
                hjelper deg med å sende refusjonskrav, slik at du får tilbake
                det du har krav på.
              </p>
              <p className="text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed">
                Spør oss gjerne om dette ved bestilling av time, så informerer
                vi deg om dine rettigheter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-emerald-800)] via-[var(--color-emerald-700)] to-[var(--color-emerald-600)]" />
        <div className="relative z-10 container-width py-16 text-center">
          <h2 className="heading-section text-white mb-4">
            Har du spørsmål om priser?
          </h2>
          <p className="text-lg text-emerald-100/80 font-sans font-300 max-w-lg mx-auto mb-8">
            Ring oss for et uforpliktende prisoverslag eller bestill en konsultasjon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="btn-primary bg-white text-[var(--color-emerald-800)] hover:bg-emerald-50 px-8 py-4">
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

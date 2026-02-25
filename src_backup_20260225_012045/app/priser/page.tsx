import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import GlassCard from "@/components/GlassCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Priser",
  description:
    "Se prislisten for tannbehandlinger hos Ringebu Tannlegesenter. Transparente priser og trygderefusjon.",
};

const priceCategories = [
  {
    title: "Undersøkelse & Kontroll",
    items: [
      {
        name: "Undersøkelse med 2 røntgenbilder, enkel rens og skriftlig kostnadsoverslag",
        description: "Fullstendig tannhelsesjekk",
        price: "",
      },
      {
        name: "Studentrabatt / studentpris på undersøkelse",
        description: "Gyldig med studentbevis",
        price: "",
      },
      {
        name: "Enkel etterkontroll",
        description: "Etter kirurgiske inngrep, periodontal behandling og oralmedisinske undersøkelser",
        price: "",
      },
      {
        name: "Omfattende etterkontroll",
        description: "Etter kirurgiske inngrep og oralmedisinske undersøkelser",
        price: "",
      },
    ],
  },
  {
    title: "Fyllinger",
    items: [
      {
        name: "Fylling – liten",
        description: "Én flate",
        price: "",
      },
      {
        name: "Fylling – mellomstor",
        description: "To flater",
        price: "",
      },
      {
        name: "Fylling – stor",
        description: "Tre eller flere flater",
        price: "",
      },
    ],
  },
  {
    title: "Rotbehandling",
    items: [
      {
        name: "Rotfylling – 1 rotkanal",
        description: "Tann med én rotkanal",
        price: "",
      },
      {
        name: "Rotfylling – 2 rotkanaler",
        description: "Tann med to rotkanaler",
        price: "",
      },
      {
        name: "Rotfylling – 3 til 4 rotkanaler",
        description: "Tann med tre til fire rotkanaler",
        price: "",
      },
    ],
  },
  {
    title: "Tannkjøttbehandling (Periodonti)",
    items: [
      {
        name: "Periodontal behandling og rehabilitering etter periodontitt",
        description: "Behandling og oppfølging av tannkjøttsykdom",
        price: "",
      },
      {
        name: "Behandling av marginal periodontitt",
        description: "Behandling av tannkjøttbetennelse",
        price: "",
      },
      {
        name: "Fiksering av tenner",
        description: "Stabilisering av løse tenner",
        price: "",
      },
      {
        name: "Tillegg for kirurgiske inngrep ved behandling av marginal periodontitt",
        description: "Kirurgisk tilleggsbehandling",
        price: "",
      },
    ],
  },
  {
    title: "Krone & Protetikk",
    items: [
      {
        name: "Fullkrone",
        description: "Hel krone over tann",
        price: "",
      },
    ],
  },
  {
    title: "Kirurgi & Tannfjerning",
    items: [
      {
        name: "Ukomplisert ekstraksjon av tann eller rot",
        description: "Enkel fjerning av tann",
        price: "",
      },
      {
        name: "Kirurgisk fjerning av retinert tann eller dyptliggende rot",
        description: "Kirurgisk fjerning av visdomstann o.l.",
        price: "",
      },
    ],
  },
];

export default function Priser() {
  return (
    <>
      {/* Page header */}
      <PageHeader
        subtitle="Transparent prising"
        title="Behandlinger"
        description="Vi tror på åpen og ærlig prising. Her finner du en oversikt over våre behandlingspriser."
      />

      {/* Info banner */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AnimateOnScroll animation="fadeIn">
            <GlassCard level={1} className="border-l-4 border-l-accent px-6 py-4">
              <div className="flex items-start sm:items-center gap-3">
                <Info className="w-5 h-5 text-accent shrink-0 mt-0.5 sm:mt-0" />
                <p className="text-sm text-foreground/80">
                  <strong>Merk:</strong> Prisene er veiledende og kan variere
                  avhengig av behandlingens omfang. Barn og ungdom under 18 år har
                  rett på gratis tannbehandling gjennom den offentlige
                  tannhelsetjenesten. Vi gir alltid et prisoverslag før behandling
                  starter.
                </p>
              </div>
            </GlassCard>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Price tables */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {priceCategories.map((category, catIndex) => (
              <AnimateOnScroll key={category.title} animation="fadeUp" delay={catIndex * 0.1}>
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-block bg-primary-light/60 text-primary-dark px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                      {category.title}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <GlassCard level={2} className="overflow-hidden">
                    {category.items.map((item, index) => (
                      <div
                        key={item.name}
                        className={`flex items-center justify-between px-6 py-4 ${index !== category.items.length - 1
                            ? "border-b border-surface-dark/50"
                            : ""
                          } hover:bg-white/50 transition-colors`}
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted">{item.description}</p>
                        </div>
                        {item.price && (
                          <p className="font-bold text-primary whitespace-nowrap ml-4">
                            {item.price}
                          </p>
                        )}
                      </div>
                    ))}
                  </GlassCard>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Payment info */}
      <section className="py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimateOnScroll animation="fadeUp">
              <GlassCard level={2} className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Betalingsinformasjon
                </h3>
                <ul className="space-y-3 text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    Betaling skjer ved endt behandling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    Vi aksepterer kort, Vipps og kontant
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    Avbetalingsordninger kan avtales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    Trygderefusjon for stønadberettigede behandlinger
                  </li>
                </ul>
              </GlassCard>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeUp" delay={0.1}>
              <GlassCard level={2} className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Trygderefusjon
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  Enkelte tannbehandlinger gir rett til refusjon fra HELFO. Vi
                  hjelper deg med å sende refusjonskrav, slik at du får tilbake
                  det du har krav på.
                </p>
                <p className="text-muted leading-relaxed">
                  Spør oss gjerne om dette ved bestilling av time, så informerer
                  vi deg om dine rettigheter.
                </p>
              </GlassCard>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="scaleIn">
            <GlassCard level={3} className="p-10 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Har du spørsmål om priser?
              </h2>
              <p className="text-muted text-lg mb-8">
                Ring oss for et uforpliktende prisoverslag eller bestill en
                konsultasjon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg"
                >
                  Kontakt Oss
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+4761280412"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  61 28 04 12
                </a>
              </div>
            </GlassCard>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

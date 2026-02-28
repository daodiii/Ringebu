import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import GlassCard from "@/components/GlassCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TreatmentAccordion from "@/components/TreatmentAccordion";
import CategoryAccordion from "@/components/CategoryAccordion";

export const metadata: Metadata = {
  title: "Vi tilbyr",
  description:
    "Se vårt komplette utvalg av tannbehandlinger. Fra forebyggende pleie til kosmetisk behandling og spesialistbehandlinger.",
};

const treatments = [
  {
    iconName: "Crown",
    title: "Kron og Bro",
    description:
      "Kroner og broer gjenoppretter skadede eller manglende tenner med holdbare, naturlig utseende restaureringer. Vi bruker moderne materialer for best mulig resultat.",
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
      "Regelmessig forebyggende behandling er nøkkelen til god tannhelse. Vi hjelper deg med å opprettholde et friskt smil gjennom undersøkelser, rens og veiledning.",
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
      "Moderne, tannfargede fyllinger som reparerer hull og gjenoppretter tennenes naturlige form og funksjon. Vi bruker kun de beste komposittmaterialene.",
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
      "Rotfylling redder tenner som er skadet eller infisert i nerven. Med moderne teknikker og utstyr gjennomfører vi behandlingen skånsomt og effektivt.",
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
      "Profesjonell tannbleking som gir deg et lysere og hvitere smil. Vi tilbyr trygge metoder tilpasset dine ønsker, enten på klinikken eller hjemme.",
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
      "Visdomstenner kan skape problemer som smerter, infeksjoner og trengsel. Vi vurderer om fjerning er nødvendig og utfører inngrepet trygt og skånsomt.",
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
      "Friskt tannkjøtt er grunnlaget for god tannhelse. Vi behandler tannkjøttsykdom og fjerner tannstein for å forebygge betennelse og tannløsning.",
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
      "Tanngnising og sammenbiting kan slite ned tennene og forårsake smerter i kjeve, hode og nakke. En tilpasset bittskinne beskytter tennene og lindrer plager.",
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
      "Vi forstår at mange gruer seg til tannlegebesøk. Hos oss møter du et trygt, rolig miljø med ekstra tid og omsorg for å gjøre opplevelsen så behagelig som mulig.",
    features: [
      "Rolig og trygt behandlingsmiljø",
      "Ekstra tid til å bli kjent og trygg",
      "Skånsom og varsomme behandlingsteknikker",
      "Mulighet for pauser underveis",
    ],
    category: "Spesialbehandling",
  },
];

const categories = [...new Set(treatments.map((t) => t.category))];

const categorySubtitles: Record<string, string> = {
  Restaurering: "Gjenopprett og bevar tennenes form og funksjon",
  Forebyggende: "Hold tennene friske med regelmessig pleie",
  Kosmetisk: "Få et lysere, hvitere smil",
  Kirurgi: "Trygg og skånsom kirurgisk behandling",
  Spesialbehandling: "Tilpasset hjelp for spesielle behov",
};

export default function Behandlinger() {
  return (
    <>
      {/* Page header */}
      <PageHeader
        subtitle="Vårt mål er å hjelpe deg"
        title="Vi tilbyr"
        description="Vi tilbyr et bredt spekter av tannbehandlinger — fra forebyggende pleie til avansert kosmetisk og kirurgisk behandling."
      />

      {/* Editorial accordion chapters */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category, catIndex) => (
            <AnimateOnScroll key={category} animation="fadeUp">
              <div className={`md:py-12 py-2 ${catIndex < categories.length - 1 ? "border-b border-accent-gold/30" : ""}`}>
                <CategoryAccordion
                  category={category}
                  subtitle={categorySubtitles[category]}
                >
                  {treatments
                    .filter((t) => t.category === category)
                    .map((treatment) => (
                      <TreatmentAccordion key={treatment.title} treatment={treatment} />
                    ))}
                </CategoryAccordion>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll animation="scaleIn">
            <GlassCard level={3} className="p-10 md:p-14">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Usikker på hvilken behandling du trenger?
              </h2>
              <p className="text-muted text-lg mb-8">
                Ta kontakt med oss for en uforpliktende konsultasjon. Vi hjelper
                deg med å finne den beste løsningen for dine behov.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Kontakt Oss
                </Link>
                <Link
                  href="/priser"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300"
                >
                  Se Priser
                </Link>
              </div>
            </GlassCard>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

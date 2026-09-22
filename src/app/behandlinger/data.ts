// src/app/behandlinger/data.ts

export type Refusion = "HELFO" | "Delvis HELFO" | "Egenandel";

export interface PriceItem {
  name: string;
  description: string;
}

export interface Treatment {
  title: string;
  subtitle: string;
  category: "Forebyggende" | "Kosmetisk" | "Restaurering" | "Kirurgi" | "Spesialbehandling";
  refusion: Refusion;
  duration: string;
  description: string;
  features: readonly string[];
  prices: readonly PriceItem[];
  /** Photo path. If the file does not exist, the spread falls back to `photoTone`. */
  photo?: string;
  /** Fallback tone shown when `photo` is undefined or missing on disk. */
  photoTone: string;
}

export const TREATMENTS: readonly Treatment[] = [
  {
    title: "Forebyggende behandling",
    subtitle: "Kontroll, rens og fluor",
    category: "Forebyggende",
    refusion: "HELFO",
    duration: "30–45 min",
    description:
      "Går du jevnlig til kontroll, holder tennene seg friske. Vi undersøker, renser og viser deg hva du bør gjøre hjemme.",
    features: [
      "Grundig tannundersøkelse med digitalt røntgen",
      "Profesjonell tannrens og polering",
      "Fluorbehandling for sterkere emalje",
      "Individuelle råd for munnhygiene hjemme",
    ],
    prices: [
      { name: "Undersøkelse med rens og kostnadsoverslag", description: "Fullstendig tannhelsesjekk" },
      { name: "Studentrabatt på undersøkelse",              description: "Gyldig med studentbevis" },
      { name: "Enkel etterkontroll",                         description: "Etter kirurgiske inngrep" },
      { name: "Omfattende etterkontroll",                    description: "Etter oralmedisinske undersøkelser" },
    ],
    photo: "/images/hero-clinic.jpg",
    photoTone: "#DCE6E2",
  },
  {
    title: "Bleking",
    subtitle: "Hvitere tenner",
    category: "Kosmetisk",
    refusion: "Egenandel",
    duration: "60–90 min",
    description:
      "Få hvitere tenner med profesjonell bleking. Det er trygt, gjør ikke vondt, og resultatet holder lenge.",
    features: [
      "Klinikkbleking med raskt resultat",
      "Hjemmebleking med tilpassede skinner",
      "Skånsom behandling for emaljen",
      "Langvarig og naturlig resultat",
    ],
    prices: [],
    photo: "/images/klinikk-rontgen-maskin.jpg",
    photoTone: "#E6EDE9",
  },
  {
    title: "Fyllingsterapi",
    subtitle: "Fyllinger du ikke ser",
    category: "Restaurering",
    refusion: "HELFO",
    duration: "45–60 min",
    description:
      "Vi fyller hullet med en fylling i samme farge som tannen. Du ser ikke forskjellen.",
    features: [
      "Tannfargede komposittfyllinger",
      "Utskifting av gamle amalgamfyllinger",
      "Smertefri behandling med lokalbedøvelse",
      "Holdbare materialer med naturlig utseende",
    ],
    prices: [
      { name: "Fylling, liten",       description: "Én flate" },
      { name: "Fylling, mellomstor",  description: "To flater" },
      { name: "Fylling, stor",        description: "Tre eller flere flater" },
    ],
    photo: "/images/clinic-instruments.jpg",
    photoTone: "#E4ECE7",
  },
  {
    title: "Kron og bro",
    subtitle: "Når en tann må bygges opp",
    category: "Restaurering",
    refusion: "Delvis HELFO",
    duration: "Flere besøk",
    description:
      "En krone reparerer en skadet tann. En bro erstatter en som mangler. Begge ser naturlige ut.",
    features: [
      "Helkeramiske kroner for naturlig utseende",
      "Broer som erstatter manglende tenner",
      "Lang holdbarhet med riktig vedlikehold",
      "Skreddersydd tilpasning til ditt bitt",
    ],
    prices: [
      { name: "Fullkrone", description: "Hel krone over tann" },
    ],
    photo: "/images/klinikk-instrumenter.jpg",
    photoTone: "#DCE6E2",
  },
  {
    title: "Rotfylling",
    subtitle: "Redd tannen din",
    category: "Restaurering",
    refusion: "HELFO",
    duration: "60–90 min",
    description:
      "Rotfylling redder tenner som er skadet eller infisert. Det er ikke vondt, og du får beholde tannen.",
    features: [
      "Moderne endodontisk behandling",
      "Smertefri med god bedøvelse",
      "Avansert utstyr for presis behandling",
      "Bevarer din naturlige tann",
    ],
    prices: [
      { name: "Rotfylling, 1 rotkanal",     description: "Tann med én rotkanal" },
      { name: "Rotfylling, 2 rotkanaler",    description: "Tann med to rotkanaler" },
      { name: "Rotfylling, 3–4 rotkanaler",  description: "Tann med tre til fire rotkanaler" },
    ],
    photo: "/images/klinikk-rontgen-detalj.jpg",
    photoTone: "#E1EAE5",
  },
  {
    title: "Visdomstennene",
    subtitle: "Vurdering og fjerning",
    category: "Kirurgi",
    refusion: "Delvis HELFO",
    duration: "45–90 min",
    description:
      "Vi sjekker om visdomstennene dine trenger å fjernes, og hvis ja, gjør vi det skånsomt.",
    features: [
      "Grundig vurdering med røntgen",
      "Skånsom kirurgisk fjerning",
      "God smertelindring under og etter",
      "Tett oppfølging i etterkant",
    ],
    prices: [
      { name: "Ukomplisert ekstraksjon", description: "Enkel fjerning av tann eller rot" },
      { name: "Kirurgisk fjerning",       description: "Fjerning av retinert tann" },
    ],
    photo: "/images/ringebutannMain.jpg",
    photoTone: "#E9EFEC",
  },
  {
    title: "Tannkjøtt & tannstein",
    subtitle: "Behandling av tannkjøttet",
    category: "Forebyggende",
    refusion: "HELFO",
    duration: "45–60 min",
    description:
      "Tennene holder ikke uten friskt tannkjøtt. Vi fjerner tannstein og behandler betennelse.",
    features: [
      "Grundig fjerning av tannstein",
      "Behandling av gingivitt og periodontitt",
      "Veiledning i effektiv munnhygiene",
      "Regelmessig oppfølging og vedlikehold",
    ],
    prices: [
      { name: "Periodontal behandling",     description: "Behandling av tannkjøttsykdom" },
      { name: "Behandling av periodontitt", description: "Tannkjøttbetennelse" },
      { name: "Fiksering av tenner",         description: "Stabilisering av løse tenner" },
    ],
    photo: "/images/klinikk-rontgen-skjerm.jpg",
    photoTone: "#E7EEEA",
  },
  {
    title: "Bittskinner",
    subtitle: "Beskyttelse mot tanngnissing",
    category: "Spesialbehandling",
    refusion: "Egenandel",
    duration: "30 min",
    description:
      "Gnisser du tenner om natten? Det sliter dem ned og gir vondt. En bittskinne beskytter.",
    features: [
      "Individuelt tilpassede bittskinner",
      "Beskyttelse mot slitasje",
      "Lindring av kjevesmerter og hodepine",
      "Veiledning om årsaker og forebygging",
    ],
    prices: [],
    photo: "/images/clinic-valley.jpg",
    photoTone: "#E6EDE9",
  },
  {
    title: "Tannlegeskrekk",
    subtitle: "Vi forstår deg",
    category: "Spesialbehandling",
    refusion: "HELFO",
    duration: "45–60 min",
    description:
      "Mange gruer seg. Hos oss får du ekstra tid, og vi tar pauser når du trenger det.",
    features: [
      "Rolig og trygt behandlingsmiljø",
      "Ekstra tid til å bli kjent og trygg",
      "Skånsomme behandlingsteknikker",
      "Mulighet for pauser underveis",
    ],
    prices: [],
    photo: "/images/clinic-sign.jpg",
    photoTone: "#E1EAE5",
  },
];

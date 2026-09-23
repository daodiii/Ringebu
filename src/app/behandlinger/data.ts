// src/app/behandlinger/data.ts

export type Refusion = "HELFO" | "Delvis HELFO" | "Egenandel";

export interface Treatment {
  title: string;
  subtitle: string;
  category: "Forebyggende" | "Kosmetisk" | "Restaurering" | "Kirurgi" | "Spesialbehandling";
  refusion: Refusion;
  description: string;
  features: readonly string[];
}

export const TREATMENTS: readonly Treatment[] = [
  {
    title: "Forebyggende behandling",
    subtitle: "Kontroll, rens og fluor",
    category: "Forebyggende",
    refusion: "HELFO",
    description:
      "Går du jevnlig til kontroll, holder tennene seg friske. Vi undersøker, renser og viser deg hva du bør gjøre hjemme.",
    features: [
      "Grundig tannundersøkelse med digitalt røntgen",
      "Profesjonell tannrens og polering",
      "Fluorbehandling for sterkere emalje",
      "Individuelle råd for munnhygiene hjemme",
    ],
  },
  {
    title: "Bleking",
    subtitle: "Hvitere tenner",
    category: "Kosmetisk",
    refusion: "Egenandel",
    description:
      "Få hvitere tenner med profesjonell bleking. Det er trygt, gjør ikke vondt, og resultatet holder lenge.",
    features: [
      "Klinikkbleking med raskt resultat",
      "Hjemmebleking med tilpassede skinner",
      "Skånsom behandling for emaljen",
      "Langvarig og naturlig resultat",
    ],
  },
  {
    title: "Fyllingsterapi",
    subtitle: "Fyllinger du ikke ser",
    category: "Restaurering",
    refusion: "HELFO",
    description:
      "Vi fyller hullet med en fylling i samme farge som tannen. Du ser ikke forskjellen.",
    features: [
      "Tannfargede komposittfyllinger",
      "Utskifting av gamle amalgamfyllinger",
      "Smertefri behandling med lokalbedøvelse",
      "Holdbare materialer med naturlig utseende",
    ],
  },
  {
    title: "Kron og bro",
    subtitle: "Når en tann må bygges opp",
    category: "Restaurering",
    refusion: "Delvis HELFO",
    description:
      "En krone reparerer en skadet tann. En bro erstatter en som mangler. Begge ser naturlige ut.",
    features: [
      "Helkeramiske kroner for naturlig utseende",
      "Broer som erstatter manglende tenner",
      "Lang holdbarhet med riktig vedlikehold",
      "Skreddersydd tilpasning til ditt bitt",
    ],
  },
  {
    title: "Rotfylling",
    subtitle: "Redd tannen din",
    category: "Restaurering",
    refusion: "HELFO",
    description:
      "Rotfylling redder tenner som er skadet eller infisert. Det er ikke vondt, og du får beholde tannen.",
    features: [
      "Moderne endodontisk behandling",
      "Smertefri med god bedøvelse",
      "Avansert utstyr for presis behandling",
      "Bevarer din naturlige tann",
    ],
  },
  {
    title: "Visdomstennene",
    subtitle: "Vurdering og fjerning",
    category: "Kirurgi",
    refusion: "Delvis HELFO",
    description:
      "Vi sjekker om visdomstennene dine trenger å fjernes, og hvis ja, gjør vi det skånsomt.",
    features: [
      "Grundig vurdering med røntgen",
      "Skånsom kirurgisk fjerning",
      "God smertelindring under og etter",
      "Tett oppfølging i etterkant",
    ],
  },
  {
    title: "Tannkjøtt & tannstein",
    subtitle: "Behandling av tannkjøttet",
    category: "Forebyggende",
    refusion: "HELFO",
    description:
      "Tennene holder ikke uten friskt tannkjøtt. Vi fjerner tannstein og behandler betennelse.",
    features: [
      "Grundig fjerning av tannstein",
      "Behandling av gingivitt og periodontitt",
      "Veiledning i effektiv munnhygiene",
      "Regelmessig oppfølging og vedlikehold",
    ],
  },
  {
    title: "Bittskinner",
    subtitle: "Beskyttelse mot tanngnissing",
    category: "Spesialbehandling",
    refusion: "Egenandel",
    description:
      "Gnisser du tenner om natten? Det sliter dem ned og gir vondt. En bittskinne beskytter.",
    features: [
      "Individuelt tilpassede bittskinner",
      "Beskyttelse mot slitasje",
      "Lindring av kjevesmerter og hodepine",
      "Veiledning om årsaker og forebygging",
    ],
  },
  {
    title: "Tannlegeskrekk",
    subtitle: "Vi forstår deg",
    category: "Spesialbehandling",
    refusion: "HELFO",
    description:
      "Mange gruer seg. Hos oss får du ekstra tid, og vi tar pauser når du trenger det.",
    features: [
      "Rolig og trygt behandlingsmiljø",
      "Ekstra tid til å bli kjent og trygg",
      "Skånsomme behandlingsteknikker",
      "Mulighet for pauser underveis",
    ],
  },
];

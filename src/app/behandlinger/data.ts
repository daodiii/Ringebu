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

// The first five are the boxes on the front page and the links in the footer.
export const TREATMENTS: readonly Treatment[] = [
  {
    title: "Forebyggende behandling",
    subtitle: "Undersøkelse, rens og fluor",
    category: "Forebyggende",
    refusion: "HELFO",
    description:
      "Går du jevnlig til undersøkelse, holder tennene seg friske. Vi ser over tennene, renser dem og veileder deg i hvordan du tar vare på dem hjemme.",
    features: [
      "Grundig undersøkelse med digitalt røntgen",
      "Tannrens og polering, også med Airflow",
      "Fluorbehandling for sterkere emalje",
      "Individuelle råd for munnhygiene hjemme",
    ],
  },
  {
    title: "Fyllingsterapi",
    subtitle: "Hull i tennene (karies)",
    category: "Restaurering",
    refusion: "HELFO",
    description:
      "Hull i tennene kalles karies. Vi reparerer kariesangrepet med kompositt, som har samme farge som tannen.",
    features: [
      "Komposittfyllinger i samme farge som tannen",
      "Glassionomerfyllinger der det passer bedre",
      "Utskifting av gamle amalgamfyllinger",
      "Lokalbedøvelse når du trenger det",
    ],
  },
  {
    title: "Rotfylling",
    subtitle: "Redd tannen din",
    category: "Restaurering",
    refusion: "HELFO",
    description:
      "Rotfylling redder tenner som er skadet eller infisert. Vi tar vekk nerven i tannen, og du får beholde tannen.",
    features: [
      "Moderne endodontisk behandling",
      "God bedøvelse under behandlingen",
      "Avansert utstyr for presis behandling",
      "Bevarer din naturlige tann",
    ],
  },
  {
    title: "Kroner og broer",
    subtitle: "Når en tann må bygges opp",
    category: "Restaurering",
    refusion: "Delvis HELFO",
    description:
      "En krone reparerer en skadet tann. En bro erstatter en som mangler. Begge ser naturlige ut.",
    features: [
      "Helkeramiske kroner for naturlig utseende",
      "Broer som erstatter manglende tenner",
      "Lang holdbarhet med riktig vedlikehold",
      "Tilpasset bittet ditt",
    ],
  },
  {
    title: "Tannimplantater",
    subtitle: "Ny tann festet i kjeven",
    category: "Kirurgi",
    refusion: "Delvis HELFO",
    description:
      "Et implantat er en liten skrue i kjeven som erstatter roten på en tann som mangler. Vi setter inn implantatet og lager tannen som festes på det.",
    features: [
      "Vurdering med røntgen før vi starter",
      "Kirurgien gjør vi selv, her på klinikken",
      "Krone, bro eller protese festet på implantatene",
      "Godkjent av Helfo for implantatprotetikk med trygderefusjon",
    ],
  },
  {
    title: "Tannkjøttbehandling",
    subtitle: "Gingivitt og periodontitt",
    category: "Forebyggende",
    refusion: "HELFO",
    description:
      "Tennene holder ikke uten friskt tannkjøtt. Betennelse i tannkjøttet heter gingivitt. Når betennelsen går ned mot festet til tannen, heter det periodontitt. Vi behandler begge.",
    features: [
      "Grundig fjerning av tannstein",
      "Behandling av gingivitt og periodontitt",
      "Veiledning i effektiv munnhygiene",
      "Regelmessig oppfølging og vedlikehold",
    ],
  },
  {
    title: "Tanntrekking",
    subtitle: "Ukomplisert trekking eller kirurgisk fjerning av tann",
    category: "Kirurgi",
    refusion: "Delvis HELFO",
    description:
      "Noen ganger må en tann ut. Som regel er trekkingen ukomplisert. Sitter tannen vanskelig til, som visdomstenner ofte gjør, fjerner vi den kirurgisk.",
    features: [
      "Vurdering med røntgen før vi trekker",
      "Ukomplisert tanntrekking",
      "Kirurgisk fjerning av tenner som sitter vanskelig, også visdomstenner",
      "God bedøvelse og oppfølging etterpå",
    ],
  },
  {
    title: "Proteser",
    subtitle: "Helproteser og delproteser",
    category: "Restaurering",
    refusion: "Delvis HELFO",
    description:
      "En protese erstatter tenner som mangler, og du kan ta den ut. En helprotese erstatter alle tennene i en kjeve. En delprotese fyller inn der noen tenner mangler.",
    features: [
      "Helproteser når alle tennene i en kjeve mangler",
      "Delproteser som festes til tennene du har",
      "Tilpasset munnen og bittet ditt",
      "Justering til protesen sitter godt",
    ],
  },
  {
    title: "Tannskader",
    subtitle: "Når en tann knekker eller slås løs",
    category: "Restaurering",
    refusion: "HELFO",
    description:
      "En tann kan knekke, løsne eller bli slått ut i et fall eller en ulykke. Vi undersøker skaden og reparerer tannen.",
    features: [
      "Undersøkelse og røntgen av skaden",
      "Reparasjon av tenner som har knekt",
      "Behandling av tenner som har løsnet eller blitt slått ut",
      "Oppfølging over tid, fordi noen skader viser seg senere",
    ],
  },
  {
    title: "Stabiliseringsskinner",
    subtitle: "Beskyttelse mot tanngnissing",
    category: "Spesialbehandling",
    refusion: "Egenandel",
    description:
      "Gnisser du tenner om natten? Det sliter dem ned og gir vondt. En stabiliseringsskinne beskytter.",
    features: [
      "Individuelt tilpassede skinner",
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

/* ── Treatments ── */
export const treatments = [
  {
    title: "Generell tannbehandling",
    description: "Undersøkelser, fyllinger, rotbehandling og alt innen standard tannpleie for hele familien.",
    color: "emerald",
  },
  {
    title: "Kosmetisk tannpleie",
    description: "Tannbleking, fasetter og estetiske behandlinger for et vakrere smil.",
    color: "sky",
  },
  {
    title: "Tannimplantater",
    description: "Permanente erstatninger for manglende tenner som ser og føles naturlige.",
    color: "violet",
  },
  {
    title: "Akutt tannhjelp",
    description: "Rask hjelp ved tannpine, skader og akutte tannproblemer.",
    color: "rose",
  },
  {
    title: "Forebyggende behandling",
    description: "Tannrens, fluorbehandling og veiledning for å unngå fremtidige problemer.",
    color: "amber",
  },
  {
    title: "Rotbehandling",
    description: "Skånsom behandling for å redde infiserte tenner og lindre smerte.",
    color: "teal",
  },
];

export const treatmentColors: Record<string, { bg: string; text: string; icon: string }> = {
  emerald: { bg: "bg-[var(--color-bg-cream)]", text: "text-[var(--color-primary)]", icon: "text-[var(--color-accent)]" },
  sky:     { bg: "bg-[var(--color-bg-blue)]", text: "text-[var(--color-primary)]", icon: "text-[var(--color-accent)]" },
  violet:  { bg: "bg-[var(--color-bg-mint)]", text: "text-[var(--color-primary)]", icon: "text-[var(--color-accent)]" },
  rose:    { bg: "bg-[var(--color-bg-yellow)]", text: "text-[var(--color-primary)]", icon: "text-[var(--color-accent)]" },
  amber:   { bg: "bg-[var(--color-bg-cream)]", text: "text-[var(--color-primary)]", icon: "text-[var(--color-accent)]" },
  teal:    { bg: "bg-[var(--color-bg-blue)]", text: "text-[var(--color-primary)]", icon: "text-[var(--color-accent)]" },
};

/* ── Symptoms ── */
export const symptoms = [
  {

    title: "Tannpine",
    description: "Vedvarende eller plutselig smerte i tenner kan tyde på hull, infeksjon eller sprekk i tannen.",
    severity: "Oppsøk tannlege snarest",
    causes: ["Hull i tannen", "Tannrotinfeksjon", "Sprekk eller brudd", "Slitt tannemalje"],
    whatToDo: "Ta smertestillende og skyll munnen med saltvannsløsning. Bestill time hos tannlegen så snart som mulig.",
    slug: "tannpine-arsaker-behandling",
  },
  {

    title: "Blødende tannkjøtt",
    description: "Tannkjøtt som blør ved tannpuss eller bruk av tanntråd kan være et tegn på gingivitt.",
    severity: "Bør undersøkes",
    causes: ["Gingivitt", "Periodontitt", "Feil pusseteknikk", "Hormonelle endringer"],
    whatToDo: "Fortsett å pusse forsiktig og bruk tanntråd daglig. Bestill time for undersøkelse.",
    slug: "blodende-tannkjott",
  },
  {

    title: "Sensitive tenner",
    description: "Smerte eller ubehag ved varme, kulde eller søt mat kan skyldes eksponert dentin.",
    severity: "Vanlig, men bør sjekkes",
    causes: ["Slitt emalje", "Tilbaketrukket tannkjøtt", "Hull", "Nylig tannbehandling"],
    whatToDo: "Bruk tannkrem for sensitive tenner. Unngå svært varme eller kalde drikkevarer.",
    slug: "tannpine-arsaker-behandling",
  },
  {

    title: "Hovne tannkjøtt",
    description: "Hevelse i tannkjøttet kan indikere infeksjon, betennelse eller periodontitt.",
    severity: "Oppsøk tannlege",
    causes: ["Infeksjon", "Periodontitt", "Abscess", "Fastsittende mat"],
    whatToDo: "Skyll med saltvannsløsning og unngå å irritere det berørte området. Kontakt tannlege.",
    slug: "blodende-tannkjott",
  },
  {

    title: "Dårlig ånde",
    description: "Vedvarende dårlig ånde kan skyldes bakterier, tannkjøttsykdom eller andre tilstander.",
    severity: "Bør undersøkes",
    causes: ["Dårlig munnhygiene", "Tannkjøttsykdom", "Tørr munn", "Matinntak"],
    whatToDo: "Forbedre munnhygienen, puss tungen og bruk tanntråd. Bestill undersøkelse.",
    slug: "forebygge-hull-i-tennene",
  },
  {

    title: "Tannkjøttbetennelse",
    description: "Rødt, hovent og ømt tannkjøtt er ofte tegn på begynnende periodontitt.",
    severity: "Bør behandles",
    causes: ["Plakk og tannstein", "Røyking", "Diabetes", "Svakt immunforsvar"],
    whatToDo: "Profesjonell tannrens og god daglig munnhygiene er nøkkelen til bedring.",
    slug: "blodende-tannkjott",
  },
  {

    title: "Løse tenner",
    description: "Tenner som er løse eller har endret posisjon kan indikere alvorlig periodontitt.",
    severity: "Haster – oppsøk tannlege",
    causes: ["Avansert periodontitt", "Skade", "Beinsvinn", "Tanngnissing"],
    whatToDo: "Unngå å tygge hardt på den berørte tannen. Oppsøk tannlege umiddelbart.",
    slug: "blodende-tannkjott",
  },
  {

    title: "Kjevesmerter",
    description: "Smerter i kjeven, hodepine eller knepping kan skyldes tanngnissing eller kjeveproblemer.",
    severity: "Bør undersøkes",
    causes: ["Tanngnissing (bruksisme)", "TMJ-lidelse", "Stress", "Feilbitt"],
    whatToDo: "Unngå hard mat og tyggegummi. Vurder bittskinner og avspenningsteknikker.",
    slug: "tannpine-arsaker-behandling",
  },
];

/* ── Articles ── */
export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "tannpine-arsaker-behandling",
    title: "Tannpine: Årsaker, behandling og forebygging",
    excerpt: "Tannpine er en av de vanligste årsakene til at folk oppsøker tannlegen. Lær om de vanligste årsakene og hva du kan gjøre for å lindre smerten.",
    category: "Smertelindring",
    readTime: "5 min",
    date: "2026-03-15",
    image: "/images/service-general.jpg",
    content: [
      "Tannpine kan variere fra mild til intens og kan ha mange ulike årsaker. Det er viktig å forstå at tannpine sjelden forsvinner av seg selv – det er kroppens måte å signalisere at noe er galt på.",
      "## Vanlige årsaker til tannpine",
      "**Hull i tennene (karies)** er den vanligste årsaken til tannpine. Når bakterier bryter ned tannemaljen, kan de nå det sensitive dentinet og til slutt tannnerven. Jo lenger du venter med behandling, desto verre kan problemet bli.",
      "**Tannrotinfeksjon** oppstår når bakterier når inn til tannens pulpa (nerven). Dette kan forårsake intens, bankende smerte som ofte forverres om natten. Rotbehandling er vanligvis nødvendig for å redde tannen.",
      "**Sprukne eller knuste tenner** kan oppstå etter en skade, ved tygging av hard mat eller som følge av tanngnissing. En sprekk kan noen ganger være usynlig for det blotte øyet, men kan forårsake betydelig smerte.",
      "**Visdomstenner** som bryter gjennom tannkjøttet kan forårsake smerte og ubehag, spesielt hvis det ikke er nok plass i kjeven.",
      "## Hva kan du gjøre hjemme?",
      "Selv om du bør oppsøke tannlege for varig lindring, finnes det noen tiltak du kan gjøre hjemme for midlertidig smertelindring:",
      "- Ta reseptfrie smertestillende som ibuprofen eller paracetamol\n- Skyll munnen med en saltvannsløsning (en halv teskje salt i et glass lunkent vann)\n- Legg en kald kompresse utvendig på kinnet i berørt område\n- Unngå svært varm, kald eller søt mat og drikke\n- Puss forsiktig rundt det smertefulle området",
      "## Når bør du oppsøke tannlegen?",
      "Du bør kontakte tannlegen umiddelbart dersom smerten er intens og vedvarende, du har feber sammen med tannpine, det er hevelse i ansiktet eller kjeven, smerten varer mer enn to dager, eller du har vondt ved åpning av munnen.",
      "## Forebygging er nøkkelen",
      "Den beste måten å unngå tannpine på er god daglig munnhygiene. Puss tennene to ganger daglig med fluortannkrem, bruk tanntråd hver dag, og gå til regelmessige kontroller hos tannlegen. Hos Ringebu Tannlegesenter anbefaler vi tannlegekontroll minst en gang i året.",
    ],
  },
  {
    slug: "blodende-tannkjott",
    title: "Blødende tannkjøtt – årsaker og behandling",
    excerpt: "Opplever du at tannkjøttet blør når du pusser tennene? Det kan være et tidlig tegn på tannkjøttsykdom. Her er hva du bør vite.",
    category: "Tannkjøtt",
    readTime: "4 min",
    date: "2026-03-10",
    image: "/images/service-cosmetic.jpg",
    content: [
      "Blødende tannkjøtt er et symptom som mange opplever, men som ikke bør ignoreres. Det er ofte et tegn på at tannkjøttet er betent – en tilstand som kalles gingivitt.",
      "## Hva forårsaker blødende tannkjøtt?",
      "**Plakk og tannstein** er hovedårsakene. Når plakk samler seg langs tannkjøttranden, irriterer det tannkjøttet og fører til betennelse. Over tid kan plakk herde seg til tannstein, som bare kan fjernes av tannlegen.",
      "**Feil pusseteknikk** – å pusse for hardt eller med feil vinkel kan skade tannkjøttet og forårsake blødning. Bruk en myk tannbørste og forsiktige, sirkulære bevegelser.",
      "**Hormonelle endringer** under graviditet, pubertet eller overgangsalder kan gjøre tannkjøttet mer følsomt og utsatt for blødning.",
      "## Gingivitt vs. periodontitt",
      "Gingivitt er det tidlige stadiet av tannkjøttsykdom og er heldigvis reversibelt. Symptomene inkluderer rødt og hovent tannkjøtt som blør lett. Periodontitt er det mer avanserte stadiet hvor beinvevet rundt tennene brytes ned. Dette kan føre til løse tenner og i verste fall tanntap.",
      "## Behandling og forebygging",
      "- Puss tennene to ganger daglig med fluortannkrem\n- Bruk tanntråd eller mellomromsbørster hver dag\n- Gå til regelmessig tannrens hos tannlegen\n- Unngå røyking, som forverrer tannkjøttproblemer\n- Spis et balansert kosthold rikt på vitamin C og D",
      "## Hos Ringebu Tannlegesenter",
      "Vi tilbyr grundig tannkjøttbehandling og kan hjelpe deg med å utvikle en god munnhygiene-rutine. Ikke vent til problemet forverrer seg – bestill en undersøkelse i dag.",
    ],
  },
  {
    slug: "forebygge-hull-i-tennene",
    title: "Slik forebygger du hull i tennene",
    excerpt: "Hull i tennene er et av de vanligste helseproble​mene i verden. Med riktig forebygging kan du holde tennene friske gjennom hele livet.",
    category: "Forebygging",
    readTime: "4 min",
    date: "2026-03-05",
    image: "/images/service-implant.jpg",
    content: [
      "Karies, eller hull i tennene, oppstår når bakterier i munnen produserer syre som bryter ned tannemaljen. Det er en gradvis prosess som kan stoppes og forebygges med riktige tiltak.",
      "## Hvorfor får vi hull i tennene?",
      "Bakterier i munnen lever av sukker og stivelse fra maten vi spiser. De produserer syre som angriper tannemaljen. Over tid kan dette svekke emaljen og danne hull. Faktorer som øker risikoen er hyppig inntak av sukkerholdig mat og drikke, dårlig munnhygiene, tørr munn og manglende fluoridbruk.",
      "## Fem tiltak for å forebygge hull",
      "**1. Puss tennene riktig** – Bruk fluortannkrem og puss i minst to minutter, morgen og kveld. Sørg for å nå alle flater, inkludert baksiden av tennene.",
      "**2. Bruk tanntråd daglig** – Tannbørsten når ikke mellom tennene. Tanntråd fjerner plakk og matrester fra områder som er spesielt utsatt for hull.",
      "**3. Begrens sukkerinntak** – Spesielt mellom måltidene. Hver gang du spiser sukker, får bakteriene ny næring til å produsere syre.",
      "**4. Regelmessige tannlegekontroller** – Tannlegen kan oppdage begynnende hull før de blir et problem, og profesjonell tannrens fjerner tannstein.",
      "**5. Fluorbehandling** – Fluor styrker tannemaljen og gjør den mer motstandsdyktig mot syreangrep. Vurder ekstra fluorbehandling om du er spesielt utsatt.",
      "## Tidlige tegn på hull",
      "Vær oppmerksom på hvite flekker på tennene (tidlig demineralisering), økt følsomhet for varmt, kaldt eller søtt, mørke flekker eller synlige hull, og tannpine eller ubehag ved tygging. Jo tidligere hull oppdages, desto enklere og mindre invasiv er behandlingen.",
    ],
  },
  {
    slug: "tannlegeskrekk-overvinne-angsten",
    title: "Tannlegeskrekk? Slik overvinner du angsten",
    excerpt: "Mange nordmenn unngår tannlegen på grunn av angst. Det finnes effektive metoder for å gjøre tannlegebesøket til en trygg opplevelse.",
    category: "Angst og frykt",
    readTime: "6 min",
    date: "2026-02-28",
    image: "/images/service-emergency.jpg",
    content: [
      "Tannlegeskrekk, også kalt odontofobi, rammer anslagsvis 15–20 prosent av befolkningen. For mange fører angsten til at de unngår tannlegen helt, noe som kan resultere i alvorlige tannhelseproblemer over tid.",
      "## Hva forårsaker tannlegeskrekk?",
      "Årsakene til tannlegeskrekk er sammensatte og individuelle. Vanlige faktorer inkluderer negative opplevelser fra barndommen, følelse av tap av kontroll, frykt for smerte, sjenanse over tannhelse, og generell angstlidelse.",
      "## Teknikker som hjelper",
      "**Åpen kommunikasjon** – Fortell tannlegen om angsten din. Hos Ringebu Tannlegesenter tar vi alltid ekstra tid med engstelige pasienter. Vi forklarer hvert steg før vi gjør noe.",
      "**Avtal et stoppsignal** – Vissheten om at du kan stoppe behandlingen når som helst gir en følelse av kontroll.",
      "**Pusteteknikker** – Dyp pusting kan hjelpe med å roe ned nervesystemet. Pust inn gjennom nesen i fire sekunder, hold i fire, pust ut gjennom munnen i seks.",
      "**Avledning** – Mange finner det nyttig å lytte til musikk eller podcaster under behandlingen.",
      "## Trinnvis tilnærming",
      "Vi anbefaler en gradvis tilnærming for de med sterk tannlegeskrekk. Start med et uforpliktende besøk for å bli kjent med klinikken og personalet. Neste gang kan det være en enkel undersøkelse. Gradvis bygger du opp trygghet og tillit.",
      "## Du er ikke alene",
      "Det er ingenting å skamme seg over. Tannlegeskrekk er vanlig, og vi har lang erfaring med å hjelpe pasienter gjennom angsten. Ta det første steget og ta kontakt – vi er her for deg.",
    ],
  },
  {
    slug: "visdomstenner-nar-fjernes",
    title: "Visdomstenner: Når bør de fjernes?",
    excerpt: "Visdomstenner kan skape problemer for mange. Lær om når fjerning er nødvendig og hva du kan forvente av inngrepet.",
    category: "Kirurgi",
    readTime: "5 min",
    date: "2026-02-20",
    image: "/images/about-clinic.jpg",
    content: [
      "Visdomstenner, eller tredje molarer, er de siste tennene som bryter frem – vanligvis mellom 17 og 25 års alder. For mange skaper de ingen problemer, men for andre kan de forårsake betydelig ubehag.",
      "## Når blir visdomstenner et problem?",
      "Ikke alle visdomstenner trenger å fjernes. Fjerning kan være aktuelt dersom det ikke er nok plass i kjeven, tannen vokser skjevt eller mot nabotannen, tannen er delvis frembrutt og forårsaker betennelse, det er hull i visdomstannen, eller det oppstår cyster eller svulster rundt tannen.",
      "## Symptomer å se etter",
      "Vanlige symptomer som kan tyde på problemer med visdomstenner er smerte bakerst i kjeven, hovent eller ømt tannkjøtt bak siste jeksle, stivhet i kjeven, dårlig smak eller lukt i munnen, og hodepine.",
      "## Hva skjer under inngrepet?",
      "Fjerning av visdomstenner er et vanlig inngrep som vi utfører regelmessig. Du vil få lokalbedøvelse slik at du ikke kjenner smerte under prosedyren. Selve inngrepet tar vanligvis mellom 20 og 45 minutter, avhengig av kompleksiteten.",
      "## Etter inngrepet",
      "Forvent noe hevelse og ubehag de første dagene. Vi gir deg klare instruksjoner for ettervern, inkludert bruk av smertestillende, is på kinnet, myk kost de første dagene, forsiktig skylling med saltvannsløsning, og unngåelse av røyking og suging gjennom sugerør.",
      "## Bestill en vurdering",
      "Er du usikker på om dine visdomstenner bør fjernes? Bestill en undersøkelse hos Ringebu Tannlegesenter, så hjelper vi deg med en grundig vurdering.",
    ],
  },
  {
    slug: "tannbleking-guide",
    title: "Alt du trenger å vite om tannbleking",
    excerpt: "Ønsker du hvitere tenner? Her er en komplett guide til tannbleking – fra profesjonelle behandlinger til hjemmemetoder.",
    category: "Kosmetisk",
    readTime: "5 min",
    date: "2026-02-15",
    image: "/images/service-cosmetic.jpg",
    content: [
      "Et lyst og hvitt smil gir selvtillit og kan gjøre en stor forskjell for utseendet ditt. Tannbleking er en av de mest etterspurte kosmetiske tannbehandlingene, og det finnes flere alternativer.",
      "## Hvorfor blir tennene mørke?",
      "Tenner kan misfarges av mange årsaker. Ytre misfarging fra kaffe, te, rødvin og tobakk setter seg på overflaten. Indre misfarging kan skyldes aldring, medisiner, skader eller naturlig tannfarge.",
      "## Profesjonell tannbleking",
      "Profesjonell bleking utført av tannlegen er den mest effektive og sikreste metoden. Vi bruker sterkere blekemidler enn det som er tilgjengelig for hjemmebruk, og kan oppnå merkbare resultater på kort tid. Fordeler inkluderer tilpasset behandling etter dine behov, jevnt resultat, minimalt med bivirkninger, og langvarig effekt.",
      "## Hjemmebleking med skinne",
      "En annen mulighet er hjemmebleking med individuelt tilpassede skinner. Tannlegen lager skinner som passer perfekt til dine tenner. Du fyller skinnene med blekegel og bruker dem noen timer om dagen i to til tre uker.",
      "## Forventninger og resultater",
      "Det er viktig å ha realistiske forventninger. Tannbleking kan gjøre tennene flere nyanser lysere, men naturlig tannfarge varierer. Resultatet varer vanligvis mellom ett og tre år, avhengig av levevaner.",
      "## Er tannbleking trygt?",
      "Profesjonell tannbleking utført av en kvalifisert tannlege er trygt. Midlertidig følsomhet i tennene kan oppstå, men dette er normalt og forbigående. Vi fraråder imidlertid bleking under graviditet og for barn under 18 år.",
      "## Bestill konsultasjon",
      "Lurer du på om tannbleking er riktig for deg? Bestill en uforpliktende konsultasjon hos Ringebu Tannlegesenter, så hjelper vi deg med å finne den beste løsningen.",
    ],
  },
];

/* ── Tips ── */
export const tips = [
  {
    number: "01.",
    title: "Riktig pusseteknikk",
    description: "Bruk myk børste og vinkle den 45 grader mot tannkjøttet med små bevegelser.",
  },
  {
    number: "02.",
    title: "Mellomromsbørster",
    description: "Tannbørsten når bare 60% av tannen. Bruk tanntråd eller mellomromsbørste daglig.",
  },
  {
    number: "03.",
    title: "Vann som tørstedrikk",
    description: "Unngå syreskader ved å drikke vann mellom måltider fremfor juice eller brus.",
  },
  {
    number: "04.",
    title: "Regelmessig sjekk",
    description: "Forebygg store inngrep ved å komme til kontroll minst én gang i året.",
  },
];

/* ── Stats ── */
export const stats = [
  { value: 15, suffix: "+", label: "Års erfaring" },
  { value: 5000, suffix: "+", label: "Fornøyde pasienter" },
  { value: 12000, suffix: "+", label: "Behandlinger utført" },
  { value: 98, suffix: "%", label: "Pasienttilfredshet" },
];

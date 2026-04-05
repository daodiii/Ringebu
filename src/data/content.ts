/* ── Treatments ── */
export const treatments = [
  {
    title: "Generell tannbehandling",
    description: "Undersøkelser, fyllinger, rotbehandling — alt som hører til vanlig tannbehandling for hele familien.",
    color: "emerald",
  },
  {
    title: "Kosmetisk tannpleie",
    description: "Tannbleking, fasetter og andre behandlinger som gir deg et hvitere, penere smil.",
    color: "sky",
  },
  {
    title: "Tannimplantater",
    description: "Permanente erstatninger for tenner som mangler — ser ut og føles som dine egne.",
    color: "violet",
  },
  {
    title: "Akutt tannhjelp",
    description: "Rask hjelp ved tannpine, skader og akutte tannproblemer.",
    color: "rose",
  },
  {
    title: "Forebyggende behandling",
    description: "Tannrens, fluorbehandling og gode råd så du slipper problemer senere.",
    color: "amber",
  },
  {
    title: "Rotbehandling",
    description: "Redder infiserte tenner og lindrer smerte — skånsomt og trygt.",
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
    image: "/images/article-toothache.jpg",
    content: [
      "Tannpine kan variere fra litt ubehag til helt uutholdelig, og årsakene er mange. Det forsvinner sjelden av seg selv — det er kroppens måte å si fra at noe er galt.",
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
    image: "/images/article-gum-health.jpg",
    content: [
      "Mange opplever at tannkjøttet blør når de pusser tennene, og tenker at det er normalt. Det er det ikke. Blødning betyr som regel at tannkjøttet er betent — det kalles gingivitt.",
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
    image: "/images/article-cavity-prevention.jpg",
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
    image: "/images/article-dental-anxiety-2.jpg",
    content: [
      "Er du redd for tannlegen? Du er langt fra alene — mellom 15 og 20 prosent av oss kjenner på det samme. For mange blir frykten så stor at de unngår tannlegen helt, og det gjør jo bare problemene verre over tid.",
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
    image: "/images/article-wisdom-teeth-2.jpg",
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
    image: "/images/article-teeth-whitening.jpg",
    content: [
      "Hvitere tenner gir selvtillit — det merker de fleste som har prøvd. Tannbleking er noe mange spør om, og det finnes flere måter å gjøre det på.",
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
  {
    slug: "kaffe-brunost-og-tennene-dine",
    title: "Kaffe, brunost og tennene dine",
    excerpt: "Nordmenn drikker i snitt 4 kopper kaffe om dagen — men svart kaffe kan faktisk beskytte mot hull.",
    category: "Kosthold",
    readTime: "3 min",
    date: "2026-03-01",
    image: "/images/article-coffee-teeth.jpg",
    content: [
      "Norge er blant landene med høyest kaffeforbruk per innbygger. Den gode nyheten er at svart kaffe inneholder **polyfenoler** som kan hemme veksten av kariesbakterier. Problemet oppstår når vi tilsetter sukker eller drikker kaffe jevnlig gjennom dagen — da utsettes tennene for et konstant syrepress.",
      "## Brunost og meieriprodukter som tannvern",
      "Brunost og andre norske meieriprodukter er gode allierte for tannhelsen. **Kalsium og kasein** i ost nøytraliserer syrer i munnen og styrker emaljen. Et stykke ost etter måltidet er faktisk et av de beste tiltakene du kan gjøre for tennene.",
      "## Vitamin D og syreangrep",
      "Røykelaks og fet fisk gir **vitamin D**, som er avgjørende for kalsiumopptak og sterke tenner — særlig viktig i den mørke norske vinteren. Unngå derimot hyppig inntak av sure bær, sitrusfrukter og brus mellom måltidene. Hvert syreangrep varer i ca. 30 minutter, så fem kaffepauser med sukker betyr 150 minutter med syreeksponering daglig.",
    ],
  },
  {
    slug: "elektrisk-vs-manuell-tannborste",
    title: "Elektrisk vs. manuell tannbørste",
    excerpt: "Elektriske børster fjerner opptil 21 % mer plakk, viser studier — men teknikken teller mest.",
    category: "Tannpleie",
    readTime: "3 min",
    date: "2026-03-04",
    image: "/images/article-electric-toothbrush.jpg",
    content: [
      "En stor **Cochrane-studie** fant at oscillerende elektriske børster fjerner betydelig mer plakk og reduserer tannkjøttsykdom mer effektivt enn manuelle. Etter tre måneder med bruk var det målbart bedre tannkjøtthelse.",
      "## Hvem har størst nytte av elektrisk?",
      "Likevel er en manuell tannbørste brukt korrekt i to minutter med fluortannkrem god nok for de fleste. Elektriske børster har størst fordel for **personer med nedsatt håndmotorikk**, eldre, barn som lærer seg å pusse, og de som pusser for hardt.",
      "## Timer og trykksensor gjør forskjellen",
      "Mange pusser i under ett minutt med manuell børste. Elektriske børster med **innebygd timer** sikrer at du faktisk pusser i de anbefalte to minuttene. Trykksensorer kan også forhindre at du skader tannkjøttet. Det viktigste er konsekvent bruk — ikke prislappen.",
    ],
  },
  {
    slug: "nar-ma-tannborsten-byttes",
    title: "Når må tannbørsten byttes?",
    excerpt: "Tre måneder er regelen, men børsten kan være ubrukelig allerede etter seks uker.",
    category: "Tannpleie",
    readTime: "2 min",
    date: "2026-03-08",
    image: "/images/article-toothbrush-replace.jpg",
    content: [
      "Tannleger anbefaler å bytte tannbørste eller børstetopp **hver tredje måned**, men dette er et minimumsintervall. Forskning viser at børster med utbøyde og flisete bust fjerner vesentlig mindre plakk enn nye børster.",
      "## En enkel test",
      "Se på børsten fra siden. Hvis bustene stikker ut forbi børstehodet, er den overmoden. Pusser du hardt eller bruker børsten tre ganger daglig, bør du bytte allerede etter **seks til åtte uker**.",
      "## Bytt alltid etter sykdom",
      "Bytt alltid børste **etter sykdom**. Bakterier og virus kan overleve på børstebustene i flere dager, og reinfeksjon er en reell risiko. Oppbevar børsten stående og luftig — et fuktig børstetopp i lukket etui er ideelt for bakterievekst.",
    ],
  },
  {
    slug: "munnskyll-nar-det-hjelper",
    title: "Munnskyll: når det hjelper og når du kaster bort penger",
    excerpt: "Feil timing kan redusere effekten av tannkremen din. Timing er alt.",
    category: "Tannpleie",
    readTime: "3 min",
    date: "2026-03-12",
    image: "/images/article-mouthwash.jpg",
    content: [
      "Det viktigste mange gjør feil: å bruke munnskyll **rett etter tannpuss**. Fluortannkrem trenger tid til å virke på emaljen, og skylling rett etterpå vasker bort fluoriden. Bruk heller munnskyll på et annet tidspunkt — for eksempel etter lunsj.",
      "## Hvem har nytte av munnskyll?",
      "Munnskyll med fluorid (0,2 % natriumfluorid) gir ekstra beskyttelse for personer med **høy kariesrisiko**, tørr munn eller bøylebehandling. Klorheksidin-baserte munnskyll er effektive mot tannkjøttbetennelse, men bør kun brukes i korte perioder (to til fire uker) da de kan misfarve tennene.",
      "## For de fleste er det unødvendig",
      "For de fleste friske voksne med god munnhygiene er munnskyll **unødvendig**. Det er ingen erstatning for mekanisk rengjøring med børste, tanntråd eller mellomromsbørster. God pusseteknikk med fluortannkrem og daglig tanntråd er fortsatt gullstandarden.",
    ],
  },
  {
    slug: "fluorid-for-voksne",
    title: "Fluorid for voksne — ikke bare barnas greie",
    excerpt: "Emaljen utsettes for syreangrep hele livet, og fluorid er det eneste stoffet som reparerer tidlig skade.",
    category: "Forebygging",
    readTime: "3 min",
    date: "2026-03-16",
    image: "/images/article-fluoride.jpg",
    content: [
      "Fluorid virker på to måter: det styrker emaljen ved å danne **fluorapatitt** (mer syreresistent enn vanlig emalje), og det hemmer bakterienes evne til å produsere syre. Denne beskyttelsen er like viktig for voksne — særlig de med blottlagte tannhalser.",
      "## Hvor mye fluorid trenger du?",
      "I Norge inneholder de fleste tannkremer **1000–1500 ppm fluorid**, tilstrekkelig for daglig bruk. For voksne med forhøyet kariesrisiko kan tannlegen foreskrive tannkrem med **5000 ppm**. Etter tannpuss bør du spytte ut, men ikke skylle munnen med vann.",
      "## Norsk drikkevann og fluoridlakk",
      "Norsk drikkevann inneholder generelt svært lite naturlig fluorid (under 0,1 mg/L de fleste steder), i motsetning til land som tilsetter fluorid i vannforsyningen. Eldre med medisinbruk som gir tørr munn har særlig nytte av **fluoridlakk** hos tannlegen to ganger årlig.",
    ],
  },
  {
    slug: "tanngnissing-og-tannpressing",
    title: "Tanngnissing og tannpressing: den skjulte trusselen",
    excerpt: "Opptil 20 % gnisser tenner uten å vite det. Kreftene kan være ti ganger sterkere enn vanlig tygging.",
    category: "Symptomer",
    readTime: "3 min",
    date: "2026-03-20",
    image: "/images/article-teeth-grinding.jpg",
    content: [
      "**Bruksisme** — tanngnissing og tannpressing — skjer oftest under søvn. Typiske tegn inkluderer flate, nedslitte tyggeflater, sprekker i tennene, spenning i kjevemuskulatur om morgenen, hodepine ved tinningen og økende tannfølsomhet.",
      "## Årsaker og risikofaktorer",
      "Stress er den vanligste utløseren. Andre risikofaktorer er høyt alkoholinntak, koffein på kvelden, søvnapné og visse medisiner som **SSRI-antidepressiva**.",
      "## Behandling med bittskinne",
      "En **bittskinne** (okklusalskinne) fra tannlegen er førstevalget for beskyttelse. Den hindrer ikke gnissingen, men beskytter tennene mot slitasje. Standardskinne fra apotek gir dårlig passform og kan forverre problemet. I tillegg anbefales stressmestring, unngå koffein etter kl. 14, og bevisst avspenning av kjevemusklene gjennom dagen.",
    ],
  },
  {
    slug: "spyttets-superkrefter",
    title: "Spyttets superkrefter: kroppens egen tannbeskyttelse",
    excerpt: "Du produserer opptil 1,5 liter spytt daglig — en av kroppens mest undervurderte forsvarsmekanismer.",
    category: "Forebygging",
    readTime: "3 min",
    date: "2026-03-24",
    image: "/images/article-saliva.jpg",
    content: [
      "Spytt inneholder **kalsium- og fosfationer** som aktivt remineraliserer emaljen etter syreangrep, antibakterielle enzymer som lysozym og laktoferrin, og buffersystemer som nøytraliserer syrer. Uten tilstrekkelig spytt øker kariesrisikoen dramatisk.",
      "## Tørr munn er vanligere enn du tror",
      "**Tørr munn** (xerostomi) rammer 20–30 % av den voksne befolkningen og er en vanlig bivirkning av over 500 ulike medikamenter, inkludert blodtrykksmedisin, antidepressiva og antihistaminer. I Norge, der medisinbruk blant eldre er høyt, er dette et betydelig tannhelseproblem.",
      "## Slik stimulerer du spyttproduksjonen",
      "For å stimulere spyttproduksjonen: tygg sukkerfri tyggegummi med **xylitol** etter måltider, drikk vann jevnlig, og pust gjennom nesen. Hvis du mistenker tørr munn, snakk med tannlegen — kunstig spytt og spyttstimulerende pastiller kan hjelpe.",
    ],
  },
  {
    slug: "reisekit-for-tennene",
    title: "Reisekit for tennene: smart tannpleie på farten",
    excerpt: "En tannlegetime i utlandet kan koste tusenlapper uten forsikring. Slik pakker du smart.",
    category: "Tannpleie",
    readTime: "2 min",
    date: "2026-03-28",
    image: "/images/article-travel-kit.jpg",
    content: [
      "Et godt reisekit trenger ikke være stort: reise-tannbørste, fluortannkrem i reisestørrelse, tanntråd, sukkerfri tyggegummi med xylitol, og et sett **midlertidig tannfylling** fra apoteket (nyttig hvis en fylling løsner).",
      "## Flyreiser og tannproblemer",
      "Ved flyreiser bør du vite at **kabinettrykk** kan forsterke smerter i tenner med ubehandlede problemer. Plutselig tannverk under flytur kan være tegn på en skjult kavitet.",
      "## Forsikring og akutt hjelp i utlandet",
      "For reiser til utlandet: sjekk at **reiseforsikringen** dekker akutt tannbehandling — mange gjør det ikke. I EU gir Europeisk helsetrygdkort noe dekning. Ha tannlegens kontaktinformasjon med deg, og bruk flaskevann til tannpuss i land med usikkert drikkevann.",
    ],
  },
  {
    slug: "graviditet-og-tannhelse",
    title: "Graviditet og tannhelse",
    excerpt: "«Hvert barn koster en tann» er en myte — men hormoner og morgenkvalmhet påvirker tannhelsen reelt.",
    category: "Livsfaser",
    readTime: "3 min",
    date: "2026-04-01",
    image: "/images/article-dental-anxiety.jpg",
    content: [
      "**Graviditetsgingivitt** rammer opptil 75 % av gravide kvinner. Økte progesteron- og østrogennivåer gjør tannkjøttet mer mottagelig for betennelse, så selv normal mengde plakk kan gi hovne, blødende gummer.",
      "## Morgenkvalmhet og emalje",
      "Morgenkvalmhet med hyppig oppkast eksponerer tennene for magesyre. **Puss ikke tennene umiddelbart etterpå** — syren har da mykgjort emaljen, og pussing gjør skaden verre. Skyll heller munnen med vann eller en teskje natron utløst i vann, og vent minst 30 minutter.",
      "## Tannlege under svangerskapet",
      "Det er trygt og anbefalt å gå til tannlegen under svangerskapet, spesielt i **andre trimester**. Ubehandlet tannkjøttsykdom er knyttet til økt risiko for prematur fødsel. Gravide kan ha rett til HELFO-støtte ved tannkjøttsykdom.",
    ],
  },
  {
    slug: "arstidens-tannhelsetrusler",
    title: "Årstidens tannhelsetrusler",
    excerpt: "Norsk klima byr på unike utfordringer — fra vinterens tørre luft til sommerens sportsskader.",
    category: "Forebygging",
    readTime: "3 min",
    date: "2026-04-04",
    image: "/images/article-wisdom-teeth.jpg",
    content: [
      "## Vinteren",
      "**Vinteren** betyr kald, tørr luft og oppvarmet innendørsluft. Begge reduserer spyttproduksjonen. Drikk ekstra vann, bruk luftfukter hjemme, og velg sukkerfri pastiller. Kald luft kan utløse ising i ømfintlige tenner — bruk skjerf eller buff over munnen på de kaldeste dagene.",
      "## Allergisesongen",
      "**Allergisesongen** bringer nestetetthet som tvinger mange til munnpusting, noe som tørker ut slimhinnene. Antihistaminer forverrer tørr munn ytterligere. Vurder nesespray som førstevalg fremfor tabletter.",
      "## Sommeren",
      "**Sommeren** gir økt risiko for tannskader under aktiviteter. En tilpasset **tannbeskytter** fra tannlegen koster typisk 1 500–3 000 kr og kan spare deg for behandling til titusenvis. Utslåtte tenner bør legges i melk eller spytt og bringes til tannlege innen 30 minutter.",
    ],
  },
];

/* ── Support Pages (Informasjon sub-pages) ── */

export interface SupportPage {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  hubSummary: string;
  metaDescription: string;
  heroSubtitle: string;
  intro: string[];
  sections: {
    heading: string;
    content: string[];
  }[];
  practicalSteps?: {
    title: string;
    steps: string[];
  };
  externalLinks: {
    label: string;
    href: string;
  }[];
  relatedSlugs: string[];
}

export const supportPages: SupportPage[] = [
  {
    slug: "barn",
    title: "Gratis tannlege for barn og ungdom",
    shortTitle: "Barn og ungdom",
    badge: "Gratis",
    hubSummary:
      "Alle barn og ungdom fra 0 til 18 år har rett på gratis tannbehandling gjennom den offentlige tannhelsetjenesten. Du trenger ikke gjøre noe — innkallingen kommer automatisk.",
    metaDescription:
      "Alt om gratis tannbehandling for barn og ungdom 0-18 år i Norge. Automatisk innkalling, hva som dekkes, tannregulering og akutt hjelp.",
    heroSubtitle: "0–18 år",
    intro: [
      "Alle barn og ungdom har gratis tannbehandling til fylte 18 år. Det skjer gjennom den offentlige tannhelsetjenesten, og det beste er: du trenger ikke gjøre noe. Barnet ditt blir kalt inn automatisk.",
      "Her har vi samlet alt du trenger å vite om tannhelsetilbudet for de yngste. Fra første tann til russetiden.",
    ],
    sections: [
      {
        heading: "Slik fungerer det",
        content: [
          "Den offentlige tannhelsetjenesten i Innlandet sender innkalling til alle barn i fylket. Det starter vanligvis rundt **3-årsalderen**, og deretter kalles barnet inn med jevne mellomrom — som regel hvert eller annethvert år, avhengig av tannhelsen.",
          "Alle undersøkelser, fyllinger, tannrens og annen nødvendig behandling er **helt gratis**. Du betaler ingenting. Dette gjelder også akutt behandling dersom barnet slår ut en tann eller får plutselig tannpine.",
          "Hvis dere flytter til et nytt sted i Norge, blir barnet automatisk overført til tannklinikken i det nye området. Du trenger ikke melde fra selv — det skjer via folkeregisteret.",
        ],
      },
      {
        heading: "Hva dekkes — og hva dekkes ikke?",
        content: [
          "Kort sagt dekkes **all vanlig tannbehandling**. Det betyr undersøkelser, røntgen, fyllinger, trekking av tenner, rotbehandling, akuttbehandling og forebyggende tiltak som fluorlakkering.",
          "Det eneste som ikke er inkludert i gratistilbudet er **tannregulering** (kjeveortopedi). Men her finnes det egne ordninger:",
          "- Barn og ungdom opptil 20 år kan få mellom **40 og 100 prosent** av kostnadene dekket gjennom HELFO\n- Hvor mye som dekkes avhenger av hvor stort behovet er — tannlegen vurderer dette\n- Det er tannlegen som sender søknaden til HELFO, du trenger ikke gjøre det selv\n- Kosmetisk tannregulering (ren estetikk uten medisinsk grunn) dekkes vanligvis ikke",
        ],
      },
      {
        heading: "Akutt tannhjelp for barn",
        content: [
          "Barn og ungdom har rett på **akutt hjelp** uansett hvor i landet de befinner seg. Hvis barnet ditt slår ut en tann på fotballtrening eller får kraftig tannpine en lørdag kveld, ring tannlegevakten i ditt område.",
          "I Innlandet kan du ringe den offentlige tannklinikken på dagtid. Utenfor åpningstid finnes det legevakt som kan hjelpe med smertestillende og henvise videre.",
          "**Tips ved tannulykke:** Hvis en permanent tann slås helt ut, legg tannen i melk eller saltvann og kom dere til tannlege innen 30 minutter. Jo raskere, desto bedre sjanse for å redde tannen.",
        ],
      },
      {
        heading: "Vanlige spørsmål",
        content: [
          "**Hva skjer etter fylte 18?** Da er du ikke lenger dekket av gratisordningen, men du går over til ordningen for unge voksne (19–28 år) med 75 % rabatt.",
          "**Barnet mitt har ikke fått innkalling — hva gjør jeg?** Ring den offentlige tannklinikken i kommunen din. Noen ganger kan innkallingen bli forsinket, spesielt ved flytting.",
          "**Kan vi velge privat tannlege i stedet?** Ja, men da må du betale selv. Gratisordningen gjelder kun den offentlige tannhelsetjenesten.",
          "**Gjelder dette også barn som ikke er norske statsborgere?** Ja, alle barn med lovlig opphold i Norge har rett på gratis tannbehandling.",
        ],
      },
    ],
    practicalSteps: {
      title: "Sjekkliste for foreldre",
      steps: [
        "Barnet kalles inn automatisk — du trenger bare å møte opp til avtalt tid",
        "Sjekk postkassen (eller Digipost) for innkalling fra tannklinikken",
        "Ved tannulykke: ring tannklinikken eller legevakten umiddelbart",
        "Husk at tannregulering krever egen søknad — snakk med tannlegen",
        "Etter 18 år: ta kontakt med offentlig tannklinikk for å få rabattordningen",
      ],
    },
    externalLinks: [
      { label: "Helsenorge — Tannhelse for barn og unge", href: "https://www.helsenorge.no/tannhelse/tannhelse-for-barn-og-unge/" },
      { label: "Innlandet fylkeskommune — Tannhelse", href: "https://innlandetfylke.no/tjenester/tannhelse/" },
      { label: "HELFO — Stønad til tannregulering", href: "https://www.helfo.no/regelverk-og-takster/stonad-til-tannbehandling" },
    ],
    relatedSlugs: ["unge-voksne", "helfo", "frikort"],
  },
  {
    slug: "unge-voksne",
    title: "Billigere tannlege for unge voksne (19–28 år)",
    shortTitle: "Unge voksne",
    badge: "75 % rabatt",
    hubSummary:
      "Er du mellom 19 og 28 år? Da betaler du bare 25 % av kostnaden hos offentlig tannklinikk. En stor fordel mange ikke vet om.",
    metaDescription:
      "Unge voksne 19-28 år betaler kun 25% egenandel for tannbehandling hos offentlig tannklinikk. Slik får du rabatten.",
    heroSubtitle: "19–28 år",
    intro: [
      "Visste du at du som ung voksen betaler bare en fjerdedel av prisen hos den offentlige tannklinikken? Mange vet ikke om denne ordningen, og ender opp med å betale full pris hos privat tannlege uten grunn.",
      "Fra det kalenderåret du fyller 19 til og med det kalenderåret du fyller 28, har du rett på **75 prosent rabatt** på tannbehandling. Men det er én viktig ting å vite: du må ta kontakt selv.",
    ],
    sections: [
      {
        heading: "Slik fungerer rabatten",
        content: [
          "I motsetning til barneordningen, der du blir kalt inn automatisk, må du som ung voksen **selv ta kontakt** med den offentlige tannklinikken i fylket ditt. Du ringer, bestiller time, og får behandling til sterkt redusert pris.",
          "Du betaler kun **25 prosent egenandel** basert på offentlige takster. Resten dekker fylkeskommunen. Så hvis en behandling normalt koster 2000 kroner, betaler du bare 500.",
          "Ordningen gjelder ved offentlige tannklinikker. Velger du privat tannlege, må du betale full pris selv. I Innlandet har de fleste kommuner en offentlig tannklinikk du kan bruke.",
        ],
      },
      {
        heading: "Hva dekkes?",
        content: [
          "De fleste vanlige behandlinger er inkludert i rabattordningen:",
          "- Undersøkelse og røntgen\n- Fyllinger og reparasjoner\n- Tannrens og forebyggende behandling\n- Rotbehandling\n- Trekking av tenner\n- Akutt behandling ved smerter eller skader",
          "**Hva er ikke dekket?** Rent kosmetiske behandlinger som tannbleking og estetiske fasetter dekkes vanligvis ikke. Tannregulering har egne regler gjennom HELFO.",
        ],
      },
      {
        heading: "Student i en annen by?",
        content: [
          "Studerer du i Oslo, men er registrert i Ringebu? Ingen problem. Du kan bruke den offentlige tannklinikken **der du studerer**, uansett hvor du er folkeregistrert.",
          "Ring tannklinikken i kommunen du bor i og fortell at du er ung voksen med rett på subsidiert behandling. De ordner resten.",
          "**Tips:** Bestill time i god tid, spesielt ved semesterstart. Offentlige klinikker kan ha ventetid.",
        ],
      },
      {
        heading: "Vanlige spørsmål",
        content: [
          "**Må jeg bevise alderen min?** Nei, tannklinikken sjekker dette mot folkeregisteret.",
          "**Hva skjer når jeg fyller 29?** Da mister du rabatten og betaler full pris. Men du kan fortsatt ha rett på HELFO-stønad dersom du har visse diagnoser.",
          "**Gjelder rabatten for alle i denne aldersgruppen?** Ja, det er ingen inntektskrav. Alle mellom 19 og 28 år med lovlig opphold i Norge har rett på dette.",
          "**Kan jeg kombinere med HELFO-stønad?** Ja, dersom du har en tilstand som kvalifiserer for HELFO-refusjon, kan du i tillegg ha rett på stønad. Snakk med tannlegen om dette.",
        ],
      },
    ],
    practicalSteps: {
      title: "Slik får du rabatten",
      steps: [
        "Finn din nærmeste offentlige tannklinikk — sjekk innlandetfylke.no",
        "Ring og bestill time. Si at du er ung voksen med rett på rabatt",
        "Møt opp med legitimasjon (for eksempel bankkort eller pass)",
        "Du betaler bare 25 % av behandlingen — det trekkes automatisk",
        "Bestill neste kontroll før du går, så slipper du å huske på det selv",
      ],
    },
    externalLinks: [
      { label: "Helsenorge — Tannbehandling for unge voksne", href: "https://www.helsenorge.no/tannhelse/tannhelse-for-barn-og-unge/" },
      { label: "Innlandet fylkeskommune — Bestill time", href: "https://innlandetfylke.no/tjenester/tannhelse/" },
    ],
    relatedSlugs: ["barn", "helfo", "nav"],
  },
  {
    slug: "helfo",
    title: "HELFO-stønad: Når folketrygden dekker tannlegen",
    shortTitle: "HELFO-stønad",
    badge: "Refusjon",
    hubSummary:
      "Har du periodontitt, munntørrhet eller andre bestemte diagnoser? Da kan du få deler av tannlegeregningen dekket av HELFO.",
    metaDescription:
      "HELFO dekker tannbehandling ved 15 bestemte tilstander. Finn ut om du kvalifiserer for stønad og hvordan søknadsprosessen fungerer.",
    heroSubtitle: "Folketrygden",
    intro: [
      "I Norge er tannbehandling for voksne som regel noe du betaler selv. Men det finnes unntak. Har du en av **15 bestemte tilstander**, kan du få hele eller deler av kostnaden dekket gjennom folketrygden — det vi kaller HELFO-stønad.",
      "Du trenger ikke søke selv. Det er tannlegen din som vurderer om du kvalifiserer, og som sender kravet til HELFO. Men det er lurt å vite hva du kan ha rett på.",
    ],
    sections: [
      {
        heading: "De vanligste tilstandene som dekkes",
        content: [
          "HELFO har 15 ulike innslagspunkter for tannbehandling. Her er de du mest sannsynlig kommer borti:",
          "- **Periodontitt** (tannkjøttsykdom) — Den vanligste grunnen til HELFO-stønad. Gjelder systematisk behandling av moderat til alvorlig periodontitt\n- **Munntørrhet** (xerostomi) — Ofte forårsaket av medisiner eller sykdom. Kan gi alvorlige tannproblemer over tid\n- **Tannskader etter ulykke** — Tanntrauma dekkes dersom det skjedde som følge av en ulykke (ikke slitasje)\n- **Tannutviklingsforstyrrelser** — Medfødte tilstander der tennene ikke har utviklet seg normalt\n- **Bittfeil** (bittanomalier) — Alvorlige bittproblemer som påvirker funksjon",
          "Andre tilstander inkluderer: kreft i munnhulen, strålebehandling i hode-/halsområdet, sjeldne medisinske tilstander, nedsatt egenomsorg ved alvorlig sykdom og infeksjonsforebyggende behandling ved organtransplantasjon.",
        ],
      },
      {
        heading: "Hvor mye får du dekket?",
        content: [
          "HELFO refunderer basert på **offentlige takster** (honorartakst). Det betyr at dersom tannlegen din tar mer enn den offentlige taksten, må du betale mellomlegget selv.",
          "Dekningsgraden varierer etter tilstand. For periodontitt dekkes en bestemt andel av systematisk behandling. For tanntrauma etter ulykke kan hele behandlingen dekkes.",
          "**Viktig:** Noen tannleger setter prisene sine lik de offentlige takstene — da slipper du mellomlegg. Spør tannlegen din om dette på forhånd.",
        ],
      },
      {
        heading: "Slik fungerer prosessen",
        content: [
          "Du trenger ikke fylle ut skjemaer eller sende søknad. Slik fungerer det i praksis:",
          "**1.** Tannlegen undersøker deg og vurderer om tilstanden din faller inn under et av HELFO sine 15 innslagspunkter.",
          "**2.** Hvis ja, sender tannlegen kravet elektronisk til HELFO — du trenger ikke gjøre noe.",
          "**3.** HELFO-stønaden trekkes fra regningen din direkte. Du betaler bare egenandelen.",
          "For noen tilstander kan det kreves **dokumentasjon fra lege** (legeerklæring). Tannlegen din forteller deg om dette er nødvendig.",
        ],
      },
      {
        heading: "Vanlige spørsmål",
        content: [
          "**Kan jeg bruke hvilken som helst tannlege?** Ja, HELFO-stønad gjelder hos alle tannleger som er registrert hos HELFO — både offentlige og private.",
          "**Gjelder det for vanlige hull og fyllinger?** Nei, vanlig karies og rutinemessig tannbehandling dekkes ikke. Det må være en av de 15 spesifikke tilstandene.",
          "**Hva om tannlegen min ikke nevner HELFO?** Spør! Noen ganger er det pasienten som må ta opp spørsmålet. En god tannlege vil alltid vurdere dette.",
          "**Kan HELFO-stønad kombineres med andre ordninger?** Ja, for eksempel med frikort dersom du har egenandeler som teller mot egenandelstaket.",
        ],
      },
    ],
    externalLinks: [
      { label: "HELFO — Stønad til tannbehandling", href: "https://www.helfo.no/regelverk-og-takster/stonad-til-tannbehandling" },
      { label: "Helsenorge — Rettigheter hos tannlegen", href: "https://www.helsenorge.no/tannhelse/rettigheter-hos-tannlegen/" },
      { label: "HELFO — Takster og regelverk", href: "https://www.helfo.no/regelverk-og-takster" },
    ],
    relatedSlugs: ["frikort", "nav", "unge-voksne"],
  },
  {
    slug: "frikort",
    title: "Frikort: Slik fungerer egenandelstaket",
    shortTitle: "Frikort",
    badge: "kr 3 278",
    hubSummary:
      "Når du har betalt nok i egenandeler i løpet av et år, får du frikort automatisk. Men for tannbehandling er det litt spesielt — her forklarer vi.",
    metaDescription:
      "Frikort for helsetjenester: Egenandelstak på kr 3 278, hva som teller for tannbehandling, og hvordan du sjekker saldoen din.",
    heroSubtitle: "Egenandelstak",
    intro: [
      "Frikort er en ordning som beskytter deg mot å bruke for mye penger på helsetjenester i løpet av et år. Når du har betalt over et visst beløp i **godkjente egenandeler**, får du frikort — og da slipper du å betale mer resten av året.",
      "Men her er haken: for tannbehandling er det bare **noen helt bestemte egenandeler** som teller. La oss rydde opp i hva som gjelder.",
    ],
    sections: [
      {
        heading: "Egenandelstaket i 2025",
        content: [
          "I 2025 er egenandelstaket på **kr 3 278**. Når du har betalt dette beløpet i godkjente egenandeler, får du frikort automatisk. Du trenger ikke søke om det.",
          "Frikortet gjelder for resten av kalenderåret. Fra 1. januar neste år starter tellingen på nytt.",
          "Du får vanligvis frikortet i posten (eller digitalt via Helsenorge) innen **tre uker** etter at du har nådd grensen.",
        ],
      },
      {
        heading: "Hva teller for tannbehandling?",
        content: [
          "Her er det viktig å vite: **vanlige tannlegebesøk teller ikke** mot frikortet. Det er bare egenandeler knyttet til to spesifikke HELFO-punkter som teller:",
          "- **Punkt 5:** Sykdom i kjeveledd og kjeveleddmuskulatur (TMD/kjeveproblemer)\n- **Punkt 6:** Periodontitt (tannkjøttsykdom) — systematisk behandling",
          "Så dersom du betaler for vanlige fyllinger, tannrens eller undersøkelser, teller det **ikke** mot frikortet. Men har du periodontitt-behandling med egenandel, teller den med — sammen med andre helseegenandeler som legebesøk og medisiner.",
        ],
      },
      {
        heading: "Sjekk hvor mye du har betalt",
        content: [
          "Du kan til enhver tid sjekke hvor mye du har betalt i egenandeler på **helsenorge.no**. Logg inn og gå til «Egenandeler». Der ser du en oversikt over alle registrerte egenandeler og hvor langt du er fra frikortet.",
          "Hvis du mener det mangler egenandeler i oversikten, kan du kontakte HELFO på telefon 23 32 70 00. Noen ganger tar det litt tid før egenandeler fra tannlegen registreres i systemet.",
        ],
      },
      {
        heading: "Vanlige spørsmål",
        content: [
          "**Teller tannlegeregningen min mot frikortet?** Bare dersom du har behandling under HELFO punkt 5 eller 6. Vanlig tannbehandling teller ikke.",
          "**Jeg har fått frikort — slipper jeg å betale hos tannlegen?** Frikortet gjelder kun for egenandeler som teller mot taket. Vanlige tannlegekostnader må du fortsatt betale.",
          "**Teller egenandeler fra andre helsetjenester?** Ja! Egenandeler fra fastlege, poliklinikk, psykolog, røntgen og medisiner på blå resept teller alle mot samme tak.",
          "**Hva om jeg betaler for mye etter at jeg har nådd taket?** Du kan søke HELFO om refusjon av egenandeler betalt etter at du nådde grensen.",
        ],
      },
    ],
    externalLinks: [
      { label: "Helsenorge — Frikort for helsetjenester", href: "https://www.helsenorge.no/betaling-for-helsetjenester/frikort-for-helsetjenester/" },
      { label: "Helsenorge — Sjekk egenandeler", href: "https://www.helsenorge.no/betaling-for-helsetjenester/betalt-egenandel/" },
      { label: "HELFO — Kontakt", href: "https://www.helfo.no/kontakt-oss" },
    ],
    relatedSlugs: ["helfo", "nav", "eldre"],
  },
  {
    slug: "nav",
    title: "NAV og tannbehandling: Økonomisk støtte når du trenger det",
    shortTitle: "NAV sosialhjelp",
    badge: "Behovsprøvd",
    hubSummary:
      "Har du ikke råd til tannlegen? NAV kan dekke nødvendig tannbehandling gjennom økonomisk sosialhjelp. Men du må søke før du starter behandlingen.",
    metaDescription:
      "Slik søker du NAV om økonomisk sosialhjelp til tannbehandling. Dokumentasjon, prosess, behandlingstid og tips for en god søknad.",
    heroSubtitle: "Økonomisk støtte",
    intro: [
      "Tannbehandling kan bli dyrt, og ikke alle har råd til det. Hvis du sliter økonomisk og trenger tannlegehjelp, kan NAV gi deg støtte gjennom **økonomisk sosialhjelp**. Det er ingen skam i det — ordningen finnes nettopp for å sikre at alle får nødvendig helsehjelp.",
      "Men det er viktig å gjøre ting i riktig rekkefølge. Søk **før** du starter behandlingen, ikke etterpå.",
    ],
    sections: [
      {
        heading: "Hvem kan søke?",
        content: [
          "Økonomisk sosialhjelp til tannbehandling er **behovsprøvd**. Det betyr at NAV vurderer din totale økonomiske situasjon. Du kan søke dersom:",
          "- Du ikke har inntekt eller formue til å dekke behandlingen selv\n- Du ikke kvalifiserer for andre ordninger (HELFO, unge voksne-rabatt, osv.)\n- Du trenger **nødvendig** tannbehandling — ikke kosmetisk\n- Du bor i Norge og har lovlig opphold",
          "NAV skiller mellom nødvendig og ønskelig behandling. Smertebehandling, infeksjoner og grunnleggende tannhelse dekkes. Tannbleking, estetiske inngrep og luksusbehandlinger dekkes ikke.",
        ],
      },
      {
        heading: "Slik søker du — steg for steg",
        content: [
          "**Steg 1: Gå til tannlegen først.** Be om en **skriftlig behandlingsplan med kostnadsoverslag**. Dette dokumentet er helt avgjørende for søknaden din. Tannlegen beskriver hva som trengs og hva det koster.",
          "**Steg 2: Samle dokumentasjon.** NAV vil se på hele din økonomi. Ha klart: siste tre måneders lønnsslipper eller dokumentasjon på trygd/dagpenger, kontoutskrift fra de siste tre månedene, oversikt over faste utgifter (husleie, strøm, forsikring), og behandlingsplanen fra tannlegen.",
          "**Steg 3: Søk hos NAV.** Du kan søke digitalt på nav.no eller ved å møte opp på ditt lokale NAV-kontor. Forklar situasjonen og legg ved dokumentasjonen.",
          "**Steg 4: Vent på svar.** NAV har som mål å behandle søknaden innen **fire uker**. Får du avslag, har du rett til å klage innen tre uker.",
        ],
      },
      {
        heading: "Tips for en god søknad",
        content: [
          "Basert på erfaring er det noen ting som øker sjansen for å få innvilget søknaden:",
          "- **Søk FØR du starter behandlingen.** NAV dekker sjelden behandling som allerede er utført\n- **Få tannlegen til å skrive tydelig** at behandlingen er medisinsk nødvendig, ikke bare ønskelig\n- **Vær ærlig om økonomien din.** NAV sjekker uansett — det lønner seg å være åpen fra start\n- **Sjekk andre ordninger først.** NAV forventer at du har undersøkt om HELFO, frikort eller andre støtteordninger kan hjelpe\n- **Be om rimeligste alternativ.** Hvis det finnes en billigere løsning som er medisinsk forsvarlig, velg den",
        ],
      },
      {
        heading: "Hva om du får avslag?",
        content: [
          "Hvis NAV avslår søknaden din, har du rett til å **klage innen tre uker**. Du kan be om hjelp til å skrive klagen på NAV-kontoret. Du kan også kontakte Pasient- og brukerombudet i fylket ditt for gratis veiledning.",
          "Vanlige grunner til avslag er at inntekten er for høy, at behandlingen vurderes som ikke-nødvendig, eller at dokumentasjonen er mangelfull. Ofte kan et avslag løses ved å sende inn bedre dokumentasjon.",
        ],
      },
    ],
    practicalSteps: {
      title: "Gjør dette før du søker",
      steps: [
        "Be tannlegen om skriftlig behandlingsplan med kostnadsoverslag",
        "Sjekk om du har rett på HELFO-stønad eller andre ordninger først",
        "Samle dokumentasjon: lønnsslipper, kontoutskrift, faste utgifter",
        "Søk på nav.no eller møt opp på ditt lokale NAV-kontor",
        "Ikke start behandlingen før du har fått svar fra NAV",
      ],
    },
    externalLinks: [
      { label: "NAV — Økonomisk sosialhjelp", href: "https://www.nav.no/okonomisk-sosialhjelp" },
      { label: "NAV — Søk om sosialhjelp", href: "https://www.nav.no/sosialhjelp/soknad" },
      { label: "Pasient- og brukerombudet", href: "https://www.pasientogbrukerombudet.no/" },
    ],
    relatedSlugs: ["helfo", "frikort", "eldre"],
  },
  {
    slug: "eldre",
    title: "Gratis tannlege for eldre, syke og uføre",
    shortTitle: "Eldre og uføre",
    badge: "Gratis",
    hubSummary:
      "Bor du på sykehjem eller mottar hjemmesykepleie? Da har du rett på gratis tannbehandling. Det samme gjelder personer med psykisk utviklingshemming.",
    metaDescription:
      "Gratis tannbehandling for eldre på sykehjem, personer med hjemmesykepleie og psykisk utviklingshemmede. Hvem har rett og hvordan fungerer det.",
    heroSubtitle: "Prioriterte grupper",
    intro: [
      "Noen grupper i samfunnet har rett på **gratis tannbehandling** gjennom den offentlige tannhelsetjenesten. Det gjelder blant annet eldre på sykehjem, folk som mottar hjemmesykepleie, og personer med psykisk utviklingshemming.",
      "Tanken er enkel: de som har størst behov og minst mulighet til å ordne det selv, skal få hjelp. Her forklarer vi hvem som har rett på hva.",
    ],
    sections: [
      {
        heading: "Hvem har rett på gratis tannbehandling?",
        content: [
          "Den offentlige tannhelsetjenesten har plikt til å gi gratis behandling til disse gruppene:",
          "- **Beboere på sykehjem** — Alle som bor på sykehjem har automatisk rett på gratis tannbehandling\n- **Mottakere av hjemmesykepleie** — Dersom du mottar hjemmesykepleie minst én gang i uken over en periode på **tre måneder eller mer**\n- **Psykisk utviklingshemmede** — Personer med psykisk utviklingshemming har rett på gratis tannbehandling uavhengig av bosituasjon\n- **Rusavhengige i institusjon** — Personer som mottar rusomsorg i institusjon eller har kommunale tjenester knyttet til rusavhengighet",
          "I tillegg har noen andre grupper rett på gratis eller subsidiert tannbehandling, som tortur- og overgrepsofre og innsatte i fengsel.",
        ],
      },
      {
        heading: "Viktig forskjell: hjemmesykepleie vs. hjemmehjelp",
        content: [
          "Her er det en forskjell mange blander. **Hjemmesykepleie** gir rett til gratis tannlege. **Hjemmehjelp** gjør det ikke.",
          "**Hjemmesykepleie** betyr at du mottar medisinsk hjelp hjemme — som medisinhåndtering, sårstell, injeksjoner eller annen helsefaglig oppfølging. Dette utføres av sykepleiere eller helsefagarbeidere.",
          "**Hjemmehjelp** (praktisk bistand) er hjelp til husarbeid, handling, matlaging og lignende. Dette gir ikke rett til gratis tannbehandling.",
          "Mottar du **begge deler**, er det hjemmesykepleiedelen som utløser retten. Og ordningen varer bare så lenge du mottar hjemmesykepleie — opphører tjenesten, opphører også retten til gratis tannlege.",
        ],
      },
      {
        heading: "Slik fungerer det i praksis",
        content: [
          "Du trenger ikke søke selv. Slik foregår det vanligvis:",
          "**For sykehjemsbeboere:** Kommunen melder deg inn automatisk hos den offentlige tannklinikken. Tannhelsepersonell kommer til sykehjemmet for undersøkelse og behandling.",
          "**For hjemmesykepleiepasienter:** Kommunen skal melde fra til tannhelsetjenesten om at du mottar hjemmesykepleie. Deretter blir du kalt inn til tannklinikken. Hvis dette ikke har skjedd, ta kontakt med kommunen.",
          "**For psykisk utviklingshemmede:** Også her skal kommunen melde inn. Verge eller pårørende kan ta kontakt med den offentlige tannklinikken direkte dersom innkalling uteblir.",
        ],
      },
      {
        heading: "Vanlige spørsmål",
        content: [
          "**Min mor bor på sykehjem og har ikke vært hos tannlegen på lenge — er det normalt?** Nei, alle sykehjemsbeboere skal ha jevnlig tannhelseoppfølging. Ta kontakt med sykehjemmet og den offentlige tannklinikken.",
          "**Jeg har hjemmesykepleie, men bare to ganger i måneden. Har jeg rett?** Ordningen krever vanligvis hjemmesykepleie **minst én gang per uke** over tre måneder. To ganger i måneden er sannsynligvis ikke nok, men snakk med kommunen.",
          "**Kan jeg velge privat tannlege?** Gratisordningen gjelder kun den offentlige tannhelsetjenesten. Velger du privat, betaler du selv.",
          "**Hva dekkes?** All nødvendig tannbehandling — undersøkelse, fyllinger, trekking, proteser og akuttbehandling. Rent kosmetiske inngrep dekkes ikke.",
        ],
      },
    ],
    externalLinks: [
      { label: "Helsenorge — Tannhelse til eldre og uføre", href: "https://www.helsenorge.no/tannhelse/rettigheter-hos-tannlegen/" },
      { label: "Innlandet fylkeskommune — Tannhelse", href: "https://innlandetfylke.no/tjenester/tannhelse/" },
      { label: "Pasient- og brukerombudet", href: "https://www.pasientogbrukerombudet.no/" },
    ],
    relatedSlugs: ["helfo", "frikort", "nav"],
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

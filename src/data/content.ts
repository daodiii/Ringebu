/* ── Symptoms ── */
export const symptoms = [
  {

    title: "Tannpine",
    description: "Vondt i en tann betyr ofte hull, betennelse i tannroten eller en sprekk.",
    severity: "Oppsøk tannlege snarest",
    causes: ["Hull i tannen", "Tannrotinfeksjon", "Sprekk eller brudd", "Slitt tannemalje"],
    whatToDo: "Ta smertestillende og skyll med saltvann. Ring oss så fort du kan.",
  },
  {

    title: "Blødende tannkjøtt",
    description: "Blør det når du pusser eller bruker tanntråd? Det er som regel betennelse.",
    severity: "Bør undersøkes",
    causes: ["Gingivitt", "Periodontitt", "Feil pusseteknikk", "Hormonelle endringer"],
    whatToDo: "Fortsett å pusse, men forsiktig. Bruk tanntråd hver dag. Bestill en undersøkelse.",
  },
  {

    title: "Sensitive tenner",
    description: "Isner det av varmt, kaldt eller søtt? Da er tannhalsen som regel blottlagt.",
    severity: "Vanlig, men bør sjekkes",
    causes: ["Slitt emalje", "Tilbaketrukket tannkjøtt", "Hull", "Nylig tannbehandling"],
    whatToDo: "Bruk tannkrem for sensitive tenner. Hold deg unna det varmeste og kaldeste.",
  },
  {

    title: "Hovne tannkjøtt",
    description: "Hovent tannkjøtt betyr som regel betennelse eller en infeksjon.",
    severity: "Oppsøk tannlege",
    causes: ["Infeksjon", "Periodontitt", "Abscess", "Fastsittende mat"],
    whatToDo: "Skyll med saltvann. La området være i fred. Ring oss.",
  },
  {

    title: "Dårlig ånde",
    description: "Dårlig ånde som ikke gir seg kommer oftest fra bakterier eller sykt tannkjøtt.",
    severity: "Bør undersøkes",
    causes: ["Dårlig munnhygiene", "Tannkjøttsykdom", "Tørr munn", "Matinntak"],
    whatToDo: "Puss tennene og tungen. Bruk tanntråd. Går det ikke over, bestill time.",
  },
  {

    title: "Tannkjøttbetennelse",
    description: "Rødt, hovent og ømt tannkjøtt er ofte starten på noe mer alvorlig.",
    severity: "Bør behandles",
    causes: ["Plakk og tannstein", "Røyking", "Diabetes", "Svakt immunforsvar"],
    whatToDo: "Du trenger tannrens hos oss. Resten er daglig pussing og tanntråd.",
  },
  {

    title: "Løse tenner",
    description: "En tann som har blitt løs eller flyttet seg er et alvorlig tegn.",
    severity: "Haster – oppsøk tannlege",
    causes: ["Avansert periodontitt", "Skade", "Beinsvinn", "Tanngnissing"],
    whatToDo: "Ikke tygg på den tannen. Ring oss med en gang.",
  },
  {

    title: "Kjevesmerter",
    description: "Vondt i kjeven, hodepine eller knepping kommer ofte av at du gnisser tenner.",
    severity: "Bør undersøkes",
    causes: ["Tanngnissing (bruksisme)", "TMJ-lidelse", "Stress", "Feilbitt"],
    whatToDo: "Hold deg unna hard mat og tyggegummi. En bittskinne hjelper mange.",
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
      "Alle barn og ungdom under 18 år får gratis tannbehandling. Du trenger ikke gjøre noe. Innkallingen kommer av seg selv.",
    metaDescription:
      "Gratis tannbehandling for barn og ungdom under 18. Slik fungerer innkallingen, og dette dekkes.",
    heroSubtitle: "0–18 år",
    intro: [
      "Barn og ungdom har gratis tannbehandling til de fyller 18. Det ordnes av den offentlige tannhelsetjenesten. Barnet ditt blir kalt inn automatisk.",
      "Under finner du det du trenger å vite. Fra første tann til russetiden.",
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
      "Er du mellom 19 og 28 år? Da betaler du bare 25 % hos offentlig tannklinikk. Mange vet ikke om dette.",
    metaDescription:
      "Unge voksne 19-28 år betaler kun 25% egenandel for tannbehandling hos offentlig tannklinikk. Slik får du rabatten.",
    heroSubtitle: "19–28 år",
    intro: [
      "Er du mellom 19 og 28? Da betaler du bare en fjerdedel av prisen hos den offentlige tannklinikken. Mange vet ikke om ordningen, og betaler full pris uten grunn.",
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
      "HELFO dekker tannbehandling ved 15 bestemte tilstander. Se om du har rett på stønad, og hvordan du søker.",
    heroSubtitle: "Folketrygden",
    intro: [
      "Voksne betaler som regel tannlegen selv. Men det finnes unntak. Har du en av **15 bestemte tilstander**, dekker folketrygden hele eller deler av regningen. Det kalles HELFO-stønad.",
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
      "Har du betalt nok i egenandeler i løpet av året, får du frikort automatisk. For tannbehandling gjelder egne regler.",
    metaDescription:
      "Frikort for helsetjenester: Egenandelstak på kr 3 278, hva som teller for tannbehandling, og hvordan du sjekker saldoen din.",
    heroSubtitle: "Egenandelstak",
    intro: [
      "Frikort hindrer at du betaler for mye for helsetjenester på ett år. Når du har betalt over et visst beløp i **godkjente egenandeler**, får du frikort. Da betaler du ingenting mer det året.",
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
      "Tannbehandling kan bli dyrt. Sliter du økonomisk, kan NAV dekke det gjennom **økonomisk sosialhjelp**. Det er ingen skam i å søke. Ordningen finnes for at alle skal få hjelp.",
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

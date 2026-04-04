"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronDown,
  Phone,
  ArrowRight,
} from "lucide-react";
import { supportPages } from "@/data/content";

/* ─────────────── Helpers ─────────────── */

function SectionFade({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-600 text-[var(--color-text-primary)]">
        {part.replace(/\*\*/g, "")}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/* ─────────────── Expandable Item Component ─────────────── */

function ExpandableItem({
  title,
  preview,
  content,
  badge,
  index,
  accentColor = "var(--color-accent)",
}: {
  title: string;
  preview: string;
  content: string[];
  badge?: string;
  index: number;
  accentColor?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <SectionFade delay={index * 0.04}>
      <div
        onClick={() => setOpen(!open)}
        className={`
          relative bg-white rounded-2xl border overflow-hidden cursor-pointer
          transition-all duration-300
          ${
            open
              ? "border-[var(--color-accent-light)] shadow-lg shadow-[var(--color-primary)]/5"
              : "border-[var(--color-border)] hover:border-[var(--color-accent-light)] hover:shadow-md hover:shadow-[var(--color-primary)]/3 hover:-translate-y-0.5"
          }
        `}
      >
        {/* Accent bar */}
        <div
          className={`absolute top-0 left-0 w-[3px] h-full rounded-r-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: accentColor }}
        />

        {/* Header */}
        <div className="flex items-center gap-4 p-5 md:p-6">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-600 text-base md:text-base text-[var(--color-primary)] leading-snug">
              {title}
            </h3>
            {!open && (
              <p className="text-xs text-[var(--color-text-muted)] font-sans font-400 mt-0.5 line-clamp-1">
                {preview}
              </p>
            )}
          </div>
          {badge && (
            <span className="hidden sm:inline-block bg-[var(--color-bg-cream)] text-[var(--color-accent)] text-[0.6875rem] font-700 px-2.5 py-1 rounded-lg tracking-wide shrink-0 uppercase">
              {badge}
            </span>
          )}
          <ChevronDown
            className={`size-[18px] text-[var(--color-text-muted)] transition-all duration-300 shrink-0 ${
              open ? "rotate-180 text-[var(--color-accent)]" : ""
            }`}
            strokeWidth={2.5}
          />
        </div>

        {/* Body */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6">
                <div className="border-t border-[var(--color-border)] pt-5 space-y-3">
                  {content.map((paragraph, pi) => (
                    <p
                      key={pi}
                      className="text-sm md:text-sm text-[var(--color-text-secondary)] leading-[1.8] font-sans font-300"
                    >
                      {renderBold(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionFade>
  );
}

/* ─────────────── Section Navigator ─────────────── */

function SectionNav({
  active,
  sections,
}: {
  active: string;
  sections: { id: string; label: string }[];
}) {
  return (
    <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="container-width">
        <nav className="flex gap-1 overflow-x-auto no-scrollbar py-3" aria-label="Seksjon-navigasjon">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`
                px-4 py-2 rounded-lg text-xs font-sans font-500 whitespace-nowrap transition-all duration-200
                ${
                  active === s.id
                    ? "bg-[var(--color-primary)] text-white shadow-sm"
                    : "text-[var(--color-stone-600)] hover:bg-[var(--color-bg-cream)] hover:text-[var(--color-primary)]"
                }
              `}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ─────────────── DATA ─────────────── */

const tipsData = [
  {

    title: "Kaffe, brunost og tennene dine",
    preview: "Nordmenn drikker i snitt 4 kopper kaffe om dagen — men svart kaffe kan faktisk beskytte mot hull.",
    content: [
      "Norge er blant landene med høyest kaffeforbruk per innbygger. Den gode nyheten er at svart kaffe inneholder **polyfenoler** som kan hemme veksten av kariesbakterier. Problemet oppstår når vi tilsetter sukker eller drikker kaffe jevnlig gjennom dagen — da utsettes tennene for et konstant syrepress.",
      "Brunost og andre norske meieriprodukter er gode allierte for tannhelsen. **Kalsium og kasein** i ost nøytraliserer syrer i munnen og styrker emaljen. Et stykke ost etter måltidet er faktisk et av de beste tiltakene du kan gjøre for tennene.",
      "Røykelaks og fet fisk gir **vitamin D**, som er avgjørende for kalsiumopptak og sterke tenner — særlig viktig i den mørke norske vinteren. Unngå derimot hyppig inntak av sure bær, sitrusfrukter og brus mellom måltidene. Hvert syreangrep varer i ca. 30 minutter, så fem kaffepauser med sukker betyr 150 minutter med syreeksponering daglig.",
    ],
  },
  {

    title: "Elektrisk vs. manuell tannbørste",
    preview: "Elektriske børster fjerner opptil 21 % mer plakk, viser studier — men teknikken teller mest.",
    content: [
      "En stor **Cochrane-studie** fant at oscillerende elektriske børster fjerner betydelig mer plakk og reduserer tannkjøttsykdom mer effektivt enn manuelle. Etter tre måneder med bruk var det målbart bedre tannkjøtthelse.",
      "Likevel er en manuell tannbørste brukt korrekt i to minutter med fluortannkrem god nok for de fleste. Elektriske børster har størst fordel for **personer med nedsatt håndmotorikk**, eldre, barn som lærer seg å pusse, og de som pusser for hardt.",
      "Mange pusser i under ett minutt med manuell børste. Elektriske børster med **innebygd timer** sikrer at du faktisk pusser i de anbefalte to minuttene. Trykksensorer kan også forhindre at du skader tannkjøttet. Det viktigste er konsekvent bruk — ikke prislappen.",
    ],
  },
  {

    title: "Når må tannbørsten byttes?",
    preview: "Tre måneder er regelen, men børsten kan være ubrukelig allerede etter seks uker.",
    content: [
      "Tannleger anbefaler å bytte tannbørste eller børstetopp **hver tredje måned**, men dette er et minimumsintervall. Forskning viser at børster med utbøyde og flisete bust fjerner vesentlig mindre plakk enn nye børster.",
      "En enkel test: se på børsten fra siden. Hvis bustene stikker ut forbi børstehodet, er den overmoden. Pusser du hardt eller bruker børsten tre ganger daglig, bør du bytte allerede etter **seks til åtte uker**.",
      "Bytt alltid børste **etter sykdom**. Bakterier og virus kan overleve på børstebustene i flere dager, og reinfeksjon er en reell risiko. Oppbevar børsten stående og luftig — et fuktig børstetopp i lukket etui er ideelt for bakterievekst.",
    ],
  },
  {

    title: "Munnskyll: når det hjelper og når du kaster bort penger",
    preview: "Feil timing kan redusere effekten av tannkremen din. Timing er alt.",
    content: [
      "Det viktigste mange gjør feil: å bruke munnskyll **rett etter tannpuss**. Fluortannkrem trenger tid til å virke på emaljen, og skylling rett etterpå vasker bort fluoriden. Bruk heller munnskyll på et annet tidspunkt — for eksempel etter lunsj.",
      "Munnskyll med fluorid (0,2 % natriumfluorid) gir ekstra beskyttelse for personer med **høy kariesrisiko**, tørr munn eller bøylebehandling. Klorheksidin-baserte munnskyll er effektive mot tannkjøttbetennelse, men bør kun brukes i korte perioder (to til fire uker) da de kan misfarve tennene.",
      "For de fleste friske voksne med god munnhygiene er munnskyll **unødvendig**. Det er ingen erstatning for mekanisk rengjøring med børste, tanntråd eller mellomromsbørster. God pusseteknikk med fluortannkrem og daglig tanntråd er fortsatt gullstandarden.",
    ],
  },
  {

    title: "Fluorid for voksne — ikke bare barnas greie",
    preview: "Emaljen utsettes for syreangrep hele livet, og fluorid er det eneste stoffet som reparerer tidlig skade.",
    content: [
      "Fluorid virker på to måter: det styrker emaljen ved å danne **fluorapatitt** (mer syreresistent enn vanlig emalje), og det hemmer bakterienes evne til å produsere syre. Denne beskyttelsen er like viktig for voksne — særlig de med blottlagte tannhalser.",
      "I Norge inneholder de fleste tannkremer **1000–1500 ppm fluorid**, tilstrekkelig for daglig bruk. For voksne med forhøyet kariesrisiko kan tannlegen foreskrive tannkrem med **5000 ppm**. Etter tannpuss bør du spytte ut, men ikke skylle munnen med vann.",
      "Norsk drikkevann inneholder generelt svært lite naturlig fluorid (under 0,1 mg/L de fleste steder), i motsetning til land som tilsetter fluorid i vannforsyningen. Eldre med medisinbruk som gir tørr munn har særlig nytte av **fluoridlakk** hos tannlegen to ganger årlig.",
    ],
  },
  {

    title: "Tanngnissing og tannpressing: den skjulte trusselen",
    preview: "Opptil 20 % gnisser tenner uten å vite det. Kreftene kan være ti ganger sterkere enn vanlig tygging.",
    content: [
      "**Bruksisme** — tanngnissing og tannpressing — skjer oftest under søvn. Typiske tegn inkluderer flate, nedslitte tyggeflater, sprekker i tennene, spenning i kjevemuskulatur om morgenen, hodepine ved tinningen og økende tannfølsomhet.",
      "Stress er den vanligste utløseren. Andre risikofaktorer er høyt alkoholinntak, koffein på kvelden, søvnapné og visse medisiner som **SSRI-antidepressiva**.",
      "En **bittskinne** (okklusalskinne) fra tannlegen er førstevalget for beskyttelse. Den hindrer ikke gnissingen, men beskytter tennene mot slitasje. Standardskinne fra apotek gir dårlig passform og kan forverre problemet. I tillegg anbefales stressmestring, unngå koffein etter kl. 14, og bevisst avspenning av kjevemusklene gjennom dagen.",
    ],
  },
  {

    title: "Spyttets superkrefter: kroppens egen tannbeskyttelse",
    preview: "Du produserer opptil 1,5 liter spytt daglig — en av kroppens mest undervurderte forsvarsmekanismer.",
    content: [
      "Spytt inneholder **kalsium- og fosfationer** som aktivt remineraliserer emaljen etter syreangrep, antibakterielle enzymer som lysozym og laktoferrin, og buffersystemer som nøytraliserer syrer. Uten tilstrekkelig spytt øker kariesrisikoen dramatisk.",
      "**Tørr munn** (xerostomi) rammer 20–30 % av den voksne befolkningen og er en vanlig bivirkning av over 500 ulike medikamenter, inkludert blodtrykksmedisin, antidepressiva og antihistaminer. I Norge, der medisinbruk blant eldre er høyt, er dette et betydelig tannhelseproblem.",
      "For å stimulere spyttproduksjonen: tygg sukkerfri tyggegummi med **xylitol** etter måltider, drikk vann jevnlig, og pust gjennom nesen. Hvis du mistenker tørr munn, snakk med tannlegen — kunstig spytt og spyttstimulerende pastiller kan hjelpe.",
    ],
  },
  {

    title: "Reisekit for tennene: smart tannpleie på farten",
    preview: "En tannlegetime i utlandet kan koste tusenlapper uten forsikring. Slik pakker du smart.",
    content: [
      "Et godt reisekit trenger ikke være stort: reise-tannbørste, fluortannkrem i reisestørrelse, tanntråd, sukkerfri tyggegummi med xylitol, og et sett **midlertidig tannfylling** fra apoteket (nyttig hvis en fylling løsner).",
      "Ved flyreiser bør du vite at **kabinettrykk** kan forsterke smerter i tenner med ubehandlede problemer. Plutselig tannverk under flytur kan være tegn på en skjult kavitet.",
      "For reiser til utlandet: sjekk at **reiseforsikringen** dekker akutt tannbehandling — mange gjør det ikke. I EU gir Europeisk helsetrygdkort noe dekning. Ha tannlegens kontaktinformasjon med deg, og bruk flaskevann til tannpuss i land med usikkert drikkevann.",
    ],
  },
  {

    title: "Graviditet og tannhelse",
    preview: "«Hvert barn koster en tann» er en myte — men hormoner og morgenkvalmhet påvirker tannhelsen reelt.",
    content: [
      "**Graviditetsgingivitt** rammer opptil 75 % av gravide kvinner. Økte progesteron- og østrogennivåer gjør tannkjøttet mer mottagelig for betennelse, så selv normal mengde plakk kan gi hovne, blødende gummer.",
      "Morgenkvalmhet med hyppig oppkast eksponerer tennene for magesyre. **Puss ikke tennene umiddelbart etterpå** — syren har da mykgjort emaljen, og pussing gjør skaden verre. Skyll heller munnen med vann eller en teskje natron utløst i vann, og vent minst 30 minutter.",
      "Det er trygt og anbefalt å gå til tannlegen under svangerskapet, spesielt i **andre trimester**. Ubehandlet tannkjøttsykdom er knyttet til økt risiko for prematur fødsel. Gravide kan ha rett til HELFO-støtte ved tannkjøttsykdom.",
    ],
  },
  {

    title: "Årstidens tannhelsetrusler",
    preview: "Norsk klima byr på unike utfordringer — fra vinterens tørre luft til sommerens sportsskader.",
    content: [
      "**Vinteren** betyr kald, tørr luft og oppvarmet innendørsluft. Begge reduserer spyttproduksjonen. Drikk ekstra vann, bruk luftfukter hjemme, og velg sukkerfri pastiller. Kald luft kan utløse ising i ømfintlige tenner — bruk skjerf eller buff over munnen på de kaldeste dagene.",
      "**Allergisesongen** bringer nestetetthet som tvinger mange til munnpusting, noe som tørker ut slimhinnene. Antihistaminer forverrer tørr munn ytterligere. Vurder nesespray som førstevalg fremfor tabletter.",
      "**Sommeren** gir økt risiko for tannskader under aktiviteter. En tilpasset **tannbeskytter** fra tannlegen koster typisk 1 500–3 000 kr og kan spare deg for behandling til titusenvis. Utslåtte tenner bør legges i melk eller spytt og bringes til tannlege innen 30 minutter.",
    ],
  },
];

const symptomsData = [
  {

    title: "Tannpine",
    preview: "Typen smerte avslører ofte hva som er galt — skarp, bankende eller verkende har ulike årsaker.",
    badge: "Oppsøk snarest",
    content: [
      "Tannpine kan oppleves svært forskjellig. En **skarp, stikkende smerte** ved biting tyder ofte på sprekk eller løst fyllingsmateriale. **Dunkende, bankende smerte** som forverres om natten er et klassisk tegn på pulpitt — betennelse i tannens nerve — og kan indikere abscess.",
      "Vanlige årsaker inkluderer karies, tannkjøttsykdom, eksponert tannhals, sprekker i emaljen og visdomstenner. Mindre kjente årsaker er sinusitt (smerter i overkjevens tenner) og bruksisme som overbelaster tennene.",
      "Hjemme kan du ta **ibuprofen** (demper også betennelse) og skylle med lunken saltvannsløsning. Oppsøk tannlege innen ett til to dager ved moderat smerte, og ring akuttvakt ved feber, ansiktshevelse eller pustevansker.",
    ],
  },
  {

    title: "Blødende tannkjøtt",
    preview: "Tannkjøtt som blør regelmessig er kroppens advarsel om betennelse under overflaten.",
    badge: "Bør undersøkes",
    content: [
      "Blødning utelukkende ved tannpuss skyldes ofte plakk som irriterer tannkjøttranden — typisk begynnende **gingivitt**. Spontan blødning uten fysisk berøring kan indikere **periodontitt**, der betennelsen har nådd dypere vev.",
      "Andre årsaker inkluderer hormonelle svingninger (graviditet, pubertet), blodfortynnende medisiner, vitamin C-mangel og for hard pusseteknikk. Fargen på blodet har betydning: lyst rødt er vanligvis mindre alvorlig enn mørkt eller brunaktig.",
      "Fortsett å pusse forsiktig og bruk tanntråd — **selv om det blør**. Saltvannsløsning kan roe betennelsen. Bestill tannlegetime dersom blødningen vedvarer mer enn to uker. Gingivitt er fullstendig reversibel med riktig behandling.",
    ],
  },
  {

    title: "Sensitive tenner",
    preview: "Den plutselige isen gjennom tannen — dentinhypersensitivitet rammer opptil 30 % av oss.",
    badge: "Vanlig tilstand",
    content: [
      "**Dentinhypersensitivitet** kjennetegnes av kort, skarp smerte ved varme, kulde, søt mat eller til og med kald luft. Tilstanden skyldes at dentinet under emaljen blir eksponert gjennom slitasje, syreskader eller tilbaketrukket tannkjøtt.",
      "Hovedårsakene er for hard børsting, syreholdig mat og drikke, reflukssykdom (GERD), bruksisme og nylig tannbleking. Dersom smerten vedvarer i sekunder eller minutter, kan årsaken være mer alvorlig — som karies eller nerveinfeksjon.",
      "Bytt til tannkrem for sensitive tenner med **kaliumnitrat eller tinnfluorid**. Bruk myk tannbørste og vent 30 minutter med å pusse etter syreholdig mat. Oppsøk tannlege dersom følsomheten er ny, vedvarer over uker eller er lokalisert til én tann.",
    ],
  },
  {

    title: "Hovne tannkjøtt",
    preview: "Om hevelsen er lokal eller spredt gir viktig informasjon om årsaken — fra matbit til infeksjon.",
    badge: "Oppsøk tannlege",
    content: [
      "**Lokalisert hevelse** rundt én tann skyldes ofte abscess, fastsittende matrester, visdomstann som bryter gjennom, eller irritasjon fra fyllingsrand. En abscess gir vanligvis intens, bankende smerte og kan inneholde puss.",
      "**Generalisert hevelse** langs store deler av tannkjøttet peker mot gingivitt, periodontitt, hormonelle endringer, medikamentbivirkninger (kalsiumkanalblokkere, antiepileptika), vitamin C-mangel eller ukontrollert diabetes.",
      "Skyll med lunken saltvannsløsning to til tre ganger daglig. Oppsøk tannlege raskt ved lokalisert hevelse som ikke avtar, og umiddelbart dersom du har feber, utbredt hevelse eller puss.",
    ],
  },
  {

    title: "Dårlig ånde (halitose)",
    preview: "Vedvarende dårlig ånde handler ofte om mer enn tannpuss — bakterier, tørr munn og mageproblemer kan ligge bak.",
    badge: "Bør undersøkes",
    content: [
      "I ca. 85 % av tilfellene stammer lukten fra munnhulen. Hovedkilden er **anaerobe bakterier** som bryter ned proteiner på tungens bakre del og i tannkjøttlommer, og produserer flyktige svovelgasser.",
      "Tørr munn (xerostomi) reduserer spyttets rensefunksjon. Andre årsaker utenfor munnen: **GERD** (magesyre), infeksjoner i nese/bihuler, ukontrollert diabetes (acetonlukt) og nyresykdom (ammoniakklukt).",
      "Puss **tungen grundig** daglig med tannbørsten eller en tungeskrape. Bruk tanntråd og drikk nok vann. Oppsøk tannlege dersom problemet vedvarer i mer enn to til tre uker til tross for god hygiene.",
    ],
  },
  {

    title: "Kjevesmerter",
    preview: "Smerter i kjeven, knepping og morgenstivhet — fra nattlig tanngnissing til stressrelaterte spenninger.",
    badge: "Bør undersøkes",
    content: [
      "**Bruksisme** — ufrivillig tanngnissing — er en vanlig årsak. Den forekommer oftest under søvn og er sterkt assosiert med stress, angst og søvnforstyrrelser. Kan slite ned tennene og gi hodepine fra tinningene.",
      "**Temporomandibulær dysfunksjon (TMD)** rammer kjeveleddet og kan gi knepping, klikking eller låsing. Feilbitt, artrose og traumer er andre mulige årsaker.",
      "Legg varm klut mot kjeven, spis myk mat og unngå tyggegummi. Oppsøk tannlege dersom smertene vedvarer over en uke. En tilpasset **bittskinne** for natten kan være aktuelt, eventuelt henvisning til fysioterapeut.",
    ],
  },
  {

    title: "Løse tenner hos voksne",
    preview: "En tann som beveger seg hos en voksen er alltid et alvorlig signal som krever rask undersøkelse.",
    badge: "Haster",
    content: [
      "Den vanligste årsaken er avansert **periodontitt**. Bakterier i dype tannkjøttlommer bryter ned knokkelen som forankrer tannen — ofte smertefritt i tidlige stadier. Andre årsaker: traume, bruksisme, osteoporose og i sjeldne tilfeller svulster.",
      "Situasjonen er akutt dersom tannen plutselig er blitt løs etter slag, det er puss eller feber, flere tenner løsner samtidig, eller bittet har endret seg.",
      "Unngå å tygge på tannen og spis myk kost. **Oppsøk tannlege snarest** — helst innen et par dager. Periodontitt som har forårsaket beinsvinn er ikke reversibel, men kan stabiliseres med riktig behandling. Jo tidligere, desto bedre.",
    ],
  },
  {

    title: "Misfarging av tenner",
    preview: "Misfargede tenner kan være overfladisk og enkelt å behandle, eller stamme fra dypere endringer.",
    badge: "Varierer",
    content: [
      "**Ekstrinsisk misfarging** oppstår når fargestoffer fra kaffe, te, rødvin og tobakk avsettes på overflaten. Denne typen er enkel å behandle med profesjonell tannrens eller tannbleking.",
      "**Intrinsisk misfarging** stammer fra endringer inne i tannen: tetracyklinantibiotika under tannutvikling, fluorose, traumer (tannen kan mørkne gradvis), aldring der emaljen tynnes og det gule dentinet skinner mer gjennom, og rotbehandlede tenner.",
      "Forebygg ytre misfarging ved å skylle munnen med vann etter fargesterke drikker. Oppsøk tannlege dersom en enkelt tann **plutselig endrer farge** — det kan tyde på nerveskade. Tannlegen kan tilby bleking, fasetter eller intern bleking av rotfylte tenner.",
    ],
  },
];

const navSections = [
  { id: "tips", label: "Tips & råd" },
  { id: "symptomer", label: "Symptomer" },
  { id: "stotte", label: "Støtte & rettigheter" },
];

/* ─────────────── PAGE ─────────────── */

export default function InformasjonPage() {
  const [activeSection, setActiveSection] = useState("tips");

  // Track scroll for section navigator
  const tipsRef = useRef<HTMLDivElement>(null);
  const symptomerRef = useRef<HTMLDivElement>(null);
  const stotteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [
      { id: "tips", ref: tipsRef },
      { id: "symptomer", ref: symptomerRef },
      { id: "stotte", ref: stotteRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = refs.find((r) => r.ref.current === entry.target);
            if (found) setActiveSection(found.id);
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );

    refs.forEach((r) => {
      if (r.ref.current) observer.observe(r.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-20">
      {/* ── Header ── */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-primary-light)]/15 blur-3xl" />
        </div>
        <div className="container-width text-center relative z-10">
          <span className="text-[var(--color-accent-light)] text-sm font-sans font-600 uppercase tracking-[0.15em] mb-4 block">
            Informasjon & veiledning
          </span>
          <h1 className="heading-display text-white mb-5">
            Informasjon og støtte
          </h1>
          <p className="text-lg text-white/70 font-sans font-300 max-w-2xl mx-auto leading-relaxed">
            Alt du trenger å vite om tannhelse, symptomer og dine rettigheter.
            Praktiske råd og grundig informasjon — skrevet for pasienter, ikke fagfolk.
          </p>
        </div>
      </section>

      {/* ── Section Navigator ── */}
      <SectionNav active={activeSection} sections={navSections} />

      {/* ── Tips & råd ── */}
      <section
        id="tips"
        ref={tipsRef}
        className="py-20 md:py-28 bg-[var(--color-bg-cream)]"
      >
        <div className="container-width">
          <SectionFade>
            <div className="max-w-3xl mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 rounded-full bg-[var(--color-accent)]" />
                <span className="text-[0.6875rem] font-700 uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Tips & råd
                </span>
              </div>
              <h2 className="heading-section text-[var(--color-primary)] mb-4">
                Smarte tannhelsetips
              </h2>
              <p className="text-base text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed max-w-xl">
                Praktiske, forskningsbaserte råd som går utover «puss to ganger
                daglig». Fra norsk kosthold til sesongtilpasset tannpleie.
              </p>
            </div>
          </SectionFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
            {tipsData.map((tip, i) => (
              <ExpandableItem
                key={tip.title}
                title={tip.title}
                preview={tip.preview}
                content={tip.content}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Symptomer ── */}
      <section
        id="symptomer"
        ref={symptomerRef}
        className="py-20 md:py-28 bg-[var(--color-bg-blue)]"
      >
        <div className="container-width">
          <SectionFade>
            <div className="max-w-3xl mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 rounded-full bg-[var(--color-accent)]" />
                <span className="text-[0.6875rem] font-700 uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Symptomer
                </span>
              </div>
              <h2 className="heading-section text-[var(--color-primary)] mb-4">
                Kjenner du igjen dette?
              </h2>
              <p className="text-base text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed max-w-xl">
                Forstå hva kroppen prøver å fortelle deg. Hver type smerte og
                ubehag har en årsak — og jo tidligere du handler, desto enklere
                er løsningen.
              </p>
            </div>
          </SectionFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
            {symptomsData.map((s, i) => (
              <ExpandableItem
                key={s.title}
                title={s.title}
                preview={s.preview}
                content={s.content}
                badge={s.badge}
                index={i}
              />
            ))}
          </div>

          {/* CTA */}
          <SectionFade delay={0.3}>
            <div className="mt-14 max-w-5xl">
              <div className="bg-[var(--color-primary)] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-heading font-600 text-xl text-white mb-2">
                    Bekymret for et symptom?
                  </h3>
                  <p className="text-white/70 font-sans font-300 text-sm">
                    Tidlig behandling er alltid enklere og rimeligere. Ikke vent — ta kontakt.
                  </p>
                </div>
                <a
                  href="tel:61280412"
                  className="btn-primary bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-bg-cream)] px-8 py-4 shrink-0"
                >
                  <Phone className="size-[18px]" />
                  Ring 61 28 04 12
                </a>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── Støtte til tannbehandling ── */}
      <section
        id="stotte"
        ref={stotteRef}
        className="py-20 md:py-28 bg-[var(--color-bg-yellow)]"
      >
        <div className="container-width">
          <SectionFade>
            <div className="max-w-3xl mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 rounded-full bg-[var(--color-accent)]" />
                <span className="text-[0.6875rem] font-700 uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Økonomi & rettigheter
                </span>
              </div>
              <h2 className="heading-section text-[var(--color-primary)] mb-4">
                Støtte til tannbehandling
              </h2>
              <p className="text-base text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed max-w-xl">
                Mange har rett på hel eller delvis dekning av
                tannlegekostnader uten å vite det. Her er en oversikt over
                ordningene som finnes i Norge.
              </p>
            </div>
          </SectionFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {supportPages.map((sp, i) => (
              <SectionFade key={sp.slug} delay={i * 0.06}>
                <Link
                  href={`/informasjon/${sp.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-2xl border border-[var(--color-border)] p-7 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:-translate-y-1 cursor-pointer">
                    <span className="inline-block self-start px-3 py-1 rounded-full bg-[var(--color-bg-cream)] text-[var(--color-accent)] text-xs font-700 font-sans tracking-wide mb-4">
                      {sp.badge}
                    </span>
                    <h3 className="font-heading font-600 text-lg text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                      {sp.shortTitle}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] font-sans font-300 leading-relaxed mb-5 flex-1">
                      {sp.hubSummary}
                    </p>
                    <div className="flex items-center gap-2 text-[var(--color-accent)] font-sans font-500 text-sm group-hover:text-[var(--color-primary)] transition-colors">
                      Les mer
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </SectionFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]" />
        <div className="absolute inset-0">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>
        <div className="relative z-10 container-width py-20 md:py-28 text-center">
          <SectionFade>
            <h2 className="heading-section text-white mb-5">
              Har du spørsmål?
            </h2>
            <p className="text-xl text-white/80 font-sans font-400 leading-relaxed max-w-lg mx-auto mb-10">
              Finner du ikke svar på det du lurer på? Ta kontakt, så hjelper vi
              deg gjerne.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/kontakt"
                className="btn-primary bg-white text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)] px-8 py-4 text-base"
              >
                Kontakt oss
              </Link>
              <a href="tel:61280412" className="btn-secondary text-base px-8 py-4">
                Ring 61 28 04 12
              </a>
            </div>
          </SectionFade>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, Phone, ChevronDown } from "lucide-react";

/* ─────────────── Types ─────────────── */

interface PriceItem {
  name: string;
  description: string;
}

interface Treatment {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  category: string;
  prices: PriceItem[];
  color: string;
  accent: string;
}

/* ─────────────── Data ─────────────── */

const treatments: Treatment[] = [
  {
    title: "Forebyggende Behandling",
    subtitle: "Grunnlaget for god tannhelse",
    description:
      "Regelmessig forebygging holder tennene friske hele livet. Vi undersøker grundig, renser tennene og viser deg hvordan du best tar vare på dem hjemme.",
    features: [
      "Grundig tannundersøkelse med digitalt røntgen",
      "Profesjonell tannrens og polering",
      "Fluorbehandling for sterkere emalje",
      "Individuelle råd for munnhygiene hjemme",
    ],
    category: "Forebyggende",
    prices: [
      { name: "Undersøkelse med rens og kostnadsoverslag", description: "Fullstendig tannhelsesjekk" },
      { name: "Studentrabatt på undersøkelse", description: "Gyldig med studentbevis" },
      { name: "Enkel etterkontroll", description: "Etter kirurgiske inngrep" },
      { name: "Omfattende etterkontroll", description: "Etter oralmedisinske undersøkelser" },
    ],
    color: "#3C2415",
    accent: "#D4B896",
  },
  {
    title: "Bleking",
    subtitle: "Et lysere, hvitere smil",
    description:
      "Få hvitere tenner med profesjonell bleking. Det er trygt, gjør ikke vondt, og resultatet holder lenge.",
    features: [
      "Klinikkbleking med raskt resultat",
      "Hjemmebleking med tilpassede skinner",
      "Skånsom behandling for emaljen",
      "Langvarig og naturlig resultat",
    ],
    category: "Kosmetisk",
    prices: [],
    color: "#1C2A3A",
    accent: "#8AABC4",
  },
  {
    title: "Fyllingsterapi",
    subtitle: "Moderne, usynlige fyllinger",
    description:
      "Fyllinger i tannfargen som fyller hull og gjør tenner hele igjen — du ser ikke forskjellen.",
    features: [
      "Tannfargede komposittfyllinger",
      "Utskifting av gamle amalgamfyllinger",
      "Smertefri behandling med lokalbedøvelse",
      "Holdbare materialer med naturlig utseende",
    ],
    category: "Restaurering",
    prices: [
      { name: "Fylling — liten", description: "Én flate" },
      { name: "Fylling — mellomstor", description: "To flater" },
      { name: "Fylling — stor", description: "Tre eller flere flater" },
    ],
    color: "#2A3A2B",
    accent: "#A0C4A2",
  },
  {
    title: "Kron og Bro",
    subtitle: "Holdbare restaureringer",
    description:
      "Kroner og broer erstatter eller reparerer tenner som er skadet eller borte — og ser helt naturlige ut.",
    features: [
      "Helkeramiske kroner for naturlig utseende",
      "Broer som erstatter manglende tenner",
      "Lang holdbarhet med riktig vedlikehold",
      "Skreddersydd tilpasning til ditt bitt",
    ],
    category: "Restaurering",
    prices: [
      { name: "Fullkrone", description: "Hel krone over tann" },
    ],
    color: "#5A3420",
    accent: "#D4A87C",
  },
  {
    title: "Rotfylling",
    subtitle: "Redd tannen din",
    description:
      "Rotfylling redder tenner som er skadet eller infisert. Det er ikke vondt, og du får beholde tannen.",
    features: [
      "Moderne endodontisk behandling",
      "Smertefri med god bedøvelse",
      "Avansert utstyr for presis behandling",
      "Bevarer din naturlige tann",
    ],
    category: "Restaurering",
    prices: [
      { name: "Rotfylling — 1 rotkanal", description: "Tann med én rotkanal" },
      { name: "Rotfylling — 2 rotkanaler", description: "Tann med to rotkanaler" },
      { name: "Rotfylling — 3–4 rotkanaler", description: "Tann med tre til fire rotkanaler" },
    ],
    color: "#3D1C28",
    accent: "#C48A9C",
  },
  {
    title: "Visdomstennene",
    subtitle: "Vurdering og fjerning",
    description:
      "Vi sjekker om visdomstennene dine trenger å fjernes, og hvis ja — gjør vi det skånsomt.",
    features: [
      "Grundig vurdering med røntgen",
      "Skånsom kirurgisk fjerning",
      "God smertelindring under og etter",
      "Tett oppfølging i etterkant",
    ],
    category: "Kirurgi",
    prices: [
      { name: "Ukomplisert ekstraksjon", description: "Enkel fjerning av tann eller rot" },
      { name: "Kirurgisk fjerning", description: "Fjerning av retinert tann" },
    ],
    color: "#1C3636",
    accent: "#88BFBF",
  },
  {
    title: "Tannkjøtt & Tannstein",
    subtitle: "Friskt tannkjøtt, sterke tenner",
    description:
      "Sunt tannkjøtt er det viktigste for at tennene skal holde lenge. Vi fjerner tannstein og behandler tannkjøttsykdom.",
    features: [
      "Grundig fjerning av tannstein",
      "Behandling av gingivitt og periodontitt",
      "Veiledning i effektiv munnhygiene",
      "Regelmessig oppfølging og vedlikehold",
    ],
    category: "Forebyggende",
    prices: [
      { name: "Periodontal behandling", description: "Behandling av tannkjøttsykdom" },
      { name: "Behandling av periodontitt", description: "Tannkjøttbetennelse" },
      { name: "Fiksering av tenner", description: "Stabilisering av løse tenner" },
    ],
    color: "#33362A",
    accent: "#B0B89A",
  },
  {
    title: "Bittskinner",
    subtitle: "Beskyttelse mot tanngnissing",
    description:
      "Gnisser du tenner om natten? Det sliter dem ned og gir smerter. En bittskinne tilpasset deg beskytter og lindrer.",
    features: [
      "Individuelt tilpassede bittskinner",
      "Beskyttelse mot slitasje",
      "Lindring av kjevesmerter og hodepine",
      "Veiledning om årsaker og forebygging",
    ],
    category: "Spesialbehandling",
    prices: [],
    color: "#2E2038",
    accent: "#B09AC4",
  },
  {
    title: "Tannlegeskrekk",
    subtitle: "Vi forstår deg",
    description:
      "Hos oss møter du et trygt, rolig miljø med ekstra tid og omsorg. Vi tar tannlegeskrekk på alvor.",
    features: [
      "Rolig og trygt behandlingsmiljø",
      "Ekstra tid til å bli kjent og trygg",
      "Skånsomme behandlingsteknikker",
      "Mulighet for pauser underveis",
    ],
    category: "Spesialbehandling",
    prices: [],
    color: "#2A2A30",
    accent: "#A0A0AE",
  },
];

/* ─────────────── Layout Data ─────────────── */

const treatmentImages: Record<string, { src: string; alt: string; objectPosition?: string }> = {
  "Forebyggende Behandling": { src: "/images/clinic-valley.jpg", alt: "Resepsjon med naturkunst på veggen hos Ringebu Tannklinikk", objectPosition: "center 60%" },
  "Fyllingsterapi": { src: "/images/clinic-instruments.jpg", alt: "Moderne tanninstrumenter og digitalt utstyr", objectPosition: "center center" },
  "Visdomstennene": { src: "/images/ringebutannMain.jpg", alt: "Tannlegestol klar for behandling", objectPosition: "center 55%" },
  "Tannlegeskrekk": { src: "/images/clinic-sign.jpg", alt: "Ringebu Tannlegesenter skiltet", objectPosition: "center 40%" },
};

const categories = ["Alle", "Forebyggende", "Kosmetisk", "Restaurering", "Kirurgi", "Spesialbehandling"];

type LayoutItem =
  | { type: "band"; treatmentTitle: string; direction: "left" | "right" }
  | { type: "row"; treatmentTitles: string[] };

const pageLayout: LayoutItem[] = [
  { type: "band", treatmentTitle: "Forebyggende Behandling", direction: "right" },
  { type: "row", treatmentTitles: ["Bleking", "Tannkjøtt & Tannstein"] },
  { type: "band", treatmentTitle: "Fyllingsterapi", direction: "left" },
  { type: "row", treatmentTitles: ["Kron og Bro", "Rotfylling", "Bittskinner"] },
  { type: "band", treatmentTitle: "Visdomstennene", direction: "right" },
  { type: "row", treatmentTitles: [] },
  { type: "band", treatmentTitle: "Tannlegeskrekk", direction: "left" },
];

// Dev-mode validation
if (process.env.NODE_ENV === "development") {
  const allTitles = treatments.map((t) => t.title);
  const layoutTitles = pageLayout.flatMap((item) =>
    item.type === "band" ? [item.treatmentTitle] : item.treatmentTitles
  );
  const missing = allTitles.filter((t) => !layoutTitles.includes(t));
  const extra = layoutTitles.filter((t) => !allTitles.includes(t));
  if (missing.length) console.warn("[behandlinger] Missing from layout:", missing);
  if (extra.length) console.warn("[behandlinger] Not in treatments:", extra);
}

/* ─────────────── Helpers ─────────────── */

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[æ]/g, "ae")
    .replace(/[ø]/g, "o")
    .replace(/[å]/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ─────────────── ExpandedPanel ─────────────── */

function ExpandedPanel({ t, panelId }: { t: Treatment; panelId: string }) {
  return (
    <motion.div
      id={panelId}
      role="region"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden"
    >
        <div className="pt-4 pb-2 space-y-4">
          {/* Features */}
          <ul className="space-y-2">
            {t.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-[0.85rem] font-sans font-400 leading-snug"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0"
                  style={{ backgroundColor: t.accent }}
                />
                <span className="text-white/90">{f}</span>
              </li>
            ))}
          </ul>

          {/* Prices */}
          {t.prices.length > 0 ? (
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: `${t.accent}0D`,
                border: `1px solid ${t.accent}15`,
              }}
            >
              <p
                className="text-[0.6rem] font-sans font-600 uppercase tracking-[0.18em] mb-2.5"
                style={{ color: t.accent }}
              >
                Behandlinger
              </p>
              {t.prices.map((item, idx) => (
                <div
                  key={item.name}
                  className={`py-1.5 ${idx < t.prices.length - 1 ? "border-b" : ""}`}
                  style={{ borderColor: `${t.accent}12` }}
                >
                  <div className="font-sans font-500 text-[0.8rem] text-white">
                    {item.name}
                  </div>
                  <div className="text-[0.72rem] text-white/60 font-sans font-400">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60 text-[0.8rem] font-sans italic">
              Ta kontakt for prisinformasjon
            </p>
          )}
        </div>
      </motion.div>
  );
}

/* ─────────────── CategoryTabs ─────────────── */

function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = categories.indexOf(active);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onChange(categories[(idx + 1) % categories.length]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onChange(categories[(idx - 1 + categories.length) % categories.length]);
      }
    },
    [active, onChange]
  );

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="container-width max-w-[1140px] py-3">
        <div className="relative">
          <div
            role="tablist"
            aria-label="Filtrer behandlinger"
            className="flex gap-1.5 overflow-x-auto scrollbar-hide"
            onKeyDown={handleKeyDown}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                tabIndex={active === cat ? 0 : -1}
                onClick={() => onChange(cat)}
                className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-sans font-500 transition-colors duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                  active === cat
                    ? "text-white"
                    : "bg-[var(--color-bg-cream)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-blue)]"
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
          {/* Fade hint for mobile scroll */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/95 to-transparent pointer-events-none md:hidden" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────── ImageBand ─────────────── */

function ImageBand({
  t,
  direction,
  isExpanded,
  onToggle,
}: {
  t: Treatment;
  direction: "left" | "right";
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const prefersReduced = useReducedMotion();
  const img = treatmentImages[t.title];
  const panelId = `panel-${slugify(t.title)}`;
  const isFirstBand = t.title === "Forebyggende Behandling";

  /* direction = which side the IMAGE is on */
  const imageOnRight = direction === "right";

  return (
    <motion.div
      data-treatment={t.title}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        backgroundColor: t.color,
        scrollMarginTop: "140px",
        boxShadow: `0 4px 20px ${t.color}50`,
      }}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
        if (e.key === "Escape" && isExpanded) {
          e.preventDefault();
          onToggle();
          (e.currentTarget as HTMLElement).focus();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      whileHover={
        prefersReduced || isExpanded
          ? undefined
          : { y: -4, boxShadow: `0 16px 48px ${t.color}65` }
      }
    >
      {/* ── Desktop: split layout ── */}
      <div className="hidden md:grid md:grid-cols-2 md:min-h-[340px]">
        {/* Text side */}
        <div
          className={`relative z-20 flex flex-col justify-center p-8 lg:p-10 ${
            imageOnRight ? "order-1" : "order-2"
          }`}
        >
          <h3 className="font-heading font-700 text-white text-2xl lg:text-3xl leading-tight mb-3">
            {t.title}
          </h3>
          <p className="text-white/85 text-[0.95rem] font-sans font-400 leading-relaxed mb-4 max-w-md">
            {t.description}
          </p>

          {!isExpanded && (
            <div className="flex flex-wrap gap-2 mb-4">
              {t.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="text-[0.7rem] font-sans font-400 px-2.5 py-1 rounded-full text-white/80"
                  style={{ backgroundColor: `${t.accent}20` }}
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-white/60 text-[0.8rem] font-sans">
            <span>{isExpanded ? "Lukk detaljer" : "Se detaljer"}</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>

          <AnimatePresence>
            {isExpanded && <ExpandedPanel t={t} panelId={panelId} />}
          </AnimatePresence>
        </div>

        {/* Image side with gradient blending */}
        <div
          className={`relative overflow-hidden ${
            imageOnRight ? "order-2" : "order-1"
          }`}
        >
          {img && (
            <>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`object-cover transition-transform duration-600 ${
                  !isExpanded ? "group-hover:scale-105" : ""
                }`}
                style={{ objectPosition: img.objectPosition || "center center" }}
                sizes="(max-width: 768px) 100vw, 600px"
                priority={isFirstBand}
              />
              {/* Gradient that blends the image edge into the solid background */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: imageOnRight
                    ? `linear-gradient(to right, ${t.color} 0%, ${t.color}CC 6%, ${t.color}80 14%, ${t.color}33 24%, transparent 40%)`
                    : `linear-gradient(to left, ${t.color} 0%, ${t.color}CC 6%, ${t.color}80 14%, ${t.color}33 24%, transparent 40%)`,
                }}
              />
              {/* Subtle top/bottom vignette for polish */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: `linear-gradient(to bottom, ${t.color}40 0%, transparent 15%, transparent 85%, ${t.color}40 100%)`,
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* ── Mobile: stacked layout (image on top, text below) ── */}
      <div className="md:hidden">
        {/* Image area */}
        {img && (
          <div className="relative h-[220px] overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              style={{ objectPosition: img.objectPosition || "center center" }}
              sizes="100vw"
              priority={isFirstBand}
            />
            {/* Bottom gradient blend into content area */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to top, ${t.color} 5%, ${t.color}CC 18%, ${t.color}66 35%, transparent 60%)`,
              }}
            />
          </div>
        )}

        {/* Text content */}
        <div className="relative z-20 p-6 -mt-8">
          <h3 className="font-heading font-700 text-white text-2xl leading-tight mb-3">
            {t.title}
          </h3>
          <p className="text-white/85 text-[0.95rem] font-sans font-400 leading-relaxed mb-4">
            {t.description}
          </p>

          {!isExpanded && (
            <div className="flex flex-wrap gap-2 mb-4">
              {t.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="text-[0.7rem] font-sans font-400 px-2.5 py-1 rounded-full text-white/80"
                  style={{ backgroundColor: `${t.accent}20` }}
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-white/60 text-[0.8rem] font-sans">
            <span>{isExpanded ? "Lukk detaljer" : "Se detaljer"}</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>

          <AnimatePresence>
            {isExpanded && <ExpandedPanel t={t} panelId={panelId} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── CompactCard ─────────────── */

function CompactCard({
  t,
  isExpanded,
  onToggle,
}: {
  t: Treatment;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const prefersReduced = useReducedMotion();
  const panelId = `panel-${slugify(t.title)}`;

  return (
    <motion.div
      data-treatment={t.title}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl overflow-hidden cursor-pointer border border-transparent transition-all duration-300 group"
      style={{
        backgroundColor: t.color,
        scrollMarginTop: "140px",
        boxShadow: `0 4px 20px ${t.color}50`,
      }}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
        if (e.key === "Escape" && isExpanded) {
          e.preventDefault();
          onToggle();
          (e.currentTarget as HTMLElement).focus();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      whileHover={
        prefersReduced || isExpanded
          ? undefined
          : {
              y: -4,
              boxShadow: `0 16px 48px ${t.color}65`,
              borderColor: `${t.accent}40`,
            }
      }
    >
      <div className="p-5 md:p-6">
        <h3 className="font-heading font-700 text-white text-xl md:text-2xl leading-tight mb-3">
          {t.title}
        </h3>

        {/* Expand indicator */}
        <div className="flex items-center gap-2 text-white/60 text-[0.75rem] font-sans">
          <span>{isExpanded ? "Lukk detaljer" : "Se detaljer"}</span>
          <ChevronDown
            className={`size-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>

        {/* Expanded panel */}
        <AnimatePresence>
          {isExpanded && <ExpandedPanel t={t} panelId={panelId} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────── EditorialLayout ─────────────── */

function EditorialLayout({
  expandedId,
  onToggle,
}: {
  expandedId: string | null;
  onToggle: (title: string) => void;
}) {
  return (
    <div className="space-y-4">
      {pageLayout.map((item, idx) => {
        if (item.type === "band") {
          const t = treatments.find((tr) => tr.title === item.treatmentTitle);
          if (!t) return null;
          return (
            <ImageBand
              key={t.title}
              t={t}
              direction={item.direction}
              isExpanded={expandedId === t.title}
              onToggle={() => onToggle(t.title)}
            />
          );
        }

        // Row of compact cards
        const rowTreatments = item.treatmentTitles
          .map((title) => treatments.find((tr) => tr.title === title))
          .filter(Boolean) as Treatment[];

        if (rowTreatments.length === 0) return null;

        const isSingle = rowTreatments.length === 1;

        return (
          <div
            key={`row-${idx}`}
            className={`flex flex-col md:flex-row md:items-start gap-4 ${isSingle ? "md:justify-center" : ""}`}
          >
            {rowTreatments.map((t) => (
              <div key={t.title} className={`flex-1 ${isSingle ? "md:w-1/2 md:flex-initial" : ""}`}>
                <CompactCard
                  t={t}
                  isExpanded={expandedId === t.title}
                  onToggle={() => onToggle(t.title)}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────── FilteredGrid ─────────────── */

function FilteredGrid({
  activeCategory,
  expandedId,
  onToggle,
}: {
  activeCategory: string;
  expandedId: string | null;
  onToggle: (title: string) => void;
}) {
  const filtered = treatments.filter((t) => t.category === activeCategory);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filtered.map((t) => (
          <CompactCard
            key={t.title}
            t={t}
            isExpanded={expandedId === t.title}
            onToggle={() => onToggle(t.title)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────── Page ─────────────── */

export default function Behandlinger() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setExpandedId(null);
  }, []);

  const handleToggle = useCallback(
    (title: string) => {
      setExpandedId((prev) => (prev === title ? null : title));
    },
    []
  );

  // Auto-scroll to expanded treatment
  useEffect(() => {
    if (!expandedId) return;
    const timeout = setTimeout(() => {
      const el = document.querySelector(`[data-treatment="${expandedId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 350);
    return () => clearTimeout(timeout);
  }, [expandedId]);

  return (
    <main className="pt-20">
      {/* ── Header ── */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-accent-light)]/5 blur-3xl" />
        </div>
        <div className="container-width text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-display text-white mb-5"
          >
            Behandlinger
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 font-sans font-400 max-w-xl mx-auto leading-relaxed"
          >
            Fra forebyggende pleie til avansert kosmetisk behandling.
          </motion.p>
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />

      {/* ── Treatment Grid ── */}
      <section className="py-14 md:py-20 bg-[var(--color-bg)]">
        <div className="container-width max-w-[1140px]">
          {activeCategory === "Alle" ? (
            <EditorialLayout expandedId={expandedId} onToggle={handleToggle} />
          ) : (
            <FilteredGrid
              activeCategory={activeCategory}
              expandedId={expandedId}
              onToggle={handleToggle}
            />
          )}
        </div>
      </section>

      {/* ── Payment Info ── */}
      <section className="py-14 md:py-20 bg-[var(--color-bg-blue)]">
        <div className="container-width max-w-5xl">
          <div className="grid md:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-7"
            >
              <h3 className="font-heading font-600 text-xl text-[var(--color-primary)] mb-4">
                Betalingsinformasjon
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Betaling skjer ved endt behandling",
                  "Vi aksepterer kort, Vipps og kontant",
                  "Avbetalingsordninger kan avtales",
                  "Trygderefusjon for stønadberettigede behandlinger",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[var(--color-text-secondary)] font-sans font-400 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-7"
            >
              <h3 className="font-heading font-600 text-xl text-[var(--color-primary)] mb-4">
                Trygderefusjon
              </h3>
              <p className="text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed mb-3">
                Enkelte tannbehandlinger gir rett til refusjon fra HELFO. Vi
                hjelper deg med å sende refusjonskrav, slik at du får tilbake det
                du har krav på.
              </p>
              <p className="text-[var(--color-text-secondary)] font-sans font-400 leading-relaxed">
                Spør oss gjerne om dette ved bestilling av time, så informerer vi
                deg om dine rettigheter.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        </div>
        <div className="relative z-10 container-width py-14 md:py-20 text-center">
          <h2 className="heading-section text-white mb-4">
            Usikker på hvilken behandling du trenger?
          </h2>
          <p className="text-lg text-white/80 font-sans font-400 max-w-lg mx-auto mb-8">
            Ta kontakt med oss for en uforpliktende konsultasjon. Vi hjelper deg
            med å finne den beste løsningen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kontakt"
              className="btn-primary bg-white text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)] px-8 py-4 cursor-pointer"
            >
              <Calendar className="size-5" />
              Kontakt oss
            </Link>
            <a
              href="tel:61280412"
              className="btn-secondary px-8 py-4 cursor-pointer"
            >
              <Phone className="size-5" />
              Ring 61 28 04 12
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

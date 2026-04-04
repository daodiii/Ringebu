# Behandlinger Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the behandlinger page from a flat bento grid into an alternating bands editorial layout with image banners, sticky category filter tabs, and click-to-expand accordion.

**Architecture:** Single file rewrite of `src/app/behandlinger/page.tsx`. All components (ImageBand, CompactCard, CategoryTabs, ExpandedPanel) live in the same file, matching the existing codebase pattern. The page uses client-side state for filtering and accordion. Payment and CTA sections are preserved unchanged.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, Next/Image, Lucide icons

**Spec:** `docs/superpowers/specs/2026-04-05-behandlinger-redesign-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/app/behandlinger/page.tsx` | Rewrite | All components + page layout + data |

All components live in one file (matching existing pattern). The file is structured as:
1. Types & interfaces
2. Static data (treatments array — preserved, plus new layout/image/category data)
3. Sub-components: `CategoryTabs`, `ExpandedPanel`, `ImageBand`, `CompactCard`
4. Page layout renderers: `EditorialLayout` (for "Alle"), `FilteredGrid` (for categories)
5. Main `Behandlinger` page component
6. Preserved sections: Payment Info, CTA (copy-pasted unchanged)

---

## Chunk 1: Data Layer & Types

### Task 1: Add new data structures alongside existing treatments array

**Files:**
- Modify: `src/app/behandlinger/page.tsx` (lines 1-194, data section)

- [ ] **Step 1: Add new types, image mapping, categories, and layout config**

Add these below the existing `treatments` array (keep all existing types and data):

```typescript
/* ─────────────── New Data for Redesign ─────────────── */

const treatmentImages: Record<string, { src: string; alt: string }> = {
  "Forebyggende Behandling": { src: "/images/ringebutannMain.jpg", alt: "Ringebu Tannklinikk" },
  "Fyllingsterapi": { src: "/images/service-general.jpg", alt: "Moderne tannbehandling" },
  "Visdomstennene": { src: "/images/dental-chair.png", alt: "Tannlegestol med utstyr" },
};

const categories = [
  "Alle",
  "Forebyggende",
  "Kosmetisk",
  "Restaurering",
  "Kirurgi",
  "Spesialbehandling",
];

type LayoutItem =
  | { type: "band"; treatmentTitle: string; direction: "left" | "right" }
  | { type: "row"; treatmentTitles: string[] };

const pageLayout: LayoutItem[] = [
  { type: "band", treatmentTitle: "Forebyggende Behandling", direction: "left" },
  { type: "row", treatmentTitles: ["Bleking", "Tannkjøtt & Tannstein"] },
  { type: "band", treatmentTitle: "Fyllingsterapi", direction: "right" },
  { type: "row", treatmentTitles: ["Kron og Bro", "Rotfylling", "Bittskinner"] },
  { type: "band", treatmentTitle: "Visdomstennene", direction: "left" },
  { type: "row", treatmentTitles: ["Tannlegeskrekk"] },
];

// Dev-mode validation
if (process.env.NODE_ENV === "development") {
  const allTitles = treatments.map((t) => t.title);
  pageLayout.forEach((item) => {
    const titles = item.type === "band" ? [item.treatmentTitle] : item.treatmentTitles;
    titles.forEach((title) => {
      if (!allTitles.includes(title)) {
        console.warn(`[behandlinger] Layout references unknown treatment: "${title}"`);
      }
    });
  });
}
```

- [ ] **Step 2: Update imports**

Replace the import section at the top of the file:

```typescript
"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, Phone, ChevronDown } from "lucide-react";
```

- [ ] **Step 3: Remove old sub-components**

Delete these old components entirely (they'll be replaced in Task 2-4):
- `CardHeader`
- `CardDescription`
- `CardFeatures`
- `CardPrices`
- `HorizontalCard`
- `VerticalCard`

Keep the `Treatment` and `PriceItem` interfaces. Keep the `treatments` array.

- [ ] **Step 4: Commit**

Note: The page will not compile yet because the old page component references deleted components. This is expected — it will be fixed when the new components and page are assembled in Chunks 2-3.

```bash
git add src/app/behandlinger/page.tsx
git commit -m "refactor: add new data structures for behandlinger redesign"
```

---

## Chunk 2: Shared Sub-Components

### Task 2: Build ExpandedPanel component

**Files:**
- Modify: `src/app/behandlinger/page.tsx`

- [ ] **Step 1: Add ExpandedPanel component**

Add below the data section, above where the old sub-components were:

```typescript
/* ─────────────── Shared: Expanded Panel ─────────────── */

function ExpandedPanel({ t }: { t: Treatment }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-6 pt-2">
        {/* Features */}
        <ul className="space-y-2 mb-5">
          {t.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-white/90 text-sm font-sans font-400 leading-snug"
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0"
                style={{ backgroundColor: t.accent }}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* Prices or fallback */}
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
                className={`py-2 ${idx < t.prices.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: `${t.accent}12` }}
              >
                <div className="font-sans font-500 text-sm text-white">
                  {item.name}
                </div>
                <div className="text-xs text-white/60 font-sans font-400">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/50 font-sans font-400 italic">
            Ta kontakt for prisinformasjon
          </p>
        )}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/behandlinger/page.tsx
git commit -m "feat: add ExpandedPanel component for behandlinger accordion"
```

### Task 3: Build CategoryTabs component

**Files:**
- Modify: `src/app/behandlinger/page.tsx`

- [ ] **Step 1: Add CategoryTabs component**

Add after ExpandedPanel:

```typescript
/* ─────────────── CategoryTabs ─────────────── */

function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}) {
  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % categories.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + categories.length) % categories.length;
    else return;
    e.preventDefault();
    onCategoryChange(categories[nextIdx]);
    // Focus the next tab button
    const buttons = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[nextIdx]?.focus();
  };

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="relative container-width max-w-[1140px] py-3">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Filtrer behandlinger etter kategori"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((cat, idx) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onCategoryChange(cat)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-sans font-500 transition-colors duration-200 cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                  isActive
                    ? "text-white"
                    : "bg-[var(--color-bg-cream)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-blue)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[var(--color-accent)] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
        {/* Fade hint for mobile overflow */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/95 to-transparent pointer-events-none md:hidden" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/behandlinger/page.tsx
git commit -m "feat: add CategoryTabs with sticky positioning and animated pill"
```

### Task 4: Build ImageBand component

**Files:**
- Modify: `src/app/behandlinger/page.tsx`

- [ ] **Step 1: Add ImageBand component**

Add after CategoryTabs:

```typescript
/* ─────────────── ImageBand ─────────────── */

function ImageBand({
  t,
  imageSrc,
  imageAlt,
  direction,
  isExpanded,
  onToggle,
  index,
}: {
  t: Treatment;
  imageSrc: string;
  imageAlt: string;
  direction: "left" | "right";
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const isLeft = direction === "left";

  const panelId = `panel-${t.title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <motion.div
      data-treatment={t.title}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      layout
      className={`rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 ${
        !isExpanded ? "hover:-translate-y-1" : ""
      }`}
      style={{
        scrollMarginTop: "140px",
        boxShadow: `0 4px 20px ${t.color}50`,
      }}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); }
        if (e.key === "Escape" && isExpanded) { onToggle(); }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 16px 48px ${t.color}65`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 20px ${t.color}50`;
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={panelId}
    >
      {/* Image + Gradient Container */}
      <div className="relative md:min-h-[240px] min-h-0">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`object-cover transition-transform duration-[600ms] ease-out ${
              !isExpanded ? "group-hover:scale-105" : ""
            }`}
            sizes="(max-width: 768px) 100vw, 1140px"
            priority={index === 0}
          />
        </div>

        {/* Gradient Overlay — Desktop: horizontal, Mobile: vertical */}
        <div
          className="absolute inset-0 z-10 hidden md:block"
          style={{
            background: isLeft
              ? `linear-gradient(90deg, ${t.color} 45%, ${t.color}80 65%, transparent)`
              : `linear-gradient(270deg, ${t.color} 45%, ${t.color}80 65%, transparent)`,
          }}
        />
        <div
          className="absolute inset-0 z-10 block md:hidden"
          style={{
            background: `linear-gradient(180deg, transparent 20%, ${t.color}CC 50%, ${t.color} 70%)`,
          }}
        />

        {/* Content */}
        <div
          className={`relative z-20 p-6 md:p-8 flex flex-col md:min-h-[240px] min-h-0 ${
            isLeft ? "md:items-start md:text-left" : "md:items-end md:text-right"
          }`}
        >
          {/* Mobile: push content to bottom */}
          <div className="flex-1 md:hidden min-h-[160px]" />

          <div className={`md:max-w-[55%] w-full ${isLeft ? "" : "md:ml-auto"}`}>
            <span
              className="inline-block text-[0.6rem] font-sans font-600 uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full mb-3"
              style={{ color: t.accent, backgroundColor: `${t.accent}18` }}
            >
              {t.category}
            </span>

            <h3 className="font-heading font-700 text-white text-xl md:text-2xl leading-tight mb-1">
              {t.title}
            </h3>
            <p className="text-white/70 text-sm font-sans font-400 mb-2">
              {t.subtitle}
            </p>
            <p className="text-white/80 text-sm font-sans font-400 leading-relaxed mb-3">
              {t.description}
            </p>

            {/* Feature pills — visible only when collapsed */}
            {!isExpanded && (
              <div className={`flex flex-wrap gap-2 mb-2 ${isLeft ? "" : "md:justify-end"}`}>
                {t.features.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 font-sans"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* Chevron */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`inline-flex ${isLeft ? "" : "md:ml-auto"}`}
            >
              <ChevronDown className="size-5 text-white/50" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <div id={panelId} style={{ backgroundColor: t.color }}>
            <ExpandedPanel t={t} />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/behandlinger/page.tsx
git commit -m "feat: add ImageBand component with background image and gradient overlay"
```

### Task 5: Build CompactCard component

**Files:**
- Modify: `src/app/behandlinger/page.tsx`

- [ ] **Step 1: Add CompactCard component**

Add after ImageBand:

```typescript
/* ─────────────── CompactCard ─────────────── */

function CompactCard({
  t,
  isExpanded,
  onToggle,
  index,
}: {
  t: Treatment;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const panelId = `panel-${t.title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <motion.div
      data-treatment={t.title}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      layout
      className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 border border-transparent ${
        !isExpanded ? "hover:-translate-y-1" : ""
      }`}
      style={{
        backgroundColor: t.color,
        scrollMarginTop: "140px",
        boxShadow: `0 4px 20px ${t.color}50`,
      }}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); }
        if (e.key === "Escape" && isExpanded) { onToggle(); }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 16px 48px ${t.color}65`;
        if (!isExpanded) {
          e.currentTarget.style.borderColor = `${t.accent}30`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 20px ${t.color}50`;
        e.currentTarget.style.borderColor = "transparent";
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={panelId}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className="inline-block text-[0.58rem] font-sans font-600 uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full mb-2"
              style={{ color: t.accent, backgroundColor: `${t.accent}18` }}
            >
              {t.category}
            </span>
            <h3 className="font-heading font-700 text-white text-lg md:text-xl leading-tight mb-1">
              {t.title}
            </h3>
            <p className="text-white/70 text-[0.8rem] font-sans font-400">
              {t.subtitle}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 mt-1"
          >
            <ChevronDown className="size-5 text-white/50" />
          </motion.div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <div id={panelId}>
            <ExpandedPanel t={t} />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/behandlinger/page.tsx
git commit -m "feat: add CompactCard component with accordion expand"
```

---

## Chunk 3: Page Layout & Assembly

### Task 6: Build the editorial layout renderer (for "Alle" view)

**Files:**
- Modify: `src/app/behandlinger/page.tsx`

- [ ] **Step 1: Add EditorialLayout component**

Add after CompactCard:

```typescript
/* ─────────────── Editorial Layout (Alle view) ─────────────── */

function EditorialLayout({
  expandedId,
  onToggle,
}: {
  expandedId: string | null;
  onToggle: (title: string) => void;
}) {
  let itemIndex = 0;

  return (
    <div className="space-y-4">
      {pageLayout.map((item, layoutIdx) => {
        if (item.type === "band") {
          const t = treatments.find((tr) => tr.title === item.treatmentTitle);
          if (!t) return null;
          const img = treatmentImages[item.treatmentTitle];
          if (!img) return null;
          const idx = itemIndex++;
          return (
            <ImageBand
              key={t.title}
              t={t}
              imageSrc={img.src}
              imageAlt={img.alt}
              direction={item.direction}
              isExpanded={expandedId === t.title}
              onToggle={() => onToggle(t.title)}
              index={idx}
            />
          );
        }

        // Row of compact cards
        const rowTreatments = item.treatmentTitles
          .map((title) => treatments.find((tr) => tr.title === title))
          .filter(Boolean) as Treatment[];

        const isSingleCard = rowTreatments.length === 1;

        return (
          <div
            key={`row-${layoutIdx}`}
            className={`flex flex-col md:flex-row gap-4 ${
              isSingleCard ? "md:justify-center" : ""
            }`}
          >
            {rowTreatments.map((t) => {
              const idx = itemIndex++;
              return (
                <div
                  key={t.title}
                  className={`${
                    isSingleCard ? "md:w-1/2" : "flex-1"
                  } w-full`}
                >
                  <CompactCard
                    t={t}
                    isExpanded={expandedId === t.title}
                    onToggle={() => onToggle(t.title)}
                    index={idx}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Add FilteredGrid component (for category-filtered view)**

Add after EditorialLayout:

```typescript
/* ─────────────── Filtered Grid (category view) ─────────────── */

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
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <AnimatePresence mode="popLayout">
        {filtered.map((t, idx) => (
          <motion.div
            key={t.title}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <CompactCard
              t={t}
              isExpanded={expandedId === t.title}
              onToggle={() => onToggle(t.title)}
              index={idx}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/behandlinger/page.tsx
git commit -m "feat: add EditorialLayout and FilteredGrid renderers"
```

### Task 7: Rewrite the main Behandlinger page component

**Files:**
- Modify: `src/app/behandlinger/page.tsx`

- [ ] **Step 1: Replace the main page component**

Replace the entire `export default function Behandlinger()` with:

```typescript
/* ─────────────── Page ─────────────── */

export default function Behandlinger() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((title: string) => {
    setExpandedId((prev) => (prev === title ? null : title));
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setExpandedId(null); // Collapse any expanded card when switching categories
  }, []);

  // Auto-scroll to expanded card
  useEffect(() => {
    if (expandedId) {
      // Small delay to let AnimatePresence finish
      const timer = setTimeout(() => {
        const el = document.querySelector(`[data-treatment="${expandedId}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [expandedId]);

  const isAlleView = activeCategory === "Alle";

  return (
    <main className="pt-20">
      {/* ── Hero Header (unchanged) ── */}
      <section className="relative bg-[var(--color-primary)] py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-accent)]/8 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-accent-light)]/5 blur-3xl" />
        </div>
        <div className="container-width text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[var(--color-accent-light)] text-sm font-sans font-600 uppercase tracking-[0.15em] mb-4 block"
          >
            Våre tjenester
          </motion.span>
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

      {/* ── Sticky Category Tabs ── */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* ── Treatment Grid ── */}
      <section className="py-14 md:py-20 bg-[var(--color-bg)]">
        <div className="container-width max-w-[1140px]">
          {isAlleView ? (
            <EditorialLayout
              expandedId={expandedId}
              onToggle={handleToggle}
            />
          ) : (
            <FilteredGrid
              activeCategory={activeCategory}
              expandedId={expandedId}
              onToggle={handleToggle}
            />
          )}
        </div>
      </section>

      {/* ── Payment Info (unchanged) ── */}
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

      {/* ── CTA (unchanged) ── */}
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
```

- [ ] **Step 2: Add scrollbar-hide utility to globals.css**

Add at the end of `src/app/globals.css`:

```css
/* Hide scrollbar for category tabs */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 3: Verify build compiles**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npx next build --no-lint 2>&1 | tail -20`

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/behandlinger/page.tsx src/app/globals.css
git commit -m "feat: complete behandlinger page redesign with editorial layout"
```

---

## Chunk 4: Visual QA & Polish

### Task 8: Visual verification and fixes

**Files:**
- Modify: `src/app/behandlinger/page.tsx` (if fixes needed)
- Modify: `src/app/globals.css` (if fixes needed)

- [ ] **Step 1: Start dev server and check visually**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npm run dev`

Open `http://localhost:3000/behandlinger` and verify:
1. Hero header renders unchanged
2. Sticky tabs appear below navbar and stick on scroll
3. Three image bands render with background images and gradient overlays
4. Colored cards render between bands in correct groupings (2, 3, 1)
5. Last card (Tannlegeskrekk) is centered at ~50% width on desktop
6. Clicking a card/band expands the accordion with features + prices
7. Only one accordion expanded at a time
8. Category tabs filter correctly — "Alle" shows bands, others show flat grid
9. Hover states: lift on cards, image zoom on bands
10. Mobile: bands flip vertical, cards stack, tabs scroll horizontally

- [ ] **Step 2: Fix any visual issues found**

Apply CSS or layout fixes as needed. Common things to check:
- Image gradient not strong enough for text readability → increase gradient opacity
- Tabs not sticking → verify `sticky top-20 z-40` is present
- Accordion animation janky → adjust `duration` or `ease` values
- Mobile band image too short → adjust `min-h-[160px]` on the spacer div

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "fix: visual polish for behandlinger redesign"
```

---

## Execution Notes

- **No TDD for this task.** This is a pure visual/UI rewrite with no testable business logic. The treatment data is static. Verification is visual.
- **Single file rewrite.** All work happens in `src/app/behandlinger/page.tsx` with a minor addition to `globals.css`.
- **Preserve Payment + CTA sections exactly.** Copy-paste from current file — do not modify.
- **Image paths are relative to `/public/`.** Next.js `<Image>` uses paths like `/images/ringebutannMain.jpg`.
- **Use `@` prefix for skills:** @superpowers:verification-before-completion before claiming done.

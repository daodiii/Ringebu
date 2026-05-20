# Cinematic Homepage Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage and global chrome (navbar, footer, design tokens, typography) with the Cinematic Editorial redesign defined in [`docs/superpowers/specs/2026-05-19-cinematic-homepage-redesign.md`](../specs/2026-05-19-cinematic-homepage-redesign.md). After this plan, the homepage delivers a full-bleed cinematic hero, a magazine-rhythm scroll, Geist typography, and a new warm-neutral palette. Inner pages keep their layouts but inherit the new tokens/fonts/chrome automatically.

**Architecture:** A thin `page.tsx` composes seven section components from `src/components/home/*`. Five shared UI subcomponents live in `src/components/ui/*` for reuse (eyebrow labels, grain overlay, plate caption, data cell, severity pill). Navbar swaps between dark and light modes via an `IntersectionObserver` watching the hero. Motion uses framer-motion with a single orchestrated hero entrance plus on-scroll reveals; `prefers-reduced-motion` short-circuits all entrance animations.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5 strict, Tailwind CSS v4 (`@theme inline`), framer-motion 12, lucide-react, `next/font/google` for Geist + Geist Mono.

---

## Important: Commit Policy For This Plan

The user has saved a durable preference: **no `git commit` until they have seen the final running result and explicitly approve it.** This overrides the writing-plans skill's default of frequent commits.

For every task in this plan:
- Code is written and **staged** with `git add <files>` (so progress is reviewable in `git status` / `git diff --staged`)
- **No `git commit` is run** during tasks
- The final task gates the entire batch through user review at `npm run dev`
- After user approval, the engineer asks the user how to commit (one batch / multiple commits / their preference) and then commits

If a task description below shows a "Stage" step instead of a "Commit" step, that is intentional and correct.

## Source of Truth: Real Clinic Data

The site's existing `src/app/layout.tsx` contains the real clinic structured data. Use these literal values everywhere the design needs them:

```
Name:    Ringebu Tannlegesenter
Phone:   61 28 04 12   (tel:61280412)
Email:   post@ringebutann.no
Address: Hanstadgata 2, 2630 Ringebu
Hours:   Mandag – Torsdag · 08:00 – 15:30
         Fredag           · 08:00 – 15:00
Domain:  ringebutann.no
```

**Do not invent** opening hours, addresses, phone numbers, or testimonials. The Trust section ships without a testimonial per the spec — three editorial credentials only.

---

## File Structure

### Files to create

```
src/components/ui/
  SectionEyebrow.tsx       // Mono uppercase label with optional 28px brass rule
  GrainOverlay.tsx         // Absolutely-positioned SVG noise (used on dark sections)
  PlateCaption.tsx         // 3-column mono caption row beneath catalogue plates
  DataCell.tsx             // Mono label + Geist value pair (almanac & address grid)
  SeverityPill.tsx         // Symptom severity badge ("Oppsøk nå" / "Undersøk" / "Følg med")

src/components/home/
  Hero.tsx                 // Section 01 — dark cinematic full-bleed
  TreatmentsBento.tsx      // Section 02 — cream editorial bento
  TrustSection.tsx         // Section 03 — dark editorial credentials
  SymptomsAlmanac.tsx      // Section 04 — cream almanac list + article tiles
  AboutPlate.tsx           // Section 05 — catalogue plate (paper-warm cream)
  CtaCloseout.tsx          // Section 06 — dark cinematic close-out
```

### Files to modify

```
src/app/layout.tsx               // Swap fonts to Geist + Geist Mono
src/app/globals.css              // Full palette / typography token rewrite
src/app/page.tsx                 // Replace 850-line homepage with composition
src/components/Navbar.tsx        // Variant prop + hero IntersectionObserver mode switch
src/components/Footer.tsx        // Rewrite with new ink chrome
```

### Files to delete (stale backups)

```
src/app/layout.tsx.bak
src/app/page.tsx.bak
src/app/globals.css.bak
src/components/Footer.tsx.bak
src/components/Navbar.tsx.bak
```

### Files not touched (inherit new tokens automatically)

```
src/app/behandlinger/*           // Treatments inner pages
src/app/symptomer/*              // Symptoms inner pages
src/app/informasjon/*            // Info inner pages
src/app/kontakt/*                // Contact page
src/app/priser/*                 // Prices page
src/app/artikler/*               // Articles index + detail
src/data/content.ts              // Content data (treatments, symptoms)
src/components/ImagePlaceholder.tsx, AnimateOnScroll.tsx, etc.
```

These pages will visually change (new fonts, new colors) because they consume CSS variables we redefine. That is intentional. Per the spec, inner page layouts are out of scope for this redesign.

---

## Verification Commands (used in every task)

```bash
# From the project root /Users/daodilyas/Desktop/RingebuTann

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Local dev server (user opens http://localhost:3000 in their browser)
npm run dev
```

The user opens localhost themselves — never attempt to start a preview server or claim a visual change "works" without their confirmation. Per saved preference: *Don't start preview servers, user checks localhost themselves.*

---

## Task 1: Delete stale backup files

**Files:**
- Delete: `src/app/layout.tsx.bak`
- Delete: `src/app/page.tsx.bak`
- Delete: `src/app/globals.css.bak`
- Delete: `src/components/Footer.tsx.bak`
- Delete: `src/components/Navbar.tsx.bak`

- [ ] **Step 1: Verify the files exist**

```bash
ls -la src/app/*.bak src/components/*.bak
```

Expected: five files listed.

- [ ] **Step 2: Delete the backup files**

```bash
rm src/app/layout.tsx.bak src/app/page.tsx.bak src/app/globals.css.bak
rm src/components/Footer.tsx.bak src/components/Navbar.tsx.bak
```

- [ ] **Step 3: Verify deletion and stage**

```bash
ls src/app/*.bak src/components/*.bak 2>/dev/null && echo "still present" || echo "deleted"
git add -u src/app src/components
git status
```

Expected: "deleted" message; `git status` shows five deletions staged.

---

## Task 2: Install Geist + Geist Mono fonts, replace layout font config

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the font imports and variable declarations**

Open `src/app/layout.tsx`. At the top, replace the existing font block (lines 1–22 in the current file) with:

```tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});
```

Geist supports weights 100–900 as a variable font, but we declare a discrete set so PurgeCSS and bundle analysis can reason about what we actually use.

- [ ] **Step 2: Update the html element to use the new variables**

Find the line `<html lang="nb" className={\`${fraunces.variable} ${dmSans.variable}\`}>` and change it to:

```tsx
<html lang="nb" className={`${geist.variable} ${geistMono.variable}`}>
```

- [ ] **Step 3: Update viewport themeColor**

Find `themeColor: "#3C2415"` in the `viewport` export and change it to:

```tsx
themeColor: "#0A0A0A",
```

This matches the new ink token — the value the browser uses to tint the mobile address bar.

- [ ] **Step 4: Typecheck**

```bash
npx tsc --noEmit
```

Expected: clean (no errors). If unused-import warnings appear for `Fraunces`/`DM_Sans`, those imports were already removed in Step 1.

- [ ] **Step 5: Stage**

```bash
git add src/app/layout.tsx
git status
```

---

## Task 3: Rewrite design tokens (palette, typography, radius, motion) in globals.css

**Files:**
- Modify: `src/app/globals.css` (full token block replacement)

This task is the foundation everything else depends on. Replace the entire `@theme inline { ... }` block and the `body`/`h1-h6` resets. Keep the file's reset rules for `touch-action`, `tabular-nums`, `prefers-reduced-motion`, and the `container-width` / `section-padding` helpers — they are not coupled to tokens.

- [ ] **Step 1: Open the file and locate the `@theme inline` block**

The current file is 359 lines. The token block is lines ~1–51. Read the file first to confirm exact line numbers before editing:

```bash
sed -n '1,55p' src/app/globals.css
```

- [ ] **Step 2: Replace the `@theme inline` block**

Replace the entire `@theme inline { ... }` block (from `@theme inline {` through the matching closing `}`) with:

```css
@theme inline {
  /* ── Ink / Paper / Accent ── */
  --color-ink:          #0A0A0A;   /* hero base, footer, deep close-out */
  --color-ink-warm:     #0F0B07;   /* trust section — has warm brown undertone */
  --color-paper:        #F5F0E6;   /* default page background, cream sections */
  --color-paper-warm:   #EFE8DA;   /* About section — one notch deeper to differentiate */

  --color-amber:        #F5E9CB;   /* tungsten-light accent — headline accent, CTA on dark */
  --color-amber-deep:   #E8C58C;   /* stronger amber — single bento tile, highlights */
  --color-brass:        #B8945C;   /* thin lines, eyebrow rules, footer category labels */
  --color-stone:        #8B6F4A;   /* headline accent on light (substitute for italic) */

  /* ── Text ── */
  --color-text-primary:        #1A1410;
  --color-text-secondary:      #4A3F33;
  --color-text-muted:          #8B7C6A;
  --color-text-on-dark:        #F5E9CB;
  --color-text-on-dark-muted:  rgba(245, 233, 203, 0.55);

  /* ── Rules ── */
  --color-rule:       rgba(26, 20, 16, 0.12);
  --color-rule-dark:  rgba(245, 233, 203, 0.18);

  /* ── Urgency (severity pill) ── */
  --color-urgent: #B8624A;

  /* ── Typography ── */
  --font-sans: var(--font-sans), system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, SFMono-Regular, monospace;
  --font-heading: var(--font-sans), system-ui, sans-serif;  /* alias so any legacy class still resolves */

  /* ── Radius ── */
  --radius-tile:  14px;
  --radius-pill:  9999px;
  --radius-frame: 0;          /* catalogue plates: square corners */
  --radius-inset: 6px;
  --radius-sm:    8px;         /* legacy aliases for inner pages still using them */
  --radius-md:    12px;
  --radius-lg:    16px;

  /* ── Spacing ── */
  --space-section:        clamp(72px, 8vw, 100px);
  --space-section-tight:  clamp(60px, 6vw, 80px);
  --container-px:         clamp(20px, 4vw, 36px);
  --container-max:        1280px;

  /* ── Motion ── */
  --ease-cinematic: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* ── Legacy aliases (so inner pages don't break before they're redesigned) ── */
  --color-primary:        var(--color-text-primary);
  --color-primary-dark:   var(--color-ink);
  --color-primary-light:  var(--color-text-secondary);
  --color-accent:         var(--color-stone);
  --color-accent-hover:   var(--color-text-primary);
  --color-accent-light:   var(--color-amber-deep);
  --color-bg:             var(--color-paper);
  --color-bg-cream:       var(--color-paper);
  --color-bg-blue:        var(--color-paper-warm);
  --color-bg-yellow:      var(--color-paper-warm);
  --color-bg-mint:        var(--color-paper-warm);
  --color-border:         var(--color-rule);
  --color-stone-50:  #F8F5EE;
  --color-stone-100: #F0EBE0;
  --color-stone-200: #DDD5C5;
  --color-stone-300: #C2B59C;
  --color-stone-400: #A89279;
  --color-stone-500: #8B7C6A;
  --color-stone-600: #6B5A40;
  --color-stone-700: #4A3F33;
  --color-stone-800: #2C2620;
  --color-stone-900: #1A1410;
}
```

The legacy aliases at the bottom map the old tokens (used by `behandlinger`, `symptomer`, `informasjon`, `kontakt`, `priser`, `artikler` pages) to the new palette so those pages render coherently with the new design without us touching their code.

- [ ] **Step 3: Update the body / heading base styles**

Find the `body { ... }` block (around line 76 in the current file) and the `h1, h2, h3, h4, h5, h6 { ... }` block. Replace them with:

```css
body {
  background-color: var(--color-paper);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "cv11";  /* Geist stylistic set: tabular figures + cleaner 'a' */
  overflow-x: hidden;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.05;
}
```

`font-feature-settings` enables the Geist tabular-figures stylistic set so numbers in mono labels line up.

- [ ] **Step 4: Add the typography utility classes at the bottom of the file**

Append to `src/app/globals.css`:

```css
/* ── Typography utilities ── */
.display-hero {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: clamp(38px, 6.5vw, 72px);
  line-height: 0.97;
  letter-spacing: -0.035em;
}

.display-section {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(32px, 4.2vw, 52px);
  line-height: 1.0;
  letter-spacing: -0.03em;
}

.display-quote {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: clamp(26px, 3.5vw, 44px);
  line-height: 1.12;
  letter-spacing: -0.028em;
}

.body-large {
  font-family: var(--font-sans);
  font-size: clamp(16px, 1.2vw, 17px);
  line-height: 1.55;
  letter-spacing: -0.012em;
}

.eyebrow {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
}

.data-label {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 9.5px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.data-value {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
}
```

- [ ] **Step 5: Typecheck and lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: clean.

- [ ] **Step 6: Visual smoke check**

```bash
npm run dev
```

Tell the user: "Open http://localhost:3000. Everything will look broken / off-brand right now — that is expected, because the homepage still references the old design. We want to verify nothing throws and the page loads. Confirm before continuing."

Stop the dev server (Ctrl+C) after the user confirms.

- [ ] **Step 7: Stage**

```bash
git add src/app/globals.css
git status
```

---

## Task 4: Build `SectionEyebrow` UI primitive

**Files:**
- Create: `src/components/ui/SectionEyebrow.tsx`

A small reusable component for the mono uppercase eyebrow label that appears on top of most sections, optionally preceded by a 28px-wide hairline rule.

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/SectionEyebrow.tsx
import { cn } from "@/lib/utils";

type Tone = "ink" | "paper";

interface Props {
  children: React.ReactNode;
  tone?: Tone;
  withRule?: boolean;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  ink: "text-[var(--color-amber)]",
  paper: "text-[var(--color-stone)]",
};

const ruleToneClasses: Record<Tone, string> = {
  ink: "bg-[var(--color-brass)]",
  paper: "bg-[var(--color-brass)]",
};

export function SectionEyebrow({
  children,
  tone = "paper",
  withRule = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-3.5",
        toneClasses[tone],
        className
      )}
    >
      {withRule && (
        <span
          aria-hidden="true"
          className={cn("inline-block h-px w-7", ruleToneClasses[tone])}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
```

`tone="ink"` is used on dark backgrounds (hero, trust, CTA), `tone="paper"` on cream backgrounds (treatments, symptoms, about).

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Stage**

```bash
git add src/components/ui/SectionEyebrow.tsx
```

---

## Task 5: Build `GrainOverlay` UI primitive

**Files:**
- Create: `src/components/ui/GrainOverlay.tsx`

An absolutely-positioned SVG noise texture used on dark sections to add cinematic grain.

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/GrainOverlay.tsx
import { cn } from "@/lib/utils";

interface Props {
  opacity?: number;
  className?: string;
}

const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GrainOverlay({ opacity = 0.06, className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-overlay",
        className
      )}
      style={{
        opacity,
        backgroundImage: NOISE_DATA_URI,
      }}
    />
  );
}
```

`stitchTiles="stitch"` ensures the noise tiles seamlessly. `mix-blend-overlay` keeps highlights and shadows readable beneath the noise.

- [ ] **Step 2: Typecheck and stage**

```bash
npx tsc --noEmit
git add src/components/ui/GrainOverlay.tsx
```

---

## Task 6: Build `PlateCaption` UI primitive

**Files:**
- Create: `src/components/ui/PlateCaption.tsx`

A three-column mono caption row used beneath catalogue-style photo plates. Examples: `"Plate I." / "Behandlingsrom · Ringebu" / "2026 · Norge"`.

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/PlateCaption.tsx
import { cn } from "@/lib/utils";

interface Props {
  marker: string;     // e.g. "Plate I."
  subject: string;    // e.g. "Behandlingsrom · Ringebu Tannlegesenter"
  origin: string;     // e.g. "2026 · Norge"
  className?: string;
}

export function PlateCaption({ marker, subject, origin, className }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-6 border-t border-[var(--color-rule)] pt-3 text-[var(--color-text-muted)]",
        "font-mono text-[10px] uppercase tracking-[0.18em]",
        className
      )}
    >
      <strong className="font-semibold text-[var(--color-text-primary)]">{marker}</strong>
      <span>{subject}</span>
      <span>{origin}</span>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and stage**

```bash
npx tsc --noEmit
git add src/components/ui/PlateCaption.tsx
```

---

## Task 7: Build `DataCell` UI primitive

**Files:**
- Create: `src/components/ui/DataCell.tsx`

A label + value pair. Mono uppercase label on top, Geist value beneath. Used in the About section's address grid and in the hero credits.

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/DataCell.tsx
import { cn } from "@/lib/utils";

type Tone = "ink" | "paper";

interface Props {
  label: string;
  value: React.ReactNode;
  tone?: Tone;
  className?: string;
}

const labelToneClasses: Record<Tone, string> = {
  ink:   "text-[var(--color-brass)]",
  paper: "text-[var(--color-text-muted)]",
};

const valueToneClasses: Record<Tone, string> = {
  ink:   "text-[var(--color-text-on-dark)]",
  paper: "text-[var(--color-text-primary)]",
};

export function DataCell({ label, value, tone = "paper", className }: Props) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-mono text-[9.5px] uppercase tracking-[0.25em]",
          labelToneClasses[tone]
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-sans text-[13px] font-semibold tracking-[-0.01em]",
          valueToneClasses[tone]
        )}
      >
        {value}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and stage**

```bash
npx tsc --noEmit
git add src/components/ui/DataCell.tsx
```

---

## Task 8: Build `SeverityPill` UI primitive

**Files:**
- Create: `src/components/ui/SeverityPill.tsx`

Used in the Symptoms section. Three variants: "Oppsøk nå" (urgent), "Undersøk" (soon), "Følg med" (watch).

- [ ] **Step 1: Create the file**

```tsx
// src/components/ui/SeverityPill.tsx
import { cn } from "@/lib/utils";

export type Severity = "now" | "soon" | "watch";

interface Props {
  severity: Severity;
  className?: string;
}

const LABELS: Record<Severity, string> = {
  now:   "Oppsøk nå",
  soon:  "Undersøk",
  watch: "Følg med",
};

const STYLES: Record<Severity, string> = {
  now:   "bg-[var(--color-urgent)] text-[var(--color-paper)]",
  soon:  "bg-[var(--color-amber-deep)] text-[#6B4F2C]",
  watch: "bg-[rgba(26,20,16,0.08)] text-[var(--color-text-secondary)]",
};

export function SeverityPill({ severity, className }: Props) {
  return (
    <span
      className={cn(
        "inline-block rounded-full font-mono text-[9.5px] uppercase tracking-[0.15em] px-2.5 py-1 font-semibold",
        STYLES[severity],
        className
      )}
    >
      {LABELS[severity]}
    </span>
  );
}
```

- [ ] **Step 2: Typecheck and stage**

```bash
npx tsc --noEmit
git add src/components/ui/SeverityPill.tsx
```

---

## Task 9: Rewrite `Footer.tsx`

**Files:**
- Modify (full rewrite): `src/components/Footer.tsx`

The footer is the bottom of every page (rendered from `RootLayout`). New version uses `--color-ink` background, four columns, Geist Mono category labels, ends with a copyright + brief tagline strip.

- [ ] **Step 1: Replace the entire file**

```tsx
// src/components/Footer.tsx
import Link from "next/link";

const TREATMENTS = [
  { label: "Forebyggende",      href: "/behandlinger" },
  { label: "Generell",          href: "/behandlinger" },
  { label: "Akutt tannhjelp",   href: "/behandlinger" },
  { label: "Estetisk",          href: "/behandlinger" },
  { label: "Implantater",       href: "/behandlinger" },
];

const PRACTICAL = [
  { label: "Priser",            href: "/priser" },
  { label: "Symptomer",         href: "/symptomer" },
  { label: "Tips & råd",        href: "/artikler" },
  { label: "Slik finner du oss", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-text-on-dark)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <div className="font-sans text-base font-semibold tracking-[-0.01em] text-[var(--color-text-on-dark)]">
                Ringebu Tannlegesenter
              </div>
              <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                Gudbrandsdalen · siden 1985
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[var(--color-text-on-dark-muted)]">
              Tannhelse med tid og omtanke — for hele dalen, og for de som besøker den.
            </p>
          </div>

          {/* Behandling */}
          <FooterColumn title="Behandling" links={TREATMENTS} />

          {/* Praktisk */}
          <FooterColumn title="Praktisk" links={PRACTICAL} />

          {/* Kontakt */}
          <div>
            <h4 className="mb-4 font-mono text-[9.5px] font-semibold uppercase tracking-[0.3em] text-[var(--color-brass)]">
              Kontakt
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="tel:61280412" className="text-[var(--color-text-on-dark)]/80 transition-colors hover:text-[var(--color-text-on-dark)]">
                  61 28 04 12
                </a>
              </li>
              <li>
                <a href="mailto:post@ringebutann.no" className="text-[var(--color-text-on-dark)]/80 transition-colors hover:text-[var(--color-text-on-dark)]">
                  post@ringebutann.no
                </a>
              </li>
              <li className="text-[var(--color-text-on-dark)]/80">Hanstadgata 2</li>
              <li className="text-[var(--color-text-on-dark)]/80">2630 Ringebu</li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-rule-dark)] pt-5 sm:flex-row sm:items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-on-dark-muted)]">
            © {new Date().getFullYear()} Ringebu Tannlegesenter
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-on-dark-muted)]">
            Tannhelse · Gudbrandsdalen
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="mb-4 font-mono text-[9.5px] font-semibold uppercase tracking-[0.3em] text-[var(--color-brass)]">
        {title}
      </h4>
      <ul className="space-y-2.5 text-[13px]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[var(--color-text-on-dark)]/80 transition-colors hover:text-[var(--color-text-on-dark)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 3: Visual check**

`npm run dev`, open the home page, scroll to the bottom. The footer should be dark ink with the four columns and brass category labels.

User confirms before continuing.

- [ ] **Step 4: Stage**

```bash
git add src/components/Footer.tsx
```

---

## Task 10: Rewrite `Navbar.tsx` with dark/light variant + scroll-triggered mode switch

**Files:**
- Modify (full rewrite): `src/components/Navbar.tsx`

The new navbar has two visual modes: **dark** (transparent over the cinematic hero) and **light** (paper background over everything else). On the homepage, mode auto-switches when the hero scrolls out of view. On every other page, mode is always **light**.

We detect mode using a global window event the Hero dispatches when it enters/exits the viewport, **plus** the pathname (so non-homepage routes default to light).

- [ ] **Step 1: Replace the entire file**

```tsx
// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/symptomer",    label: "Symptomer" },
  { href: "/priser",       label: "Priser" },
  { href: "/informasjon",  label: "Om oss" },
  { href: "/kontakt",      label: "Kontakt" },
] as const;

type Mode = "dark" | "light";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [heroInView, setHeroInView] = useState(isHome); // start dark on home, light elsewhere
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for the Hero's intersection events
  useEffect(() => {
    if (!isHome) {
      setHeroInView(false);
      return;
    }
    const onEnter = () => setHeroInView(true);
    const onExit = () => setHeroInView(false);
    window.addEventListener("ringebu:hero-enter", onEnter);
    window.addEventListener("ringebu:hero-exit", onExit);
    return () => {
      window.removeEventListener("ringebu:hero-enter", onEnter);
      window.removeEventListener("ringebu:hero-exit", onExit);
    };
  }, [isHome]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const mode: Mode = isHome && heroInView ? "dark" : "light";

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,backdrop-filter] duration-500",
          mode === "dark"
            ? "bg-transparent text-[var(--color-text-on-dark)]"
            : "bg-[var(--color-paper)]/90 backdrop-blur-md text-[var(--color-text-primary)] border-b border-[var(--color-rule)]"
        )}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] items-center justify-between px-[var(--container-px,24px)] py-4">
          {/* Brand */}
          <Link href="/" className="relative z-50 flex flex-col leading-none">
            <span className="font-sans text-sm font-semibold tracking-[-0.01em]">
              Ringebu Tannlegesenter
            </span>
            <span
              className={cn(
                "mt-0.5 font-mono text-[9px] uppercase tracking-[0.3em]",
                mode === "dark"
                  ? "text-[var(--color-text-on-dark-muted)]"
                  : "text-[var(--color-text-muted)]"
              )}
            >
              Gudbrandsdalen · siden 1985
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6">
            {LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[12.5px] font-medium tracking-[0.005em] transition-colors",
                      mode === "dark"
                        ? active
                          ? "text-[var(--color-amber)]"
                          : "text-[var(--color-text-on-dark)]/75 hover:text-[var(--color-text-on-dark)]"
                        : active
                          ? "text-[var(--color-text-primary)]"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className={cn(
                "hidden md:inline-flex items-center rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors",
                mode === "dark"
                  ? "bg-[var(--color-amber)] text-[var(--color-ink)] hover:bg-[var(--color-amber-deep)]"
                  : "bg-[var(--color-ink)] text-[var(--color-amber)] hover:bg-[var(--color-text-primary)]"
              )}
            >
              Bestill time
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
              aria-expanded={mobileOpen}
              className={cn(
                "relative z-50 p-2 lg:hidden",
                mode === "dark" && !mobileOpen ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-primary)]"
              )}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-paper)] lg:hidden overflow-y-auto overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasjonsmeny"
          >
            <div className="flex min-h-dvh flex-col items-center justify-between gap-8 pt-24 pb-12 px-8">
              <ul className="flex flex-1 flex-col items-center justify-center gap-6">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-sans text-3xl font-medium tracking-[-0.02em] text-[var(--color-text-primary)]"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <a
                  href="tel:61280412"
                  className="flex items-center gap-2 text-[var(--color-text-secondary)]"
                >
                  <Phone className="size-5" aria-hidden="true" /> 61 28 04 12
                </a>
                <Link
                  href="/kontakt"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[var(--color-ink)] px-7 py-3 font-semibold text-[var(--color-amber)]"
                >
                  Bestill time
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

Key behaviors:
- On non-home pages, `mode` is always `"light"` (the Hero never enters view there because there is no Hero).
- On the home page, the Hero component (built in Task 11) dispatches `ringebu:hero-enter` and `ringebu:hero-exit` custom events when it enters / leaves the viewport.
- We removed the "Hjem" link and the "Nyttig info" dropdown per spec.

- [ ] **Step 2: Typecheck and lint**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 3: Visual smoke check**

`npm run dev`. Visit `http://localhost:3000/kontakt` (any non-home page). Confirm the navbar shows in light mode with the new five-link set. Mobile menu opens / closes correctly. User confirms.

The navbar will look broken on `/` until the Hero is built — that's fine; we'll fix that in Task 11.

- [ ] **Step 4: Stage**

```bash
git add src/components/Navbar.tsx
```

---

## Task 11: Build the Hero section (Section 01)

**Files:**
- Create: `src/components/home/Hero.tsx`

The cinematic centerpiece. Full-bleed clinic photo, layered vignette, grain overlay, eyebrow + headline + scroll cue + credits. Dispatches custom events so the Navbar can swap modes.

- [ ] **Step 1: Create the file**

```tsx
// src/components/home/Hero.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const EYEBROW = "Vol. I — Velkommen";
const HEADLINE_LINE_1 = "Tannhelse,";
const HEADLINE_LINE_2 = "slik den burde være.";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Dispatch custom events when the hero enters / exits viewport.
  // Navbar listens for these to swap dark <-> light mode.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.dispatchEvent(new CustomEvent("ringebu:hero-enter"));
          } else {
            window.dispatchEvent(new CustomEvent("ringebu:hero-exit"));
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--color-ink)]"
      aria-label="Velkommen"
    >
      {/* Photo */}
      <Image
        src="/images/ringebutannMain.jpg"
        alt="Behandlingsrom ved Ringebu Tannlegesenter"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-[center_40%] saturate-[0.95] brightness-[0.82]"
      />

      {/* Vignettes (two stacked gradients) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 38%, transparent 60%), " +
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 28%, transparent 70%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Grain */}
      <GrainOverlay />

      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[1] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-brass) 25%, var(--color-amber) 50%, var(--color-brass) 75%, transparent 100%)",
        }}
      />

      {/* Title block (lower-left) */}
      <div className="absolute inset-x-[var(--container-px,24px)] bottom-16 z-10 max-w-[760px]">
        <SectionEyebrow tone="ink" className="mb-4">
          {EYEBROW}
        </SectionEyebrow>
        <h1 className="display-hero text-white">
          <span className="block">{HEADLINE_LINE_1}</span>
          <span className="block font-light text-[var(--color-amber)]">
            {HEADLINE_LINE_2}
          </span>
        </h1>
      </div>

      {/* Scroll cue (lower-left, below title) */}
      <div className="absolute left-[var(--container-px,24px)] bottom-6 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
        <span aria-hidden="true" className="inline-block h-px w-5 bg-white/40" />
        <span>Bla ned</span>
      </div>

      {/* Credits (lower-right) */}
      <div className="absolute right-[var(--container-px,24px)] bottom-7 z-10 hidden text-right font-mono text-[10px] uppercase leading-[1.7] tracking-[0.18em] text-white/55 sm:block">
        <div className="font-semibold text-white/85">Ringebu, NO</div>
        <div>Tannhelse · Etablert 1985</div>
      </div>
    </section>
  );
}
```

Notes:
- `isolate` + `z-` layering keeps the navbar (`z-50`) on top of the hero overlays
- `min-h-[100svh]` uses small-viewport-height so mobile browsers don't get cut off by the URL bar
- Vignette is implemented as a single div with stacked gradients in the style attribute — Tailwind cannot express multi-stop gradients of this complexity inline
- The custom events `ringebu:hero-enter` / `ringebu:hero-exit` are the contract with `Navbar.tsx`

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Wire into a temporary page for visual check**

We need to render the Hero somewhere before `page.tsx` is rewritten. Temporarily, edit `src/app/page.tsx` and replace the entire file contents with:

```tsx
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return <Hero />;
}
```

This will produce a TypeScript-build error if any inner page imports something from the old `page.tsx` — none should, since page files are leaves. Confirm with `npx tsc --noEmit`.

- [ ] **Step 4: Visual check**

`npm run dev`. User opens `http://localhost:3000`. Expect:
- Full-bleed photo of the treatment room
- Dark vignette bottom-left
- Geist 700 "Tannhelse," + Geist 300 amber "slik den burde være."
- "Vol. I — Velkommen" eyebrow above the headline
- "Bla ned" scroll cue lower-left
- "Ringebu, NO / Tannhelse · Etablert 1985" lower-right
- Navbar in dark mode (transparent, amber CTA)

User confirms. Note: the rest of the page is empty for now — that's expected.

- [ ] **Step 5: Stage**

```bash
git add src/app/page.tsx src/components/home/Hero.tsx
```

---

## Task 12: Build the Treatments Bento section (Section 02)

**Files:**
- Create: `src/components/home/TreatmentsBento.tsx`

Cream editorial bento grid: 1 featured dark tile with a clinic-instruments photo + 5 supporting tiles. Header row above with H2 left + small mono metadata right.

- [ ] **Step 1: Create the file**

```tsx
// src/components/home/TreatmentsBento.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const FEATURED = {
  href: "/behandlinger",
  num: "01 — Forebyggende",
  name: "Den enkleste timen er den du tar i tide.",
  body: "Kontroll, rens, fluor og veiledning — i ro.",
};

const TILES = [
  { num: "02 — Generell",  name: "Generell tannbehandling", body: "Fyllinger, kroner, broer.",                  tone: "amber" },
  { num: "03 — Akutt",     name: "Akutt tannhjelp",         body: "Hurtig vurdering, samme dag.",               tone: "paper" },
  { num: "04 — Estetisk",  name: "Bleking & estetikk",      body: "Skånsom klinisk bleking — varig resultat.",  tone: "paper", wide: true },
  { num: "05 — Kirurgi",   name: "Implantater",             body: "Permanente løsninger som ser ut som dine egne.", tone: "paper" },
  { num: "06 — Endodonti", name: "Rotbehandling",           body: "Skånsom, smertefri behandling.",             tone: "paper" },
] as const;

export function TreatmentsBento() {
  return (
    <section
      id="behandlinger"
      className="bg-[var(--color-paper)] py-[var(--space-section)]"
    >
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <h2 className="display-section max-w-[640px] text-[var(--color-text-primary)]">
            Skreddersydde løsninger for{" "}
            <span className="font-light text-[var(--color-stone)]">ditt</span> smil.
          </h2>
          <div className="font-mono text-[10px] uppercase leading-[1.7] tracking-[0.3em] text-[var(--color-text-muted)] md:text-right">
            06 fagområder<br />
            Alle aldre<br />
            HELFO direkte oppgjør
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[180px] md:gap-3.5">
          {/* Feature tile */}
          <Link
            href={FEATURED.href}
            className="group relative col-span-1 overflow-hidden rounded-[var(--radius-tile)] bg-[var(--color-ink)] text-[var(--color-amber)] md:col-span-6 md:row-span-2"
          >
            <Image
              src="/images/clinic-instruments.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                {FEATURED.num}
              </div>
              <div className="mt-3 font-sans text-2xl font-medium leading-[1.1] tracking-[-0.02em] text-[var(--color-amber)] md:text-[28px]">
                {FEATURED.name}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-on-dark-muted)] max-w-md">
                {FEATURED.body}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-amber)]/80 transition-colors group-hover:text-[var(--color-amber)]">
                Les mer
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
          </Link>

          {/* Supporting tiles */}
          {TILES.map((t) => (
            <Tile key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TileProps {
  num: string;
  name: string;
  body: string;
  tone: "amber" | "paper";
  wide?: boolean;
}

function Tile({ num, name, body, tone, wide }: TileProps) {
  return (
    <Link
      href="/behandlinger"
      className={[
        "group relative col-span-1 overflow-hidden rounded-[var(--radius-tile)] p-6 transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(26,20,16,0.06)] md:p-7",
        wide ? "md:col-span-6 md:row-span-1" : "md:col-span-3 md:row-span-2",
        tone === "amber"
          ? "bg-[var(--color-amber-deep)] text-[#6B4F2C]"
          : "bg-white text-[var(--color-text-primary)] ring-1 ring-[var(--color-rule)]",
      ].join(" ")}
    >
      <div
        className={
          "font-mono text-[9.5px] uppercase tracking-[0.25em] " +
          (tone === "amber" ? "text-[#6B4F2C]" : "text-[var(--color-text-muted)]")
        }
      >
        {num}
      </div>
      <div className="mt-2 font-sans text-[19px] font-semibold leading-[1.15] tracking-[-0.018em]">
        {name}
      </div>
      <p
        className={
          "mt-1.5 text-[12px] leading-[1.55] " +
          (tone === "amber" ? "text-[#6B4F2C]/85" : "text-[var(--color-text-secondary)]")
        }
      >
        {body}
      </p>
    </Link>
  );
}
```

- [ ] **Step 2: Add to the page composition for visual check**

Edit `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/home/Hero";
import { TreatmentsBento } from "@/components/home/TreatmentsBento";

export default function Home() {
  return (
    <>
      <Hero />
      <TreatmentsBento />
    </>
  );
}
```

- [ ] **Step 3: Typecheck and visual check**

```bash
npx tsc --noEmit
npm run dev
```

User confirms the bento grid renders correctly, the dark featured tile shows the instruments photo, supporting tiles are aligned.

- [ ] **Step 4: Stage**

```bash
git add src/app/page.tsx src/components/home/TreatmentsBento.tsx
```

---

## Task 13: Build the Trust section (Section 03)

**Files:**
- Create: `src/components/home/TrustSection.tsx`

Dark editorial section. No testimonial. Eyebrow + short brand-voice statement + three full-width credentials stacked vertically, each with a numbered label / name / sub-line.

- [ ] **Step 1: Create the file**

```tsx
// src/components/home/TrustSection.tsx
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const CREDENTIALS = [
  {
    num: "01 / Medlem",
    name: "Den norske tannlegeforening (NTF).",
    sub: "Etiske retningslinjer, kontinuerlig etterutdanning, kvalitetssikret praksis.",
  },
  {
    num: "02 / Refusjon",
    name: "Direkte oppgjør med HELFO.",
    sub: "Du betaler kun egenandelen. Vi sender refusjonskravet på dine vegne.",
  },
  {
    num: "03 / Erfaring",
    name: "Praksis i Gudbrandsdalen siden 1985.",
    sub: "Over fire tiår i samme dal — vi kjenner pasientene våre.",
  },
] as const;

export function TrustSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink-warm)] py-[var(--space-section)] text-[var(--color-text-on-dark)]">
      <GrainOverlay opacity={0.05} />
      <div className="relative mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <SectionEyebrow tone="ink" withRule className="mb-7">
          Trygghet & kvalitet
        </SectionEyebrow>

        <p className="max-w-[620px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.025em] text-[var(--color-text-on-dark)] md:text-[32px]">
          Tre konkrete grunner til at tannhelsen din er trygg hos oss.
        </p>

        <ul className="mt-12 divide-y divide-[var(--color-rule-dark)] border-y border-[var(--color-rule-dark)]">
          {CREDENTIALS.map((c) => (
            <li key={c.num} className="py-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                {c.num}
              </div>
              <div className="mt-2 font-sans text-[22px] font-medium leading-[1.15] tracking-[-0.022em] text-[var(--color-text-on-dark)] md:text-[24px]">
                {c.name}
              </div>
              <p className="mt-2 max-w-[640px] text-[14px] leading-[1.55] text-[var(--color-text-on-dark-muted)]">
                {c.sub}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to the page composition, typecheck, visual check**

```tsx
import { Hero } from "@/components/home/Hero";
import { TreatmentsBento } from "@/components/home/TreatmentsBento";
import { TrustSection } from "@/components/home/TrustSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TreatmentsBento />
      <TrustSection />
    </>
  );
}
```

```bash
npx tsc --noEmit
npm run dev
```

User confirms — dark warm background, three credentials, hairline dividers, no quote/testimonial visible.

- [ ] **Step 3: Stage**

```bash
git add src/app/page.tsx src/components/home/TrustSection.tsx
```

---

## Task 14: Build the Symptoms Almanac section (Section 04)

**Files:**
- Create: `src/components/home/SymptomsAlmanac.tsx`

Cream almanac-list of 5 symptoms with `SeverityPill`s on the right + 3 article tiles in a column on the right.

We read the symptoms data from `src/data/content.ts`. The data file has `severity: string` for each symptom but does not map to our three-tier system. We do that mapping inline.

- [ ] **Step 1: Read the existing symptoms data to know what's available**

```bash
sed -n '44,150p' src/data/content.ts
```

Expected: an exported `symptoms` array with objects containing `title`, `description`, `severity`, `causes`, `whatToDo`, `slug`. Note the first 5 entries' titles; we'll use them in order.

- [ ] **Step 2: Create the file**

```tsx
// src/components/home/SymptomsAlmanac.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { symptoms } from "@/data/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SeverityPill, type Severity } from "@/components/ui/SeverityPill";

// Map data-file severity strings to our three-tier visual system.
function mapSeverity(raw: string): Severity {
  const s = raw.toLowerCase();
  if (s.includes("snarest") || s.includes("oppsøk")) return "now";
  if (s.includes("behandles") || s.includes("undersøk")) return "soon";
  return "watch";
}

const TIPS = [
  { num: "01", title: "Kaffe, brunost og tennene dine: ",            accent: "norsk kosthold og tannhelse.",  href: "/artikler" },
  { num: "02", title: "Munnskyll — når det hjelper og når du ",       accent: "kaster bort penger.",            href: "/artikler" },
  { num: "03", title: "Spyttets superkrefter: kroppens egen ",        accent: "tannbeskyttelse.",               href: "/artikler" },
] as const;

export function SymptomsAlmanac() {
  const top5 = symptoms.slice(0, 5);

  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <SectionEyebrow tone="paper" className="mb-4">
              Symptomer
            </SectionEyebrow>
            <h2 className="display-section max-w-[560px] text-[var(--color-text-primary)]">
              Hva er det egentlig — og hvor raskt bør du handle?
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase leading-[1.7] tracking-[0.28em] text-[var(--color-text-muted)] md:text-right">
            10 vanlige symptomer<br />
            Veiledning, ikke selvdiagnose
          </div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.2fr_1fr] lg:gap-9">
          {/* Symptom list */}
          <ul className="rounded-[var(--radius-tile)] bg-white ring-1 ring-[var(--color-rule)]">
            {top5.map((s, idx) => {
              const num = String(idx + 1).padStart(2, "0");
              const sev = mapSeverity(s.severity);
              return (
                <li key={s.slug + num} className="border-b border-[var(--color-rule)] last:border-b-0">
                  <Link
                    href={`/symptomer/${s.slug}`}
                    className="grid grid-cols-[36px_1fr_auto] items-center gap-5 px-5 py-4 transition-colors hover:bg-[var(--color-paper)]/70 md:px-6 md:py-5"
                  >
                    <span className="font-mono text-[10px] font-semibold text-[var(--color-urgent)] tracking-[0.1em]">
                      {num}
                    </span>
                    <span>
                      <span className="block font-sans text-[15px] font-medium tracking-[-0.01em] text-[var(--color-text-primary)]">
                        {s.title}
                      </span>
                      <span className="mt-0.5 block font-sans text-[12px] text-[var(--color-text-secondary)]">
                        {s.description.split(".")[0]}.
                      </span>
                    </span>
                    <SeverityPill severity={sev} />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Article tiles */}
          <div className="flex flex-col gap-3.5">
            {TIPS.map((t) => (
              <Link
                key={t.num}
                href={t.href}
                className="group rounded-[var(--radius-tile)] bg-white p-6 ring-1 ring-[var(--color-rule)] transition-shadow hover:shadow-[0_8px_30px_rgba(26,20,16,0.06)]"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-urgent)]">
                  Tips & råd · {t.num}
                </div>
                <div className="mt-2.5 font-sans text-[19px] font-medium leading-[1.2] tracking-[-0.018em] text-[var(--color-text-primary)]">
                  {t.title}
                  <span className="font-normal text-[var(--color-stone)]">{t.accent}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text-primary)]">
                  Les mer
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            href="/symptomer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-text-primary)] underline underline-offset-[6px] decoration-[var(--color-brass)] hover:decoration-[var(--color-text-primary)]"
          >
            Se alle symptomer
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/artikler"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-text-primary)] underline underline-offset-[6px] decoration-[var(--color-brass)] hover:decoration-[var(--color-text-primary)]"
          >
            Se alle artikler
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Compose, typecheck, visual check**

```tsx
import { Hero } from "@/components/home/Hero";
import { TreatmentsBento } from "@/components/home/TreatmentsBento";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsAlmanac } from "@/components/home/SymptomsAlmanac";

export default function Home() {
  return (
    <>
      <Hero />
      <TreatmentsBento />
      <TrustSection />
      <SymptomsAlmanac />
    </>
  );
}
```

```bash
npx tsc --noEmit
npm run dev
```

User confirms — five symptoms listed with severity pills, three article tiles right, the "Se alle…" links underneath.

- [ ] **Step 4: Stage**

```bash
git add src/app/page.tsx src/components/home/SymptomsAlmanac.tsx
```

---

## Task 15: Build the About Plate section (Section 05)

**Files:**
- Create: `src/components/home/AboutPlate.tsx`

Catalogue-style. Photo plate on the right (square corners, white frame, soft shadow, mono caption below). Left column has marker, headline, paragraph, and a 2×2 address/phone/hours/parking grid using `DataCell`.

- [ ] **Step 1: Create the file**

```tsx
// src/components/home/AboutPlate.tsx
import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { DataCell } from "@/components/ui/DataCell";
import { PlateCaption } from "@/components/ui/PlateCaption";

export function AboutPlate() {
  return (
    <section className="bg-[var(--color-paper-warm)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left: copy */}
          <div>
            <SectionEyebrow tone="paper" className="mb-5">
              Plate II — Klinikken
            </SectionEyebrow>
            <h2 className="display-section mb-5 text-[var(--color-text-primary)]">
              Et lite kontor, med tid til hver pasient.
            </h2>
            <p className="mb-7 max-w-[420px] text-[14px] leading-[1.65] text-[var(--color-text-secondary)]">
              Ringebu Tannlegesenter har holdt til midt i dalen siden 1985. Vi er et lite
              team som har valgt å bli her — fordi vi tror på å kjenne pasientene våre.
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 max-w-[400px]">
              <DataCell label="Adresse" value="Hanstadgata 2, Ringebu" />
              <DataCell label="Telefon"  value={<a href="tel:61280412">61 28 04 12</a>} />
              <DataCell
                label="Åpningstid"
                value={<><span className="block">Man – Tor · 08:00–15:30</span><span className="block">Fredag · 08:00–15:00</span></>}
              />
              <DataCell label="Parkering" value="Gratis ved klinikken" />
            </dl>
          </div>

          {/* Right: plate */}
          <figure className="flex flex-col gap-3">
            <div className="bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_50px_rgba(26,20,16,0.10)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/about-clinic.jpg"
                  alt="Eksteriør av Ringebu Tannlegesenter"
                  fill
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
            </div>
            <PlateCaption
              marker="Plate II."
              subject="Klinikken · Hanstadgata 2, Ringebu"
              origin="2026 · Norge"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
```

Notes:
- `dl/dd/dt` would be semantically richer but Tailwind grid is simpler; `DataCell` is rendered inside a `<dl>` for accessibility, with the label/value pair pattern conveyed visually.
- The hours value uses a fragment with two blocks because we have two distinct schedules (Mon-Thu vs Fri).

- [ ] **Step 2: Compose, typecheck, visual check**

Add to `src/app/page.tsx`:

```tsx
import { AboutPlate } from "@/components/home/AboutPlate";
// ...
<AboutPlate />
```

```bash
npx tsc --noEmit
npm run dev
```

User confirms — slightly deeper cream than neighboring sections, catalogue plate on the right with caption, address grid on the left with correct hours (08:00-15:30 weekdays, 08:00-15:00 Friday).

- [ ] **Step 3: Stage**

```bash
git add src/app/page.tsx src/components/home/AboutPlate.tsx
```

---

## Task 16: Build the CTA Close-out section (Section 06)

**Files:**
- Create: `src/components/home/CtaCloseout.tsx`

Dark cinematic. `clinic-valley.jpg` as background at brightness 60%. Bottom-aligned content: left has eyebrow + H2 + amber pill CTA; right has a 4-row hairline-separated contact grid.

- [ ] **Step 1: Create the file**

```tsx
// src/components/home/CtaCloseout.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const CONTACT_ROWS = [
  { label: "Tlf",     value: "61 28 04 12",              href: "tel:61280412" },
  { label: "E-post",  value: "post@ringebutann.no",      href: "mailto:post@ringebutann.no" },
  { label: "Adresse", value: "Hanstadgata 2, 2630 Ringebu" },
  { label: "Åpent",   value: "Man – Tor · 08:00 – 15:30 · Fre · 08:00 – 15:00" },
] as const;

export function CtaCloseout() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)]">
      <Image
        src="/images/clinic-valley.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_60%] brightness-[0.6] saturate-[0.95]"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pt-32 pb-14 md:pt-44 md:pb-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr] md:gap-10 lg:items-end">
          {/* Left */}
          <div>
            <SectionEyebrow tone="ink" withRule className="mb-5">
              Bestill en time
            </SectionEyebrow>
            <h2 className="font-sans text-[40px] font-semibold leading-[1] tracking-[-0.032em] text-white md:text-[54px]">
              Smilet ditt fortjener<br />
              <span className="font-light text-[var(--color-amber)]">litt mer tid.</span>
            </h2>
            <Link
              href="/kontakt"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-amber)] px-6 py-3 text-[13px] font-semibold tracking-[0.005em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-amber-deep)]"
            >
              Finn en ledig time
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Right: contact grid */}
          <ul className="text-[var(--color-text-on-dark)]">
            {CONTACT_ROWS.map((row) => (
              <li
                key={row.label}
                className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-t border-[var(--color-rule-dark)] py-3.5 last:border-b last:border-[var(--color-rule-dark)]"
              >
                <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                  {row.label}
                </span>
                <span className="text-[14px] font-medium tracking-[-0.01em]">
                  {row.href ? (
                    <a href={row.href} className="hover:text-[var(--color-amber)]">{row.value}</a>
                  ) : (
                    row.value
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Compose, typecheck, visual check**

```tsx
import { CtaCloseout } from "@/components/home/CtaCloseout";
// ...
<CtaCloseout />
```

```bash
npx tsc --noEmit
npm run dev
```

User confirms — valley photo darkened, eyebrow with brass rule, amber pill CTA, four contact rows. Footer renders directly below this section without visual collision.

- [ ] **Step 3: Stage**

```bash
git add src/app/page.tsx src/components/home/CtaCloseout.tsx
```

---

## Task 17: Final page.tsx composition

**Files:**
- Modify: `src/app/page.tsx` (now ~25 lines, composition only)

- [ ] **Step 1: Replace the file with the final composition**

```tsx
// src/app/page.tsx
import { Hero } from "@/components/home/Hero";
import { TreatmentsBento } from "@/components/home/TreatmentsBento";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsAlmanac } from "@/components/home/SymptomsAlmanac";
import { AboutPlate } from "@/components/home/AboutPlate";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function Home() {
  return (
    <main>
      <Hero />
      <TreatmentsBento />
      <TrustSection />
      <SymptomsAlmanac />
      <AboutPlate />
      <CtaCloseout />
    </main>
  );
}
```

The `<main>` element gives screen readers a single landmark for the page content. Footer (from `RootLayout`) renders below this main.

- [ ] **Step 2: Typecheck, lint, build**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

`npm run build` is run for the first time here. Expect: clean build. If it fails, the error message will point to a section component — fix in place, do not skip.

- [ ] **Step 3: Visual full-scroll check**

`npm run dev`. User scrolls top-to-bottom and confirms the full sequence matches the page-rhythm mockup: hero → bento → trust → symptoms → about → CTA → footer. Navbar swaps from dark to light at the bottom edge of the hero.

- [ ] **Step 4: Stage**

```bash
git add src/app/page.tsx
```

---

## Task 18: Hero entrance choreography (motion)

**Files:**
- Modify: `src/components/home/Hero.tsx`

Add the orchestrated mount animation defined in the spec's Motion section: image cross-fade, eyebrow fade-up, headline word-by-word, scroll cue + credits fade-in.

- [ ] **Step 1: Add framer-motion imports at the top of `Hero.tsx`**

```tsx
import { motion, useReducedMotion } from "framer-motion";
```

- [ ] **Step 2: Replace the eyebrow + headline + scroll cue + credits JSX with motion variants**

Inside the component, before the return, add:

```tsx
const prefersReduced = useReducedMotion();

const headlineWords1 = HEADLINE_LINE_1.split(" ");
const headlineWords2 = HEADLINE_LINE_2.split(" ");

const ease = [0.25, 0.1, 0.25, 1] as const;
```

Replace the image element with a `motion.div` wrapper that fades in + slightly scales down:

```tsx
<motion.div
  aria-hidden="true"
  className="absolute inset-0"
  initial={prefersReduced ? false : { opacity: 0, scale: 1.04 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease }}
>
  <Image
    src="/images/ringebutannMain.jpg"
    alt=""
    fill
    priority
    quality={85}
    sizes="100vw"
    className="object-cover object-[center_40%] saturate-[0.95] brightness-[0.82]"
  />
</motion.div>
```

Note: the photo now has empty `alt=""` because the visible content is the headline; the photo is decorative for screen readers. Move the descriptive alt onto the `aria-label` of the `<section>` if you want — already done in Task 11.

Wrap the title block in a `motion.div` and animate children:

```tsx
<motion.div
  className="absolute inset-x-[var(--container-px,24px)] bottom-16 z-10 max-w-[760px]"
  initial="hidden"
  animate="visible"
>
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.6, ease, delay: 0.3 }}
  >
    <SectionEyebrow tone="ink" className="mb-4">{EYEBROW}</SectionEyebrow>
  </motion.div>

  <h1 className="display-hero text-white">
    <span className="block overflow-hidden">
      {headlineWords1.map((w, i) => (
        <motion.span
          key={`l1-${i}`}
          className="mr-[0.25em] inline-block"
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 + i * 0.06 }}
        >
          {w}
        </motion.span>
      ))}
    </span>
    <span className="block overflow-hidden font-light text-[var(--color-amber)]">
      {headlineWords2.map((w, i) => (
        <motion.span
          key={`l2-${i}`}
          className="mr-[0.25em] inline-block"
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.7 + i * 0.06 }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  </h1>
</motion.div>
```

Wrap the scroll cue and credits in `motion.div`s with the same easing, delayed to `0.9s`:

```tsx
<motion.div
  className="absolute left-[var(--container-px,24px)] bottom-6 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50"
  initial={prefersReduced ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.9, ease }}
>
  <span aria-hidden="true" className="inline-block h-px w-5 bg-white/40" />
  <span>Bla ned</span>
</motion.div>

<motion.div
  className="absolute right-[var(--container-px,24px)] bottom-7 z-10 hidden text-right font-mono text-[10px] uppercase leading-[1.7] tracking-[0.18em] text-white/55 sm:block"
  initial={prefersReduced ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.9, ease }}
>
  <div className="font-semibold text-white/85">Ringebu, NO</div>
  <div>Tannhelse · Etablert 1985</div>
</motion.div>
```

When `prefersReduced` is true, `initial={false}` tells framer-motion to render the final state without animation.

- [ ] **Step 3: Typecheck and visual check**

```bash
npx tsc --noEmit
npm run dev
```

User refreshes `http://localhost:3000`. Expected: photo cross-fades in over ~1.2s while subtly de-zooming. Eyebrow fades up at 300ms. Headline reveals word-by-word starting at 500ms. Scroll cue + credits fade in at ~900ms. Total entrance ≈ 1.7s.

Then user opens System Settings → Accessibility → Display → Reduce Motion (or DevTools rendering tab → Emulate CSS media → `prefers-reduced-motion: reduce`) and refreshes. Expected: hero appears in its final state instantly, no animation.

- [ ] **Step 4: Stage**

```bash
git add src/components/home/Hero.tsx
```

---

## Task 19: Section scroll-in reveals + reduced-motion respect

**Files:**
- Modify: `src/components/home/TreatmentsBento.tsx`
- Modify: `src/components/home/TrustSection.tsx`
- Modify: `src/components/home/SymptomsAlmanac.tsx`
- Modify: `src/components/home/AboutPlate.tsx`
- Modify: `src/components/home/CtaCloseout.tsx`
- Create: `src/components/ui/RevealOnScroll.tsx` (new helper)

We add a single reusable `RevealOnScroll` helper that wraps a child, fades it up on first intersection, then never animates again. Reduced-motion users get the final state immediately.

- [ ] **Step 1: Create the helper**

```tsx
// src/components/ui/RevealOnScroll.tsx
"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function RevealOnScroll({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Wrap each section's top-level content with `RevealOnScroll`**

In each of the five section components, wrap the outer-most content `div` (the one inside the `<section>` containing the container) with `<RevealOnScroll>...</RevealOnScroll>`. Example for `TrustSection.tsx`:

```tsx
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// inside the section, replace the wrapper:
<RevealOnScroll>
  <div className="relative mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
    {/* ...existing content... */}
  </div>
</RevealOnScroll>
```

Do the same for `TreatmentsBento`, `SymptomsAlmanac`, `AboutPlate`, and `CtaCloseout`. **Do not** wrap individual tiles inside the bento or symptom list — that creates a stagger but also a lot of stutter on slower devices. One reveal per section is enough.

- [ ] **Step 3: Typecheck and visual check**

```bash
npx tsc --noEmit
npm run dev
```

User scrolls down and confirms each section gently fades up on entry, only once. With reduced-motion on, sections appear in place without animation.

- [ ] **Step 4: Stage**

```bash
git add src/components/ui/RevealOnScroll.tsx src/components/home/*.tsx
```

---

## Task 20: Responsive audit + accessibility review

**Files:** No new files. This is a verification + small-fix task.

- [ ] **Step 1: Resize check**

`npm run dev`. User opens DevTools device toolbar and checks these widths:

- 375px (iPhone SE)
- 393px (iPhone 14 Pro)
- 768px (iPad portrait)
- 1024px
- 1280px+

Expected at each: no horizontal scroll, no overlapping content, hero credits hidden under 640px, bento collapses to single column under 768px, hours grid wraps cleanly under 600px.

If any width has a bug, fix it inline by tightening the responsive classes in the relevant component (typically `md:` and `lg:` prefixes) and re-check.

- [ ] **Step 2: Keyboard navigation**

`npm run dev`. User tabs through the page from top to bottom. Expected:
1. Skip-link is not currently present — that is a pre-existing gap; not adding it in this redesign.
2. Brand link is first tab stop.
3. Each desktop nav link gets a visible focus ring.
4. CTA pill gets a focus ring.
5. Each tile in bento and symptom list is reachable and focusable.
6. Each CTA close-out contact link is reachable.

If any focusable element has no visible focus indicator, add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-amber)]` (on dark sections) or `outline-[var(--color-text-primary)]` (on light) directly in the component.

- [ ] **Step 3: Contrast spot-check**

Run a Lighthouse audit in DevTools → Lighthouse → Accessibility on the homepage. Expected: score ≥ 95.

If contrast warnings appear (most likely on `--color-text-on-dark-muted` over `--color-ink-warm`), lighten the muted color from `rgba(245,233,203,0.55)` to `rgba(245,233,203,0.7)` in `globals.css`. Re-check.

- [ ] **Step 4: Image alt text audit**

Search for all `<Image` and `<img` in `src/components/home/*.tsx`:

```bash
grep -n "<Image\|<img" src/components/home/*.tsx
```

Confirm:
- Hero photo has empty `alt=""` (decorative, headline carries content)
- Bento feature photo has empty `alt=""` (decorative, tile content carries meaning)
- About plate photo has a descriptive alt: `"Eksteriør av Ringebu Tannlegesenter"`
- CTA close-out photo has empty `alt=""`

Fix any that don't match.

- [ ] **Step 5: Stage any fixes**

```bash
git status
git add -A src/components src/app/globals.css
```

---

## Task 21: Final user review → user authorizes commit

**Files:** None changed in this task. This is the gating step.

- [ ] **Step 1: Production build sanity check**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

All three must pass. If any fail, fix at the source and re-run before continuing.

- [ ] **Step 2: Present the final running product to the user**

```bash
npm run dev
```

Tell the user (paste this exactly into the chat):

> "The full redesign is running at http://localhost:3000. Please scroll through the homepage top-to-bottom, then visit `/kontakt` to confirm the navbar light-mode and footer look right on inner pages too. Tell me anything that needs to change before we commit. Per your saved preference, I'm holding all commits until you give the word."

- [ ] **Step 3: Iterate on feedback (loop if needed)**

If the user requests changes, address them in additional ad-hoc tasks (not numbered in this plan). Each change goes through: typecheck → user visual confirm → `git add`. No commit yet.

- [ ] **Step 4: Ask the user how to commit**

Once the user says the result is ready, ask them this verbatim:

> "Ready to commit. Do you want this as one commit, or split by foundation / chrome / sections / motion? I will not include 'Claude' or AI-generated references in any commit message."

- [ ] **Step 5: Commit per user direction**

Use Conventional Commits format. Example single-commit message:

```
feat(home): cinematic editorial homepage redesign + Geist global chrome

- New palette tokens (ink/paper/amber/brass/stone) replacing terracotta/espresso
- Geist + Geist Mono via next/font, retire Fraunces and DM Sans
- Homepage rebuilt: cinematic hero, editorial bento, three credentials,
  symptoms almanac, catalogue-plate about section, dark CTA close-out
- Navbar with dark/light variant; mode auto-switches on hero scroll
- Footer rewritten as ink chrome
- Inner pages inherit new tokens via legacy aliases; layouts unchanged
- All entrance animations respect prefers-reduced-motion

Spec: docs/superpowers/specs/2026-05-19-cinematic-homepage-redesign.md
Plan: docs/superpowers/plans/2026-05-19-cinematic-homepage-redesign.md
```

```bash
git commit -m "$(cat <<'EOF'
<message here>
EOF
)"
git status
```

Do not push. The user pushes when they want.

---

## Self-Review Notes (run before handoff)

Checked against the spec — every section and token has at least one task:

| Spec requirement | Implemented in |
|---|---|
| Geist + Geist Mono fonts | Task 2 |
| Palette tokens (ink/paper/amber/brass/stone/urgent) | Task 3 |
| Type scale utilities (`display-hero`, `eyebrow`, etc.) | Task 3 |
| `SectionEyebrow`, `GrainOverlay`, `PlateCaption`, `DataCell`, `SeverityPill` | Tasks 4–8 |
| Footer (ink chrome, 4 cols, no coords) | Task 9 |
| Navbar (dark/light variant, scroll-triggered switch, 5 links, no Nyttig info) | Task 10 |
| Hero (full-bleed photo, vignette, grain, "Tannhelse, slik den burde være.", credits, scroll cue) | Tasks 11 & 18 |
| Treatments bento (feature + 5 tiles, 12-col grid, dark featured) | Task 12 |
| Trust (no testimonial, 3 editorial credentials, brand statement) | Task 13 |
| Symptoms almanac (5 symptoms, severity pills, 3 article tiles) | Task 14 |
| About plate (catalogue caption, real address, real hours) | Task 15 |
| CTA close-out (dark valley photo, contact rows, amber pill CTA) | Task 16 |
| Hero entrance choreography (image, eyebrow, word-by-word headline, scroll cue + credits) | Task 18 |
| Section reveal on scroll, reduced-motion respect | Task 19 |
| Responsive at 375/393/768/1024/1280 | Task 20 |
| A11y (alt text, contrast, focus rings) | Task 20 |
| Delete .bak files | Task 1 |
| No git commits until user approves | Task 21 |

No "TBD" or "implement later" anywhere in the plan. All section components have complete code. All type names (`Severity`, `Tone`, `Mode`, `Hero`, `TreatmentsBento`, etc.) are consistent across tasks where they appear.

The one cross-task contract: Hero dispatches `ringebu:hero-enter` / `ringebu:hero-exit` window events; Navbar listens for them. This is the only piece of inter-component coupling and it lives in Tasks 10 and 11.

---

**End of plan.**

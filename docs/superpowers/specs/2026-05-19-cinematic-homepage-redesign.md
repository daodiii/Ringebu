# Cinematic Homepage Redesign — Ringebu Tannlegesenter

**Date:** 2026-05-19
**Status:** Approved (pending user review of this spec)
**Scope:** Homepage redesign + global chrome (navbar, footer, design tokens, typography)

## Problem

The current site uses a warm terracotta/espresso palette with Fraunces serif headings. The client looked at the result and was not satisfied — it reads as a competent-but-generic premium-clinic template that exists on hundreds of dental sites. There is no sense of place, no creative confidence, no "wow" moment. Multiple previous redesigns (Nordic Slate, Warm Palette, Soft Palette) were specified but did not land. The brief: start over, be creative, deliver a beautiful and unmistakably professional homepage that reads as the work of a clinic that knows what it is doing.

## Direction

**Cinematic Editorial — Nordic edition.**

Inspired by film poster typography, Phaidon-quality photography treatment, and the cartographic restraint of Snøhetta. The hero is a single full-bleed cinematic photograph with confident Geist typography overlaid; the rest of the page alternates dark "screen" sections with cream "page" sections, magazine-spread style. Every section has a clear job; nothing is decorative.

### Reference Brands

- **Aesop, Loro Piana, Sanity** — editorial restraint and confident typography
- **Snøhetta, Vipps, Norse Projects** — sense of place, slate + warm accent, monumental scale
- **Stripe Press, Phaidon, MIT Press** — book-quality plates, cartographic detail, Geist Mono labels for data
- **Linear** — micro-interactions and discipline, used sparingly

## Scope

### In Scope (this redesign)

1. **Homepage** (`src/app/page.tsx`) — full structural rewrite
2. **Global navigation** (`src/components/Navbar.tsx`) — adapts for dark/light backgrounds
3. **Global footer** (`src/components/Footer.tsx`) — ink/dark variant
4. **Design tokens** (`src/app/globals.css`) — new palette, new font stack, new spacing/radius scale
5. **Typography** — adopt Geist + Geist Mono via `next/font/google`, retire Fraunces and DM Sans
6. **Hero supporting components** — vignette, grain texture, scroll cue, credit overlay

### Out of Scope (future work)

- `behandlinger`, `symptomer`, `informasjon`, `kontakt`, `priser`, `artikler` page layouts — these pages will inherit the new tokens, fonts, and chrome automatically but keep their existing internal layouts until a follow-up redesign
- New photography commission (we use existing assets in `public/images/`)
- CMS integration / dynamic content
- Booking system integration (CTA links to phone for now)

## Design Tokens

### Color Palette

Replace the entire `@theme inline` token set in `src/app/globals.css`. Old tokens are removed, not deprecated.

| Token | Value | Purpose |
|---|---|---|
| `--color-ink` | `#0A0A0A` | Hero background base, footer, deep close-out section |
| `--color-ink-warm` | `#0F0B07` | Warmer ink for trust/quote section — has a brown undertone |
| `--color-paper` | `#F5F0E6` | Default page background, cream sections (treatments, symptoms) |
| `--color-paper-warm` | `#EFE8DA` | Slightly deeper cream — used for the About / catalogue-plate section to differentiate from neighbors |
| `--color-amber` | `#F5E9CB` | The "tungsten light" accent — used for headline accent words, primary CTA on dark, eyebrow labels on dark |
| `--color-amber-deep` | `#E8C58C` | Stronger amber — single tile in treatments, light pull-quote highlight |
| `--color-brass` | `#B8945C` | Used for thin lines, eyebrow rules, footer category labels |
| `--color-stone` | `#8B6F4A` | Headline accent on light (italic-substitute, since Geist has no italic personality) |
| `--color-text-primary` | `#1A1410` | Body & headline text on cream |
| `--color-text-secondary` | `#4A3F33` | Secondary text on cream |
| `--color-text-muted` | `#8B7C6A` | Mono labels, captions |
| `--color-text-on-dark` | `#F5E9CB` | Primary text on ink (warm tungsten) |
| `--color-text-on-dark-muted` | `rgba(245,233,203,0.55)` | Secondary text on ink |
| `--color-rule` | `rgba(26,20,16,0.12)` | Hairline rules on light |
| `--color-rule-dark` | `rgba(245,233,203,0.18)` | Hairline rules on dark |
| `--color-urgent` | `#B8624A` | Severity-now badge ("Oppsøk nå") and numbered annotations |

There is **no purple, no blue, no green** in this palette. The system is intentionally limited to warm neutrals + a single tungsten/amber accent + one urgent terracotta for severity.

### Typography

```ts
// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
```

| Token | Family | Use |
|---|---|---|
| `--font-sans` | Geist | All body and headlines |
| `--font-mono` | Geist Mono | All eyebrow labels, captions, data, severity pills, coordinates |

Retire Fraunces and DM Sans completely — remove the imports.

#### Type Scale

| Class | Family / Weight | Size (desktop / mobile) | Tracking | Use |
|---|---|---|---|---|
| `display-hero` | Geist 700 | 64–72px / 38–44px | -0.035em | Hero h1 |
| `display-section` | Geist 500 | 44–52px / 32–36px | -0.030em | Section h2 |
| `display-quote` | Geist 300 | 38–44px / 26–30px | -0.028em | Pull-quote in Trust section |
| `body-large` | Geist 400 | 17px / 16px | -0.012em | Hero subline, important paragraphs |
| `body` | Geist 400 | 14px / 14px | -0.005em | Default body |
| `body-small` | Geist 400 | 13px / 13px | 0 | Tile copy, captions |
| `eyebrow` | Geist Mono 500 | 10px | 0.4em uppercase | Section eyebrows, "Vol. I — Velkommen" |
| `data-label` | Geist Mono 500 | 9.5px | 0.25em uppercase | Almanac labels, plate captions |
| `data-value` | Geist 500/600 | 13–14px | -0.01em | Almanac values, address, phone |
| `mega` | Geist 800 | 132px / 84px | -0.05em | Reserved — not used on homepage; available for inner pages |

**No italic.** Geist's italic does not have the personality Fraunces did. Use weight contrast (300 vs 700) and color shift (`--color-stone` or `--color-amber`) where the old design would have used italic accent words.

### Radius & Spacing

```css
--radius-tile: 14px;     /* Treatment tiles, article cards, symptom list */
--radius-pill: 999px;    /* Buttons, severity badges */
--radius-frame: 0;       /* Catalogue plates — square corners, like a printed plate */
--radius-inset: 6px;     /* Atlas-style inset frames (only used in inner pages later) */

--space-section: clamp(72px, 8vw, 100px);  /* Vertical padding between sections */
--space-section-tight: clamp(60px, 6vw, 80px);
--container-px: clamp(20px, 4vw, 36px);     /* Horizontal padding */
--container-max: 1280px;
```

### Motion

`framer-motion` is already a dependency — keep it.

**Principles**
- One orchestrated entrance per page load (hero). Everything else animates on scroll-in, once.
- Easing: `[0.25, 0.1, 0.25, 1]` ("powerful but quiet" — cinematic, never bouncy).
- No parallax. No infinite scroll-tied animations after the first reveal.
- Respect `prefers-reduced-motion`: skip all entrance animations, render final state immediately.

**Hero entrance choreography (single sequence, on mount)**
1. `t=0ms`: photo cross-fades in from black at 80% brightness, scale 1.04 → 1.00 over 1200ms
2. `t=300ms`: eyebrow fades up 12px, 600ms
3. `t=500ms`: headline reveals word-by-word with 60ms stagger, 700ms each — line 1 first, line 2 with 200ms delay
4. `t=900ms`: scroll cue and credits fade in, 500ms
5. Nav already visible (renders without animation)

**Section reveal**
- Each section below the hero uses `useInView({ once: true, margin: "-80px" })` and fades up `y: 32 → 0, opacity: 0 → 1` over 700ms.
- Section children stagger 80ms apart only inside the bento grid and the symptom list.

## Page Architecture

The homepage renders these sections in order, top to bottom:

```
<Hero />                  // 01 — Dark cinematic full-bleed photo
<TreatmentsSection />     // 02 — Cream editorial bento (12-col)
<TrustSection />          // 03 — Dark, single pull-quote + 3 credentials
<SymptomsSection />       // 04 — Cream almanac list + 3 article tiles
<AboutSection />          // 05 — Catalogue plate (slightly warmer cream)
<CtaSection />            // 06 — Dark cinematic close-out
<Footer />                // 07 — Deep ink (global chrome — rendered from RootLayout, not page.tsx)
```

Light/dark rhythm: **dark → cream → dark → cream → cream-warm → dark → ink**. Five transitions of contrast across one scroll.

### Section 01 — Hero

- Full-bleed `aspect-ratio: 16/9` on desktop, `min-height: 90vh` to match current; `min-height: 100svh` on mobile
- Photo: `ringebutannMain.jpg`, `object-position: center 40%`, `filter: brightness(0.82) saturate(0.95)`
- Two stacked overlays: a vignette gradient (`linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 38%, transparent 60%)` + a bottom-up `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 28%, transparent 70%, rgba(0,0,0,0.65) 100%)`)
- A noise grain SVG overlay at 6% opacity, `mix-blend-mode: overlay`
- Headline (Geist 700, 64–72px on desktop): **"Tannhelse, slik den burde være."** Renders on two lines: line 1 "Tannhelse," in white weight 700; line 2 "slik den burde være." in `--color-amber` weight 300 as the accent. Comma at end of line 1 stays white weight 700.
- Eyebrow: **"Vol. I — Velkommen"** in Geist Mono
- Lower-right "credits" block (2 lines, Geist Mono 10px, 0.18em tracking):
  ```
  Ringebu, NO
  Tannhelse · Etablert 1985
  ```
- Lower-left scroll cue: a 22px hairline followed by **"Bla ned"** in Geist Mono
- No image on the right, no card overlay, no two-column hero — the photo is the hero
- Nav sits transparent on top of the photo, with a `--color-amber` "Bestill time" CTA pill

### Section 02 — Behandlinger

- Background: `--color-paper`
- Header row: H2 left ("Skreddersydde løsninger for ditt smil." with "ditt" in `--color-stone` weight 300), 3-line mono metadata right ("06 fagområder / Alle aldre / HELFO direkte oppgjør")
- 12-column bento grid, 14px gap, 180px base row:
  - **Feature tile** (col-span-6, row-span-2): dark `--color-ink` background with `clinic-instruments.jpg` at 55% opacity behind it. Headline: "Den enkleste timen er den du tar i tide." Body: "Kontroll, rens, fluor & veiledning — i ro." Eyebrow: "01 — Forebyggende"
  - **Tall tile** (col-span-3, row-span-2): `--color-amber-deep` background, "02 — Generell tannbehandling — Fyllinger, kroner, broer"
  - **Tall tile** (col-span-3, row-span-2): white, "03 — Akutt tannhjelp — Hurtig vurdering, samme dag"
  - **Wide tile** (col-span-6): white, "04 — Estetisk — Bleking & estetikk"
  - **Normal tile** (col-span-3): white, "05 — Implantater"
  - **Normal tile** (col-span-3): white, "06 — Rotbehandling"
- Each tile is a link to `/behandlinger`. Hover: subtle lift `translateY(-2px)` + shadow.

### Section 03 — Trygghet (Trust)

No testimonial. No quote. No fabricated patient voice. The section asserts trust through verifiable facts only — clinic credentials presented at editorial scale.

- Background: `--color-ink-warm` with the same 5% grain overlay used in hero
- Eyebrow rule: 28px-wide brass hairline + "Trygghet & kvalitet" in Geist Mono
- A short brand-voice statement (Geist 500, 32px on desktop, max-width ~620px): *"Tre konkrete grunner til at tannhelsen din er trygg hos oss."* — this introduces the credentials below, no italic, no accent color, just calm typography
- Three credentials presented as full editorial statements, stacked vertically on desktop (not a thin row), separated by hairlines (`--color-rule-dark`):
  - **01 / Medlem** — *Den norske tannlegeforening (NTF).* Geist 500 24px. Below it, one Geist 14px subline in muted amber: "Etiske retningslinjer, kontinuerlig etterutdanning, kvalitetssikret praksis."
  - **02 / Refusjon** — *Direkte oppgjør med HELFO.* Sub: "Du betaler kun egenandelen. Vi sender refusjonskravet på dine vegne."
  - **03 / Erfaring** — *Praksis i Gudbrandsdalen siden 1985.* Sub: "Over fire tiår i samme dal — vi kjenner pasientene våre."
- Each credential row is full-width on desktop (no two-column squeeze) so each statement gets the breathing room it deserves.

### Section 04 — Symptomer + Tips

- Background: `--color-paper`
- Header: H2 ("Hva er det egentlig — og hvor raskt bør du handle?") + Mono meta ("10 vanlige symptomer / Veiledning, ikke selvdiagnose")
- Two-column layout (`1.2fr 1fr`):
  - **Left:** white rounded list of 5 most-common symptoms from `src/data/content.ts`. Each row: numbered Mono index (01–05), name + sub-description (small text), severity pill on the right.
    - Severity pills (Geist Mono 9.5px, 0.15em tracking, uppercase):
      - `Oppsøk nå` — background `--color-urgent`, text paper
      - `Undersøk` — background `--color-amber-deep`, text `#6B4F2C`
      - `Følg med` — background `rgba(26,20,16,0.08)`, text secondary
  - **Right:** 3 article tiles, each with Mono label ("Tips & råd · 01") and Geist 500 19px title. Each title uses one accent word in `--color-stone` weight 400 to break monotone.
- A "Se alle symptomer →" link at the bottom-left of the list, "Se alle artikler →" at the bottom-right of the article column.

### Section 05 — Om oss (About / Catalogue Plate)

- Background: `--color-paper-warm` (slightly deeper than neighbors to mark it)
- Two-column layout (`1fr 1.1fr`):
  - **Left:** Mono marker "Plate II — Klinikken". H2 "Et lite kontor, med tid til hver pasient." Body paragraph (existing copy). Then a 2×2 grid of address / phone / opening hours / parking with Mono labels.
  - **Right:** a "plate" — white framed photo of `about-clinic.jpg` with no border-radius (square corners), aspect ratio 4:3, soft shadow underneath. Below the plate, a 3-column Geist Mono caption row: "Plate II." / "Klinikken · Hanstadgata 2, Ringebu" / "2026 · Norge"

### Section 06 — Kontakt CTA close-out

- Full-bleed dark section, ~460px tall, `clinic-valley.jpg` as background at brightness 60%
- Top-fading veil: `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.75) 100%)`
- Two-column bottom-aligned content (`1.4fr 1fr`):
  - **Left:** Mono eyebrow with brass rule ("Bestill en time"). H2 "Smilet ditt fortjener litt mer tid." (Geist 600, 54px; "litt mer tid" in amber weight 300.) Pill button below: "Finn en ledig time →" with amber background, ink text.
  - **Right:** 4-row contact grid with hairline-separated rows: Tlf / E-post / Adresse / Åpent. Mono labels left, Geist values right.

### Section 07 — Footer (global chrome)

- Background: `--color-ink` (deeper than the close-out CTA so the boundary reads)
- Four-column grid (`1.4fr 1fr 1fr 1fr`):
  - **Col 1:** Brand mark ("Ringebu Tannlegesenter" Geist 600 + Mono small "Gudbrandsdalen · siden 1985"), short tagline below
  - **Col 2 — Behandling:** Forebyggende / Generell / Akutt / Estetisk / Implantater
  - **Col 3 — Praktisk:** Priser / Symptomer / Tips & råd / Slik finner du oss
  - **Col 4 — Kontakt:** Phone / Email / Address / City
- Bottom strip below a hairline: copyright left, brief tagline right ("Tannhelse · Gudbrandsdalen"), all Geist Mono

## Global Chrome

### Navigation (`src/components/Navbar.tsx`)

- Sticky top, padding `18px 36px`
- Two modes via a prop `variant: "dark" | "light"`:
  - On the homepage hero, it renders in **dark** mode: transparent background, paper-amber text. As the user scrolls past the hero, the navbar transitions to a **light** mode with a paper background and ink text (smooth `transition-colors` 200ms, triggered by an intersection observer on the hero element).
  - On all other pages, navbar starts in **light** mode by default.
- Left: brand mark — "Ringebu Tannlegesenter" Geist 600 14px, with "Gudbrandsdalen · siden 1985" in Mono 9px underneath.
- Center: 5 links — `Behandlinger`, `Symptomer`, `Priser`, `Om oss`, `Kontakt`. (Remove the current Nyttig info dropdown.)
- Right: "Bestill time" pill button. In **dark** mode: amber background (`--color-amber`), ink text. In **light** mode: ink background, amber text. Both modes use the same shape and label, only the color swaps.
- Mobile: hamburger → full-screen overlay; same content, mono caps. Same dark/light variants apply.

### Footer

Footer is the same on every page (defined in Section 07 above).

## Responsive Behavior

Three breakpoints: ≥1024px (full layout), 640–1023px (two-col grids collapse to single col, hero photo recenters, type drops one step), <640px (mobile — hero `min-h: 100svh`, all sections stack, no bento grid — treatments become a vertical list of full-width cards).

The catalogue plate and the cinematic credits block both collapse below their main content on mobile rather than to a side column.

## Content Notes

- **Hero headline**: locked to "Tannhelse, slik den burde være." (Authoritative tone — quietly raises the bar without arrogance). Replaces the current "Vi tar vare på smilet ditt."
- **No fake testimonials.** See Section 03 content gate.
- **No coordinates anywhere** — the Atlas/cartographic flavor is dropped from this design. Hero credits show "Ringebu, NO" + "Tannhelse · Etablert 1985" only. Footer bottom strip shows copyright + "Tannhelse · Gudbrandsdalen".
- All Norwegian copy is preserved from current content where the section maps cleanly; new microcopy ("Bla ned", "Vol. I — Velkommen", "Plate II", almanac labels) is introduced.

## Component Boundaries

Each section gets its own component file under `src/components/home/`:

```
src/components/home/
  Hero.tsx
  TreatmentsBento.tsx
  TrustSection.tsx
  SymptomsAlmanac.tsx
  AboutPlate.tsx
  CtaCloseout.tsx
```

The page `src/app/page.tsx` becomes a thin composition that imports the seven section components and renders them in order. The current 850-line `page.tsx` is replaced.

Shared subcomponents introduced under `src/components/ui/`:

```
SectionEyebrow.tsx       // mono label with optional rule
PlateCaption.tsx         // 3-col mono caption used by Hero credits, About plate
DataCell.tsx             // mono label + geist value (almanac, address grid)
SeverityPill.tsx         // for symptom list
GrainOverlay.tsx         // SVG noise texture for dark sections
```

## Files Touched

```
src/app/layout.tsx               // Geist + Geist Mono fonts, body class
src/app/globals.css              // Full token rewrite — replaces existing palette/typography tokens
src/app/page.tsx                 // Full rewrite, ~120 lines (composition only)
src/components/Navbar.tsx        // Variant prop, mode-switching on scroll
src/components/Footer.tsx        // Rewrite with new chrome
src/components/home/*            // 6 new section components
src/components/ui/*              // 5 new shared subcomponents
src/data/content.ts              // No changes needed (consume existing treatments + symptoms arrays)
```

The current `.bak` files in the repo (`page.tsx.bak`, `Footer.tsx.bak`, `Navbar.tsx.bak`, `layout.tsx.bak`, `globals.css.bak`) should be deleted as part of this work — they are stale.

## Verification

- Visual: must match the page-rhythm mockup committed in this brainstorm session
- Accessibility: every interactive element keyboard-focusable, all images have alt text (decorative ones explicit empty alt), color contrast checked on dark sections (Geist 700 #FFF on #0A0A0A passes; amber #F5E9CB on #0A0A0A passes; muted amber on ink passes AA for non-text)
- Performance: hero photo lazy-loaded with `priority` + `quality={85}`, AVIF/WebP via Next Image, LCP target <2.5s on 3G
- Reduced motion: all entrance animations skip when `prefers-reduced-motion: reduce`
- Mobile: tested at iPhone SE (375px), iPhone 14 Pro (393px), iPad portrait (768px), MacBook (1280px+)

## Resolved Decisions (during brainstorm)

1. **Hero headline:** "Tannhelse, slik den burde være." — authoritative tone, line 1 white weight 700, line 2 amber weight 300.
2. **Trust section:** No testimonial, no quote, no fake citation. Three editorial credentials (NTF / HELFO / experience), introduced by a generic brand-voice statement.
3. **Coordinates:** Dropped entirely. No cartographic flavor in hero credits or footer.
4. **Navbar links:** Confirmed — Behandlinger / Symptomer / Priser / Om oss / Kontakt. The current "Nyttig info" dropdown is dropped.

## Future Work (explicitly not in this redesign)

A follow-up redesign will roll this design language into:
- `/behandlinger`, `/symptomer`, `/informasjon`, `/kontakt`, `/priser`, `/artikler`
- Article detail pages
- Possibly new photography commissioned for the clinic

Each of those gets its own brainstorm + spec + plan when prioritized.

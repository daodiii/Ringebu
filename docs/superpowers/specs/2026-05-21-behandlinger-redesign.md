---
title: /behandlinger redesign — editorial spreads on the cinematic palette
date: 2026-05-21
status: approved
---

# /behandlinger redesign

Bring the treatments page in line with the cinematic homepage redesign. Same content as today (9 treatments, all the existing copy, features, and prices), reshaped into an editorial magazine flow on the petrol / cream / brass / copper palette.

## Why this redesign

The current page (`src/app/behandlinger/page.tsx`, ~915 lines) was built before the cinematic homepage redesign. It uses the old palette (`--color-primary`, purple gradients, blur orbs), mixes four different presentation modes (image bands, compact cards, editorial layout, filtered grid), and has sticky category tabs that don't match the calm editorial direction of the rest of the site. After the homepage redesign, this page feels like a different product.

## Decisions taken during brainstorm

- **Body layout: editorial spreads.** Every treatment in the current data set becomes a full-bleed section, photo + content alternating sides. Approved over index+sticky-detail, vertical accordion, and vertical slipcase.
- **Hero: photo-anchored.** Full-bleed clinic photo with petrol gradient overlay, title anchored bottom-left. Approved over petrol hero and cream editorial header.
- **Navigation: no tabs.** Pure scroll through all 9 spreads. Approved over category filters and a quiet table-of-contents index.

## Page structure

```
Hero (photo-anchored, ~75vh)
└── Eyebrow + display title + subline, bottom-left anchored

Treatment spread 01 (photo left)
Treatment spread 02 (photo right)
Treatment spread 03 (photo left)
... (alternating, 9 total)

CtaCloseout (reuse homepage component)
└── Valley photo + copper "Bestill time" CTA
```

No additional sections. The page is hero → 9 spreads → CTA closeout.

## Hero

Full-bleed `<section>` with `min-h-[75vh]`, `position: relative`, `isolate`, `overflow-hidden`.

- Background: `<Image src="/images/ringebutannMain.jpg" fill priority>` with `object-cover`, `object-position: center 45%`, `brightness-[0.55]` `saturate-[0.92]`.
- Gradient overlay: `linear-gradient(180deg, rgba(14,42,48,0.55) 0%, rgba(14,42,48,0.20) 35%, rgba(8,32,37,0.85) 100%)`.
- Content container anchored to the bottom of the viewport (`flex-col justify-end`), max-width matches site container.
- Eyebrow: brass mono, with the brass hairline rule — "Inne i klinikken".
- Title: Geist 200, `clamp(56px, 8vw, 128px)`, `letter-spacing: -0.045em`, `line-height: 0.92`. Body text "Behandlinger" in amber, period in copper. `text-shadow: 0 2px 24px rgba(0,0,0,0.4)` to keep contrast over busy areas of the photo.
- Subline: amber at 92% opacity, 18px, line-height 1.55, max-width `48ch` — "Seks fagområder, ett team, ett rom uten hastverk."

## Editorial spread (one per treatment)

A single component `TreatmentSpread` that takes a `Treatment` + an `index` and renders the full section. The `index` determines alternation (`index % 2 === 1` flips the photo to the right).

### Layout

- `<section>` on cream paper, `padding: 80px 36px` (responsive), `border-top: 1px solid var(--color-brass)/0.32` between sections.
- Container max-width 1180px.
- 2-column grid `1fr 1fr`, `gap: 64px`, `align-items: center`.
- Alternation: the first spread (`index === 0`, treatment "01") has the photo on the **left**. Every spread where `index % 2 === 1` flips: photo on the **right**. Implement by setting `direction: rtl` on the grid container for flipped rows, then `direction: ltr` on each child. No media-query gymnastics.
- Mobile: collapse to a single column, photo first, content below — independent of alternation.

### Photo column

- `aspect-ratio: 4/5`.
- Real treatment photo (see "photos" section below).
- Small mono caption overlaid bottom-left: the treatment's category (e.g., "Forebyggende"), 10px mono, 0.22em tracking, 75% opacity.

### Content column

In order:

1. **Eyebrow line.** Mono 10px, 0.28em tracking, brass. Format: `{idx} · {subtitle}`. Example: `01 · Grunnlaget for god tannhelse`.
2. **Headline.** Geist 300, `clamp(36px, 4vw, 56px)`, `letter-spacing: -0.03em`, `line-height: 1.02`. The treatment title.
3. **Meta row.** Refusjon chip + duration label, in a flex row with `gap: 16px`, margin-top 18px.
4. **Description.** 16px, line-height 1.65, ink-muted, `max-width: 52ch`, margin-top 24px.
5. **Features list.** Bulleted, brass dot (4×4px), 14px text. `display: flex; flex-direction: column; gap: 8px`, margin-top 28px.
6. **Price table** (only if `treatment.prices.length > 0`). Top brass hairline divider, then a list of rows with `display: flex; justify-content: space-between`. Name in ink, description in mono ink-faint. Margin-top 32px.
7. **CTA.** Copper pill button "Bestill time ↗", margin-top 36px. Reuse the homepage CTA's exact styling.

### Refusjon chip

Three states, colour-coded:

| `refusion`       | Border + dot + text | Meaning                                |
|------------------|---------------------|----------------------------------------|
| `HELFO`          | sage `#6B8278`      | full HELFO refund                      |
| `Delvis HELFO`   | brass `#B8945C`     | partial HELFO refund                   |
| `Egenandel`      | copper `#C97A5B`    | patient pays out of pocket             |

Chip uses an outline (1px border at 40% opacity of the colour), a 5px dot at full colour, mono uppercase text, transparent background, rounded-full.

## Navigation

No category tabs, no sticky TOC, no anchor index. The user scrolls.

The navbar (already redesigned) sits sticky at the top and handles cross-page navigation.

## CtaCloseout (bottom of page)

Reuse the existing `src/components/home/CtaCloseout.tsx` as-is. It already has the valley photo + petrol overlay + copper CTA + contact rows. No changes needed — just import and render at the bottom of the page.

## Palette and typography

No new tokens needed. Uses the cinematic palette already in `globals.css`:

- Surfaces: `--color-paper`, `--color-ink` (petrol hero overlay), `--color-amber` (text on dark)
- Accents: `--color-brass`, `--color-copper`, `--color-sage` (via `--color-stone`)
- Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`

Type: Geist sans (body, headings) + Geist Mono (eyebrows, labels). Weight extremes 200 / 500 / 600. No additional fonts.

## Data shape

The existing `Treatment` interface in `src/app/behandlinger/page.tsx` is close but missing two fields used by the editorial spread:

```ts
interface Treatment {
  // existing
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  category: string;
  prices: PriceItem[];

  // new
  refusion: "HELFO" | "Delvis HELFO" | "Egenandel";
  duration: string;  // e.g. "30–45 min", "Samme dag", "Flere besøk"
  photo: string;     // e.g. "/images/treatment-forebyggende.jpg"

  // remove (no longer used)
  color: string;     // legacy old-palette tone
  accent: string;    // legacy old-palette tone
}
```

The `color` / `accent` fields drove the old palette and can be dropped. The `idx` is derived from the array position at render time (no need to store it on the data).

## Photos

Each treatment needs one signature photo. For the spec we assume placeholders (solid `photoTone` cream variations) until the user provides photos.

During implementation, enumerate the treatments actually present in `src/app/behandlinger/page.tsx` and list the photo path needed for each. If a photo is missing at implementation time, fall back to a treatment-specific cream tone (the same set used as closed-spine tones on the homepage slipcase) plus a small mono "Klinikkfoto" label, so the layout is never broken.

## Files affected

```
src/app/behandlinger/page.tsx            (rewrite — drop the 915-line monolith)
src/components/treatments/TreatmentSpread.tsx  (new — the reusable spread)
src/components/treatments/RefusionChip.tsx     (new — the colour-coded chip)
```

Optionally split the hero into `src/components/treatments/BehandlingerHero.tsx` if the page.tsx grows past 200 lines.

The existing `src/app/behandlinger/layout.tsx` (metadata) is unchanged.

## Out of scope (deferred to later iterations)

- **Per-treatment sub-pages** (`/behandlinger/forebyggende`, etc.). Not needed for this iteration; the editorial spreads contain all detail.
- **Real treatment photos.** Spec proceeds with placeholders; photo selection is a separate task.
- **Scroll choreography.** Reuse the existing `RevealOnScroll` primitive (already used elsewhere) on the hero subline and on each spread's content column. No new motion primitives.
- **i18n.** Norwegian only, matches current site.
- **Sticky TOC / category filter.** Rejected during brainstorm.

## Acceptance criteria

- Visiting `/behandlinger` shows: photo hero → 9 editorial spreads → CtaCloseout, in that order.
- No `--color-primary` or `--color-bg` legacy tokens remain in `src/app/behandlinger/page.tsx`.
- No purple/blur-orb backgrounds remain.
- Spreads alternate photo side starting with photo-left for treatment 01.
- Refusjon chips use sage / brass / copper for HELFO / Delvis HELFO / Egenandel.
- All copy from the current page is preserved verbatim (title, subtitle, description, features, prices).
- Mobile collapses to single-column with photo above content.
- `prefers-reduced-motion` honoured.

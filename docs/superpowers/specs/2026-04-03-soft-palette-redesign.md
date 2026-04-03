# Soft Multi-Tint Palette Redesign

## Overview

Redesign the Ringebu Tannlegesenter website from its current monochrome warm-brown palette to a flowing multi-tint soft pastel system. Each homepage section gets its own background tint, ordered so adjacent sections transition smoothly. The hero section is rebuilt as a white-background split layout with a staggered photo collage.

## Color System

### Section Tints
| Name         | Hex       | Usage                        |
|--------------|-----------|------------------------------|
| White        | `#FFFFFF` | Hero, breather sections      |
| Light Blue   | `#F0F4F8` | Treatments section           |
| Light Yellow | `#FEFCF3` | Tips & Symptoms section      |
| Mint         | `#F0F7F4` | Articles section             |
| Cream        | `#FBF9F3` | Pre-CTA section (currently no dedicated stats section exists — Cream is used for whatever section precedes the CTA, or as a warm buffer before the dark closer) |

### Dark Anchor
| Name        | Hex       | Usage                          |
|-------------|-----------|--------------------------------|
| Cocoa       | `#6B5744` | CTA sections, navbar text, dark cards, headings |
| Deep Cocoa  | `#5A4838` | Footer background              |

### Accent
| Name         | Hex       | Usage                              |
|--------------|-----------|------------------------------------|
| Amber        | `#C4873B` | Primary buttons, highlights, links, focus rings, `::selection` bg |
| Amber Light  | `#D4A04B` | Gradient endpoints, decorative lines, `.gradient-text` second stop |
| Amber Hover  | `#A8722F` | Primary button hover state         |

The old gold `#B8976A` is replaced by Amber for better contrast against the lighter Cocoa anchor. The old espresso `#3D3225` is replaced everywhere by Cocoa `#6B5744`.

### Text Colors (unchanged)
- Primary: `#1c1917`
- Secondary: `#57534e`
- Muted: `#a8a29e`

### Typography (unchanged)
- Headings: Fraunces
- Body: DM Sans

## Homepage Section Flow

Tints are ordered to create smooth visual transitions — cool tones near the white hero, warming as the page approaches the dark CTA:

```
White (Hero)
  → Light Blue (Treatments)
    → Light Yellow (Tips & Symptoms)
      → Mint (Articles)
        → White (Breather)
          → Cream (Pre-CTA buffer)
            → Cocoa (CTA)
Footer (Deep Cocoa)
```

## Hero Section Redesign

**Layout:** White background, two-column split.
- **Left:** Eyebrow text, heading, subtitle, two CTA buttons (primary + outline).
- **Right:** Staggered two-column photo collage (4 photos). Left column offset downward, right column flush top. Different heights per image for asymmetry. Rounded corners (`rounded-xl`) on all images.

**Mobile:** Stack text above, collage below as a 2x2 grid with equal-sized rounded images.

## Sub-Page Strategy

| Page              | Approach                                    |
|-------------------|---------------------------------------------|
| Behandlinger      | Multi-tint sections (like homepage)         |
| Priser            | Currently a redirect to `/behandlinger` — no changes needed |
| Kontakt           | White + mint accent section                 |
| Symptomer         | White + light blue accent section           |
| Artikler (index)  | All white                                   |
| Artikler (slug)   | All white                                   |

Each sub-page header section uses the Cocoa dark background. CTA sections at the bottom of each page also use Cocoa.

## Emerald-to-Semantic Variable Migration

All component files reference `var(--color-emerald-*)` which currently maps to brown values via Tailwind overrides. Replace every occurrence with the new semantic variable:

| Old variable                  | New variable                  | Value     |
|-------------------------------|-------------------------------|-----------|
| `var(--color-emerald-950)`    | `var(--color-primary)`        | `#6B5744` |
| `var(--color-emerald-900)`    | `var(--color-primary)`        | `#6B5744` |
| `var(--color-emerald-800)`    | `var(--color-primary-dark)`   | `#5A4838` |
| `var(--color-emerald-700)`    | `var(--color-primary-light)`  | `#7A6B55` |
| `var(--color-emerald-600)`    | `var(--color-accent)`         | `#C4873B` |
| `var(--color-emerald-500)`    | `var(--color-accent)`         | `#C4873B` |
| `var(--color-emerald-400)`    | `var(--color-accent-light)`   | `#D4A04B` |
| `var(--color-emerald-300)`    | `var(--color-accent-light)`   | `#D4A04B` |
| `var(--color-emerald-200)`    | `var(--color-bg-cream)`       | `#FBF9F3` |
| `var(--color-emerald-100)`    | `var(--color-bg-cream)`       | `#FBF9F3` |
| `var(--color-emerald-50)`     | `var(--color-bg-cream)`       | `#FBF9F3` |

This mapping applies across ALL in-scope component files (page.tsx, behandlinger, kontakt, symptomer, artikler, Navbar, Footer).

### Inline hardcoded hex migration (component files)

Beyond `globals.css`, all in-scope component files contain inline hardcoded hex values. These must also be migrated. General rule: **every hardcoded hex in the old palette must be replaced** — either with the new hex value or a CSS variable reference. Key examples:

| Old hex / pattern              | New hex / pattern              | Found in                     |
|--------------------------------|--------------------------------|------------------------------|
| `#3D3225` / `rgba(61,50,37,*)` | `#6B5744` / `rgba(107,87,68,*)` | `page.tsx` hero overlay     |
| `#B8976A`                      | `#C4873B` (or `var(--color-accent)`) | `page.tsx`, `content.ts`   |
| `#D4AF37`                      | `#C4873B`                      | `page.tsx` hero accent text  |
| `#C9B99A`                      | `#D4A04B`                      | `symptomer/page.tsx`         |
| `#F0E6D6`                      | `#FBF9F3`                      | `page.tsx`, `symptomer`      |
| `#E8DFCF`                      | `var(--color-border)`          | Various                      |
| `#7A6B55`                      | `#6B5744`                      | `page.tsx`                   |

**`behandlinger/page.tsx` local constant:** The `cardColors` object (currently `{ bg: "#FDFBF7", border: "#E8DFCF", dot: "#B8976A" }`) must be updated to `{ bg: "var(--color-bg-cream)", border: "var(--color-border)", dot: "var(--color-accent)" }` or equivalent hex values.

## CSS Variable Updates

### Strategy: Replace `--color-emerald-*` with semantic names

The current `@theme` block overrides Tailwind's emerald scale with brown values. This is confusing — a class like `bg-emerald-900` actually renders brown. Replace the entire emerald override block with semantic CSS variables. All component files that reference `var(--color-emerald-*)` must be updated using the mapping table above.

### New `@theme` block variables

```css
/* Dark anchors */
--color-primary:       #6B5744;   /* Cocoa */
--color-primary-dark:  #5A4838;   /* Deep Cocoa (footer) */
--color-primary-light: #7A6B55;   /* Lighter cocoa for subtle uses */

/* Accent */
--color-accent:        #C4873B;   /* Amber */
--color-accent-hover:  #A8722F;   /* Amber darkened */
--color-accent-light:  #D4A04B;   /* Amber light (gradients) */

/* Section tints */
--color-bg-blue:       #F0F4F8;
--color-bg-yellow:     #FEFCF3;
--color-bg-mint:       #F0F7F4;
--color-bg-cream:      #FBF9F3;

/* Keep existing stone-*, text-*, and border variables */
```

### Remove legacy aliases block

The "Legacy aliases for sub-pages" block (lines 43-58 in current `globals.css`) should be removed entirely. Any sub-page references to `--color-emerald`, `--color-footer-bg`, `--color-primary-dark: #2A2118`, etc. must be updated to the new semantic variables.

### Remove conflicting `--color-amber`

The existing `--color-amber: #f59e0b` (Tailwind amber) conflicts with the new Amber accent. Remove it — it is not used in the codebase.

### Hardcoded hex migration in `globals.css`

All hardcoded hex values in utility classes must also be migrated. Specifically:

| Old hex     | New hex     | Affected classes                                         |
|-------------|-------------|----------------------------------------------------------|
| `#B8976A`   | `#C4873B`   | `.eyebrow`, `.btn-primary`, `.btn-nav:hover`, `.gradient-text`, `.accent-line`, `.gold-line` |
| `#A68658`   | `#A8722F`   | `.btn-primary:hover`                                     |
| `#7A6B55`   | `#6B5744`   | `.btn-outline` text color                                |
| `#3D3225`   | `#6B5744`   | `::selection` color                                      |
| `#F0E6D6`   | `#FBF9F3`   | `.btn-nav:hover` bg, `.btn-nav.active` bg, `::selection` bg |
| `#E8DFCF`   | use `var(--color-border)` | `.card:hover` border                      |
| `#C9B99A`   | `#D4A04B`   | `.gradient-text` second stop, `.accent-line` gradient    |

## Button System Updates

- **Primary button (`.btn-primary`):** Amber `#C4873B` background, white text. Hover: `#A8722F`.
- **On dark (Cocoa) sections:** White background, Cocoa text. Hover: Cream `#FBF9F3` background.
- **Outline button (`.btn-outline`):** Amber `#C4873B` border, Cocoa `#6B5744` text. Hover: fill Amber with white text.
- **Secondary (`.btn-secondary`, on dark):** Semi-transparent white border, white text (unchanged pattern).
- **Nav button (`.btn-nav`):** Cocoa text. Hover: Amber `#C4873B` text, Cream `#FBF9F3` background. Active: Cocoa text, Cream background.

## Focus & Selection States

- **Focus rings:** `outline-color: #C4873B` (Amber) with 2px offset.
- **`::selection`:** Background `#FBF9F3` (Cream), text `#6B5744` (Cocoa).
- **Link color:** Amber `#C4873B`. Visited: same (no separate visited color).

## Decorative Classes

- **`.gradient-text`:** `linear-gradient(135deg, #C4873B, #D4A04B)` (Amber → Amber Light).
- **`.accent-line`:** Same gradient as above.
- **`.gold-line`:** Rename to `.accent-line-thin`, color: `#C4873B`.

## Scope

### In Scope
- `globals.css` — full color variable overhaul + all hardcoded hex migration
- `src/app/page.tsx` — hero rebuild + section background tints
- `src/app/behandlinger/page.tsx` — multi-tint sections
- `src/app/priser/page.tsx` — currently a redirect, no changes needed
- `src/app/kontakt/page.tsx` — white + mint accent
- `src/app/symptomer/page.tsx` — white + light blue accent
- `src/app/artikler/page.tsx` — all white
- `src/app/artikler/[slug]/page.tsx` — all white
- `src/components/Navbar.tsx` — update dark anchor color references
- `src/components/Footer.tsx` — update to Deep Cocoa
- `src/data/content.ts` — update `treatmentColors` map and any hardcoded hex values

### Out of Scope
- Content changes (text, images beyond hero collage arrangement)
- New pages or routes
- Font changes
- Animation changes (keep existing Framer Motion patterns)

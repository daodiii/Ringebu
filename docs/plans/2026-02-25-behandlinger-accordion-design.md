# Behandlinger Page Redesign: Editorial Accordion Chapters

**Date:** 2026-02-25
**Status:** Approved

## Problem

The current Behandlinger page renders all 9 treatments as identical GlassCard components in a 2-column grid. The result is flat, repetitive, and doesn't create visual hierarchy between the 5 categories. The glass cards have low contrast against the cream background.

## Solution

Replace the uniform card grid with **5 editorial chapter bands** — one per category. Each band displays its treatments as elegant expandable accordion rows. The page becomes scannable at a glance, with details revealed on demand.

## Treatments & Categories

| Category | Treatments |
|----------|-----------|
| Restaurering (3) | Kron og Bro, Fyllingsterapi, Rotfylling |
| Forebyggende (2) | Forebyggende Behandling, Tannkjøtt & Tannsteinsbehandling |
| Kosmetisk (1) | Bleking |
| Kirurgi (1) | Visdomstennene |
| Spesialbehandling (2) | Bittskinner / Tanngnising, Tannlegeskrekk |

## Layout

### Desktop (md+)

Two-column layout within each band:
- **Left column (~35%):** Large Playfair Display category name, 60px gold accent line, optional 1-line category subtitle in muted text
- **Right column (~65%):** Treatment rows as clickable accordion items

Bands separated by thin gold divider lines with generous `py-12` spacing.

### Mobile (<md)

- Category name full-width at top, large serif
- Gold accent line beneath
- Treatment rows stack below, full width

## Treatment Row

### Collapsed State
- Lucide icon (20px, accent-gold color)
- Treatment title (Playfair, 18-20px, weight 600)
- Chevron arrow on right (rotates on expand)
- 1px bottom border in warm border color
- Hover: subtle `bg-warm/50` background + gold left border accent

### Expanded State
- Gold 3px left border accent runs full height
- Description paragraph (Plus Jakarta, 300 weight)
- Features list with gold CheckCircle icons, staggered fade-in
- Subtle `bg-bg-warm` background tint
- Chevron rotates 90 degrees

## Animation

- Each band uses existing `AnimateOnScroll` with `fadeUp`
- Expand/collapse via Framer Motion `AnimatePresence` + `motion.div`
- Features list items stagger with 50ms delays
- Chevron rotation with spring transition
- `prefers-reduced-motion`: instant show/hide, no animation

## Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Category name | Playfair Display | clamp(1.8rem, 3vw, 2.5rem) | 700 |
| Category subtitle | Plus Jakarta Sans | 14px | 300 |
| Treatment title | Playfair Display | 18-20px | 600 |
| Description | Plus Jakarta Sans | 16px | 300 |
| Feature items | Plus Jakarta Sans | 14px | 400 |

## Colors

All bands share the cream background. Visual separation via gold divider lines and whitespace. Warmth appears only on hover/expand states:
- Default: `bg-background` (#FAF8F5)
- Hover: `bg-bg-warm/50`
- Expanded: `bg-bg-warm`
- Accents: `accent-gold` (#B8A88A)
- Dividers: `accent-gold` at 30% opacity

## Component Structure

### New: `TreatmentAccordion` (client component)
- Manages open/closed state for each treatment
- Uses Framer Motion for expand/collapse animation
- Renders the treatment row with icon, title, chevron
- Renders expanded content with description + features

### Modified: `behandlinger/page.tsx`
- Replace GlassCard grid with category bands
- Each band renders its treatments through `TreatmentAccordion`
- Keep existing `PageHeader` and CTA section unchanged

## Files to Change

1. `src/components/TreatmentAccordion.tsx` — New client component
2. `src/app/behandlinger/page.tsx` — Replace grid with accordion layout

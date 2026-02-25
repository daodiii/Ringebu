# Front Page Editorial Overhaul — Design Document

**Date:** 2026-02-25
**Project:** Ringebu Tannlegesenter
**Scope:** Complete front page redesign — editorial, full-page scroll-snap layout

---

## Vision

A calm, luxurious editorial website for Ringebu Tannlegesenter. Each section occupies the full viewport and the user scroll-snaps between them like turning pages of a high-end magazine. Warm neutral palette (cream, off-white, muted gold), Playfair Display headings, Plus Jakarta Sans body text, elegant placeholder areas ready for real photography.

## Technical Approach

**CSS Scroll Snap + Framer Motion (Approach A)**

- Container uses `overflow-y: scroll; scroll-snap-type: y mandatory`
- Each section: `height: 100vh; scroll-snap-align: start`
- Framer Motion handles entrance animations triggered on section visibility
- No new dependencies — uses existing stack (Next.js 16, Tailwind 4, Framer Motion 12)

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-cream` | `#FAF8F5` | Hero, CTA section backgrounds |
| `--bg-warm` | `#F7F4F0` | Services section background |
| `--bg-warmest` | `#F3EFE9` | Gallery section background |
| `--text-dark` | `#2C2825` | Headings, primary text |
| `--text-body` | `#5C5650` | Body paragraphs |
| `--text-muted` | `#8A847D` | Captions, secondary info |
| `--accent-gold` | `#B8A88A` | Eyebrows, decorative lines, active dots |
| `--card-white` | `#FFFEFB` | Service cards |
| `--placeholder` | `#E8E4DF` | Image placeholder areas |
| `--border` | `#E8E4DF` | Card borders, dividers |

## Typography

| Element | Font | Size | Weight | Details |
|---------|------|------|--------|---------|
| Eyebrow | Plus Jakarta Sans | 12-13px | 400 | Uppercase, letter-spacing 3px, muted gold |
| Heading | Playfair Display | clamp(40px, 5vw, 80px) | 700 | Dark warm |
| Body | Plus Jakarta Sans | 16-18px | 300-400 | Line-height 1.8, body color |
| CTA button | Plus Jakarta Sans | 14-15px | 500 | — |

---

## Navigation — Minimal Floating Bar

- Fixed at top, transparent by default
- On scroll: subtle cream glass background appears (backdrop-blur)
- **Left:** Logo — "Ringebu" in Playfair Display
- **Center:** Hjem / Behandlinger / Priser / Kontakt — Plus Jakarta Sans, light weight, spaced
- **Right:** "Bestill Time" pill button, small
- **Mobile:** Logo + hamburger icon. Full-screen cream overlay menu with staggered link animations

## Side Dot Indicators

- Small dots fixed on the right edge of the viewport
- Indicate current section (muted by default, active = gold fill)
- Clickable to jump between sections

---

## Section 1: Hero

**Layout:** Full viewport, split composition. Left: typography. Right: large placeholder image (portrait, rounded corners, warm shadow).

**Content:**
- Eyebrow: "Ringebu Tannlegesenter" — spaced uppercase, muted gold
- Headline (Playfair Display, large): "Tannpleie med omtanke"
- One short body sentence
- CTA: "Bestill Time" — pill button, dark warm bg, cream text

**Animation:** Staggered fade-up on load: eyebrow (0ms) -> headline (150ms) -> body (300ms) -> button (450ms). Image area scales gently from 1.02 to 1.0.

**Background:** `--bg-cream` (#FAF8F5)

---

## Section 2: About / Philosophy

**Layout:** Full viewport, asymmetric two-column. Left: large placeholder image (~55% width, full height, edge-to-edge). Right: text content vertically centered.

**Content (right):**
- Thin decorative line (muted gold, ~60px wide)
- Eyebrow: "Var Filosofi" — spaced uppercase, muted gold
- Heading (Playfair Display): "Din trygghet er var prioritet"
- 2-3 short paragraphs about the clinic philosophy

**Animation:** Image fades in from left, text fades up from right, staggered ~800ms.

**Background:** `--bg-cream` (#FAF8F5)

**Mobile:** Stacks vertically — image on top (50vh), text below.

---

## Section 3: Services

**Layout:** Full viewport, centered. Eyebrow + heading at top, 2x2 card grid centered below.

**Content:**
- Eyebrow centered: "Vare Tjenester"
- Heading centered (Playfair Display): "Behandlinger tilpasset deg"
- 4 cards in 2x2 grid:
  1. Generell Tannpleie
  2. Kosmetisk Tannpleie
  3. Implantat
  4. Akutt Behandling

**Each card:**
- Placeholder image area on top (rounded corners, warm-gray fill)
- Service title (Playfair Display, medium)
- One-line description (Plus Jakarta Sans, light, muted)
- Subtle warm border (1px, --border). Hover: translateY(-4px) + soft warm shadow

**Animation:** Heading fades up first, then cards stagger in: top-left -> top-right -> bottom-left -> bottom-right, ~150ms between each.

**Background:** `--bg-warm` (#F7F4F0)

**Mobile:** Cards stack single column, full width.

---

## Section 4: Gallery / Imagery

**Layout:** Full viewport, image-forward editorial spread. No heading, no eyebrow.

**Content:**
- Mosaic of 3 placeholder image areas:
  - 1 large rectangle: ~60% width, full content height
  - 2 smaller rectangles stacked on right: ~40% width, each ~half height
- Caption below: "Moderne fasiliteter i hjertet av Gudbrandsdalen" — italic, muted
- Placeholder tones: #E8E4DF, #DDD8D2, #D5CFC8 for visual depth
- Rounded corners (12px), small gaps (8px)

**Animation:** Large image fades in first, two smaller follow staggered (~200ms). Scale 1.03 to 1.0 on each.

**Background:** `--bg-warmest` (#F3EFE9)

**Mobile:** Large image first (60vh), two smaller side-by-side below.

---

## Section 5: Contact / CTA

**Layout:** Full viewport, centered composition.

**Content:**
- Eyebrow centered: "Ta Kontakt"
- Heading (Playfair Display, large): "Klar for ditt neste besok?"
- Body sentence: "Vi tar imot nye pasienter og ser frem til a hore fra deg."
- Two CTAs side by side:
  - Primary: "Bestill Time" — dark warm bg, cream text, pill
  - Secondary: "Ring Oss" — outlined, warm border + text, pill
- Thin decorative line below
- Contact details in horizontal row: Phone / Email / Address — small, light, muted
- Opening hours beneath

**Animation:** Staggered: eyebrow -> heading -> sentence -> buttons (scale 0.95 to 1.0 + fade) -> contact details. ~1000ms total.

**Background:** `--bg-cream` (#FAF8F5) — full circle back to hero.

---

## Footer (Below Snap Container)

Not a snap section. Sits below the scroll-snap container.

- Slim, dark warm background (`#2C2825`)
- Cream text, logo mark, copyright, a few links
- Understated and minimal

---

## Responsive Strategy

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (1024px+) | Full editorial layouts as described |
| Tablet (768-1023px) | Slight column compression, images scale proportionally |
| Mobile (<768px) | All sections stack vertically, images resize, generous vertical padding, cards single-column, buttons full-width stacked |

## Files Affected

- `src/app/page.tsx` — Complete rewrite
- `src/app/globals.css` — New color tokens, scroll-snap styles, updated typography
- `src/app/layout.tsx` — Updated layout structure (snap container wrapping)
- `src/components/Navbar.tsx` — Redesigned floating minimal nav
- `src/components/Hero.tsx` — Remove, rebuild inline or as new component
- `src/components/Footer.tsx` — Simplified dark footer
- `src/app/StatsSection.tsx` — Remove (not in new design)
- `src/components/AnimateOnScroll.tsx` — Replace with Framer Motion approach
- `src/components/Counter.tsx` — Remove (not in new design)
- `src/components/GlassCard.tsx` — Remove (not in new design)
- `src/components/SectionHeader.tsx` — Remove (not in new design)
- `src/components/TestimonialCard.tsx` — Remove (not in new design)
- `src/components/TestimonialsCarousel.tsx` — Remove (not in new design)
- `src/components/PageHeader.tsx` — Keep for subpages
- `src/components/ui/AuroraBackground.tsx` — Remove (not in new design)
- `src/components/ui/GradientBorderCard.tsx` — Remove (not in new design)

New components to create:
- `src/components/ScrollSection.tsx` — Reusable 100vh snap section wrapper
- `src/components/SectionDots.tsx` — Side dot navigation indicators
- `src/components/ImagePlaceholder.tsx` — Styled placeholder for future photos

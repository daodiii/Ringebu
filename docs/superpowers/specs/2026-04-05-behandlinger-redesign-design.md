# Behandlinger Page Redesign — Design Spec

## Summary

Redesign the behandlinger (treatments) page from a flat bento grid of colored cards into an **Alternating Bands** editorial layout. Image banners alternate with rows of compact colored cards, creating a cinematic reading rhythm. Sticky category tabs enable filtering. Click-to-expand accordion reveals full details per treatment.

## Current State

- 9 treatment cards in a bento grid with varied column splits (60/40, 40/30/30, etc.)
- All cards are dark-colored backgrounds with text overlay — no images
- No filtering or category navigation
- Cards show all information upfront (features, prices) — long cards
- Page: hero header → treatment grid → payment info → CTA

## Design Goals

1. Add background images to featured treatments for visual impact
2. Create editorial rhythm that avoids "wall of cards" fatigue
3. Enable category-based navigation via sticky filter tabs
4. Keep information density but move details behind click-to-expand
5. Work with the existing 6 images — no new assets required

## Page Structure

### Hero Section

No changes. Keep the current dark header with "Våre tjenester" / "Behandlinger" heading.

### Sticky Category Tabs

Position: Sticks below the main navbar. Navbar is `h-20` (80px). Tabs use `top: 80px` (`top-20` in Tailwind).

Categories (mapped from existing treatment data):
- **Alle** (default — shows everything)
- **Forebyggende** — Forebyggende Behandling, Tannkjøtt & Tannstein
- **Kosmetisk** — Bleking
- **Restaurering** — Fyllingsterapi, Kron og Bro, Rotfylling
- **Kirurgi** — Visdomstennene
- **Spesialbehandling** — Bittskinner, Tannlegeskrekk

Visual design:
- Active tab: `bg-[var(--color-accent)]` terracotta fill, white text
- Inactive tab: `bg-[var(--color-bg-cream)]` cream fill, `text-[var(--color-text-secondary)]`
- Container: white background, subtle bottom border, rounded pill shapes
- Desktop: all tabs visible in a single row
- Mobile: horizontally scrollable with fade-edge hint on overflow

### Treatment Grid — Alternating Bands Layout

The grid alternates between **image banners** (full-width) and **card rows** (2-3 compact cards).

#### Band 1 — Forebyggende Behandling (Image Banner)
- Direction: Text left, image fading in from right
- Image: `ringebutannMain.jpg` (hero-dentist.jpg is used on the homepage)
- Gradient: `linear-gradient(90deg, #3C2415 45%, transparent)`
- Shows: category tag, title, subtitle, short description, feature tags
- Full details (features list, prices) expand on click

#### Card Row 1
- **Bleking** (colored card, `#1C2A3A`)
- **Tannkjøtt & Tannstein** (colored card, `#33362A`)
- Layout: 2 cards, equal width

#### Band 2 — Fyllingsterapi (Image Banner, Reversed)
- Direction: Image left, text fading in from right (reversed)
- Image: `service-general.jpg`
- Gradient: `linear-gradient(270deg, #2A3A2B 45%, transparent)`
- Same content pattern as Band 1

#### Card Row 2
- **Kron og Bro** (colored card, `#5A3420`)
- **Rotfylling** (colored card, `#3D1C28`)
- **Bittskinner** (colored card, `#2E2038`)
- Layout: 3 cards, equal width

#### Band 3 — Visdomstennene (Image Banner)
- Direction: Text left, image right
- Image: `dental-chair.png`
- Gradient: `linear-gradient(90deg, #1C3636 45%, transparent)`

#### Card Row 3
- **Tannlegeskrekk** (colored card, `#2A2A30`)
- Layout: capped at 50% width on desktop with centered alignment, full-width on mobile

### Payment & Insurance Section

No changes. Keep the existing two-card grid with Betalingsinformasjon and Trygderefusjon.

### CTA Section

No changes. Keep the existing dark CTA with "Usikker på hvilken behandling du trenger?" heading.

## Component Design

### ImageBand Component

```
Props:
  - treatment: Treatment (title, subtitle, description, features, prices, category, color, accent)
  - imageSrc: string (path to image)
  - imageAlt: string
  - direction: 'left' | 'right' (text position)
  - isExpanded: boolean
  - onToggle: () => void
```

Structure:
- Outer container: `rounded-2xl overflow-hidden relative` with `min-h-[240px]` on desktop, auto on mobile
- Background: `<Image>` with `object-cover`, `fill`, priority loading for Band 1
- Gradient overlay: absolute positioned div matching `direction`
- Content: positioned over gradient with z-10
- Collapsed state: category tag, title, subtitle, short description, feature tags (first 3 items from `treatment.features` as compact pills: `text-xs px-3 py-1 rounded-full bg-white/10 text-white/80`). Pills disappear when expanded.
- Expanded state: full features list + prices panel. Panel appears inside the card container below the collapsed content. Background matches `treatment.color`, padding `p-6`, inherits bottom border-radius from parent. If `treatment.prices` is empty, show features only with a muted line: "Ta kontakt for prisinformasjon".
- Chevron indicator: subtle down arrow that rotates 180deg when expanded

### CompactCard Component

```
Props:
  - treatment: Treatment
  - isExpanded: boolean
  - onToggle: () => void
```

Structure:
- Outer container: `rounded-2xl` with `backgroundColor: treatment.color`
- Collapsed state: category tag, title, subtitle only
- Expanded state: description, features list, prices panel. Same expanded panel styling as ImageBand — inside the card, `p-6`, matching background. If `treatment.prices` is empty, show features only with "Ta kontakt for prisinformasjon" muted text.
- Chevron indicator same as ImageBand

### CategoryTabs Component

```
Props:
  - categories: string[]
  - activeCategory: string
  - onCategoryChange: (category: string) => void
```

Structure:
- Outer: `sticky top-20` positioned below navbar (80px), white bg, z-40 (below navbar z-50, above content)
- Inner: flex row with `gap-2`, `overflow-x-auto` on mobile
- Each tab: button with pill styling, click handler
- Active state uses `layoutId` from Framer Motion for animated pill indicator

## Interactions

### Filter Behavior

**"Alle" view (default):** The full editorial alternating bands layout is used — bands, card rows, the complete visual rhythm as defined in `pageLayout`.

**Filtered view (any specific category):** The alternating band/row structure is abandoned. All matching treatments render as equal-width CompactCard components in a responsive grid (2 columns on desktop, 1 column on mobile). Image bands revert to compact cards when filtered — the editorial layout only applies to the "Alle" view.

When a category tab is clicked:
1. `activeCategory` state updates
2. Non-matching treatments: `opacity: 0, scale: 0.95` over 200ms
3. Layout reflows with Framer Motion `layout` prop (300ms ease)
4. Matching treatments remain visible (no re-animation)
5. "Alle" resets to the editorial band layout
6. Rapid tab switching: latest selection wins immediately. Framer Motion `layout` animations are interruptible.

Each treatment already has a `category` field in the data. Filtering uses `treatment.category === activeCategory` directly — no new mapping needed for filter logic.

### Expand/Collapse (Accordion)

- Only one treatment expanded at a time
- Click a band or card → `expandedId` state updates
- AnimatePresence wraps the expandable content
- Height animates from 0 to auto (use `initial={{ height: 0, opacity: 0 }}` → `animate={{ height: 'auto', opacity: 1 }}`)
- Duration: 300ms ease-out
- Clicking the same treatment collapses it
- Auto-scroll: after expand, `scrollIntoView({ behavior: 'smooth', block: 'start' })`. Each treatment container needs `scroll-margin-top: 140px` (navbar 80px + tabs ~48px + 12px gap) to avoid being occluded by sticky elements.

### Hover States (Desktop Only)

Hover lift (`translateY(-4px)`) is disabled when the card/band is in expanded state. Shadow deepening still applies when expanded.

Image bands:
- `translateY(-4px)` lift (collapsed only)
- Box shadow deepens: `0 4px 20px` → `0 16px 48px`
- Background image: `scale(1.0)` → `scale(1.05)` with `transition: transform 600ms ease` (intentionally slower than the card lift for a cinematic feel)
- Card lift/shadow transition: 200ms ease

Colored cards:
- `translateY(-4px)` lift (collapsed only)
- Box shadow deepens
- Accent-colored border fades in: `border: 1px solid ${accent}30`
- Transition: 200ms ease

## Mobile Responsive Design

### Breakpoints

- Desktop: ≥768px (`md:`)
- Mobile: <768px

### Image Bands — Mobile

- Direction flips to vertical: image on top, text below
- Gradient changes from horizontal to vertical: `linear-gradient(180deg, transparent 30%, ${treatment.color} 60%)` — uses the treatment's `color` field, which matches the desktop gradient start color
- Image height: ~180px with object-cover
- Text section: full padding below
- Min-height removed, content determines height

### Card Rows — Mobile

- Switch from flex row to flex column
- Cards stack single-column, full width
- Slightly more padding (p-5 → p-6)

### Sticky Tabs — Mobile

- Horizontal scroll with `-webkit-overflow-scrolling: touch`
- Fade gradient on right edge to hint at more tabs
- Same sticky behavior, same z-index

## Animation Choreography

### Page Load (Scroll-Triggered)

1. Hero header: fade in 0-0.5s (existing behavior)
2. Tabs: slide down into sticky position (0.3s delay)
3. Bands and cards: `whileInView` with staggered delays (0.04s per item)
4. Initial state: `opacity: 0, y: 24`
5. Animate to: `opacity: 1, y: 0`
6. Viewport margin: `-40px` (trigger slightly before entering view)

### Filter Transition

1. Non-matching: `opacity: 0, scale: 0.95` (200ms)
2. Layout reflow: Framer Motion `layout` prop handles repositioning (300ms)
3. Matching items: no re-animation, stay in place

### Reduced Motion

- Check `prefers-reduced-motion: reduce`
- If active: disable all transforms, use instant opacity changes only
- Implementation: `useReducedMotion()` hook from Framer Motion

## Data Changes

The existing `Treatment` interface and `treatments` array stay unchanged. New data needed:

```typescript
// Image mapping for bands
const treatmentImages: Record<string, { src: string; alt: string }> = {
  'Forebyggende Behandling': { src: '/images/ringebutannMain.jpg', alt: 'Ringebu Tannklinikk' },
  'Fyllingsterapi': { src: '/images/service-general.jpg', alt: 'Moderne tannbehandling' },
  'Visdomstennene': { src: '/images/dental-chair.png', alt: 'Tannlegestol med utstyr' },
};

// Category mapping
const categories = ['Alle', 'Forebyggende', 'Kosmetisk', 'Restaurering', 'Kirurgi', 'Spesialbehandling'];

// Layout definition: which treatments are bands vs cards
type LayoutItem =
  | { type: 'band'; treatmentTitle: string; direction: 'left' | 'right' }
  | { type: 'row'; treatmentTitles: string[] };

const pageLayout: LayoutItem[] = [
  { type: 'band', treatmentTitle: 'Forebyggende Behandling', direction: 'left' },
  { type: 'row', treatmentTitles: ['Bleking', 'Tannkjøtt & Tannstein'] },
  { type: 'band', treatmentTitle: 'Fyllingsterapi', direction: 'right' },
  { type: 'row', treatmentTitles: ['Kron og Bro', 'Rotfylling', 'Bittskinner'] },
  { type: 'band', treatmentTitle: 'Visdomstennene', direction: 'left' },
  { type: 'row', treatmentTitles: ['Tannlegeskrekk'] },
];
```

## Files to Modify

- `src/app/behandlinger/page.tsx` — Full rewrite of the page component
- No new files needed — all components can live in the same file (matching current pattern)

## Accessibility

- Tabs: `role="tablist"` with `role="tab"` on each, `aria-selected` for active
- Expand/collapse: `aria-expanded` on trigger, `aria-controls` pointing to content panel
- Images: descriptive `alt` text in Norwegian
- Focus states: visible focus rings on tabs and cards (3-4px)
- Keyboard: Tab navigates tabs, Enter/Space activates, arrow keys move between tabs
- Keyboard close: pressing Enter/Space on an expanded card collapses it. Pressing Escape while focus is inside expanded content collapses the card and returns focus to the trigger element.
- Reduced motion: all animations respect `prefers-reduced-motion`

## Performance

- Images: Next.js `<Image>` with `priority` on Band 1, lazy loading on others
- Image format: WebP via Next.js automatic optimization
- Filter state: client-side only, no re-fetching
- Framer Motion: tree-shake unused features, use `layout` prop (not `animate` for position changes)
- All treatment data is static/in-file. No loading states needed.

## Z-Index Hierarchy

| Element | Z-Index | Notes |
|---------|---------|-------|
| Navbar | z-50 | Existing, top-most |
| Sticky category tabs | z-40 | Below navbar, above all content |
| Band gradient overlay | z-10 | Inside band only |
| Band text content | z-20 | Above gradient, inside band |

## Developer Notes

- `pageLayout` references treatments by title string. Add a runtime dev-mode check that all `treatmentTitle` values resolve to actual treatments. Log a console warning if any are missing.
- Deep-linking to filtered categories (e.g., `?kategori=kirurgi`) is out of scope for this iteration but could be added later with `useSearchParams`.

## Out of Scope

- Payment/insurance section redesign
- CTA section redesign
- Hero header redesign
- Sourcing new images
- Individual treatment detail pages

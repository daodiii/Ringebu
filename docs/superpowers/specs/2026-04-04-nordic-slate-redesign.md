# Nordic Slate Redesign — Ringebu Tannlegesenter

**Date:** 2026-04-04
**Status:** Approved
**Scope:** Homepage visual redesign — palette, hero, section rhythm, contrast fixes

## Problem

The current site has a muddy brown palette (#6B5744) with invisible section tints, a broken white-on-white navbar, an empty buffer section, and lacks visual personality. The page feels monotone — every section reads as the same shade of white with flat brown text.

## Design Decisions

- **Tone:** Calm & trustworthy — Scandinavian restraint with warmth
- **Palette direction:** Nordic Slate (cool blue-gray primary with warm copper accent)
- **Hero layout:** Light background with gradient accent bar, single large image
- **Section rhythm:** Warm/cool alternating tints with dark CTA close
- **Hero image:** Single large clinic photo replacing 4-image collage

## Color Palette

### Design Tokens (CSS Variables)

| Token | Old Value | New Value | Purpose |
|-------|-----------|-----------|---------|
| `--color-primary` | `#6B5744` | `#2C3E50` | Headings, dark sections, navbar text |
| `--color-primary-dark` | `#5A4838` | `#1A2A38` | Footer background, deeper accents |
| `--color-primary-light` | `#7A6B55` | `#3D5A6E` | Hover states, secondary dark elements |
| `--color-accent` | `#C4873B` | `#B8845C` | CTA buttons, highlights, links |
| `--color-accent-hover` | `#A8722F` | `#9A6F4A` | Button hover state |
| `--color-accent-light` | `#D4A04B` | `#D4C4AA` | Gradient endpoints, subtle highlights |
| `--color-bg-blue` | `#F0F4F8` | `#E2EBF0` | Cool sections (Treatments, Articles) |
| `--color-bg-yellow` | `#FEFCF3` | `#F5EDE4` | Warm sections (Tips/Symptoms) |
| `--color-bg-cream` | `#FBF9F3` | `#F0EDE8` | Hero background, nav hover states |
| `--color-bg-mint` | `#F0F7F4` | `#E2EBF0` | Alias to cool tint — keeps backward compat with other pages |

### Semantic Colors

| Token | Old Value | New Value | Rationale |
|-------|-----------|-----------|-----------|
| `--color-text-primary` | `#1c1917` | `#1A2A38` | Align with primary-dark for consistency |
| `--color-text-secondary` | `#57534e` | `#4A5568` | Cooler gray, better readability |
| `--color-text-muted` | `#a8a29e` | `#8A9BAA` | Cool-toned muted text |
| `--color-border` | `#e7e5e4` | `#D5DEE5` | Cool-toned border to match palette |

### Stone Scale Replacement

Replace the warm stone scale with a cool slate scale:

| Token | New Value |
|-------|-----------|
| `--color-stone-50` | `#F8FAFB` |
| `--color-stone-100` | `#F0F3F5` |
| `--color-stone-200` | `#D5DEE5` |
| `--color-stone-300` | `#B8C5CF` |
| `--color-stone-400` | `#8A9BAA` |
| `--color-stone-500` | `#64788A` |
| `--color-stone-600` | `#4A5568` |
| `--color-stone-700` | `#374151` |
| `--color-stone-800` | `#1F2937` |
| `--color-stone-900` | `#1A2A38` |

## Hero Section

### Layout

- **Background:** `#F0EDE8` (warm off-white)
- **Top accent bar:** 4px gradient — `linear-gradient(90deg, #2C3E50, #3D5A6E, #B8845C)`
- **Grid:** Two columns — text left, single image right
- **Image:** `ringebutannMain.jpg` in a single `aspect-[4/3]` container with `rounded-2xl`
- Remove the current 4-image staggered collage

### Text Hierarchy

- Eyebrow: `#B8845C` copper, uppercase, tracked
- H1: `#2C3E50` primary, Fraunces 700
- Accent word ("smilet ditt"): `#B8845C` copper
- Body: `#4A5568` secondary text
- Buttons: copper primary CTA, slate outline secondary

### Navbar Change

- Remove the `isHome && !scrolled` transparent mode entirely
- Always render: `bg-white/90 backdrop-blur-xl shadow-sm` with `text-[var(--color-primary)]`
- This eliminates the white-on-white visibility bug

## Section Flow

### Order and Backgrounds

1. **Hero** — `#F0EDE8` (warm off-white) + accent bar
2. **Treatments** — `#E2EBF0` (cool slate tint) — `var(--color-bg-blue)`
3. **Tips & Symptoms** — `#F5EDE4` (warm sand) — `var(--color-bg-yellow)`
4. **Articles** — `#E2EBF0` (cool slate tint) — `var(--color-bg-blue)`
5. **CTA** — `linear-gradient(135deg, #2C3E50, #3D5A6E)` (dark gradient)

### Removed

- **PreCTASection** — delete entirely (empty `<div>` adding 160px of dead whitespace)

### Rhythm Principle

Each section transition creates a visible temperature shift: warm → cool → warm → cool → dark. This replaces the current invisible ~2% tints with 8-10% saturation differences that are clearly perceptible.

## Component Changes

### globals.css

- Update all CSS variable values in `@theme inline` block
- Replace warm stone scale with cool slate scale
- Update `btn-primary:hover` shadow from `rgba(196, 135, 59, 0.3)` to `rgba(184, 132, 92, 0.3)`
- Update `btn-outline:hover` shadow from `rgba(196, 135, 59, 0.2)` to `rgba(184, 132, 92, 0.2)`
- Update `.card:hover` shadow from `rgba(196, 135, 59, 0.08)` to `rgba(184, 132, 92, 0.08)`
- Update `::selection` to use new cream/primary
- Update `.accent-line` gradient to use new accent values
- Update `.gradient-text` to use new accent values

### Navbar.tsx

- Remove ALL `isHome && !scrolled` conditional logic — this appears in 6 places:
  1. `navBg` (line 34) — always use scrolled styling
  2. `textColor` (line 38) — always dark
  3. `logoColor` (line 42) — always dark
  4. Desktop link colors (lines 72-77) — always use dark/cream styling
  5. Phone number colors (lines 90-91) — always use dark styling
  6. CTA button colors (lines 101-103) — always use accent styling
- Keep `isHome` variable only if needed elsewhere; remove if not
- Keep scroll detection for shadow: `"bg-white/90 backdrop-blur-xl shadow-sm"` when scrolled, `"bg-white/80 backdrop-blur-sm"` when not scrolled
- Keep mobile overlay and scroll-based shadow appearance

### page.tsx — HeroSection

- Change background from `bg-white` to `bg-[var(--color-bg-cream)]`
- Add a NEW gradient accent bar div (distinct from the existing `.accent-line` class) before the container: `<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />`
- Replace 4-image collage grid with single image container
- Use `ringebutannMain.jpg` with `aspect-[4/3] rounded-2xl`

### page.tsx — PreCTASection

- Delete the component entirely
- Remove from the `HomePage` render

### page.tsx — CTASection

- Change background from solid `var(--color-primary)` to `linear-gradient(135deg, #2C3E50, #3D5A6E)`
- Update blur orb colors to match new accent

### page.tsx — ArticlesSection

- Change background from `var(--color-bg-mint)` to `var(--color-bg-blue)`

### page.tsx — Card Text Sizing

- In TreatmentsSection, change all card description `<p>` text from `text-xl` to `text-base` (lines 204, 243, 272, 286)
- In TipsAndSymptomsSection, change Symptomer card body from `text-xl` to `text-base` (line 336)
- Tip article link text stays at `text-lg md:text-xl` (these are list items, not card descriptions)
- In TipsAndSymptomsSection, change the hover circle from `group-hover:bg-[var(--color-bg-mint)]` to `group-hover:bg-[var(--color-bg-cream)]` (line 379) — warm hover on warm section

### Footer.tsx

- Background updates automatically via `var(--color-primary-dark)` token change
- No structural changes needed

## Files Changed

1. `src/app/globals.css` — palette tokens, button shadows, decorative elements
2. `src/app/page.tsx` — hero layout, remove PreCTASection, section backgrounds, text sizing
3. `src/components/Navbar.tsx` — remove transparent mode logic

## Files Not Changed

- `src/app/layout.tsx` — fonts stay the same (Fraunces + DM Sans)
- `src/components/Footer.tsx` — inherits token changes, no structural edits
- `src/data/content.ts` — content unchanged
- All other pages/components — inherit token changes automatically

## Out of Scope

- Adding new pages or routes
- Changing the page structure (section order, component types)
- Adding new components or animations
- Mobile-specific layout changes (current responsive approach is fine)
- Image replacement (using existing clinic photos)

# Ringebu Tannlegesenter — Warm Palette Site Redesign

## Summary

Replace the emerald green color system with a Soft Cream & Caramel warm palette across the entire site. Redesign the homepage hero from a gradient-overlay layout to a full-bleed photo with a slim bottom espresso band.

## Palette

| Token | Hex | Role |
|-------|-----|------|
| Espresso | `#3D3225` | Primary dark (replaces emerald-950/900) — hero band, footer, dark CTAs, navbar text, headings |
| Walnut | `#5C4A3A` | Secondary dark (replaces emerald-800) — dark cards, hover states |
| Warm Mid | `#7A6B55` | Muted text (replaces emerald-700 and some stone-600/700 in warm contexts) |
| Caramel | `#B8976A` | Accent (replaces emerald-600) — buttons, active states, accent bars, dots, eyebrows |
| Sand | `#C9B99A` | Subtle accent (replaces emerald-300/400) — secondary text on dark, hover highlights |
| Linen | `#E8DFCF` | Border color (replaces emerald-200 / stone-200 borders) |
| Cream | `#F0E6D6` | Card backgrounds, active nav states (replaces emerald-50/100) |
| Ivory | `#FDFBF7` | Page background / card bg (replaces white in key areas) |
| Gold | `#D4AF37` | Accent highlight — hero "smilet ditt" text, special emphasis |

## Critical: Raw Tailwind Classes

Many files use raw Tailwind `emerald-*` classes (e.g., `text-emerald-300`, `bg-emerald-50`, `hover:bg-emerald-50`) that bypass CSS variables entirely. These MUST be replaced with arbitrary value classes like `bg-[#F0E6D6]` or `text-[#B8976A]`, or with CSS variable references like `bg-[var(--color-accent)]`. Swapping CSS variables alone will NOT catch these.

### Emerald → Warm mapping for raw Tailwind classes

| Emerald class pattern | Warm replacement |
|----------------------|-----------------|
| `emerald-950` | `[#3D3225]` (Espresso) |
| `emerald-900` | `[#3D3225]` (Espresso) |
| `emerald-800` | `[#5C4A3A]` (Walnut) |
| `emerald-700` | `[#7A6B55]` (Warm Mid) |
| `emerald-600` | `[#B8976A]` (Caramel) |
| `emerald-500` | `[#B8976A]` (Caramel) |
| `emerald-400` | `[#C9B99A]` (Sand) |
| `emerald-300` | `[#C9B99A]` (Sand) |
| `emerald-200` | `[#E8DFCF]` (Linen) |
| `emerald-100` | `[#F0E6D6]` (Cream) |
| `emerald-50` | `[#F0E6D6]` (Cream) |

For opacity variants like `text-emerald-100/90`, use `text-[#F0E6D6]/90` (or `rgba()` inline).

## Changes by Component

### 1. globals.css — CSS Custom Properties & Utility Classes

**Replace the full emerald palette block** (lines 4-15) with warm equivalents using the same naming convention for backward compatibility:

- `--color-emerald-50` → `#F0E6D6` (Cream)
- `--color-emerald-100` → `#E8DFCF` (Linen)
- `--color-emerald-200` → `#E8DFCF` (Linen)
- `--color-emerald-300` → `#C9B99A` (Sand)
- `--color-emerald-400` → `#C9B99A` (Sand)
- `--color-emerald-500` → `#B8976A` (Caramel)
- `--color-emerald-600` → `#B8976A` (Caramel)
- `--color-emerald-700` → `#7A6B55` (Warm Mid)
- `--color-emerald-800` → `#5C4A3A` (Walnut)
- `--color-emerald-900` → `#3D3225` (Espresso)
- `--color-emerald-950` → `#3D3225` (Espresso)

**Update semantic tokens:**

- `--color-accent` → `#B8976A` (Caramel)
- `--color-accent-dark` → `#7A6B55` (Warm Mid)
- `--color-accent-light` → `#F0E6D6` (Cream)
- `--color-accent-gold` → `#B8976A` (Caramel)
- `--color-bg-mint` → `#FDFBF7` (Ivory)
- `--color-footer-bg` → `#3D3225` (Espresso)
- `--color-primary` → `#3D3225` (Espresso)
- `--color-primary-dark` → `#2A2118` (darker Espresso)
- `--color-primary-light` → `#5C4A3A` (Walnut)
- `--color-emerald` → `#3D3225` (Espresso)

**Update utility classes:**

- `.btn-primary` bg → `#B8976A` (Caramel), hover bg → `#A68658`, hover shadow → `rgba(184, 151, 106, 0.3)`
- `.btn-outline` border → `#B8976A`, hover bg → `#B8976A`, hover shadow → `rgba(184, 151, 106, 0.2)`
- `.btn-nav:hover` → color `#B8976A`, bg `#F0E6D6`
- `.btn-nav.active` → color `#7A6B55`, bg `#F0E6D6`
- `.eyebrow` color → `#B8976A`
- `.gradient-text` → `linear-gradient(135deg, #B8976A, #C9B99A)`
- `.accent-line` → `linear-gradient(90deg, #B8976A, #C9B99A)`
- `.gold-line` bg → `#B8976A`
- `.card:hover` → border-color `#E8DFCF`, shadow `rgba(184, 151, 106, 0.08)`
- `::selection` → bg `#F0E6D6`, color `#3D3225`

### 2. Homepage Hero (page.tsx — HeroSection)

**Current:** Full-viewport photo with dark emerald gradient overlay from the left. Text positioned left-center.

**New:** Full-viewport photo (keep parallax scroll). Remove the left gradient overlay. Add a slim semi-transparent espresso band at the bottom (~15-20% of viewport height) stretching full width. Move headline, subtitle, and CTAs into this band. Layout: text on the left, buttons on the right, single row.

- Band: `rgba(61,50,37,0.93)` with `backdrop-filter: blur(8px)`
- Subtle gradient above the band to blend into the photo: `linear-gradient(to top, rgba(61,50,37,0.5), transparent)` spanning ~120px above the band
- Accent text "smilet ditt" → gold `#D4AF37` instead of `text-emerald-300`
- Subtitle text → `rgba(255,255,255,0.7)` instead of `text-emerald-100/90`
- "Bestill time" button: Caramel bg with Espresso text
- "Se behandlinger" button: white border, white text on dark

### 3. Homepage Sections (page.tsx)

**TreatmentsSection:**
- Section heading `text-[var(--color-emerald-900)]` → uses CSS var (will auto-update)
- Eyebrow `text-[var(--color-emerald-600)]` → uses CSS var (will auto-update)
- "Se alle behandlinger" link: `text-[var(--color-emerald-700)]`, `border-[var(--color-emerald-700)]` → auto-updates
- Bento dark card `bg-[var(--color-emerald-800)]` → auto-updates to Walnut
- Bento dark card hover `hover:bg-[var(--color-emerald-700)]` → auto-updates
- Raw classes to replace: `bg-emerald-700/50` → `bg-[#7A6B55]/50`, `bg-emerald-600/50` → `bg-[#B8976A]/50`, `text-emerald-200` → `text-[#E8DFCF]`

**TipsAndSymptomsSection:**
- Section bg `bg-[var(--color-emerald-50)]` → auto-updates to Cream
- Dark card `bg-[var(--color-emerald-900)]` → auto-updates to Espresso
- Raw: `text-emerald-100/85` → `text-[#F0E6D6]/85`, `bg-emerald-700/50` → `bg-[#7A6B55]/50`, `bg-emerald-600/50` → `bg-[#B8976A]/50`, `text-emerald-200` → `text-[#E8DFCF]`

**ArticlesSection:**
- Eyebrow `text-[var(--color-emerald-600)]` → auto-updates
- Dot `bg-[var(--color-emerald-500)]` → auto-updates

**CTASection:**
- bg `bg-[var(--color-emerald-950)]` → auto-updates to Espresso
- Raw: `bg-emerald-400/10` → `bg-[#C9B99A]/10`, `bg-emerald-300/10` → `bg-[#C9B99A]/10`, `text-emerald-100/90` → `text-[#F0E6D6]/90`, `hover:bg-emerald-50` → `hover:bg-[#F0E6D6]`

### 4. Navbar (Navbar.tsx)

- Scrolled logo color `text-[var(--color-emerald-950)]` → auto-updates to Espresso
- Active link (scrolled): `bg-[var(--color-emerald-50)]` → auto-updates to Cream, `text-[var(--color-emerald-700)]` → auto-updates to Warm Mid
- Hover (scrolled): same pattern auto-updates
- Raw classes: `hover:text-[var(--color-emerald-600)]` → auto-updates, `hover:shadow-emerald-600/20` → `hover:shadow-[#B8976A]/20`
- CTA (scrolled): `bg-[var(--color-emerald-600)]` → auto-updates to Caramel, hover `bg-[var(--color-emerald-700)]` → auto-updates
- Home transparent state: `bg-white/20` → keep (neutral), `text-white/80 hover:text-white` → keep (neutral)
- Mobile active: `text-[var(--color-emerald-600)]` → auto-updates to Caramel

### 5. Footer (Footer.tsx)

- Background `bg-[var(--color-emerald-950)]` → auto-updates to Espresso
- Bottom bar border: `border-emerald-800/50` → replace with `border-[#5C4A3A]/50` or `border-white/10`
- No structural changes

### 6. Behandlinger Page (behandlinger/page.tsx)

- **Header section:** `bg-[var(--color-emerald-950)]` → auto-updates to Espresso
- **Treatment cards:** Update `cardColors` to `{ bg: "#FDFBF7", border: "#E8DFCF", dot: "#B8976A" }` (Ivory/Linen/Caramel)
- **Heading text:** `text-[var(--color-emerald-900)]` → auto-updates to Espresso
- **Payment info:** `bg-[var(--color-emerald-500)]` dot → auto-updates to Caramel
- **CTA section:** `bg-[var(--color-emerald-950)]` → auto-updates. Raw: `text-emerald-100/80` → `text-[#F0E6D6]/80`, `hover:bg-emerald-50` → `hover:bg-[#F0E6D6]`

### 7. Symptomer Page (symptomer/page.tsx)

- Header: `bg-[var(--color-emerald-950)]` → auto-updates. Raw: `text-emerald-300` → `text-[#C9B99A]`, `text-emerald-100/70` → `text-[#F0E6D6]/70`
- Section bg: `bg-[var(--color-emerald-50)]` → auto-updates to Cream
- CTA gradient: `from-[var(--color-emerald-800)] via-[var(--color-emerald-700)] to-[var(--color-emerald-600)]` → auto-updates to Walnut→Warm Mid→Caramel gradient
- Card accents → auto-update through CSS vars

### 8. Kontakt Page (kontakt/page.tsx)

- Header: `bg-[var(--color-emerald-950)]` → auto-updates to Espresso
- CTA card gradient: `from-[var(--color-emerald-800)] to-[var(--color-emerald-700)]` → auto-updates
- Raw emerald classes: replace same as other pages
- **Non-emerald accent colors** (sky-50/600, violet-50/600, amber-50/600 on info cards): Convert all to warm tones for palette consistency — use Cream bg, Caramel icon/accent for all info cards, unifying the look

### 9. Artikler Pages

**artikler/page.tsx:**
- Header: same emerald → espresso pattern
- Category badge `bg-[var(--color-emerald-600)]` → auto-updates to Caramel
- Bottom CTA section `bg-[var(--color-emerald-50)]` → auto-updates to Cream

**artikler/[slug]/page.tsx:**
- Hero overlay gradient: `from-[var(--color-emerald-950)] via-[var(--color-emerald-950)]/70` → auto-updates to Espresso
- Article headings: `text-[var(--color-emerald-900)]`, `text-[var(--color-emerald-800)]` → auto-updates
- Category badge: `bg-[var(--color-emerald-600)]` → auto-updates to Caramel
- Back link: Raw `text-emerald-200/80` → `text-[#E8DFCF]/80`
- Metadata: Raw `text-emerald-200/70` → `text-[#E8DFCF]/70`
- In-article CTA: `bg-[var(--color-emerald-50)]`, `border-[var(--color-emerald-100)]` → auto-updates

### 10. content.ts — treatmentColors

Current format uses Tailwind class strings. Update to arbitrary value classes:

```ts
export const treatmentColors: Record<string, { bg: string; text: string; icon: string }> = {
  emerald: { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  sky:     { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  violet:  { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  rose:    { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  amber:   { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  teal:    { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
};
```

### 11. priser/page.tsx

No changes needed — it only contains a redirect to `/behandlinger`.

## Out of Scope

- Font changes (Fraunces + DM Sans stay)
- Layout/structure changes beyond the homepage hero
- New components or pages
- Image changes
- Mobile-specific layout changes (responsive behavior stays the same)

## Implementation Order

1. `globals.css` — palette swap (CSS vars + utility classes). This auto-fixes ~60% of the site.
2. `Navbar.tsx` — fix raw emerald classes
3. `Footer.tsx` — fix raw emerald border class
4. `page.tsx` (homepage) — hero redesign + fix raw emerald classes in all sections
5. `behandlinger/page.tsx` — update cardColors + fix remaining emerald refs
6. `symptomer/page.tsx` — fix raw emerald classes
7. `kontakt/page.tsx` — fix raw emerald classes + unify non-emerald accent colors
8. `artikler/page.tsx` + `artikler/[slug]/page.tsx` — fix raw emerald classes
9. `content.ts` — update treatmentColors to arbitrary value classes

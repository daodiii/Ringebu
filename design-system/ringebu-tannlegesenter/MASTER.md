# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Ringebu Tannlegesenter
**Generated:** 2026-04-04
**Style:** Nature Distilled (Warm Scandinavian Hygge)
**Category:** Healthcare — Dental Clinic

---

## Design Direction

A warm, inviting Norwegian dental clinic that feels like a Scandinavian café — NOT a hospital. Earth tones from cream to espresso. Typography-driven hierarchy. No decorative icons. Natural textures and subtle warmth throughout.

**Keywords:** Muted earthy, warm clay, sand, cream, espresso, organic warmth, hygge, Scandinavian, handmade warmth, natural textures

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Description |
|------|-----|--------------|-------------|
| Primary (Dark) | `#3C2415` | `--color-primary` | Deep espresso — headings, dark cards |
| Primary Medium | `#5C3D2E` | `--color-primary-light` | Warm cocoa — secondary text on dark |
| Accent | `#C67B5C` | `--color-accent` | Terracotta/warm clay — CTAs, links |
| Accent Hover | `#A8624A` | `--color-accent-hover` | Darker terracotta for hover |
| Accent Light | `#D4B896` | `--color-accent-light` | Sand gold — badges, subtle accents |
| Bg Main | `#FEFBF6` | `--color-bg` | Warm off-white — page background |
| Bg Cream | `#F7F0E8` | `--color-bg-cream` | Warm cream — hero, alternating sections |
| Bg Sand | `#EDE4D8` | `--color-bg-blue` | Warm sand — alternating sections |
| Bg Latte | `#F2EBE0` | `--color-bg-yellow` | Warm latte — alternating sections |
| Bg Linen | `#E8DED1` | `--color-bg-mint` | Warm linen — card backgrounds |
| Text Primary | `#3C2415` | `--color-text-primary` | Deep espresso |
| Text Secondary | `#6B5344` | `--color-text-secondary` | Warm brown |
| Text Muted | `#A89279` | `--color-text-muted` | Sand — metadata, captions |
| Border | `#DDD3C5` | `--color-border` | Warm sand border |

**Warm Brown Scale (stone-50 → stone-900):**

| Token | Hex | Usage |
|-------|-----|-------|
| stone-50 | `#FAF7F2` | Lightest background |
| stone-100 | `#F5EDE3` | Card backgrounds |
| stone-200 | `#E8DDD0` | Borders, dividers |
| stone-300 | `#D4C4AA` | Muted accents |
| stone-400 | `#A89279` | Muted text |
| stone-500 | `#8B7355` | Secondary text |
| stone-600 | `#6B5344` | Body text |
| stone-700 | `#5C3D2E` | Strong text |
| stone-800 | `#4A2E1E` | Dark cards |
| stone-900 | `#3C2415` | Headings, darkest |

**Color Notes:** Entire palette from one warm family. Terracotta accent instead of bronze — more earthy and distinctive. All section backgrounds warm, no cool tones anywhere.

### Typography

Keep existing pairing — Fraunces (headings) + DM Sans (body) — these work well with the warm palette.

- **Heading Font:** Fraunces — soft serif with warmth, perfect for hygge
- **Body Font:** DM Sans — clean geometric sans, good readability
- **Accent text:** DM Sans weight 600, uppercase tracking 0.15em

### Key Effects

- Subtle parallax on hero
- Natural easing (ease-out) on all transitions
- Soft warm shadows using `rgba(60, 36, 21, 0.08)` not black
- No decorative icons — typography and color carry hierarchy
- Grain/texture overlays optional for character

---

## Icon Policy

**REMOVE all decorative Lucide icons** from content cards, data items, and sections.

**KEEP only functional icons:**
- Phone, Mail, MapPin, Clock — contact information
- Menu, X — navigation toggle
- ChevronDown, ChevronRight — interactive affordances
- ArrowRight, ArrowLeft — navigation links

---

## Component Specs

### Buttons

```css
.btn-primary {
  background: #C67B5C;  /* terracotta */
  color: white;
  padding: 14px 28px;
  border-radius: 9999px;  /* pill shape */
  font-weight: 500;
  transition: all 250ms ease-out;
  cursor: pointer;
}
.btn-primary:hover {
  background: #A8624A;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(198, 123, 92, 0.25);
}

.btn-outline {
  background: transparent;
  color: #3C2415;
  border: 1.5px solid #C67B5C;
  padding: 14px 28px;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 250ms ease-out;
  cursor: pointer;
}
.btn-outline:hover {
  background: #C67B5C;
  color: white;
}
```

### Cards

```css
.card {
  background: white;
  border-radius: 24px;
  border: 1px solid #DDD3C5;
  transition: all 300ms ease-out;
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 20px 60px rgba(60, 36, 21, 0.08);
  transform: translateY(-4px);
}
```

### Shadows

Use warm-tinted shadows throughout:
```css
--shadow-sm: 0 1px 3px rgba(60, 36, 21, 0.06);
--shadow-md: 0 4px 12px rgba(60, 36, 21, 0.08);
--shadow-lg: 0 12px 40px rgba(60, 36, 21, 0.1);
--shadow-xl: 0 20px 60px rgba(60, 36, 21, 0.12);
```

---

## Section: Combined Guide (Symptoms + Tips + Info)

Replace the separate Symptoms and Tips sections with one unified "Veiledning" section containing three distinct card types in a creative bento layout:

1. **Symptomer card** — Dark espresso background, compact, lists 3-4 symptom names, links to /symptomer
2. **Informasjon card** — Featured/accent treatment, terracotta border or gradient corner, links to /informasjon
3. **Tips & Råd card** — Warm cream background, numbered tip list, links to /informasjon

Three-column on desktop, stacked on mobile. Different visual weight for each card creates rhythm.

---

## Anti-Patterns (Do NOT Use)

- ❌ Cool blues, teals, or any cold tones
- ❌ Decorative Lucide icons on content cards
- ❌ Purple/pink AI gradients
- ❌ Generic card grids with uniform sizing
- ❌ Black shadows — always use warm-tinted
- ❌ Pure white (#FFFFFF) backgrounds — always warm off-white
- ❌ Emojis as icons

---

## Pre-Delivery Checklist

- [ ] All backgrounds warm-tinted (no pure white, no cool gray)
- [ ] No decorative icons on content items
- [ ] Terracotta accent consistent across all CTAs
- [ ] Shadows warm-tinted (rgba espresso, not black)
- [ ] Text contrast 4.5:1 minimum on all backgrounds
- [ ] cursor-pointer on all clickable elements
- [ ] Hover transitions 200-300ms ease-out
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

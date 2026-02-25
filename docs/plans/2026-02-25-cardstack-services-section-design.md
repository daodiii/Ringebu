# CardStack Services Section Design

**Date:** 2026-02-25
**Replaces:** Static 2x2 services grid (Section 3)

## Goal

Replace the current static services grid with an interactive draggable card stack component. The CardStack adds tactile interactivity to the services browsing experience while maintaining the editorial design system.

## Component: `src/components/ui/card-stack.tsx`

Based on the provided CardStack component, adapted for integration.

### Props Interface

```tsx
interface CardStackProps {
  cards: { id: number; src: string; alt: string; title: string; description: string }[];
  showArrows?: boolean; // default: true
}
```

### Removed from Original

- Full-screen `h-screen` layout (ScrollSection handles viewport sizing)
- SVG animated grid background
- Dark/light theme toggle, `isDark` state, and theme object
- Shuffle and reset buttons
- Standalone control bar UI

### Kept from Original

- Framer Motion drag-to-swipe on Y axis with spring physics (stiffness: 170, damping: 26)
- Card stacking with offset (10%), scale step (0.06), brightness dimming (0.15)
- `AnimatePresence` for card exit transitions
- Progress indicator dots
- Arrow navigation (left/right)
- Hover overlay showing title + description
- `rotateX` 3D perspective tilt during drag
- `useMotionValue` / `useTransform` for drag feedback

### Color Adaptation

| Element | Original | Adapted |
|---------|----------|---------|
| Card border | `border-gray-700` / `border-gray-300` | `border-[var(--color-border)]` |
| Card info overlay | `from-black/80` | `from-[var(--color-footer-bg)]/80` |
| Overlay title text | `text-white` | `text-[var(--color-bg-cream)]` |
| Overlay description | `text-white/80` | `text-[var(--color-bg-cream)]/80` |
| Active progress dot | `bg-white` / `bg-gray-900` | `bg-[var(--color-accent-gold)]` |
| Inactive progress dot | `bg-gray-700` / `bg-gray-300` | `bg-[var(--color-border)]` |
| Arrow button bg | `bg-gray-800/80` | `bg-[var(--color-footer-bg)] hover:bg-[var(--color-accent-gold)]` |
| Arrow icon | `text-white` | `text-[var(--color-bg-cream)]` |
| Card shadow | `rgba(0,0,0,0.7)` | `rgba(0,0,0,0.15)` (warm, lighter) |

## Section Layout in `page.tsx`

```
ScrollSection (id="services", bg="warm")
  └── container-width, centered, py-20
      ├── AnimatedContent: eyebrow "Våre Tjenester"
      ├── AnimatedContent: h2 "Behandlinger tilpasset deg"
      └── AnimatedContent: <CardStack cards={services} />
```

Card stack sizing: `w-full max-w-md` centered, `aspect-video` cards.

## Card Data

4 dental service cards:

1. **Generell Tannpleie** — "Undersøkelser, rengjøring og forebyggende behandling"
2. **Kosmetisk Tannpleie** — "Bleking, fasetter og estetiske løsninger"
3. **Implantat** — "Tannimplantater med naturlig utseende og holdbarhet"
4. **Akutt Behandling** — "Rask hjelp ved tannverk og akutte problemer"

Images: Unsplash stock photos matching warm dental/clinic aesthetic.

## Responsive

- **Desktop:** Card stack max-w-md centered, arrow buttons flanking
- **Mobile:** Full-width with horizontal padding, arrows hidden (drag-only navigation), progress dots visible below

## Files Changed

1. `src/components/ui/card-stack.tsx` — New file (adapted component)
2. `src/app/page.tsx` — Replace `ServicesSection` internals with CardStack

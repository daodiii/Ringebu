# Landing Page & Behandlinger Visual Upgrade

**Date:** 2026-04-04
**Status:** Approved

## Summary

Four visual improvements to the landing page and Behandlinger page:

1. **Hero section collage** — replace single image with asymmetric 3-image layout
2. **Toothbrush background** — restore `toothbrush-colorful.png` as background on Kron, Bro & Fyllinger card
3. **Two new clinic photos** — scenic valley view and dental instruments close-up placed in hero collage
4. **Behandlinger gradients** — unique warm-toned gradient per treatment card (Warm Distinction intensity, 18-35% opacity)

## 1. Hero Collage

**File:** `src/app/page.tsx` — `HeroSection` component

Replace the single `<Image>` block (lines 110-125) with an asymmetric grid:

```
┌─────────────────────────┐
│     Large image (60%)    │  ← clinic-valley.jpg (scenic Gudbrandsdalen)
├────────────┬────────────┤
│  Small (40%)│ Small (40%)│  ← clinic-instruments.jpg / ringebutannMain.jpg
└────────────┴────────────┘
```

- Grid: `grid-template-rows: 3fr 2fr`, columns `1fr 1fr` for bottom row
- Gap: 8px (`gap-2`)
- All images: `rounded-xl overflow-hidden`
- Mobile: stack vertically, large image first, two small side-by-side below
- Staggered fade-in animation per image tile

## 2. Toothbrush Background on Kron Card

**File:** `src/app/page.tsx` — Accent Card (line ~226)

Add `toothbrush-colorful.png` as a positioned background image inside the accent card:
- `position: absolute`, fill container
- `opacity: 0.12`, `object-cover`
- Scale 110% for depth, subtle hover scale to 105%
- Does not interfere with text readability

## 3. New Photos

Save user-provided photos to:
- `public/images/clinic-valley.jpg` — scenic mountain/valley view through glass
- `public/images/clinic-instruments.jpg` — dental instruments close-up

Used in hero collage (section 1).

## 4. Behandlinger Per-Treatment Gradients

**File:** `src/app/behandlinger/page.tsx`

Add a `gradient` field to each treatment's data. Applied as `background` on the card container. Warm Distinction intensity (18-35% opacity).

| Treatment | Gradient |
|-----------|----------|
| Forebyggende | `rgba(139,115,85,0.22)` → `rgba(212,184,150,0.30)` |
| Bleking | `rgba(198,123,92,0.22)` → `rgba(220,170,140,0.28)` |
| Fyllingsterapi | `rgba(180,160,120,0.20)` → `rgba(235,225,200,0.30)` |
| Kron og Bro | `rgba(195,150,110,0.25)` → `rgba(240,220,200,0.30)` |
| Rotfylling | `rgba(160,140,130,0.20)` → `rgba(210,200,190,0.28)` |
| Visdomstennene | `rgba(100,135,110,0.18)` → `rgba(180,210,185,0.25)` |
| Tannkjøtt & Tannstein | `rgba(175,155,130,0.20)` → `rgba(230,215,195,0.28)` |
| Bittskinner | `rgba(145,130,155,0.18)` → `rgba(210,200,220,0.25)` |
| Tannlegeskrekk | `rgba(190,165,140,0.22)` → `rgba(240,225,210,0.30)` |

- `cream` variant cards: gradient replaces flat `bg-[var(--color-bg-cream)]`
- `accent` variant cards: gradient replaces existing accent gradient
- `dark` variant cards: gradient applied as subtle overlay on top of dark bg
- `image` variant cards: gradient used as tint on the text area below the image

## Files Modified

- `src/app/page.tsx` — hero collage + toothbrush background
- `src/app/behandlinger/page.tsx` — per-treatment gradients
- `public/images/` — two new photos (user-provided)

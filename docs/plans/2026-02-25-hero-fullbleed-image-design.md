# Hero Section: Asymmetric Full-Bleed Image

**Date:** 2026-02-25
**Status:** Approved
**Image:** `/images/ringebutannMain.jpg` (portrait, dental chair photo)
**Mood:** Bold & impressive

## Goal

Replace the current contained hero image with a dramatic asymmetric full-bleed layout where the new dental chair photo dominates ~58% of the viewport width, bleeding to the right edge.

## Desktop Layout (lg+)

- Full-viewport-height hero section (`min-h-screen`)
- 12-column grid: text gets ~5 cols (left), image gets ~7 cols (right)
- Image bleeds to the right viewport edge — no right padding, no right border-radius
- Left edge of image gets `rounded-l-3xl` for a soft transition
- Text side keeps `container-width` left padding
- Image uses `object-cover` + `object-position: center`
- Subtle gradient overlay on the left edge of the image (~80px, cream → transparent) for seamless blend into text area

## Mobile Layout

- Image stacks on top, text below
- Image spans full width, ~45vh height, `rounded-b-2xl` bottom corners
- Text gets standard container padding below
- Image still uses `object-cover` + `object-center`

## Animation

- Image: slides in from right with scale-down (1.05 → 1.0), opacity fade, ~1.2s ease
- Text elements: same staggered fade-up as current (eyebrow → heading → body → button at 0, 0.15, 0.3, 0.45s delays)

## Image Treatment

- `object-cover` with `object-position: center` to keep chair centered
- Subtle left-edge gradient overlay (cream to transparent, ~80px) for blending
- No shadow or border on right edge (bleeds to viewport)
- On mobile: no gradient overlay needed (image is above, not adjacent)

## What Changes

- `HeroSection` in `src/app/page.tsx`: restructure from contained 2-col to asymmetric bleed grid
- Remove the old rounded card container (`max-w-md lg:max-w-lg aspect-[3/4] rounded-2xl`)
- Image source changes from `hero-dentist.jpg` to `ringebutannMain.jpg`
- ScrollSection wrapper stays the same (bg="cream")

## What Stays the Same

- All text content (eyebrow, heading, body, button)
- AnimatedContent stagger delays
- ScrollSection wrapper
- Navbar position and behavior
- Snap scroll behavior

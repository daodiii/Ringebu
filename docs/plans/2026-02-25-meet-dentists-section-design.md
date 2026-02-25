# Meet Our Dentists Section — Design Document

**Date:** 2026-02-25
**Project:** Ringebu Tannlegesenter
**Scope:** Replace Gallery (section 4) with "Meet Our Dentists" using CircularTestimonials component

---

## Overview

Replace the placeholder image mosaic in section 4 with a 3D circular carousel showcasing the dental team. Uses the CircularTestimonials component adapted with Lucide icons and editorial warm neutral colors.

## Technical Approach

- Drop-in CircularTestimonials component at `src/components/ui/circular-testimonials.tsx`
- Swap `react-icons` (FaArrowLeft/FaArrowRight) for `lucide-react` (ArrowLeft/ArrowRight)
- Keep `style jsx` (Next.js native)
- No new dependencies
- Replace `GallerySection` in `page.tsx` with new `TeamSection`
- Update SectionDots label from "Galleri" to "Teamet"

## Color Mapping

| Prop | Value | Token |
|------|-------|-------|
| name | `#2C2825` | --color-text-dark |
| designation | `#B8A88A` | --color-accent-gold |
| testimony (bio) | `#5C5650` | --color-text-body |
| arrowBackground | `#2C2825` | --color-text-dark |
| arrowForeground | `#FAF8F5` | --color-bg-cream |
| arrowHoverBackground | `#B8A88A` | --color-accent-gold |

## Font Sizes

| Element | Size |
|---------|------|
| Name | 24px |
| Designation | 14px |
| Bio/quote | 17px |

## Section Layout

- ScrollSection with bg="warmest"
- Eyebrow centered: "Vart Team"
- Heading (Playfair Display): "Mot tannlegene vare"
- CircularTestimonials component centered below
- AnimatedContent wrapper for fade-in

## Team Data

1. **Dr. Lars Haugen** — Tannlege, Klinikksjef
   - Bio about patient-first philosophy and leading the clinic
   - Professional male portrait photo (Unsplash)

2. **Dr. Ingrid Moen** — Tannlege, Kosmetisk Spesialist
   - Bio about creating confident smiles and aesthetic dentistry
   - Professional female portrait photo (Unsplash)

3. **Dr. Erik Nordby** — Tannlege, Implantologi
   - Bio about modern techniques and precision implant work
   - Professional male portrait photo (Unsplash)

## Files Affected

- Create: `src/components/ui/circular-testimonials.tsx`
- Modify: `src/app/page.tsx` (replace GallerySection with TeamSection)
- Modify: `src/components/SectionDots.tsx` (update label "Galleri" to "Teamet")

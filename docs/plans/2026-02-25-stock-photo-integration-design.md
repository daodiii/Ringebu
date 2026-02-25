# Stock Photo Integration Design

## Goal

Replace all 6 `ImagePlaceholder` components on the homepage with high-resolution, royalty-free dental stock photos from Pexels. Purpose: visualize the editorial design with real imagery.

## Photo Style

Warm & inviting — soft lighting, friendly faces, cozy clinic interiors. Matches the existing warm cream/gold editorial aesthetic.

## Image Map

| Slot | Section | Pexels ID | Photo Subject | Dimensions | Filename |
|------|---------|-----------|--------------|------------|----------|
| 1 | Hero (right) | 7578806 | Smiling doctor portrait | 3:4, ~1200x1600 | `hero-dentist.jpg` |
| 2 | About (left) | 30902075 | Modern dental office interior | Tall, ~1200x1800 | `about-clinic.jpg` |
| 3 | Service: Generell Tannpleie | 3845683 | Dental check-up | 16:10, ~800x500 | `service-general.jpg` |
| 4 | Service: Kosmetisk | 6627574 | Smiling woman in dentist chair | 16:10, ~800x500 | `service-cosmetic.jpg` |
| 5 | Service: Implantat | 6812453 | Dental equipment in clinic | 16:10, ~800x500 | `service-implant.jpg` |
| 6 | Service: Akutt | 6529110 | Patient having dental treatment | 16:10, ~800x500 | `service-emergency.jpg` |

Note: Team section already uses real Unsplash images. Contact section has no images.

## Source

Pexels (free, no attribution required, high-res). Download via direct URL.

## Implementation

1. Download 6 photos to `/public/images/`
2. Replace `<ImagePlaceholder>` with Next.js `<Image>` in `src/app/page.tsx`
3. Use `fill` + `object-fit: cover` to maintain current layout
4. Set `priority` on hero image (above-the-fold)
5. Keep `ImagePlaceholder` component file intact as fallback

## Files Modified

- `src/app/page.tsx` — swap 6 placeholder calls for `<Image>` components
- `/public/images/` — add 6 new `.jpg` files

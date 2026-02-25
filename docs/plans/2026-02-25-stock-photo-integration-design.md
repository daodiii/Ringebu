# Stock Photo Integration Design

## Goal

Replace all 9 `ImagePlaceholder` components on the homepage with high-resolution, royalty-free dental stock photos from Pexels. Purpose: visualize the editorial design with real imagery.

## Photo Style

Warm & inviting — soft lighting, friendly faces, cozy clinic interiors. Matches the existing warm cream/gold editorial aesthetic.

## Image Map

| Slot | Section | Photo Subject | Dimensions | Filename |
|------|---------|--------------|------------|----------|
| 1 | Hero (right) | Friendly dentist portrait, warm lighting | 3:4, ~1200x1600 | `hero-dentist.jpg` |
| 2 | About (left) | Welcoming clinic interior, natural light | Tall, ~1200x1800 | `about-clinic.jpg` |
| 3 | Service card 1 | Routine checkup scene | 16:10, ~800x500 | `service-general.jpg` |
| 4 | Service card 2 | Bright smile / whitening result | 16:10, ~800x500 | `service-cosmetic.jpg` |
| 5 | Service card 3 | Modern implant technology | 16:10, ~800x500 | `service-implant.jpg` |
| 6 | Service card 4 | Caring dentist with patient | 16:10, ~800x500 | `service-emergency.jpg` |
| 7 | Gallery large | Clinic reception/waiting area | ~1200x900 | `gallery-interior.jpg` |
| 8 | Gallery small 1 | Treatment room with chair | ~600x450 | `gallery-treatment.jpg` |
| 9 | Gallery small 2 | Modern dental tools close-up | ~600x450 | `gallery-equipment.jpg` |

## Source

Pexels (free, no attribution required for use, high-res). Download via Pexels API or direct URL.

## Implementation

1. Download 9 photos to `/public/images/`
2. Replace `<ImagePlaceholder>` with Next.js `<Image>` in `src/app/page.tsx`
3. Use `fill` + `object-fit: cover` to maintain current layout
4. Set `priority` on hero image (above-the-fold)
5. Add `placeholder="blur"` with generated `blurDataURL` for smooth loading
6. Keep `ImagePlaceholder` component file intact as fallback

## Files Modified

- `src/app/page.tsx` — swap 9 placeholder calls for `<Image>` components
- `/public/images/` — add 9 new `.jpg` files

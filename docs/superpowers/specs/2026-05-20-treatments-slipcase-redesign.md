# Treatments section redesign — Slipcase with subtle tonal spines

**Date:** 2026-05-20
**Status:** Approved by user, ready for implementation
**Scope:** Homepage only (`src/app/page.tsx`). Other pages out of scope.

## Problem

The current `TreatmentsBento` section sits immediately below the hero. It has two issues:

1. **Image redundancy.** Four of the six bento tiles reuse hero photos (`clinic-instruments.jpg`, `ringebutannMain.jpg`, `clinic-valley.jpg`, `clinic-sign.jpg`). One image (`hero-clinic.jpg`) is used twice within the bento for two different treatments. The eye sees the same photos twice on first scroll.
2. **Generic feel.** A standard bento grid reads as "Squarespace template," not as a clinic that the homepage's cinematic hero promises.

## Decision

Replace `TreatmentsBento` with `TreatmentsSlipcase` — six vertical "spines" laid out horizontally on desktop. One spine is open at a time and expands into a dark, editorial card; the other five remain collapsed with their name rendered vertically and a brass index number at the top.

The dramatic moment is the ink-dark expanded card contrasting against the cream closed spines. Photos do not appear in this section at all — the next photo-rich section (TrustSection) gets to land fresh.

## Spine tones (subtle variant)

All closed spines use slightly different shades within the warm palette. Variation is 5–8% — coherent at a glance, intentional on closer look. Open spine remains `--color-ink` for the contrast moment.

| # | Treatment | Closed tone | Hex |
|---|---|---|---|
| 01 | Forebyggende | paper-warm (base) | `#EFE8DA` |
| 02 | Generell tannbehandling | bonier | `#EBE2CE` |
| 03 | Akutt tannhjelp | slightly warmer cream | `#F0E8D6` |
| 04 | Bleking & estetikk | subtly cooler | `#ECE6D6` |
| 05 | Implantater | slightly deeper warm | `#E8DCC2` |
| 06 | Rotbehandling | slightly amber | `#EEE3CC` |

## Behavior

- **Desktop (≥ md):** Six spines, fixed height 520px, horizontal row. First spine open by default. Hover or click switches the open spine. Open spine expands to ~5x width using a flex transition (0.7s, cinematic ease).
- **Mobile (< md):** Accordion. Each spine becomes a row with the index number, treatment name, and a brass dot indicator. Tapping a row expands it inline.
- **Reduced motion:** Skip flex transition; spine swaps are instant.

## Open card content

- Treatment name in large light-weight display (clamp 34–56px, weight 300)
- Status data (mono, brass amber tint): refusjon code, duration
- Lede line in amber, 18px
- Detail paragraph in muted amber, 14px
- "Les mer" CTA in mono caps + ArrowUpRight

## Closed spine content

- Brass tick hairline along top edge
- Mono index number (01–06) top-left
- Treatment name written vertically (`writing-mode: vertical-rl; rotate(180deg)`) centered in the spine

## Files to change

| Action | File |
|---|---|
| Add | `src/components/home/TreatmentsSlipcase.tsx` (final, promoted from mockup) |
| Replace import | `src/app/page.tsx` — swap `TreatmentsBento` for `TreatmentsSlipcase` |
| Keep (for now) | `src/components/home/TreatmentsBento.tsx` — leave in repo until verified live, then delete in a follow-up |

The mockup directory (`src/components/mockup/`, `src/app/mockup-treatments/`) stays intact so we can iterate on the tonal map and other section work without rebuilding the comparison harness.

## Out of scope

- Page-wide tonal map (different sections in different warm tones) — separate discussion in progress
- Replacing `TreatmentsBento.tsx` (just leave it un-imported; delete in cleanup pass)
- Anything on `/behandlinger`, `/symptomer`, `/kontakt`, or other internal pages

## Verification

- Type check passes (`npx tsc --noEmit`)
- Lint passes (`npx eslint src/`)
- User confirms in browser: hero → slipcase reads correctly, photo redundancy is gone, hover/click reveals work, mobile accordion works, reduced-motion respected

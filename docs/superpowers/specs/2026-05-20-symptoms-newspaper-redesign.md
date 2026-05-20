# Symptoms section redesign — Almanak newspaper front page

**Date:** 2026-05-20
**Status:** Approved by user, ready for implementation
**Scope:** Homepage only (`src/app/page.tsx`). Other pages out of scope.

## Problem

The current `SymptomsAlmanac` section reads as a stock "blog teaser" — white cards on cream with no dark anchor, low visual contrast, and a layout that competes with rather than complements the slipcase above.

## Decision

Replace `SymptomsAlmanac` with `SymptomsNewspaper` — a single-page almanac-newspaper front page.

## Layout

- **Masthead.** Two-line header reminiscent of a broadsheet front page:
  - Top row: "Almanakken · Symptomer" (brass mono) + "Utgave 01 · Ringebu" (muted mono), separated by a 2px ink rule
  - Bottom row: italic strapline ("Veiledning til de vanligste tegnene — ikke selvdiagnose.") + "Anno 1985" (muted mono), separated by a 1px rule
- **Top story (feature article).** Most urgent symptom is the front-page feature:
  - Large light-weight headline (`clamp(40px, 6vw, 84px)`, weight 300)
  - Italic lede in the symptom's description (clamp 18–22px)
  - "Les hele oppslaget →" uppercase mono link
  - Sidebar (`md:col 1fr`): "Hva gjør jeg?" eyebrow + body, then "Mulige årsaker" list with brass dots
  - No "Hovedoppslag · Krever umiddelbar handling" eyebrow above the headline (per user feedback — the type does the talking)
- **Below the fold.** Brass "Også notert" eyebrow + brass rule, then a 3-column grid of the remaining 5 symptoms:
  - Each: severity dot + tier label (Nå / Undersøk / Følg med) + medium-weight name + 1-line description
  - Top ink rule per column to evoke broadsheet columns
- **Colophon.** "Se alle symptomer" + "Les fra journalen" links above a single brass rule.

## Behavior

- Whole section reveals on scroll with a single 0.8s fade-up (no per-row stagger — it's a single editorial spread, not a list).
- Reduced-motion respected.

## Article tips removed from this section

The current Almanac includes 3 article tips on the right. These are dropped from the newspaper redesign. They can be reintroduced inside `AboutPlate` (which gets a refresh next in the queue) or rely on the existing "Les fra journalen →" footer link.

## Files to change

| Action | File |
|---|---|
| Add | `src/components/home/SymptomsNewspaper.tsx` (live, standalone — inlines `mapSeverity` helper, uses CSS vars for severity colors) |
| Replace import | `src/app/page.tsx` — swap `SymptomsAlmanac` for `SymptomsNewspaper` |
| Keep (for now) | `src/components/home/SymptomsAlmanac.tsx` — leave un-imported; delete in a follow-up cleanup pass |

The mockup harness at `/mockup-symptoms` stays intact for future iteration.

## Verification

- Type check passes (`npx tsc --noEmit`)
- Lint passes
- User confirms on the real homepage: hero → slipcase → newspaper reads correctly, feature lede + sidebar both render, 3-col grid lays out at md+, mobile stacks cleanly, reduced-motion respected.

## Out of scope

- CtaCloseout, AboutPlate, TrustSection redesigns — separate next steps in the same homepage round
- Inner pages (kontakt, behandlinger, symptomer, artikler) — separate scope
- Replacing `SymptomsAlmanac.tsx` (just un-import; delete in cleanup)

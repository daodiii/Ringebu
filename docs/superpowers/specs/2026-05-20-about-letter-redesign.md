# AboutPlate redesign — Brev fra dalen (letter)

**Date:** 2026-05-20
**Status:** Approved by user, ready for implementation
**Scope:** Homepage only (`src/app/page.tsx`). Other pages out of scope.

## Problem

The current `AboutPlate` reuses `ringebutannMain.jpg` — the same photo dominating the hero's top-left tile. This is the same photo redundancy disease cured in the treatments and CTA sections, recurring here. Beyond the redundancy: a "section title + body + photo + data cells" pattern is generic and doesn't carry the "small clinic, time for each patient" message in any felt way.

## Decision

Replace `AboutPlate` with `AboutLetter` — a typographic letter from the clinic to the visitor, centered on a paper-warm field with no photo at all.

The letter form is the precise gesture that matches the brand's message. A small village dental clinic writing to its patients is more intimate than a marketing section can ever be.

## Layout

- **Letterhead.** Single-row eyebrow: "Brev fra dalen" (brass mono) + "Ringebu · Gudbrandsdalen" (muted mono), separated by a thin rule.
- **Salutation.** "Kjære pasient," in italic, light-weight, large (clamp 22–32px).
- **Body.** Four short paragraphs in light-weight sans (300 weight, ~17–19px, line-height 1.7). Generous spacing between paragraphs:
  1. "Vi er et lite kontor i Gudbrandsdalen — få ansatte, fire stoler…"
  2. "Vi har holdt til i Hanstadgata siden 1985…"
  3. "Hos oss er ikke timen din en transaksjon…"
  4. "Vi gleder oss til å møte deg."
- **Signature block.** "Med vennlig hilsen," (italic muted) + "Ringebu Tannlegesenter" (italic medium) + "Anno 1985" (mono brass). A circular brass stamp on the right with "RTS" / "1985" inside a double-ring frame.
- **Postscript (P.S.).** Below a thin rule. Holds the practical data: Adresse, Telefon (linked), Åpningstid, Parkering — laid out as a 4-column dl on desktop, 2-col on mobile, with mono brass labels.

## Behavior

- Whole section reveals on scroll with a single 0.9s fade-up (one breath, not staggered).
- Reduced-motion respected.
- Telephone number is `tel:` linked. No other interactive elements.

## Visual tokens

- Background: `var(--color-paper-warm)` (unchanged from the section it replaces).
- Max content width: 780px centered (letter feel).
- Brass stamp circle: 80px, 1.5px brass border, nested inset shadow rings using paper-warm + 35% brass.

## Files to change

| Action | File |
|---|---|
| Add | `src/components/home/AboutLetter.tsx` (live, standalone) |
| Replace import | `src/app/page.tsx` — swap `AboutPlate` for `AboutLetter` |
| Keep (for now) | `src/components/home/AboutPlate.tsx` — un-import; delete in a follow-up cleanup pass |

The mockup harness at `/mockup-about` stays intact.

## Verification

- Type check passes (`npx tsc --noEmit`)
- Lint passes
- User confirms on the real homepage: hero → slipcase → trust → newspaper → letter → CTA reads correctly, letter centered properly, postscript data is correct, mobile stacks cleanly, reduced-motion respected.

## Out of scope

- TrustSection polish (next and final homepage step)
- Inner pages (kontakt, behandlinger, symptomer, artikler) — separate scope
- Replacing `AboutPlate.tsx` (un-import, delete in cleanup)

# Card Section Overhaul Design

## Goal
Redesign Section 3 (Services / CardStack) to make the card the dominant visual element, remove unnecessary controls, and shrink the title.

## Changes

### Title
- Shrink the main heading "Behandlinger tilpasset deg" by ~90% — from large serif heading to a small, subtle label (~text-sm/text-xs)
- The "Vare Tjenester" eyebrow label stays or gets removed to avoid redundancy with the now-small title

### Buttons Removed
- Reset button: removed entirely
- Shuffle button: removed entirely
- Left/right arrow buttons: **kept** on desktop (lg+)

### Card Sizing
- Width: from fixed 320px to ~85-90% of viewport width (capped at ~900-1000px max)
- Aspect ratio: from 16:9 to ~3:4 or 4:5 (tall, dominant card)
- Stacked cards behind maintain offset/scale/dimming at the new larger size
- Card border, shadows, hover overlay all remain unchanged

### Unchanged
- Progress dots, counter text, instruction text stay below card
- Drag/swipe interaction unchanged
- Section background stays warm beige
- Desktop arrow navigation stays

## Files to Modify
- `src/components/ui/card-stack.tsx` — card sizing, remove reset/shuffle buttons
- `src/app/page.tsx` — shrink ServicesSection title

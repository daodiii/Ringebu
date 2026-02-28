# Card Stack: Unified Drag/Arrow Transition

**Date:** 2026-02-25
**Status:** Approved
**File:** `src/components/ui/card-stack.tsx`

## Goal

Dragging a card up/down should produce the exact same visual result as clicking the left/right arrows. No extra scaling, tilting, or fading during drag.

## Changes

1. **Remove `whileDrag` scale effect** — Delete `whileDrag` prop (scale 1.02, zIndex bump, cursor change). Card stays natural size during drag.
2. **Remove `rotateX` tilt** — Remove `useTransform` mapping `dragY` to `rotateX`, remove `rotateX` from front card style. No tilt during drag.
3. **Remove opacity fade-out** — Remove `dragDirection` state and conditional opacity. Cards never fade out on release.
4. **Remove 150ms delay** — In `handleDragEnd`, call `moveToEnd()`/`moveToStart()` immediately instead of `setTimeout`. Identical to arrow click behavior.
5. **Keep drag-follow** — `drag="y"`, `dragConstraints`, `dragElastic` stay. Card follows finger on Y axis.

## What stays the same

- Spring animation config
- `moveToEnd` / `moveToStart` card reordering logic
- Arrow buttons
- Offset, scale step, dim step stacking
- Swipe threshold detection

## Result

During drag: card moves with finger (Y axis, no scale/tilt). On release past threshold: exact same instant reorder + spring animation as clicking an arrow.

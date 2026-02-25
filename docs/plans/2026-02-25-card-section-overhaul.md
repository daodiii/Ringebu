# Card Section Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the card stack the dominant visual element in Section 3 by enlarging the card, shrinking the title, and removing reset/shuffle buttons.

**Architecture:** Two-file change. Shrink the heading in page.tsx, then modify card-stack.tsx to remove buttons and resize the card container from 320px/16:9 to ~85vw/3:4.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion

---

### Task 1: Shrink the Services section title

**Files:**
- Modify: `src/app/page.tsx:157-162`

**Step 1: Replace the heading block**

Change the `AnimatedContent` block containing the eyebrow + heading from:

```tsx
<AnimatedContent className="text-center mb-12 lg:mb-16">
  <span className="eyebrow block mb-4">Våre Tjenester</span>
  <h2 className="heading-editorial text-3xl lg:text-5xl">
    Behandlinger tilpasset deg
  </h2>
</AnimatedContent>
```

To a single small label with reduced margin:

```tsx
<AnimatedContent className="text-center mb-6">
  <span className="text-xs font-sans font-light tracking-widest uppercase text-[var(--color-text-muted)]">
    Behandlinger tilpasset deg
  </span>
</AnimatedContent>
```

This removes the eyebrow (redundant) and shrinks the heading to an eyebrow-sized label. Margin reduced from `mb-12 lg:mb-16` to `mb-6`.

**Step 2: Verify in browser**

Run dev server, scroll to Section 3. Confirm the title is now a small, subtle label above the card stack.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "style: shrink services section heading to small label"
```

---

### Task 2: Remove reset and shuffle buttons from CardStack

**Files:**
- Modify: `src/components/ui/card-stack.tsx:60-68` (functions)
- Modify: `src/components/ui/card-stack.tsx:97-119` (button JSX)

**Step 1: Remove the shuffleCards and resetCards functions**

Delete lines 60-68 (the `shuffleCards` and `resetCards` function bodies):

```tsx
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const resetCards = () => {
    setCards(initialCards);
    setCurrentIndex(0);
  };
```

**Step 2: Remove the top controls JSX block**

Delete the entire `{/* Top Controls — Shuffle & Reset */}` div (lines 97-119):

```tsx
      {/* Top Controls — Shuffle & Reset */}
      <div className="flex gap-2">
        <motion.button
          onClick={resetCards}
          ...
        </motion.button>
        <motion.button
          onClick={shuffleCards}
          ...
        </motion.button>
      </div>
```

**Step 3: Verify in browser**

Confirm the reset and shuffle buttons are gone. Arrow buttons and drag should still work.

**Step 4: Commit**

```bash
git add src/components/ui/card-stack.tsx
git commit -m "feat: remove shuffle and reset buttons from card stack"
```

---

### Task 3: Enlarge the card to fill most of the section

**Files:**
- Modify: `src/components/ui/card-stack.tsx:135-138` (card container sizing)

**Step 1: Change the card container dimensions**

Replace the fixed-size card container:

```tsx
<div
  className="relative overflow-visible"
  style={{ width: "320px", aspectRatio: "16/9" }}
>
```

With a responsive, large container:

```tsx
<div
  className="relative overflow-visible w-[85vw] max-w-[900px]"
  style={{ aspectRatio: "3/4" }}
>
```

This makes the card 85% of viewport width (capped at 900px) with a tall 3:4 portrait ratio.

**Step 2: Verify in browser**

Scroll to Section 3. The card should now dominate the section — wide and tall. Stacked cards should still appear behind with offset/scale. Drag and arrows should still work.

**Step 3: Commit**

```bash
git add src/components/ui/card-stack.tsx
git commit -m "style: enlarge card stack to 85vw with 3:4 aspect ratio"
```

---

### Task 4: Final visual verification

**Step 1: Full page walkthrough**

Scroll through all sections. Confirm:
- Section 3 title is a small subtle label
- No reset/shuffle buttons visible
- Card is large, ~85% viewport width, tall 3:4 ratio
- Stacked cards visible behind with offset/dimming
- Arrow buttons work on desktop
- Drag/swipe works on the front card
- Progress dots and counter text render below the card
- No layout overflow or broken spacing

**Step 2: Check mobile viewport**

Resize to mobile width. Card should still look proportional (85vw scales down naturally). Arrows hidden on mobile. Drag still works.

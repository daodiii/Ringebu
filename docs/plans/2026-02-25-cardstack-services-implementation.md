# CardStack Services Section — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static 2x2 services grid (Section 3) with an interactive draggable card stack showing dental services.

**Architecture:** A new `CardStack` component in `src/components/ui/card-stack.tsx` accepts an array of card data via props and renders a Framer Motion draggable card stack with spring physics. The existing `ServicesSection` in `page.tsx` passes dental service data into it. All standalone demo chrome (theme toggle, shuffle, reset, grid background) is stripped; only the interactive card stack, progress dots, and arrow navigation remain.

**Tech Stack:** Next.js 16, React 19, Framer Motion 12, Lucide React, Tailwind CSS v4 (inline theme)

**Design doc:** `docs/plans/2026-02-25-cardstack-services-section-design.md`

---

## Task 1: Create the adapted CardStack component

**Files:**
- Create: `src/components/ui/card-stack.tsx`

**Step 1: Create the component file**

Write the full adapted CardStack component. This is the original component with these changes:
- Accept `cards` and `showArrows` as props instead of hardcoded `initialCards`
- Remove: `h-screen` wrapper, SVG grid background, theme toggle, shuffle/reset buttons, `isDark` state, entire theme object
- Replace all color references with CSS variables from the design system
- Arrow buttons: positioned relative to the card stack container, hidden on mobile (`hidden lg:flex`)
- Progress dots: use `--color-accent-gold` for active, `--color-border` for inactive
- Card info overlay: use `--color-footer-bg` gradient with `--color-bg-cream` text
- Card border: `--color-border`
- Card shadows: lighter warm shadows (`rgba(0,0,0,0.15)` front, `rgba(0,0,0,0.08)` back)
- Remove unused `opacity` transform (it's defined but never used in the original)
- Remove unused `useEffect` import

```tsx
"use client";

import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Card {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CardStackProps {
  cards: Card[];
  showArrows?: boolean;
}

export default function CardStack({ cards: initialCards, showArrows = true }: CardStackProps) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [dragDirection, setDragDirection] = useState<"up" | "down" | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

  // Configuration
  const offset = 10;
  const scaleStep = 0.06;
  const dimStep = 0.15;
  const borderRadius = 12;
  const swipeThreshold = 50;

  const spring = {
    type: "spring" as const,
    stiffness: 170,
    damping: 26,
  };

  const moveToEnd = () => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % initialCards.length);
  };

  const moveToStart = () => {
    setCards((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prev) => (prev - 1 + initialCards.length) % initialCards.length);
  };

  const handleDragEnd = (_: unknown, info: { velocity: { y: number }; offset: { y: number } }) => {
    const velocity = info.velocity.y;
    const dy = info.offset.y;

    if (Math.abs(dy) > swipeThreshold || Math.abs(velocity) > 500) {
      if (dy < 0 || velocity < 0) {
        setDragDirection("up");
        setTimeout(() => {
          moveToEnd();
          setDragDirection(null);
        }, 150);
      } else {
        setDragDirection("down");
        setTimeout(() => {
          moveToStart();
          setDragDirection(null);
        }, 150);
      }
    }
    dragY.set(0);
  };

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Card Stack + Arrows wrapper */}
      <div className="relative flex items-center gap-4 lg:gap-8">
        {/* Left Arrow */}
        {showArrows && (
          <motion.button
            onClick={moveToStart}
            className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-footer-bg)] hover:bg-[var(--color-accent-gold)] transition-colors duration-200 shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-bg-cream)]" />
          </motion.button>
        )}

        {/* Card Stack */}
        <div className="relative w-full max-w-md aspect-video overflow-visible">
          <ul className="relative w-full h-full m-0 p-0">
            <AnimatePresence>
              {cards.map(({ id, src, alt, title, description }, i) => {
                const isFront = i === 0;
                const brightness = Math.max(0.3, 1 - i * dimStep);
                const baseZ = cards.length - i;

                return (
                  <motion.li
                    key={id}
                    className="absolute w-full h-full list-none overflow-hidden border border-[var(--color-border)] rounded-xl"
                    style={{
                      borderRadius: `${borderRadius}px`,
                      cursor: isFront ? "grab" : "auto",
                      touchAction: "none",
                      boxShadow: isFront
                        ? "0 25px 50px rgba(0, 0, 0, 0.15)"
                        : "0 15px 30px rgba(0, 0, 0, 0.08)",
                      rotateX: isFront ? rotateX : 0,
                      transformPerspective: 1000,
                    }}
                    animate={{
                      top: `${i * -offset}%`,
                      scale: 1 - i * scaleStep,
                      filter: `brightness(${brightness})`,
                      zIndex: baseZ,
                      opacity: dragDirection && isFront ? 0 : 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={spring}
                    drag={isFront ? "y" : false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.7}
                    onDrag={(_, info) => {
                      if (isFront) {
                        dragY.set(info.offset.y);
                      }
                    }}
                    onDragEnd={handleDragEnd}
                    whileDrag={
                      isFront
                        ? {
                            zIndex: cards.length + 1,
                            cursor: "grabbing",
                            scale: 1.05,
                          }
                        : {}
                    }
                    onHoverStart={() => isFront && setShowInfo(true)}
                    onHoverEnd={() => setShowInfo(false)}
                  >
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable={false}
                    />

                    {/* Card Info Overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-footer-bg)]/80 to-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isFront && showInfo ? 1 : 0,
                        y: isFront && showInfo ? 0 : 20,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-[var(--color-bg-cream)] font-serif font-bold text-lg">
                        {title}
                      </h3>
                      <p className="text-[var(--color-bg-cream)]/80 font-sans text-sm font-light">
                        {description}
                      </p>
                    </motion.div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        {/* Right Arrow */}
        {showArrows && (
          <motion.button
            onClick={moveToEnd}
            className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-footer-bg)] hover:bg-[var(--color-accent-gold)] transition-colors duration-200 shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-bg-cream)]" />
          </motion.button>
        )}
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2">
        {initialCards.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex % initialCards.length
                ? "bg-[var(--color-accent-gold)] w-8"
                : "bg-[var(--color-border)] w-1.5"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Verify the file exists and has no syntax errors**

Run: `npx tsc --noEmit src/components/ui/card-stack.tsx 2>&1 | head -20`

Expected: No errors (or only project-level config warnings, no component-specific errors).

**Step 3: Commit**

```bash
git add src/components/ui/card-stack.tsx
git commit -m "feat: add CardStack component adapted for editorial design system"
```

---

## Task 2: Replace ServicesSection with CardStack

**Files:**
- Modify: `src/app/page.tsx:1-10` (imports) and `src/app/page.tsx:114-168` (ServicesSection function)

**Step 1: Add the CardStack import**

In `src/app/page.tsx`, add this import alongside the existing ones (after the CircularTestimonials import on line 9):

```tsx
import CardStack from "@/components/ui/card-stack";
```

Also remove the `ImagePlaceholder` import on line 8 if it's no longer used elsewhere in the file. Check first — it's used in HeroSection (line 53) and AboutSection (line 75), so **keep it**.

**Step 2: Replace the ServicesSection function body**

Replace lines 114–168 (the entire `ServicesSection` function) with:

```tsx
function ServicesSection() {
  const services = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=300&fit=crop",
      alt: "Generell tannpleie",
      title: "Generell Tannpleie",
      description: "Undersøkelser, rengjøring og forebyggende behandling",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&h=300&fit=crop",
      alt: "Kosmetisk tannpleie",
      title: "Kosmetisk Tannpleie",
      description: "Bleking, fasetter og estetiske løsninger",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=300&fit=crop",
      alt: "Implantat",
      title: "Implantat",
      description: "Tannimplantater med naturlig utseende og holdbarhet",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=300&fit=crop",
      alt: "Akutt behandling",
      title: "Akutt Behandling",
      description: "Rask hjelp ved tannverk og akutte problemer",
    },
  ];

  return (
    <ScrollSection id="services" bg="warm">
      <div className="container-width w-full flex flex-col items-center justify-center py-20 lg:py-0">
        <AnimatedContent className="text-center mb-12 lg:mb-16">
          <span className="eyebrow block mb-4">Våre Tjenester</span>
          <h2 className="heading-editorial text-3xl lg:text-5xl">
            Behandlinger tilpasset deg
          </h2>
        </AnimatedContent>

        <AnimatedContent delay={0.2}>
          <CardStack cards={services} />
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}
```

**Unsplash photo choices explained:**
- `photo-1606811841689` — dental examination scene, bright clinical setting
- `photo-1598256989800` — close-up bright smile, cosmetic dentistry feel
- `photo-1629909613654` — modern dental equipment/implant tools
- `photo-1588776814546` — dentist treating patient, caring atmosphere

**Step 3: Verify the build compiles**

Run: `npx next build 2>&1 | tail -20`

Expected: Build succeeds with no errors. (Warnings about image optimization are OK since we're using `<img>` not `<Image>`.)

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: replace static services grid with interactive CardStack"
```

---

## Task 3: Visual verification

**Step 1: Start the dev server**

Run: `npm run dev`

**Step 2: Verify in browser**

Open `http://localhost:3000` and scroll to Section 3 (Services). Check:

1. The eyebrow "Våre Tjenester" and heading "Behandlinger tilpasset deg" appear centered above the card stack
2. The card stack renders with 4 dental service cards stacked
3. Dragging the top card up/down cycles through cards with spring animation
4. Left/right arrow buttons appear on desktop flanking the card stack
5. Progress dots below the stack show the active card (gold dot)
6. Hovering the top card reveals the title + description overlay
7. The SectionDots side navigation still tracks all 5 sections correctly
8. Scroll snap works: scrolling past the section snaps cleanly to the next

**Step 3: Verify mobile**

Resize to mobile width (~375px). Check:
1. Arrow buttons are hidden
2. Card stack is full-width with proper padding
3. Drag still works for swiping cards
4. Progress dots visible and functional

**Step 4: Check for console errors**

Open browser DevTools console. Verify no React errors or warnings related to CardStack.

If Unsplash images 404, swap them for known-good URLs (any dental/clinic themed Unsplash photo at `?w=500&h=300&fit=crop`).

---

## Summary

| Task | Files | What |
|------|-------|------|
| 1 | Create `src/components/ui/card-stack.tsx` | Adapted CardStack component |
| 2 | Modify `src/app/page.tsx` | Replace ServicesSection grid with CardStack |
| 3 | None (verification) | Visual + responsive + console check |

**Total: 2 files changed, 1 file created, 2 commits.**

# Behandlinger Accordion Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the flat GlassCard grid on the Behandlinger page with editorial accordion chapter bands that group treatments by category with expand-for-details interaction.

**Architecture:** A new `TreatmentAccordion` client component handles open/close state and Framer Motion animation. The page component (`behandlinger/page.tsx`) is restructured into category bands with a two-column desktop layout (category name left, accordion rows right). Data and CTA section remain unchanged.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4, Framer Motion 12, Lucide React icons, TypeScript

**Design doc:** `docs/plans/2026-02-25-behandlinger-accordion-design.md`

---

### Task 1: Create TreatmentAccordion component

**Files:**
- Create: `src/components/TreatmentAccordion.tsx`

**Step 1: Create the component file**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Treatment {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  category: string;
}

interface TreatmentAccordionProps {
  treatment: Treatment;
}

export default function TreatmentAccordion({ treatment }: TreatmentAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = treatment.icon;

  return (
    <div className="border-b border-border">
      {/* Collapsed row — clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 py-5 px-4 text-left cursor-pointer
                   transition-colors duration-200
                   hover:bg-bg-warm/50 hover:border-l-3 hover:border-l-accent-gold
                   group"
        aria-expanded={isOpen}
      >
        <Icon className="w-5 h-5 text-accent-gold shrink-0" />
        <span className="font-serif text-lg font-semibold text-text-dark flex-1">
          {treatment.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-accent-gold transition-colors" />
        </motion.span>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-4 border-l-3 border-l-accent-gold bg-bg-warm py-6 px-4 ml-0">
              <p className="font-sans text-base font-light leading-relaxed text-text-body mb-5">
                {treatment.description}
              </p>
              <ul className="space-y-2.5">
                {treatment.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="flex items-center gap-2.5 text-sm font-normal text-text-dark/80"
                  >
                    <CheckCircle className="w-4 h-4 text-accent-gold shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Step 2: Verify the component compiles**

Run: `cd /Users/daodilyas/Desktop/RingebuTann && npx tsc --noEmit src/components/TreatmentAccordion.tsx 2>&1 || echo "Check dev server for errors instead"`

Check the dev server — navigate to `/behandlinger` and confirm no build errors.

**Step 3: Commit**

```bash
git add src/components/TreatmentAccordion.tsx
git commit -m "feat: add TreatmentAccordion component with Framer Motion expand/collapse"
```

---

### Task 2: Restructure behandlinger page with accordion layout

**Files:**
- Modify: `src/app/behandlinger/page.tsx`

**Step 1: Replace the treatments section**

Keep the `treatments` array, `metadata`, `categories`, `PageHeader`, and CTA section exactly as-is. Only replace the middle `{/* Treatments grid */}` section (lines 158-217).

Add category subtitles data above the component:

```tsx
const categorySubtitles: Record<string, string> = {
  Restaurering: "Gjenopprett og bevar tennenes form og funksjon",
  Forebyggende: "Hold tennene friske med regelmessig pleie",
  Kosmetisk: "Få et lysere, hvitere smil",
  Kirurgi: "Trygg og skånsom kirurgisk behandling",
  Spesialbehandling: "Tilpasset hjelp for spesielle behov",
};
```

Replace the treatments grid section with:

```tsx
{/* Editorial accordion chapters */}
<section className="py-20 bg-background">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {categories.map((category, catIndex) => (
      <AnimateOnScroll key={category} animation="fadeUp">
        <div className={`py-12 ${catIndex < categories.length - 1 ? "border-b border-accent-gold/30" : ""}`}>
          <div className="flex flex-col md:flex-row md:gap-16">
            {/* Left column — category name */}
            <div className="md:w-[35%] mb-8 md:mb-0 md:sticky md:top-24 md:self-start">
              <h2
                className="font-serif font-bold text-text-dark"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
              >
                {category}
              </h2>
              <div className="w-[60px] h-[1px] bg-accent-gold mt-4 mb-3" />
              <p className="text-sm font-light text-text-muted">
                {categorySubtitles[category]}
              </p>
            </div>

            {/* Right column — treatment accordion rows */}
            <div className="md:w-[65%]">
              {treatments
                .filter((t) => t.category === category)
                .map((treatment) => (
                  <TreatmentAccordion key={treatment.title} treatment={treatment} />
                ))}
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    ))}
  </div>
</section>
```

**Step 2: Update imports**

Replace imports at top of file. Remove: `GlassCard`. Add: `TreatmentAccordion`. Remove unused Lucide icons from the page-level import (they're now used inside TreatmentAccordion via the data). Keep `CheckCircle` removed from page imports (it's in the accordion). Keep `ArrowRight` for the CTA.

The final imports should be:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Crown,
  ShieldCheck,
  Paintbrush,
  Heart,
  Sparkles,
  CircleDot,
  Droplets,
  AlarmClock,
  HandHeart,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TreatmentAccordion from "@/components/TreatmentAccordion";
```

Note: The Lucide icon imports (Crown, ShieldCheck, etc.) must stay because they're referenced in the `treatments` array data on this page. They get passed to `TreatmentAccordion` as the `icon` prop.

**Step 3: Verify in browser**

Navigate to `/behandlinger`. Confirm:
- 5 category bands render with names + gold lines + subtitles
- Each treatment row shows icon + title + chevron
- Clicking a row expands to show description + features
- Clicking again collapses
- Gold left border appears on expanded content
- No console errors

**Step 4: Commit**

```bash
git add src/app/behandlinger/page.tsx
git commit -m "feat: replace behandlinger card grid with editorial accordion layout"
```

---

### Task 3: Visual polish and responsive verification

**Files:**
- Possibly adjust: `src/components/TreatmentAccordion.tsx`
- Possibly adjust: `src/app/behandlinger/page.tsx`

**Step 1: Check desktop layout (1280px+)**

Preview at desktop width. Verify:
- Two-column layout: category name left, accordion rows right
- Gold divider lines between category bands
- Proper spacing and alignment
- Category name stays sticky when scrolling through its treatments

**Step 2: Check mobile layout (<768px)**

Resize to mobile (375px). Verify:
- Single column: category name stacks above accordion rows
- Treatment rows span full width
- Touch targets are at least 44px tall (the `py-5` on the button gives ~56px)
- Text is readable at 16px+ body size

**Step 3: Test all 9 accordions**

Click through all 9 treatments and verify:
- Each expands with smooth animation
- Features stagger in
- Chevron rotates
- Collapsing is smooth
- Multiple can be open at the same time (not mutually exclusive)

**Step 4: Fix any issues found**

Adjust spacing, colors, or animations as needed based on browser preview.

**Step 5: Commit any fixes**

```bash
git add src/components/TreatmentAccordion.tsx src/app/behandlinger/page.tsx
git commit -m "style: polish accordion layout spacing and responsive behavior"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Create TreatmentAccordion component | `src/components/TreatmentAccordion.tsx` (new) |
| 2 | Restructure page with accordion layout | `src/app/behandlinger/page.tsx` (modify) |
| 3 | Visual polish and responsive verification | Both files (adjust if needed) |

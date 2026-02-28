# Hero Full-Bleed Image Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the contained hero image with an asymmetric full-bleed layout where `ringebutannMain.jpg` dominates ~58% of viewport width, bleeding to the right edge.

**Architecture:** Single-file change to `HeroSection` in `src/app/page.tsx`. Replace the current 2-column contained grid with a full-width grid where the image column escapes the container and bleeds to the viewport edge. Mobile stacks image on top with full-width treatment.

**Tech Stack:** Next.js, Tailwind CSS v4, Framer Motion, Next/Image

**Design doc:** `docs/plans/2026-02-25-hero-fullbleed-image-design.md`

---

### Task 1: Rewrite HeroSection with asymmetric full-bleed layout

**Files:**
- Modify: `src/app/page.tsx:16-69` (the `HeroSection` function)

**Step 1: Replace the entire HeroSection function**

Replace lines 16-69 of `src/app/page.tsx` with:

```tsx
function HeroSection() {
  return (
    <ScrollSection id="hero" bg="cream">
      {/* Full-width grid — no container-width wrapper so image can bleed */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen lg:min-h-0">

        {/* Left — Text (5 cols on desktop, padded) */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-12 py-16 lg:py-0 gap-6 lg:gap-8">
          <AnimatedContent delay={0}>
            <span className="eyebrow" style={{ fontSize: "15px", fontWeight: 600 }}>Tannpleie med omtanke</span>
          </AnimatedContent>
          <AnimatedContent delay={0.15}>
            <h1 className="heading-editorial" style={{ fontSize: "clamp(1.75rem, 3.5vw, 3.5rem)" }}>
              Ringebu
              <br />
              Tannlegesenter
            </h1>
          </AnimatedContent>
          <AnimatedContent delay={0.3}>
            <p className="body-editorial max-w-md">
              Vi kombinerer moderne tannmedisin med personlig omsorg,
              i rolige omgivelser midt i Gudbrandsdalen.
            </p>
          </AnimatedContent>
          <AnimatedContent delay={0.45}>
            <div>
              <Link href="/kontakt" className="btn-primary">
                Bestill Time
              </Link>
            </div>
          </AnimatedContent>
        </div>

        {/* Right — Full-bleed image (7 cols, bleeds to right edge) */}
        <AnimatedContent
          delay={0.2}
          direction="none"
          className="order-1 lg:order-2 lg:col-span-7 relative h-[45vh] lg:h-auto"
        >
          <motion.div
            className="relative w-full h-full overflow-hidden rounded-b-2xl lg:rounded-b-none lg:rounded-l-3xl"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/images/ringebutannMain.jpg"
              alt="Moderne tannlegestol hos Ringebu Tannlegesenter"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            {/* Gradient blend on left edge (desktop only) */}
            <div
              className="hidden lg:block absolute inset-y-0 left-0 w-24 pointer-events-none"
              style={{
                background: "linear-gradient(to right, var(--color-bg-cream), transparent)",
              }}
            />
          </motion.div>
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}
```

Key details about the code:
- **No `container-width` wrapper** — the grid spans full viewport so the image can bleed right
- **`lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]`** — calculates left padding to match container-width alignment (80rem max + 3rem padding). On viewports wider than 80rem, text stays aligned with the rest of the site's content.
- **`order-1`/`order-2`** — on mobile, image shows first (top), text second (below). On desktop, text is left, image is right.
- **`h-[45vh] lg:h-auto`** — mobile gets a fixed-height image, desktop fills the section height
- **`rounded-b-2xl lg:rounded-b-none lg:rounded-l-3xl`** — mobile gets rounded bottom, desktop gets rounded left edge only
- **Gradient overlay** — 6rem wide `div` with CSS gradient from cream to transparent, hidden on mobile

**Step 2: Verify in browser**

Run the dev server if not running: `npm run dev`

Check these on desktop (1280px+):
- [ ] Image bleeds to right viewport edge
- [ ] Text is left-aligned matching other sections' content alignment
- [ ] Left edge of image has soft gradient blend into cream background
- [ ] Image fills full section height
- [ ] Rounded left corners on image

Check these on mobile (375px):
- [ ] Image appears on top, full width
- [ ] Image has rounded bottom corners
- [ ] Text appears below with proper padding
- [ ] No horizontal overflow/scrollbar

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(hero): asymmetric full-bleed image layout with ringebutannMain.jpg"
```

---

### Task 2: Fine-tune responsive breakpoints (if needed)

**Files:**
- Modify: `src/app/page.tsx` (HeroSection only)

**Step 1: Check tablet (768px–1023px)**

At this breakpoint the layout is in mobile mode (single column). Verify:
- [ ] Image height (45vh) looks proportional
- [ ] Text below image has adequate spacing
- [ ] No layout breaks

**Step 2: Adjust if needed**

If the 45vh image feels too short on tablet, consider `h-[45vh] md:h-[50vh] lg:h-auto`.

If the text padding feels cramped on tablet, the `sm:px-10` should handle it.

**Step 3: Commit any adjustments**

```bash
git add src/app/page.tsx
git commit -m "fix(hero): fine-tune tablet responsive breakpoints"
```

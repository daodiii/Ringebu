# Nordic Slate Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Ringebu Tannlegesenter homepage from the current muddy brown palette to Nordic Slate — cool blue-gray primary with warm copper accent — fixing color contrast, hero layout, section rhythm, and navbar visibility.

**Architecture:** CSS-variable-driven palette swap in globals.css propagates to all components automatically. Three files need direct edits: globals.css (tokens + shadows), page.tsx (hero + sections), Navbar.tsx (remove transparent mode). No new components or pages.

**Tech Stack:** Next.js 16 / React 19 / Tailwind CSS 4.0 / Framer Motion / TypeScript

**Spec:** `docs/superpowers/specs/2026-04-04-nordic-slate-redesign.md`

---

## Chunk 1: CSS Palette Migration

### Task 1: Update color tokens in globals.css

**Files:**
- Modify: `src/app/globals.css:3-51` (the `@theme inline` block)

- [ ] **Step 1: Replace all design tokens in the `@theme inline` block**

Replace the entire token section (lines 3-51) with the new Nordic Slate palette:

```css
@theme inline {
  /* ── Dark Anchors ── */
  --color-primary: #2C3E50;
  --color-primary-dark: #1A2A38;
  --color-primary-light: #3D5A6E;

  /* ── Accent ── */
  --color-accent: #B8845C;
  --color-accent-hover: #9A6F4A;
  --color-accent-light: #D4C4AA;

  /* ── Section Tints ── */
  --color-bg-blue: #E2EBF0;
  --color-bg-yellow: #F5EDE4;
  --color-bg-mint: #E2EBF0;
  --color-bg-cream: #F0EDE8;

  /* ── Cool Slate Scale ── */
  --color-stone-50: #F8FAFB;
  --color-stone-100: #F0F3F5;
  --color-stone-200: #D5DEE5;
  --color-stone-300: #B8C5CF;
  --color-stone-400: #8A9BAA;
  --color-stone-500: #64788A;
  --color-stone-600: #4A5568;
  --color-stone-700: #374151;
  --color-stone-800: #1F2937;
  --color-stone-900: #1A2A38;

  /* ── Semantic Colors ── */
  --color-bg: #ffffff;
  --color-text-primary: #1A2A38;
  --color-text-secondary: #4A5568;
  --color-text-muted: #8A9BAA;
  --color-border: #D5DEE5;

  /* ── Typography ── */
  --font-sans: var(--font-dm-sans), system-ui, sans-serif;
  --font-heading: var(--font-fraunces), Georgia, serif;
  --font-serif: var(--font-fraunces), Georgia, serif;

  /* ── Spacing ── */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-full: 9999px;
}
```

- [ ] **Step 2: Update button shadow colors**

In `.btn-primary:hover` (around line 185), change:
```css
box-shadow: 0 8px 30px rgba(184, 132, 92, 0.3);
```

In `.btn-outline:hover` (around line 235), change:
```css
box-shadow: 0 8px 30px rgba(184, 132, 92, 0.2);
```

In `.card:hover` (around line 279), change:
```css
box-shadow: 0 20px 60px rgba(184, 132, 92, 0.08);
```

**Note:** The following CSS rules auto-update through token inheritance — no manual changes needed (per spec lines 113-115): `::selection`, `.accent-line`, `.gradient-text`. They all reference `var(--color-accent)`, `var(--color-accent-light)`, `var(--color-bg-cream)`, and `var(--color-primary)` which are updated in Step 1.

- [ ] **Step 3: Verify dev server compiles without errors**

Run: check the terminal running `next dev` for compilation errors.
Expected: no errors, site loads with new colors.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: migrate color palette to Nordic Slate"
```

---

## Chunk 2: Navbar Simplification

### Task 2: Remove transparent mode from Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Remove `isHome` variable and all conditional logic**

Remove the `isHome` const (line 21) and simplify all 6 conditional blocks:

Replace the `navBg`, `textColor`, and `logoColor` definitions (lines 34-44) with:
```tsx
const navBg = scrolled
  ? "bg-white/90 backdrop-blur-xl shadow-sm"
  : "bg-white/80 backdrop-blur-sm";
```

Remove `textColor` and `logoColor` entirely — they are no longer needed.

- [ ] **Step 2: Simplify the logo color**

Change the logo `Link` className from:
```tsx
className={cn("relative z-50 flex items-center gap-1", logoColor)}
```
to:
```tsx
className="relative z-50 flex items-center gap-1 text-[var(--color-primary)]"
```

- [ ] **Step 3: Simplify desktop link colors**

Replace the desktop link conditional className (lines 69-78) with:
```tsx
className={cn(
  "px-4 py-2 rounded-full text-[0.9375rem] font-sans transition-all duration-300",
  pathname === link.href
    ? "bg-[var(--color-bg-cream)] text-[var(--color-primary)] font-500"
    : "text-[var(--color-stone-600)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-cream)]"
)}
```

- [ ] **Step 4: Simplify phone number colors**

Replace the phone link conditional className (lines 89-92) with:
```tsx
className="hidden md:flex items-center gap-2 text-sm font-sans transition-colors text-[var(--color-stone-500)] hover:text-[var(--color-accent)]"
```

- [ ] **Step 5: Simplify CTA button colors**

Replace the CTA link conditional className (lines 99-104) with:
```tsx
className="hidden md:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-500 font-sans transition-all duration-300 bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent)]/20"
```

- [ ] **Step 6: Fix mobile toggle button and clean up**

The mobile hamburger button (line 112) uses `textColor` which we removed. Replace:
```tsx
mobileOpen ? "text-[var(--color-primary)]" : textColor
```
with:
```tsx
mobileOpen ? "text-[var(--color-primary)]" : "text-[var(--color-primary)]"
```

Then simplify to just:
```tsx
"text-[var(--color-primary)]"
```

Remove the `isHome` variable (line 21). The `usePathname` import and `pathname` variable stay (used for active link detection). The `scrolled` state and scroll effect stay (used for shadow).

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "fix: remove navbar transparent mode, always use solid background"
```

---

## Chunk 3: Homepage Sections

### Task 3: Redesign HeroSection

**Files:**
- Modify: `src/app/page.tsx:43-161` (HeroSection function)

- [ ] **Step 1: Update hero background and add accent bar**

Change the section tag (line 45) from:
```tsx
<section className="relative bg-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
```
to:
```tsx
<section className="relative bg-[var(--color-bg-cream)] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
```

Add the accent bar as the first child inside the section, before `<div className="container-width">`:
```tsx
<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)]" />
```

- [ ] **Step 2: Replace photo collage with single image**

Replace the entire right-side `motion.div` with the collage grid (lines 104-157) with:
```tsx
<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="relative aspect-[4/3] rounded-2xl overflow-hidden"
>
  <Image
    src="/images/ringebutannMain.jpg"
    alt="Ringebu Tannlegesenter behandlingsrom"
    fill
    className="object-cover"
    style={{ objectPosition: "center 60%" }}
    priority
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</motion.div>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign hero with accent bar and single image"
```

### Task 4: Fix section backgrounds, text sizing, and remove PreCTASection

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update ArticlesSection background**

Change line 400 from:
```tsx
<section id="artikler" className="py-12 md:py-16 bg-[var(--color-bg-mint)]">
```
to:
```tsx
<section id="artikler" className="py-12 md:py-16 bg-[var(--color-bg-blue)]">
```

- [ ] **Step 2: Update CTASection background to gradient**

Change line 478 from:
```tsx
<div className="absolute inset-0 bg-[var(--color-primary)]" />
```
to:
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]" />
```

**Note:** The CTA blur orb divs (lines 480-481) use `bg-[var(--color-accent)]/10` — these auto-inherit the new `--color-accent` value. No manual change needed.

- [ ] **Step 3: Fix card text sizing in TreatmentsSection**

Change these 4 card description `<p>` tags from `text-xl` to `text-base`:

Line 204 (Kosmetisk card):
```tsx
<p className="text-[var(--color-stone-700)] mb-8 leading-relaxed font-sans font-400 text-base">
```

Line 243 (Tannbleking card):
```tsx
<p className="text-white/75 text-base leading-relaxed font-sans font-400">
```

Line 272 (Forebyggende card):
```tsx
<p className="text-[var(--color-stone-700)] text-base leading-relaxed font-sans font-400">
```

Line 286 (Akutt card):
```tsx
<p className="text-[var(--color-stone-700)] text-base mb-6 leading-relaxed font-sans font-400">
```

- [ ] **Step 4: Fix text sizing and hover in TipsAndSymptomsSection**

Change Symptomer body text (line 336) from `text-xl` to `text-base`:
```tsx
<p className="text-white/80 text-base leading-relaxed font-sans font-400">
```

Change the tip hover circle (line 379) from:
```tsx
group-hover:bg-[var(--color-bg-mint)]
```
to:
```tsx
group-hover:bg-[var(--color-bg-cream)]
```

- [ ] **Step 5: Delete PreCTASection**

Remove the entire `PreCTASection` function (lines 464-470):
```tsx
// DELETE THIS ENTIRE FUNCTION
function PreCTASection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-width" />
    </section>
  );
}
```

Remove `<PreCTASection />` from the `HomePage` render (line 521, between ArticlesSection and CTASection).

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: fix section backgrounds, text sizing, remove empty PreCTASection"
```

---

## Chunk 4: Verification

### Task 5: Visual verification

- [ ] **Step 1: Start dev server and verify all sections render**

Open `http://localhost:3000` in browser. Verify:
- Gradient accent bar visible at top of hero
- Hero has warm off-white background with single large clinic photo
- Navbar has solid white background with dark text (no transparency bug)
- Treatments section has visible cool blue-gray tint
- Tips/Symptoms section has visible warm sand tint
- Articles section has visible cool blue-gray tint
- CTA section has dark gradient background
- No empty whitespace gap before CTA (PreCTASection removed)
- Footer has dark slate background (inherited from token change)

- [ ] **Step 2: Verify no console errors**

Check browser console for errors. Expected: no errors.

- [ ] **Step 3: Verify mobile layout**

Resize browser to mobile width (~375px). Verify:
- Hero stacks vertically (text above, image below)
- Navbar hamburger menu works
- All sections have visible background tints
- CTA buttons are full-width and tappable

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address visual issues found during verification"
```

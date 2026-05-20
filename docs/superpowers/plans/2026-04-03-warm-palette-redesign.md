# Warm Palette Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the emerald green color system with Soft Cream & Caramel warm palette across the entire Ringebu Tannlegesenter site, and redesign the homepage hero to a full-bleed photo with a slim espresso bottom band.

**Architecture:** CSS variable swap in globals.css handles ~60% of the site automatically. Remaining work is replacing raw Tailwind `emerald-*` classes file-by-file, plus restructuring the hero component. No new files created — all edits to existing files.

**Tech Stack:** Next.js, Tailwind CSS v4, Framer Motion, TypeScript

**Spec:** `docs/superpowers/specs/2026-04-03-warm-palette-redesign.md`

---

## Chunk 1: Foundation — CSS Variables & Global Styles

### Task 1: Replace CSS Custom Properties in globals.css

**Files:**
- Modify: `src/app/globals.css:3-59` (theme variables)

- [ ] **Step 1: Replace the emerald palette block (lines 4-15)**

Replace:
```css
--color-emerald-50: #ecfdf5;
--color-emerald-100: #d1fae5;
--color-emerald-200: #a7f3d0;
--color-emerald-300: #6ee7b7;
--color-emerald-400: #34d399;
--color-emerald-500: #10b981;
--color-emerald-600: #059669;
--color-emerald-700: #047857;
--color-emerald-800: #065f46;
--color-emerald-900: #064e3b;
--color-emerald-950: #022c22;
```

With:
```css
--color-emerald-50: #F0E6D6;
--color-emerald-100: #E8DFCF;
--color-emerald-200: #E8DFCF;
--color-emerald-300: #C9B99A;
--color-emerald-400: #C9B99A;
--color-emerald-500: #B8976A;
--color-emerald-600: #B8976A;
--color-emerald-700: #7A6B55;
--color-emerald-800: #5C4A3A;
--color-emerald-900: #3D3225;
--color-emerald-950: #3D3225;
```

- [ ] **Step 2: Update semantic tokens (lines 30-59)**

Replace these specific values:
```
--color-bg-mint: #f0fdf4;          →  --color-bg-mint: #FDFBF7;
--color-accent: #059669;            →  --color-accent: #B8976A;
--color-accent-dark: #047857;       →  --color-accent-dark: #7A6B55;
--color-accent-light: #d1fae5;      →  --color-accent-light: #F0E6D6;
--color-emerald: #022C22;           →  --color-emerald: #3D3225;
--color-primary: #022C22;           →  --color-primary: #3D3225;
--color-primary-dark: #011d17;      →  --color-primary-dark: #2A2118;
--color-primary-light: #064E3B;     →  --color-primary-light: #5C4A3A;
--color-accent-gold: #059669;       →  --color-accent-gold: #B8976A;
--color-footer-bg: #022c22;         →  --color-footer-bg: #3D3225;
```

- [ ] **Step 3: Verify no emerald hex values remain**

Run: `grep -n "059669\|047857\|065f46\|064e3b\|022c22\|022C22\|ecfdf5\|d1fae5\|a7f3d0\|6ee7b7\|34d399\|10b981" src/app/globals.css`
Expected: No matches

### Task 2: Update Global Utility Classes in globals.css

**Files:**
- Modify: `src/app/globals.css:186-358` (utility classes)

- [ ] **Step 1: Update .btn-primary**

Replace bg `var(--color-emerald-600)` with `#B8976A`, hover bg `var(--color-emerald-700)` with `#A68658`, hover shadow `rgba(5, 150, 105, 0.3)` with `rgba(184, 151, 106, 0.3)`.

- [ ] **Step 2: Update .btn-outline**

Replace border `var(--color-emerald-600)` with `#B8976A`, hover bg `var(--color-emerald-600)` with `#B8976A`, hover shadow `rgba(5, 150, 105, 0.2)` with `rgba(184, 151, 106, 0.2)`.

- [ ] **Step 3: Update .btn-nav**

Replace hover color `var(--color-emerald-600)` with `#B8976A`, hover bg `var(--color-emerald-50)` with `#F0E6D6`. Active: color `var(--color-emerald-700)` → `#7A6B55`, bg `var(--color-emerald-50)` → `#F0E6D6`.

- [ ] **Step 4: Update .eyebrow**

Color `var(--color-emerald-600)` → `#B8976A`.

- [ ] **Step 5: Update .card:hover**

Border-color `var(--color-emerald-200)` → `#E8DFCF`. Shadow `rgba(5, 150, 105, 0.08)` → `rgba(184, 151, 106, 0.08)`.

- [ ] **Step 6: Update ::selection**

Bg `var(--color-emerald-200)` → `#F0E6D6`. Color `var(--color-emerald-950)` → `#3D3225`.

- [ ] **Step 7: Update .gradient-text**

Gradient stops: `var(--color-emerald-600)` → `#B8976A`, `var(--color-emerald-400)` → `#C9B99A`.

- [ ] **Step 8: Update .accent-line**

Gradient stops: `var(--color-emerald-500)` → `#B8976A`, `var(--color-emerald-300)` → `#C9B99A`.

- [ ] **Step 9: Update .gold-line**

Bg `var(--color-emerald-500)` → `#B8976A`.

- [ ] **Step 10: Verify no emerald references remain in globals.css**

Run: `grep -in "emerald" src/app/globals.css`
Expected: Only the CSS variable names themselves (e.g., `--color-emerald-600`), no emerald hex values.

- [ ] **Step 11: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace emerald palette with warm cream & caramel in CSS variables and utilities"
```

---

## Chunk 2: Navbar & Footer

### Task 3: Update Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Replace raw Tailwind emerald class**

Find `hover:shadow-emerald-600/20` → replace with `hover:shadow-[#B8976A]/20`.

Note: All `var(--color-emerald-*)` references will auto-update from the CSS variable swap in Task 1. Only raw Tailwind classes need manual replacement.

- [ ] **Step 2: Verify no raw emerald classes remain**

Run: `grep -n "emerald" src/components/Navbar.tsx`
Expected: Only `var(--color-emerald-*)` references (which now map to warm tones). No raw `emerald-` Tailwind classes.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: update navbar to warm palette"
```

### Task 4: Update Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Replace raw Tailwind emerald border class**

Find `border-emerald-800/50` (line 119) → replace with `border-white/10`.

- [ ] **Step 2: Verify no raw emerald classes remain**

Run: `grep -n "emerald" src/components/Footer.tsx`
Expected: Only `var(--color-emerald-*)` references. No raw Tailwind emerald classes.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: update footer to warm palette"
```

---

## Chunk 3: Homepage — Hero Redesign + Section Color Swaps

### Task 5: Redesign Homepage Hero

**Files:**
- Modify: `src/app/page.tsx:44-120` (HeroSection function)

- [ ] **Step 1: Replace the gradient overlay**

Remove the current left-to-right emerald gradient div:
```tsx
<div
  className="absolute inset-0 pointer-events-none"
  style={{ background: "linear-gradient(to right, rgba(4,47,46,0.85) 0%, rgba(4,47,46,0.6) 25%, rgba(4,47,46,0.2) 45%, transparent 60%)" }}
/>
```

Replace with a bottom-up gradient that blends into the espresso band:
```tsx
<div
  className="absolute inset-0 pointer-events-none"
  style={{ background: "linear-gradient(to top, rgba(61,50,37,0.5) 0%, transparent 25%)" }}
/>
```

- [ ] **Step 2: Restructure the content area**

Replace the current `motion.div` content (lines 77-117) with the bottom-band layout:

The content should be positioned at the bottom of the viewport using:
- `flex flex-col justify-end h-full` instead of `justify-center`
- A bottom band div with: `bg-[rgba(61,50,37,0.93)] backdrop-blur-md w-full`
- Inside the band: flex row with text on left, buttons on right
- Band should be compact — no excessive padding. Use `py-6 md:py-8 px-6 md:px-12`

- [ ] **Step 3: Update text colors**

- `text-emerald-300` on "smilet ditt" → `text-[#D4AF37]` (Gold)
- `text-emerald-100/90` on subtitle → `text-white/70`
- Eyebrow/label above heading: `text-[#B8976A]` with uppercase tracking

- [ ] **Step 4: Update button styles in hero**

- "Bestill time": `bg-[#B8976A] text-[#3D3225] hover:bg-[#A68658]` rounded-full
- "Se behandlinger": `border border-white/35 text-white hover:bg-white/10` rounded-full

- [ ] **Step 5: Verify hero renders correctly**

Visual check: Full-bleed photo visible, slim espresso band at bottom with headline + buttons, navbar transparent on top.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign homepage hero with full-bleed photo and espresso bottom band"
```

### Task 6: Update Homepage Remaining Sections

**Files:**
- Modify: `src/app/page.tsx:122-458` (TreatmentsSection, TipsAndSymptomsSection, ArticlesSection, CTASection)

- [ ] **Step 1: Replace raw emerald classes in TreatmentsSection**

Find and replace in the TreatmentsSection function (~lines 122-272):
- `bg-emerald-700/50` → `bg-[#7A6B55]/50`
- `bg-emerald-600/50` → `bg-[#B8976A]/50`
- `text-emerald-200` → `text-[#E8DFCF]`

- [ ] **Step 2: Replace raw emerald classes in TipsAndSymptomsSection**

Find and replace (~lines 274-350):
- `text-emerald-100/85` → `text-[#F0E6D6]/85`
- `bg-emerald-700/50` → `bg-[#7A6B55]/50`
- `bg-emerald-600/50` → `bg-[#B8976A]/50`
- `text-emerald-200` → `text-[#E8DFCF]`

- [ ] **Step 3: Replace raw emerald classes in CTASection**

Find and replace (~lines 420-458):
- `bg-emerald-400/10` → `bg-[#C9B99A]/10`
- `bg-emerald-300/10` → `bg-[#C9B99A]/10`
- `text-emerald-100/90` → `text-[#F0E6D6]/90`
- `hover:bg-emerald-50` → `hover:bg-[#F0E6D6]`

- [ ] **Step 4: Verify no raw emerald classes remain in page.tsx**

Run: `grep -n "emerald-[0-9]" src/app/page.tsx | grep -v "var(--color-emerald"`
Expected: No matches (all raw Tailwind emerald classes replaced).

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: replace raw emerald classes in homepage sections"
```

---

## Chunk 4: Inner Pages

### Task 7: Update Behandlinger Page

**Files:**
- Modify: `src/app/behandlinger/page.tsx`

- [ ] **Step 1: Update cardColors constant**

Replace line 169:
```ts
const cardColors = { bg: "#F0F7F4", border: "#C6DDD3", dot: "#059669" };
```
With:
```ts
const cardColors = { bg: "#FDFBF7", border: "#E8DFCF", dot: "#B8976A" };
```

- [ ] **Step 2: Replace raw emerald classes**

- `text-emerald-100/80` → `text-[#F0E6D6]/80`
- `hover:bg-emerald-50` → `hover:bg-[#F0E6D6]`

- [ ] **Step 3: Verify no raw emerald classes remain**

Run: `grep -n "emerald-[0-9]" src/app/behandlinger/page.tsx | grep -v "var(--color-emerald"`
Expected: No matches.

- [ ] **Step 4: Commit**

```bash
git add src/app/behandlinger/page.tsx
git commit -m "feat: update behandlinger page to warm palette"
```

### Task 8: Update Symptomer Page

**Files:**
- Modify: `src/app/symptomer/page.tsx`

- [ ] **Step 1: Replace raw emerald classes**

- `text-emerald-300` → `text-[#C9B99A]`
- `text-emerald-100/70` → `text-[#F0E6D6]/70`
- Any other raw `emerald-` Tailwind classes → use mapping table from spec

- [ ] **Step 2: Verify and commit**

Run: `grep -n "emerald-[0-9]" src/app/symptomer/page.tsx | grep -v "var(--color-emerald"`
Expected: No matches.

```bash
git add src/app/symptomer/page.tsx
git commit -m "feat: update symptomer page to warm palette"
```

### Task 9: Update Kontakt Page

**Files:**
- Modify: `src/app/kontakt/page.tsx`

- [ ] **Step 1: Replace raw emerald classes**

Same mapping as other pages.

- [ ] **Step 2: Unify non-emerald accent colors**

Replace `sky-50`, `sky-100`, `sky-600`, `sky-700` → Cream bg, Caramel accent.
Replace `violet-50`, `violet-100`, `violet-600` → Cream bg, Caramel accent.
Replace `amber-50`, `amber-600` → Cream bg, Caramel accent.

All info cards should use: `bg-[#F0E6D6]` background, `text-[#B8976A]` icon color, `text-[#5C4A3A]` text color.

- [ ] **Step 3: Verify and commit**

Run: `grep -n "emerald-[0-9]\|sky-[0-9]\|violet-[0-9]\|amber-[0-9]" src/app/kontakt/page.tsx | grep -v "var(--color"`
Expected: No matches.

```bash
git add src/app/kontakt/page.tsx
git commit -m "feat: update kontakt page to warm palette"
```

### Task 10: Update Artikler Pages

**Files:**
- Modify: `src/app/artikler/page.tsx`
- Modify: `src/app/artikler/[slug]/page.tsx`

- [ ] **Step 1: Replace raw emerald classes in artikler/page.tsx**

Same mapping. Focus on header section and any badge/CTA classes.

- [ ] **Step 2: Replace raw emerald classes in artikler/[slug]/page.tsx**

Key replacements:
- `text-emerald-200/80` → `text-[#E8DFCF]/80`
- `text-emerald-200/70` → `text-[#E8DFCF]/70`
- Any other raw emerald classes

- [ ] **Step 3: Verify and commit**

Run: `grep -rn "emerald-[0-9]" src/app/artikler/ | grep -v "var(--color-emerald"`
Expected: No matches.

```bash
git add src/app/artikler/
git commit -m "feat: update artikler pages to warm palette"
```

### Task 11: Update content.ts treatmentColors

**Files:**
- Modify: `src/data/content.ts:58-65`

- [ ] **Step 1: Replace treatmentColors map**

Replace:
```ts
export const treatmentColors: Record<string, { bg: string; text: string; icon: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", icon: "text-emerald-600" },
  sky: { bg: "bg-sky-50", text: "text-sky-700", icon: "text-sky-600" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", icon: "text-violet-600" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", icon: "text-rose-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", icon: "text-amber-600" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", icon: "text-teal-600" },
};
```

With:
```ts
export const treatmentColors: Record<string, { bg: string; text: string; icon: string }> = {
  emerald: { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  sky:     { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  violet:  { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  rose:    { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  amber:   { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
  teal:    { bg: "bg-[#F0E6D6]", text: "text-[#5C4A3A]", icon: "text-[#B8976A]" },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: update treatmentColors to warm palette"
```

---

## Chunk 5: Final Verification

### Task 12: Full Sweep — Verify No Emerald Leaks

- [ ] **Step 1: Search entire src/ for raw emerald Tailwind classes**

Run: `grep -rn "emerald-[0-9]" src/ | grep -v "var(--color-emerald" | grep -v node_modules`
Expected: No matches. If any remain, fix them using the mapping table.

- [ ] **Step 2: Search for old emerald hex values**

Run: `grep -rn "059669\|047857\|065f46\|064e3b\|022c22\|022C22" src/`
Expected: No matches.

- [ ] **Step 3: Visual verification**

Start dev server and check:
- Homepage: hero has full-bleed photo + slim espresso bottom band
- Navbar: warm tones when scrolled, transparent on hero
- Behandlinger: uniform warm cream cards
- Symptomer: warm header, cream section bg
- Kontakt: unified warm info cards
- Footer: espresso background
- All buttons: caramel/espresso, no green

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: clean up remaining emerald color references"
```

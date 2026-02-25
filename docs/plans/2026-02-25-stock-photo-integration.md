# Stock Photo Integration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace 6 ImagePlaceholder components with real Pexels stock photos using Next.js Image.

**Architecture:** Download photos to /public/images/, replace ImagePlaceholder calls with Next.js `<Image>` using `fill` + `object-cover` inside relative-positioned containers. Keep the same layout and animation wrappers.

**Tech Stack:** Next.js Image component, Pexels free photos, curl for downloads.

---

### Task 1: Download all 6 stock photos

**Files:**
- Create: `public/images/hero-dentist.jpg`
- Create: `public/images/about-clinic.jpg`
- Create: `public/images/service-general.jpg`
- Create: `public/images/service-cosmetic.jpg`
- Create: `public/images/service-implant.jpg`
- Create: `public/images/service-emergency.jpg`

**Step 1: Download hero photo (portrait, high-res)**

```bash
curl -sL "https://images.pexels.com/photos/7578806/pexels-photo-7578806.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop" -o public/images/hero-dentist.jpg
```

**Step 2: Download about photo (tall clinic interior)**

```bash
curl -sL "https://images.pexels.com/photos/30902075/pexels-photo-30902075.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1800&fit=crop" -o public/images/about-clinic.jpg
```

**Step 3: Download service photos (landscape)**

```bash
curl -sL "https://images.pexels.com/photos/3845683/pexels-photo-3845683.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" -o public/images/service-general.jpg
curl -sL "https://images.pexels.com/photos/6627574/pexels-photo-6627574.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" -o public/images/service-cosmetic.jpg
curl -sL "https://images.pexels.com/photos/6812453/pexels-photo-6812453.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" -o public/images/service-implant.jpg
curl -sL "https://images.pexels.com/photos/6529110/pexels-photo-6529110.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop" -o public/images/service-emergency.jpg
```

**Step 4: Verify all downloads succeeded**

```bash
ls -la public/images/*.jpg
```

Expected: 6 jpg files, each > 10KB.

---

### Task 2: Replace Hero ImagePlaceholder with Next.js Image

**Files:**
- Modify: `src/app/page.tsx` (HeroSection, ~lines 46-60)

**Step 1: Add Image import**

At the top of `src/app/page.tsx`, add the Next.js Image import:

```tsx
import Image from "next/image";
```

**Step 2: Replace hero ImagePlaceholder**

Replace the ImagePlaceholder in HeroSection (inside the motion.div) with:

```tsx
<div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/5">
  <Image
    src="/images/hero-dentist.jpg"
    alt="Vennlig tannlege hos Ringebu Tannlegesenter"
    fill
    className="object-cover"
    priority
    sizes="(max-width: 1024px) 100vw, 512px"
  />
</div>
```

Remove the `className` from the parent `motion.div` since sizing is now on the inner div.

**Step 3: Verify dev server loads without errors**

```bash
npm run dev
```

Check terminal for no compilation errors.

**Step 4: Commit**

```bash
git add src/app/page.tsx public/images/hero-dentist.jpg
git commit -m "feat: add hero stock photo"
```

---

### Task 3: Replace About ImagePlaceholder with Next.js Image

**Files:**
- Modify: `src/app/page.tsx` (AboutSection, ~lines 70-81)

**Step 1: Replace about ImagePlaceholder**

Replace the ImagePlaceholder in AboutSection with:

```tsx
<div className="relative w-full h-[50vh] lg:h-full rounded-none lg:rounded-r-3xl overflow-hidden">
  <Image
    src="/images/about-clinic.jpg"
    alt="Moderne tannklinikk interiør"
    fill
    className="object-cover"
    sizes="(max-width: 1024px) 100vw, 60vw"
  />
</div>
```

**Step 2: Verify no errors**

```bash
npm run dev
```

**Step 3: Commit**

```bash
git add src/app/page.tsx public/images/about-clinic.jpg
git commit -m "feat: add about section stock photo"
```

---

### Task 4: Replace Service card ImagePlaceholders with Next.js Images

**Files:**
- Modify: `src/app/page.tsx` (ServicesSection, ~lines 114-168)

**Step 1: Add image paths to the services array**

Update the services array to include image paths:

```tsx
const services = [
  {
    title: "Generell Tannpleie",
    desc: "Undersøkelser, rengjøring og forebyggende behandling",
    image: "/images/service-general.jpg",
  },
  {
    title: "Kosmetisk Tannpleie",
    desc: "Bleking, fasetter og estetiske løsninger",
    image: "/images/service-cosmetic.jpg",
  },
  {
    title: "Implantat",
    desc: "Tannimplantater med naturlig utseende og holdbarhet",
    image: "/images/service-implant.jpg",
  },
  {
    title: "Akutt Behandling",
    desc: "Rask hjelp ved tannverk og akutte problemer",
    image: "/images/service-emergency.jpg",
  },
];
```

**Step 2: Replace the ImagePlaceholder in the card render**

Replace the `<ImagePlaceholder>` inside the services `.map()` with:

```tsx
<div className="relative w-full h-40 lg:h-48 overflow-hidden">
  <Image
    src={service.image}
    alt={service.title}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 100vw, 50vw"
  />
</div>
```

**Step 3: Verify no errors**

```bash
npm run dev
```

**Step 4: Commit**

```bash
git add src/app/page.tsx public/images/service-*.jpg
git commit -m "feat: add service card stock photos"
```

---

### Task 5: Clean up unused import and verify

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Check if ImagePlaceholder is still used anywhere in page.tsx**

If no more `<ImagePlaceholder` usages remain in page.tsx, remove the import line:

```tsx
// Remove this line if no longer used:
import ImagePlaceholder from "@/components/ImagePlaceholder";
```

Keep the `ImagePlaceholder` component file itself — it may be used elsewhere or for future fallbacks.

**Step 2: Run build to verify no errors**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "chore: remove unused ImagePlaceholder import from page"
```

---

### Task 6: Visual verification

**Step 1: Start dev server and check all sections**

```bash
npm run dev
```

Open http://localhost:3000 and scroll through all 5 sections:
- Hero: dentist portrait visible on right side, 3:4 aspect, rounded corners
- About: clinic interior fills left column, full height on desktop
- Services: 4 cards each showing a different dental photo
- Team: existing Unsplash images (unchanged)
- Contact: text only (unchanged)

**Step 2: Check responsive behavior**

Resize browser to mobile width (~375px). Verify:
- Hero photo stacks below text
- About photo shows as 50vh
- Service cards stack in single column
- All images properly cover without distortion

**Step 3: Final commit with design doc update**

```bash
git add docs/plans/2026-02-25-stock-photo-integration-design.md
git commit -m "docs: update design doc to match final implementation"
```

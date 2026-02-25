# Front Page Editorial Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Ringebu Tannlegesenter front page as a calm, luxurious editorial experience with full-viewport scroll-snapping sections, warm neutral palette, and Framer Motion entrance animations.

**Architecture:** CSS scroll-snap container wrapping 5 full-height sections, each with Framer Motion `useInView` entrance animations. New warm neutral color tokens replace the old Apple/aurora palette. Navbar becomes a minimal floating bar, footer becomes a slim dark strip below the snap container.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion 12, TypeScript 5, Plus Jakarta Sans + Playfair Display fonts (already configured).

---

## Task 1: Replace Color Tokens & Base Styles in globals.css

**Files:**
- Modify: `src/app/globals.css` (complete rewrite)

**Step 1: Rewrite globals.css with new design system**

Replace the entire file with:

```css
@import "tailwindcss";

@theme inline {
  /* ── Editorial Warm Neutral Palette ── */
  --color-bg-cream: #FAF8F5;
  --color-bg-warm: #F7F4F0;
  --color-bg-warmest: #F3EFE9;
  --color-text-dark: #2C2825;
  --color-text-body: #5C5650;
  --color-text-muted: #8A847D;
  --color-accent-gold: #B8A88A;
  --color-card-white: #FFFEFB;
  --color-placeholder: #E8E4DF;
  --color-placeholder-mid: #DDD8D2;
  --color-placeholder-dark: #D5CFC8;
  --color-border: #E8E4DF;
  --color-footer-bg: #2C2825;

  /* Keep these for subpages that still use them */
  --color-background: #FAF8F5;
  --color-foreground: #2C2825;
  --color-primary: #B8A88A;
  --color-muted: #8A847D;

  /* ── Typography ── */
  --font-sans: var(--font-plus-jakarta), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-serif: var(--font-playfair), "Georgia", serif;

  /* ── Spacing ── */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 32px;
}

/* ── Reset & Base ── */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-bg-cream);
  color: var(--color-text-dark);
  font-family: var(--font-sans);
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  letter-spacing: -0.02em;
}

/* ── Scroll Snap Container ── */
.snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
}

.snap-section {
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
}

/* ── Editorial Typography ── */
.eyebrow {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--color-accent-gold);
}

.heading-editorial {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text-dark);
}

.body-editorial {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  font-weight: 300;
  line-height: 1.8;
  color: var(--color-text-body);
}

/* ── Buttons ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: var(--color-text-dark);
  color: var(--color-bg-cream);
  padding: 14px 32px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #3D3835;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(44, 40, 37, 0.15);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: transparent;
  color: var(--color-text-dark);
  padding: 14px 32px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: 1px solid var(--color-accent-gold);
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: var(--color-accent-gold);
  color: white;
  transform: translateY(-1px);
}

/* ── Utilities ── */
.container-width {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 640px) {
  .container-width {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1024px) {
  .container-width {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

/* ── Decorative Line ── */
.gold-line {
  width: 60px;
  height: 1px;
  background-color: var(--color-accent-gold);
}

/* ── Scrollbar ── */
.snap-container::-webkit-scrollbar {
  width: 0px;
}

.snap-container::-webkit-scrollbar-track {
  background: transparent;
}

/* ── Selection ── */
::selection {
  background-color: rgba(184, 168, 138, 0.2);
  color: var(--color-text-dark);
}
```

**Step 2: Verify the dev server compiles without errors**

Run: Check browser at localhost:3000 (page will look broken since components still reference old classes — that's expected).

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace color tokens and base styles with editorial warm neutral design system"
```

---

## Task 2: Create ScrollSection Wrapper Component

**Files:**
- Create: `src/components/ScrollSection.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "cream" | "warm" | "warmest";
}

const bgMap = {
  cream: "bg-[var(--color-bg-cream)]",
  warm: "bg-[var(--color-bg-warm)]",
  warmest: "bg-[var(--color-bg-warmest)]",
};

export default function ScrollSection({
  children,
  className,
  id,
  bg = "cream",
}: ScrollSectionProps) {
  return (
    <section
      id={id}
      className={cn("snap-section flex items-center", bgMap[bg], className)}
    >
      {children}
    </section>
  );
}

/* Animated wrapper for content within a section */
export function AnimatedContent({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    none: { y: 0, x: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ScrollSection.tsx
git commit -m "feat: add ScrollSection and AnimatedContent components for snap layout"
```

---

## Task 3: Create ImagePlaceholder Component

**Files:**
- Create: `src/components/ImagePlaceholder.tsx`

**Step 1: Create the component**

```tsx
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  className?: string;
  tone?: "light" | "mid" | "dark";
  rounded?: string;
  label?: string;
}

const toneMap = {
  light: "bg-[var(--color-placeholder)]",
  mid: "bg-[var(--color-placeholder-mid)]",
  dark: "bg-[var(--color-placeholder-dark)]",
};

export default function ImagePlaceholder({
  className,
  tone = "light",
  rounded = "rounded-xl",
  label,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        toneMap[tone],
        rounded,
        className
      )}
    >
      {label && (
        <span className="absolute bottom-4 left-4 text-xs text-[var(--color-text-muted)] font-sans opacity-50">
          {label}
        </span>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ImagePlaceholder.tsx
git commit -m "feat: add ImagePlaceholder component with tone variants"
```

---

## Task 4: Create SectionDots Navigation Component

**Files:**
- Create: `src/components/SectionDots.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Hjem" },
  { id: "about", label: "Om Oss" },
  { id: "services", label: "Tjenester" },
  { id: "gallery", label: "Galleri" },
  { id: "contact", label: "Kontakt" },
];

interface SectionDotsProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function SectionDots({ containerRef }: SectionDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const index = Math.round(scrollTop / sectionHeight);
      setActiveIndex(Math.min(index, sections.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(i)}
          className="group relative flex items-center"
          aria-label={`Go to ${section.label}`}
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 text-xs font-sans text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {section.label}
          </span>
          {/* Dot */}
          <span
            className={cn(
              "block rounded-full transition-all duration-300",
              activeIndex === i
                ? "w-2.5 h-2.5 bg-[var(--color-accent-gold)]"
                : "w-1.5 h-1.5 bg-[var(--color-text-muted)]/40 group-hover:bg-[var(--color-accent-gold)]/60"
            )}
          />
        </button>
      ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/SectionDots.tsx
git commit -m "feat: add SectionDots side navigation with scroll tracking"
```

---

## Task 5: Redesign Navbar as Minimal Floating Bar

**Files:**
- Modify: `src/components/Navbar.tsx` (complete rewrite)

**Step 1: Rewrite the Navbar**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/priser", label: "Priser" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[var(--color-bg-cream)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/50"
            : "bg-transparent"
        )}
      >
        <div className="container-width flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="font-serif text-xl font-bold text-[var(--color-text-dark)] tracking-tight">
              Ringebu
            </span>
          </Link>

          {/* Desktop Links — centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-sans font-light tracking-wide transition-colors duration-300",
                  pathname === link.href
                    ? "text-[var(--color-text-dark)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/kontakt"
              className="hidden md:inline-flex btn-primary text-sm px-6 py-2.5"
            >
              Bestill Time
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[var(--color-text-dark)] relative z-50"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[var(--color-bg-cream)] z-40 md:hidden flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-3xl font-serif font-bold tracking-tight transition-colors",
                    pathname === link.href
                      ? "text-[var(--color-accent-gold)]"
                      : "text-[var(--color-text-dark)]"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Link
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-lg px-10 py-4 mt-4"
              >
                Bestill Time
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Step 2: Verify navbar renders at localhost:3000**

**Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: redesign Navbar as minimal floating editorial bar"
```

---

## Task 6: Redesign Footer as Slim Dark Strip

**Files:**
- Modify: `src/components/Footer.tsx` (complete rewrite)

**Step 1: Rewrite the Footer**

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-bg-cream)] py-10">
      <div className="container-width">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link href="/" className="font-serif text-lg font-bold tracking-tight">
            Ringebu
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-sans font-light opacity-60">
            <Link href="/behandlinger" className="hover:opacity-100 transition-opacity">
              Behandlinger
            </Link>
            <Link href="/priser" className="hover:opacity-100 transition-opacity">
              Priser
            </Link>
            <Link href="/kontakt" className="hover:opacity-100 transition-opacity">
              Kontakt
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs font-sans opacity-40">
            &copy; {new Date().getFullYear()} Ringebu Tannlegesenter
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: redesign Footer as slim dark editorial strip"
```

---

## Task 7: Update Layout — Remove Old Padding, Prepare for Snap Container

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update the layout**

The layout needs to remove the old `pt-24 pb-12` padding from main (since sections now handle their own full-viewport layout), and keep Navbar/Footer outside the snap container. The snap container will live inside page.tsx.

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ringebu Tannlegesenter | Profesjonell Tannpleie",
    template: "%s | Ringebu Tannlegesenter",
  },
  description:
    "Ringebu Tannlegesenter tilbyr moderne tannbehandling av høy kvalitet. Erfarne tannleger, siste teknologi, og fokus på din komfort. Bestill time i dag.",
  keywords: [
    "tannlege",
    "Ringebu",
    "tannlegesenter",
    "tannbehandling",
    "tannhelse",
    "Gudbrandsdalen",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans min-h-screen selection:bg-[var(--color-accent-gold)]/20">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update layout for editorial design — remove old padding, clean body styles"
```

---

## Task 8: Rewrite page.tsx — Complete Front Page with All 5 Sections

**Files:**
- Modify: `src/app/page.tsx` (complete rewrite)

This is the main task. The entire front page gets rebuilt with 5 scroll-snap sections.

**Step 1: Rewrite page.tsx**

```tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ScrollSection, { AnimatedContent } from "@/components/ScrollSection";
import SectionDots from "@/components/SectionDots";
import ImagePlaceholder from "@/components/ImagePlaceholder";

/* ──────────────────────────────────────────────
   SECTION COMPONENTS (co-located for clarity)
   ────────────────────────────────────────────── */

function HeroSection() {
  return (
    <ScrollSection id="hero" bg="cream">
      <div className="container-width w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-0">
        {/* Left — Text */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-xl">
          <AnimatedContent delay={0}>
            <span className="eyebrow">Ringebu Tannlegesenter</span>
          </AnimatedContent>
          <AnimatedContent delay={0.15}>
            <h1 className="heading-editorial">
              Tannpleie med
              <br />
              omtanke
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

        {/* Right — Image placeholder */}
        <AnimatedContent delay={0.2} direction="none" className="flex justify-center lg:justify-end">
          <motion.div
            initial={{ scale: 1.02, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ImagePlaceholder
              className="w-full max-w-md lg:max-w-lg aspect-[3/4] shadow-2xl shadow-black/5"
              tone="light"
              rounded="rounded-2xl"
              label="Hero foto"
            />
          </motion.div>
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

function AboutSection() {
  return (
    <ScrollSection id="about" bg="cream">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen lg:min-h-0">
        {/* Left — Image (edge-to-edge on left) */}
        <AnimatedContent
          direction="left"
          className="lg:col-span-7 flex"
        >
          <ImagePlaceholder
            className="w-full h-[50vh] lg:h-full"
            tone="mid"
            rounded="rounded-none lg:rounded-r-3xl"
            label="Klinikk foto"
          />
        </AnimatedContent>

        {/* Right — Text */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0 gap-6">
          <AnimatedContent delay={0.1}>
            <div className="gold-line mb-4" />
          </AnimatedContent>
          <AnimatedContent delay={0.15}>
            <span className="eyebrow">Vår Filosofi</span>
          </AnimatedContent>
          <AnimatedContent delay={0.25}>
            <h2 className="heading-editorial text-3xl lg:text-5xl">
              Din trygghet er vår prioritet
            </h2>
          </AnimatedContent>
          <AnimatedContent delay={0.35}>
            <div className="flex flex-col gap-4">
              <p className="body-editorial">
                Hos Ringebu Tannlegesenter tror vi på at tannpleie handler om mer enn bare tenner.
                Det handler om å skape en trygg og behagelig opplevelse for hver enkelt pasient.
              </p>
              <p className="body-editorial">
                Med over 15 års erfaring i Gudbrandsdalen kombinerer vi faglig dyktighet
                med ekte omsorg. Vår moderne klinikk er designet for din komfort.
              </p>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </ScrollSection>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Generell Tannpleie",
      desc: "Undersøkelser, rengjøring og forebyggende behandling",
    },
    {
      title: "Kosmetisk Tannpleie",
      desc: "Bleking, fasetter og estetiske løsninger",
    },
    {
      title: "Implantat",
      desc: "Tannimplantater med naturlig utseende og holdbarhet",
    },
    {
      title: "Akutt Behandling",
      desc: "Rask hjelp ved tannverk og akutte problemer",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl">
          {services.map((service, i) => (
            <AnimatedContent key={service.title} delay={0.1 + i * 0.15}>
              <div className="group bg-[var(--color-card-white)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
                <ImagePlaceholder
                  className="w-full h-40 lg:h-48"
                  tone={i % 2 === 0 ? "light" : "mid"}
                  rounded="rounded-none"
                  label={service.title}
                />
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-[var(--color-text-dark)] mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm font-sans font-light text-[var(--color-text-muted)] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

function GallerySection() {
  return (
    <ScrollSection id="gallery" bg="warmest">
      <div className="container-width w-full flex flex-col items-center justify-center py-20 lg:py-0">
        <div className="w-full max-w-6xl">
          {/* Mosaic grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 h-auto lg:h-[70vh]">
            {/* Large image — left */}
            <AnimatedContent className="lg:col-span-3 h-[60vh] lg:h-full">
              <ImagePlaceholder
                className="w-full h-full"
                tone="light"
                rounded="rounded-xl"
                label="Klinikk interiør"
              />
            </AnimatedContent>

            {/* Two stacked — right */}
            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-2 h-auto lg:h-full">
              <AnimatedContent delay={0.2} className="h-[30vh] lg:h-full">
                <ImagePlaceholder
                  className="w-full h-full"
                  tone="mid"
                  rounded="rounded-xl"
                  label="Behandlingsrom"
                />
              </AnimatedContent>
              <AnimatedContent delay={0.4} className="h-[30vh] lg:h-full">
                <ImagePlaceholder
                  className="w-full h-full"
                  tone="dark"
                  rounded="rounded-xl"
                  label="Utstyr"
                />
              </AnimatedContent>
            </div>
          </div>

          {/* Caption */}
          <AnimatedContent delay={0.5} className="text-center mt-6">
            <p className="text-sm font-sans font-light italic text-[var(--color-text-muted)]">
              Moderne fasiliteter i hjertet av Gudbrandsdalen
            </p>
          </AnimatedContent>
        </div>
      </div>
    </ScrollSection>
  );
}

function ContactSection() {
  return (
    <ScrollSection id="contact" bg="cream">
      <div className="container-width w-full flex flex-col items-center justify-center text-center py-20 lg:py-0">
        <AnimatedContent>
          <span className="eyebrow block mb-4">Ta Kontakt</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="heading-editorial text-3xl lg:text-6xl mb-6">
            Klar for ditt neste besøk?
          </h2>
        </AnimatedContent>
        <AnimatedContent delay={0.2}>
          <p className="body-editorial max-w-lg mx-auto mb-10">
            Vi tar imot nye pasienter og ser frem til å høre fra deg.
          </p>
        </AnimatedContent>

        {/* CTAs */}
        <AnimatedContent delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link href="/kontakt" className="btn-primary">
              Bestill Time
            </Link>
            <a href="tel:+4761280412" className="btn-secondary">
              Ring Oss
            </a>
          </div>
        </AnimatedContent>

        {/* Decorative line */}
        <AnimatedContent delay={0.4}>
          <div className="gold-line mx-auto mb-8" />
        </AnimatedContent>

        {/* Contact details */}
        <AnimatedContent delay={0.45}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm font-sans font-light text-[var(--color-text-muted)]">
            <a href="tel:+4761280412" className="hover:text-[var(--color-text-dark)] transition-colors">
              61 28 04 12
            </a>
            <span className="hidden sm:block">·</span>
            <a href="mailto:post@ringebutann.no" className="hover:text-[var(--color-text-dark)] transition-colors">
              post@ringebutann.no
            </a>
            <span className="hidden sm:block">·</span>
            <span>Jernbanegata 4, 2630 Ringebu</span>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.5}>
          <div className="mt-4 text-xs font-sans text-[var(--color-text-muted)]/60">
            Man–Fre: 08:00–15:30 · Tirs, Tors: 08:00–17:00
          </div>
        </AnimatedContent>
      </div>
    </ScrollSection>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SectionDots containerRef={containerRef} />
      <div ref={containerRef} className="snap-container">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <ContactSection />
      </div>
    </>
  );
}
```

**Step 2: Verify at localhost:3000 — all 5 sections should render, scroll-snap between them, animations fire on entry**

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite front page with 5 editorial scroll-snap sections"
```

---

## Task 9: Remove Unused Old Components

**Files:**
- Delete: `src/components/Hero.tsx`
- Delete: `src/components/AnimateOnScroll.tsx`
- Delete: `src/components/Counter.tsx`
- Delete: `src/components/GlassCard.tsx`
- Delete: `src/components/SectionHeader.tsx`
- Delete: `src/components/TestimonialCard.tsx`
- Delete: `src/components/TestimonialsCarousel.tsx`
- Delete: `src/components/ui/AuroraBackground.tsx`
- Delete: `src/components/ui/GradientBorderCard.tsx`
- Delete: `src/app/StatsSection.tsx`

**Step 1: Delete all unused components**

```bash
rm src/components/Hero.tsx \
   src/components/AnimateOnScroll.tsx \
   src/components/Counter.tsx \
   src/components/GlassCard.tsx \
   src/components/SectionHeader.tsx \
   src/components/TestimonialCard.tsx \
   src/components/TestimonialsCarousel.tsx \
   src/components/ui/AuroraBackground.tsx \
   src/components/ui/GradientBorderCard.tsx \
   src/app/StatsSection.tsx
```

**Step 2: Verify no import errors — run `npx next build` or check dev server for compile errors**

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused old components replaced by editorial design"
```

---

## Task 10: Visual Polish & Responsive Verification

**Files:**
- Possibly adjust: `src/app/globals.css`, `src/app/page.tsx`, `src/components/Navbar.tsx`

**Step 1: Check desktop view at localhost:3000**

- Scroll through all 5 sections
- Verify snap behavior works
- Verify all animations fire
- Verify side dots track correctly

**Step 2: Check mobile view (resize to ~375px wide)**

- Sections should stack gracefully
- Cards should go single column
- Buttons should be full width on mobile
- Nav hamburger should work

**Step 3: Check tablet view (~768px wide)**

- Layouts should adapt proportionally
- No horizontal overflow

**Step 4: Fix any visual issues found**

**Step 5: Commit any polish fixes**

```bash
git add -A
git commit -m "fix: responsive polish and visual refinements"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | New color tokens & base styles | globals.css |
| 2 | ScrollSection + AnimatedContent components | new ScrollSection.tsx |
| 3 | ImagePlaceholder component | new ImagePlaceholder.tsx |
| 4 | SectionDots navigation | new SectionDots.tsx |
| 5 | Navbar redesign | Navbar.tsx |
| 6 | Footer redesign | Footer.tsx |
| 7 | Layout update | layout.tsx |
| 8 | Full page rewrite (5 sections) | page.tsx |
| 9 | Remove unused components | 10 files deleted |
| 10 | Visual polish & responsive verification | various |

**Total commits:** 10
**New dependencies:** None
**Estimated implementation time:** ~45 minutes with subagent execution

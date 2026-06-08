"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const HEADLINE_LINE_1 = "Tannhelse,";
const HEADLINE_LINE_2 = "slik den burde være.";
const SUBLINE =
  "Ringebu Tannlegesenter tilbyr moderne tannbehandling med personlig omsorg — i hjertet av Gudbrandsdalen.";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// Asymmetric collage — 4 photos of the actual clinic.
// Z-shape layout: room dominant top-left, equip top-right square,
// sign bottom-left square, outside (valley) wide bottom-right.
const PHOTOS = [
  {
    key: "room",
    src: "/images/ringebutannMain.jpg",
    alt: "Behandlingsrom ved Ringebu Tannlegesenter",
    objectPosition: "center 45%",
    area: "room",
    delay: 0.35,
    fromX: -24,
    fromY: -16,
  },
  {
    key: "equipment",
    src: "/images/clinic-instruments.jpg",
    alt: "Tannlegeinstrumenter",
    objectPosition: "center",
    area: "equip",
    delay: 0.5,
    fromX: 24,
    fromY: -16,
  },
  {
    key: "sign",
    src: "/images/clinic-sign.jpg",
    alt: "Skiltet utenfor klinikken",
    objectPosition: "center 35%",
    area: "sign",
    delay: 0.65,
    fromX: -24,
    fromY: 20,
  },
  {
    key: "outside",
    src: "/images/clinic-valley.jpg",
    alt: "Klinikken i Gudbrandsdalen",
    objectPosition: "center 55%",
    area: "outside",
    delay: 0.8,
    fromX: 24,
    fromY: 20,
  },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.dispatchEvent(new CustomEvent("ringebu:hero-enter"));
          } else {
            window.dispatchEvent(new CustomEvent("ringebu:hero-exit"));
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const headlineWords1 = HEADLINE_LINE_1.split(" ");
  const headlineWords2 = HEADLINE_LINE_2.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--color-paper)]"
      aria-label="Velkommen"
    >
      {/* Atmospheric background — warm white easing into the cream paper below */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 30%, rgba(24,148,138,0.08) 0%, transparent 65%), " +
            "radial-gradient(ellipse 60% 70% at 90% 85%, rgba(14,42,48,0.05) 0%, transparent 60%), " +
            "linear-gradient(165deg, #FFFFFF 0%, #FEFCF7 55%, #FCF9F2 100%)",
        }}
      />
      <GrainOverlay opacity={0.04} />

      {/* Top brass accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[1] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-brass) 25%, var(--color-ink) 50%, var(--color-brass) 75%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[var(--container-max,1280px)] flex-col gap-12 px-[var(--container-px,24px)] pt-32 pb-16 md:pt-36 md:pb-20 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        {/* Left — headline + subline + CTAs */}
        <div className="flex flex-col">
          <h1 className="display-hero text-[var(--color-text-primary)]">
            <span className="block overflow-hidden">
              {headlineWords1.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  className="mr-[0.25em] inline-block"
                  initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.2 + i * 0.06, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden font-light text-[var(--color-copper)]">
              {headlineWords2.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  className="mr-[0.25em] inline-block"
                  initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.4 + i * 0.06, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            className="body-large mt-8 max-w-[440px] text-[var(--color-text-secondary)]"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
          >
            {SUBLINE}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-copper)] px-7 py-3.5 text-[13px] font-semibold tracking-[0.005em] text-[var(--color-paper)] transition-colors hover:bg-[var(--color-copper)]/90"
            >
              Bestill time
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:61280412"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-6 py-3.5 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[rgba(26,20,16,0.04)]"
            >
              Ring 61 28 04 12
            </a>
          </motion.div>
        </div>

        {/* Right — asymmetric 4-photo collage of the real clinic.
            Z-shape: room dominant top-left (3×2), equip top-right (2×2),
            sign bottom-left (2×2), outside wide bottom-right (3×2).
            All 4 photos at meaningful size. */}
        <div
          className="relative aspect-[5/4] w-full max-w-[640px] self-center lg:aspect-[6/5] lg:max-w-none"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gridTemplateRows: "repeat(4, minmax(0, 1fr))",
            gap: "10px",
            gridTemplateAreas:
              '"room room room equip equip" "room room room equip equip" "sign sign outside outside outside" "sign sign outside outside outside"',
          }}
        >
          {PHOTOS.map((photo) => (
            <motion.div
              key={photo.key}
              className="group relative overflow-hidden rounded-[3px] bg-[var(--color-ink)] shadow-[0_18px_50px_rgba(14,42,48,0.16)] ring-1 ring-[rgba(26,20,16,0.06)]"
              style={{ gridArea: photo.area }}
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, x: photo.fromX, y: photo.fromY, scale: 0.96 }
              }
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: photo.delay, ease: EASE }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={photo.key === "room"}
                quality={90}
                sizes="(max-width: 1023px) 60vw, 30vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style={{ objectPosition: photo.objectPosition }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              />
            </motion.div>
          ))}

          {/* Brass corner tick on the equipment tile (top-right) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-1px] top-[-1px] z-[2]"
            style={{ gridArea: "equip" }}
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
          >
            <div className="absolute right-0 top-0 h-12 w-px bg-gradient-to-b from-[var(--color-brass)] to-transparent" />
            <div className="absolute right-0 top-0 h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-brass)]" />
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        className="absolute left-1/2 bottom-6 z-10 flex -translate-x-1/2 items-center gap-2 font-sans text-[11px] tracking-[0.04em] text-[var(--color-text-muted)]"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3, ease: EASE }}
      >
        <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--color-text-muted)]/40" />
        <span>Bla videre</span>
      </motion.div>
    </section>
  );
}

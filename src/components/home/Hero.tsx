"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useMotionTemplate, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useHeroPointer } from "./useHeroPointer";

/**
 * Gudbrandsdalen lies under the whole page, and the headline is cut through
 * the paper into it. At first so are the windows on the right: they open onto
 * the very same landscape, registered with the letters, so the screen is one
 * view seen through several holes. Then the clinic arrives — one window at a
 * time the valley dissolves and a photograph takes its place, so the rooms
 * appear to come out of the landscape rather than being pasted over it.
 * Hovering a window steps the photograph aside to show the valley still there.
 *
 * Both the ghost and the carved letters use `background-attachment: fixed`,
 * which is what keeps them registered with each other without measuring.
 *
 * The entrance is plain CSS (the hero-* classes in globals.css), not
 * framer-motion: it plays from the first paint instead of waiting for the
 * page's JavaScript, which left the hero blank for seconds on a slow phone.
 * Only the drift is driven from here.
 */

// next/image cannot paint into background-clip:text, so the optimizer
// endpoint is addressed directly rather than shipping the master: the
// .hero-valley and .hero-carved rules in globals.css, which also pick the
// width (w=1920 from 768px up, w=1080 below). Only the position moves here.

const HEAD = [
  { text: "Ringebu", weight: 700 },
  { text: "Tannlegesenter", weight: 400 },
] as const;

type Box = { x: string; y: string; w: string; h: string };

type Win = {
  key: string;
  src: string;
  alt: string;
  /** box on desktop, in % of the section */
  box: Box;
  /** box on phones */
  boxSm: Box;
  radius: string;
  /** order in which the clinic replaces the valley */
  step: number;
  objectPosition: string;
};

const WINDOWS: Win[] = [
  {
    key: "room",
    src: "/images/ringebutannMain.jpg",
    alt: "Behandlingsrom ved Ringebu Tannlegesenter",
    box: { x: "56.5%", y: "11%", w: "21%", h: "40%" },
    boxSm: { x: "5%", y: "50%", w: "42%", h: "21%" },
    radius: "4px",
    step: 0,
    objectPosition: "50% 55%",
  },
  {
    key: "sign",
    src: "/images/clinic-sign.jpg",
    alt: "Skiltet utenfor klinikken",
    box: { x: "79.5%", y: "17%", w: "15%", h: "28%" },
    boxSm: { x: "53%", y: "54%", w: "42%", h: "18%" },
    radius: "999px 999px 4px 4px",
    step: 1,
    objectPosition: "50% 38%",
  },
  {
    key: "instruments",
    src: "/images/clinic-instruments.jpg",
    alt: "Tannlegeinstrumenter",
    box: { x: "56.5%", y: "55%", w: "21%", h: "29%" },
    boxSm: { x: "5%", y: "73%", w: "42%", h: "16%" },
    radius: "4px",
    step: 3,
    objectPosition: "50% 50%",
  },
  {
    key: "valley",
    src: "/images/clinic-valley.jpg",
    alt: "Klinikken i Gudbrandsdalen",
    box: { x: "79.5%", y: "49%", w: "15%", h: "32%" },
    boxSm: { x: "53%", y: "75%", w: "42%", h: "18%" },
    radius: "4px",
    step: 2,
    objectPosition: "50% 50%",
  },
];

// The windows are cut first; the clinic only starts arriving once they are open.
const OPEN_AT = 0.45;
const ARRIVE_AT = 1.75;

/** Custom properties for a style prop: a window's boxes, a starting offset. */
const vars = (v: Record<string, string>) => v as CSSProperties;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Tell the floating nav when it is over the hero.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          window.dispatchEvent(
            new CustomEvent(
              entry.isIntersecting ? "ringebu:hero-enter" : "ringebu:hero-exit"
            )
          );
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { nx, ny } = useHeroPointer(sectionRef, !prefersReduced);
  const bgX = useTransform(nx, [-1, 1], [56, 44]);
  const bgY = useTransform(ny, [-1, 1], [56, 44]);
  const bgPos = useMotionTemplate`${bgX}% ${bgY}%`;
  const position = prefersReduced ? "50% 50%" : bgPos;

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-white"
      aria-label="Velkommen"
    >
      {/* ── The valley, lying under the whole page ── */}
      <motion.div
        aria-hidden="true"
        className="hero-valley hero-ghost absolute inset-0 saturate-[0.55] [filter:contrast(0.94)_brightness(1.06)]"
        style={{ backgroundPosition: position, opacity: 0.2 }}
      />
      {/* Paper comes back over it so the page still reads white */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.9) 16%, rgba(255,255,255,0.34) 52%, rgba(255,255,255,0.2) 100%)",
        }}
      />
      <GrainOverlay opacity={0.035} />

      {/* ── The window wall ── */}
      <div className="absolute inset-0">
        {WINDOWS.map((w) => (
          <div
            key={w.key}
            className="hero-win absolute left-[var(--xs)] top-[var(--ys)] h-[var(--hs)] w-[var(--ws)] overflow-hidden md:left-[var(--x)] md:top-[var(--y)] md:h-[var(--h)] md:w-[var(--w)]"
            style={{
              ...vars({
                "--x": w.box.x,
                "--y": w.box.y,
                "--w": w.box.w,
                "--h": w.box.h,
                "--xs": w.boxSm.x,
                "--ys": w.boxSm.y,
                "--ws": w.boxSm.w,
                "--hs": w.boxSm.h,
              }),
              animationDelay: `${OPEN_AT + w.step * 0.11}s`,
              borderRadius: w.radius,
              boxShadow:
                "0 2px 6px rgba(14,42,48,0.05), 0 22px 46px -24px rgba(14,42,48,0.28)",
            }}
          >
            {/* Underneath: the same valley the letters are cut from */}
            <motion.div
              aria-hidden="true"
              className="hero-valley absolute inset-0"
              style={{ backgroundPosition: position }}
            />

            {/* Over it: the clinic, arriving one window at a time */}
            <div
              className="hero-photo absolute inset-0"
              style={{ animationDelay: `${ARRIVE_AT + w.step * 0.26}s` }}
            >
              <Image
                src={w.src}
                alt={w.alt}
                fill
                quality={90}
                sizes="(max-width: 767px) 44vw, 22vw"
                className="object-cover"
                style={{ objectPosition: w.objectPosition }}
              />
            </div>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[rgba(14,42,48,0.10)]"
              style={{ borderRadius: w.radius }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: w.radius,
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 26%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── The carved headline ── */}
      <div className="pointer-events-none relative z-30 mx-auto flex min-h-[100svh] w-full max-w-[var(--container-max,1280px)] flex-col justify-start px-[var(--container-px,24px)] pt-[clamp(112px,16svh,170px)] md:justify-center md:pt-[clamp(104px,14svh,150px)]">
        <div className="max-w-full md:max-w-[50%]">
          <h1
            style={{
              // Capped at 92px, not 100: the column stops growing at the 1280
              // container (604px wide) while 6vw keeps climbing, and
              // "Tannlegesenter" is 14 unbreakable characters. At 100px it
              // measured 631px and spilled into the windows on the right.
              fontSize: "clamp(38px, 6vw, 92px)",
              lineHeight: 0.96,
              letterSpacing: "-0.05em",
            }}
          >
            <span className="sr-only">Ringebu Tannlegesenter</span>
            {HEAD.map((line, li) => (
              <span
                key={li}
                aria-hidden="true"
                className="block overflow-hidden pb-[0.07em]"
              >
                <motion.span
                  className="hero-carved hero-line inline-block bg-clip-text text-transparent [-webkit-background-clip:text]"
                  style={{
                    animationDelay: `${0.2 + li * 0.11}s`,
                    backgroundPosition: position,
                    fontWeight: line.weight,
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <p
            className="hero-lift mt-6 max-w-[34ch] text-[26px] font-light leading-[1.25] tracking-[-0.02em] text-[var(--color-text-secondary)] md:text-[30px]"
            style={{ animationDelay: "0.5s", ...vars({ "--from-y": "10px" }) }}
          >
            Hos oss er alle velkomne
          </p>

          <div
            className="hero-lift pointer-events-auto mt-9 flex flex-wrap items-center gap-2.5"
            style={{ animationDelay: "0.72s", ...vars({ "--from-y": "12px" }) }}
          >
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(14,42,48,0.5)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(14,42,48,0.55)]"
            >
              Bestill time
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="tel:61280412"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(14,42,48,0.18)] bg-white/70 px-5 py-3.5 text-[13px] font-medium text-[var(--color-ink)] backdrop-blur-sm transition-colors duration-300 hover:border-[rgba(14,42,48,0.38)] hover:bg-white"
            >
              61 28 04 12
            </a>
          </div>
        </div>
      </div>

      <div
        className="hero-fade absolute inset-x-0 bottom-0 z-30 hidden border-t border-[rgba(14,42,48,0.08)] bg-white/55 backdrop-blur-[2px] md:block"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] items-center justify-between gap-6 px-[var(--container-px,24px)] py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span>Hanstadgata 2, 2630 Ringebu</span>
          <span>Man–tor 08.00–15.30 · Fre 08.00–15.00</span>
        </div>
      </div>
    </section>
  );
}

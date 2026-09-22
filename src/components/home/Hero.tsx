"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
 */

// next/image cannot paint into background-clip:text, so the optimizer
// endpoint is addressed directly rather than shipping the 2.6 MB original.
const VALLEY = "/_next/image?url=%2Fimages%2Fhero-valley-bg.jpg&w=1920&q=75";

const FIXED = {
  backgroundSize: "cover",
  backgroundAttachment: "fixed" as const,
  backgroundRepeat: "no-repeat" as const,
};
const ghostFill = { ...FIXED, backgroundImage: `url("${VALLEY}")` };
// The same photograph pushed into ink range, so the carved letters read as
// type against paper instead of dissolving into the sky.
const carvedFill = {
  ...FIXED,
  backgroundImage: `linear-gradient(rgba(8,30,35,0.62), rgba(8,30,35,0.62)), url("${VALLEY}")`,
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

const HEAD = [
  { text: "Hos oss er", weight: 400 },
  { text: "alle velkomne", weight: 700 },
] as const;

type Win = {
  key: string;
  src: string;
  alt: string;
  /** absolute box on desktop, in % of the section */
  box: string;
  /** absolute box on phones */
  boxSm: string;
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
    box: "left:56.5%; top:11%; width:21%; height:40%;",
    boxSm: "left:5%; top:50%; width:42%; height:21%;",
    radius: "4px",
    step: 0,
    objectPosition: "50% 55%",
  },
  {
    key: "sign",
    src: "/images/clinic-sign.jpg",
    alt: "Skiltet utenfor klinikken",
    box: "left:79.5%; top:17%; width:15%; height:28%;",
    boxSm: "left:53%; top:54%; width:42%; height:18%;",
    radius: "999px 999px 4px 4px",
    step: 1,
    objectPosition: "50% 38%",
  },
  {
    key: "instruments",
    src: "/images/clinic-instruments.jpg",
    alt: "Tannlegeinstrumenter",
    box: "left:56.5%; top:55%; width:21%; height:29%;",
    boxSm: "left:5%; top:73%; width:42%; height:16%;",
    radius: "4px",
    step: 3,
    objectPosition: "50% 50%",
  },
  {
    key: "valley",
    src: "/images/clinic-valley.jpg",
    alt: "Klinikken i Gudbrandsdalen",
    box: "left:79.5%; top:49%; width:15%; height:32%;",
    boxSm: "left:53%; top:75%; width:42%; height:18%;",
    radius: "4px",
    step: 2,
    objectPosition: "50% 50%",
  },
];

const parseStyle = (s: string): Record<string, string> =>
  Object.fromEntries(
    s
      .split(";")
      .filter(Boolean)
      .map((d) => {
        const [k, v] = d.split(":");
        return [k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v.trim()];
      })
  );

// The windows are cut first; the clinic only starts arriving once they are open.
const OPEN_AT = 0.45;
const ARRIVE_AT = 1.75;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [peek, setPeek] = useState<string | null>(null);
  const [isSm, setIsSm] = useState(false);

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

  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsSm(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);

  const { nx, ny } = useHeroPointer(sectionRef, !prefersReduced);
  const bgX = useTransform(nx, [-1, 1], [56, 44]);
  const bgY = useTransform(ny, [-1, 1], [56, 44]);
  const bgPos = useMotionTemplate`${bgX}% ${bgY}%`;

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-white"
      aria-label="Velkommen"
    >
      {/* ── The valley, lying under the whole page ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 saturate-[0.55] [filter:contrast(0.94)_brightness(1.06)]"
        style={
          prefersReduced
            ? { ...ghostFill, backgroundPosition: "50% 50%", opacity: 0.2 }
            : { ...ghostFill, backgroundPosition: bgPos }
        }
        initial={prefersReduced ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
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
        {WINDOWS.map((w) => {
          const peeking = peek === w.key;
          return (
            <motion.div
              key={w.key}
              className="absolute overflow-hidden"
              style={{
                ...parseStyle(isSm ? w.boxSm : w.box),
                borderRadius: w.radius,
                boxShadow:
                  "0 2px 6px rgba(14,42,48,0.05), 0 22px 46px -24px rgba(14,42,48,0.28)",
              }}
              onHoverStart={() => setPeek(w.key)}
              onHoverEnd={() => setPeek((v) => (v === w.key ? null : v))}
              initial={prefersReduced ? false : { clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{
                duration: 1.05,
                delay: OPEN_AT + w.step * 0.11,
                ease: EASE,
              }}
            >
              {/* Underneath: the same valley the letters are cut from */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0"
                style={
                  prefersReduced
                    ? { ...ghostFill, backgroundPosition: "50% 50%" }
                    : { ...ghostFill, backgroundPosition: bgPos }
                }
              />

              {/* Over it: the clinic, arriving one window at a time */}
              <motion.div
                className="absolute inset-0"
                initial={prefersReduced ? false : { opacity: 0, scale: 1.06 }}
                animate={{
                  opacity: peeking ? 0.12 : 1,
                  scale: peeking ? 1.04 : 1,
                }}
                transition={
                  peek === null
                    ? {
                        opacity: {
                          duration: 1.1,
                          delay: ARRIVE_AT + w.step * 0.26,
                          ease: EASE,
                        },
                        scale: {
                          duration: 1.4,
                          delay: ARRIVE_AT + w.step * 0.26,
                          ease: EASE,
                        },
                      }
                    : { duration: 0.5, ease: EASE }
                }
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
              </motion.div>

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
            </motion.div>
          );
        })}
      </div>

      {/* ── The carved headline ── */}
      <div className="pointer-events-none relative z-30 mx-auto flex min-h-[100svh] w-full max-w-[var(--container-max,1280px)] flex-col justify-start px-[var(--container-px,24px)] pt-[clamp(112px,16svh,170px)] md:justify-center md:pt-[clamp(104px,14svh,150px)]">
        <div className="max-w-full md:max-w-[50%]">
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-stone)]"
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            Ringebu Tannlegesenter
          </motion.p>

          <h1
            className="mt-5"
            style={{
              fontSize: "clamp(38px, 6vw, 100px)",
              lineHeight: 0.96,
              letterSpacing: "-0.05em",
            }}
          >
            <span className="sr-only">Hos oss er alle velkomne</span>
            {HEAD.map((line, li) => (
              <span
                key={li}
                aria-hidden="true"
                className="block overflow-hidden pb-[0.07em]"
              >
                <motion.span
                  className="inline-block bg-clip-text text-transparent [-webkit-background-clip:text]"
                  style={
                    prefersReduced
                      ? { ...carvedFill, backgroundPosition: "50% 50%", fontWeight: line.weight }
                      : { ...carvedFill, backgroundPosition: bgPos, fontWeight: line.weight }
                  }
                  initial={prefersReduced ? false : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 74,
                    damping: 17,
                    delay: 0.3 + li * 0.11,
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="pointer-events-auto mt-9 flex flex-wrap items-center gap-2.5"
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
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
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 hidden border-t border-[rgba(14,42,48,0.08)] bg-white/55 backdrop-blur-[2px] md:block"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] items-center justify-between gap-6 px-[var(--container-px,24px)] py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span>Hanstadgata 2, 2630 Ringebu</span>
          <span>Man–tor 08.00–15.30 · Fre 08.00–15.00</span>
        </div>
      </motion.div>
    </section>
  );
}

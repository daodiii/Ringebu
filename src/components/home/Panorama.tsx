"use client";

import { getImageProps, type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import far from "./panorama/far.webp";
import farPhone from "./panorama/far-phone.webp";
import farTall from "./panorama/far-tall.webp";
import near from "./panorama/near.webp";
import nearPhone from "./panorama/near-phone.webp";
import nearTall from "./panorama/near-tall.webp";
import s from "./panorama/panorama.module.css";

/**
 * «Panorama». The hero is the view from the lookout above Ringebu: the river
 * Lågen running down Gudbrandsdalen under a summer sky, edge to edge and at
 * full strength. The words are white, on one soft patch of shade in the sky
 * just behind them, like the shadow of a cloud.
 *
 * The photograph is split in two depths: the far valley, and the near things
 * (the birches, the concrete lookout, the path). Under the near layer the far
 * one has them painted out, so the two can slide against each other.
 *
 * On the first paint the hero is paper with an arched window in it, close on
 * the river. The window widens past the edges of the screen while the camera
 * pulls back, the lookout shrinking faster than the valley, and the view
 * settles. Then the two depths breathe against each other in one long round,
 * and the pointer leans them. Scrolling away, the valley lags behind the
 * lookout and the paper closes in around the view.
 *
 * Everything that moves moves by transform. The entrance is CSS, so it plays
 * from the first paint; the breathing pauses while the hero is off screen.
 */

const REDUCE = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  const m = window.matchMedia(REDUCE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

/** Wide screens get the whole panorama; tall ones a crop of its middle. */
function art(wide: StaticImageData, tall: StaticImageData, phone: StaticImageData) {
  const common = { alt: "", loading: "eager", fetchPriority: "high" } as const;
  const { props: { srcSet: wideSet } } = getImageProps({ ...common, sizes: "100vw", src: wide });
  // The tall crop is hung 132% of the frame's height (the hero plus 88px),
  // which makes it 1.18 times that wide: about 1100px on a phone, three
  // screens wide. A 2x phone gets 2048px of the 2880px crop, a 3x one all of it.
  const { props: { srcSet: tallSet, ...img } } = getImageProps({ ...common, sizes: "calc(118vh + 104px)", src: tall });
  // A phone's frame shows under half of that width, so phones get the
  // middle 62% of the tall crop (*-phone.webp, cut by lag.py), from 42% of
  // the leftover: with the same object-position (42%) it shows exactly what
  // the tall crop would, on any screen whose frame is under 62% of it wide.
  // Up to 9:16 that holds even for a 600px-tall hero.
  const { props: { srcSet: phoneSet } } = getImageProps({ ...common, sizes: "calc(73.2vh + 65px)", src: phone });
  return { wideSet, tallSet, phoneSet, img };
}
const FAR = art(far, farTall, farPhone);
const NEAR = art(near, nearTall, nearPhone);

function Photo({ a }: { a: ReturnType<typeof art> }) {
  return (
    <picture>
      <source media="(min-aspect-ratio: 1/1)" srcSet={a.wideSet} sizes="100vw" />
      <source media="(max-aspect-ratio: 9/16)" srcSet={a.phoneSet} sizes="calc(73.2vh + 65px)" />
      <img {...a.img} srcSet={a.tallSet} alt="" />
    </picture>
  );
}

/* The words' box and type, shared by the words and by the shade under the
   paper, which lays out an invisible copy of them to take their shape. */
const WORDS_BOX = "mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pt-[clamp(212px,28svh,232px)] md:pt-[clamp(150px,22svh,230px)]";
const NAME_STYLE: CSSProperties = { fontSize: "clamp(40px, 6vw, 92px)", lineHeight: 0.96, letterSpacing: "-0.05em" };
const NAME_LINES = [
  { text: "Ringebu", weight: 700 },
  { text: "Tannlegesenter", weight: 400 },
];
const SUB = "mt-4 w-fit max-w-[34ch] text-[24px] font-medium leading-[1.25] tracking-[-0.02em] md:mt-5 md:text-[30px]";

export function Panorama() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);

  // The pointer, -1..1 across the hero, eased
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 18, mass: 1 });
  const sy = useSpring(py, { stiffness: 50, damping: 18, mass: 1 });
  const farX = useTransform(sx, (v) => v * -7);
  const farY = useTransform(sy, (v) => v * -4);
  const nearX = useTransform(sx, (v) => v * -22);
  const nearY = useTransform(sy, (v) => v * -10);

  // Scrolling away: the valley lags, the paper closes in. The hero opens the
  // page, so how far it has gone is the page's scroll over its height.
  const heroH = useRef(900);
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (v) => Math.min(1, Math.max(0, v / heroH.current)));
  const lag = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "14%"]);
  const closing = useTransform(scrollYProgress, [0, 0.18, 1], reduced ? [1, 1, 1] : [1, 1, 0.56]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  // Tell the floating nav when it is over the hero, and pause the loops
  // while the hero is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) window.dispatchEvent(new CustomEvent(e.isIntersecting ? "ringebu:hero-enter" : "ringebu:hero-exit"));
      },
      { threshold: 0.15 }
    );
    const on = new IntersectionObserver((entries) => {
      el.dataset.on = String(entries[entries.length - 1].isIntersecting);
    });
    const size = new ResizeObserver(() => {
      heroH.current = el.offsetHeight || 900;
    });
    io.observe(el);
    on.observe(el);
    size.observe(el);
    return () => {
      io.disconnect();
      on.disconnect();
      size.disconnect();
    };
  }, []);

  return (
    <section ref={ref} data-on="false" aria-label="Velkommen" className={s.root} onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* ── The view ── */}
      <div aria-hidden="true" className={s.stage}>
        <motion.div className={s.depth} style={{ y: lag }}>
          <div className={`${s.dolly} ${s.dollyFar}`}>
            <div className={`${s.idle} ${s.idleFar}`}>
              <motion.div className={s.frame} style={{ x: farX, y: farY }}>
                <Photo a={FAR} />
              </motion.div>
            </div>
          </div>
        </motion.div>
        <div className={s.depth}>
          <div className={`${s.dolly} ${s.dollyNear}`}>
            <div className={`${s.idle} ${s.idleNear}`}>
              <motion.div className={s.frame} style={{ x: nearX, y: nearY }}>
                <Photo a={NEAR} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── The shade behind the words ──
          Under the paper, so while the window opens it darkens only the view
          seen through it, never the paper; it comes in with the words. It
          takes the words' shape from an invisible copy of them. */}
      <div aria-hidden="true" className={`${s.skyggeLag} ${WORDS_BOX}`}>
        <div className="max-w-full lg:max-w-[50%]">
          <div className="invisible relative w-fit">
            <span className={`${s.skygge} hero-fade visible`} style={{ animationDelay: "0.3s" }} />
            <div style={NAME_STYLE}>
              {NAME_LINES.map((line) => (
                <span key={line.text} className="block w-fit pb-[0.08em]" style={{ fontWeight: line.weight }}>
                  {line.text}
                </span>
              ))}
            </div>
            <p className={SUB}>Hos oss er du i trygge hender</p>
          </div>
        </div>
      </div>

      {/* ── The paper the view opens out of, and closes back into ── */}
      <motion.div aria-hidden="true" className={s.close} style={{ scale: closing }}>
        <div className={s.arch}>
          <div className={s.hole}>
            <div className={s.cap}>
              <span />
            </div>
            <div className={s.sideL} />
            <div className={s.sideR} />
            <div className={s.foot} />
          </div>
        </div>
      </motion.div>

      {/* ── The words, in the sky ── */}
      <div className={`${s.words} ${WORDS_BOX}`}>
        <div className="max-w-full lg:max-w-[50%]">
          <div className="w-fit">
            <h1 style={NAME_STYLE} className={`${s.ord} text-white`}>
              <span className="sr-only">Ringebu Tannlegesenter</span>
              {NAME_LINES.map((line, li) => (
                // The mask the line rises through opens once the line is in, so
                // the glow round the letters is never cut off in a box
                <span key={li} aria-hidden="true" className={`${s.maske} relative block w-fit`} style={{ animationDelay: `${(115 + li * 11) / 100}s` }}>
                  {/* The padding gives the g of Ringebu room below the line inside the mask */}
                  <span className="hero-line inline-block pb-[0.08em]" style={{ animationDelay: `${0.3 + li * 0.11}s`, fontWeight: line.weight }}>
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className={`${s.ord} ${SUB} hero-lift text-white`}
              style={{ animationDelay: "0.6s", "--from-y": "10px" } as CSSProperties}
            >
              Hos oss er du i trygge hender
            </p>
          </div>

          <div
            className="hero-lift pointer-events-auto mt-7 flex flex-wrap items-center gap-2.5 md:mt-8"
            style={{ animationDelay: "0.8s", "--from-y": "12px" } as CSSProperties}
          >
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(14,42,48,0.5)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(14,42,48,0.55)]"
            >
              Bestill time
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
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
    </section>
  );
}

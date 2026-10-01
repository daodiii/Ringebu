"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { motion, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { r2, useLean, useShift } from "@/components/home/landskap";
import {
  BANE, CLOUD, DAL, FJELL1, FJELL2, FRONT, H, LIA, LIP, NAER, SNOW_BANK, SUN_X, TRAIN, TRAIN_BOX, W,
} from "./dalen/art";
import { Skilt } from "./dalen/Skilt";
import { BALER, animalsOn, type Season } from "./dalen/dyr";
import s from "./dalen/dalen.module.css";

/**
 * «Dalen». The hero is Gudbrandsdalen at Ringebu cut from paper, seen across
 * the valley: fjell, the forested far side with its farms, the Dovrebanen
 * line, the river Lågen winding through the fields, and this side's meadow
 * The words sit in the sky above, and from «Bestill time» hangs the clinic's
 * own sign, big enough to read the name on it, where it hides none of the view.
 *
 * On load the sheets stand up one by one, back to front, and the sun comes
 * up behind the fjell. Then the year turns by itself, a season every few
 * seconds: summer, autumn, winter, spring. Each change washes outwards across
 * the paper from the sun; snow folds up over the bank in winter and lies down
 * again in spring; sheep, cows and moose come and go with their seasons. Now
 * and then a train runs along the valley floor. The pointer leans the sheets
 * against each other, nearer ones further.
 *
 * The entrance is CSS and plays from the first paint. Between seasons nothing
 * is drawn again: the colour changes are transitions that run only when the
 * season turns, and the loops (clouds, grazing heads) move layers of their
 * own. The year stops while the hero is off screen or the tab is hidden.
 */

const ORDER: Season[] = ["summer", "autumn", "winter", "spring"];
/** How long the first season holds, counted from the page's script starting. */
const FIRST_MS = 6500;
/** Each season after that, wash included. */
const SEASON_MS = 8200;
const TRAIN_MS = 19000;

const REDUCE = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  const m = window.matchMedia(REDUCE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

const pct = (n: number, of: number) => `${r2((n / of) * 10000) / 100}%`;
const box = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: pct(x, W),
  top: pct(y, H),
  width: pct(w, W),
  height: pct(h, H),
});

/**
 * One sheet of the valley, standing up in turn `n`, leaning by `x`. Its
 * drawing never changes, so it is made once. Its shadow falls a little above
 * its edge, onto the sheet behind, as layered paper in a lit frame does:
 * thrown downwards, a land sheet's shadow lay hidden behind the sheet itself.
 */
function Ark({ n, x, children, over, shadow = -6 }: { n: number; x: MotionValue<number>; children?: React.ReactNode; over?: React.ReactNode; shadow?: number | false }) {
  return (
    <motion.div className={s.ark} style={{ x }}>
      <div className={s.stand} style={{ "--delay": `${r2(0.25 + n * 0.14)}s` } as CSSProperties}>
        {children && (
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={s.fill}>
            {shadow !== false && <PaperShadow dy={shadow}>{children}</PaperShadow>}
            {/* The season is set on the paper alone: its shadow, one ink in every season, need not hear of it */}
            <g className={s.art} data-season="summer">
              {children}
            </g>
          </svg>
        )}
        {over}
      </div>
    </motion.div>
  );
}

const SUN = (
  <div className={s.sun} style={{ ...box(SUN_X - 120, 286 - 120, 240, 240) }}>
    <div className={s.sunAt}>
      <svg viewBox="-120 -120 240 240" className={`${s.fill} ${s.sunArt}`}>
        <circle r={112} style={{ fill: "var(--sol2)" }} />
        <circle r={86} style={{ fill: "var(--sol2)" }} opacity={0.8} />
        <circle r={60} style={{ fill: "var(--sol)" }} />
      </svg>
    </div>
  </div>
);

const CLOUDS = [
  { x: 1270, y: 290, w: 132, d: "22%", t: 38 },
  { x: 1780, y: 150, w: 168, d: "-18%", t: 31 },
  { x: 2200, y: 330, w: 118, d: "26%", t: 44 },
].map((cl, i) => (
  <div key={i} className={s.cloud} style={box(cl.x, cl.y, cl.w, cl.w * 0.54)}>
    <div className={`${s.drift} absolute inset-0`} style={{ "--d": cl.d, "--t": `${cl.t}s` } as CSSProperties}>
      <svg viewBox="30 124 100 54" className={s.fill}>
        <PaperShadow dy={3}>
          <path d={CLOUD} />
        </PaperShadow>
        <path d={CLOUD} fill="#FFFFFF" />
      </svg>
    </div>
  </div>
));

const TRAIN_ART = (
  <svg viewBox={`0 ${TRAIN_BOX.y} ${TRAIN_BOX.w} ${TRAIN_BOX.h}`} className={s.fill}>
    <PaperShadow dy={3}>{TRAIN}</PaperShadow>
    {TRAIN}
  </svg>
);

const SNOW_ART = (
  <div className={s.snowbank}>
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={s.fill}>
      <PaperShadow dy={4}>{SNOW_BANK}</PaperShadow>
      {SNOW_BANK}
    </svg>
  </div>
);

const ANIMALS_DAL = animalsOn("dal");
const ANIMALS_NAER = animalsOn("naer");

export function Dalen() {
  const ref = useRef<HTMLElement | null>(null);
  const trainRef = useRef<HTMLDivElement | null>(null);
  const reduced = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);
  const { spring, handlers } = useLean(reduced);
  const x0 = useShift(spring, 3);
  const x1 = useShift(spring, 5);
  const x2 = useShift(spring, 8);
  const x3 = useShift(spring, 11);
  const x4 = useShift(spring, 13);
  const x5 = useShift(spring, 17);
  const x6 = useShift(spring, 24);
  const sunX = useShift(spring, 1.5);

  // Tell the floating nav when it is over the hero.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) window.dispatchEvent(new CustomEvent(e.isIntersecting ? "ringebu:hero-enter" : "ringebu:hero-exit"));
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The year: turns only while the hero is on screen and the tab is visible.
  useEffect(() => {
    const el = ref.current;
    const train = trainRef.current;
    if (!el || !train || reduced) return;

    let season = 0;
    let passes = 0;
    let onScreen = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let trainTimer: ReturnType<typeof setTimeout> | undefined;
    let due = 0;
    let left = FIRST_MS;
    let run: Animation | null = null;

    const running = () => onScreen && document.visibilityState === "visible";

    const runTrain = () => {
      if (!running() || run) return;
      const leftwards = passes % 2 === 1;
      passes += 1;
      train.dataset.dir = leftwards ? "left" : "right";
      // Across the whole strip and its own length, off one end and on past the other
      const far = `translateX(${r2(((W - TRAIN_BOX.x + 40) / TRAIN_BOX.w) * 100)}%)`;
      run = train.animate(
        leftwards ? [{ transform: far }, { transform: "translateX(0)" }] : [{ transform: "translateX(0)" }, { transform: far }],
        { duration: TRAIN_MS, easing: "linear" }
      );
      run.onfinish = () => {
        run = null;
      };
    };

    // The sheets' paper, back to front
    const sheets = [...el.querySelectorAll<SVGGElement>(`.${s.art}`)];
    let turning: ReturnType<typeof setTimeout>[] = [];

    const turn = () => {
      season = (season + 1) % ORDER.length;
      const next = ORDER[season];
      el.dataset.season = next;
      // One sheet at a time, so no one frame works out the style of the whole valley
      turning = sheets.map((sheet, i) =>
        setTimeout(() => {
          sheet.dataset.season = next;
        }, 60 + i * 130)
      );
      // A train every other season, once the new colours have washed through
      if (season % 2 === 1) trainTimer = setTimeout(runTrain, 3400);
      left = SEASON_MS;
      start();
    };
    function start() {
      clearTimeout(timer);
      due = performance.now() + left;
      timer = setTimeout(turn, left);
    }
    const stop = () => {
      clearTimeout(timer);
      left = Math.max(400, due - performance.now());
    };
    const sync = () => {
      el.dataset.on = String(onScreen);
      if (running()) {
        start();
        run?.play();
      } else {
        stop();
        run?.pause();
      }
    };

    // Nothing listens for the colour changes' transition events, but React's
    // root listener would hear every one of them, a few hundred per season.
    // Stopped on their way down, at the window, they cost next to nothing.
    const quiet = (e: Event) => {
      if (e.target instanceof Node && el.contains(e.target)) e.stopImmediatePropagation();
    };
    const TRANSITION_EVENTS = ["transitionrun", "transitionstart", "transitionend", "transitioncancel"];
    for (const type of TRANSITION_EVENTS) window.addEventListener(type, quiet, true);

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    // The first train comes through while the first summer holds
    trainTimer = setTimeout(runTrain, 2600);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      for (const type of TRANSITION_EVENTS) window.removeEventListener(type, quiet, true);
      clearTimeout(timer);
      clearTimeout(trainTimer);
      turning.forEach(clearTimeout);
      run?.cancel();
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      {...handlers}
      data-season="summer"
      data-on="false"
      aria-label="Velkommen"
      className={`${s.root} relative isolate grid min-h-[100svh] grid-rows-[auto_1fr_auto] overflow-hidden lg:block`}
    >
      {/* ── The valley ──
          Under the words on a phone or a tablet, a band as wide as the
          screen; on a desktop it fills the foot of the hero and the words
          sit in its sky. */}
      <div
        aria-hidden="true"
        className="relative row-start-2 min-h-[76vw] md:min-h-[50vw] lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[min(74svh,46vw)] lg:min-h-0"
      >
        <div className={`${s.stage} absolute inset-x-0 bottom-0 top-[max(-150px,-30%)] md:top-[-130px] lg:top-0`}>
          <div className={s.strip}>
            <motion.div className="absolute inset-0" style={{ x: sunX }}>
              {SUN}
            </motion.div>
            {/* The farthest fjell throws no shadow: on the sky it read as an outline */}
            <Ark n={0} x={x0} shadow={false}>{FJELL1}</Ark>
            <Ark n={1} x={x1}>{FJELL2}</Ark>
            <motion.div className="absolute inset-0" style={{ x: x1 }}>
              {CLOUDS}
            </motion.div>
            <Ark n={2} x={x2}>{LIA}</Ark>
            <Ark
              n={3}
              x={x3}
              over={
                <div ref={trainRef} className={s.train} data-dir="right" style={box(TRAIN_BOX.x, TRAIN_BOX.y, TRAIN_BOX.w, TRAIN_BOX.h)}>
                  {TRAIN_ART}
                </div>
              }
            >
              {BANE}
            </Ark>
            <Ark n={4} x={x4} over={<>{BALER}{ANIMALS_DAL}</>}>{DAL}</Ark>
            <Ark n={5} x={x5} over={ANIMALS_NAER}>{NAER}</Ark>
            <Ark n={6} x={x6} over={SNOW_ART}>{FRONT}</Ark>
            <Ark n={7} x={x6} shadow={false}>{LIP}</Ark>
          </div>
        </div>
      </div>

      {/* ── The words, in the sky ── */}
      <div className="pointer-events-none relative z-30 row-start-1 mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-8 pt-[clamp(112px,16svh,170px)] lg:pt-[clamp(118px,17svh,190px)]">
        <div className="max-w-full lg:max-w-[50%]">
          <h1 style={{ fontSize: "clamp(38px, 6vw, 92px)", lineHeight: 0.96, letterSpacing: "-0.05em" }} className="text-[var(--color-ink)]">
            <span className="sr-only">Ringebu Tannlegesenter</span>
            {[
              { text: "Ringebu", weight: 700 },
              { text: "Tannlegesenter", weight: 400 },
            ].map((line, li) => (
              <span key={li} aria-hidden="true" className="block overflow-hidden">
                {/* The padding gives the g of Ringebu room below the line inside the mask */}
                <span className="hero-line inline-block pb-[0.08em]" style={{ animationDelay: `${0.15 + li * 0.11}s`, fontWeight: line.weight }}>
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-lift mt-5 max-w-[34ch] text-[26px] font-light leading-[1.25] tracking-[-0.02em] text-[var(--color-text-secondary)] md:text-[30px]"
            style={{ animationDelay: "0.45s", "--from-y": "10px" } as CSSProperties}
          >
            Hos oss er alle velkomne
          </p>

          <div
            className="hero-lift pointer-events-auto mt-8 flex flex-wrap items-center gap-2.5"
            style={{ animationDelay: "0.65s", "--from-y": "12px" } as CSSProperties}
          >
            {/* The sign hangs from a ring under the button; --heng is how far it
                reaches past the button either side: up to 64px, but never closer
                than 4px to the edge of the screen, which is near on a phone. */}
            <span className="relative inline-flex [--heng:min(64px,calc(max(var(--container-px,24px),(100vw-var(--container-max,1280px))/2+var(--container-px,24px))-4px))]">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(14,42,48,0.5)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(14,42,48,0.55)]"
              >
                Bestill time
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Skilt reduced={reduced} />
            </span>
            <a
              href="tel:61280412"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(14,42,48,0.18)] bg-white/70 px-5 py-3.5 text-[13px] font-medium text-[var(--color-ink)] backdrop-blur-sm transition-colors duration-300 hover:border-[rgba(14,42,48,0.38)] hover:bg-white"
            >
              61 28 04 12
            </a>
          </div>
        </div>
      </div>

      {/* On the page's paper: under the scalloped edge on a tablet, on it on a desktop */}
      <div className="hero-fade relative z-30 row-start-3 hidden bg-[var(--color-paper)] md:block lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-transparent" style={{ animationDelay: "1.5s" }}>
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] flex-col items-start gap-1.5 px-[var(--container-px,24px)] py-3 font-mono lg:h-[38px] lg:py-0 text-[9.5px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <span>Jernbanegata 4, 2630 Ringebu</span>
          <span>Man 08.00–15.30 · Tir 08.30–18.00 · Ons 08.00–15.00 · Tor 09.00–18.00 · Fre 08.00–15.00</span>
        </div>
      </div>
    </section>
  );
}

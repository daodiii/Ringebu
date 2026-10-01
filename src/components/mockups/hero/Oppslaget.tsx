"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { r2 } from "@/components/home/landskap";
import { HVIT_SAU, SVART_SAU, cutDyr, type Dyr } from "./oppslaget/dyr";
import { PaperShadow } from "@/components/behandlinger/scenes/Papir";
import {
  BJORK, BOARD, BOARD_ART, BOARD_OUTLINE, CLOUD_ART, DALEN_ART, EINER, FAR, FAR_ART, FJELL, FJELL_ART, GRAN, LIA,
  LIA_ART, RIVER_ART, SKILT, SKOG, SKOG_ART, type Cut,
} from "./oppslaget/scene";
import s from "./oppslaget/oppslaget.module.css";

/**
 * Oppslaget. The hero is a pop-up book lying open on the page, seen from
 * above and in front. As the page loads the spread opens, and Gudbrandsdalen
 * folds up out of it piece by piece on paper hinges: the fjell at the back,
 * the spruce ridge and the birch slope, a birch by the river, a moose, the
 * sheep on their tabs, and a post with the clinic's sign by the spruces.
 * Lågen is cut out and glued flat on the valley floor. The name is printed
 * on the left-hand page.
 *
 * The pointer leans the book a little; an animal hops under it and the sign
 * swings. A tap on the book folds the valley down and stands it up again.
 * Scroll on and every piece folds back down flat (a scroll-driven CSS
 * animation, so the compositor does it); come back up and they stand again.
 * On a phone the words sit over the book, and the one page under them opens
 * and stands up the same way.
 *
 * Everything that moves on its own is a CSS animation of transform or
 * opacity on a layer of its own (oppslaget.module.css), so the entrance
 * plays from the first paint; only the lean (framer) and the tap (Web
 * Animations) are started from here. The drawings never change, so they are
 * made once, at module scope (oppslaget/scene.tsx).
 */

const HEAD = [
  { text: "Ringebu", weight: 700 },
  { text: "Tannlegesenter", weight: 400 },
] as const;

const PAGE_W = 600;
const BOOK_W = 1200;
const DEPTH = 540;

type Box = { x: number; y: number; w: number; h: number };

const pct = (v: number) => `${Math.round(v * 1000000) / 10000}%`;
const vars = (v: Record<string, string>) => v as CSSProperties;

/** A piece's box in the half (or book) it stands in: its foot along its hinge. */
function place(b: Box, unitW: number): CSSProperties {
  return {
    left: pct(b.x / unitW),
    width: pct(b.w / unitW),
    bottom: pct((DEPTH - b.y) / DEPTH),
    aspectRatio: `${b.w} / ${b.h}`,
  };
}

/** A shape in one flat colour, for the shadow a piece throws or the plain back of its paper. */
function Flat({ view, kind, children }: { view: string; kind: "shadow" | "back"; children: React.ReactNode }) {
  return (
    <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
      <g className={kind === "back" ? "back-paper" : undefined}>
        <PaperShadow dy={0}>{children}</PaperShadow>
      </g>
    </svg>
  );
}

/**
 * A piece of the pop-up. Folded, it lies face down in front of its hinge;
 * at `d` seconds it flips up over the hinge to stand at `a` degrees: 74 for
 * the ridges, 78 for single pieces (each has its own keyframes). `shape`,
 * for a piece small enough to lie on the page, is its outline: the plain
 * back of its paper while it lies there, and the shadow it throws.
 */
function Stand({
  box, unit, d, a = -74, shape, view, className = "", children,
}: {
  box: Box;
  unit: number;
  d: number;
  a?: -74 | -78;
  shape?: React.ReactNode;
  view?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const style = { ...place(box, unit), ...vars({ "--d": `${d}s` }) };
  const v = view ?? `0 0 ${box.w} ${box.h}`;
  return (
    <>
      {shape && (
        <div className={s.shade} style={style}>
          <div className={s.shadeFold} data-d={d} data-a={a}>
            <Flat view={v} kind="shadow">
              {shape}
            </Flat>
          </div>
        </div>
      )}
      <div className={`${s.piece} ${a === -74 ? s.a74 : s.a78} ${className}`} style={style}>
        <div className={s.fold} data-d={d} data-a={a}>
          <div className={s.art}>{children}</div>
          {shape && (
            <div className={s.back}>
              <Flat view={v} kind="back">
                {shape}
              </Flat>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/** A single cut piece: its drawing, its shadow and its back from the same shape. */
function Single({ cut, d }: { cut: Cut; d: number }) {
  return (
    <Stand box={cut.box} unit={PAGE_W} d={d} a={-78} shape={cut.shape}>
      <svg viewBox={`0 0 ${cut.box.w} ${cut.box.h}`} className="absolute inset-0 h-full w-full overflow-visible">
        {cut.shape}
      </svg>
    </Stand>
  );
}

/* ── The animals, on tabs ── */

type Plass = { dyr: Dyr; x: number; y: number; k: number; face: 1 | -1; d: number; time: number; delay: number };

const DYR: Plass[] = [
  { dyr: { kind: "elg", bull: true }, x: 232, y: 368, k: 1.1, face: -1, d: 1.45, time: 12, delay: 3 },
  { dyr: HVIT_SAU, x: 336, y: 438, k: 1.15, face: -1, d: 1.62, time: 8.5, delay: 1.2 },
  { dyr: SVART_SAU, x: 436, y: 470, k: 1.15, face: -1, d: 1.74, time: 9.5, delay: 4.4 },
  { dyr: { ...HVIT_SAU, bell: true }, x: 300, y: 498, k: 0.8, face: 1, d: 1.86, time: 7.5, delay: 2.6 },
];

const CUTS = DYR.map((p, i) => {
  const cut = cutDyr(p.dyr, p.k, p.face, i);
  return { ...cut, box: { x: r2(p.x - cut.foot), y: p.y, w: cut.w, h: cut.h } };
});

/** Which way a head turns: sheep graze, a moose only lifts its head a little. */
const turn = (p: Plass) => (p.dyr.kind === "elg" ? s.nodLeft : p.face < 0 ? s.grazeLeft : "");

function Animal({ p, i }: { p: Plass; i: number }) {
  const cut = CUTS[i];
  return (
    <Stand box={cut.box} unit={PAGE_W} d={p.d} a={-78} className={s.dyr} shape={cut.shape} view={cut.view}>
      <div className={s.hop}>
        {cut.body}
        <div
          className={`${s.head} ${s.graze} ${turn(p)}`}
          style={{ transformOrigin: cut.neck, ...vars({ "--time": `${p.time}s`, "--delay": `${p.delay}s` }) }}
        >
            {cut.head}
          </div>
        </div>
    </Stand>
  );
}

/* ── The scene, made once ── */

const CLOUDS = [
  { x: 210, y: 22, w: 118, back: false, time: "32s" },
  { x: 930, y: 8, w: 96, back: true, time: "27s" },
  { x: 560, y: 54, w: 70, back: false, time: "36s" },
];

/** The fjell, standing across both pages at the back, with the clouds over them. */
const BACK = (
  <>
    <Stand box={FAR} unit={BOOK_W} d={0.7}>
      {FAR_ART}
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className={`${s.drift} ${c.back ? s.driftBack : ""}`}
          style={{ left: pct(c.x / FAR.w), top: pct(c.y / FAR.h), width: pct(c.w / FAR.w), ...vars({ "--time": c.time }) }}
        >
          {CLOUD_ART}
        </div>
      ))}
    </Stand>
    <Stand box={FJELL} unit={BOOK_W} d={0.84}>
      {FJELL_ART}
    </Stand>
  </>
);

/** A strip of paper a piece is glued down by, in front of its hinge: page units. */
function Tab({ x, w, y, grass = false }: { x: number; w: number; y: number; grass?: boolean }) {
  return (
    <div
      className={`${s.tab} ${grass ? s.grass : ""}`}
      style={{ left: pct(x / PAGE_W), width: pct(w / PAGE_W), top: pct(y / DEPTH), height: pct(7 / DEPTH) }}
    />
  );
}

/** The animals' tabs, on the grass. (The ridges' tabs are hidden under the meadow's paper.) */
const RIGHT_TABS = DYR.map((p, i) => ({ x: p.x - CUTS[i].w * 0.22, w: CUTS[i].w * 0.44, y: p.y, grass: true }));

const SIGN_SHAPE = (
  <>
    {SKILT.shape}
    {BOARD_OUTLINE}
  </>
);

/** Everything on the right-hand page. */
const RIGHT = (
  <>
    <div className={s.flat}>
      {DALEN_ART}
      {RIGHT_TABS.map((t, i) => (
        <Tab key={i} {...t} />
      ))}
      <div className={s.river}>{RIVER_ART}</div>
    </div>
    <Stand box={SKOG} unit={PAGE_W} d={0.98}>
      {SKOG_ART}
    </Stand>
    <Stand box={LIA} unit={PAGE_W} d={1.12}>
      {LIA_ART}
    </Stand>
    <Single cut={BJORK} d={1.28} />
    <Single cut={GRAN} d={1.38} />
    {DYR.map((p, i) => (
      <Animal key={i} p={p} i={i} />
    ))}
    <Stand box={SKILT.box} unit={PAGE_W} d={1.98} a={-78} className={s.sign} shape={SIGN_SHAPE}>
      <svg viewBox={`0 0 ${SKILT.box.w} ${SKILT.box.h}`} className="absolute inset-0 h-full w-full">
        <PaperShadow>{SKILT.shape}</PaperShadow>
        {SKILT.shape}
      </svg>
      <div
        style={{
          position: "absolute",
          left: pct(BOARD.x / SKILT.box.w),
          top: pct(BOARD.y / SKILT.box.h),
          width: pct(BOARD.w / SKILT.box.w),
          height: pct(BOARD.h / SKILT.box.h),
          ...vars({ "--hook": "50% 0%" }),
        }}
      >
        <div className={s.board1}>
          <div className={s.board2}>
            <div className={s.board3}>{BOARD_ART}</div>
          </div>
        </div>
      </div>
    </Stand>
    {EINER.map((e, i) => (
      <Single key={i} cut={e} d={2.06 + i * 0.08} />
    ))}
  </>
);

/* ── Again: a tap on the book folds the valley down and stands it up again ── */

const SPRING =
  "linear(0, 0.0304, 0.1082, 0.2155, 0.3378, 0.464, 0.5856, 0.6969, 0.7944, 0.8763, 0.9423, 0.9931, 1.0301, 1.0549, 1.0695, 1.0761, 1.0764, 1.0722, 1.0651, 1.0562, 1.0465, 1.0369, 1.0279, 1.0198, 1.0128, 1.0071, 1.0025, 0.9991, 0.9967, 0.9952, 0.9944, 0.9941, 0.9942, 0.9947, 0.9953, 0.996, 0.9968, 0.9975, 0.9981, 0.9987, 1)";
const DOWN_MS = 380;
const HOLD_MS = 180;
const RISE_MS = 1150;
/** The fold-down runs front to back, the rise back to front, as at first. */
const DOWN_STEP = 240;
const RISE_STEP = 520;

/**
 * Every piece folds down flat, front ones first, and flips up again in the
 * order it first stood. Added on top of the scroll's fold (composite: add),
 * so it starts from wherever the page is. One window for all of them, each
 * holding still until its moment, as Enga's meadow does: the compositor runs
 * it rather than the main thread.
 */
function playAgain(root: HTMLElement) {
  const els = Array.from(root.querySelectorAll<HTMLElement>(`.${s.fold}, .${s.shadeFold}`));
  if (!els.length) return 0;
  const ds = els.map((el) => Number(el.dataset.d));
  const first = Math.min(...ds);
  const last = Math.max(...ds);
  const downAt = (d: number) => (last - d) * DOWN_STEP;
  const allDown = (last - first) * DOWN_STEP + DOWN_MS;
  const upAt = (d: number) => allDown + HOLD_MS + (d - first) * RISE_STEP;
  const total = upAt(last) + RISE_MS;
  const at = (ms: number) => Math.min(1, Math.max(0, ms / total));
  const spring = CSS.supports("animation-timing-function", "linear(0, 1)") ? SPRING : "cubic-bezier(0.34, 1.45, 0.64, 1)";
  for (const el of els) {
    const d = Number(el.dataset.d);
    const a = Number(el.dataset.a);
    const shade = el.classList.contains(s.shadeFold);
    // A piece lies face down in front of its hinge; its shadow lies under it.
    const up = shade ? "scaleY(1) skewX(0deg) scaleY(1)" : "rotateX(0deg)";
    const flat = shade ? "scaleY(3.3333) skewX(34deg) scaleY(-1)" : `rotateX(${-180 - a}deg)`;
    el.animate(
      [
        { offset: 0, transform: up },
        { offset: at(downAt(d)), transform: up, easing: "cubic-bezier(0.55, 0, 0.8, 0.3)" },
        { offset: at(downAt(d) + DOWN_MS), transform: flat },
        { offset: at(upAt(d)), transform: flat, easing: spring },
        { offset: at(upAt(d) + RISE_MS), transform: up },
        { offset: 1, transform: up },
      ],
      { duration: total, composite: "add" }
    );
  }
  return total;
}

/* ── The words ── */

function Buttons() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Link
        href="/kontakt"
        className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(14,42,48,0.5)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(14,42,48,0.55)]"
      >
        Bestill time
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
      <a
        href="tel:61280412"
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(14,42,48,0.18)] bg-white/70 px-5 py-3.5 text-[13px] font-medium text-[var(--color-ink)] transition-colors duration-300 hover:border-[rgba(14,42,48,0.38)] hover:bg-white"
      >
        61 28 04 12
      </a>
    </div>
  );
}

function Title({ size }: { size: string }) {
  return (
    <h1 className="text-[var(--color-ink)]" style={{ fontSize: size, lineHeight: 0.98, letterSpacing: "-0.05em" }}>
      {HEAD.map((line, i) => (
        <span key={i} className="block pb-[0.04em]" style={{ fontWeight: line.weight }}>
          {line.text}
          {i === 0 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

/**
 * Printed on the left-hand page, from lg. Sized to the page, so it scales
 * with the book. Seen from in front of the spine, the page leans the type
 * over like italics; it is printed leaning the other way by as much, so it
 * reads upright.
 */
function PagePrint() {
  return (
    <div className="absolute hidden flex-col lg:flex" style={{ left: "9.5%", right: "6%", top: "40%", bottom: "4%", containerType: "inline-size", transform: "skewX(7deg)" }}>
      <Title size="14.4cqw" />
      <p className="mt-[3.5cqw] font-light leading-[1.25] tracking-[-0.02em] text-[var(--color-text-secondary)]" style={{ fontSize: "5.4cqw" }}>
        Hos oss er alle velkomne
      </p>
      <div className="mt-[6cqw]">
        <Buttons />
      </div>
    </div>
  );
}

export function Oppslaget() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion() ?? false;
  const [on, setOn] = useState(false);
  const [away, setAway] = useState(false);

  // Tell the floating nav when it is over the hero, and run the small loops
  // (clouds, grazing, the sign) only while the hero is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setOn(entry.isIntersecting);
          window.dispatchEvent(new CustomEvent(entry.isIntersecting ? "ringebu:hero-enter" : "ringebu:hero-exit"));
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    // Wholly off screen, the book is not drawn at all.
    const gone = new IntersectionObserver(([entry]) => setAway(!entry.isIntersecting));
    gone.observe(el);
    return () => {
      observer.disconnect();
      gone.disconnect();
    };
  }, []);

  // A tap on the book plays it again, once the first time has finished.
  const busyUntil = useRef(3200);
  const again = (e: React.MouseEvent) => {
    if (reduced || !ref.current || (e.target as Element).closest("a, button")) return;
    const now = performance.now();
    if (now < busyUntil.current) return;
    busyUntil.current = now + playAgain(ref.current) + 100;
  };

  // The pointer leans the book a little, towards the hand.
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const rotateY = useSpring(lx, { stiffness: 45, damping: 16 });
  const rotateX = useSpring(ly, { stiffness: 45, damping: 16 });

  return (
    <section
      ref={ref}
      aria-label="Velkommen"
      className={`${s.section} ${on && !reduced ? s.on : ""} relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-paper)] md:pb-[44px] lg:block lg:pb-0`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        lx.set(((e.clientX - r.left) / r.width - 0.5) * 7);
        ly.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
      }}
      onPointerLeave={() => {
        lx.set(0);
        ly.set(0);
      }}
    >
      {/* On a phone and a tablet the words come first, over the book */}
      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pt-[clamp(96px,15svh,150px)] lg:hidden">
        <Title size="clamp(42px, 11.2vw, 72px)" />
        <p className="mt-4 text-[22px] font-light leading-[1.25] tracking-[-0.02em] text-[var(--color-text-secondary)] md:text-[28px]">
          Hos oss er alle velkomne
        </p>
        <div className="mt-6">
          <Buttons />
        </div>
      </div>

      <div className={`${s.stage} ${away ? s.away : ""}`} onClick={again}>
        <motion.div className={s.tilt} style={{ rotateX, rotateY }}>
          <div className={s.book}>
            <div aria-hidden="true" className={s.table} />
            <div className={`${s.half} ${s.left}`}>
              <div aria-hidden="true" className={s.board} />
              <div aria-hidden="true" className={s.edge} />
              <div className={s.block}>
                <Tab x={0} w={PAGE_W} y={FJELL.y} />
                <PagePrint />
              </div>
            </div>
            <div aria-hidden="true" className={`${s.half} ${s.right}`}>
              <div className={s.board} />
              <div className={s.edge} />
              <div className={s.block} />
              {RIGHT}
            </div>
            <div aria-hidden="true" className={s.layer}>
              {BACK}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 hidden border-t border-[rgba(14,42,48,0.08)] bg-[var(--color-paper)]/80 md:block">
        {/* Five days of hours need ~900px beside the address: one line from lg, two below */}
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] flex-col items-start gap-1.5 px-[var(--container-px,24px)] py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <span>Jernbanegata 4, 2630 Ringebu</span>
          <span>Man 08.00–15.30 · Tir 08.30–18.00 · Ons 08.00–15.00 · Tor 09.00–18.00 · Fre 08.00–15.00</span>
        </div>
      </div>
    </section>
  );
}

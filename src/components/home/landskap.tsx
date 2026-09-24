"use client";

import { memo, useRef, useSyncExternalStore } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { NoShadow, PaperShadow } from "@/components/behandlinger/scenes/Papir";
import s from "./landskap.module.css";

/**
 * Paper landscape for the front page's closing section: a strip of paper
 * 2400 wide, centred on the screen like the fjell under Vardene, cut into
 * sheets that stand up one after another when the section comes into view.
 * Every sheet keeps the strip's own units in its viewBox, so they are all
 * drawn in the same coordinates. The ground runs on past both ends of the
 * strip, so a very wide screen never sees where the paper stops.
 */

export const STRIP_W = 2400;
/** How far the ground and the lip run on past each end of the strip. */
const EDGE = 400;

/* ── Numbers ── */

/** Positions from sin and cos differ between server and browser in the last decimals; rounded, they hydrate. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** A seeded random generator, so every leaf and flower is cut the same way on every render. */
export function rng(seed: number) {
  let v = seed % 2147483647;
  if (v <= 0) v += 2147483646;
  return () => {
    v = (v * 16807) % 2147483647;
    return (v - 1) / 2147483646;
  };
}

/** A round shape with a scalloped edge, the way wool, petals and clouds are cut from paper. */
export function bumpy(cx: number, cy: number, rx: number, ry: number, n: number, seed: number, bulge = 0.34) {
  const rand = rng(seed);
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = ((i + (rand() - 0.5) * 0.35) / n) * Math.PI * 2;
    const j = 0.9 + rand() * 0.14;
    pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]);
  }
  let d = `M${r2(pts[0][0])},${r2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    const k = (1 + bulge * (0.8 + rand() * 0.4)) / Math.cos(Math.PI / n);
    d += ` Q${r2(cx + ((x1 + x2) / 2 - cx) * k)},${r2(cy + ((y1 + y2) / 2 - cy) * k)} ${r2(x2)},${r2(y2)}`;
  }
  return `${d} Z`;
}

/** A crown cut like a drop: round below, rising to a soft point, with a scalloped edge. `cy` is the middle of the round part. */
function drop(cx: number, cy: number, rx: number, ry: number, n: number, seed: number, bulge = 0.3) {
  const rand = rng(seed);
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = ((i + (rand() - 0.5) * 0.3) / n) * Math.PI * 2 - Math.PI / 2;
    const sn = Math.sin(a);
    const up = sn < 0 ? -sn : 0;
    const j = 0.93 + rand() * 0.12;
    pts.push([cx + Math.cos(a) * rx * (1 - 0.28 * up) * j, cy + sn * ry * (1 + 0.5 * up * up * up) * j]);
  }
  let d = `M${r2(pts[0][0])},${r2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    const k = (1 + bulge * (0.8 + rand() * 0.4)) / Math.cos(Math.PI / n);
    d += ` Q${r2(cx + ((x1 + x2) / 2 - cx) * k)},${r2(cy + ((y1 + y2) / 2 - cy) * k)} ${r2(x2)},${r2(y2)}`;
  }
  return `${d} Z`;
}

/* ── Ridges ── */

export type Pts = readonly (readonly [number, number])[];

/** A ridge through these points as cubic curves ([start, c1, c2, end, c1, c2, end, …]), closed along the foot. */
export function ridge(pts: Pts, bottom: number) {
  const [x0, y0] = pts[0];
  const [xn, yn] = pts[pts.length - 1];
  let d = `M${x0 - EDGE},${y0} L${x0},${y0}`;
  for (let i = 1; i < pts.length; i += 3) d += ` C${pts[i].join(",")} ${pts[i + 1].join(",")} ${pts[i + 2].join(",")}`;
  return `${d} L${xn + EDGE},${yn} L${xn + EDGE},${bottom} L${x0 - EDGE},${bottom} Z`;
}

/** The height of a ridge at x, from the same points (plain arithmetic, so server and browser agree). */
export function ridgeY(pts: Pts, x: number) {
  for (let i = 0; i + 3 < pts.length; i += 3) {
    const [p0, p1, p2, p3] = [pts[i], pts[i + 1], pts[i + 2], pts[i + 3]];
    if (x < p0[0] || x > p3[0]) continue;
    let lo = 0;
    let hi = 1;
    for (let k = 0; k < 24; k++) {
      const t = (lo + hi) / 2;
      const u = 1 - t;
      if (u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0] < x) lo = t;
      else hi = t;
    }
    const t = (lo + hi) / 2;
    const u = 1 - t;
    return r2(u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]);
  }
  return pts[pts.length - 1][1];
}

/** Snow lying on a ridge between x0 and x1: the ridge itself on top, a torn edge below where the snow gives out. */
export function snowcap(pts: Pts, x0: number, x1: number, depth: number, seed: number) {
  const rand = rng(seed);
  const steps = Math.max(6, Math.round((x1 - x0) / 14));
  const top: string[] = [];
  const under: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const y = ridgeY(pts, x);
    top.push(`${r2(x)},${r2(y - 0.5)}`);
    const mid = 1 - Math.abs((i / steps) * 2 - 1);
    const tooth = i % 2 ? 0.45 + rand() * 0.3 : 1;
    under.unshift(`${r2(x)},${r2(y + depth * mid * tooth)}`);
  }
  return `M${top.join(" L")} L${under.join(" L")} Z`;
}

/** A scalloped paper edge along the foot of the strip: the footer's top edge, rising into the picture. */
export function lip(y: number, r: number, bottom: number) {
  let d = `M${-EDGE},${bottom} L${-EDGE},${y}`;
  for (let x = -EDGE; x < STRIP_W + EDGE; x += r * 2) d += ` Q${x + r},${r2(y - r * 0.9)} ${x + r * 2},${y}`;
  return `${d} L${STRIP_W + EDGE},${bottom} Z`;
}

/* ── Motion ── */

const noSubscribe = () => () => {};

/**
 * `up` stands the sheets up: once, when the section is well into view, or
 * straight after hydration for reduced motion. It is false on the server and
 * in the browser's first render alike (it is written to the page as
 * data-up), because the server cannot know the motion setting. `on` runs the
 * small loops only while the section is on screen.
 *
 * Standing up is a CSS transition of transform and opacity, so the
 * compositor plays it without the main thread; driven from script, twenty
 * springs at once made long tasks on a phone as the section arrived.
 */
export function usePopUp() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion() ?? false;
  const seen = useInView(ref, { once: true, margin: "0px 0px -22% 0px" });
  const inView = useInView(ref);
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  return { ref, reduced, up: hydrated && (seen || reduced), on: inView && !reduced };
}

/** The pointer leans the sheets against each other on desktop, nearer ones further (as under Vardene). */
export function useLean(reduced: boolean) {
  const lean = useMotionValue(0);
  const spring = useSpring(lean, { stiffness: 50, damping: 16 });
  const handlers = {
    onPointerMove: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && !reduced) lean.set((e.clientX / window.innerWidth) * 2 - 1);
    },
    onPointerLeave: () => lean.set(0),
  };
  return { spring, handlers };
}

export function useShift(spring: MotionValue<number>, k: number) {
  return useTransform(spring, (v) => v * -k);
}

/**
 * A sheet as wide as the strip, from `top` down to its foot, standing up
 * from its foot in turn `n`. The outer layer carries the pointer's lean and
 * the stage's perspective (seen from the top of the 580-high stage); the
 * inner one stands up. `over` holds layers of its own that stand up with it.
 * Pass drawings that never change as `children`, made once, so that when
 * `up` turns React has nothing to draw again.
 */
export function Strip({
  n, up, x, top, h, shadow = false, children, over,
}: {
  n: number;
  up: boolean;
  x?: MotionValue<number>;
  top: number;
  h: number;
  shadow?: boolean;
  children: React.ReactNode;
  over?: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 ml-[-1200px] w-[2400px]"
      style={{ height: h - top, x, perspective: 1600, perspectiveOrigin: `50% ${-top}px` }}
    >
      <div className={s.stand} data-up={up} style={{ ["--delay" as string]: `${r2(0.05 + n * 0.12)}s` }}>
        <svg viewBox={`0 ${top} ${STRIP_W} ${h - top}`} className="absolute inset-0 h-full w-full overflow-visible">
          {shadow && <PaperShadow>{children}</PaperShadow>}
          {children}
        </svg>
        {over}
      </div>
    </motion.div>
  );
}

/* ── Nature ── */

/**
 * A summer birch: a slender white trunk with dark marks, and a crown cut as
 * two drops of leaves, the darker behind and the lighter in front.
 */
export function Bjork({ x, y, h, seed, lean = 0 }: { x: number; y: number; h: number; seed: number; lean?: number }) {
  const rand = rng(seed);
  const tip = { x: x + lean * h * 0.08, y: y - h };
  const w = Math.max(3.4, h * 0.026);
  const trunk = `M${r2(x - w)},${y} C${r2(x - w * 0.9)},${r2(y - h * 0.4)} ${r2(tip.x - w * 0.5)},${r2(y - h * 0.75)} ${r2(tip.x - 0.8)},${r2(tip.y + h * 0.1)} L${r2(tip.x + 0.8)},${r2(tip.y + h * 0.1)} C${r2(tip.x + w * 0.5)},${r2(y - h * 0.75)} ${r2(x + w * 0.9)},${r2(y - h * 0.4)} ${r2(x + w)},${y} Z`;
  const count = Math.round(h / 24);
  const marks = Array.from({ length: count }, (_, i) => {
    const t = 0.08 + (i / count) * 0.8;
    const my = y - h * t;
    const mx = x + (tip.x - x) * t;
    const mw = w * (0.7 + rand() * 0.9);
    const side = rand() > 0.5 ? 1 : -1;
    return `M${r2(mx + side * w * 0.95 - mw * (side > 0 ? 1 : 0))},${r2(my)} l${r2(mw)},${r2(-0.8 - rand() * 1.2)} l0,${r2(2 + rand())} l${r2(-mw)},${r2(0.5)} Z`;
  });
  const branches = Array.from({ length: 4 }, (_, i) => {
    const t = 0.46 + i * 0.08;
    const by = y - h * t;
    const bx = x + (tip.x - x) * t;
    const side = i % 2 ? 1 : -1;
    const len = h * 0.1 * (0.85 + rand() * 0.3);
    return `M${r2(bx)},${r2(by)} Q${r2(bx + side * len * 0.55)},${r2(by - len * 0.5)} ${r2(bx + side * len)},${r2(by - len * 0.12)}`;
  });
  return (
    <g>
      {/* The trunk goes in first, so the leaves hide it where they hang over it */}
      <path d={trunk} fill="#FFFFFF" />
      <NoShadow>
        {marks.map((d, i) => <path key={i} d={d} fill="#2B2F2A" opacity={0.85} />)}
      </NoShadow>
      <path d={drop(tip.x, y - h * 0.63, h * 0.19, h * 0.25, 12, seed * 7, 0.34)} fill="#8DA86A" />
      <NoShadow>
        {branches.map((d, i) => <path key={i} d={d} fill="none" stroke="#8A8070" strokeWidth={Math.max(1, w * 0.3)} strokeLinecap="round" />)}
      </NoShadow>
      <path d={drop(tip.x - h * 0.025, y - h * 0.55, h * 0.145, h * 0.18, 11, seed * 7 + 1, 0.34)} fill="#B3C98E" />
      <path d={drop(tip.x + h * 0.045, y - h * 0.7, h * 0.07, h * 0.09, 8, seed * 7 + 2, 0.34)} fill="#D2DFB4" />
    </g>
  );
}

/** A spruce: tiers of drooping paper, dark green. */
export function Gran({ x, y, h, w, fill, dark, tiers = 5 }: { x: number; y: number; h: number; w: number; fill: string; dark: string; tiers?: number }) {
  const parts = Array.from({ length: tiers }, (_, i) => {
    const t = i / tiers;
    const by = y - h * 0.07 - t * h * 0.74;
    const tw = w * (1 - t * 0.74);
    const th = h * (tiers < 5 ? 0.46 : 0.34);
    return {
      d: `M${r2(x - tw)},${r2(by)} Q${r2(x - tw * 0.42)},${r2(by - th * 0.4)} ${r2(x)},${r2(by - th)} Q${r2(x + tw * 0.42)},${r2(by - th * 0.4)} ${r2(x + tw)},${r2(by)} Q${r2(x)},${r2(by - th * 0.16)} ${r2(x - tw)},${r2(by)} Z`,
      fill: i % 2 ? fill : dark,
    };
  });
  return (
    <g>
      <rect x={r2(x - w * 0.09)} y={r2(y - h * 0.12)} width={r2(w * 0.18)} height={r2(h * 0.12)} fill="#6B5A40" />
      {parts.map((p, i) => <path key={i} d={p.d} fill={p.fill} />)}
    </g>
  );
}

/** A daisy: white petals round a yellow middle. */
export function Blomst({ x, y, r = 5, seed }: { x: number; y: number; r?: number; seed: number }) {
  return (
    <g>
      <path d={bumpy(x, y, r, r, 6, seed, 0.9)} fill="#FFFFFF" />
      <circle cx={x} cy={y} r={r2(r * 0.36)} fill="#E9C46A" />
    </g>
  );
}

// The clouds over Vardene, cut the same way.
const CLOUD = "M34,168 Q34,148 54,150 Q60,132 80,138 Q92,126 106,140 Q124,140 122,158 Q126,172 110,172 L46,172 Q34,172 34,168 Z";

/** A paper cloud drifting out and back on a layer of its own. `x` and `y` are in strip units. */
export const Cloud = memo(function Cloud({ x, y, w, drift, time, on }: { x: number; y: number; w: number; drift: number; time: number; on: boolean }) {
  return (
    <div
      className={`${s.layer} ${s.drift} absolute`}
      data-on={on}
      style={{ left: `calc(50% - 1200px + ${x}px)`, top: y, width: w, ["--d" as string]: `${drift}px`, ["--t" as string]: `${time}s` }}
    >
      <svg viewBox="30 124 100 54" className="block h-auto w-full overflow-visible">
        <PaperShadow>
          <path d={CLOUD} />
        </PaperShadow>
        <path d={CLOUD} fill="#FFFFFF" />
      </svg>
    </div>
  );
});

// The tooth from the logo, outlined, with the little heart where the roots meet.
const TOOTH = "M-9,-11 C-14,-11 -15,-4 -13,2 C-11,8 -9,12 -6,12 C-3,12 -3,5 0,5 C3,5 3,12 6,12 C9,12 11,8 13,2 C15,-4 14,-11 9,-11 C5,-11 4,-9 0,-9 C-4,-9 -5,-11 -9,-11 Z";
const HEART = "M0,4.5 C-2.2,2.6 -3.4,1.2 -3.4,-0.3 C-3.4,-1.6 -2.4,-2.4 -1.4,-2.4 C-0.7,-2.4 -0.2,-2 0,-1.5 C0.2,-2 0.7,-2.4 1.4,-2.4 C2.4,-2.4 3.4,-1.6 3.4,-0.3 C3.4,1.2 2.2,2.6 0,4.5 Z";

/** A small sign on a wooden post with the tooth from the logo, standing at (x, y); `scale` 1 is a post 64 tall. */
export function Tannskilt({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-2.5} y={-64} width={5} height={64} fill="#8A6A4C" />
      <rect x={-17} y={-70} width={34} height={26} rx={2} fill="#1E3438" />
      <rect x={-13} y={-66} width={26} height={18} rx={1} fill="#E9EFEE" />
      <g transform="translate(0 -57) scale(0.5)">
        <path d={TOOTH} fill="none" stroke="#1E3438" strokeWidth={3} />
        <path d={HEART} fill="#1E3438" />
      </g>
    </g>
  );
}

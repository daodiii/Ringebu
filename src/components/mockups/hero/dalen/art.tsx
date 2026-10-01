import type { CSSProperties, ReactNode } from "react";
import { NoShadow } from "@/components/behandlinger/scenes/Papir";
import { Tannskilt, bumpy, lip, r2, rng } from "@/components/home/landskap";

/**
 * Gudbrandsdalen at Ringebu, seen across the valley from the hillside on this
 * side: the bank you stand on, the meadow and the road with the clinic's
 * sign, the fields and the river Lågen on the valley floor, the Dovrebanen
 * line at the foot of the far side, the far side's farms and forest, and the
 * fjell above them, rising to the right.
 *
 * Everything is drawn once, here, on a strip 2400 × 1000. Every colour that
 * changes with the seasons is a custom property (the season blocks in
 * dalen.module.css), and every piece carries a delay, --td, by how far it
 * lies from the sun, so a new season washes outwards across the paper from
 * the sun rather than the whole picture flipping at once.
 *
 * The paper of one colour in one stretch of the valley is one path: all the
 * spruce in a stretch of forest, all the flowers in a stretch of the bank.
 * Drawn a tree at a time the valley was a thousand elements, and when a season
 * turned, a thousand colour transitions (and React's root listener heard every
 * one of their events): at four times slowed, one frame of the wash took
 * 150 ms of style work. Cut in stretches of 240 the wash still sweeps across,
 * in steps too small to see.
 */

export const W = 2400;
export const H = 1000;
export const SUN_X = 1470;

/** The strip runs on past both ends, so leaning the sheets never shows where the paper stops. */
const X0 = -160;
const X1 = W + 160;
const STRETCH = 240;

const g = (x: number, c: number, w: number) => Math.exp(-(((x - c) / w) ** 2));

/**
 * When paper at x takes on the new season, after its sheet has turned (the
 * sheets turn one after another, back to front, in Dalen.tsx): outwards from
 * the sun, and a touch later the nearer the sheet.
 */
export const td = (x: number, n: number) => `${r2(n * 0.04 + (Math.abs(x - SUN_X) / 1700) * 1.9)}s`;

/** A paper colour from the season's palette, with its wash delay. */
export function c(name: string, delay?: string): CSSProperties {
  return (delay ? { fill: `var(--${name})`, ["--td" as string]: delay } : { fill: `var(--${name})` }) as CSSProperties;
}

type Fn = (x: number) => number;

function pts(fn: Fn, step = 10) {
  const out: string[] = [];
  for (let x = X0; x <= X1; x += step) out.push(`${x},${r2(fn(x))}`);
  return out;
}
/** Land under a ridge line, down to the foot of the strip. */
const land = (fn: Fn, bottom = H) => `M${X0},${bottom} L${pts(fn).join(" L")} L${X1},${bottom} Z`;
/** The ridge line alone, for the light along a sheet's top edge. */
const edge = (fn: Fn) => `M${pts(fn).join(" L")}`;
/** The paper between two lines, from x0 to x1. */
function between(top: Fn, bottom: Fn, x0: number, x1: number, step = 10) {
  const a: string[] = [];
  const b: string[] = [];
  for (let x = x0; x <= x1 + 0.01; x += step) {
    a.push(`${r2(x)},${r2(top(x))}`);
    b.unshift(`${r2(x)},${r2(bottom(x))}`);
  }
  return `M${a.join(" L")} L${b.join(" L")} Z`;
}
const circle = (cx: number, cy: number, r: number) =>
  `M${r2(cx - r)},${r2(cy)} a${r2(r)},${r2(r)} 0 1,0 ${r2(r * 2)},0 a${r2(r)},${r2(r)} 0 1,0 ${r2(-r * 2)},0 Z`;
const rect = (x: number, y: number, w: number, h: number) => `M${r2(x)},${r2(y)} h${r2(w)} v${r2(h)} h${r2(-w)} Z`;

/* ── Paper merged by colour and stretch ── */

type Ink = { v?: string; fill?: string; stroke?: string; vs?: string; sw?: number; opacity?: number; shadowless?: boolean };
type Bag = Map<string, { ink: Ink; items: { x: number; d: string }[] }>;

/** The order a layer is first put in the bag is the order it is drawn in. */
function put(bag: Bag, layer: string, ink: Ink, x: number, d: string) {
  let l = bag.get(layer);
  if (!l) {
    l = { ink, items: [] };
    bag.set(layer, l);
  }
  l.items.push({ x, d });
}

/** A bag drawn: one path per layer and stretch of the valley, each washing at its own moment. */
function drawn(bag: Bag, n: number): ReactNode {
  const out: ReactNode[] = [];
  for (const [name, { ink, items }] of bag) {
    const stretches = new Map<number, string[]>();
    for (const it of items) {
      const k = Math.floor((it.x - X0) / STRETCH);
      const list = stretches.get(k) ?? [];
      list.push(it.d);
      stretches.set(k, list);
    }
    for (const [k, ds] of stretches) {
      const delay = td(X0 + (k + 0.5) * STRETCH, n);
      const style = ink.v
        ? c(ink.v, delay)
        : ink.vs
          ? ({ stroke: `var(--${ink.vs})`, ["--td" as string]: delay } as CSSProperties)
          : undefined;
      const el = (
        <path
          key={`${name}-${k}`}
          d={ds.join(" ")}
          style={style}
          fill={ink.fill ?? (ink.stroke || ink.vs ? "none" : undefined)}
          stroke={ink.stroke}
          strokeWidth={ink.sw}
          strokeLinecap={ink.sw ? "round" : undefined}
          opacity={ink.opacity}
        />
      );
      out.push(ink.shadowless ? <NoShadow key={`${name}-${k}`}>{el}</NoShadow> : el);
    }
  }
  return out;
}

/* ── The lines of the land, back to front ── */

const fjell1: Fn = (x) => 596 - 0.05 * x - 92 * g(x, 1080, 210) - 150 * g(x, 1500, 230) - 236 * g(x, 1930, 270) - 190 * g(x, 2310, 230) - 40 * g(x, 520, 240) + 3 * Math.sin(x / 37);
const fjell2: Fn = (x) => 628 - 0.045 * x - 104 * g(x, 1240, 220) - 146 * g(x, 1720, 250) - 112 * g(x, 2160, 240) - 34 * g(x, 610, 260) + 2.5 * Math.sin(x / 29);
const lia: Fn = (x) => 670 - 0.04 * x - 40 * g(x, 950, 300) - 76 * g(x, 1550, 340) - 46 * g(x, 2100, 300) + 5 * Math.sin(x / 61) + 3 * Math.sin(x / 23);
const bane: Fn = (x) => 700 + 1.5 * Math.sin(x / 300);
const dal: Fn = (x) => 714 + 3 * Math.sin(x / 210);
const elv: Fn = (x) => 762 + 13 * Math.sin(x / 250 + 0.6) + 5 * Math.sin(x / 90);
const elvW: Fn = (x) => 10 + 4 * Math.sin(x / 330 + 2);
const naer: Fn = (x) => 798 + 7 * Math.sin(x / 280) - 16 * g(x, 1760, 200);
const vei: Fn = (x) => 902 - x * 0.022 + 5 * Math.sin(x / 200);
const front: Fn = (x) => 920 - 116 * g(x, 40, 250) - 92 * g(x, 2390, 240) - 22 * g(x, 780, 170) - 18 * g(x, 1700, 160) + 4 * Math.sin(x / 53);
const LIP_Y = 944;

/** The light catching the top edge of a sheet of paper. */
function Edge({ fn, o = 0.55 }: { fn: Fn; o?: number }) {
  return (
    <NoShadow>
      <path d={edge(fn)} fill="none" stroke="#FFFFFF" strokeOpacity={o} strokeWidth={1.6} strokeLinejoin="round" />
    </NoShadow>
  );
}

/** Snow lying on a ridge between x0 and x1: the ridge on top, a soft wavy edge below. */
function snow(fn: Fn, x0: number, x1: number, depth: number, seed: number) {
  const rand = rng(seed);
  const lobes = 2 + Math.floor(rand() * 3);
  const phase = rand() * 6;
  const top: string[] = [];
  const under: string[] = [];
  const steps = Math.max(10, Math.round((x1 - x0) / 8));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + (x1 - x0) * t;
    const y = fn(x);
    top.push(`${r2(x)},${r2(y - 0.6)}`);
    const body = Math.sin(t * Math.PI) ** 0.75 * (0.74 + 0.2 * Math.sin(t * lobes * Math.PI * 2 + phase) + 0.06 * Math.sin(t * 31 + phase));
    under.unshift(`${r2(x)},${r2(y + depth * body)}`);
  }
  return `M${top.join(" L")} L${under.join(" L")} Z`;
}

/**
 * The side of a top turned away from the sun: a wedge under the ridge from
 * the summit down that flank, so the fjell read as folded paper rather than
 * flat cut-outs.
 */
function shade(fn: Fn, peak: number, w: number, drop: number) {
  const dir = peak > SUN_X ? 1 : -1;
  const y0 = fn(peak);
  const k = (drop * 2.2) / w;
  const low: Fn = (x) => {
    const d = Math.abs(x - peak);
    return fn(x) + Math.max(0, y0 + k * d - fn(x)) * Math.sin(Math.PI * Math.min(1, d / w)) ** 0.6;
  };
  return dir > 0 ? between(fn, low, peak, peak + w, 8) : between(fn, low, peak - w, peak, 8);
}

/** A streak of snow down a gully, left lying through the summer. */
function gully(fn: Fn, x: number, len: number, w: number) {
  const y = fn(x);
  const tip = x + (x > SUN_X ? 1 : -1) * len * 0.14;
  return `M${r2(x - w / 2)},${r2(fn(x - w / 2) + 1)} Q${r2(x - w * 0.15)},${r2(y + len * 0.55)} ${r2(tip)},${r2(y + len)} Q${r2(x + w * 0.2)},${r2(y + len * 0.5)} ${r2(x + w / 2)},${r2(fn(x + w / 2) + 1)} Z`;
}

// The flanks turned from the sun, the same in every season: a thin wash of ink over fjell and snow alike
const SHADE = "rgba(34, 62, 92, 0.085)";

/* ── Trees ── */

/** A crown cut like a drop: round below, rising to a soft point, with a scalloped edge (as landskap's birches). */
function drop(cx: number, cy: number, rx: number, ry: number, n: number, seed: number, bulge = 0.32) {
  const rand = rng(seed);
  const p: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = ((i + (rand() - 0.5) * 0.3) / n) * Math.PI * 2 - Math.PI / 2;
    const sn = Math.sin(a);
    const up = sn < 0 ? -sn : 0;
    const j = 0.93 + rand() * 0.12;
    p.push([cx + Math.cos(a) * rx * (1 - 0.28 * up) * j, cy + sn * ry * (1 + 0.5 * up * up * up) * j]);
  }
  let d = `M${r2(p[0][0])},${r2(p[0][1])}`;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % n];
    const k = (1 + bulge * (0.8 + rand() * 0.4)) / Math.cos(Math.PI / n);
    d += ` Q${r2(cx + ((x1 + x2) / 2 - cx) * k)},${r2(cy + ((y1 + y2) / 2 - cy) * k)} ${r2(x2)},${r2(y2)}`;
  }
  return `${d} Z`;
}

/** A birch (landskap's, with the crown in the season's colours): gold in autumn, rimed white in winter. */
function bjork(bag: Bag, x: number, y: number, h: number, seed: number, lean = 0) {
  const rand = rng(seed);
  const tip = { x: x + lean * h * 0.08, y: y - h };
  const w = Math.max(3.4, h * 0.026);
  put(bag, "bark", { fill: "#FFFFFF" }, x, `M${r2(x - w)},${y} C${r2(x - w * 0.9)},${r2(y - h * 0.4)} ${r2(tip.x - w * 0.5)},${r2(y - h * 0.75)} ${r2(tip.x - 0.8)},${r2(tip.y + h * 0.1)} L${r2(tip.x + 0.8)},${r2(tip.y + h * 0.1)} C${r2(tip.x + w * 0.5)},${r2(y - h * 0.75)} ${r2(x + w * 0.9)},${r2(y - h * 0.4)} ${r2(x + w)},${y} Z`);
  const count = Math.round(h / 24);
  for (let i = 0; i < count; i++) {
    const t = 0.08 + (i / count) * 0.8;
    const my = y - h * t;
    const mx = x + (tip.x - x) * t;
    const mw = w * (0.7 + rand() * 0.9);
    const side = rand() > 0.5 ? 1 : -1;
    put(bag, "marks", { fill: "#2B2F2A", opacity: 0.85, shadowless: true }, x, `M${r2(mx + side * w * 0.95 - mw * (side > 0 ? 1 : 0))},${r2(my)} l${r2(mw)},${r2(-0.8 - rand() * 1.2)} l0,${r2(2 + rand())} l${r2(-mw)},${r2(0.5)} Z`);
  }
  put(bag, "bj1", { v: "bj1" }, x, drop(tip.x, y - h * 0.63, h * 0.19, h * 0.25, 12, seed * 7, 0.34));
  for (let i = 0; i < 5; i++) {
    const t = 0.44 + i * 0.08;
    const by = y - h * t;
    const bx = x + (tip.x - x) * t;
    const side = i % 2 ? 1 : -1;
    const len = h * 0.11 * (0.85 + rand() * 0.3);
    put(bag, "branch", { stroke: "#8A8070", sw: 1.8, shadowless: true }, x, `M${r2(bx)},${r2(by)} Q${r2(bx + side * len * 0.55)},${r2(by - len * 0.5)} ${r2(bx + side * len)},${r2(by - len * 0.12)}`);
  }
  put(bag, "bj2", { v: "bj2" }, x, drop(tip.x - h * 0.025, y - h * 0.55, h * 0.145, h * 0.18, 11, seed * 7 + 1, 0.34));
  put(bag, "bj3", { v: "bj3" }, x, drop(tip.x + h * 0.045, y - h * 0.7, h * 0.07, h * 0.09, 8, seed * 7 + 2, 0.34));
}

/**
 * A spruce: tiers of drooping paper, all of them one dark sheet, and the half
 * of each tier facing the sun cut again in a lighter paper laid over it. In
 * winter the lighter paper is snow lying on the sunny side of every tier.
 */
function gran(bag: Bag, x: number, y: number, h: number, w: number, tiers = 5) {
  const lit = x < SUN_X ? 1 : -1;
  put(bag, "stamme", { fill: "#6B5A40" }, x, rect(x - w * 0.09, y - h * 0.12, w * 0.18, h * 0.12));
  for (let i = 0; i < tiers; i++) {
    const t = i / tiers;
    const by = y - h * 0.07 - t * h * 0.74;
    const tw = w * (1 - t * 0.74);
    const th = h * (tiers < 5 ? 0.46 : 0.34);
    put(bag, "ga", { v: "ga" }, x, `M${r2(x - tw)},${r2(by)} Q${r2(x - tw * 0.42)},${r2(by - th * 0.4)} ${r2(x)},${r2(by - th)} Q${r2(x + tw * 0.42)},${r2(by - th * 0.4)} ${r2(x + tw)},${r2(by)} Q${r2(x)},${r2(by - th * 0.16)} ${r2(x - tw)},${r2(by)} Z`);
    const e = x + lit * tw;
    put(bag, "gb", { v: "gb" }, x, `M${r2(x)},${r2(by - th)} Q${r2(x + lit * tw * 0.42)},${r2(by - th * 0.4)} ${r2(e)},${r2(by)} Q${r2(x + lit * tw * 0.5)},${r2(by - th * 0.1)} ${r2(x + lit * tw * 0.08)},${r2(by - th * 0.2)} Z`);
  }
}

/** A rowan: a slim trunk and a round crown of leaflets, red in autumn, with berries that stay into winter. */
function rogn(bag: Bag, x: number, y: number, h: number, seed: number) {
  const rand = rng(seed);
  const cy = y - h * 0.66;
  const r = h * 0.3;
  put(bag, "rstamme", { fill: "#7A6450" }, x, `M${r2(x - 2.6)},${y} L${r2(x - 1.2)},${r2(cy)} L${r2(x + 1.2)},${r2(cy)} L${r2(x + 2.6)},${y} Z`);
  put(bag, "rg1", { v: "rg1" }, x, bumpy(x, cy, r, r * 0.86, 13, seed, 0.4));
  put(bag, "rg2", { v: "rg2" }, x, bumpy(x - r * 0.18, cy - r * 0.2, r * 0.62, r * 0.5, 10, seed + 1, 0.42));
  for (let i = 0; i < 6; i++) {
    const a = rand() * Math.PI * 2;
    const d = r * (0.35 + rand() * 0.45);
    const bx = x + Math.cos(a) * d;
    const by = cy + Math.sin(a) * d * 0.8 + r * 0.15;
    put(bag, "baer", { v: "baer" }, x, `${circle(bx, by, 2.6)} ${circle(bx + 3.4, by + 1.2, 2.2)} ${circle(bx + 1.2, by + 3.6, 2.2)}`);
  }
}

/** A round leafy tree, alder and willow by the river, ash and birch along the fields. */
function lauv(bag: Bag, x: number, y: number, h: number, seed: number) {
  put(bag, "lstamme", { fill: "#7A6A58" }, x, rect(x - 1.4, y - h * 0.4, 2.8, h * 0.4));
  put(bag, "lauv1", { v: "lauv1" }, x, bumpy(x, y - h * 0.62, h * 0.36, h * 0.34, 9, seed, 0.38));
  put(bag, "lauv2", { v: "lauv2" }, x, bumpy(x - h * 0.08, y - h * 0.7, h * 0.2, h * 0.17, 7, seed + 3, 0.4));
}

/* ── 0 · The far fjell, Rondane's rounded tops ── */

const snowBag = (fn: Fn, v: string, spans: number[][]): Bag => {
  const bag: Bag = new Map();
  spans.forEach(([a, b, d, s]) => put(bag, v, { v }, (a + b) / 2, snow(fn, a, b, d, s)));
  return bag;
};

export const FJELL1 = (
  <>
    <path d={land(fjell1)} style={c("fj1", td(1700, 0))} />
    {/* Snow: all of it in winter, the upper half through spring, the gullies all year */}
    {drawn(snowBag(fjell1, "fj1s", [[1330, 1680, 92, 3], [1700, 2160, 140, 4], [2130, 2500, 120, 5], [880, 1260, 48, 12], [380, 680, 24, 13]]), 0)}
    {drawn(snowBag(fjell1, "fj1v", [[1400, 1610, 44, 6], [1790, 2080, 76, 7], [2200, 2430, 58, 8], [960, 1190, 24, 9]]), 0)}
    <path
      d={[
        snow(fjell1, 1870, 1990, 22, 10),
        snow(fjell1, 2270, 2350, 14, 11),
        gully(fjell1, 2010, 46, 12),
        gully(fjell1, 2075, 34, 10),
        gully(fjell1, 2370, 36, 10),
      ].join(" ")}
      fill="#FFFFFF"
    />
    <NoShadow>
      <path d={[[1500, 250, 100], [1930, 330, 150], [2310, 260, 120], [1080, 230, 70], [520, 220, 40]].map(([x, w, d]) => shade(fjell1, x, w, d)).join(" ")} fill={SHADE} />
    </NoShadow>
    <Edge fn={fjell1} o={0.75} />
  </>
);

/* ── 1 · The nearer fjell ── */

export const FJELL2 = (
  <>
    <path d={land(fjell2)} style={c("fj2", td(1500, 1))} />
    {drawn(snowBag(fjell2, "fj2s", [[1060, 1420, 70, 21], [1520, 1930, 96, 22], [1960, 2360, 80, 23], [400, 820, 30, 24]]), 1)}
    {drawn(snowBag(fjell2, "fj2v", [[1130, 1350, 36, 25], [1600, 1850, 52, 26], [2040, 2290, 40, 27]]), 1)}
    <path d={[gully(fjell2, 1800, 30, 10), gully(fjell2, 2215, 26, 9)].join(" ")} fill="#FFFFFF" />
    <NoShadow>
      <path d={[[1240, 240, 80], [1720, 280, 110], [2160, 260, 90], [610, 240, 40]].map(([x, w, d]) => shade(fjell2, x, w, d)).join(" ")} fill={SHADE} />
    </NoShadow>
    <Edge fn={fjell2} o={0.6} />
  </>
);

/* ── 2 · The far side of the valley: forest above, the farms' fields below ── */

const skogFoot: Fn = (x) => lia(x) + 44 + 7 * Math.sin(x / 47) + 4 * Math.sin(x / 13);
/** The forest: its top along the ridge, its foot cut as a row of crowns. */
const SKOG = (() => {
  const rand = rng(77);
  let d = `M${pts(lia, 8).join(" L")}`;
  let x = X1;
  d += ` L${x},${r2(skogFoot(x))}`;
  while (x > X0) {
    const s = 12 + rand() * 12;
    const nx = Math.max(X0, x - s);
    d += ` Q${r2((x + nx) / 2)},${r2(skogFoot((x + nx) / 2) + 7 + rand() * 6)} ${r2(nx)},${r2(skogFoot(nx))}`;
    x = nx;
  }
  return `${d} Z`;
})();
/** A field with softly rounded corners, its top and foot following the slope. */
function teig(a: number, b: number, top: Fn, foot: Fn, r = 6) {
  return `M${r2(a)},${r2(foot(a) - r)} L${r2(a)},${r2(top(a) + r)} Q${r2(a)},${r2(top(a))} ${r2(a + r)},${r2(top(a))} L${r2(b - r)},${r2(top(b))} Q${r2(b)},${r2(top(b))} ${r2(b)},${r2(top(b) + r)} L${r2(b)},${r2(foot(b) - r)} Q${r2(b)},${r2(foot(b))} ${r2(b - r)},${r2(foot(b))} L${r2(a + r)},${r2(foot(a))} Q${r2(a)},${r2(foot(a))} ${r2(a)},${r2(foot(a) - r)} Z`;
}
const KINDS = ["ak1", "ak3", "ak4", "ak1", "ak2", "ak3"];

const LIA_FIELDS: Bag = new Map();
const LIA_TREES: Bag = new Map();
(() => {
  const rand = rng(93);
  let x = 470;
  let i = 0;
  while (x < 2500) {
    const w = 80 + rand() * 130;
    const x0 = x;
    const t1: Fn = (u) => skogFoot(u) + 10 + (u - x0) * 0.04;
    const split = 26 + rand() * 12;
    if (t1(x) + 30 < 700) {
      const v1 = KINDS[Math.floor(rand() * KINDS.length)];
      put(LIA_FIELDS, v1, { v: v1 }, x + w / 2, teig(x, x + w, t1, (u) => Math.min(704, t1(u) + split)));
      const t2: Fn = (u) => t1(u) + split + 6;
      const v2 = KINDS[Math.floor(rand() * KINDS.length)];
      if (t2(x) < 696) put(LIA_FIELDS, v2, { v: v2 }, x + w / 2, teig(x + 3, x + w + 3, t2, () => 712));
      if (rand() > 0.35) lauv(LIA_TREES, x - 6, t1(x) + split + 4, 16 + rand() * 8, 900 + i++);
      if (rand() > 0.6) lauv(LIA_TREES, x - 7, t1(x) + 6, 14 + rand() * 6, 900 + i++);
    }
    x += w + 9 + rand() * 24;
  }
})();
// Snow lingering in spring along the foot of the forest, where the sun reaches last
const FLEKKER: Bag = new Map();
[[520, 760], [880, 1010], [1150, 1390], [1560, 1700], [1830, 2120], [2260, 2440]].forEach(([a, b], i) => {
  const depth = 10 + rng(300 + i)() * 8;
  put(FLEKKER, "flekk", { v: "flekk" }, (a + b) / 2, between(
    (x) => skogFoot(x) - 4,
    (x) => skogFoot(x) + 6 + depth * Math.sin(((x - a) / (b - a)) * Math.PI) ** 0.6 * (0.8 + 0.2 * Math.sin(x / 17)),
    a,
    b,
    8
  ));
});
const FOREST: Bag = new Map();
(() => {
  const rand = rng(71);
  for (let x = X0 + 10; x < X1; x += 11 + rand() * 12) {
    const h = 24 + rand() * 26;
    gran(FOREST, r2(x), lia(x) + 9 + rand() * 7, h, h * 0.3, 4);
  }
})();

export const LIA = (
  <>
    <path d={land(lia)} style={c("li", td(1400, 2))} />
    {drawn(LIA_FIELDS, 2)}
    {drawn(FLEKKER, 2)}
    {drawn(LIA_TREES, 2)}
    <path d={SKOG} style={c("skog", td(1400, 2))} />
    {drawn(FOREST, 2)}
  </>
);

/* ── 3 · The railway along the foot of the far side ── */

const MASTS = Array.from({ length: 22 }, (_, i) => -40 + i * 120);
export const BANE = (
  <>
    <path d={land(bane)} style={c("bane", td(1200, 3))} />
    <NoShadow>
      <path d={`M${X0},664 L${X1},664`} stroke="#7A746A" strokeWidth={0.9} fill="none" />
      <path d={`M${X0},698.6 L${X1},698.6`} stroke="#6E675C" strokeWidth={1.4} fill="none" />
    </NoShadow>
    <path d={MASTS.map((x) => `${rect(x, 657, 2.6, 42)} ${rect(x - 1, 659, 15, 2.2)}`).join(" ")} fill="#8C8578" />
  </>
);

/* ── 4 · The valley floor: fields, the river Lågen, alders along its banks ── */

const AKRE: Bag = new Map();
(() => {
  const rand = rng(133);
  let x = X0;
  while (x < X1) {
    const w = 130 + rand() * 170;
    const top = (t: number) => dal(t) + 5;
    const bot = (t: number) => elv(t) - elvW(t) - 6;
    const skew = (rand() - 0.5) * 30;
    const a = x + 4;
    const b = x + w - 4;
    const v = ["ak1", "ak2", "ak3", "ak4"][Math.floor(rand() * 4)];
    put(AKRE, v, { v }, x + w / 2, `M${r2(a + skew)},${r2(top(a) + 1)} L${r2(b + skew)},${r2(top(b) + 1)} L${r2(b)},${r2(bot(b))} L${r2(a)},${r2(bot(a))} Z`);
    x += w + 3;
  }
})();
const ELVEKANT: Bag = new Map();
(() => {
  const rand = rng(151);
  let i = 0;
  for (const [a, b] of [[60, 380], [700, 900], [1180, 1330], [1760, 2000], [2280, 2460]]) {
    for (let x = a; x < b; x += 18 + rand() * 22) lauv(ELVEKANT, x, elv(x) - elvW(x) - 2, 24 + rand() * 16, 700 + i++);
  }
})();
const RIVER = between((x) => elv(x) - elvW(x), (x) => elv(x) + elvW(x), X0, X1, 10);
const RIPPLES: Bag = new Map();
for (let i = 0; i < 26; i++) {
  const x = -60 + i * 98 + (i % 3) * 17;
  const len = 26 + (i % 4) * 9;
  const y = (t: number) => elv(t) + (i % 2 ? -3 : 3);
  put(RIPPLES, "ripple", { vs: "elv2", sw: 1.6, shadowless: true }, x, `M${r2(x)},${r2(y(x))} L${r2(x + len)},${r2(y(x + len))}`);
}
// Gravel bars where the river bends
const ORER: Bag = new Map();
[430, 1010, 1660, 2210].forEach((x, i) => {
  const y = elv(x) + (i % 2 ? -elvW(x) * 0.35 : elvW(x) * 0.35);
  put(ORER, "sand", { v: "sand" }, x, `M${x - 34},${r2(y)} Q${x},${r2(y - 5)} ${x + 34},${r2(y)} Q${x},${r2(y + 4)} ${x - 34},${r2(y)} Z`);
});

export const DAL = (
  <>
    <path d={land(dal)} style={c("dal", td(1200, 4))} />
    {drawn(AKRE, 4)}
    {drawn(ELVEKANT, 4)}
    <path d={RIVER} style={c("elv", td(1200, 4))} />
    {drawn(ORER, 4)}
    {drawn(RIPPLES, 4)}
    <Edge fn={dal} o={0.4} />
  </>
);

/* ── 5 · This side: the meadow, the road and the clinic's sign, a stand of spruce ── */

const ROAD = between((x) => vei(x) - 6.5, (x) => vei(x) + 6.5, X0, X1, 12);
const SIGN = { x: 1452, y: r2(vei(1452) - 8) };
const ENG: Bag = new Map();
[
  { a: 380, b: 640, v: "ak3" }, { a: 652, b: 820, v: "ak1" }, { a: 1960, b: 2200, v: "ak4" }, { a: 2212, b: 2470, v: "ak1" },
].forEach(({ a, b, v }) => put(ENG, v, { v }, (a + b) / 2, between((x) => naer(x) + 7, (x) => vei(x) - 12, a, b, 12)));
const KLYNGE: Bag = new Map();
[
  { x: 1668, h: 96 }, { x: 1700, h: 138 }, { x: 1738, h: 112 }, { x: 1776, h: 150 }, { x: 1812, h: 104 }, { x: 1846, h: 126 }, { x: 1884, h: 88 },
].forEach((t, i) => gran(KLYNGE, t.x, naer(t.x) + 22 + (i % 2) * 6, t.h, t.h * 0.3));
const RAKKE: Bag = new Map();
rogn(RAKKE, 1100, naer(1100) + 30, 118, 41);

export const NAER = (
  <>
    <path d={land(naer)} style={c("eng", td(1300, 5))} />
    {drawn(ENG, 5)}
    {drawn(KLYNGE, 5)}
    {drawn(RAKKE, 5)}
    <path d={ROAD} style={c("vei", td(1300, 5))} />
    <Tannskilt x={SIGN.x} y={SIGN.y} scale={1.55} />
    <Edge fn={naer} o={0.45} />
  </>
);

/* ── 6 · The bank you stand on: birches, a rowan, flowers ── */

const BLOMSTER: Bag = new Map();
(() => {
  const rand = rng(211);
  for (let i = 0; i < 46; i++) {
    const x = 520 + rand() * 1460;
    const top = front(x) + 9;
    const y = top + rand() * (LIP_Y - 10 - top);
    const r = 3.4 + rand() * 2.4;
    put(BLOMSTER, "bl", { v: "bl" }, x, bumpy(x, y, r, r, 6, 500 + i, 0.9));
    put(BLOMSTER, "blm", { v: "blm" }, x, circle(x, y, r * 0.36));
  }
})();
const BANKTRAER: Bag = new Map();
[
  [150, 14, 330, 21, 0.4], [300, 10, 252, 25, -0.3], [440, 8, 184, 29, 0.2], [790, 10, 196, 31, -0.2],
  [1720, 10, 226, 27, 0.3], [2060, 12, 268, 33, -0.3], [2300, 12, 344, 35, 0.3],
].forEach(([x, dy, h, seed, lean]) => bjork(BANKTRAER, x, r2(front(x) + dy), h, seed, lean));
rogn(BANKTRAER, 2180, r2(front(2180) + 12), 150, 43);

export const FRONT = (
  <>
    <path d={land(front)} style={c("eng2", td(1300, 6))} />
    {drawn(BLOMSTER, 6)}
    {drawn(BANKTRAER, 6)}
  </>
);

/** Snow over the bank in winter: a sheet of its own that folds up when winter comes and lies down in spring. */
const DRIFT: Fn = (x) => front(x) + 3 + 3 * Math.sin(x / 41);
export const SNOW_BANK = (
  <>
    <path d={land(DRIFT)} fill="#FFFFFF" />
    <path d={[300, 820, 1260, 1760, 2240].map((x, i) => bumpy(x, DRIFT(x) + 4, 70 + (i % 3) * 20, 7, 9, 400 + i, 0.2)).join(" ")} fill="#EEF3F5" />
  </>
);

/** The page's paper, scalloped, rising into the bank; it runs on below the strip so no seam shows. */
export const LIP = <path d={lip(LIP_Y, 13, H + 30)} fill="#FCF9F2" />;

/* ── The train: Dovrebanen, a red engine and four carriages ── */

export const TRAIN_BOX = { x: -440, y: 652, w: 430, h: 50 };
export const TRAIN = (
  <>
    <path d={[0, 84, 168, 252].map((x) => `M${x + 4},669 h72 q4,0 4,4 v18 q0,4 -4,4 h-72 q-4,0 -4,-4 v-18 q0,-4 4,-4 Z`).join(" ")} fill="#E6E3DA" />
    <path d="M338,695 L338,672 Q338,668 342,668 L402,668 Q414,669 418,682 L418,695 Z" fill="#B4513B" />
    <NoShadow>
      <path d={[0, 84, 168, 252].map((x) => rect(x + 2, 667.5, 76, 3.5)).join(" ")} fill="#C3C6C1" />
      <path
        d={[
          ...[0, 84, 168, 252].flatMap((x) => [0, 1, 2, 3, 4, 5].map((k) => rect(x + 7 + k * 11.5, 674, 8, 7))),
          "M403,672 L408,672 Q412,673 414,680 L403,680 Z",
          ...[0, 1, 2].map((k) => rect(350 + k * 14, 673, 9, 7)),
        ].join(" ")}
        fill="#3E4C51"
      />
      <path d={[0, 84, 168, 252].map((x) => rect(x, 685, 80, 2.4)).join(" ")} fill="#B4513B" />
      <path d={rect(338, 686, 80, 2)} fill="#F1EDE4" />
      <path d={[...[0, 84, 168, 252].flatMap((x) => [rect(x + 8, 695, 14, 4), rect(x + 58, 695, 14, 4)]), rect(346, 695, 16, 4), rect(394, 695, 16, 4)].join(" ")} fill="#2E3436" />
      <path d="M368,668 L376,663.6 L384,668" fill="none" stroke="#3B3B38" strokeWidth={1.1} />
    </NoShadow>
  </>
);

/* ── Clouds ── */

export const CLOUD = "M34,168 Q34,148 54,150 Q60,132 80,138 Q92,126 106,140 Q124,140 122,158 Q126,172 110,172 L46,172 Q34,172 34,168 Z";

"use client";

import Link from "next/link";
import { Fragment, memo } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { NoShadow, PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { HOURS, KONTAKT } from "@/components/kontakt/data";
import {
  Bjork, Blomst, Cloud, Gran, Strip, Tannskilt,
  bumpy, lip, r2, ridge, ridgeY, rng, snowcap, useLean, usePopUp, useShift, type Pts,
} from "./landskap";
import s from "./landskap.module.css";

/**
 * The front page's closing section, «Sauene». The contact lines sit over a
 * summer pasture up the valley side: sheep graze on both sides of an old
 * roundpole fence, a skigard, whose gate swings open as the paper stands up,
 * with a trodden path through it towards you. Red and white cows look at you
 * from behind the fence, and two moose stand at the edge of the forest on the
 * hill above. The sheep lift their heads now and then (one is black and one
 * brown, as spælsau are), the cows tilt theirs, and a tap makes any of them
 * hop. There is no house; the clinic is the little sign by the gate.
 *
 * The drawing never changes, so it is made once, here at the top, and every
 * piece that moves is a layer of its own moved by CSS (see landskap.tsx).
 */

const H = 580;
const SKY = "#EFF3EA";

// The hours from the table on /kontakt, less the closed weekend.
const OPEN_DAYS = HOURS.filter((h) => !h.closed);

/* ── The land, back to front ── */

const FAR: Pts = [
  [0, 300], [160, 292], [300, 276], [440, 280], [580, 284], [680, 262], [800, 256], [920, 250], [1000, 236], [1100, 226],
  [1200, 214], [1300, 206], [1400, 188], [1500, 176], [1600, 168], [1680, 140], [1780, 134], [1880, 128], [1960, 160],
  [2060, 172], [2200, 186], [2400, 196],
];
const FAR2: Pts = [
  [0, 352], [200, 340], [400, 326], [600, 330], [800, 334], [960, 316], [1100, 304], [1240, 292], [1360, 276], [1500, 268],
  [1640, 262], [1760, 270], [1880, 280], [2000, 276], [2200, 272], [2400, 280],
];
const HILLS: Pts = [
  [0, 420], [200, 414], [400, 404], [600, 406], [800, 408], [960, 392], [1100, 382], [1240, 372], [1360, 356], [1500, 344],
  [1640, 334], [1760, 332], [1880, 330], [2000, 336], [2200, 340], [2400, 336],
];
const PASTURE: Pts = [
  [0, 468], [200, 466], [400, 468], [600, 470], [800, 466], [1000, 460], [1150, 454], [1300, 444], [1450, 430], [1600, 416],
  [1800, 404], [2100, 392], [2400, 386],
];
const NEAR: Pts = [
  [0, 556], [300, 552], [600, 546], [900, 540], [1100, 534], [1300, 528], [1500, 524], [1700, 522], [1900, 520], [2400, 520],
];

const FOREST = (() => {
  const rand = rng(71);
  const trees: { x: number; y: number; h: number }[] = [];
  for (let x = 1120; x < 2400; x += 13 + rand() * 13) {
    trees.push({ x: r2(x), y: r2(ridgeY(HILLS, x) + 12 + rand() * 6), h: r2(30 + rand() * 30) });
  }
  return trees;
})();

/* ── The skigard: poles leaning in a long row between pairs of stakes ── */

const FENCE = { x0: 480, y0: 550, x1: 2400, y1: 432 };
const GATE = { x: 1430, w: 112 };
const fenceY = (x: number) => FENCE.y0 + ((x - FENCE.x0) * (FENCE.y1 - FENCE.y0)) / (FENCE.x1 - FENCE.x0);
/** Nearer is bigger: the fence shrinks as it climbs away up the slope. */
const fenceK = (x: number) => 1.25 - ((x - FENCE.x0) / (FENCE.x1 - FENCE.x0)) * 0.6;

const SKIGARD = (() => {
  const poles: string[] = [];
  const stakes: string[] = [];
  let x = FENCE.x0;
  let n = 0;
  while (x < FENCE.x1) {
    const k = fenceK(x);
    const y = fenceY(x);
    if (x < GATE.x - GATE.w / 2 - 14 * k || x > GATE.x + GATE.w / 2 + 4) {
      // A pole leaning to the right, from the ground to above the stakes
      const len = 48 * k;
      const [dx, dy] = [len * 0.8, len * 0.6];
      poles.push(`M${r2(x)},${r2(y)} L${r2(x + dx)},${r2(y - dy)} L${r2(x + dx + 2.8 * k)},${r2(y - dy + 1.5 * k)} L${r2(x + 2.8 * k)},${r2(y + 1.5 * k)} Z`);
      if (n % 5 === 0) {
        const h = 36 * k;
        for (const off of [12, 18]) {
          stakes.push(`M${r2(x + off * k)},${r2(y + 4 * k)} L${r2(x + off * k)},${r2(y - h)} L${r2(x + (off + 3) * k)},${r2(y - h)} L${r2(x + (off + 3) * k)},${r2(y + 4 * k)} Z`);
        }
      }
    }
    x += 8.5 * fenceK(x);
    n++;
  }
  return { poles, stakes };
})();

// The gate: its posts stay in the pasture; its leaf is a layer of its own that swings.
const LEAF = (() => {
  const left = GATE.x - GATE.w / 2;
  const right = GATE.x + GATE.w / 2;
  const [yl, yr] = [fenceY(left), fenceY(right)];
  const [kl, kr] = [fenceK(left), fenceK(right)];
  const rail = (t: number) =>
    `M${r2(left)},${r2(yl - 36 * kl * t)} L${r2(right)},${r2(yr - 36 * kr * t)} L${r2(right)},${r2(yr - 36 * kr * t - 3.4 * kr)} L${r2(left)},${r2(yl - 36 * kl * t - 3.4 * kl)} Z`;
  const box = { x: left, y: r2(yr - 36 * kr - 3.4 * kr - 2), w: GATE.w, h: r2(yl - (yr - 36 * kr - 3.4 * kr - 2) + 1) };
  return {
    box,
    posts: [
      { x: r2(left - 5 * kl), y: r2(yl - 46 * kl), w: r2(6 * kl), h: r2(50 * kl) },
      { x: r2(right), y: r2(yr - 46 * kr), w: r2(6 * kr), h: r2(50 * kr) },
    ],
    rails: [0.14, 0.5, 0.86].map(rail),
    brace: `M${r2(left)},${r2(yl - 36 * kl * 0.14)} L${r2(right)},${r2(yr - 36 * kr * 0.86)} L${r2(right)},${r2(yr - 36 * kr * 0.86 + 3.4 * kr)} L${r2(left)},${r2(yl - 36 * kl * 0.14 + 3.4 * kl)} Z`,
    stile: `M${r2(right - 3.4 * kr)},${r2(yr - 36 * kr)} L${r2(right)},${r2(yr - 36 * kr)} L${r2(right)},${r2(yr)} L${r2(right - 3.4 * kr)},${r2(yr)} Z`,
  };
})();
const PASTURE_TOP = 250;

/* ── The near grass and the path through the gate ── */

const GATE_Y = fenceY(GATE.x);
const PATH = `M${GATE.x - 16},${r2(GATE_Y + 2)} C${GATE.x - 26},${r2(GATE_Y + 34)} ${GATE.x - 64},542 ${GATE.x - 92},592 L${GATE.x + 46},592 C${GATE.x + 20},542 ${GATE.x + 12},${r2(GATE_Y + 34)} ${GATE.x + 18},${r2(GATE_Y + 2)} Z`;
const DAISIES = (() => {
  const rand = rng(113);
  return Array.from({ length: 34 }, () => {
    const x = 700 + rand() * 1500;
    const ground = ridgeY(NEAR, x) + 8;
    return { x: r2(x), y: r2(ground + rand() * (574 - ground)), r: r2(3.6 + rand() * 2.4) };
  });
})();

/* ── The drawing, made once ── */

const FAR_ART = (
  <>
    <circle cx={1500} cy={112} r={70} fill="#F7F4DE" />
    <circle cx={1500} cy={112} r={47} fill="#FFF0C4" />
    <path d={ridge(FAR, H)} fill="#D5E0E6" />
    {[snowcap(FAR, 1640, 1960, 18, 3), snowcap(FAR, 2060, 2240, 9, 4)].map((d, i) => <path key={i} d={d} fill="#FFFFFF" />)}
  </>
);
const FAR2_ART = <path d={ridge(FAR2, H)} fill="#C5D5C4" />;
const HILLS_ART = (
  <>
    {FOREST.map((t, i) => <Gran key={i} x={t.x} y={t.y} h={t.h} w={r2(t.h * 0.28)} tiers={4} fill="#5E8468" dark="#4F7359" />)}
    <path d={ridge(HILLS, H)} fill="#BFD3A2" />
  </>
);
const PASTURE_ART = (
  <>
    <path d={ridge(PASTURE, H)} fill="#CADFA0" />
    <Bjork x={1316} y={452} h={226} seed={21} lean={-0.3} />
    <Bjork x={930} y={470} h={190} seed={25} lean={0.3} />
    <Bjork x={1010} y={466} h={146} seed={29} lean={-0.2} />
    <Bjork x={1990} y={398} h={196} seed={27} lean={0.3} />
    <Bjork x={2100} y={394} h={150} seed={33} lean={-0.2} />
    <NoShadow>
      {SKIGARD.stakes.map((d, i) => <path key={i} d={d} fill="#6E5E4C" />)}
    </NoShadow>
    {SKIGARD.poles.map((d, i) => <path key={i} d={d} fill={i % 3 === 0 ? "#8F7F6C" : "#A39480"} />)}
    {LEAF.posts.map((p, i) => <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill="#6E5E4C" />)}
    <Tannskilt x={GATE.x + GATE.w / 2 + 26} y={r2(fenceY(GATE.x + GATE.w / 2 + 26) + 6)} scale={0.78} />
  </>
);
const LEAF_ART = (
  <svg viewBox={`${LEAF.box.x} ${LEAF.box.y} ${LEAF.box.w} ${LEAF.box.h}`} className="absolute inset-0 h-full w-full overflow-visible">
    {LEAF.rails.map((d, i) => <path key={i} d={d} fill="#C9B18A" />)}
    <path d={LEAF.brace} fill="#C9B18A" />
    <path d={LEAF.stile} fill="#B39A74" />
  </svg>
);
const NEAR_ART = (
  <>
    <path d={ridge(NEAR, H)} fill="#B6D08B" />
    <path d={PATH} fill="#DCE3B6" />
    {DAISIES.map((d, i) => <Blomst key={i} x={d.x} y={d.y} r={d.r} seed={500 + i} />)}
  </>
);
const LIP_ART = <path d={lip(572, 13, H)} fill="#082025" />;

/* ── The animals ── */

/** Where an animal stands: on the hill under the forest, up the pasture behind the fence, or this side of it. */
type Sted = "hill" | "far" | "near";

type Dyr = { x: number; y: number; k: number; face: 1 | -1; at: Sted; t: number; delay: number } & (
  | { kind: "sau"; wool: string; top: string; head: string; eye: string; bell?: boolean }
  | { kind: "ku" }
  | { kind: "elg"; bull?: boolean }
);

const WHITE = { kind: "sau", wool: "#F4F1E8", top: "#FFFFFF", head: "#DDD4C5", eye: "#2B2725" } as const;
const ANIMALS: Dyr[] = [
  { kind: "ku", x: 1190, y: 476, k: 1, face: 1, at: "far", t: 10, delay: 1.4 },
  { kind: "ku", x: 1596, y: 454, k: 0.92, face: -1, at: "far", t: 11, delay: 3.4 },
  { kind: "sau", x: 1690, y: 447, k: 0.95, face: 1, at: "far", wool: "#3F3A38", top: "#4E4845", head: "#35302D", eye: "#E9E4D8", t: 9, delay: 0.5 },
  { kind: "ku", x: 1806, y: 440, k: 0.84, face: 1, at: "far", t: 9.5, delay: 5.2 },
  { kind: "sau", x: 1916, y: 426, k: 0.86, face: -1, at: "far", wool: "#9A7B62", top: "#A98B72", head: "#8A6E58", eye: "#2B2725", t: 8.5, delay: 4.2 },
  { ...WHITE, x: 1236, y: 546, k: 1.5, face: 1, at: "near", bell: true, t: 8.5, delay: 1.8 },
  { ...WHITE, x: 1660, y: 550, k: 1.66, face: -1, at: "near", bell: true, t: 7.5, delay: 2.6 },
  { ...WHITE, x: 1790, y: 556, k: 0.96, face: -1, at: "near", t: 6.5, delay: 4 },
  { kind: "elg", x: 1352, y: 422, k: 0.88, face: 1, at: "hill", t: 12, delay: 2 },
  { kind: "elg", bull: true, x: 1470, y: 420, k: 1, face: -1, at: "hill", t: 10, delay: 6 },
];

// Red and white, as most cows in Norway are
const COW = { hide: "#B0644C", back: "#BF765C", ear: "#9A543F", leg: "#955340", hoof: "#4A3B34", white: "#F4F1E8", pink: "#E6B3A8", nose: "#C98E84", horn: "#EFE6D2" };
// Dark brown, with pale legs and pale antlers
const MOOSE = { hide: "#4E3E32", back: "#5E4B3D", leg: "#3E3129", sock: "#CBBBA3", snout: "#685444", antler: "#DDCCA8", far: "#BDAA88", eye: "#E9E4D8" };

const COW_BODY = "M-40,-47 Q-41,-55 -33,-55 Q-10,-52 12,-54 Q24,-55 28,-47 Q31,-38 27,-29 Q23,-23 14,-24 Q-4,-19 -22,-23 Q-36,-25 -40,-34 Z";
// Short and deep, with the hump high over the shoulders and the back falling away behind it
const MOOSE_BODY = "M-26,-47 Q-27,-55 -19,-56 Q-2,-58 8,-66 Q15,-72 22,-64 Q28,-54 25,-42 Q22,-36 14,-37 L-17,-37.5 Q-25,-38 -26,-47 Z";
// A bull's antler: a broad palm with its points along the top
const ANTLER = "M29,-62 L30,-68 Q24,-69 17,-73 L12,-80 L17.5,-78.5 L17.5,-86 L22,-80.5 L24.5,-89 L27.5,-81.5 L31.5,-90 L33,-82 L38,-88 L38,-80 L44,-83 L41,-75 Q37.5,-70 34,-67.5 L33,-61.5 Z";

/**
 * An animal in its own units, standing at 0,0 and facing right: the box
 * round it, the neck its head turns round, how far the head lifts, and the
 * body and the head apart, since the head moves.
 */
function form(dyr: Dyr, i: number) {
  switch (dyr.kind) {
    case "sau": {
      const body = bumpy(0, -25, 23, 13.5, 11, 10 + i, 0.45);
      return {
        box: [-34, -50, 72, 54],
        neck: [16, -26],
        lift: 40,
        body: (
          <>
            <PaperShadow>
              <path d={body} />
            </PaperShadow>
            {[-15, -9, 8, 14].map((lx) => <rect key={lx} x={lx - 1.6} y={-16} width={3.2} height={16} rx={1} fill="#4A4540" />)}
            <path d={body} fill={dyr.wool} />
            <path d={bumpy(-2, -29, 17, 8, 9, 30 + i, 0.5)} fill={dyr.top} />
            <path d={bumpy(-23, -28, 3.2, 3.2, 5, 50 + i, 0.6)} fill={dyr.wool} />
            {dyr.bell && (
              <>
                <NoShadow>
                  <path d="M12,-21 Q16,-16 21,-18" stroke="#6E4E3A" strokeWidth={1.4} fill="none" />
                </NoShadow>
                <circle cx={17} cy={-15} r={2.8} fill="#D9B45C" />
              </>
            )}
          </>
        ),
        head: (
          <>
            <ellipse cx={16} cy={-29} rx={5.4} ry={2.4} fill={dyr.head} transform="rotate(-24 16 -29)" />
            <ellipse cx={16.4} cy={-29.2} rx={3.2} ry={1.1} fill="#E7B8B0" transform="rotate(-24 16 -29)" />
            <path d="M15,-29 Q28,-27 32,-15 Q34,-7 28,-5 Q22,-5 18,-13 Z" fill={dyr.head} />
            <path d={bumpy(20, -30, 5, 3.6, 6, 70 + i, 0.6)} fill={dyr.top} />
            <circle cx={25.5} cy={-19} r={1.2} fill={dyr.eye} />
            <ellipse cx={30} cy={-8} rx={2.6} ry={1.8} fill="#8F8278" opacity={0.7} />
          </>
        ),
      };
    }
    // A cow side-on, with her face turned to you and the udder showing under her
    case "ku":
      return {
        box: [-50, -64, 100, 68],
        neck: [30, -38],
        lift: 10,
        body: (
          <>
            <PaperShadow>
              <path d={COW_BODY} />
            </PaperShadow>
            {[-35, -27, 13, 21].map((lx) => (
              <Fragment key={lx}>
                <rect x={lx - 2.6} y={-28} width={5.2} height={28} rx={1.2} fill={COW.leg} />
                <rect x={lx - 2.6} y={-3} width={5.2} height={3} fill={COW.hoof} />
              </Fragment>
            ))}
            <ellipse cx={-17} cy={-21} rx={6} ry={4.2} fill={COW.pink} />
            <path d="M-39,-51 Q-45,-45 -43.6,-27 L-41.8,-27 Q-43,-44 -38,-49 Z" fill={COW.leg} />
            <path d={bumpy(-42.8, -25.5, 2.2, 3, 5, 90 + i, 0.5)} fill={COW.hoof} />
            <path d={COW_BODY} fill={COW.hide} />
            <path d="M-34,-54.2 Q-10,-51.4 12,-53.2 Q21,-53.8 24,-50.5 Q10,-49.8 -10,-49 Q-28,-49.6 -34,-54.2 Z" fill={COW.back} />
            <path d={bumpy(-10, -37, 11, 8, 7, 92 + i, 0.3)} fill={COW.white} />
            <path d={bumpy(12, -43, 6, 5, 6, 94 + i, 0.3)} fill={COW.white} />
            <path d="M18,-24.6 Q-4,-19.6 -24,-23.6 L-22,-27 Q-4,-24 16,-28 Z" fill={COW.white} />
          </>
        ),
        head: (
          <>
            <path d="M18,-54 Q27,-55 31,-50 L31,-36 Q26,-31 21,-32 Z" fill={COW.hide} />
            <ellipse cx={22.5} cy={-49.5} rx={6} ry={2.5} fill={COW.ear} transform="rotate(14 22.5 -49.5)" />
            <ellipse cx={22.8} cy={-49.4} rx={3.6} ry={1.2} fill={COW.pink} transform="rotate(14 22.8 -49.4)" />
            <ellipse cx={43.5} cy={-49.5} rx={6} ry={2.5} fill={COW.ear} transform="rotate(-14 43.5 -49.5)" />
            <ellipse cx={43.2} cy={-49.4} rx={3.6} ry={1.2} fill={COW.pink} transform="rotate(-14 43.2 -49.4)" />
            <path d="M27.5,-53.5 Q25.5,-58 22.5,-59 Q25.6,-59.8 28.6,-56 Z" fill={COW.horn} />
            <path d="M38.5,-53.5 Q40.5,-58 43.5,-59 Q40.4,-59.8 37.4,-56 Z" fill={COW.horn} />
            <path d="M26,-54 Q33,-57 40,-54 Q41.5,-45 39.5,-38 Q33,-35 26.5,-38 Q24.5,-45 26,-54 Z" fill={COW.hide} />
            <path d="M31,-55.6 Q33,-56 35,-55.6 L35.4,-41 L30.6,-41 Z" fill={COW.white} />
            <ellipse cx={33} cy={-36.5} rx={7.6} ry={5} fill={COW.pink} />
            <ellipse cx={30.3} cy={-36.2} rx={1} ry={1.4} fill={COW.nose} />
            <ellipse cx={35.7} cy={-36.2} rx={1} ry={1.4} fill={COW.nose} />
            <circle cx={28.8} cy={-46} r={1.2} fill="#2B2725" />
            <circle cx={37.2} cy={-46} r={1.2} fill="#2B2725" />
          </>
        ),
      };
    // A moose at the edge of the forest, head up; a bull has antlers
    case "elg":
      return {
        box: [-56, -94, 112, 98],
        neck: [19, -57],
        lift: dyr.bull ? 10 : 14,
        body: (
          <>
            <PaperShadow>
              <path d={MOOSE_BODY} />
            </PaperShadow>
            {[-21, -14, 12, 19].map((lx) => (
              <Fragment key={lx}>
                <rect x={lx - 1.9} y={-41} width={3.8} height={41} rx={1} fill={MOOSE.leg} />
                <rect x={lx - 1.9} y={-19} width={3.8} height={16.5} fill={MOOSE.sock} />
              </Fragment>
            ))}
            <path d="M-25.5,-53 Q-29.5,-51 -28,-46 Q-26.5,-48.5 -25,-48 Z" fill={MOOSE.hide} />
            <path d={MOOSE_BODY} fill={MOOSE.hide} />
            <path d="M-19,-55.6 Q-2,-57.6 8,-65.5 Q15,-71.5 21,-64.5 Q12,-64 2,-59 Q-8,-55 -19,-55.6 Z" fill={MOOSE.back} />
          </>
        ),
        head: (
          <>
            {dyr.bull && <path d={ANTLER} fill={MOOSE.far} transform="translate(6 2)" />}
            <path d="M15,-63 Q25,-66 31,-63 Q40,-59 46,-52 Q51,-48 53,-43 Q54.5,-37 49.5,-36 Q46,-35.5 44,-39 Q38,-44 32,-45.5 Q27,-45 24,-41 Q19,-45 15,-51 Z" fill={MOOSE.hide} />
            <path d="M45.5,-50.5 Q51,-48 53,-43 Q54.5,-37 49.5,-36 Q46,-35.5 44,-39 Q43,-45 45.5,-50.5 Z" fill={MOOSE.snout} />
            <ellipse cx={51} cy={-40.5} rx={1.3} ry={0.8} fill={MOOSE.leg} />
            <path d="M29,-45.5 Q32,-36 28.5,-31 Q26,-36.5 26.8,-45.5 Z" fill={MOOSE.hide} />
            <ellipse cx={28.5} cy={-65} rx={5.6} ry={2.1} fill={MOOSE.hide} transform="rotate(-38 28.5 -65)" />
            {dyr.bull && <path d={ANTLER} fill={MOOSE.antler} />}
            <circle cx={39} cy={-56} r={1.1} fill={MOOSE.eye} />
          </>
        ),
      };
  }
}

/** Each animal drawn once: its box on the strip, the body, and the head apart. */
const ART = ANIMALS.map((dyr, i) => {
  const { k, face } = dyr;
  const f = form(dyr, i);
  const [bx, by, bw, bh] = f.box;
  const box = { x: r2(dyr.x + bx * k), y: r2(dyr.y + by * k), w: r2(bw * k), h: r2(bh * k) };
  const view = `${box.x} ${box.y} ${box.w} ${box.h}`;
  const place = `translate(${dyr.x} ${dyr.y}) scale(${r2(k * face)} ${k})`;
  return {
    box,
    // The neck, which the head turns round, in px from the box's corner (a strip unit is a px here)
    neck: `${r2(dyr.x + f.neck[0] * k * face - box.x)}px ${r2(dyr.y + f.neck[1] * k - box.y)}px`,
    // A head facing left lifts the other way round
    lift: `${face > 0 ? -f.lift : f.lift}deg`,
    body: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
        <g transform={place}>{f.body}</g>
      </svg>
    ),
    head: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
        <g transform={place}>{f.head}</g>
      </svg>
    ),
  };
});

/** An animal on small layers of its own: it pops up onto the grass, grazes, and hops when tapped. */
const Animal = memo(function Animal({ i, up, on }: { i: number; up: boolean; on: boolean }) {
  const dyr = ANIMALS[i];
  const art = ART[i];
  return (
    <div
      className={s.hop}
      data-up={up}
      style={{
        left: `calc(50% - 1200px + ${art.box.x}px)`,
        top: art.box.y,
        width: art.box.w,
        height: art.box.h,
        ["--delay" as string]: `${r2(1.1 + i * 0.14)}s`,
      }}
    >
      {/* The same whileTap for everyone, or the server and the browser would
          disagree about the tabindex framer gives a tappable element; -1
          keeps the animals out of the tab order, as the picture is hidden
          from screen readers. */}
      <motion.div className="absolute inset-0 cursor-pointer" whileTap={{ y: -12 }} tabIndex={-1}>
        {art.body}
        <div
          className={`${s.head} ${s.graze}`}
          data-on={on}
          style={{
            transformOrigin: art.neck,
            ["--t" as string]: `${dyr.t}s`,
            ["--delay" as string]: `${dyr.delay}s`,
            ["--lift" as string]: art.lift,
          }}
        >
          {art.head}
        </div>
      </motion.div>
    </div>
  );
});

/* ── The words ── */

function Kontakt() {
  const link = "transition-colors hover:text-[var(--color-brass)]";
  const row = "border-t border-[rgba(14,42,48,0.14)] py-3.5";
  return (
    <div className="max-w-[440px]">
      <h2 className="display-section text-balance text-[var(--color-ink)]">Velkommen til oss.</h2>
      <p className="mt-4 text-[17px] leading-[1.55] text-[rgba(14,42,48,0.74)]">Du finner oss midt i Ringebu, rett ved E6.</p>
      <ul className="mt-8 text-[17px] font-medium leading-[1.4] tracking-[-0.01em] text-[var(--color-ink)]">
        <li className={row}>
          <a href={KONTAKT.phone.href} className={`text-[22px] ${link}`}>{KONTAKT.phone.display}</a>
        </li>
        <li className={row}>
          <a href={KONTAKT.email.href} className={link}>{KONTAKT.email.display}</a>
        </li>
        <li className={row}>
          <a href={KONTAKT.address.href} target="_blank" rel="noopener noreferrer" className={link}>{KONTAKT.address.display}</a>
        </li>
        <li className={`${row} grid grid-cols-[auto_1fr] gap-x-5 border-b font-normal tabular-nums text-[rgba(14,42,48,0.8)]`}>
          {OPEN_DAYS.map((h) => (
            <Fragment key={h.code}>
              <span>{h.code}</span>
              <span>{h.hours}</span>
            </Fragment>
          ))}
        </li>
      </ul>
      <Link
        href="/kontakt"
        className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#16414A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]"
      >
        Finn en ledig time
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

export function Sauene() {
  const { ref, reduced, up, on } = usePopUp();
  const { spring, handlers } = useLean(reduced);
  const farX = useShift(spring, 5);
  const far2X = useShift(spring, 7);
  const hillsX = useShift(spring, 10);
  const pastureX = useShift(spring, 14);
  const nearX = useShift(spring, 20);

  return (
    <section ref={ref} {...handlers} className="relative overflow-hidden" style={{ background: SKY }}>
      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-6 pt-[var(--space-section)] lg:min-h-[900px] lg:pb-0">
        <Kontakt />
      </div>

      <div aria-hidden="true" className="relative h-[330px] sm:h-[430px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[580px]">
        {/* On a phone the paper is scaled down and moved so the gate and the sheep stay in view */}
        <div className="absolute inset-x-0 bottom-0 h-[580px] origin-bottom max-lg:-translate-x-[140px] max-lg:scale-[0.6] sm:max-lg:-translate-x-[174px] sm:max-lg:scale-[0.76]">
          <Strip n={0} up={up} x={farX} top={40} h={H}>{FAR_ART}</Strip>
          <Strip n={1} up={up} x={far2X} top={240} h={H}>{FAR2_ART}</Strip>
          <Strip n={2} up={up} x={hillsX} top={300} h={H}>{HILLS_ART}</Strip>
          <Strip
            n={3}
            up={up}
            x={pastureX}
            top={PASTURE_TOP}
            h={H}
            over={
              <div
                className={s.gate}
                data-up={up}
                style={{ left: LEAF.box.x, top: LEAF.box.y - PASTURE_TOP, width: LEAF.box.w, height: LEAF.box.h }}
              >
                {LEAF_ART}
              </div>
            }
          >
            {PASTURE_ART}
          </Strip>

          {/* The moose on the hill, at the edge of the forest. They move with the
              hill, but stand over the pasture's sheet, above its edge, so a tap
              reaches them. */}
          <motion.div className="absolute bottom-0 left-0 right-0 h-[580px]" style={{ x: hillsX }}>
            {ANIMALS.map((dyr, i) => dyr.at === "hill" && <Animal key={i} i={i} up={up} on={on} />)}
          </motion.div>

          {/* The animals up the slope, behind the fence */}
          <motion.div className="absolute bottom-0 left-0 right-0 h-[580px]" style={{ x: pastureX }}>
            {ANIMALS.map((dyr, i) => dyr.at === "far" && <Animal key={i} i={i} up={up} on={on} />)}
          </motion.div>

          <Strip n={4} up={up} x={nearX} top={500} h={H}>{NEAR_ART}</Strip>

          {/* And the ones this side of it, nearest you */}
          <motion.div className="absolute bottom-0 left-0 right-0 h-[580px]" style={{ x: nearX }}>
            {ANIMALS.map((dyr, i) => dyr.at === "near" && <Animal key={i} i={i} up={up} on={on} />)}
          </motion.div>

          {/* The footer's top edge, scalloped, rising into the grass */}
          <Strip n={5} up={up} x={nearX} top={540} h={H}>{LIP_ART}</Strip>

          <div className={`${s.fade} absolute inset-0`} data-up={up}>
            <Cloud x={1150} y={84} w={110} drift={30} time={34} on={on} />
            <Cloud x={1860} y={52} w={126} drift={-36} time={28} on={on} />
          </div>
        </div>
      </div>
    </section>
  );
}

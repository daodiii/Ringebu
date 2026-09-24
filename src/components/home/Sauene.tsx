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
 * with a trodden path through it towards you. The sheep lift their heads now
 * and then (one is black and one brown, as spælsau are), and a tap makes one
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

/* ── The sheep ── */

type Sau = {
  x: number; y: number; k: number; face: 1 | -1; near: boolean;
  wool: string; top: string; head: string; eye: string; bell?: boolean; t: number; delay: number;
};

const WHITE = { wool: "#F4F1E8", top: "#FFFFFF", head: "#DDD4C5", eye: "#2B2725" };
const SHEEP: Sau[] = [
  { x: 1170, y: 476, k: 1.06, face: 1, near: false, ...WHITE, t: 8, delay: 1 },
  { x: 1566, y: 456, k: 1.0, face: -1, near: false, ...WHITE, t: 7, delay: 3 },
  { x: 1680, y: 448, k: 0.95, face: 1, near: false, wool: "#3F3A38", top: "#4E4845", head: "#35302D", eye: "#E9E4D8", t: 9, delay: 0.5 },
  { x: 1770, y: 442, k: 0.62, face: 1, near: false, ...WHITE, t: 6, delay: 2 },
  { x: 1906, y: 428, k: 0.86, face: -1, near: false, wool: "#9A7B62", top: "#A98B72", head: "#8A6E58", eye: "#2B2725", t: 8.5, delay: 4.2 },
  { x: 1236, y: 546, k: 1.5, face: 1, near: true, ...WHITE, bell: true, t: 8.5, delay: 1.8 },
  { x: 1660, y: 550, k: 1.66, face: -1, near: true, ...WHITE, bell: true, t: 7.5, delay: 2.6 },
  { x: 1790, y: 556, k: 0.96, face: -1, near: true, ...WHITE, t: 6.5, delay: 4 },
];

/** Each sheep drawn once: its box on the strip, the body, and the head apart, since the head moves. */
const SHEEP_ART = SHEEP.map((sau, i) => {
  const { k, face } = sau;
  const box = { x: r2(sau.x - 34 * k), y: r2(sau.y - 50 * k), w: r2(72 * k), h: r2(54 * k) };
  const view = `${box.x} ${box.y} ${box.w} ${box.h}`;
  const place = `translate(${sau.x} ${sau.y}) scale(${r2(k * face)} ${k})`;
  const body = bumpy(0, -25, 23, 13.5, 11, 10 + i, 0.45);
  return {
    box,
    // The neck, which the head turns round, in px from the box's corner (a strip unit is a px here)
    neck: `${r2(sau.x + 16 * k * face - box.x)}px ${r2(sau.y - 26 * k - box.y)}px`,
    body: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
        <g transform={place}>
          <PaperShadow>
            <path d={body} />
          </PaperShadow>
          {[-15, -9, 8, 14].map((lx) => <rect key={lx} x={lx - 1.6} y={-16} width={3.2} height={16} rx={1} fill="#4A4540" />)}
          <path d={body} fill={sau.wool} />
          <path d={bumpy(-2, -29, 17, 8, 9, 30 + i, 0.5)} fill={sau.top} />
          <path d={bumpy(-23, -28, 3.2, 3.2, 5, 50 + i, 0.6)} fill={sau.wool} />
          {sau.bell && (
            <>
              <NoShadow>
                <path d="M12,-21 Q16,-16 21,-18" stroke="#6E4E3A" strokeWidth={1.4} fill="none" />
              </NoShadow>
              <circle cx={17} cy={-15} r={2.8} fill="#D9B45C" />
            </>
          )}
        </g>
      </svg>
    ),
    head: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
        <g transform={place}>
          <ellipse cx={16} cy={-29} rx={5.4} ry={2.4} fill={sau.head} transform="rotate(-24 16 -29)" />
          <ellipse cx={16.4} cy={-29.2} rx={3.2} ry={1.1} fill="#E7B8B0" transform="rotate(-24 16 -29)" />
          <path d="M15,-29 Q28,-27 32,-15 Q34,-7 28,-5 Q22,-5 18,-13 Z" fill={sau.head} />
          <path d={bumpy(20, -30, 5, 3.6, 6, 70 + i, 0.6)} fill={sau.top} />
          <circle cx={25.5} cy={-19} r={1.2} fill={sau.eye} />
          <ellipse cx={30} cy={-8} rx={2.6} ry={1.8} fill="#8F8278" opacity={0.7} />
        </g>
      </svg>
    ),
  };
});

/** A sheep on small layers of its own: it pops up onto the grass, grazes, and hops when tapped. */
const Sheep = memo(function Sheep({ i, up, on }: { i: number; up: boolean; on: boolean }) {
  const sau = SHEEP[i];
  const art = SHEEP_ART[i];
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
          keeps the sheep out of the tab order, as the picture is hidden
          from screen readers. */}
      <motion.div className="absolute inset-0 cursor-pointer" whileTap={{ y: -12 }} tabIndex={-1}>
        {art.body}
        <div
          className={`${s.head} ${s.graze}`}
          data-on={on}
          style={{
            transformOrigin: art.neck,
            ["--t" as string]: `${sau.t}s`,
            ["--delay" as string]: `${sau.delay}s`,
            // A head facing left lifts the other way round
            ["--lift" as string]: sau.face > 0 ? "-40deg" : "40deg",
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

          {/* The sheep up the slope, behind the fence */}
          <motion.div className="absolute bottom-0 left-0 right-0 h-[580px]" style={{ x: pastureX }}>
            {SHEEP.map((sau, i) => !sau.near && <Sheep key={i} i={i} up={up} on={on} />)}
          </motion.div>

          <Strip n={4} up={up} x={nearX} top={500} h={H}>{NEAR_ART}</Strip>

          {/* And the ones this side of it, nearest you */}
          <motion.div className="absolute bottom-0 left-0 right-0 h-[580px]" style={{ x: nearX }}>
            {SHEEP.map((sau, i) => sau.near && <Sheep key={i} i={i} up={up} on={on} />)}
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

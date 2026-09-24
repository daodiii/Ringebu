"use client";

import { memo, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { NoShadow, PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { AVSNITT, TITTEL } from "./tekst";

/**
 * Om oss, "Enga". The owner's own words, and under them a meadow of the
 * flowers that grow along the valley: prestekrage, blåklokke, rødkløver,
 * smørblomst, geitrams. The ground dips in the middle and rises at the sides,
 * a smile, so the tallest flowers stand at the edges and frame the text. When
 * the meadow comes into view it grows, left to right. The flowers turn
 * towards you, wherever the pointer (or a finger) is; now and then a breeze
 * goes through; a bumblebee works its way along. A tap plants a new flower
 * where you tapped.
 */

/**
 * Coordinates are rounded to two decimals: positions from sin and cos differ
 * between the server and the browser in the last decimals, and an unrounded
 * path would not hydrate.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

/** A seeded random generator, so the meadow is sown the same way on every render. */
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const VW = 1600;
const VH = 520;
const WIDE = { x: 0, y: 0, w: VW, h: VH };
/** On a phone, a closer look at the middle of the meadow. */
const NARROW = { x: 430, y: 250, w: 740, h: 270 };

const SMALL = "(max-width: 767px)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(SMALL);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const useNarrow = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(SMALL).matches, () => false);

/* ── The ground: three strips, each lower in the middle than at the sides ── */

const smil = (mid: number, rise: number) => (x: number) => mid - rise * ((x - 800) / 800) ** 2;
const GROUND = [smil(452, 92), smil(478, 82), smil(500, 62)];
const GROUND_FILL = ["#D3DFBF", "#C4D5A8", "#B5CA96"];

function groundPath(g: (x: number) => number) {
  let d = `M-60,${VH + 20}`;
  for (let x = -60; x <= VW + 60; x += 40) d += ` L${x},${r2(g(x))}`;
  return `${d} L${VW + 60},${VH + 20} Z`;
}
function lip(y: number, r: number) {
  let d = `M-60,${VH + 20} L-60,${y}`;
  for (let x = -60; x < VW + 60; x += r * 2) d += ` Q${x + r},${r2(y - r * 0.9)} ${x + r * 2},${y}`;
  return `${d} L${VW + 60},${VH + 20} Z`;
}
const GROUND_D = GROUND.map(groundPath);
const LIP = lip(508, 13);

/* ── Flowers ── */

type Art = "prestekrage" | "blaklokke" | "rodklover" | "smorblomst" | "geitrams" | "gress" | "marikape";
type Blomst = {
  id: number;
  art: Art;
  x: number;
  y: number;
  /** Stem length, and the size of the head. */
  h: number;
  s: number;
  row: number;
  bend: number;
};

const GREEN = ["#7FA06A", "#6F9A76", "#8DAE72"];

function Stilk({ h, bend, fill, w = 1.6 }: { h: number; bend: number; fill: string; w?: number }) {
  const top = r2(bend * 0.6);
  return (
    <path
      d={`M${-w},0 Q${r2(bend - w * 0.7)},${r2(-h / 2)} ${r2(top - w / 2)},${r2(-h)} L${r2(top + w / 2)},${r2(-h)} Q${r2(bend + w * 0.7)},${r2(-h / 2)} ${w},0 Z`}
      fill={fill}
    />
  );
}

function Blad({ x, y, len, angle, fill }: { x: number; y: number; len: number; angle: number; fill: string }) {
  const l = len;
  return (
    <path
      d={`M0,0 C${r2(l * 0.3)},${r2(-l * 0.24)} ${r2(l * 0.72)},${r2(-l * 0.22)} ${l},0 C${r2(l * 0.72)},${r2(l * 0.2)} ${r2(l * 0.3)},${r2(l * 0.22)} 0,0 Z`}
      transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(angle)})`}
      fill={fill}
    />
  );
}

function Prestekrage({ h, s, bend, green }: { h: number; s: number; bend: number; green: string }) {
  const hx = r2(bend * 0.6);
  return (
    <>
      <Stilk h={h} bend={bend} fill={green} />
      <Blad x={bend * 0.2} y={-h * 0.28} len={16 * s} angle={-28} fill={green} />
      <Blad x={bend * 0.35} y={-h * 0.5} len={13 * s} angle={-152} fill={green} />
      <g transform={`translate(${hx} ${r2(-h)}) scale(${s})`} className="blomst-hode">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx={0} cy={-8.6} rx={2.9} ry={7.2} transform={`rotate(${i * 30})`} fill="#FFFFFF" />
        ))}
        <circle r={5.4} fill="#F2C94C" />
        <circle r={2.6} fill="#E2AE36" />
      </g>
    </>
  );
}

const BELL =
  "M-5,-10 C-6,-4 -7,2 -8.4,6 L-5.2,4.2 L-2.6,7.2 L0,5.2 L2.6,7.2 L5.2,4.2 L8.4,6 C7,2 6,-4 5,-10 C3,-12.2 -3,-12.2 -5,-10 Z";

function Blaklokke({ h, s, bend, green }: { h: number; s: number; bend: number; green: string }) {
  const tx = r2(bend * 0.6);
  const ty = r2(-h);
  const dir = bend >= 0 ? 1 : -1;
  return (
    <>
      <Stilk h={h} bend={bend} fill={green} w={1.3} />
      <Blad x={bend * 0.15} y={-h * 0.2} len={14 * s} angle={-40} fill={green} />
      <NoShadow>
        <path
          d={`M${tx},${ty} Q${r2(tx + 9 * dir * s)},${r2(ty - 11 * s)} ${r2(tx + 15 * dir * s)},${r2(ty + 2 * s)} M${r2(tx - 1)},${r2(ty + h * 0.3)} Q${r2(tx - 9 * dir * s)},${r2(ty + h * 0.3 - 10 * s)} ${r2(tx - 13 * dir * s)},${r2(ty + h * 0.3 + 3 * s)}`}
          fill="none"
          stroke={green}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </NoShadow>
      <g transform={`translate(${r2(tx + 15 * dir * s)} ${r2(ty + 12 * s)}) scale(${s})`} className="blomst-hode">
        <path d={BELL} fill="#8EA5DA" />
        <path d="M-3,-9 C-3.6,-4 -4,0 -4.6,4" fill="none" stroke="#B5C6EC" strokeWidth={1.4} strokeLinecap="round" />
      </g>
      <g transform={`translate(${r2(tx - 13 * dir * s)} ${r2(ty + h * 0.3 + 12 * s)}) scale(${r2(s * 0.8)})`}>
        <path d={BELL} fill="#9C8BC4" />
      </g>
    </>
  );
}

function Rodklover({ h, s, bend, green }: { h: number; s: number; bend: number; green: string }) {
  const hx = r2(bend * 0.6);
  const leaf = (x: number, y: number, sc: number) => (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(sc)})`}>
      {[-50, 0, 50].map((a) => (
        <ellipse key={a} cx={0} cy={-7} rx={4.4} ry={7} transform={`rotate(${a})`} fill={green} />
      ))}
    </g>
  );
  return (
    <>
      <Stilk h={h} bend={bend} fill={green} />
      {leaf(bend * 0.2, -h * 0.35, s)}
      {leaf(bend * 0.45, -h * 0.72, s * 0.8)}
      <g transform={`translate(${hx} ${r2(-h - 4 * s)}) scale(${s})`} className="blomst-hode">
        <circle r={9.4} fill="#D98FB2" />
        {[-60, -30, 0, 30, 60].map((a, i) => (
          <ellipse key={a} cx={0} cy={-6.4} rx={1.8} ry={3.4} transform={`rotate(${a})`} fill={i % 2 ? "#E8AECB" : "#C2729B"} />
        ))}
        <ellipse cx={-4} cy={3} rx={1.8} ry={3} transform="rotate(30)" fill="#C2729B" />
        <ellipse cx={4} cy={3} rx={1.8} ry={3} transform="rotate(-30)" fill="#E8AECB" />
        <path d="M-9,5 C-5,11 5,11 9,5 C5,8 -5,8 -9,5 Z" fill={green} />
      </g>
    </>
  );
}

const CUP = "M-7,-3 C-8.2,-10 -3.4,-13 0,-12 C3.4,-13 8.2,-10 7,-3 C4,0.4 -4,0.4 -7,-3 Z";

function Smorblomst({ h, s, bend, green }: { h: number; s: number; bend: number; green: string }) {
  const hx = r2(bend * 0.6);
  const fork = -h * 0.66;
  const bx = r2(bend * 0.4 + 16 * s);
  const by = r2(-h * 0.84);
  return (
    <>
      <Stilk h={h} bend={bend} fill={green} w={1.3} />
      <NoShadow>
        <path d={`M${r2(bend * 0.4)},${r2(fork)} Q${r2(bend * 0.4 + 10 * s)},${r2(fork - 10)} ${bx},${by}`} fill="none" stroke={green} strokeWidth={1.5} strokeLinecap="round" />
      </NoShadow>
      <Blad x={bend * 0.2} y={-h * 0.3} len={12 * s} angle={-150} fill={green} />
      <g transform={`translate(${hx} ${r2(-h)}) scale(${s})`} className="blomst-hode">
        <path d={CUP} fill="#F2C94C" />
        <path d="M-4,-8 C-3,-10.5 1,-11 2,-9 C0,-8.4 -2,-8 -4,-8 Z" fill="#F8E08E" />
      </g>
      <g transform={`translate(${bx} ${by}) scale(${r2(s * 0.8)})`}>
        <path d={CUP} fill="#F2C94C" />
      </g>
    </>
  );
}

function Geitrams({ h, s, bend, green }: { h: number; s: number; bend: number; green: string }) {
  const spike = Array.from({ length: 9 }, (_, j) => {
    const f = 0.56 + j * 0.052;
    const x = r2(bend * f * 0.9 + (j % 2 ? 5 : -5) * s * (1 - j * 0.07));
    const y = r2(-h * f);
    return { x, y, r: r2(s * (1 - j * 0.07)), bud: j > 5 };
  });
  return (
    <>
      <Stilk h={h} bend={bend} fill={green} w={1.8} />
      {[0.14, 0.26, 0.38, 0.48].map((f, k) => (
        <Blad key={f} x={bend * f * 0.8} y={-h * f} len={22 * s} angle={k % 2 ? -160 : -20} fill={green} />
      ))}
      {spike.map((p, k) =>
        p.bud ? (
          <ellipse key={k} cx={p.x} cy={p.y} rx={2.4 * p.r} ry={4 * p.r} fill="#B9648C" />
        ) : (
          <g key={k} transform={`translate(${p.x} ${p.y}) scale(${p.r})`}>
            {[45, 135, 225, 315].map((a) => (
              <ellipse key={a} cx={0} cy={-3.6} rx={2.8} ry={4} transform={`rotate(${a})`} fill={k % 2 ? "#E596BA" : "#D97BA6"} />
            ))}
          </g>
        )
      )}
    </>
  );
}

function Gress({ h, bend, green, seed }: { h: number; bend: number; green: string; seed: number }) {
  const rand = rng(seed);
  return (
    <>
      {Array.from({ length: 4 }, (_, i) => {
        const x0 = r2((i - 1.5) * 3);
        const l = r2(h * (0.55 + rand() * 0.45));
        const b = r2(bend * 0.5 + (i - 1.5) * 5 + (rand() - 0.5) * 8);
        return (
          <path
            key={i}
            d={`M${r2(x0 - 1.3)},0 Q${r2(x0 + b)},${r2(-l / 2)} ${r2(x0 + b * 1.5)},${-l} Q${r2(x0 + b + 0.9)},${r2(-l / 2)} ${r2(x0 + 1.3)},0 Z`}
            fill={i % 2 ? green : "#A3BD74"}
          />
        );
      })}
    </>
  );
}

function Marikape({ s }: { s: number }) {
  const blad = (x: number, y: number, r: number, fill: string) => {
    let d = "";
    for (let i = 0; i <= 9; i++) {
      const a = Math.PI + (i / 9) * Math.PI;
      const px = r2(x + Math.cos(a) * r);
      const py = r2(y + Math.sin(a) * r * 0.8);
      d += i === 0 ? `M${px},${py}` : ` Q${r2(x + Math.cos(a - 0.17) * r * 1.16)},${r2(y + Math.sin(a - 0.17) * r * 0.93)} ${px},${py}`;
    }
    return <path d={`${d} Q${x},${r2(y + r * 0.5)} ${r2(x - r)},${y} Z`} fill={fill} />;
  };
  return (
    <g transform={`scale(${s})`}>
      {blad(-10, -8, 15, "#9DBB82")}
      {blad(12, -6, 13, "#A9C38C")}
      {blad(0, -12, 17, "#B4CB96")}
    </g>
  );
}

function Tegning({ f }: { f: Blomst }) {
  const green = GREEN[f.id % 3];
  switch (f.art) {
    case "prestekrage":
      return <Prestekrage h={f.h} s={f.s} bend={f.bend} green={green} />;
    case "blaklokke":
      return <Blaklokke h={f.h} s={f.s} bend={f.bend} green={green} />;
    case "rodklover":
      return <Rodklover h={f.h} s={f.s} bend={f.bend} green={green} />;
    case "smorblomst":
      return <Smorblomst h={f.h} s={f.s} bend={f.bend} green={green} />;
    case "geitrams":
      return <Geitrams h={f.h} s={f.s} bend={f.bend} green={green} />;
    case "gress":
      return <Gress h={f.h} bend={f.bend} green={green} seed={f.id + 3} />;
    case "marikape":
      return <Marikape s={f.s} />;
  }
}

const pick = <T,>(rand: () => number, xs: readonly T[]) => xs[Math.floor(rand() * xs.length)];

/** The meadow, sown the same way on every render. */
const ENGA: Blomst[] = (() => {
  const rand = rng(19);
  const out: Blomst[] = [];
  const rows = [
    { n: 36, hMin: 44, hMax: 96, s: 0.88, tall: 110 },
    { n: 28, hMin: 64, hMax: 134, s: 1.14, tall: 210 },
    { n: 21, hMin: 40, hMax: 104, s: 1.34, tall: 90 },
  ];
  rows.forEach((r, row) => {
    for (let k = 0; k < r.n; k++) {
      const x = r2(-30 + (k + 0.1 + rand() * 0.8) * (1660 / r.n));
      // 0 in the middle, under the text; 1 at the sides, where the flowers may grow tall
      const edge = Math.min(1, Math.max(0, (Math.abs(x - 800) - 360) / 400));
      const tallArts: Art[] = ["geitrams", "geitrams", "blaklokke", "prestekrage"];
      const arts: Art[][] = [
        ["prestekrage", "smorblomst", "rodklover", "gress", "gress", "blaklokke"],
        ["prestekrage", "blaklokke", "rodklover", "smorblomst", "gress", "prestekrage"],
        ["marikape", "prestekrage", "gress", "smorblomst", "rodklover", "blaklokke"],
      ];
      const art = row === 1 && edge > 0.45 ? pick(rand, tallArts) : pick(rand, arts[row]);
      const h = r2(r.hMin + rand() * (r.hMax - r.hMin) + edge * r.tall * (0.55 + rand() * 0.45));
      out.push({
        id: out.length,
        art,
        x,
        y: r2(GROUND[row](x)),
        h,
        s: r2(r.s * (art === "geitrams" ? 1.1 : 1) * (0.9 + rand() * 0.2)),
        row,
        bend: r2((rand() - 0.5) * 16),
      });
    }
  });
  return out;
})();

/* ── The meadow's motion: it grows once, and now and then a breeze goes through ── */

/**
 * Both cross the meadow from left to right, each flower a moment after the
 * one to its left. They are Web Animations that start and end together for
 * every flower, each holding still until its own moment: that way Chrome
 * runs them on the compositor. With a delay of its own on every flower
 * (framer's, or a CSS animation-delay) the main thread drew every frame
 * again, more than a phone could keep up with.
 */
const VEKST_MS = 2800; // the last flower starts at about 1.6 s and its spring takes 1.1 s
const VIND_MS = 3100; // the last flower starts at about 1.3 s and sways for 1.7 s

/** framer's springs (mass 1) sampled into CSS easing: the flowers stiffness 90 damping 12 over 1.1 s, the ground 80 and 14 over 0.9 s. */
const FJAER_BLOMST =
  "linear(0, 0.0304, 0.1082, 0.2155, 0.3378, 0.464, 0.5856, 0.6969, 0.7944, 0.8763, 0.9423, 0.9931, 1.0301, 1.0549, 1.0695, 1.0761, 1.0764, 1.0722, 1.0651, 1.0562, 1.0465, 1.0369, 1.0279, 1.0198, 1.0128, 1.0071, 1.0025, 0.9991, 0.9967, 0.9952, 0.9944, 0.9941, 0.9942, 0.9947, 0.9953, 0.996, 0.9968, 0.9975, 0.9981, 0.9987, 1)";
const FJAER_JORD =
  "linear(0, 0.0182, 0.0655, 0.1324, 0.2112, 0.2961, 0.3824, 0.4667, 0.5468, 0.6209, 0.6881, 0.7479, 0.8003, 0.8455, 0.8838, 0.9158, 0.942, 0.9632, 0.9799, 0.9928, 1.0025, 1.0094, 1.0142, 1.0172, 1.0188, 1.0193, 1.019, 1.0181, 1.0168, 1.0153, 1.0137, 1.012, 1.0104, 1.0088, 1.0074, 1.0061, 1.0049, 1.0039, 1.003, 1.0023, 1)";

/** The springs, or a near cubic-bezier where the browser has no linear() easing (animate() would throw). */
function fjaerer() {
  const linear = CSS.supports("animation-timing-function", "linear(0, 1)");
  return {
    blomst: linear ? FJAER_BLOMST : "cubic-bezier(0.34, 1.45, 0.64, 1)",
    jord: linear ? FJAER_JORD : "cubic-bezier(0.34, 1.2, 0.64, 1)",
  };
}

/** Where `ms` falls in a window of `total` ms, as a keyframe offset. */
const ved = (ms: number, total: number) => Math.min(1, Math.max(0, ms / total));

/** Grows one piece from its foot, `delay` ms into a window of `total` ms: the height by a spring, the paper fading in. */
function vokse(
  el: Element,
  delay: number,
  total: number,
  { fra, ms, fjaer, fade, fadeEase }: { fra: number; ms: number; fjaer: string; fade: number; fadeEase: string }
) {
  el.animate(
    [
      { transform: `scaleY(${fra})`, offset: 0 },
      { transform: `scaleY(${fra})`, offset: ved(delay, total), easing: fjaer },
      { transform: "scaleY(1)", offset: ved(delay + ms, total) },
      { transform: "scaleY(1)", offset: 1 },
    ],
    { duration: total }
  );
  el.animate(
    [
      { opacity: 0, offset: 0 },
      { opacity: 0, offset: ved(delay, total), easing: fadeEase },
      { opacity: 1, offset: ved(delay + fade, total) },
      { opacity: 1, offset: 1 },
    ],
    { duration: total }
  );
}

const blomstVekst = (fjaer: string) => ({ fra: 0, ms: 1100, fjaer, fade: 200, fadeEase: "ease-in-out" });

/** The whole meadow grows, flowers and ground, each piece at its data-vekst (seconds). */
function voks(svg: SVGSVGElement) {
  const f = fjaerer();
  svg.querySelectorAll<SVGGElement>(".enga-vekst").forEach((g) => vokse(g, Number(g.dataset.vekst) * 1000, VEKST_MS, blomstVekst(f.blomst)));
  svg.querySelectorAll<SVGGElement>(".enga-jord").forEach((g) =>
    vokse(g, Number(g.dataset.vekst) * 1000, VEKST_MS, { fra: 0.2, ms: 900, fjaer: f.jord, fade: 900, fadeEase: f.jord })
  );
}

/** Each flower's sway, made at its first breeze and played again at the next: a fifteenth of the work. */
const svaie = new WeakMap<Element, Animation>();

/** A breeze: every flower sways once, 1.7 s, from its data-vind (seconds). */
function blas(svg: SVGSVGElement) {
  svg.querySelectorAll<SVGGElement>(".enga-vind").forEach((g) => {
    const made = svaie.get(g);
    if (made) {
      made.play();
      return;
    }
    const d = Number(g.dataset.vind) * 1000;
    const sway = g.animate(
      [
        { transform: "rotate(0deg)", offset: 0 },
        { transform: "rotate(0deg)", offset: ved(d, VIND_MS), easing: "ease-in-out" },
        { transform: "rotate(7deg)", offset: ved(d + 1700 / 3, VIND_MS), easing: "ease-in-out" },
        { transform: "rotate(-2.5deg)", offset: ved(d + 3400 / 3, VIND_MS), easing: "ease-in-out" },
        { transform: "rotate(0deg)", offset: ved(d + 1700, VIND_MS) },
        { transform: "rotate(0deg)", offset: 1 },
      ],
      { duration: VIND_MS }
    );
    svaie.set(g, sway);
  });
}

/* ── One flower: it leans to the pointer, sways in the breeze, and grows when seen ── */

/**
 * Framer moves only the lean, which follows the pointer; the growing and the
 * breeze are the Web Animations above. Memo, so planting a flower does not
 * redraw the other 85.
 */
const Plante = memo(function Plante({
  f,
  aim,
  pull,
  planted,
}: {
  f: Blomst;
  aim: MotionValue<number>;
  pull: MotionValue<number>;
  planted?: boolean;
}) {
  // Towards the pointer, most for flowers a little way off, none for the one right under it.
  const rotate = useTransform([aim, pull], ([a, p]) => {
    const dx = (a as number) - f.x;
    const reach = f.art === "marikape" ? 0.3 : 1;
    return r2((p as number) * reach * 20 * (dx / (Math.abs(dx) + 170)) * Math.exp(-Math.abs(dx) / 1100));
  });
  // A planted flower grows at once, before its first frame is painted.
  const vekstRef = useRef<SVGGElement | null>(null);
  useLayoutEffect(() => {
    if (planted && vekstRef.current) vokse(vekstRef.current, 0, 1100, blomstVekst(fjaerer().blomst));
  }, [planted]);
  return (
    <motion.g style={{ x: f.x, y: f.y, rotate, transformBox: "view-box", originX: "0px", originY: "0px" }}>
      {/* The breeze reaches a flower later the further right it stands, and
          the meadow grows the same way, row after row. */}
      <g className="enga-vind" data-vind={r2((f.x / VW) * 1.3)}>
        <g className="enga-vekst" data-vekst={planted ? 0 : r2(0.25 + (f.x / VW) * 1.1 + f.row * 0.12)} ref={vekstRef}>
          <PaperShadow dy={3}>
            <Tegning f={f} />
          </PaperShadow>
          <Tegning f={f} />
        </g>
      </g>
    </motion.g>
  );
});

/* ── The bumblebee ── */

function Humle({ on }: { on: boolean }) {
  return (
    <div className="humle-bane pointer-events-none absolute inset-0" data-on={on} aria-hidden="true">
      <div className="absolute left-0 top-0 w-[34px] -translate-x-1/2 -translate-y-1/2 md:w-[40px]">
        <div className="humle-snu">
          <div className="humle-dupp relative">
            {/* The wings are an SVG of their own, behind the body: beating inside
                the body's SVG, they had the whole bee drawn again at every beat. */}
            <svg viewBox="-22 -18 44 34" className="humle-vinger absolute inset-0 h-full w-full overflow-visible">
              <ellipse cx={-3} cy={-10} rx={6} ry={9} transform="rotate(-24 -3 -10)" fill="#FFFFFF" opacity={0.85} />
              <ellipse cx={4} cy={-10} rx={5} ry={8} transform="rotate(18 4 -10)" fill="#FFFFFF" opacity={0.7} />
            </svg>
            <svg viewBox="-22 -18 44 34" className="relative block h-auto w-full overflow-visible">
              <PaperShadow dy={2}>
                <ellipse cx={0} cy={0} rx={11} ry={8.4} />
              </PaperShadow>
              <ellipse cx={0} cy={0} rx={11} ry={8.4} fill="#F2C94C" />
              <path d="M-4,-8 C-6,-3 -6,3 -4,8 L1,8.2 C-1,3 -1,-3 1,-8.2 Z" fill="#2B2A28" />
              <path d="M-11,-2 C-11.6,0 -11.6,2 -10.6,3.4 C-9,2 -9,-1 -9.6,-3.4 Z" fill="#FFFFFF" />
              <circle cx={10} cy={-1} r={5.4} fill="#2B2A28" />
              <circle cx={12} cy={-2.4} r={1.1} fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── The page ── */

export function Enga() {
  const reduced = useReducedMotion() ?? false;
  const narrow = useNarrow();
  const vb = narrow ? NARROW : WIDE;
  const bandRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  // False in the first render on server and browser alike, so data-grown hydrates;
  // with reduced motion the CSS shows the grown meadow without it.
  const seen = useInView(bandRef, { once: true, margin: "0px 0px -15% 0px" });
  const inView = useInView(bandRef);

  // The meadow grows when first seen, before that frame is painted: until then
  // the CSS keeps it flat, and without its growing it would show full height.
  const grew = useRef(false);
  useLayoutEffect(() => {
    if (!seen || reduced || grew.current || !svgRef.current) return;
    grew.current = true;
    voks(svgRef.current);
  }, [seen, reduced]);

  // Where the pointer is, in meadow units, and how much the flowers heed it.
  const aimRaw = useMotionValue(800);
  const pullRaw = useMotionValue(0);
  const aim = useSpring(aimRaw, { stiffness: 60, damping: 18 });
  const pull = useSpring(pullRaw, { stiffness: 40, damping: 16 });

  const [planted, setPlanted] = useState<Blomst[]>([]);
  const nextId = useRef(1000);
  const letGo = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(letGo.current), []);

  // A breeze goes through now and then, while the meadow is on screen.
  useEffect(() => {
    if (!seen || reduced || !inView) return;
    const blow = () => svgRef.current && blas(svgRef.current);
    const first = setTimeout(blow, 3200);
    const every = setInterval(blow, 9000);
    return () => {
      clearTimeout(first);
      clearInterval(every);
    };
  }, [seen, reduced, inView]);

  // A finger holds the flowers a little after it lifts, or after the page takes the touch for a scroll.
  const letGoSoon = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    clearTimeout(letGo.current);
    letGo.current = setTimeout(() => pullRaw.set(0), 1400);
  };

  const toMeadow = (clientX: number) => {
    const r = bandRef.current?.getBoundingClientRect();
    if (!r) return 800;
    const scale = Math.max(r.width / vb.w, r.height / vb.h);
    return vb.x + vb.w / 2 + (clientX - (r.left + r.width / 2)) / scale;
  };

  const plant = (clientX: number) => {
    if (reduced) return;
    const x = r2(toMeadow(clientX));
    const rand = rng(Math.round(x * 7) + planted.length * 13 + 1);
    const art = pick(rand, ["prestekrage", "blaklokke", "rodklover", "smorblomst"] as const);
    const edge = Math.min(1, Math.max(0, (Math.abs(x - 800) - 360) / 400));
    const f: Blomst = {
      id: nextId.current++,
      art,
      x,
      y: r2(GROUND[2](x) + 2),
      h: r2(62 + rand() * 40 + edge * 80),
      s: r2(1.34 + rand() * 0.16),
      row: 2,
      bend: r2((rand() - 0.5) * 14),
    };
    setPlanted((p) => [...p.slice(-11), f]);
  };

  const rows = [0, 1, 2];
  return (
    <section
      className="relative overflow-hidden bg-[var(--color-paper)] text-[var(--color-text-primary)] md:min-h-[max(100svh,760px)]"
      onPointerMove={(e) => {
        if (reduced) return;
        if (e.pointerType === "mouse" || e.buttons) {
          aimRaw.set(toMeadow(e.clientX));
          pullRaw.set(1);
        }
      }}
      onPointerDown={(e) => {
        if (reduced || e.pointerType === "mouse") return;
        clearTimeout(letGo.current);
        aimRaw.jump(toMeadow(e.clientX));
        pullRaw.set(1);
      }}
      onPointerUp={letGoSoon}
      onPointerCancel={letGoSoon}
      onPointerLeave={(e) => {
        // A finger "leaves" the moment it lifts, so only the mouse lets go here.
        if (e.pointerType === "mouse") pullRaw.set(0);
      }}
    >
      <div className="relative z-10 mx-auto max-w-[720px] px-[var(--container-px,24px)] pt-28 text-center md:pt-36">
        <h1 className="display-section mx-auto max-w-[19ch] text-balance text-[var(--color-ink)]">{TITTEL}</h1>
        <div className="mx-auto mt-6 max-w-[40ch] md:mt-8">
          {AVSNITT.map((a, k) => (
            <p
              key={k}
              className={`${k === 0 ? "" : "mt-3"} text-balance text-[20px] leading-[1.45] tracking-[-0.01em] text-[var(--color-text-secondary)] md:text-[22px]`}
            >
              {a}
            </p>
          ))}
        </div>
      </div>

      <div
        ref={bandRef}
        className="relative mt-4 h-[300px] cursor-pointer select-none md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:h-[56svh]"
        style={{ perspective: 1200, perspectiveOrigin: "50% 40%" }}
        onClick={(e) => plant(e.clientX)}
      >
        <svg
          ref={svgRef}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          preserveAspectRatio="xMidYMax slice"
          className="enga absolute inset-0 h-full w-full overflow-visible"
          role="img"
          aria-label="En eng med prestekrage, blåklokke, rødkløver, smørblomst og geitrams"
          data-grown={seen || undefined}
        >
          {rows.map((row) => (
            <g key={row}>
              {ENGA.filter((f) => f.row === row).map((f) => (
                <Plante key={f.id} f={f} aim={aim} pull={pull} />
              ))}
              {row === 2 && planted.map((f) => <Plante key={f.id} f={f} aim={aim} pull={pull} planted />)}
              <g className="enga-jord" data-vekst={row * 0.1}>
                <PaperShadow dy={4}>
                  <path d={GROUND_D[row]} />
                </PaperShadow>
                <path d={GROUND_D[row]} fill={GROUND_FILL[row]} />
              </g>
            </g>
          ))}
          <PaperShadow dy={4}>
            <path d={LIP} />
          </PaperShadow>
          <path d={LIP} fill="#FCF9F2" />
        </svg>
        <Humle on={seen && !reduced && inView} />
      </div>
    </section>
  );
}

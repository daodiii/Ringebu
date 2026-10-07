"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NoShadow, PaperShadow } from "@/components/behandlinger/scenes/Papir";
import {
  Bjork, Blomst, Cloud, Gran, HEART, Strip, TOOTH, lip, r2, ridge, ridgeY, rng, snowcap, useLean, usePopUp, useShift, type Pts,
} from "@/components/home/landskap";
import { at, useLoop } from "@/components/kontakt/bevegelse";
import { RingKnapp } from "@/components/kontakt/Felles";
import s from "@/components/kontakt/kontakt.module.css";
import { PRISER, TEKST, kroner } from "./data";

/**
 * /priser, «Gardsutsalget». Fjell and a field with hay on the hesjer, and at
 * the edge of the field a little self-service stand of the kind that sells
 * strawberries by the road in summer. The price list is the sheet pinned up
 * under its striped awning; on the counter, carrots, strawberries, apples
 * and the clinic's cash box with the tooth on it. Two hens and a chick peck
 * in the grass in front. A tap sends a hen up in a flutter.
 *
 * Built the way Postkassa is: the drawing is made once at module scope, and
 * everything that moves is a layer of its own, moved by CSS or a Web
 * Animation (see landskap.tsx and kontakt/bevegelse.ts).
 */

const H = 360;
const SKY = "#EEF3EC";

/* ── The land, back to front, on a strip 2400 wide ── */

// Two fjell where the stand does not hide them: one over the field on the left, one past the stand on the right.
const FAR: Pts = [
  [0, 200], [140, 196], [300, 150], [420, 150], [560, 150], [700, 62], [820, 62], [940, 62], [1060, 170], [1180, 170],
  [1290, 170], [1390, 120], [1500, 120], [1650, 120], [1820, 70], [1960, 70], [2110, 70], [2270, 180], [2400, 180],
];
const MID: Pts = [
  [0, 250], [300, 238], [500, 232], [700, 240], [900, 248], [1100, 236], [1300, 230], [1500, 226], [1700, 232], [1900, 240],
  [2100, 236], [2250, 232], [2400, 238],
];
const FIELD: Pts = [[0, 270], [400, 264], [800, 262], [1200, 266], [1600, 262], [2000, 258], [2400, 262]];
const NEAR: Pts = [[0, 324], [400, 318], [800, 316], [1200, 318], [1600, 320], [2000, 316], [2400, 320]];

const SPRUCES = (() => {
  const rand = rng(23);
  const trees: { x: number; y: number; h: number }[] = [];
  for (const [a, b] of [[30, 760], [1480, 2380]] as const) {
    for (let x = a; x < b; x += 12 + rand() * 16) {
      trees.push({ x: r2(x), y: r2(ridgeY(MID, x) + 10 + rand() * 5), h: r2(22 + rand() * 24) });
    }
  }
  return trees;
})();

const TUFTS = (() => {
  const rand = rng(43);
  return Array.from({ length: 64 }, () => {
    const x = -200 + rand() * 2800;
    const y = ridgeY(NEAR, Math.max(0, Math.min(2400, x))) + 6 + rand() * 18;
    const h = 8 + rand() * 9;
    return `M${r2(x - 6)},${r2(y)} L${r2(x - 4)},${r2(y - h * 0.7)} L${r2(x - 1.5)},${r2(y - 2)} L${r2(x)},${r2(y - h)} L${r2(x + 2)},${r2(y - 2)} L${r2(x + 5)},${r2(y - h * 0.6)} L${r2(x + 6)},${r2(y)} Z`;
  });
})();

const DAISIES = (() => {
  const rand = rng(59);
  return Array.from({ length: 30 }, () => {
    const x = 200 + rand() * 2000;
    return { x: r2(x), y: r2(ridgeY(NEAR, x) + 10 + rand() * 18), r: r2(3.4 + rand() * 2) };
  });
})();

/** A hesje: hay hung up to dry on a fence of posts and wire, the way it is still done in the valley. */
function Hesje({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: number }) {
  const rand = rng(seed);
  const posts: number[] = [];
  for (let x = x0; x <= x1; x += 36) posts.push(x);
  let top = `M${x0 - 6},${y - 6} L${x0 - 5},${r2(y - 28)}`;
  for (let x = x0 + 6; x <= x1 + 6; x += 12) top += ` Q${r2(x - 6)},${r2(y - 33 - rand() * 3)} ${x},${r2(y - 29 - rand() * 2)}`;
  const hay = `${top} L${x1 + 6},${y - 6} Q${r2((x0 + x1) / 2)},${y - 2} ${x0 - 6},${y - 6} Z`;
  const strands = Array.from({ length: Math.floor((x1 - x0) / 9) }, (_, i) => {
    const x = x0 + 2 + i * 9 + rand() * 3;
    return `M${r2(x)},${r2(y - 27)} L${r2(x + 1.5)},${r2(y - 8)}`;
  });
  return (
    <g>
      {posts.map((x) => (
        <rect key={x} x={x - 2} y={y - 38} width={4} height={38} fill="#8A7258" />
      ))}
      <path d={hay} fill="#D9C78C" />
      <NoShadow>
        {strands.map((d, i) => (
          <path key={i} d={d} stroke="#C7B176" strokeWidth={1.4} strokeLinecap="round" />
        ))}
      </NoShadow>
    </g>
  );
}

const FAR_ART = (
  <>
    <path d={ridge(FAR, H)} fill="#D7E2E5" />
    <path d={snowcap(FAR, 700, 940, 30, 3)} fill="#F7FAFA" />
    <path d={snowcap(FAR, 1840, 2080, 26, 5)} fill="#F7FAFA" />
  </>
);
const MID_ART = (
  <>
    {SPRUCES.map((t, i) => (
      <Gran key={i} x={t.x} y={t.y} h={t.h} w={r2(t.h * 0.3)} tiers={4} fill="#6E9076" dark="#5D7F66" />
    ))}
    <path d={ridge(MID, H)} fill="#C6D7C3" />
  </>
);
const FIELD_ART = (
  <>
    <path d={ridge(FIELD, H)} fill="#CFE0A8" />
    <Hesje x0={610} x1={790} y={276} seed={11} />
    <Hesje x0={1830} x1={1974} y={272} seed={13} />
    <Bjork x={480} y={268} h={226} seed={31} lean={0.2} />
    <Bjork x={540} y={270} h={150} seed={37} lean={-0.3} />
    <Bjork x={2040} y={262} h={200} seed={41} lean={-0.2} />
  </>
);
const NEAR_ART = (
  <>
    <path d={ridge(NEAR, H)} fill="#B4CE8B" />
    <NoShadow>
      {TUFTS.map((d, i) => (
        <path key={i} d={d} fill={i % 3 ? "#A2C27B" : "#93B56E"} />
      ))}
    </NoShadow>
    {DAISIES.map((d, i) => (
      <Blomst key={i} x={d.x} y={d.y} r={d.r} seed={400 + i} />
    ))}
  </>
);
const LIP_ART = <path d={lip(346, 12, H)} fill="#FCF9F2" />;

/* ── The stand ── */

// The awning: twelve stripes on a slope, and a scalloped valance along its front edge.
const STRIPES = 12;
const AWNING_RED = "#CB7561";
const AWNING_CREAM = "#FBF6EC";
const AWNING = (() => {
  const parts = Array.from({ length: STRIPES }, (_, i) => {
    const t0 = 40 + (i * 920) / STRIPES;
    const t1 = 40 + ((i + 1) * 920) / STRIPES;
    const b0 = (i * 1000) / STRIPES;
    const b1 = ((i + 1) * 1000) / STRIPES;
    const fill = i % 2 ? AWNING_CREAM : AWNING_RED;
    return {
      slope: `M${r2(t0)},10 L${r2(t1)},10 L${r2(b1)},54 L${r2(b0)},54 Z`,
      flap: `M${r2(b0)},54 L${r2(b1)},54 L${r2(b1)},64 Q${r2((b0 + b1) / 2)},80 ${r2(b0)},64 Z`,
      fill,
    };
  });
  return (
    <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
      <PaperShadow dy={5}>
        <path d="M40,10 L960,10 L1000,54 L1000,72 L0,72 L0,54 Z" />
      </PaperShadow>
      {parts.map((p, i) => (
        <g key={i}>
          <path d={p.slope} fill={p.fill} />
          <path d={p.flap} fill={p.fill} />
        </g>
      ))}
      <NoShadow>
        <rect x={0} y={53} width={1000} height={2} fill="#B5604E" opacity={0.5} />
      </NoShadow>
      <rect x={30} y={2} width={940} height={9} rx={2} fill="#7A6450" />
    </svg>
  );
})();

// The clinic's little sign, standing on top of the awning.
const SKILT = (
  <svg viewBox="-20 -18 40 34" className="block h-full w-full overflow-visible">
    <PaperShadow dy={2.5}>
      <rect x={-18} y={-16} width={36} height={26} rx={2} />
      <rect x={-9} y={9} width={3} height={7} />
      <rect x={6} y={9} width={3} height={7} />
    </PaperShadow>
    <rect x={-9} y={9} width={3} height={7} fill="#5D493A" />
    <rect x={6} y={9} width={3} height={7} fill="#5D493A" />
    <rect x={-18} y={-16} width={36} height={26} rx={2} fill="#1E3438" />
    <rect x={-14} y={-12} width={28} height={18} rx={1} fill="#E9EFEE" />
    <g transform="translate(0 -3) scale(0.5)">
      <path d={TOOTH} fill="none" stroke="#1E3438" strokeWidth={3} />
      <path d={HEART} fill="#1E3438" />
    </g>
  </svg>
);

/* What is for sale on the counter: drawn in a box 600 × 96, standing on its foot at 96. */

function Kasse({ x, w, h }: { x: number; w: number; h: number }) {
  const y = 96 - h;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={2} fill="#B89B78" />
      <NoShadow>
        <rect x={x} y={r2(y + h / 3)} width={w} height={2} fill="#A3876A" />
        <rect x={x} y={r2(y + (2 * h) / 3)} width={w} height={2} fill="#A3876A" />
      </NoShadow>
      <rect x={x} y={y} width={6} height={h} fill="#A3876A" />
      <rect x={x + w - 6} y={y} width={6} height={h} fill="#A3876A" />
    </>
  );
}

const CARROTS = (() => {
  const rand = rng(71);
  return Array.from({ length: 7 }, (_, k) => {
    const x = r2(44 + k * 18 + (rand() - 0.5) * 4);
    const top = r2(46 + rand() * 6);
    const leaf = r2(18 + rand() * 10);
    return { x, top, leaf, lean: r2((rand() - 0.5) * 10) };
  });
})();

const BERRY = "M0,-6 C5,-6 7,-2 5,3 C3,7 1,8 0,8 C-1,8 -3,7 -5,3 C-7,-2 -5,-6 0,-6 Z";
const BERRIES = (() => {
  const rand = rng(83);
  const out: { x: number; y: number; dark: boolean }[] = [];
  for (const x0 of [192, 248]) {
    for (let k = 0; k < 4; k++) out.push({ x: r2(x0 + 8 + k * 11 + rand() * 2), y: r2(70 + rand() * 2), dark: rand() > 0.5 });
    for (let k = 0; k < 3; k++) out.push({ x: r2(x0 + 13 + k * 11 + rand() * 2), y: r2(63 + rand() * 2), dark: rand() > 0.5 });
  }
  return out;
})();

const APPLES = (() => {
  const colors = ["#C9584A", "#D9735A", "#A9C26A", "#C9584A", "#D9735A", "#C9584A"];
  const out: { x: number; y: number; c: string }[] = [];
  for (let k = 0; k < 6; k++) out.push({ x: 414 + k * 20, y: 60, c: colors[k] });
  for (let k = 0; k < 5; k++) out.push({ x: 424 + k * 20, y: 48, c: colors[(k + 2) % colors.length] });
  return out;
})();

function Varer() {
  return (
    <>
      {/* Carrots in a crate, their tops up */}
      <NoShadow>
        {CARROTS.map((c) => (
          <g key={c.x}>
            <path d={`M${c.x},${c.top} L${r2(c.x - 7 + c.lean)},${r2(c.top - c.leaf)}`} stroke="#7FA06A" strokeWidth={3} strokeLinecap="round" />
            <path d={`M${c.x},${c.top} L${r2(c.x + c.lean * 0.3)},${r2(c.top - c.leaf - 4)}`} stroke="#8DAE72" strokeWidth={3} strokeLinecap="round" />
            <path d={`M${c.x},${c.top} L${r2(c.x + 7 + c.lean)},${r2(c.top - c.leaf + 3)}`} stroke="#7FA06A" strokeWidth={3} strokeLinecap="round" />
          </g>
        ))}
      </NoShadow>
      {CARROTS.map((c) => (
        <path key={c.x} d={`M${r2(c.x - 7)},64 L${r2(c.x - 6)},${r2(c.top + 4)} Q${c.x},${r2(c.top - 2)} ${r2(c.x + 6)},${r2(c.top + 4)} L${r2(c.x + 7)},64 Z`} fill="#E8873F" />
      ))}
      <Kasse x={30} w={140} h={38} />

      {/* Strawberries in two green punnets */}
      {BERRIES.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y})`}>
          <path d={BERRY} fill={b.dark ? "#C9483F" : "#D9584A"} />
          <path d="M-4,-6 L0,-9 L4,-6 L0,-4 Z" fill="#7FA06A" />
        </g>
      ))}
      {[192, 248].map((x) => (
        <g key={x}>
          <path d={`M${x},72 L${x + 50},72 L${x + 46},96 L${x + 4},96 Z`} fill="#9DBB82" />
          <NoShadow>
            <rect x={x + 3} y={80} width={44} height={2} fill="#8BAA70" />
          </NoShadow>
        </g>
      ))}

      {/* The cash box, with the tooth on it */}
      <rect x={320} y={64} width={60} height={32} rx={3} fill="#2A5A62" />
      <rect x={318} y={59} width={64} height={9} rx={2} fill="#1F474E" />
      <NoShadow>
        <rect x={336} y={62} width={28} height={3} rx={1.5} fill="#0E2A30" />
        <g transform="translate(350 81) scale(0.62)">
          <path d={TOOTH} fill="none" stroke="#FFFFFF" strokeWidth={3} />
          <path d={HEART} fill="#FFFFFF" />
        </g>
      </NoShadow>

      {/* Apples, heaped in a crate */}
      {APPLES.map((a, i) => (
        <circle key={i} cx={a.x} cy={a.y} r={10} fill={a.c} />
      ))}
      <NoShadow>
        {APPLES.slice(6).map((a, i) => (
          <path key={i} d={`M${a.x},${a.y - 9} L${a.x + 2},${a.y - 14}`} stroke="#6B5A40" strokeWidth={1.6} strokeLinecap="round" />
        ))}
      </NoShadow>
      <Kasse x={402} w={130} h={34} />

      {/* Daisies in a jar */}
      <NoShadow>
        <path d="M560,74 Q557,58 555,42" stroke="#7FA06A" strokeWidth={2} fill="none" />
        <path d="M567,74 Q568,54 569,34" stroke="#7FA06A" strokeWidth={2} fill="none" />
        <path d="M574,74 Q578,60 582,44" stroke="#7FA06A" strokeWidth={2} fill="none" />
      </NoShadow>
      <Blomst x={555} y={42} r={7} seed={601} />
      <Blomst x={569} y={34} r={7.5} seed={602} />
      <Blomst x={582} y={44} r={6.5} seed={603} />
      <rect x={552} y={70} width={30} height={26} rx={5} fill="#DCEAE7" />
      <NoShadow>
        <rect x={556} y={74} width={4} height={16} rx={2} fill="#FFFFFF" opacity={0.7} />
      </NoShadow>
    </>
  );
}

const VARER = (
  <svg viewBox="0 0 600 96" className="block h-auto w-full overflow-visible">
    <PaperShadow dy={4}>
      <Varer />
    </PaperShadow>
    <Varer />
  </svg>
);

/* ── The hens ── */

type Fjaer = { body: string; wing: string; tail: string };
const HVIT: Fjaer = { body: "#FBF8F1", wing: "#E6DED0", tail: "#E9E2D5" };
const BRUN: Fjaer = { body: "#B8743F", wing: "#9C5F33", tail: "#6E4A2E" };

// A hen facing right, in a box 80 × 64, her feet at the foot. The head and neck
// are a layer of their own, turned round the foot of the neck to peck.
const HEN_BODY = "M16,40 C14,30 22,24 34,26 C44,28 50,32 58,34 C64,36 64,46 58,52 C52,58 40,60 30,58 C22,56 17,48 16,40 Z";
const HEN_TAIL = "M21,38 C12,32 8,22 10,11 C14,18 18,22 22,24 C20,18 20,12 24,7 C26,16 28,22 33,27 Z";
const HEN_WING = "M28,38 C34,33 46,34 50,40 C46,48 34,49 28,44 Z";
const HEN_NECK = "M50,37 C50,28 52,20 58,15 C62,13 66,15 67,20 C66,26 62,30 61,38 Z";

function HenBody({ f }: { f: Fjaer }) {
  return (
    <svg viewBox="0 0 80 64" className="absolute inset-0 h-full w-full overflow-visible">
      <PaperShadow dy={2.5}>
        <path d={HEN_TAIL} />
        <path d={HEN_BODY} />
      </PaperShadow>
      <NoShadow>
        <path d="M34,57 L33,63 M33,63 L29,64.5 M33,63 L37,64.5 M44,57 L45,63 M45,63 L41,64.5 M45,63 L49,64.5" stroke="#D9A040" strokeWidth={2.2} strokeLinecap="round" fill="none" />
      </NoShadow>
      <path d={HEN_TAIL} fill={f.tail} />
      <path d={HEN_BODY} fill={f.body} />
      <path d={HEN_WING} fill={f.wing} />
    </svg>
  );
}

function HenHead({ f }: { f: Fjaer }) {
  return (
    <svg viewBox="0 0 80 64" className="absolute inset-0 h-full w-full overflow-visible">
      <PaperShadow dy={2.5}>
        <path d={HEN_NECK} />
        <circle cx={62} cy={18} r={7} />
      </PaperShadow>
      <path d="M56,12 C55,7 59,6 60,9 C60,5 64,4 65,8 C66,5 70,6 69,10 C68,12 60,13 56,12 Z" fill="#D9654F" />
      <path d={HEN_NECK} fill={f.body} />
      <circle cx={62} cy={18} r={7} fill={f.body} />
      <path d="M68,16.5 L75,19.5 L68,22.5 Z" fill="#E8B14A" />
      <path d="M66,22 C65.5,26 68,28.5 69.2,25.4 C70,23 68.4,21.4 66,22 Z" fill="#D9654F" />
    </svg>
  );
}

const HONE = { hvit: { body: <HenBody f={HVIT} />, head: <HenHead f={HVIT} /> }, brun: { body: <HenBody f={BRUN} />, head: <HenHead f={BRUN} /> } };

// A chick, in a box 30 × 26.
const KYLLING_BODY = (
  <svg viewBox="0 0 30 26" className="absolute inset-0 h-full w-full overflow-visible">
    <PaperShadow dy={1.5}>
      <circle cx={13} cy={17} r={7.5} />
    </PaperShadow>
    <NoShadow>
      <path d="M11,23.5 L10.5,26 M16,23.5 L16.5,26" stroke="#D9A040" strokeWidth={1.4} strokeLinecap="round" />
    </NoShadow>
    <circle cx={13} cy={17} r={7.5} fill="#F2D36B" />
    <path d="M8,16 C10,13.5 14,13.5 16,16.5 C13,19 10,18.6 8,16 Z" fill="#E6C25A" />
  </svg>
);
const KYLLING_HEAD = (
  <svg viewBox="0 0 30 26" className="absolute inset-0 h-full w-full overflow-visible">
    <PaperShadow dy={1.5}>
      <circle cx={19} cy={9.5} r={5} />
    </PaperShadow>
    <circle cx={19} cy={9.5} r={5} fill="#F5DC7E" />
    <path d="M23.4,8.6 L27,10 L23.4,11.4 Z" fill="#E8A040" />
  </svg>
);

/** Two quick pecks at the grass, then the head comes up and looks about. */
function pecks(round: number, t0: number, deg: number): Keyframe[] {
  return [
    { offset: 0, transform: "rotate(0deg)" },
    { offset: at(t0, round), transform: "rotate(0deg)", easing: "cubic-bezier(0.5, 0, 0.8, 0.4)" },
    { offset: at(t0 + 0.22, round), transform: `rotate(${deg}deg)`, easing: "ease-out" },
    { offset: at(t0 + 0.48, round), transform: `rotate(${deg * 0.35}deg)`, easing: "cubic-bezier(0.5, 0, 0.8, 0.4)" },
    { offset: at(t0 + 0.66, round), transform: `rotate(${deg}deg)`, easing: "ease-out" },
    { offset: at(t0 + 1.1, round), transform: "rotate(0deg)" },
    { offset: at(t0 + 2.6, round), transform: "rotate(0deg)", easing: "ease-in-out" },
    { offset: at(t0 + 3, round), transform: `rotate(${-deg * 0.12}deg)` },
    { offset: at(t0 + 3.8, round), transform: `rotate(${-deg * 0.12}deg)`, easing: "ease-in-out" },
    { offset: at(t0 + 4.2, round), transform: "rotate(0deg)" },
    { offset: 1, transform: "rotate(0deg)" },
  ];
}
const PECK_HVIT = pecks(7, 0.6, 58);
const PECK_BRUN = pecks(8.2, 2.4, 58);
const PECK_KYLLING = pecks(4.6, 0.3, 40);

/** A hen in the grass. A tap (or click) sends her up in a flutter. */
function Hone({ kind, frames, round, up, on, className, delay }: {
  kind: keyof typeof HONE; frames: Keyframe[]; round: number; up: boolean; on: boolean; className: string; delay: string;
}) {
  const head = useLoop<HTMLDivElement>(frames, round, on);
  const hop = useRef<HTMLDivElement | null>(null);
  const flaks = () => {
    if (!on || !hop.current || hop.current.getAnimations().some((a) => a.playState === "running")) return;
    hop.current.animate(
      [
        { transform: "translateY(0px) rotate(0deg)" },
        { transform: "translateY(-16px) rotate(-6deg)", offset: 0.22, easing: "ease-in" },
        { transform: "translateY(0px) rotate(0deg)", offset: 0.42, easing: "ease-out" },
        { transform: "translateY(-8px) rotate(-3deg)", offset: 0.6, easing: "ease-in" },
        { transform: "translateY(0px) rotate(0deg)", offset: 0.78 },
        { transform: "translateY(0px) rotate(0deg)" },
      ],
      { duration: 900, easing: "ease-out" },
    );
  };
  return (
    <div className={`absolute ${className}`}>
      <div className={`${s.hopp} absolute inset-0`} data-up={up} style={{ ["--delay" as string]: delay }}>
        <div ref={hop} className={`${s.lag} absolute inset-0`} style={{ transformOrigin: "50% 100%" }}>
          {HONE[kind].body}
          <div ref={head} className={`${s.lag} absolute inset-0`} style={{ transformOrigin: "68% 56%" }}>
            {HONE[kind].head}
          </div>
        </div>
        {/* Out of the tab order: the hens are only there to be looked at. */}
        <button type="button" tabIndex={-1} aria-hidden="true" onClick={flaks} className="absolute inset-0 cursor-pointer motion-reduce:cursor-auto" />
      </div>
    </div>
  );
}

function Kylling({ up, on, className }: { up: boolean; on: boolean; className: string }) {
  const head = useLoop<HTMLDivElement>(PECK_KYLLING, 4.6, on);
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className={`${s.hopp} absolute inset-0`} data-up={up} style={{ ["--delay" as string]: "1.7s" }}>
        {KYLLING_BODY}
        <div ref={head} className={`${s.lag} absolute inset-0`} style={{ transformOrigin: "55% 58%" }}>
          {KYLLING_HEAD}
        </div>
      </div>
    </div>
  );
}

/* ── The price list, pinned up under the awning ── */

function Prisliste() {
  return (
    <div className="space-y-6 md:space-y-7">
      {PRISER.map((g) => (
        <section key={g.tittel} aria-labelledby={`pris-${g.tittel}`}>
          <h2 id={`pris-${g.tittel}`} className="text-[18px] font-medium tracking-[-0.015em] text-[var(--color-ink)] md:text-[19px]">
            {g.tittel}
          </h2>
          <dl className="mt-2">
            {g.priser.map((p) => (
              <div key={p.navn} className="flex items-end gap-2 py-[5px] text-[15px] leading-[1.4] md:text-[15.5px]">
                <dt className="min-w-0 text-pretty text-[rgba(14,42,48,0.78)]">{p.navn}</dt>
                <span aria-hidden="true" className="mb-[0.42em] min-w-[14px] flex-1 border-b-2 border-dotted border-[rgba(14,42,48,0.2)]" />
                <dd className="shrink-0 whitespace-nowrap font-medium tabular-nums text-[var(--color-ink)]">
                  {p.fra && <span className="font-normal text-[rgba(14,42,48,0.6)]">fra </span>}
                  {kroner(p.kr)} kr
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

const PINS = [
  { c: "#D9654F", pos: "left-[10px] top-[10px]" },
  { c: "#E8C45A", pos: "right-[10px] top-[10px]" },
];
const PLANKS = "repeating-linear-gradient(to bottom, #A89276 0px, #A89276 46px, #9A8468 46px, #9A8468 48px)";

function Bod({ up }: { up: boolean }) {
  return (
    <div className={s.reis} data-up={up} style={{ ["--delay" as string]: "0.5s" }}>
      {/* The awning, a little wider than the stand, with the clinic's sign on top */}
      <div aria-hidden="true" className="relative z-10 -mx-[4%] h-[44px] md:h-[54px]">
        <div className="absolute bottom-[calc(100%-7px)] left-1/2 ml-[-22px] h-[37px] w-[44px] md:ml-[-26px] md:h-[44px] md:w-[52px]">{SKILT}</div>
        {AWNING}
      </div>
      <div className="relative px-[11px] md:px-[13px]">
        {/* Two corner posts, from the awning down into the grass */}
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[11px] bg-[#8A7258] md:w-[13px]" />
        <span aria-hidden="true" className="absolute inset-y-0 right-0 w-[11px] bg-[#8A7258] md:w-[13px]" />
        <div className="relative -mt-[6px] px-[12px] pb-[6px] pt-[22px] md:px-[16px] md:pt-[26px]" style={{ background: PLANKS }}>
          {/* The price list, as a sheet of paper pinned up on the back wall */}
          <div className="relative bg-[var(--color-paper)] px-5 pb-6 pt-6 shadow-[0_3px_0_rgba(14,42,48,0.14)] sm:px-8 sm:pb-7 sm:pt-7">
            <Prisliste />
            {PINS.map((p, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`absolute size-[10px] rounded-full shadow-[0_2px_0_rgba(14,42,48,0.2)] md:size-[11px] ${p.pos}`}
                style={{ background: p.c }}
              />
            ))}
          </div>
          <div aria-hidden="true" className="mx-auto mt-3 max-w-[560px] px-1">
            {VARER}
          </div>
        </div>
        {/* The counter's edge, the front under it, and the legs */}
        <div aria-hidden="true" className="relative -mx-[18px] h-[12px] bg-[#7E6750] shadow-[0_5px_0_rgba(14,42,48,0.13)]" />
        <div
          aria-hidden="true"
          className="h-[46px] md:h-[56px]"
          style={{ background: "repeating-linear-gradient(to right, #B89B78 0px, #B89B78 38px, #A68A68 38px, #A68A68 40px)" }}
        />
        <div aria-hidden="true" className="h-[92px] md:h-[118px]" />
      </div>
    </div>
  );
}

/* ── The section ── */

export function Gardsutsalget() {
  const { ref, up, on, reduced } = usePopUp();
  const { spring, handlers } = useLean(reduced);
  const farX = useShift(spring, 4);
  const midX = useShift(spring, 7);
  const fieldX = useShift(spring, 10);
  const nearX = useShift(spring, 16);

  return (
    <section ref={ref} {...handlers} className="relative isolate overflow-hidden" style={{ background: SKY }}>
      {/* The land behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[360px]">
        <Strip n={0} up={up} x={farX} top={40} h={H}>{FAR_ART}</Strip>
        <Strip n={1} up={up} x={midX} top={170} h={H}>{MID_ART}</Strip>
        <Strip n={2} up={up} x={fieldX} top={40} h={H}>{FIELD_ART}</Strip>
      </div>
      <div aria-hidden="true" className={`${s.fram} pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px]`} data-up={up}>
        <Cloud x={1000} y={640} w={96} drift={24} time={34} on={on} />
        <Cloud x={1830} y={112} w={112} drift={-28} time={30} on={on} />
        <Cloud x={2060} y={340} w={100} drift={-22} time={38} on={on} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[360px]">
        <Strip n={4} up={up} x={nearX} top={300} h={H}>{NEAR_ART}</Strip>
        <Strip n={5} up={up} x={nearX} top={338} h={H}>{LIP_ART}</Strip>
      </div>

      <div className="mx-auto grid w-full max-w-[var(--container-max,1280px)] grid-cols-1 gap-y-14 px-[var(--container-px,24px)] pb-[64px] pt-[112px] md:pt-[128px] lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-x-14 xl:grid-cols-[minmax(0,430px)_minmax(0,1fr)] xl:gap-x-20">
        <div className="relative z-[60] max-w-[460px] lg:pb-[150px]">
          <h1
            className="font-sans font-medium text-balance text-[var(--color-ink)]"
            style={{ fontSize: "clamp(40px, 4.8vw, 62px)", letterSpacing: "-0.035em", lineHeight: 1 }}
          >
            {TEKST.tittel}
          </h1>
          <p className="mt-5 max-w-[40ch] text-pretty text-[17px] leading-[1.55] font-medium text-[var(--color-ink)]">{TEKST.overslag}</p>
          <p className="mt-4 max-w-[40ch] border-t border-[rgba(14,42,48,0.14)] pt-4 text-pretty text-[15.5px] leading-[1.6] text-[rgba(14,42,48,0.74)]">
            {TEKST.helfo}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#16414A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]"
            >
              Bestill undersøkelse
            </Link>
            <RingKnapp />
          </div>
        </div>

        {/* No z-index here: the stand takes its place among the strips of land, the grass in front of it */}
        <div className="relative self-end lg:max-w-[640px] lg:justify-self-end lg:w-full">
          <motion.div className="relative z-10" style={{ x: fieldX }}>
            <Bod up={up} />
          </motion.div>
          <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-[-6px] z-30 h-[64px] md:h-[72px]" style={{ x: fieldX }}>
            <Hone kind="hvit" frames={PECK_HVIT} round={7} up={up} on={on} delay="1.3s" className="bottom-0 left-[3%] h-[48px] w-[60px] md:h-[64px] md:w-[80px]" />
            <Kylling up={up} on={on} className="bottom-0 left-[calc(3%+66px)] h-[21px] w-[24px] md:left-[calc(3%+88px)] md:h-[26px] md:w-[30px]" />
            <div className="absolute bottom-0 right-[8%] h-[48px] w-[60px] -scale-x-100 md:h-[64px] md:w-[80px]">
              <Hone kind="brun" frames={PECK_BRUN} round={8.2} up={up} on={on} delay="1.5s" className="inset-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

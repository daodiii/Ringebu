"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NoShadow, PaperShadow } from "@/components/behandlinger/scenes/Papir";
import {
  Bjork, Blomst, Cloud, Gran, Strip, lip, r2, ridge, ridgeY, rng, useLean, usePopUp, useShift, type Pts,
} from "@/components/home/landskap";
import { at, useLoop } from "./bevegelse";
import { Akutt, Kart, Linjer, Omtale, RingKnapp, Timer, Tittel } from "./Felles";
import s from "./kontakt.module.css";

/**
 * /kontakt, «Postkassa». A gravel road through the bygd on a summer day. By
 * the road stands a notice board with a little roof, and the map is pinned
 * to it; in front of the board, the mailboxes on their rack, one of them the
 * clinic's, with the tooth on it. A red squirrel runs along the roof of the
 * board. When the paper has stood up the post comes: a letter flies in from
 * the left and drops into the clinic's box. It comes again when you point at
 * the e-mail address or tap the box.
 *
 * The drawing never changes, so it is made once, here at module scope, and
 * everything that moves is a layer of its own, moved by CSS or by a Web
 * Animation (see landskap.tsx and bevegelse.ts).
 */

const H = 360;
const SKY = "#EDF2EE";

/* ── The land, back to front, on a strip 2400 wide ── */

const FAR: Pts = [
  [0, 226], [200, 220], [380, 206], [520, 208], [660, 210], [820, 196], [980, 192], [1100, 188], [1220, 170], [1340, 160],
  [1460, 150], [1560, 142], [1680, 146], [1800, 150], [1900, 162], [2000, 170], [2120, 178], [2260, 176], [2400, 184],
];
const MID: Pts = [
  [0, 246], [220, 240], [400, 232], [560, 236], [720, 240], [880, 228], [1040, 226], [1180, 224], [1300, 214], [1440, 212],
  [1580, 210], [1720, 218], [1860, 222], [2000, 226], [2200, 230], [2400, 228],
];
const FIELD: Pts = [
  [0, 266], [300, 262], [600, 258], [900, 260], [1200, 262], [1500, 256], [1800, 254], [2100, 256], [2250, 258], [2400, 258],
];
const VERGE: Pts = [[0, 282], [800, 279], [1600, 280], [2400, 282]];
const NEAR: Pts = [[0, 326], [500, 321], [1000, 319], [1400, 321], [1800, 323], [2200, 320], [2400, 322]];

const SPRUCES = (() => {
  const rand = rng(17);
  const trees: { x: number; y: number; h: number }[] = [];
  for (const [a, b] of [[40, 700], [1120, 2380]] as const) {
    for (let x = a; x < b; x += 12 + rand() * 16) {
      trees.push({ x: r2(x), y: r2(ridgeY(MID, x) + 10 + rand() * 5), h: r2(22 + rand() * 24) });
    }
  }
  return trees;
})();

const GRAVEL = (() => {
  const rand = rng(29);
  return Array.from({ length: 170 }, () => ({
    x: r2(-200 + rand() * 2800),
    y: r2(295 + rand() * 26),
    rx: r2(1 + rand() * 1.8),
    ry: r2(0.7 + rand() * 0.9),
    dark: rand() > 0.5,
  }));
})();

const TUFTS = (() => {
  const rand = rng(41);
  return Array.from({ length: 64 }, () => {
    const x = -200 + rand() * 2800;
    const y = ridgeY(NEAR, Math.max(0, Math.min(2400, x))) + 6 + rand() * 18;
    const h = 8 + rand() * 9;
    return `M${r2(x - 6)},${r2(y)} L${r2(x - 4)},${r2(y - h * 0.7)} L${r2(x - 1.5)},${r2(y - 2)} L${r2(x)},${r2(y - h)} L${r2(x + 2)},${r2(y - 2)} L${r2(x + 5)},${r2(y - h * 0.6)} L${r2(x + 6)},${r2(y)} Z`;
  });
})();

const DAISIES = (() => {
  const rand = rng(53);
  return Array.from({ length: 30 }, () => {
    const x = 200 + rand() * 2000;
    return { x: r2(x), y: r2(ridgeY(NEAR, x) + 10 + rand() * 18), r: r2(3.4 + rand() * 2) };
  });
})();

/** A round bale wrapped in white plastic, lying in the field, its round end towards you at a slant. */
function Rundball({ x, y, flip = false, green = false }: { x: number; y: number; flip?: boolean; green?: boolean }) {
  const fill = green ? "#D6E4CE" : "#FBFBF7";
  const end = green ? "#C6D8BC" : "#EBEEE7";
  const ring = green ? "#B8CDAE" : "#DEE3DA";
  const f = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${f} 1)`}>
      <rect x={-24} y={-36} width={50} height={36} rx={5} fill={fill} />
      <ellipse cx={-24} cy={-18} rx={9.5} ry={18} fill={end} />
      <NoShadow>
        <ellipse cx={-24} cy={-18} rx={5} ry={9.5} fill={ring} />
        <rect x={-8} y={-35} width={1.4} height={34} fill={end} />
        <rect x={8} y={-35} width={1.4} height={34} fill={end} />
      </NoShadow>
    </g>
  );
}

/** A lupin, the purple, pink or white spikes along every road in June. */
function Lupin({ x, y, h, color, seed }: { x: number; y: number; h: number; color: string; seed: number }) {
  const rand = rng(seed);
  const lean = (rand() - 0.5) * 8;
  const spike = h * 0.5;
  const top = y - h;
  const florets = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const fy = top + spike * t;
    const w = 2.2 + t * 3.6;
    return { x: r2(x + lean * (1 - t)), y: r2(fy), rx: r2(w), ry: r2(2.4 + t * 0.8) };
  });
  const leaves = Array.from({ length: 5 }, (_, i) => {
    const a = -150 + i * 30;
    return `M${x},${r2(y - 4)} L${r2(x + Math.cos((a * Math.PI) / 180) * 12)},${r2(y - 4 + Math.sin((a * Math.PI) / 180) * 12)}`;
  });
  return (
    <g>
      <path d={`M${r2(x - 1)},${y} Q${r2(x + lean * 0.3)},${r2(y - h * 0.5)} ${r2(x + lean - 0.8)},${r2(top + spike)} L${r2(x + lean + 0.8)},${r2(top + spike)} Q${r2(x + lean * 0.3 + 2)},${r2(y - h * 0.5)} ${r2(x + 1)},${y} Z`} fill="#7FA06A" />
      <NoShadow>
        {leaves.map((d, i) => (
          <path key={i} d={d} stroke="#86A870" strokeWidth={3} strokeLinecap="round" />
        ))}
      </NoShadow>
      {florets.map((f, i) => (
        <ellipse key={i} cx={f.x} cy={f.y} rx={f.rx} ry={f.ry} fill={color} />
      ))}
    </g>
  );
}

const LUPINS = (() => {
  const rand = rng(61);
  const colors = ["#9D87CB", "#B59BD8", "#D79AB8", "#F3EEF6", "#8C77BE"];
  const out: { x: number; y: number; h: number; color: string; seed: number }[] = [];
  for (const [a, b, n] of [[1140, 1250, 6], [1610, 1730, 6], [620, 760, 4], [1880, 1990, 4]] as const) {
    for (let i = 0; i < n; i++) {
      const x = a + rand() * (b - a);
      out.push({ x: r2(x), y: r2(ridgeY(VERGE, x) + 4 + rand() * 6), h: r2(34 + rand() * 22), color: colors[Math.floor(rand() * colors.length)], seed: 900 + out.length });
    }
  }
  return out.sort((p, q) => p.y - q.y);
})();

const FAR_ART = <path d={ridge(FAR, H)} fill="#D7E2E5" />;
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
    <Rundball x={770} y={272} />
    <Rundball x={836} y={276} flip />
    <Rundball x={1000} y={270} green />
    <Bjork x={1850} y={262} h={236} seed={22} lean={-0.25} />
    <Bjork x={1930} y={260} h={168} seed={26} lean={0.3} />
    <Rundball x={2070} y={264} flip />
  </>
);
const ROAD_ART = (
  <>
    <path d={ridge(VERGE, H)} fill="#BDD495" />
    <NoShadow>
      <path d="M-400,292 L2800,292 L2800,340 L-400,340 Z" fill="#E6DECB" />
      <path d="M-400,300 L2800,300 L2800,305 L-400,305 Z" fill="#DDD4BF" />
      <path d="M-400,313 L2800,313 L2800,318 L-400,318 Z" fill="#DDD4BF" />
      {GRAVEL.map((g, i) => (
        <ellipse key={i} cx={g.x} cy={g.y} rx={g.rx} ry={g.ry} fill={g.dark ? "#CDBFA3" : "#F2ECDD"} />
      ))}
    </NoShadow>
    {LUPINS.map((l, i) => (
      <Lupin key={i} {...l} />
    ))}
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
      <Blomst key={i} x={d.x} y={d.y} r={d.r} seed={300 + i} />
    ))}
  </>
);
const LIP_ART = <path d={lip(346, 12, H)} fill="#FCF9F2" />;

/* ── The mailboxes ── */

// The tooth from the logo, with the little heart where the roots meet.
const TOOTH = "M-9,-11 C-14,-11 -15,-4 -13,2 C-11,8 -9,12 -6,12 C-3,12 -3,5 0,5 C3,5 3,12 6,12 C9,12 11,8 13,2 C15,-4 14,-11 9,-11 C5,-11 4,-9 0,-9 C-4,-9 -5,-11 -9,-11 Z";
const HEART = "M0,4.5 C-2.2,2.6 -3.4,1.2 -3.4,-0.3 C-3.4,-1.6 -2.4,-2.4 -1.4,-2.4 C-0.7,-2.4 -0.2,-2 0,-1.5 C0.2,-2 0.7,-2.4 1.4,-2.4 C2.4,-2.4 3.4,-1.6 3.4,-0.3 C3.4,1.2 2.2,2.6 0,4.5 Z";

// Four boxes on one plank, on one post with two braces, as they stand at the
// end of every farm road. Drawn in a box 250 × 170, the foot of the post at 170.
const BOXES = [
  { x: 15.5, body: "#95B3A3", lid: "#7C9E8C", plate: true },
  { x: 72.5, body: "#CB7561", lid: "#B25F4E", plate: true },
  { x: 129.5, body: "#2A5A62", lid: "#1F474E", ours: true },
  { x: 186.5, body: "#E9D9A9", lid: "#D3BF89", plate: true },
] as const;
const OURS = BOXES[2];

/** A lid with a gently rounded top, a little wider than its box. */
const lidPath = (x: number) => `M${x - 2.5},44 L${x - 2.5},33 Q${x + 24},21 ${x + 50.5},33 L${x + 50.5},44 Z`;

function RackShapes() {
  return (
    <>
      <path d="M121,176 L121,94 L131,94 L131,176 Z" fill="#8A7258" />
      <path d="M122,132 L64,95 L73,95 L126,126 Z" fill="#8A7258" />
      <path d="M130,132 L188,95 L179,95 L126,126 Z" fill="#8A7258" />
      <rect x={6} y={85} width={238} height={11} rx={1.5} fill="#A38C71" />
      <NoShadow>
        <rect x={6} y={93} width={238} height={3} fill="#8A7560" />
      </NoShadow>
      {BOXES.map((b) => (
        <g key={b.x}>
          <rect x={b.x} y={40} width={48} height={46} rx={2.5} fill={b.body} />
          {!("ours" in b) && (
            <>
              <path d={lidPath(b.x)} fill={b.lid} />
              <NoShadow>
                <rect x={b.x + 12} y={56} width={24} height={10} rx={1.5} fill="#FBF8F0" opacity={0.92} />
              </NoShadow>
            </>
          )}
          {"ours" in b && (
            <NoShadow>
              <g transform={`translate(${b.x + 24} 63) scale(0.74)`}>
                <path d={TOOTH} fill="none" stroke="#FFFFFF" strokeWidth={3} />
                <path d={HEART} fill="#FFFFFF" />
              </g>
            </NoShadow>
          )}
        </g>
      ))}
    </>
  );
}

const RACK = (
  <svg viewBox="0 0 250 170" className="absolute inset-0 h-full w-full overflow-visible">
    <PaperShadow dy={4}>
      <RackShapes />
    </PaperShadow>
    <RackShapes />
  </svg>
);

// The clinic's lid, on a layer of its own so it can open, hinged at its left end.
const OUR_LID = (
  <svg viewBox="0 0 250 170" className="absolute inset-0 h-full w-full overflow-visible">
    <PaperShadow dy={3}>
      <path d={lidPath(OURS.x)} />
    </PaperShadow>
    <path d={lidPath(OURS.x)} fill={OURS.lid} />
    <NoShadow>
      <rect x={OURS.x - 2.5} y={41} width={53} height={3} fill="#173A40" />
    </NoShadow>
    <circle cx={OURS.x + 24} cy={38.5} r={2} fill="#E8EFEE" />
  </svg>
);

const LETTER = (
  <svg viewBox="-1 -1 26 20" className="block h-full w-full overflow-visible">
    <PaperShadow dy={2}>
      <rect x={0} y={0} width={24} height={16} rx={1.5} />
    </PaperShadow>
    <rect x={0} y={0} width={24} height={16} rx={1.5} fill="#FFFFFF" />
    <path d="M0.8,1.2 L12,9.4 L23.2,1.2" fill="none" stroke="#D3CBBB" strokeWidth={1.1} />
    <rect x={17.4} y={2.6} width={4.4} height={5.2} fill="#7CB1A7" />
  </svg>
);

/* ── The squirrel ── */

const EKORN_TAIL = (
  <svg viewBox="0 0 56 46" className="absolute inset-0 h-full w-full overflow-visible">
    <PaperShadow dy={2.5}>
      <path d="M21,41 C11,42 4,36 3.5,28 C3,19 7,11 13,7 C19,3 27,4 29,10 C31,15 27,19 23.5,17.5 C21,16.5 21,13.2 23.4,12.6 C20,10.4 15.4,12.4 13.6,17.4 C11.8,22.6 13.4,29 18,33.6 C20.4,36 22.2,38.4 21,41 Z" />
    </PaperShadow>
    <path d="M21,41 C11,42 4,36 3.5,28 C3,19 7,11 13,7 C19,3 27,4 29,10 C31,15 27,19 23.5,17.5 C21,16.5 21,13.2 23.4,12.6 C20,10.4 15.4,12.4 13.6,17.4 C11.8,22.6 13.4,29 18,33.6 C20.4,36 22.2,38.4 21,41 Z" fill="#B9653A" />
    <path d="M7.4,30 C6.4,22 9.6,13.6 16,9.6 C12.2,14.4 10.6,21.6 12.4,28.6 Z" fill="#CF8454" />
  </svg>
);
const EKORN_BODY = (
  <svg viewBox="0 0 56 46" className="absolute inset-0 h-full w-full overflow-visible">
    <PaperShadow dy={2.5}>
      <path d="M16,44 C12,38 14,28 22,25 C30,22 37,28 37,36 C37,41 34,44 30,45 L20,45 C18,45 17,45 16,44 Z" />
      <circle cx={33} cy={20} r={7.6} />
      <ellipse cx={39.5} cy={22} rx={4.2} ry={3.4} />
    </PaperShadow>
    <path d="M27.6,15 L26.4,5.6 L32,12 Z" fill="#A9582F" />
    <path d="M16,44 C12,38 14,28 22,25 C30,22 37,28 37,36 C37,41 34,44 30,45 L20,45 C18,45 17,45 16,44 Z" fill="#C7713F" />
    <path d="M30,44.4 C34,42 35.4,36 33.4,31 C31.6,27.6 28,29 28,33.4 C28,37.6 28.4,41.4 30,44.4 Z" fill="#F3E4CF" />
    <circle cx={33} cy={20} r={7.6} fill="#C7713F" />
    <ellipse cx={39.5} cy={22} rx={4.2} ry={3.4} fill="#C7713F" />
    <ellipse cx={37.6} cy={24.2} rx={3.2} ry={2} fill="#F3E4CF" />
    <path d="M30.6,13.4 L31.8,4.6 L35.4,12.2 Z" fill="#B8643A" />
    <ellipse cx={38.6} cy={29.4} rx={2.4} ry={3.2} fill="#8C6A45" />
    <ellipse cx={36.4} cy={30.6} rx={2.2} ry={1.5} fill="#B8643A" />
    <ellipse cx={27.4} cy={44.6} rx={5} ry={1.6} fill="#B8643A" />
    <circle cx={35.3} cy={18.4} r={1.35} fill="#2A211C" />
    <circle cx={35.7} cy={17.9} r={0.45} fill="#FFFFFF" />
    <circle cx={43.4} cy={21.2} r={0.9} fill="#3A2A22" />
  </svg>
);

// Where the squirrel is along the ridge of the roof (% of the way) and when (s).
const ROUND = 22;
const PLAN: [number, number][] = [
  [4, 0], [4, 1.8], [36, 3.6], [36, 7.2], [60, 8.6], [60, 10.8], [86, 12.4], [86, 15], [4, 18.8], [4, 22],
];

const EKORN = (() => {
  const track: Keyframe[] = PLAN.map(([p, t]) => ({ offset: at(t, ROUND), transform: `translateX(${p}%)` }));
  const hop: Keyframe[] = [{ offset: 0, transform: "translateY(0px)" }];
  const face: Keyframe[] = [{ offset: 0, transform: "scaleX(1)" }];
  const tail: Keyframe[] = [{ offset: 0, transform: "rotate(0deg)" }];
  let dir = 1;
  for (let i = 1; i < PLAN.length; i++) {
    const [p0, t0] = PLAN[i - 1];
    const [p1, t1] = PLAN[i];
    if (p0 === p1) {
      // Sitting: a flick of the tail
      tail.push({ offset: at(t0 + 0.2, ROUND), transform: "rotate(0deg)" });
      tail.push({ offset: at(t0 + 0.45, ROUND), transform: "rotate(9deg)" });
      tail.push({ offset: at(t0 + 0.75, ROUND), transform: "rotate(-5deg)" });
      tail.push({ offset: at(t0 + 1.05, ROUND), transform: "rotate(0deg)" });
      continue;
    }
    const d = p1 > p0 ? 1 : -1;
    if (d !== dir) {
      face.push({ offset: at(t0 - 0.12, ROUND), transform: `scaleX(${dir})` });
      face.push({ offset: at(t0, ROUND), transform: `scaleX(${d})` });
      dir = d;
    }
    const n = Math.max(2, Math.round((t1 - t0) / 0.3));
    const dt = (t1 - t0) / n;
    for (let k = 0; k < n; k++) {
      hop.push({ offset: at(t0 + k * dt, ROUND), transform: "translateY(0px)" });
      hop.push({ offset: at(t0 + (k + 0.5) * dt, ROUND), transform: "translateY(-7px)" });
    }
    hop.push({ offset: at(t1, ROUND), transform: "translateY(0px)" });
  }
  // Round again to face the way it set off
  face.push({ offset: at(20.6, ROUND), transform: `scaleX(${dir})` });
  face.push({ offset: at(20.72, ROUND), transform: "scaleX(1)" });
  face.push({ offset: 1, transform: "scaleX(1)" });
  hop.push({ offset: 1, transform: "translateY(0px)" });
  tail.push({ offset: 1, transform: "rotate(0deg)" });
  return { track, hop, face, tail };
})();

function Ekorn({ on }: { on: boolean }) {
  const track = useLoop<HTMLDivElement>(EKORN.track, ROUND, on);
  const hop = useLoop<HTMLDivElement>(EKORN.hop, ROUND, on);
  const face = useLoop<HTMLDivElement>(EKORN.face, ROUND, on);
  const tail = useLoop<HTMLDivElement>(EKORN.tail, ROUND, on);
  return (
    <div className="pointer-events-none absolute inset-x-[6%] bottom-[calc(100%-3px)] h-[38px] md:h-[46px]">
      <div ref={track} className={`${s.lag} absolute inset-0`}>
        <div className="absolute bottom-0 left-0 aspect-[56/46] h-full">
          <div ref={hop} className={`${s.lag} absolute inset-0`}>
            <div ref={face} className={`${s.lag} absolute inset-0`}>
              <div ref={tail} className={`${s.lag} absolute inset-0`} style={{ transformOrigin: "36% 89%" }}>
                {EKORN_TAIL}
              </div>
              {EKORN_BODY}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── The notice board ── */

const ROOF = (
  <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
    <PaperShadow dy={5}>
      <path d="M0,40 L1000,40 L952,8 L48,8 Z" />
    </PaperShadow>
    <path d="M0,40 L1000,40 L952,8 L48,8 Z" fill="#6F5948" />
    <NoShadow>
      <path d="M26,24 L974,24" stroke="#5F4B3C" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
    </NoShadow>
    <rect x={0} y={34} width={1000} height={6} fill="#5B4739" />
    <rect x={40} y={0} width={920} height={9} fill="#5D493A" />
  </svg>
);

const PINS = [
  { c: "#D9654F", pos: "left-[9px] top-[9px] md:left-[10px] md:top-[10px]" },
  { c: "#E8C45A", pos: "right-[9px] top-[9px] md:right-[10px] md:top-[10px]" },
  { c: "#6FA5A0", pos: "left-[9px] bottom-[9px] md:left-[10px] md:bottom-[10px]" },
  { c: "#D9654F", pos: "right-[9px] bottom-[9px] md:right-[10px] md:bottom-[10px]" },
];

function Tavle({ up, on }: { up: boolean; on: boolean }) {
  return (
    <div className={s.reis} data-up={up} style={{ ["--delay" as string]: "0.5s" }}>
      {/* The roof, a little wider than the board, with the squirrel on its ridge */}
      <div aria-hidden="true" className="relative -mx-[3%] h-[30px] md:h-[36px]">
        {ROOF}
        <Ekorn on={on} />
      </div>
      <div className="relative bg-[#A89276] p-[12px] shadow-[0_5px_0_rgba(14,42,48,0.13)] md:p-[14px]">
        <div className="bg-white p-[5px] shadow-[0_3px_0_rgba(14,42,48,0.14)] md:p-[6px]">
          <Kart className="h-[330px] sm:h-[400px] lg:h-[430px]" />
        </div>
        {PINS.map((p, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`absolute size-[10px] rounded-full shadow-[0_2px_0_rgba(14,42,48,0.2)] md:size-[11px] ${p.pos}`}
            style={{ background: p.c }}
          />
        ))}
      </div>
      {/* Two posts down into the grass */}
      <div aria-hidden="true" className="flex h-[118px] justify-between px-[9%] md:h-[150px]">
        <span className="block h-full w-[12px] bg-[#8A7258] md:w-[14px]" />
        <span className="block h-full w-[12px] bg-[#8A7258] md:w-[14px]" />
      </div>
    </div>
  );
}

/* ── The section ── */

export function Postkassa() {
  const { ref, reduced, up, on } = usePopUp();
  const { spring, handlers } = useLean(reduced);
  const farX = useShift(spring, 4);
  const midX = useShift(spring, 7);
  const fieldX = useShift(spring, 10);
  const roadX = useShift(spring, 13);
  const nearX = useShift(spring, 16);

  const lid = useRef<HTMLDivElement | null>(null);
  const letter = useRef<HTMLDivElement | null>(null);
  const busy = useRef(false);

  /** The post comes: the lid lifts, a letter flutters down into the box, the lid shuts. */
  const post = useCallback(() => {
    if (reduced || busy.current || !lid.current || !letter.current) return;
    busy.current = true;
    const t = 2300;
    lid.current.animate(
      [
        { transform: "rotate(0deg)", easing: "ease-out" },
        { transform: "rotate(-42deg)", offset: 0.16 },
        { transform: "rotate(-42deg)", offset: 0.74, easing: "cubic-bezier(0.5, 0, 0.75, 0)" },
        { transform: "rotate(4deg)", offset: 0.86 },
        { transform: "rotate(0deg)" },
      ],
      { duration: t },
    );
    // In from the left, over the other boxes and under the board, and down into ours
    const fall = letter.current.animate(
      [
        { transform: "translate(-170px, 6px) rotate(-12deg)", opacity: 0 },
        { transform: "translate(-150px, 0px) rotate(-8deg)", opacity: 1, offset: 0.1, easing: "ease-out" },
        { transform: "translate(-96px, -24px) rotate(6deg)", offset: 0.3 },
        { transform: "translate(-40px, -22px) rotate(-4deg)", offset: 0.48 },
        { transform: "translate(0px, -14px) rotate(0deg)", offset: 0.62, easing: "ease-in" },
        { transform: "translate(0px, 24px) rotate(0deg)", opacity: 1, offset: 0.76 },
        { transform: "translate(0px, 24px) rotate(0deg)", opacity: 0 },
      ],
      { duration: t, easing: "linear" },
    );
    fall.onfinish = () => {
      busy.current = false;
    };
  }, [reduced]);

  // The first letter comes once the paper has stood up.
  useEffect(() => {
    if (!up || reduced) return;
    const id = setTimeout(post, 2600);
    return () => clearTimeout(id);
  }, [up, reduced, post]);

  return (
    <>
      <section ref={ref} {...handlers} className="relative isolate overflow-hidden" style={{ background: SKY }}>
        {/* The land behind everything */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[360px]">
          <Strip n={0} up={up} x={farX} top={120} h={H}>{FAR_ART}</Strip>
          <Strip n={1} up={up} x={midX} top={170} h={H}>{MID_ART}</Strip>
          <Strip n={2} up={up} x={fieldX} top={40} h={H}>{FIELD_ART}</Strip>
        </div>
        <div aria-hidden="true" className={`${s.fram} pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px]`} data-up={up}>
          <Cloud x={1700} y={128} w={112} drift={-30} time={32} on={on} />
          <Cloud x={1296} y={92} w={92} drift={22} time={38} on={on} />
          <Cloud x={2010} y={380} w={124} drift={-24} time={28} on={on} />
        </div>
        {/* The road and the verge in front of the board */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[360px]">
          <Strip n={3} up={up} x={roadX} top={278} h={H}>{ROAD_ART}</Strip>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[360px]">
          <Strip n={4} up={up} x={nearX} top={316} h={H}>{NEAR_ART}</Strip>
          <Strip n={5} up={up} x={nearX} top={338} h={H}>{LIP_ART}</Strip>
        </div>

        <div className="mx-auto grid w-full max-w-[var(--container-max,1280px)] grid-cols-1 gap-y-14 px-[var(--container-px,24px)] pb-[76px] pt-[112px] md:pt-[128px] lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-x-14 xl:grid-cols-[minmax(0,450px)_minmax(0,1fr)] xl:gap-x-20">
          <div className="relative z-[60] max-w-[460px] lg:pb-[150px]">
            <Tittel />
            <div className="mt-8">
              <Linjer onEpost={post} />
            </div>
            <Timer className="mt-7" />
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <RingKnapp />
              <Akutt />
            </div>
          </div>

          {/* No z-index here: the board and the mailboxes take their places
              among the strips of land (board behind the road, mailboxes in front) */}
          <div className="relative self-end">
            <div className="relative z-10">
              <Tavle up={up} on={on} />
            </div>

            {/* The mailboxes on their rack, in front of the board by the road */}
            <motion.div
              aria-hidden="true"
              className="absolute bottom-[-10px] left-1/2 z-30 ml-[-90px] h-[122px] w-[180px] md:ml-[-125px] md:h-[170px] md:w-[250px]"
              style={{ x: roadX }}
            >
              <div className={`${s.hopp} absolute inset-0`} data-up={up} style={{ ["--delay" as string]: "1.15s" }}>
                <div className="absolute inset-0 origin-top-left max-md:scale-[0.72]" style={{ width: 250, height: 170 }}>
                  <div
                    ref={letter}
                    className={`${s.lag} absolute opacity-0`}
                    style={{ left: 138.5, top: 28, width: 30, height: 20 }}
                  >
                    {LETTER}
                  </div>
                  {RACK}
                  <div ref={lid} className={`${s.lag} absolute inset-0`} style={{ transformOrigin: "50.8% 25.88%" }}>
                    {OUR_LID}
                  </div>
                  {/* The clinic's box, which opens when tapped; out of the tab
                      order, as the e-mail line brings the post for the keyboard.
                      With reduced motion no post comes, so no hand either. */}
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={post}
                    className="absolute cursor-pointer motion-reduce:cursor-auto"
                    style={{ left: 124, top: 20, width: 60, height: 68 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Omtale />
    </>
  );
}

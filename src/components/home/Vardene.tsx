"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { PALETTES, PaperShadow, Piece, type PaletteName } from "@/components/behandlinger/scenes/Papir";

/**
 * "Tre grunner til å velge oss." Under the three reasons the page opens onto
 * a strip of fjell cut from paper, and on it stand three cairns, one under
 * each reason, the way cairns mark the path over Rondane. When the strip
 * comes into view they build themselves, stone by stone. Tapping a cairn lays
 * another stone on top, as walkers do; lay one too many and the new stones
 * tumble off.
 *
 * It is the pause between the treatment boxes and the book, so nothing here
 * moves for long: the stones settle once, and only two small clouds drift.
 */

const GRUNNER = [
  {
    name: "Medlem av Den norske tannlegeforening (NTF).",
    sub: "Etiske retningslinjer, kontinuerlig etterutdanning, kvalitetssikret praksis.",
  },
  {
    name: "Direkte oppgjør med HELFO.",
    sub: "Folketrygden dekker deler av behandlingen ved noen bestemte diagnoser og situasjoner — for eksempel alvorlig tannkjøttsykdom, medfødte tilstander eller skader etter en ulykke. Har du rett på stønad, ordner vi oppgjøret direkte.",
  },
  {
    name: "Erfarne tannleger.",
    sub: "Vi har mange år bak oss, og vi holder oss faglig oppdatert. Enten du kommer til en vanlig kontroll eller en større behandling, er du i trygge hender.",
  },
] as const;

/* ── Stones ── */

/**
 * Coordinates are rounded to two decimals: positions from sin and cos differ
 * between the server and the browser in the last decimals, and an unrounded
 * path would not hydrate.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

/** A seeded random generator, so every stone is cut the same way on every render. */
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** A slab of stone cut from paper: a rough polygon, flatter on top and underneath. */
function slab(cx: number, cy: number, w: number, h: number, seed: number) {
  const rand = rng(seed);
  // Five to seven corners, unevenly spaced, so no two stones are cut alike.
  const n = 5 + Math.floor(rand() * 3);
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.25 + (rand() - 0.5) * (4.4 / n);
    const j = 0.8 + rand() * 0.3;
    const x = Math.cos(a) * (w / 2) * j;
    const y = Math.max(-h * 0.5, Math.min(h * 0.44, Math.sin(a) * (h / 2) * j * 1.15));
    pts.push(`${r2(cx + x)},${r2(cy + y)}`);
  }
  return `M${pts.join("L")}Z`;
}

type Row = { stones: readonly number[]; h: number };
type Cut = { body: string; top: { x: number; y: number; w: number; h: number }; fill: string; light: string; tilt: number };

const BASE = 296;
/** The stones a walker can add, one per tap, on top of the cairn. */
const EXTRA: readonly Row[] = [
  { stones: [22], h: 18 },
  { stones: [18], h: 15 },
  { stones: [14], h: 13 },
];

const VARDER: readonly { palette: PaletteName; seed: number; rows: readonly Row[] }[] = [
  {
    palette: "frost",
    seed: 3,
    rows: [
      { stones: [50, 58, 46], h: 30 },
      { stones: [54, 50], h: 28 },
      { stones: [44, 40], h: 26 },
      { stones: [48], h: 26 },
      { stones: [34], h: 24 },
      { stones: [22], h: 20 },
    ],
  },
  {
    palette: "bjork",
    seed: 41,
    rows: [
      { stones: [52, 60, 48], h: 32 },
      { stones: [56, 50, 40], h: 28 },
      { stones: [54, 46], h: 28 },
      { stones: [44, 40], h: 26 },
      { stones: [48], h: 26 },
      { stones: [36], h: 24 },
      { stones: [24], h: 20 },
    ],
  },
  {
    palette: "lyng",
    seed: 77,
    rows: [
      { stones: [48, 56, 44], h: 30 },
      { stones: [52, 46], h: 28 },
      { stones: [46], h: 28 },
      { stones: [38], h: 24 },
      { stones: [26], h: 20 },
    ],
  },
];

/**
 * Cuts every stone of a cairn, row on row, each row sunk a little into the
 * one below and set a little off centre, as a pile of stones is. The extra
 * stones are cut too, on top, so they have a place to land.
 */
function cutCairn(palette: PaletteName, seed: number, rows: readonly Row[]) {
  const p = PALETTES[palette];
  const rand = rng(seed);
  const cuts: Cut[] = [];
  let bottom = BASE;
  let k = 0;
  const cut = (row: Row) => {
    const gap = 5;
    const total = row.stones.reduce((s, w) => s + w, 0) - gap * (row.stones.length - 1);
    let x = 110 - total / 2 + (rand() - 0.5) * 8;
    row.stones.forEach((w) => {
      const h = row.h * (0.86 + rand() * 0.18);
      const cx = x + w / 2;
      const cy = bottom - h / 2 + (rand() - 0.5) * 3;
      const dark = k % 3 === 1;
      cuts.push({
        body: slab(cx, cy, w, h, seed * 7 + k * 13),
        top: { x: cx - w / 2 - 2, y: cy - h / 2 - 2, w: w + 4, h: h * 0.42 + 2 },
        fill: dark ? p.deep : p.mid,
        light: dark ? p.mid : p.near,
        tilt: ((k * 37) % 13) - 6,
      });
      x += w - gap;
      k += 1;
    });
    bottom -= row.h * 0.72;
  };
  rows.forEach(cut);
  const base = cuts.length;
  EXTRA.forEach(cut);
  return { base: cuts.slice(0, base), extra: cuts.slice(base) };
}

const CAIRNS = VARDER.map((v) => cutCairn(v.palette, v.seed, v.rows));

function Stone({
  c, clip, show, delay, reduced, tumble = 0, k = 0,
}: {
  c: Cut;
  clip: string;
  show: boolean;
  delay: number;
  reduced: boolean;
  tumble?: number;
  k?: number;
}) {
  const up = { x: 0, y: -300, rotate: c.tilt * 3, opacity: 0 };
  return (
    <Piece
      style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
      // The same starting point on the server and in the browser, reduced
      // motion or not, so the page hydrates cleanly; reduced motion just
      // gets no flight.
      initial={up}
      animate={
        tumble
          ? { x: tumble * (150 + k * 40), y: 230 + k * 30, rotate: tumble * (240 + k * 70), opacity: 0 }
          : show
            ? { x: 0, y: 0, rotate: 0, opacity: 1 }
            : up
      }
      transition={
        reduced
          ? { duration: 0 }
          : tumble
            ? { duration: 1.1, ease: [0.45, 0, 0.9, 0.6], delay: k * 0.09 }
            : { type: "spring", stiffness: 380, damping: 22, delay, opacity: { duration: 0.12, delay } }
      }
    >
      <path d={c.body} fill={c.fill} />
      {/* The top of the slab catches the light */}
      <rect x={c.top.x} y={c.top.y} width={c.top.w} height={c.top.h} fill={c.light} clipPath={`url(#${clip})`} />
    </Piece>
  );
}

function Varde({ i, built, reduced }: { i: number; built: boolean; reduced: boolean }) {
  const id = useId().replace(/:/g, "");
  const cairn = CAIRNS[i];
  const [extra, setExtra] = useState(0);
  const [tumble, setTumble] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const add = () => {
    if (reduced || tumble || !built) return;
    if (extra < cairn.extra.length) {
      setExtra(extra + 1);
      return;
    }
    setTumble(true);
    timer.current = setTimeout(() => {
      setExtra(0);
      setTumble(false);
    }, 1250);
  };
  const all = [...cairn.base, ...cairn.extra];
  return (
    <motion.button
      type="button"
      aria-label="Legg en stein på varden"
      onClick={add}
      whileHover="wobble"
      className="mx-auto block w-[31vw] max-w-[280px] cursor-pointer rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
    >
      <svg viewBox="0 96 220 204" className="block h-auto w-full overflow-visible">
        <defs>
          {all.map((c, k) => (
            <clipPath key={k} id={`${id}-${k}`}>
              <path d={c.body} />
            </clipPath>
          ))}
        </defs>
        <motion.g
          variants={{ wobble: { rotate: [0, 1.4, -1, 0.6, 0], transition: { duration: 0.9 } } }}
          style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
        >
          {cairn.base.map((c, k) => (
            <Stone key={k} c={c} clip={`${id}-${k}`} show={built} delay={i * 0.45 + k * 0.09} reduced={reduced} />
          ))}
          {cairn.extra.slice(0, extra).map((c, k) => (
            <Stone
              key={`x${k}`}
              c={c}
              clip={`${id}-${cairn.base.length + k}`}
              show
              delay={0}
              reduced={reduced}
              tumble={tumble ? (k % 2 ? 1 : -1) : 0}
              k={k}
            />
          ))}
        </motion.g>
      </svg>
    </motion.button>
  );
}

/* ── The fjell: three sheets of paper and the scalloped front edge ── */

// Drawn on a strip 2400 wide, centred, wider than any screen it meets.
const FAR =
  "M0,210 C120,190 220,160 320,168 C420,176 470,130 560,122 C650,114 700,160 780,166 C860,172 900,120 1000,104 C1090,90 1150,138 1230,146 C1310,154 1370,110 1460,100 C1560,90 1610,146 1700,150 C1790,154 1840,122 1930,118 C2020,114 2090,160 2180,168 C2260,176 2330,160 2400,170 L2400,330 L0,330 Z";
const MID =
  "M0,150 C160,126 300,120 430,134 C560,148 660,112 800,108 C940,104 1040,140 1180,136 C1320,132 1420,104 1560,110 C1700,116 1780,142 1920,138 C2060,134 2200,112 2400,124 L2400,240 L0,240 Z";
const NEAR =
  "M0,30 C220,26 420,34 640,29 C860,25 1040,34 1260,29 C1480,25 1680,33 1900,29 C2100,26 2260,31 2400,28 L2400,100 L0,100 Z";
// A few loose stones lying about on the ridge.
const LOOSE = [
  { x: 610, y: 44, w: 18, h: 9, s: 5 },
  { x: 640, y: 50, w: 11, h: 6, s: 6 },
  { x: 1010, y: 52, w: 14, h: 7, s: 7 },
  { x: 1392, y: 46, w: 20, h: 9, s: 8 },
  { x: 1418, y: 55, w: 10, h: 6, s: 9 },
  { x: 1800, y: 48, w: 16, h: 8, s: 10 },
].map((l) => ({ ...l, d: slab(l.x, l.y, l.w, l.h, l.s) }));

function lip(y: number, r: number) {
  let d = `M0,40 L0,${y}`;
  for (let x = 0; x < 2400; x += r * 2) d += ` Q${x + r},${y - r * 0.9} ${x + r * 2},${y}`;
  return `${d} L2400,40 Z`;
}
const LIP = lip(16, 12);
const CLOUD = "M34,168 Q34,148 54,150 Q60,132 80,138 Q92,126 106,140 Q124,140 122,158 Q126,172 110,172 L46,172 Q34,172 34,168 Z";

function Layer({ x, h, children }: { x: MotionValue<number>; h: number; children: React.ReactNode }) {
  return (
    <motion.div className="absolute bottom-0 left-1/2 ml-[-1200px] w-[2400px]" style={{ x, height: h }}>
      <svg viewBox={`0 0 2400 ${h}`} className="absolute inset-0 h-full w-full overflow-visible">
        {children}
      </svg>
    </motion.div>
  );
}

/** A paper cloud, drifting out and back on its own layer (paper-drift in globals.css). */
function Cloud({ left, top, drift, time, on }: { left: string; top: number; drift: number; time: number; on: boolean }) {
  return (
    <div
      className="absolute w-[108px]"
      style={{
        left,
        top,
        animation: on ? `paper-drift ${time}s ease-in-out infinite` : undefined,
        ["--drift" as string]: `${drift}px`,
      }}
    >
      <svg viewBox="30 124 100 54" className="block h-auto w-full overflow-visible">
        <PaperShadow>
          <path d={CLOUD} />
        </PaperShadow>
        <path d={CLOUD} fill="#FFFFFF" />
      </svg>
    </div>
  );
}

export function Vardene() {
  const ref = useRef<HTMLElement | null>(null);
  const band = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion() ?? false;
  const seen = useInView(band, { once: true, margin: "0px 0px -18% 0px" });
  const inView = useInView(ref);
  const built = reduced || seen;

  // The pointer leans the sheets against each other, nearer ones further.
  const lean = useMotionValue(0);
  const s = useSpring(lean, { stiffness: 50, damping: 16 });
  const farX = useTransform(s, (v) => v * -8);
  const midX = useTransform(s, (v) => v * -14);
  const nearX = useTransform(s, (v) => v * -20);
  const lipX = useTransform(s, (v) => v * -26);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-paper)] pt-[var(--space-section)] text-[var(--color-text-primary)]"
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" && !reduced) lean.set((e.clientX / window.innerWidth) * 2 - 1);
      }}
      onPointerLeave={() => lean.set(0)}
    >
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <h2 className="display-section max-w-[720px] text-balance">Tre grunner til å velge oss.</h2>
        <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
          {GRUNNER.map((g) => (
            <li key={g.name}>
              <h3 className="font-sans text-[22px] font-medium leading-[1.15] tracking-[-0.022em] md:text-[24px]">{g.name}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">{g.sub}</p>
            </li>
          ))}
        </ul>
      </div>

      <div ref={band} className="relative mt-4 h-[232px] md:mt-6 md:h-[300px]">
        {/* The paper, scaled down as a whole on a phone */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[330px] origin-bottom scale-[0.72] md:scale-100">
          <Layer x={farX} h={330}>
            <path d={FAR} fill={PALETTES.frost.far} />
          </Layer>
          <Cloud left="calc(50% + 250px)" top={40} drift={46} time={26} on={inView && !reduced} />
          <Cloud left="calc(50% - 600px)" top={74} drift={-32} time={34} on={inView && !reduced} />
          {/* Hills run off the bottom, so they hide their own shadow: none is drawn */}
          <Layer x={midX} h={240}>
            <path d={MID} fill={PALETTES.lav.far} />
          </Layer>
          <Layer x={nearX} h={100}>
            <path d={NEAR} fill={PALETTES.lav.near} />
            {LOOSE.map((l, k) => (
              <g key={k}>
                <PaperShadow dy={3}>
                  <path d={l.d} />
                </PaperShadow>
                <path d={l.d} fill={k % 2 ? PALETTES.bjork.mid : PALETTES.frost.mid} />
              </g>
            ))}
          </Layer>
        </div>

        {/* The cairns stand on the near ridge, one under each reason */}
        <motion.div className="absolute inset-x-0 bottom-[48px] md:bottom-[68px]" style={{ x: nearX }}>
          <div className="mx-auto grid w-full max-w-[var(--container-max,1280px)] grid-cols-3 gap-4 px-[var(--container-px,24px)] md:gap-12">
            {CAIRNS.map((_, i) => (
              <div key={i} className="flex items-end justify-center">
                <Varde i={i} built={built} reduced={reduced} />
              </div>
            ))}
          </div>
        </motion.div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[40px] origin-bottom scale-[0.72] md:scale-100">
          <Layer x={lipX} h={40}>
            <path d={LIP} fill="#FCF9F2" />
          </Layer>
        </div>
      </div>
    </section>
  );
}

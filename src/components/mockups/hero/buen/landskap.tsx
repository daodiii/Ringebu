import { PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { Bjork, Blomst, Gran, bumpy, r2, ridge, ridgeY, rng, snowcap, type Pts } from "@/components/home/landskap";

/**
 * Gudbrandsdalen seen through the arch, cut from paper in sheets, back to
 * front. Every sheet is drawn in the same box, 600 wide and 1000 tall (the
 * stage in Buen.tsx keeps that shape and covers the opening), and runs on
 * well past its edges, so a sheet shifted by the pointer never shows where
 * the paper stops.
 *
 * Looking down the valley: rounded fjell with snow on both sides and the
 * valley opening between them, its forested sides coming down to the floor,
 * where Lågen winds towards you through the fields. Nearer, a pasture with
 * sheep on the right, and birches and daisies in the grass at the front.
 *
 * Everything here is made once, at module scope, so React never draws it
 * again; only the layers it sits on move.
 */

export const VW = 600;
export const VH = 1000;
const FOOT = 1100;

/* ── The fjell ── */

/** The far range, Rondane in the distance, seen where the valley opens between the nearer fjell. */
const VIDDE: Pts = [
  [-220, 470],
  [-100, 460], [0, 440], [80, 426],
  [140, 414], [190, 384], [236, 374],
  [272, 366], [300, 338], [338, 334],
  [366, 332], [390, 360], [428, 368],
  [474, 376], [530, 410], [610, 428],
  [700, 440], [760, 450], [820, 460],
];

const FJELL: Pts = [
  [-220, 330],
  [-160, 316], [-80, 300], [-20, 304],
  [40, 308], [96, 290], [150, 284],
  [196, 280], [224, 318], [258, 352],
  [290, 392], [318, 428], [344, 428],
  [372, 428], [410, 336], [452, 290],
  [478, 270], [500, 272], [530, 284],
  [580, 304], [640, 294], [700, 300],
  [760, 306], [800, 316], [820, 322],
];

/** A spur of the valley side from the right, reaching in behind the nearer slope on the left. */
const NES: Pts = [
  [-220, 640],
  [-100, 640], [100, 640], [180, 604],
  [222, 566], [256, 534], [306, 514],
  [366, 490], [436, 466], [526, 450],
  [620, 436], [720, 428], [820, 424],
];

/** The nearer valley sides, coming down from both hands to the floor. */
const LIER: Pts = [
  [-220, 440],
  [-120, 446], [0, 470], [90, 506],
  [170, 538], [262, 566], [336, 586],
  [366, 594], [420, 598], [470, 592],
  [520, 586], [600, 558], [680, 542],
  [740, 532], [790, 526], [820, 522],
];

/** The pasture on the right, falling away to the river on the left. */
const BEITE: Pts = [
  [-220, 944],
  [-60, 944], [180, 934], [300, 884],
  [380, 838], [460, 764], [560, 732],
  [640, 716], [740, 712], [820, 712],
];

/** The grass bank at the front. */
const FRAMME: Pts = [
  [-220, 904],
  [-80, 892], [60, 886], [180, 906],
  [300, 928], [460, 948], [620, 942],
  [700, 938], [760, 932], [820, 930],
];

/* ── The valley floor: fields in perspective, and the river ── */

/** Where the river comes out from behind the valley sides, at the far end of the floor. */
const VP = { x: 420, y: 590 };

const along = (bx: number, y: number) => r2(VP.x + ((bx - VP.x) * (y - VP.y)) / (VH - VP.y));

/** Fields in strips running down the valley, paler towards the far end where the air lies between. */
const AKRE = (() => {
  const rand = rng(17);
  const bands = [590, 598, 610, 628, 654, 690, 742, 812, 904, 1040];
  const near = ["#D3E2A8", "#C5D99A", "#E2E2B0", "#CBDDA0", "#D9E5B4", "#C0D596"];
  const out: { d: string; fill: string }[] = [];
  for (let j = 0; j < bands.length - 1; j++) {
    const [y0, y1] = [bands[j], bands[j + 1]];
    const far = j < 2;
    let bx = -1400;
    while (bx < 2200) {
      const next = bx + 180 + rand() * 340;
      const fill = far ? (rand() > 0.5 ? "#DCE6C4" : "#E4EACF") : near[Math.floor(rand() * near.length)];
      out.push({
        d: `M${along(bx, y0)},${y0} L${along(next, y0)},${y0} L${along(next, y1)},${y1} L${along(bx, y1)},${y1} Z`,
        fill,
      });
      bx = next;
    }
  }
  return out;
})();

/** The river's middle line, from the far end of the valley towards you. */
const ELV_PTS: [number, number][] = [
  [420, 590], [412, 600], [426, 612], [442, 628], [420, 650], [380, 676], [350, 708], [354, 744], [320, 786], [264, 826], [232, 872], [214, 932], [190, 1060],
];

/** A smooth line through the points (Catmull-Rom), sampled. */
function smooth(pts: [number, number][], per = 10) {
  const out: [number, number][] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const [p1, p2] = [pts[i], pts[i + 1]];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < per; k++) {
      const t = k / per;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

const ELV_LINE = smooth(ELV_PTS);
const nearness = (y: number) => Math.max(0, y - VP.y) / (VH - VP.y);
/** The river widens as it comes nearer: a thread at the far end, a broad band at the front. */
const width = (y: number) => 1.6 + nearness(y) ** 1.4 * 92;

function band(line: [number, number][], w: (y: number) => number) {
  const left: string[] = [];
  const right: string[] = [];
  line.forEach(([x, y], i) => {
    const [nx0, ny0] = line[Math.min(line.length - 1, i + 1)];
    const [px, py] = line[Math.max(0, i - 1)];
    const [dx, dy] = [nx0 - px, ny0 - py];
    const len = Math.hypot(dx, dy) || 1;
    const [ox, oy] = [(-dy / len) * w(y) * 0.5, (dx / len) * w(y) * 0.5];
    left.push(`${r2(x + ox)},${r2(y + oy)}`);
    right.unshift(`${r2(x - ox)},${r2(y - oy)}`);
  });
  return `M${left.join(" L")} L${right.join(" L")} Z`;
}

const ELV_BANK = band(ELV_LINE, (y) => width(y) + 3 + nearness(y) * 8);
const ELV = band(ELV_LINE, width);
// The light lies along one bank, a thinner band inside the river.
const ELV_LYS = band(
  ELV_LINE.map(([x, y]) => [x + width(y) * 0.14, y] as [number, number]),
  (y) => width(y) * 0.34,
);

/** Where along the river the sun catches it: the glints sit on the water. */
export const GLINTS = (() => {
  const at = [12, 24, 38, 50, 62, 74, 86, 98, 108];
  return at.map((i, k) => {
    const [x, y] = ELV_LINE[Math.min(ELV_LINE.length - 1, i)];
    const off = (k % 2 ? 0.2 : -0.12) * width(y);
    return { x: r2(x + off), y: r2(y), s: r2(0.4 + nearness(y) * 1.3), set: k % 2 };
  });
})();

/** Small round trees along the riverbanks, and a hedgerow. */
const KRATT = (() => {
  const rand = rng(29);
  const out: { d: string; fill: string }[] = [];
  const tree = (x: number, y: number, r: number, seed: number) =>
    out.push({ d: bumpy(r2(x), r2(y - r * 0.7), r2(r), r2(r * 0.9), 7, seed, 0.4), fill: seed % 2 ? "#8FAE78" : "#7C9E6B" });
  [22, 34, 46, 58, 70, 80].forEach((i, k) => {
    const [x, y] = ELV_LINE[i];
    const w = width(y);
    for (let j = 0; j < 3; j++) {
      const side = (k + j) % 2 ? 1 : -1;
      const r = 2.4 + nearness(y) * 13 * (0.8 + rand() * 0.4);
      tree(x + side * (w * 0.6 + r * (0.9 + j * 1.1)), y + j * 2, r, 300 + k * 7 + j);
    }
  });
  // A hedgerow along a field edge on the far side
  for (let t = 0.06; t < 0.6; t += 0.05) {
    const y = VP.y + t * t * (VH - VP.y) * 1.2;
    tree(along(1150, y), y, 1.6 + nearness(y) * 9, 400 + Math.round(t * 100));
  }
  return out;
})();

/* ── The forest on the valley sides ── */

const SKOG = (() => {
  const rand = rng(71);
  const trees: { x: number; y: number; h: number }[] = [];
  for (let x = -210; x < 820; x += 6 + rand() * 7) {
    const y = ridgeY(LIER, x);
    if (y > 578) continue;
    // Smaller where the side comes down towards the floor, further away
    const h = 9 + rand() * 8 + ((578 - y) / 140) * 9;
    trees.push({ x: r2(x), y: r2(y + 5 + rand() * 4), h: r2(h) });
  }
  return trees;
})();

// A second row lower down the sides, so the slopes read as wooded.
const SKOG2 = (() => {
  const rand = rng(83);
  const trees: { x: number; y: number; h: number }[] = [];
  for (let x = -200; x < 820; x += 8 + rand() * 12) {
    const y = ridgeY(LIER, x) + 24 + rand() * 46;
    if (y > 586) continue;
    trees.push({ x: r2(x), y: r2(y), h: r2(11 + rand() * 9) });
  }
  return trees;
})();

// Small, far trees along the top of the spur
const SKOG_NES = (() => {
  const rand = rng(97);
  const trees: { x: number; y: number; h: number }[] = [];
  for (let x = 230; x < 820; x += 5 + rand() * 6) {
    trees.push({ x: r2(x), y: r2(ridgeY(NES, x) + 4 + rand() * 3), h: r2(6 + rand() * 5) });
  }
  return trees;
})();

/**
 * The shaded face of a peak, turned away from the light: a ragged triangle
 * from the summit at x0, along the ridge to x1, down to the foot of the face
 * (`depth` below the summit, a third of the way across) and back up the spur
 * to the summit.
 */
function facet(pts: Pts, x0: number, x1: number, depth: number, seed: number) {
  const rand = rng(seed);
  const steps = Math.max(6, Math.round((x1 - x0) / 12));
  const top: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    top.push(`${r2(x)},${r2(ridgeY(pts, x))}`);
  }
  const y0 = ridgeY(pts, x0);
  const e = { x: x1, y: ridgeY(pts, x1) };
  const b = { x: x0 + (x1 - x0) * 0.34, y: y0 + depth };
  const back: string[] = [];
  const n = 7;
  // From the end of the ridge down to the foot of the face...
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const j = i < n ? (rand() - 0.5) * 10 : 0;
    back.push(`${r2(e.x + (b.x - e.x) * t + j)},${r2(e.y + (b.y - e.y) * t * t + j * 0.4)}`);
  }
  // ...and up the spur to the summit, in short zigzags
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const j = (i % 2 ? 1 : -1) * (3 + rand() * 5);
    back.push(`${r2(b.x + (x0 - b.x) * t + j)},${r2(b.y + (y0 - b.y) * t)}`);
  }
  return `M${top.join(" L")} L${back.join(" L")} Z`;
}

/* ── The sheets, made once ── */

/** The sheet's drawing with its paper shadow under it. */
const withShadow = (art: React.ReactNode, dy = 5) => (
  <>
    <PaperShadow dy={dy}>{art}</PaperShadow>
    {art}
  </>
);

export const VIDDE_ART = withShadow(
  <>
    <path d={ridge(VIDDE, FOOT)} fill="#D9E2EA" />
    <path d={facet(VIDDE, 352, 520, 60, 9)} fill="#CCD7E1" />
    <path d={snowcap(VIDDE, 170, 470, 38, 7)} fill="#FFFFFF" />
  </>,
  3,
);

export const FJELL_ART = withShadow(
  <>
    <path d={ridge(FJELL, FOOT)} fill="#CDDAE2" />
    <path d={facet(FJELL, 156, 330, 150, 11)} fill="#BDCCD8" />
    <path d={facet(FJELL, 490, 720, 190, 12)} fill="#BDCCD8" />
    {[snowcap(FJELL, 84, 236, 30, 3), snowcap(FJELL, 414, 590, 36, 4), snowcap(FJELL, -130, 20, 18, 5)].map((d, i) => (
      <path key={i} d={d} fill="#FFFFFF" />
    ))}
  </>,
  4,
);

export const NES_ART = withShadow(
  <>
    {SKOG_NES.map((t, i) => (
      <Gran key={i} x={t.x} y={t.y} h={t.h} w={r2(t.h * 0.32)} tiers={3} fill="#7E9C92" dark="#6F8F86" />
    ))}
    <path d={ridge(NES, FOOT)} fill="#BCCFC4" />
  </>,
  4,
);

export const LIER_ART = withShadow(
  <>
    {SKOG.map((t, i) => (
      <Gran key={i} x={t.x} y={t.y} h={t.h} w={r2(t.h * 0.3)} tiers={4} fill="#6E9478" dark="#5D8468" />
    ))}
    <path d={ridge(LIER, FOOT)} fill="#B0C99C" />
    {SKOG2.map((t, i) => (
      <Gran key={i} x={t.x} y={t.y} h={t.h} w={r2(t.h * 0.3)} tiers={4} fill="#7FA285" dark="#6B9174" />
    ))}
  </>,
  4,
);

export const DAL_ART = (
  <>
    {/* The floor lies flat, so it throws no shadow of its own */}
    <rect x={-220} y={VP.y - 2} width={1040} height={FOOT - VP.y} fill="#CFE0A6" />
    {AKRE.map((a, i) => (
      <path key={i} d={a.d} fill={a.fill} />
    ))}
    <path d={ELV_BANK} fill="#B9CF98" />
    <path d={ELV} fill="#C9DEE8" />
    <path d={ELV_LYS} fill="#EAF4F7" />
    {withShadow(
      KRATT.map((k, i) => <path key={i} d={k.d} fill={k.fill} />),
      2,
    )}
  </>
);

export const BEITE_ART = withShadow(
  <>
    <Bjork x={606} y={r2(ridgeY(BEITE, 606) + 10)} h={232} seed={21} lean={-0.3} />
    <Bjork x={656} y={r2(ridgeY(BEITE, 656) + 12)} h={168} seed={25} lean={0.2} />
    <path d={ridge(BEITE, FOOT)} fill="#BFD69A" />
    <path d={ridge(BEITE.map(([x, y]) => [x, y + 34] as const), FOOT)} fill="#B7D090" />
  </>,
);

const DAISIES = (() => {
  const rand = rng(113);
  return Array.from({ length: 24 }, () => {
    const x = -40 + rand() * 680;
    const ground = ridgeY(FRAMME, x) + 10;
    return { x: r2(x), y: r2(ground + rand() * (1010 - ground)), r: r2(3.4 + rand() * 2.6) };
  });
})();

export const FRAMME_ART = withShadow(
  <>
    <Bjork x={30} y={934} h={470} seed={33} lean={0.25} />
    <Bjork x={100} y={918} h={300} seed={27} lean={-0.2} />
    <path d={ridge(FRAMME, FOOT)} fill="#AFCB86" />
    {DAISIES.map((d, i) => (
      <Blomst key={i} x={d.x} y={d.y} r={d.r} seed={500 + i} />
    ))}
  </>,
);

/* ── The sheep (Sauene.tsx's sheep, the same cut, with its head apart) ── */

type Sau = { x: number; y: number; k: number; face: 1 | -1; wool: string; top: string; head: string; eye: string; t: number; delay: number };

const WHITE = { wool: "#F4F1E8", top: "#FFFFFF", head: "#DDD4C5", eye: "#2B2725" } as const;
export const SAUER: Sau[] = [
  { ...WHITE, x: 404, y: r2(ridgeY(BEITE, 404) + 30), k: 0.92, face: 1, t: 8.5, delay: 1.2 },
  { x: 474, y: r2(ridgeY(BEITE, 474) + 18), k: 0.84, face: -1, wool: "#3F3A38", top: "#4E4845", head: "#35302D", eye: "#E9E4D8", t: 9.5, delay: 3.6 },
  { ...WHITE, x: 520, y: r2(ridgeY(BEITE, 520) + 46), k: 1.06, face: -1, t: 7.5, delay: 2.4 },
];

/** Where each sheep sits on the stage, in % of it, and its body and head drawn apart. */
export const SAU_ART = SAUER.map((sau, i) => {
  const { k, face } = sau;
  const body = bumpy(0, -25, 23, 13.5, 11, 10 + i, 0.45);
  const [bx, by, bw, bh] = [-34, -50, 72, 54];
  // A sheep facing left is drawn mirrored, so its box is mirrored too
  const box = { x: r2(sau.x + (face > 0 ? bx : -bx - bw) * k), y: r2(sau.y + by * k), w: r2(bw * k), h: r2(bh * k) };
  const view = `${box.x} ${box.y} ${box.w} ${box.h}`;
  const place = `translate(${sau.x} ${sau.y}) scale(${r2(k * face)} ${k})`;
  const neck = { x: r2(sau.x + 16 * k * face), y: r2(sau.y - 26 * k) };
  return {
    sau,
    pos: {
      left: `${r2((box.x / VW) * 100)}%`,
      top: `${r2((box.y / VH) * 100)}%`,
      width: `${r2((box.w / VW) * 100)}%`,
      height: `${r2((box.h / VH) * 100)}%`,
    },
    neck: `${r2(((neck.x - box.x) / box.w) * 100)}% ${r2(((neck.y - box.y) / box.h) * 100)}%`,
    lift: `${face > 0 ? -40 : 40}deg`,
    body: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
        <g transform={place}>
          <PaperShadow dy={3}>
            <path d={body} />
          </PaperShadow>
          {[-15, -9, 8, 14].map((lx) => (
            <rect key={lx} x={lx - 1.6} y={-16} width={3.2} height={16} rx={1} fill="#4A4540" />
          ))}
          <path d={body} fill={sau.wool} />
          <path d={bumpy(-2, -29, 17, 8, 9, 30 + i, 0.5)} fill={sau.top} />
          <path d={bumpy(-23, -28, 3.2, 3.2, 5, 50 + i, 0.6)} fill={sau.wool} />
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

/* ── Small things on layers of their own ── */

// The clouds over Vardene and Sauene, cut the same way.
export const CLOUD = "M34,168 Q34,148 54,150 Q60,132 80,138 Q92,126 106,140 Q124,140 122,158 Q126,172 110,172 L46,172 Q34,172 34,168 Z";

/** A bird with its wings up, cut from dark paper: the wings are their own group, so they can beat. */
export const FUGL_KROPP = "M-3,0 Q0,-1.6 3,0 Q0,1.4 -3,0 Z";
export const FUGL_VINGER = "M0,0 Q-5,-6 -12,-4 Q-6,-3.4 0,1 Q6,-3.4 12,-4 Q5,-6 0,0 Z";

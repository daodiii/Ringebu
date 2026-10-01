import { NoShadow, PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { Bjork, Blomst, Gran, r2, rng } from "@/components/home/landskap";

/**
 * The drawings in the book, made once. Each piece is drawn in its own box,
 * in book units (the spread is 1200 x 540), with the ground along the foot
 * of the box: that is the hinge it stands up on.
 */

/* ── Ridges ── */

type Peak = readonly [x: number, spread: number, height: number];

/** A ridge's height over the ground at x: a base, and rounded fjell on it. */
const heightAt = (x: number, base: number, peaks: readonly Peak[]) =>
  peaks.reduce((h, [c, w, a]) => h + a * Math.exp(-(((x - c) / w) ** 2)), base);

/** The ridge as cut paper: its top edge, closed along the ground at the foot of a box w x h. */
function ridgePath(w: number, h: number, top: (x: number) => number, step = 6) {
  let d = `M0,${h}`;
  for (let x = 0; x <= w; x += step) d += ` L${x},${r2(h - top(x))}`;
  return `${d} L${w},${r2(h - top(w))} L${w},${h} Z`;
}

/** Snow on a peak: the ridge on top, a torn edge below where it gives out. */
function snow(h: number, top: (x: number) => number, x0: number, x1: number, depth: number, seed: number) {
  const rand = rng(seed);
  const steps = Math.max(6, Math.round((x1 - x0) / 9));
  const upper: string[] = [];
  const lower: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const y = h - top(x);
    upper.push(`${r2(x)},${r2(y - 0.4)}`);
    const mid = Math.sin((i / steps) * Math.PI);
    const tooth = i % 2 ? 0.4 + rand() * 0.35 : 1;
    lower.unshift(`${r2(x)},${r2(y + depth * mid * tooth)}`);
  }
  return `M${upper.join(" L")} L${lower.join(" L")} Z`;
}

/** The shaded flank of a peak, away from the light on the left: a facet folded down its right side. */
function flank(h: number, top: (x: number) => number, c: number, w: number, drop: number) {
  const pts: string[] = [];
  for (let x = c; x <= c + w; x += 6) pts.push(`${r2(x)},${r2(h - top(x))}`);
  const foot = `${r2(c + w * 0.18)},${r2(h - top(c) + drop)}`;
  return `M${pts.join(" L")} L${foot} Z`;
}

/* ── The fjell at the back, across both pages ── */

export const FAR = { x: 0, y: 150, w: 1200, h: 300 };
const FAR_PEAKS: Peak[] = [
  [40, 120, 70],
  [300, 150, 118],
  [560, 120, 92],
  [840, 160, 60],
  [1050, 130, 128],
  [1190, 90, 50],
];
const farTop = (x: number) => heightAt(x, 104, FAR_PEAKS);

export const FAR_ART = (
  <svg viewBox={`0 0 ${FAR.w} ${FAR.h}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
    {/* The sun, low behind the fjell */}
    <circle cx={810} cy={92} r={64} fill="#F8F3DE" />
    <circle cx={810} cy={92} r={42} fill="#FDEFC6" />
    <path d={ridgePath(FAR.w, FAR.h, farTop)} fill="#E0E8EB" />
    {FAR_PEAKS.filter((p) => p[2] > 90).map(([c, w], i) => (
      <path key={i} d={flank(FAR.h, farTop, c, w * 0.95, 90)} fill="#D6E0E4" />
    ))}
    <path d={snow(FAR.h, farTop, 236, 362, 22, 3)} fill="#F6F9FA" />
    <path d={snow(FAR.h, farTop, 990, 1112, 24, 4)} fill="#F6F9FA" />
  </svg>
);

export const FJELL = { x: 0, y: 192, w: 1200, h: 250 };
const FJELL_PEAKS: Peak[] = [
  [150, 110, 96],
  [420, 120, 70],
  [690, 105, 150],
  [905, 110, 104],
  [1130, 120, 84],
];
const fjellTop = (x: number) => heightAt(x, 52, FJELL_PEAKS);

export const FJELL_ART = (
  <svg viewBox={`0 0 ${FJELL.w} ${FJELL.h}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
    <path d={ridgePath(FJELL.w, FJELL.h, fjellTop)} fill="#C7D5DC" />
    {FJELL_PEAKS.map(([c, w], i) => (
      <path key={i} d={flank(FJELL.h, fjellTop, c, w * 0.9, 120)} fill="#B4C5CE" />
    ))}
    <path d={snow(FJELL.h, fjellTop, 616, 766, 34, 7)} fill="#FFFFFF" />
    <path d={snow(FJELL.h, fjellTop, 846, 966, 22, 8)} fill="#FFFFFF" />
    <path d={snow(FJELL.h, fjellTop, 104, 196, 16, 9)} fill="#FFFFFF" />
    <path d={snow(FJELL.h, fjellTop, 1092, 1170, 14, 10)} fill="#FFFFFF" />
    {/* The green valley side under the bare fjell, birch and pine up to the tree line */}
    <path d={ridgePath(FJELL.w, FJELL.h, (x) => heightAt(x, 30, [[90, 140, 22], [380, 160, 30], [760, 150, 18], [1010, 170, 32]]))} fill="#C9D9C0" />
    <path d={ridgePath(FJELL.w, FJELL.h, (x) => heightAt(x, 14, [[240, 150, 14], [600, 140, 18], [900, 160, 10], [1150, 120, 16]]))} fill="#BBD0B2" />
  </svg>
);

/* A paper cloud (the one over Vardene and the pasture). */
export const CLOUD = "M34,168 Q34,148 54,150 Q60,132 80,138 Q92,126 106,140 Q124,140 122,158 Q126,172 110,172 L46,172 Q34,172 34,168 Z";
export const CLOUD_ART = (
  <svg viewBox="30 124 100 54" className="block h-auto w-full overflow-visible" aria-hidden="true">
    <PaperShadow>
      <path d={CLOUD} />
    </PaperShadow>
    <path d={CLOUD} fill="#FFFFFF" />
  </svg>
);

/* ── On the right page: page units, 600 x 540 ── */

/** The wooded ridge behind the valley, spruce along its top and down its side. */
export const SKOG = { x: 0, y: 262, w: 600, h: 176 };
const skogTop = (x: number) => heightAt(x, 14, [[430, 250, 82], [130, 110, 22]]);
const SKOG_TREES = (() => {
  const rand = rng(41);
  const back: { x: number; y: number; h: number }[] = [];
  const front: { x: number; y: number; h: number }[] = [];
  for (let x = 30; x < 600; x += 11 + rand() * 10) {
    back.push({ x: r2(x), y: r2(SKOG.h - skogTop(x) + 10 + rand() * 5), h: r2(22 + rand() * 22 + skogTop(x) * 0.12) });
  }
  for (let x = 140; x < 590; x += 16 + rand() * 18) {
    const ground = SKOG.h - skogTop(x);
    front.push({ x: r2(x), y: r2(ground + 18 + rand() * (SKOG.h - ground - 22)), h: r2(20 + rand() * 16) });
  }
  front.sort((a, b) => a.y - b.y);
  return { back, front };
})();

/**
 * A row of spruce (landskap's Gran, four tiers each) as three paths, trunks,
 * dark tiers and light tiers, rather than five elements a tree: the forest
 * is some sixty trees, and drawn one by one it was a third of the hero's
 * elements, all of them to be hydrated on a phone.
 */
function granRow(trees: readonly { x: number; y: number; h: number }[], tiers = 4) {
  let trunk = "";
  let dark = "";
  let light = "";
  for (const { x, y, h } of trees) {
    const w = h * 0.3;
    trunk += `M${r2(x - w * 0.09)},${r2(y - h * 0.12)} h${r2(w * 0.18)} v${r2(h * 0.12)} h${r2(-w * 0.18)} Z `;
    for (let i = 0; i < tiers; i++) {
      const t = i / tiers;
      const by = y - h * 0.07 - t * h * 0.74;
      const tw = w * (1 - t * 0.74);
      const th = h * 0.46;
      const d = `M${r2(x - tw)},${r2(by)} Q${r2(x - tw * 0.42)},${r2(by - th * 0.4)} ${r2(x)},${r2(by - th)} Q${r2(x + tw * 0.42)},${r2(by - th * 0.4)} ${r2(x + tw)},${r2(by)} Q${r2(x)},${r2(by - th * 0.16)} ${r2(x - tw)},${r2(by)} Z `;
      if (i % 2) light += d;
      else dark += d;
    }
  }
  return (
    <>
      <path d={trunk} fill="#6B5A40" />
      <path d={dark} fill="#5D8467" />
      <path d={light} fill="#6E9677" />
    </>
  );
}

export const SKOG_ART = (
  <svg viewBox={`0 0 ${SKOG.w} ${SKOG.h}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
    {granRow(SKOG_TREES.back)}
    <path d={ridgePath(SKOG.w, SKOG.h, skogTop)} fill="#BDD2B8" />
    <path d={ridgePath(SKOG.w, SKOG.h, (x) => skogTop(x) * 0.42)} fill="#B1C9AA" />
    {granRow(SKOG_TREES.front)}
  </svg>
);

/** The birch slope on the right, in front of the forest: the birches grow out of it. */
export const LIA = { x: 236, y: 334, w: 364, h: 170 };
const liaTop = (x: number) => 6 + 70 / (1 + Math.exp(-(x - 130) / 42));
export const LIA_ART = (
  <svg viewBox={`0 0 ${LIA.w} ${LIA.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
    <Bjork x={176} y={r2(LIA.h - liaTop(176) + 34)} h={124} seed={21} lean={-0.3} />
    <Bjork x={252} y={r2(LIA.h - liaTop(252) + 40)} h={146} seed={25} lean={0.25} />
    <Bjork x={322} y={r2(LIA.h - liaTop(322) + 34)} h={116} seed={29} lean={-0.2} />
    <path d={ridgePath(LIA.w, LIA.h, liaTop)} fill="#C4D99C" />
    <path d={ridgePath(LIA.w, LIA.h, (x) => liaTop(x) * 0.5)} fill="#B9D08E" />
  </svg>
);

/* The valley floor and the river Lågen, glued flat on the page. */
const RIVER =
  "M14,264 C52,288 104,326 124,378 C144,430 158,474 212,532 L292,532 C222,470 194,428 172,376 C150,322 92,282 34,262 Z";
const RIVER_LIGHT =
  "M22,264 C62,290 112,330 134,382 C154,432 172,476 232,532 L262,532 C206,474 182,430 160,380 C138,328 84,288 30,264 Z";
const DAISIES = (() => {
  const rand = rng(113);
  const out: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 26; i++) {
    const y = 420 + rand() * 104;
    const x = 30 + rand() * 540;
    // Not in the river
    const riverX = 120 + ((y - 380) / 152) * 130;
    if (Math.abs(x - riverX) < 52) continue;
    out.push({ x: r2(x), y: r2(y), r: r2(3.4 + rand() * 2.2) });
  }
  return out;
})();

export const DALEN_ART = (
  <svg viewBox="0 0 600 540" className="absolute inset-0 h-full w-full" aria-hidden="true">
    <PaperShadow dy={3}>
      <path d="M10,268 C140,250 300,262 420,252 C500,246 560,254 590,258 L590,524 Q590,532 582,532 L18,532 Q10,532 10,524 Z" />
    </PaperShadow>
    <path d="M10,268 C140,250 300,262 420,252 C500,246 560,254 590,258 L590,524 Q590,532 582,532 L18,532 Q10,532 10,524 Z" fill="#DDE8C6" />
    <path d="M10,404 C120,392 260,410 380,398 C470,390 540,398 590,394 L590,524 Q590,532 582,532 L18,532 Q10,532 10,524 Z" fill="#D3E1B6" />
    {DAISIES.map((d, i) => (
      <Blomst key={i} x={d.x} y={d.y} r={d.r} seed={300 + i} />
    ))}
  </svg>
);

export const RIVER_ART = (
  <svg viewBox="0 0 600 540" className="absolute inset-0 h-full w-full" aria-hidden="true">
    <PaperShadow dy={2.5}>
      <path d={RIVER} />
    </PaperShadow>
    <path d={RIVER} fill="#AECBD8" />
    <path d={RIVER_LIGHT} fill="#C9DEE7" />
    <NoShadow>
      <path d="M92,330 q8,4 16,2 M140,410 q9,4 18,1 M186,470 q10,5 22,2" fill="none" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" opacity={0.9} />
    </NoShadow>
  </svg>
);

/* ── Single pieces that stand on their own hinge ──
   Each fits on the page in front of its hinge (y + h <= 540), so it can lie
   there face down. Each is its drawing, drawn once in its own box. */

export type Cut = { box: { x: number; y: number; w: number; h: number }; shape: React.ReactNode };

/** A big birch by the river, on the near side of it. */
export const BJORK: Cut = {
  box: { x: 0, y: 342, w: 110, h: 196 },
  shape: <Bjork x={55} y={196} h={188} seed={33} lean={0.2} />,
};

/** Two spruces on the right. */
export const GRAN: Cut = {
  box: { x: 506, y: 402, w: 92, h: 124 },
  shape: (
    <>
      <Gran x={64} y={124} h={96} w={26} tiers={5} fill="#6E9677" dark="#5A8164" />
      <Gran x={32} y={124} h={124} w={30} tiers={6} fill="#6E9677" dark="#5A8164" />
    </>
  ),
};

/** Junipers, low and dark, at the front corners. */
const einer = (seed: number) => {
  const rand = rng(seed);
  return [0, 1, 2].map((i) => ({ x: r2(14 + i * 10 + rand() * 4), r: r2(9 + rand() * 4), h: r2(16 + rand() * 12) }));
};
function Einer({ seed }: { seed: number }) {
  return (
    <>
      {einer(seed).map((b, i) => (
        <path
          key={i}
          d={`M${r2(b.x - b.r)},40 C${r2(b.x - b.r)},${r2(40 - b.h * 0.7)} ${r2(b.x - b.r * 0.4)},${r2(40 - b.h * 1.25)} ${b.x},${r2(40 - b.h * 1.3)} C${r2(b.x + b.r * 0.4)},${r2(40 - b.h * 1.25)} ${r2(b.x + b.r)},${r2(40 - b.h * 0.7)} ${r2(b.x + b.r)},40 Z`}
          fill={i % 2 ? "#5F8A6A" : "#4E7759"}
        />
      ))}
    </>
  );
}
export const EINER: Cut[] = [
  { box: { x: 34, y: 494, w: 46, h: 40 }, shape: <Einer seed={5} /> },
  { box: { x: 552, y: 498, w: 46, h: 40 }, shape: <Einer seed={9} /> },
];

/** The clinic's sign: a post, an arm, and the board hanging from it. */
export const SKILT: Cut = {
  box: { x: 382, y: 386, w: 132, h: 150 },
  shape: (
    <>
      <rect x={110} y={6} width={9} height={144} rx={1.5} fill="#8A6A4C" />
      <rect x={112.5} y={6} width={3} height={144} fill="#9C7C5C" />
      <rect x={14} y={12} width={104} height={7} rx={1.5} fill="#8A6A4C" />
      <path d="M110,50 L84,19 L92,19 L114,44 Z" fill="#7A5C40" />
      <rect x={108} y={2} width={13} height={6} rx={2} fill="#6E5440" />
    </>
  ),
};
/** The board's outline, for the sign's shadow and its back. */
export const BOARD_OUTLINE = <rect x={20} y={26} width={84} height={68} rx={3} />;
/** The board, on a layer of its own so it can swing from its hooks on the arm. */
export const BOARD = { x: 20, y: 19, w: 84, h: 76 };
export const BOARD_ART = (
  <svg viewBox={`${BOARD.x} ${BOARD.y} ${BOARD.w} ${BOARD.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
    <NoShadow>
      <path d="M34,19 L34,28 M90,19 L90,28" stroke="#4A4540" strokeWidth={1.4} />
    </NoShadow>
    <PaperShadow dy={3}>
      <rect x={20} y={26} width={84} height={68} rx={3} />
    </PaperShadow>
    <rect x={20} y={26} width={84} height={68} rx={3} fill="#1E3438" />
    <rect x={24} y={30} width={76} height={60} rx={1.5} fill="#F4F6F2" />
    <NoShadow>
      <image href="/images/logo-mark.png" x={41} y={37} width={42} height={39} preserveAspectRatio="xMidYMid meet" />
    </NoShadow>
  </svg>
);

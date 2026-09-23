"use client";

import { createContext, useContext, useId } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { usePhase } from "./usePhase";
import { VB, type Scene, type SceneProps } from "./types";

/**
 * Papirteater. Every arch on /behandlinger, and every box on the front page,
 * holds a little paper theatre. The scenery lies folded flat until its arch
 * reaches the middle (or its box opens), then each sheet stands up in turn,
 * like a pop-up book opening. The sheets sit at different depths, so as the
 * wall walks past they shift against each other and the arch around them. The
 * instruments are puppets: the crown is lowered on strings.
 *
 * Every scene is cut from one palette of paper, supplied by `withPalette`, so
 * the same scene can be set in a different colour per arch or per box.
 */

/* ── Paper ── */

export type Palette = {
  /** The one solid colour behind the scene in an arch. */
  ground: string;
  /** The top of the painted sky in the front page's boxes and the book. */
  sky: string;
  far: string;
  near: string;
  deep: string;
  mid: string;
  paper: string;
  /** The shaded side of white paper. */
  shade: string;
  ink: string;
  accent: string;
  /** The scalloped front lip of the stage. */
  lip: string;
};

export const PALETTES = {
  eukalyptus: { ground: "#CDDEDA", sky: "#EAF1EF", far: "#DEE7E6", near: "#BCD5CE", deep: "#5C9A90", mid: "#8DBBB1", paper: "#FFFFFF", shade: "#DEE7E6", ink: "#0E2A30", accent: "#7CB1A7", lip: "#FBF8F1" },
  fjord: { ground: "#BED5DF", sky: "#E6F0F4", far: "#D3E3EA", near: "#A8C7D3", deep: "#4F8497", mid: "#7FAABA", paper: "#FFFFFF", shade: "#D9E6EC", ink: "#143845", accent: "#3F8AA0", lip: "#F7FAFB" },
  frost: { ground: "#D0DEE9", sky: "#EEF3F7", far: "#DDE7EF", near: "#C3D4E2", deep: "#6E8BA4", mid: "#9DB4C8", paper: "#FFFFFF", shade: "#E3EBF2", ink: "#1E3243", accent: "#8FB9DA", lip: "#F8FAFC" },
  lav: { ground: "#D6E0C0", sky: "#F1F3E9", far: "#E3E9D4", near: "#C8D6AC", deep: "#778F55", mid: "#A3B982", paper: "#FFFFFF", shade: "#E6EBDA", ink: "#2C3A1F", accent: "#9DB86A", lip: "#FAFBF5" },
  lyng: { ground: "#D8CFE3", sky: "#F2EFF5", far: "#E4DEEC", near: "#CBC0DA", deep: "#786A96", mid: "#A396BD", paper: "#FFFFFF", shade: "#E8E3EF", ink: "#2A233D", accent: "#9C8BC4", lip: "#FAF8FB" },
  bjork: { ground: "#DDD5C8", sky: "#F4F1EC", far: "#E8E2D8", near: "#D2C8B8", deep: "#86796A", mid: "#AFA391", paper: "#FFFFFF", shade: "#ECE6DC", ink: "#2D2822", accent: "#B59F7E", lip: "#FBF9F5" },
  mose: { ground: "#C6D9C9", sky: "#EDF2EE", far: "#DAE6DC", near: "#B1CCB6", deep: "#4B7A57", mid: "#7BA285", paper: "#FFFFFF", shade: "#E0EAE2", ink: "#1B3121", accent: "#6FA07B", lip: "#F7FAF7" },
  skumring: { ground: "#BBC3DC", sky: "#DDE2EE", far: "#CDD3E6", near: "#A9B2D2", deep: "#4B5784", mid: "#7883AD", paper: "#FFFFFF", shade: "#DDE1EE", ink: "#1B2140", accent: "#F2E7B8", lip: "#F3F4F9" },
  molte: { ground: "#ECD6C4", sky: "#F8F0E8", far: "#F1E3D6", near: "#E6C9B2", deep: "#B07E62", mid: "#D2A386", paper: "#FFFFFF", shade: "#F2E6DB", ink: "#3B271C", accent: "#E0A77E", lip: "#FCF8F4" },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof PALETTES;

/** Metal and tartar are the same in every palette. */
export const STEEL = "#CFD8D6";
export const SAND = "#D6CBAA";

type PaperSetting = { p: Palette; sky: boolean };
const PaperCtx = createContext<PaperSetting>({ p: PALETTES.eukalyptus, sky: false });
export const usePaper = () => useContext(PaperCtx);

/**
 * Sets a scene in a palette. In an arch the stage is one solid colour, the
 * palette's `ground`, which the scene also carries so a room around it can
 * match. `sky` paints a sky that fades down to the hills instead, as in the
 * boxes on the front page.
 */
export function withPalette(S: Scene, name: PaletteName, sky = false): Scene {
  const setting = { p: PALETTES[name], sky };
  const Set = (props: SceneProps) => (
    <PaperCtx.Provider value={setting}>
      <S {...props} />
    </PaperCtx.Provider>
  );
  Set.displayName = `${S.displayName ?? S.name}(${name})`;
  Set.ground = PALETTES[name].ground;
  return Set;
}

export const SHADOW = "drop-shadow(0 1px 1px rgba(14,42,48,0.16)) drop-shadow(0 7px 9px rgba(14,42,48,0.13))";

/* ── Stage and sheets ── */

export function Stage({ active, reduced, children }: { active: boolean; reduced: boolean; children: React.ReactNode }) {
  const { p, sky } = usePaper();
  return (
    <div className="absolute inset-0" style={{ perspective: 900, perspectiveOrigin: "50% 20%" }}>
      <div className="absolute inset-0" style={{ background: sky ? `linear-gradient(to bottom, ${p.sky}, ${p.far})` : p.ground }} />
      {children}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.5 }}
      >
        <GrainOverlay opacity={0.09} />
      </motion.div>
    </div>
  );
}

type SheetProps = {
  /** Order it stands up in, back to front. */
  n: number;
  on: boolean;
  reduced: boolean;
  d: MotionValue<number>;
  /** How far forward the sheet stands: nearer sheets slide further as the wall moves. */
  depth: number;
  shadow?: boolean;
  children: React.ReactNode;
};

export function Sheet({ n, on, reduced, d, depth, shadow = true, children }: SheetProps) {
  const x = useTransform(d, (v) => (reduced ? 0 : -v * depth * 16));
  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, transformOrigin: "50% 100%", filter: shadow ? SHADOW : undefined }}
      initial={{ rotateX: 88, opacity: 0 }}
      animate={on ? { rotateX: 0, opacity: 1 } : { rotateX: 88, opacity: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : on
            ? { rotateX: { type: "spring", stiffness: 85, damping: 13, delay: 0.1 + n * 0.11 }, opacity: { duration: 0.25, delay: 0.1 + n * 0.11 } }
            : { duration: 0.45, ease: [0.5, 0, 0.75, 0], delay: (6 - n) * 0.035 }
      }
    >
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible">
        {children}
      </svg>
    </motion.div>
  );
}

/** A scalloped paper edge, the front lip of the stage. */
export function scallops(y: number, r = 14, from = -420, to = 720) {
  let path = `M${from},540 L${from},${y}`;
  for (let x = from; x < to; x += r * 2) path += ` Q${x + r},${y - r * 0.9} ${x + r * 2},${y}`;
  return `${path} L${to},540 Z`;
}

export const FAR_HILLS = "M-420,430 C-200,370 0,392 80,360 C150,334 220,372 300,350 C400,326 560,372 720,360 L720,540 L-420,540 Z";
export const NEAR_HILLS = "M-420,478 C-150,438 20,458 120,428 C200,406 260,438 330,426 C450,408 580,448 720,438 L720,540 L-420,540 Z";
/** Gum behind a tooth standing in the middle, and the lip of gum in front of it. */
export const GUM_BACK = (y = 446) => `M-420,${y} C-200,${y - 20} 40,${y - 10} 96,${y - 32} Q150,${y - 48} 204,${y - 32} C260,${y - 10} 500,${y - 20} 720,${y} L720,540 L-420,540 Z`;
export const GUM_FRONT = (y = 476) => `M-420,${y} C-200,${y - 18} 40,${y - 8} 92,${y - 30} Q108,${y - 42} 118,${y - 34} Q150,${y - 18} 182,${y - 34} Q192,${y - 42} 208,${y - 30} C260,${y - 8} 500,${y - 18} 720,${y} L720,540 L-420,540 Z`;

// A molar, so it reads as a tooth at a glance: two cusps, narrowing to the gum.
export const MOLAR = "M118,440 C114,400 104,330 106,286 C107,252 112,228 124,216 C134,206 144,210 150,222 C156,210 166,206 176,216 C188,228 193,252 194,286 C196,330 186,400 182,440 Z";
export const MOLAR_SHADE = "M176,216 C188,228 193,252 194,286 C196,330 186,400 182,440 L170,440 C176,400 182,332 180,290 C179,258 176,236 170,224 Z";

/**
 * A four-point paper star. Coordinates are rounded: positions computed with
 * sin/cos differ between the server and the browser in the last decimals,
 * and an unrounded path would not hydrate.
 */
export function starPath(cx: number, cy: number, s: number) {
  const r = (n: number) => Math.round(n * 100) / 100;
  const [x, y] = [r(cx), r(cy)];
  const [a, b] = [r(11 * s), r(1.6 * s)];
  return `M${x},${r(y - a)} Q${r(x + b)},${r(y - b)} ${r(x + a)},${y} Q${r(x + b)},${r(y + b)} ${x},${r(y + a)} Q${r(x - b)},${r(y + b)} ${r(x - a)},${y} Q${r(x - b)},${r(y - b)} ${x},${r(y - a)} Z`;
}

export function Star({ x, y, s = 1, show, delay = 0, reduced, color }: { x: number; y: number; s?: number; show: boolean; delay?: number; reduced: boolean; color?: string }) {
  const { p } = usePaper();
  return (
    <motion.path
      d={starPath(x, y, s)}
      fill={color ?? p.paper}
      style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5, filter: SHADOW }}
      initial={{ scale: 0, opacity: 0 }}
      animate={show && !reduced ? { scale: [0, 1.15, 0.9, 1, 0], opacity: [0, 1, 1, 1, 0], rotate: [0, 30] } : { scale: 0, opacity: 0 }}
      transition={show && !reduced ? { duration: 1.8, delay, times: [0, 0.2, 0.35, 0.8, 1] } : { duration: 0.1 }}
    />
  );
}

/* ───────────── Forebyggende: the mirror puppet ───────────── */

export function PapirSpeil({ active, reduced, d }: SceneProps) {
  const id = useId().replace(/:/g, "");
  const { p } = usePaper();
  const on = active;
  const glassX = useTransform(d, (v) => (reduced ? 0 : v * 30));
  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.6} shadow={false}>
        <motion.g
          animate={on && !reduced ? { x: [0, 10, 0] } : { x: 0 }}
          transition={on && !reduced ? { duration: 14, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          style={{ filter: SHADOW }}
        >
          <path d="M34,168 Q34,148 54,150 Q60,132 80,138 Q92,126 106,140 Q124,140 122,158 Q126,172 110,172 L46,172 Q34,172 34,168 Z" fill={p.paper} />
          <path d="M198,122 Q198,108 212,110 Q218,96 234,102 Q246,94 254,108 Q268,110 264,124 L206,126 Q198,126 198,122 Z" fill={p.paper} />
        </motion.g>
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={1.6}>
        <path d={NEAR_HILLS} fill={p.near} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.4}>
        <defs>
          <clipPath id={`pglass-${id}`}>
            <circle cx={160} cy={206} r={46} />
          </clipPath>
        </defs>
        {/* The puppet sways from the foot of its rod */}
        <motion.g
          style={{ transformBox: "view-box", originX: "150px", originY: "540px" }}
          animate={on && !reduced ? { rotate: [-3.5, 3.5, -3.5] } : { rotate: 0 }}
          transition={on && !reduced ? { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 } : { duration: 0.3 }}
        >
          <rect x={141} y={306} width={18} height={250} rx={9} fill={p.ink} />
          <rect x={138} y={296} width={24} height={12} rx={4} fill={p.deep} />
          <path d="M146,300 L146,270 Q146,252 154,236 L160,240 Q153,254 153,272 L153,300 Z" fill={p.ink} />
          <circle cx={160} cy={206} r={58} fill={p.paper} />
          <circle cx={160} cy={206} r={52} fill={p.far} />
          {/* The glass shows hills, cut from the same paper, drifting as the arch passes */}
          <g clipPath={`url(#pglass-${id})`}>
            <circle cx={160} cy={206} r={46} fill={p.sky} />
            <motion.g style={{ x: glassX }}>
              <path d="M40,228 C82,210 114,224 148,208 C178,194 212,216 280,206 L280,260 L40,260 Z" fill={p.near} />
              <path d="M40,242 C88,232 130,248 170,236 C206,226 240,242 280,238 L280,260 L40,260 Z" fill={p.mid} />
            </motion.g>
          </g>
          <path d="M128,184 Q136,166 156,160" fill="none" stroke={p.paper} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
        </motion.g>
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        <path d={scallops(502)} fill={p.lip} />
        <Star x={222} y={150} show={on} delay={1.9} reduced={reduced} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Kron og bro: the crown on strings ───────────── */

const CROWN_STEPS = [
  ["enter", 1300],
  ["down", 2100],
  ["rest", 2400],
  ["up", 1500],
] as const;

export const CROWN = "M100,426 C98,396 96,352 102,322 C106,304 112,294 122,290 C128,276 138,274 144,286 C148,278 152,278 156,286 C162,274 172,276 178,290 C188,294 194,304 198,322 C204,352 202,396 200,426 Z";
export const CROWN_SHADE = "M178,290 C188,294 194,304 198,322 C204,352 202,396 200,426 L186,426 C188,396 188,350 184,322 C182,306 180,298 178,290 Z";

export function PapirKrone({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, CROWN_STEPS, 1);
  const y = reduced ? 0 : phase === "down" || phase === "rest" ? 0 : phase === "up" ? -54 : -300;
  const strings = !reduced && (phase === "enter" || phase === "down" || phase === "up");

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={GUM_BACK(446)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <path d="M106,428 L116,332 Q118,318 132,316 L168,316 Q182,318 184,332 L194,428 Z" fill={p.paper} />
        <path d="M168,316 Q182,318 184,332 L194,428 L178,428 L170,334 Z" fill={p.shade} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <motion.g
          initial={{ y: -300 }}
          animate={{ y }}
          transition={
            reduced
              ? { duration: 0 }
              : phase === "down"
                ? { type: "spring", stiffness: 38, damping: 7.5, mass: 1.2 }
                : phase === "up"
                  ? { duration: 1.2, ease: [0.45, 0, 0.3, 1] }
                  : { duration: 0.9, ease: [0.3, 0, 0.2, 1] }
          }
        >
          {/* The strings it hangs from */}
          <motion.path
            d="M123,288 L112,-320 M177,288 L188,-320"
            stroke={p.ink}
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: strings ? 0.75 : 0, y: strings ? 0 : -70 }}
            transition={{ duration: 0.6 }}
          />
          {/* A pendulum sway on the way down */}
          <motion.g
            style={{ transformBox: "view-box", originX: "150px", originY: "0px" }}
            animate={phase === "down" && !reduced ? { rotate: [4, -3, 1.6, -0.7, 0] } : { rotate: 0 }}
            transition={{ duration: 1.9, ease: "easeOut" }}
          >
            <path d={CROWN} fill={p.paper} />
            <path d={CROWN_SHADE} fill={p.shade} />
            <path d="M126,300 Q138,310 150,301 Q162,310 174,300" fill="none" stroke={p.deep} strokeWidth={2} strokeLinecap="round" />
          </motion.g>
        </motion.g>
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        <path d={GUM_FRONT(476)} fill={p.mid} />
        <Star x={214} y={300} show={phase === "rest"} delay={0.2} reduced={reduced} />
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Tannkjøtt & tannstein: the scaler puppet ───────────── */

const SCALE_STEPS = [
  ["enter", 1700],
  ["clean", 2700],
  ["shine", 2300],
  ["reset", 900],
] as const;

const CHIPS = [
  { d: "M118,428 L122,414 L131,412 L133,424 Z", dx: -30, dy: 150, r: -200 },
  { d: "M134,422 L139,410 L148,413 L145,425 Z", dx: -12, dy: 170, r: 160 },
  { d: "M149,426 L153,412 L163,414 L161,428 Z", dx: 10, dy: 160, r: -140 },
  { d: "M164,422 L169,410 L177,414 L174,427 Z", dx: 26, dy: 150, r: 220 },
  { d: "M172,432 L176,419 L182,421 L181,433 Z", dx: 44, dy: 165, r: -180 },
] as const;

const SPRAY = Array.from({ length: 8 }, (_, k) => {
  const a = -2.7 + k * 0.36;
  return { dx: Math.cos(a) * (30 + (k % 3) * 12), dy: Math.sin(a) * 34, delay: (k % 4) * 0.2, r: 3 + (k % 3) };
});

export function PapirSkraper({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, SCALE_STEPS, 1);
  const cleaning = phase === "clean";
  const gone = cleaning || phase === "shine";
  const tip = { x: 176, y: 412 };

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={GUM_BACK(452)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <path d={MOLAR} fill={p.paper} />
        <path d={MOLAR_SHADE} fill={p.shade} />
        {CHIPS.map((c, k) => (
          <motion.path
            key={k}
            d={c.d}
            fill={SAND}
            style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
            initial={{ opacity: 0 }}
            animate={
              !on || reduced
                ? { opacity: 0, x: 0, y: 0, rotate: 0 }
                : gone
                  ? { opacity: [1, 1, 0], x: [0, c.dx * 0.4, c.dx], y: [0, 20, c.dy], rotate: [0, c.r * 0.3, c.r] }
                  : { opacity: 1, x: 0, y: 0, rotate: 0 }
            }
            transition={gone ? { duration: 1.4, delay: 0.3 + k * 0.34, ease: [0.4, 0, 0.8, 0.6] } : { duration: 0.4, delay: 0.9 + k * 0.06 }}
          />
        ))}
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <path d={GUM_FRONT(482)} fill={p.mid} />
        {SPRAY.map((s, k) => (
          <motion.circle
            key={k}
            cx={tip.x}
            cy={tip.y}
            r={s.r}
            fill={k % 2 ? p.near : p.paper}
            style={{ filter: SHADOW }}
            initial={{ opacity: 0 }}
            animate={cleaning && !reduced ? { x: [0, s.dx, s.dx * 1.15], y: [0, s.dy, s.dy + 44], opacity: [0, 1, 0], scale: [0.4, 1, 0.8] } : { opacity: 0, x: 0, y: 0 }}
            transition={cleaning && !reduced ? { duration: 1, repeat: Infinity, delay: s.delay, ease: "easeOut" } : { duration: 0.1 }}
          />
        ))}
        <Star x={134} y={262} s={0.9} show={phase === "shine"} delay={0.3} reduced={reduced} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.4}>
        {/* The scaler puppet on its rod, humming while it works */}
        <motion.g
          animate={cleaning && !reduced ? { x: [0, 1.4, -1.1, 0.9, 0], y: [0, -0.8, 0.9, -0.5, 0] } : { x: 0, y: 0 }}
          transition={cleaning && !reduced ? { duration: 0.12, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
        >
          <motion.g
            initial={{ x: 90, y: -90 }}
            animate={on ? { x: 0, y: 0 } : { x: 90, y: -90 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 12, delay: on ? 0.9 : 0 }}
          >
            <path d="M246,70 L270,78 L234,238 L214,232 Z" fill={STEEL} />
            <path d="M240,118 L264,126 L256,160 L232,152 Z" fill={p.ink} />
            <path d="M216,232 L232,238 C224,300 204,356 180,414 L172,410 C194,354 210,300 216,232 Z" fill={STEEL} />
            <path d="M270,78 L340,-120" stroke={p.ink} strokeWidth={1.4} />
          </motion.g>
        </motion.g>
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={4}>
        <path d={scallops(514, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  FAR_HILLS,
  SAND,
  Sheet,
  Stage,
  Star,
  scallops,
  starPath,
  usePaper,
  withPalette,
  type PaletteName,
} from "@/components/behandlinger/scenes/Papir";
import { usePhase } from "@/components/behandlinger/scenes/usePhase";
import type { Scene, SceneProps } from "@/components/behandlinger/scenes/types";
import type { SymptomSlug } from "../data";
import { BLOOD, Eple, Isbit, Pastiller, Sjokolade, Speil, Tannborste } from "./Ting";

/**
 * A paper theatre for every symptom, built on the same stage, sheets and
 * palettes as the treatments on /behandlinger. Where a treatment scene shows
 * the clinic's instrument at work, a symptom scene shows the moment you
 * notice it: the chocolate that finds the hole, the ice cube on a bare
 * tooth neck, the brush that comes away red.
 *
 * `puppet={false}` leaves the everyday thing out, for a page that brings its
 * own (Hverdagen drags it in by hand).
 */

export type SymptomSceneProps = SceneProps & { puppet?: boolean };

export const ACHE = "#E0876B";
export const INFLAMED = "#E8A396";
export const INFLAMED_LIGHT = "#F4C7BD";
export const ICE_BLUE = "#7DB7E3";
export const DENTIN = "#EFE2C2";

const pivot = (x: number, y: number) => ({ transformBox: "view-box" as const, originX: `${x}px`, originY: `${y}px` });
const centre = { transformBox: "fill-box" as const, originX: 0.5, originY: 0.5 };

/* ── Teeth and gums ── */

// A molar that reaches down into the gum, so no gap shows at its neck.
export const TOOTH =
  "M121,486 L117,440 C111,410 104,372 104,336 C104,304 110,280 125,268 C135,260 144,264 150,276 C156,264 165,260 175,268 C190,280 196,304 196,336 C196,372 189,410 183,440 L179,486 Z";
export const TOOTH_SHADE =
  "M175,268 C190,280 196,304 196,336 C196,372 189,410 183,440 L179,486 L167,486 L171,440 C179,408 185,370 185,338 C185,310 181,290 169,278 Z";
const CAVITY = "M140,294 C141,284 157,282 160,292 C163,302 155,309 148,307 C141,306 138,301 140,294 Z";

/**
 * The gum in front, scalloped: it peaks between the teeth and dips at each
 * tooth's middle. A receded tooth dips further, baring its neck.
 */
export function gumFront(y: number, h = 24, recede = 0) {
  let d = `M-474,560 L-474,${y - h}`;
  for (let k = -6; k <= 6; k++) {
    const c = 150 + 96 * k;
    const dip = y + (k === 0 ? recede : 0);
    d += ` C${c - 40},${y - h + 3} ${c - 26},${dip} ${c},${dip} C${c + 26},${dip} ${c + 40},${y - h + 3} ${c + 48},${y - h}`;
  }
  return `${d} L${150 + 96 * 6 + 48},560 Z`;
}

export const gumBack = (y = 442) =>
  `M-430,${y} C-200,${y - 12} -10,${y - 42} 150,${y - 46} C310,${y - 42} 500,${y - 12} 730,${y} L730,560 L-430,560 Z`;

function Tooth({ dx = 0, fill, shade }: { dx?: number; fill: string; shade: string }) {
  return (
    <g transform={dx ? `translate(${dx},0)` : undefined}>
      <path d={TOOTH} fill={fill} />
      <path d={TOOTH_SHADE} fill={shade} />
    </g>
  );
}

/* ── Effects ── */

/** Pain: arcs either side of a point, flashing outward. */
export function AcheArcs({
  x, y, spread, show, reduced, color = ACHE, rings = 3, width = 4.5,
}: {
  x: number;
  y: number;
  spread: number;
  show: boolean;
  reduced: boolean;
  color?: string;
  rings?: number;
  width?: number;
}) {
  return (
    <g>
      {[-1, 1].map((side) =>
        Array.from({ length: rings }, (_, k) => {
          const r = spread + k * 13;
          const h = 14 + k * 7;
          const ax = x + side * r;
          return (
            <motion.path
              key={`${side}${k}`}
              d={`M${ax},${y - h} Q${ax + side * 11},${y} ${ax},${y + h}`}
              fill="none"
              stroke={color}
              strokeWidth={width}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={show ? (reduced ? { opacity: 1 } : { opacity: [0, 1, 1, 0] }) : { opacity: 0 }}
              transition={
                show && !reduced
                  ? { duration: 1.05, repeat: Infinity, delay: k * 0.16, times: [0, 0.25, 0.6, 1] }
                  : { duration: 0.3 }
              }
            />
          );
        })
      )}
    </g>
  );
}

export const DROP = "M0,-7 C3,-3 6,1 6,5 A6,6 0 0 1 -6,5 C-6,1 -3,-3 0,-7 Z";

// Bolts of cold, running out from the tooth neck.
const BOLTS = [
  "M102,352 L86,344 L82,360 L64,352 L58,366",
  "M198,352 L214,344 L218,360 L236,352 L242,366",
  "M112,300 L98,288 L108,280 L92,266 L96,254",
  "M188,300 L202,288 L192,280 L208,266 L204,254",
  "M122,416 L104,420 L112,434 L92,440",
  "M178,416 L196,420 L188,434 L208,440",
];

export function Bolts({ show, reduced, color = ICE_BLUE, paths = BOLTS }: { show: boolean; reduced: boolean; color?: string; paths?: string[] }) {
  return (
    <g>
      {paths.map((b, k) => (
        <motion.path
          key={k}
          d={b}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            show
              ? reduced
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: [0, 1, 1], opacity: [0, 1, 0] }
              : { pathLength: 0, opacity: 0 }
          }
          transition={show && !reduced ? { duration: 0.75, repeat: Infinity, delay: k * 0.09, repeatDelay: 0.15 } : { duration: 0.2 }}
        />
      ))}
    </g>
  );
}

export const wispPath = (x: number, y: number) =>
  `M${x},${y} C${x - 24},${y - 30} ${x + 24},${y - 60} ${x},${y - 90} C${x - 24},${y - 120} ${x + 24},${y - 150} ${x},${y - 180}`;

export function Wisp({ d, show, faint = false, delay = 0, reduced, color }: { d: string; show: boolean; faint?: boolean; delay?: number; reduced: boolean; color: string }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={10}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0, y: 0 }}
      animate={
        show
          ? reduced
            ? { pathLength: 1, opacity: faint ? 0.4 : 0.9, y: 0 }
            : { pathLength: [0, 1, 1], opacity: [0, faint ? 0.45 : 0.9, 0], y: [0, -24, -46] }
          : { pathLength: 0, opacity: 0, y: 0 }
      }
      transition={show && !reduced ? { duration: 2.6, repeat: Infinity, delay, ease: "easeOut" } : { duration: 0.4 }}
    />
  );
}

/* ───────────── Tannpine: the chocolate that finds the hole ───────────── */

const PAIN_STEPS = [
  ["enter", 1500],
  ["bite", 1100],
  ["ache", 3600],
  ["calm", 1300],
] as const;

export function SymptomTannpine({ active, reduced, d, puppet = true }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, PAIN_STEPS);
  const aching = reduced ? on : phase === "ache";
  const holed = reduced ? on : phase === "bite" || phase === "ache" || phase === "calm";
  const choc = reduced
    ? { x: 230, y: -300, rotate: 20 }
    : phase === "enter"
      ? { x: 0, y: 40, rotate: -8 }
      : phase === "bite"
        ? { x: 0, y: 86, rotate: 0 }
        : { x: 230, y: -300, rotate: 20 };

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={gumBack(442)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <Tooth dx={-96} fill={p.paper} shade={p.shade} />
        <Tooth dx={96} fill={p.paper} shade={p.shade} />
        {/* The aching tooth throbs, and warms */}
        <motion.g
          style={pivot(150, 470)}
          animate={aching && !reduced ? { scale: [1, 1.045, 1, 1.03, 1] } : { scale: 1 }}
          transition={aching && !reduced ? { duration: 1.05, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
        >
          <motion.path d={TOOTH} initial={{ fill: p.paper }} animate={{ fill: aching ? "#FFE6D8" : p.paper }} transition={{ duration: 0.8 }} />
          <path d={TOOTH_SHADE} fill={p.shade} />
          <motion.path
            d={CAVITY}
            fill={p.ink}
            style={centre}
            initial={{ scale: 0, opacity: 0 }}
            animate={holed ? { scale: 1, opacity: 0.85 } : { scale: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.3 }}
          />
        </motion.g>
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <path d={gumFront(458)} fill={p.mid} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        <AcheArcs x={150} y={344} spread={64} show={aching} reduced={reduced} />
        {puppet && (
          <motion.g
            style={centre}
            initial={{ x: 230, y: -300, rotate: 20 }}
            animate={choc}
            transition={phase === "bite" ? { type: "spring", stiffness: 260, damping: 13 } : { type: "spring", stiffness: 55, damping: 14 }}
          >
            <g transform="translate(150,148)">
              <path d="M30,-26 L260,-440" stroke={p.ink} strokeWidth={1.4} />
              <Sjokolade p={p} />
            </g>
          </motion.g>
        )}
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Blødende tannkjøtt: the brush that comes away red ───────────── */

const BLEED_STEPS = [
  ["enter", 1300],
  ["brush", 2800],
  ["drip", 2400],
  ["rest", 1000],
] as const;

const DROPS = [
  [102, 437, 0.9],
  [128, 452, 1],
  [172, 452, 0.85],
  [198, 437, 1.1],
  [224, 452, 0.9],
] as const;

export function SymptomBlodende({ active, reduced, d, puppet = true }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, BLEED_STEPS);
  const brushing = !reduced && phase === "brush";
  const bleeding = reduced ? on : phase === "brush" || phase === "drip";
  const dripping = !reduced && phase === "drip";
  const off = { x: 320, y: -140 };

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={gumBack(442)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <Tooth dx={-96} fill={p.paper} shade={p.shade} />
        <Tooth fill={p.paper} shade={p.shade} />
        <Tooth dx={96} fill={p.paper} shade={p.shade} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <path d={gumFront(458)} fill={p.mid} />
        {DROPS.map(([x, y, s], k) => (
          <g key={k} transform={`translate(${x},${y}) scale(${s})`}>
            <motion.path
              d={DROP}
              fill={BLOOD}
              style={{ transformBox: "fill-box", originX: 0.5, originY: 0 }}
              initial={{ scaleX: 0, scaleY: 0, y: 0 }}
              animate={bleeding ? { scaleX: 1, scaleY: dripping ? 1.35 : 1, y: dripping ? 12 : 0 } : { scaleX: 0, scaleY: 0, y: 0 }}
              transition={{
                scaleX: { duration: reduced ? 0 : 0.35, delay: brushing ? 0.5 + k * 0.38 : 0 },
                scaleY: { duration: dripping ? 1.6 : reduced ? 0 : 0.35, delay: brushing ? 0.5 + k * 0.38 : 0 },
                y: { duration: 1.6, ease: "easeIn" },
              }}
            />
          </g>
        ))}
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        {puppet && (
          <motion.g
            initial={off}
            animate={reduced ? off : phase === "enter" || phase === "brush" ? { x: 0, y: 0 } : phase === "drip" ? { x: 130, y: -40 } : off}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
          >
            <motion.g
              animate={brushing ? { x: [0, 42, 0, 42, 0, 42, 0, 42, 0] } : { x: 0 }}
              transition={brushing ? { duration: 2.4, ease: "easeInOut" } : { duration: 0.3 }}
            >
              <g transform="translate(118,418) rotate(-8)">
                <Tannborste p={p} bloody={dripping || (reduced && on)} reduced={reduced} />
              </g>
            </motion.g>
          </motion.g>
        )}
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Sensitive tenner: the ice cube on a bare tooth neck ───────────── */

const COLD_STEPS = [
  ["enter", 1700],
  ["zing", 2600],
  ["lift", 1300],
  ["rest", 900],
] as const;

export function SymptomSensitive({ active, reduced, d, puppet = true }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, COLD_STEPS);
  const zinging = reduced ? on : phase === "zing";
  const down = !reduced && (phase === "enter" || phase === "zing");

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={gumBack(442)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <Tooth dx={-96} fill={p.paper} shade={p.shade} />
        <Tooth dx={96} fill={p.paper} shade={p.shade} />
        <motion.g
          animate={zinging && !reduced ? { x: [0, -1.8, 1.8, -1.4, 1.4, 0] } : { x: 0 }}
          transition={zinging && !reduced ? { duration: 0.22, repeat: Infinity } : { duration: 0.2 }}
        >
          <Tooth fill={p.paper} shade={p.shade} />
          {/* The bare neck, where the gum has drawn back */}
          <rect x={121} y={444} width={58} height={40} rx={6} fill={DENTIN} />
        </motion.g>
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <path d={gumFront(458, 24, 14)} fill={p.mid} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        <Bolts show={zinging} reduced={reduced} />
        {[
          [76, 286, 0.7, 0.1],
          [226, 272, 0.85, 0.5],
          [242, 372, 0.6, 0.9],
        ].map(([x, y, s, delay], k) => (
          <Star key={k} x={x} y={y} s={s} show={zinging} delay={delay} reduced={reduced} color="#FFFFFF" />
        ))}
        {puppet && (
          <motion.g
            initial={{ y: -520 }}
            animate={{ y: down ? 0 : -520 }}
            transition={
              reduced ? { duration: 0 } : down ? { type: "spring", stiffness: 42, damping: 8, mass: 1.1 } : { duration: 1.1, ease: [0.45, 0, 0.3, 1] }
            }
          >
            <path d="M150,366 L150,-400" stroke={p.ink} strokeWidth={1} opacity={0.75} />
            <motion.g
              style={pivot(150, 366)}
              animate={phase === "enter" && !reduced ? { rotate: [5, -4, 2, -1, 0] } : { rotate: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            >
              <g transform="translate(150,396)">
                <Isbit p={p} />
              </g>
            </motion.g>
          </motion.g>
        )}
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Hovne tannkjøtt: what the mirror shows ───────────── */

const SWELL_STEPS = [
  ["calm", 1300],
  ["swell", 2400],
  ["throb", 2800],
  ["ease", 1200],
] as const;

export function SymptomHovne({ active, reduced, d, puppet = true }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, SWELL_STEPS);
  const swollen = reduced ? on : phase === "swell" || phase === "throb";
  const throbbing = reduced ? on : phase === "throb";
  const mirrorIn = !reduced && (phase === "swell" || phase === "throb");

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={gumBack(442)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <Tooth dx={-96} fill={p.paper} shade={p.shade} />
        <Tooth fill={p.paper} shade={p.shade} />
        <Tooth dx={96} fill={p.paper} shade={p.shade} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <path d={gumFront(458)} fill={p.mid} />
        <motion.g
          style={pivot(246, 504)}
          initial={{ scale: 0.25 }}
          animate={
            throbbing && !reduced
              ? { scale: [1, 1.07, 1] }
              : { scale: swollen ? 1 : 0.25 }
          }
          transition={
            throbbing && !reduced
              ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 50, damping: 11 }
          }
        >
          <ellipse cx={246} cy={476} rx={46} ry={30} fill={INFLAMED} />
          <ellipse cx={234} cy={464} rx={17} ry={8} fill={INFLAMED_LIGHT} />
        </motion.g>
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        <AcheArcs x={246} y={470} spread={60} show={throbbing} reduced={reduced} rings={2} />
        {puppet && (
          <motion.g
            initial={{ x: -190, rotate: -30 }}
            animate={mirrorIn ? { x: 0, rotate: 0 } : { x: -190, rotate: -30 }}
            style={pivot(60, 420)}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 50, damping: 12 }}
          >
            <g transform="translate(62,300) rotate(-16)">
              <Speil
                p={p}
                glass={
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: throbbing ? 1 : 0 }} transition={{ duration: 0.5 }}>
                    <ellipse cx={4} cy={14} rx={20} ry={13} fill={INFLAMED} />
                    <path d="M-22,-4 L-22,-26 L-6,-26 L-6,-4 Z" fill={p.paper} />
                    <path d="M4,-4 L4,-26 L20,-26 L20,-4 Z" fill={p.paper} />
                  </motion.g>
                }
              />
            </g>
          </motion.g>
        )}
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Dårlig ånde: the breath that will not clear ───────────── */

const BREATH_STEPS = [
  ["breathe", 3600],
  ["mint", 1500],
  ["fresh", 2000],
  ["back", 2200],
] as const;

export function SymptomAande({ active, reduced, d, puppet = true }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, BREATH_STEPS);
  const breathing = reduced ? on : phase === "breathe" || phase === "back";
  const minty = !reduced && (phase === "mint" || phase === "fresh");

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={gumBack(442)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <Tooth dx={-96} fill={p.paper} shade={p.shade} />
        <Tooth fill={p.paper} shade={p.shade} />
        <Tooth dx={96} fill={p.paper} shade={p.shade} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <path d={gumFront(458)} fill={p.mid} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        {[102, 150, 198].map((x, k) => (
          <Wisp
            key={x}
            d={wispPath(x, 262 - (k === 1 ? 14 : 0))}
            show={breathing}
            faint={phase === "back"}
            delay={k * 0.55}
            reduced={reduced}
            color={p.mid}
          />
        ))}
        {[
          [84, 168, 0.8, 0],
          [212, 132, 1, 0.35],
          [150, 96, 0.7, 0.7],
        ].map(([x, y, s, delay], k) => (
          <Star key={k} x={x} y={y} s={s} show={phase === "fresh"} delay={delay} reduced={reduced} />
        ))}
        {puppet && (
          <motion.g
            initial={{ y: -560, opacity: 1 }}
            animate={minty ? { y: 0, opacity: 1 } : { y: phase === "back" ? 40 : -560, opacity: phase === "back" ? 0 : 1 }}
            transition={reduced ? { duration: 0 } : minty ? { type: "spring", stiffness: 120, damping: 9 } : { duration: 0.6 }}
          >
            <g transform="translate(150,478)">
              <Pastiller p={p} />
            </g>
          </motion.g>
        )}
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Tannkjøttbetennelse: floss finds the sore gum ───────────── */

const GUM_STEPS = [
  ["enter", 1400],
  ["floss", 2400],
  ["sore", 2600],
  ["lift", 1100],
] as const;

// The gum's edge, running out both ways from the gap the floss goes into.
const EDGE_RIGHT = "M198,434 C206,437 220,458 246,458 C272,458 286,437 294,434";
const EDGE_LEFT = "M198,434 C190,437 176,458 150,458 C124,458 110,437 102,434 C94,437 80,458 54,458 C28,458 14,437 6,434";
const TARTAR = [
  "M124,446 L128,436 L136,437 L135,448 Z",
  "M160,448 L163,438 L172,440 L170,450 Z",
  "M220,446 L224,436 L232,437 L231,448 Z",
  "M256,448 L259,438 L268,440 L266,450 Z",
];

export function SymptomBetennelse({ active, reduced, d, puppet = true }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, GUM_STEPS);
  const red = reduced ? on : phase === "floss" || phase === "sore";
  const sore = reduced ? on : phase === "sore";
  const flossDown = !reduced && (phase === "enter" || phase === "floss");

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={gumBack(442)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <Tooth dx={-96} fill={p.paper} shade={p.shade} />
        <Tooth fill={p.paper} shade={p.shade} />
        <Tooth dx={96} fill={p.paper} shade={p.shade} />
        {TARTAR.map((t) => (
          <path key={t} d={t} fill={SAND} />
        ))}
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <motion.path d={gumFront(458)} initial={{ fill: p.mid }} animate={{ fill: sore ? "#D9A79A" : p.mid }} transition={{ duration: 1.2 }} />
        {[EDGE_LEFT, EDGE_RIGHT].map((e) => (
          <motion.path
            key={e}
            d={e}
            fill="none"
            stroke={INFLAMED}
            strokeWidth={9}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              red
                ? sore && !reduced
                  ? { pathLength: 1, opacity: [1, 0.55, 1] }
                  : { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={
              sore && !reduced
                ? { opacity: { duration: 1.2, repeat: Infinity }, pathLength: { duration: 0 } }
                : { duration: reduced ? 0 : 2, ease: "easeOut", delay: reduced ? 0 : 0.3 }
            }
          />
        ))}
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        <AcheArcs x={198} y={424} spread={34} show={sore} reduced={reduced} rings={2} width={4} />
        {puppet && (
          <motion.g
            initial={{ y: -560 }}
            animate={{ y: flossDown ? 0 : -560 }}
            transition={reduced ? { duration: 0 } : flossDown ? { type: "spring", stiffness: 50, damping: 12 } : { duration: 0.9, ease: [0.45, 0, 0.3, 1] }}
          >
            <motion.g
              animate={phase === "floss" && !reduced ? { y: [0, -16, 0, -16, 0, -16, 0] } : { y: 0 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            >
              <path d="M198,442 L360,-140 M198,442 L40,-140" fill="none" stroke={p.ink} strokeWidth={1.8} strokeLinecap="round" opacity={0.85} />
            </motion.g>
          </motion.g>
        )}
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Løse tenner: one bite of an apple ───────────── */

const LOOSE_STEPS = [
  ["enter", 1300],
  ["bite", 1300],
  ["wobble", 2800],
  ["settle", 1200],
] as const;

export function SymptomLose({ active, reduced, d, puppet = true }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, LOOSE_STEPS);
  const wobbling = !reduced && phase === "wobble";
  const biting = !reduced && phase === "bite";
  const loose = reduced ? on : phase === "wobble" || phase === "settle";

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={gumBack(442)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <Tooth dx={-96} fill={p.paper} shade={p.shade} />
        <Tooth dx={96} fill={p.paper} shade={p.shade} />
        <motion.g
          style={pivot(150, 484)}
          animate={
            wobbling
              ? { rotate: [-7, 6, -5, 4, -2.5, 1.5, 0] }
              : biting
                ? { rotate: [0, 4, 0, 4, 0] }
                : { rotate: reduced && on ? 4 : 0 }
          }
          transition={wobbling ? { duration: 2.4, ease: "easeInOut" } : biting ? { duration: 1.1, delay: 0.05 } : { duration: 0.5 }}
        >
          <Tooth fill={p.paper} shade={p.shade} />
        </motion.g>
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <motion.path d={gumFront(458, 24, loose ? 12 : 0)} initial={false} animate={{ d: gumFront(458, 24, loose ? 12 : 0) }} fill={p.mid} transition={{ duration: 0.8 }} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        {/* Wiggle marks either side of the crown */}
        {["M96,282 Q86,298 96,314", "M204,282 Q214,298 204,314", "M84,276 Q72,298 84,320", "M216,276 Q228,298 216,320"].map((m, k) => (
          <motion.path
            key={m}
            d={m}
            fill="none"
            stroke={p.ink}
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={wobbling ? { opacity: [0, 0.7, 0, 0.7, 0] } : { opacity: reduced && on ? 0.6 : 0 }}
            transition={wobbling ? { duration: 1.6, delay: (k % 2) * 0.2 + (k > 1 ? 0.1 : 0) } : { duration: 0.2 }}
          />
        ))}
        {puppet && (
          <motion.g
            initial={{ x: -220 }}
            animate={
              reduced
                ? { x: -220 }
                : phase === "enter"
                  ? { x: 0 }
                  : biting
                    ? { x: [0, 24, 0, 24, 0] }
                    : phase === "wobble"
                      ? { x: -40 }
                      : { x: -240 }
            }
            transition={biting ? { duration: 1.1 } : { type: "spring", stiffness: 55, damping: 13 }}
          >
            <g transform="translate(40,312)">
              <path d="M-4,-50 L-220,-460" stroke={p.ink} strokeWidth={1.4} />
              <Eple p={p} bitten={phase === "wobble" || phase === "settle"} reduced={reduced} />
            </g>
          </motion.g>
        )}
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Kjevesmerter: grinding in the night ───────────── */

const JAW_STEPS = [
  ["open", 1000],
  ["grind", 2800],
  ["ache", 2800],
  ["rest", 1000],
] as const;

const JAW_X = Array.from({ length: 6 }, (_, k) => 75 + k * 30);
const MOON = "M226,78 A34,34 0 1 0 250,134 A28,28 0 1 1 226,78 Z";

export function SymptomKjeve({ active, reduced, d }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, JAW_STEPS);
  const grinding = !reduced && phase === "grind";
  const aching = reduced ? on : phase === "ache";
  const jawY = reduced ? 10 : phase === "grind" ? 0 : phase === "ache" ? 16 : 40;

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.6} shadow={false}>
        <path d={MOON} fill={p.accent} style={{ filter: `drop-shadow(0 0 10px ${p.accent})` }} />
        {[
          [60, 90, 0.5],
          [104, 56, 0.35],
          [176, 64, 0.45],
          [126, 120, 0.3],
        ].map(([x, y, s], k) => (
          <motion.path
            key={k}
            d={starPath(x, y, s)}
            fill={p.paper}
            style={centre}
            initial={{ opacity: 0.8 }}
            animate={on && !reduced ? { opacity: [0.4, 1, 0.4], scale: [0.85, 1.1, 0.85] } : { opacity: 0.8 }}
            transition={{ duration: 2.4 + k * 0.5, repeat: Infinity, delay: k * 0.3 }}
          />
        ))}
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={1.8}>
        {JAW_X.map((x) => (
          <path key={x} d={`M${x - 13},240 L${x + 13},240 L${x + 12},286 Q${x},300 ${x - 12},286 Z`} fill={p.paper} />
        ))}
        <path d="M48,214 C90,206 210,206 252,214 L252,246 C230,238 214,250 196,242 C178,250 162,238 150,246 C138,238 122,250 104,242 C86,250 70,238 48,246 Z" fill={p.mid} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <motion.g
          initial={{ y: 40 }}
          animate={grinding ? { y: 0, x: [0, 6, -6, 6, -6, 6, -6, 0] } : { y: jawY, x: 0 }}
          transition={grinding ? { x: { duration: 2.4, ease: "easeInOut" }, y: { duration: 0.3 } } : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {JAW_X.map((x) => (
            <path key={x} d={`M${x - 13},352 L${x + 13},352 L${x + 12},312 Q${x},298 ${x - 12},312 Z`} fill={p.paper} />
          ))}
          <path d="M48,380 C90,388 210,388 252,380 L252,346 C230,354 214,342 196,350 C178,342 162,354 150,346 C138,354 122,342 104,350 C86,342 70,354 48,346 Z" fill={p.deep} />
        </motion.g>
        {["M32,288 L42,294 L34,300 L44,306", "M268,288 L258,294 L266,300 L256,306"].map((z, k) => (
          <motion.path
            key={z}
            d={z}
            fill="none"
            stroke={p.paper}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={grinding ? { opacity: [0, 1, 0, 1, 0, 1, 0], x: k ? [0, 3, 0] : [0, -3, 0] } : { opacity: 0 }}
            transition={grinding ? { duration: 2.4 } : { duration: 0.2 }}
          />
        ))}
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        <AcheArcs x={150} y={300} spread={118} show={aching} reduced={reduced} />
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(506, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Frisk: healthy teeth, nothing happening ───────────── */

const REST_STEPS = [
  ["rest", 2600],
  ["shine", 2000],
] as const;

export function SymptomFrisk({ active, reduced, d }: SymptomSceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, REST_STEPS);
  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.6} shadow={false}>
        <motion.g
          animate={on && !reduced ? { x: [0, 12, 0] } : { x: 0 }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 1px 1px rgba(14,42,48,0.16)) drop-shadow(0 7px 9px rgba(14,42,48,0.13))" }}
        >
          <path d="M34,148 Q34,128 54,130 Q60,112 80,118 Q92,106 106,120 Q124,120 122,138 Q126,152 110,152 L46,152 Q34,152 34,148 Z" fill={p.paper} />
          <path d="M198,102 Q198,88 212,90 Q218,76 234,82 Q246,74 254,88 Q268,90 264,104 L206,106 Q198,106 198,102 Z" fill={p.paper} />
        </motion.g>
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={1.5}>
        <path d={gumBack(442)} fill={p.deep} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.1}>
        <Tooth dx={-96} fill={p.paper} shade={p.shade} />
        <Tooth fill={p.paper} shade={p.shade} />
        <Tooth dx={96} fill={p.paper} shade={p.shade} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={2.7}>
        <path d={gumFront(458)} fill={p.mid} />
        <Star x={206} y={290} s={0.9} show={phase === "shine"} reduced={reduced} />
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.6}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ── Scenes by symptom, each in its own paper ── */

type SymptomScene = ComponentType<SymptomSceneProps>;

const SCENE_OF: Record<SymptomSlug, SymptomScene> = {
  tannpine: SymptomTannpine,
  blodende: SymptomBlodende,
  sensitive: SymptomSensitive,
  hovne: SymptomHovne,
  aande: SymptomAande,
  betennelse: SymptomBetennelse,
  lose: SymptomLose,
  kjeve: SymptomKjeve,
};

const cache = new Map<string, SymptomScene>();

/**
 * The scene for a symptom set in a palette: on its palette's solid ground,
 * or with `sky` under a painted sky, as on the pages of the book. Wrapped
 * scenes are kept, so the same symptom is the same component from one render
 * to the next.
 */
export function paperScene(slug: SymptomSlug | "frisk", palette: PaletteName, sky: boolean): SymptomScene {
  const key = `${slug}:${palette}:${sky}`;
  let s = cache.get(key);
  if (!s) {
    const base = slug === "frisk" ? SymptomFrisk : SCENE_OF[slug];
    // withPalette passes every prop through, `puppet` included.
    s = withPalette(base as Scene, palette, sky) as SymptomScene;
    cache.set(key, s);
  }
  return s;
}

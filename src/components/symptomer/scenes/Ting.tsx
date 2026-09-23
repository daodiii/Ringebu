"use client";

import { motion } from "framer-motion";
import type { Palette } from "@/components/behandlinger/scenes/Papir";
import type { SymptomSlug } from "../data";

/**
 * The everyday things, cut from paper. Each one is drawn around its own
 * origin so it can sit in a scene as a puppet or lie on its own on a table.
 * They take their colours from the palette of the symptom they belong to.
 */

export const CHOC = "#6E4636";
export const CHOC_LIGHT = "#86583F";
export const APPLE = "#A3BE72";
export const APPLE_SHADE = "#88A35B";
export const APPLE_FLESH = "#F5F1DC";
export const ICE_FACE = "#E6F3FA";
export const ICE_SHADE = "#C4DEEC";
export const BLOOD = "#C4524A";

type ThingProps = { p: Palette };

export function Sjokolade({ p }: ThingProps) {
  return (
    <g>
      <rect x={-44} y={-28} width={88} height={56} rx={6} fill={CHOC} />
      {[0, 1, 2].map((c) =>
        [0, 1].map((r) => (
          <g key={`${c}${r}`}>
            <rect x={-40 + c * 27} y={-24 + r * 25} width={23} height={21} rx={3} fill={CHOC_LIGHT} />
            <path d={`M${-38 + c * 27},${-6 + r * 25} L${-38 + c * 27},${-21 + r * 25} L${-19 + c * 27},${-21 + r * 25}`} stroke="#9C6B50" strokeWidth={1.6} fill="none" strokeLinecap="round" />
          </g>
        ))
      )}
      {/* The foil, torn back */}
      <path d="M16,-31 L48,-31 L48,31 L16,31 L22,20 L13,10 L22,0 L13,-10 L22,-20 Z" fill={p.paper} />
      <rect x={32} y={-31} width={7} height={62} fill={p.accent} />
    </g>
  );
}

/** Bristles point down, so the head can lie along a gum line. */
export function Tannborste({ p, bloody = false, reduced = false }: ThingProps & { bloody?: boolean; reduced?: boolean }) {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <g key={k}>
          <rect x={-37 + k * 8} y={4} width={6} height={20} rx={2} fill={p.paper} />
          <motion.rect
            x={-37 + k * 8}
            y={19}
            width={6}
            height={5}
            rx={2}
            fill={BLOOD}
            initial={{ opacity: 0 }}
            animate={{ opacity: bloody ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : k * 0.08 }}
          />
        </g>
      ))}
      <rect x={-42} y={-8} width={50} height={16} rx={8} fill={p.deep} />
      <path d="M4,-5 L40,-8 L40,6 L4,5 Z" fill={p.deep} />
      <rect x={34} y={-9} width={176} height={18} rx={9} fill={p.accent} />
      <rect x={96} y={-11} width={62} height={22} rx={11} fill={p.deep} />
      <circle cx={196} cy={0} r={3.5} fill={p.paper} opacity={0.8} />
    </g>
  );
}

export function Isbit({ p }: ThingProps) {
  return (
    <g>
      <rect x={-30} y={-30} width={60} height={60} rx={13} fill={ICE_FACE} />
      <path d="M30,-10 L30,17 Q30,30 17,30 L-10,30 Q14,24 22,8 Z" fill={ICE_SHADE} />
      <path d="M-30,-6 L-30,-17 Q-30,-30 -17,-30 L12,-30 Q-14,-22 -30,-6 Z" fill="#FFFFFF" />
      <path d="M-14,4 L-4,-8" stroke="#FFFFFF" strokeWidth={3.5} strokeLinecap="round" />
      <path d="M22,34 C24,38 25,41 25,43 A3.2,3.2 0 0 1 18.6,43 C18.6,41 20,38 22,34 Z" fill={p.near} />
    </g>
  );
}

/** A hand mirror. `glass` is drawn inside the frame, for a reflection. */
export function Speil({ p, glass }: ThingProps & { glass?: React.ReactNode }) {
  return (
    <g>
      <path d="M-8,34 L8,34 L11,100 Q11,112 0,112 Q-11,112 -11,100 Z" fill={p.mid} />
      <path d="M2,34 L8,34 L11,100 Q11,112 0,112 Z" fill={p.deep} opacity={0.35} />
      <rect x={-12} y={30} width={24} height={12} rx={5} fill={p.accent} />
      <circle r={43} fill={p.accent} />
      <circle r={43} fill="none" stroke={p.deep} strokeWidth={2} opacity={0.35} />
      <circle r={35} fill={p.sky} />
      {glass}
      <path d="M-22,-14 Q-16,-26 -2,-29" fill="none" stroke={p.paper} strokeWidth={4.5} strokeLinecap="round" opacity={0.9} />
    </g>
  );
}

function Pastill({ x, y, p }: { x: number; y: number; p: Palette }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse rx={18} ry={16} fill={p.paper} />
      <ellipse rx={18} ry={16} fill="none" stroke={p.shade} strokeWidth={3} />
      <ellipse rx={10} ry={8.5} fill="none" stroke={p.accent} strokeWidth={2.2} />
    </g>
  );
}

export function Pastiller({ p }: ThingProps) {
  return (
    <g>
      <Pastill x={-18} y={8} p={p} />
      <Pastill x={17} y={11} p={p} />
      <Pastill x={0} y={-12} p={p} />
    </g>
  );
}

export function Tanntrad({ p }: ThingProps) {
  return (
    <g>
      <path d="M30,-10 C58,-22 74,6 98,-4" fill="none" stroke={p.ink} strokeWidth={1.6} strokeLinecap="round" />
      <rect x={-32} y={-24} width={64} height={48} rx={16} fill={p.paper} />
      <path d="M-32,-8 L-32,-10 Q-32,-24 -16,-24 L16,-24 Q32,-24 32,-10 L32,-8 Z" fill={p.accent} />
      <rect x={-32} y={-9} width={64} height={3} fill={p.deep} opacity={0.5} />
      <circle cx={0} cy={9} r={5} fill={p.shade} />
    </g>
  );
}

export function Eple({ bitten = false, reduced = false }: ThingProps & { bitten?: boolean; reduced?: boolean }) {
  return (
    <g>
      <path d="M0,-28 C-14,-40 -44,-36 -44,-4 C-44,26 -23,46 -8,42 C-3,40 3,40 8,42 C23,46 44,26 44,-4 C44,-36 14,-40 0,-28 Z" fill={APPLE} />
      <path d="M22,-34 C36,-30 44,-20 44,-4 C44,26 23,46 8,42 C24,34 34,14 32,-6 C31,-20 28,-28 22,-34 Z" fill={APPLE_SHADE} />
      <motion.path
        d="M46,-18 C34,-20 30,-10 36,-4 C28,2 30,14 40,14 C34,20 38,28 44,26 L60,26 L60,-18 Z"
        fill={APPLE_FLESH}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={bitten ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        style={{ transformBox: "fill-box", originX: 1, originY: 0.5 }}
        transition={{ duration: reduced ? 0 : 0.25 }}
      />
      <path d="M0,-28 Q2,-42 9,-49" fill="none" stroke="#6B5A40" strokeWidth={4} strokeLinecap="round" />
      <path d="M5,-40 C14,-54 32,-52 34,-45 C26,-36 13,-36 5,-40 Z" fill="#6FA07B" />
    </g>
  );
}

export function Pute({ p }: ThingProps) {
  return (
    <g>
      <path d="M-62,-18 Q-64,-32 -48,-31 Q0,-40 48,-31 Q64,-32 62,-18 Q68,0 62,18 Q64,32 48,31 Q0,40 -48,31 Q-64,32 -62,18 Q-68,0 -62,-18 Z" fill={p.paper} />
      <path d="M-62,6 Q-68,12 -62,18 Q-64,32 -48,31 Q0,40 48,31 Q64,32 62,18 Q68,12 62,6 Q0,22 -62,6 Z" fill={p.shade} />
      <path d="M-26,-8 Q0,4 26,-8" fill="none" stroke={p.shade} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M40,-40 A13,13 0 1 0 52,-24 A10,10 0 1 1 40,-40 Z" fill={p.accent} />
    </g>
  );
}

/** Each thing's own box, for drawing it alone: [x, y, width, height]. */
export const THING_BOX: Record<SymptomSlug, [number, number, number, number]> = {
  tannpine: [-52, -38, 104, 76],
  blodende: [-50, -30, 270, 64],
  sensitive: [-38, -38, 76, 88],
  hovne: [-48, -48, 96, 170],
  aande: [-44, -36, 88, 72],
  betennelse: [-40, -32, 146, 64],
  lose: [-52, -58, 116, 108],
  kjeve: [-72, -52, 144, 96],
};

export function Thing({ slug, p }: { slug: SymptomSlug; p: Palette }) {
  switch (slug) {
    case "tannpine":
      return <Sjokolade p={p} />;
    case "blodende":
      return <Tannborste p={p} />;
    case "sensitive":
      return <Isbit p={p} />;
    case "hovne":
      return <Speil p={p} />;
    case "aande":
      return <Pastiller p={p} />;
    case "betennelse":
      return <Tanntrad p={p} />;
    case "lose":
      return <Eple p={p} />;
    case "kjeve":
      return <Pute p={p} />;
  }
}

"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { usePhase } from "./usePhase";
import {
  CROWN,
  CROWN_SHADE,
  FAR_HILLS,
  GUM_BACK,
  GUM_FRONT,
  MOLAR,
  MOLAR_SHADE,
  NEAR_HILLS,
  Loose,
  NoShadow,
  PaperShadow,
  Piece,
  STEEL,
  Sheet,
  Stage,
  Star,
  scallops,
  starPath,
  usePaper,
} from "./Papir";
import type { SceneProps } from "./types";

/**
 * The rest of the paper theatre: one scene for every treatment the site
 * shows, on the front page and on /behandlinger. Same stage, same sheets,
 * same palettes as the mirror, crown and scaler in Papir.tsx.
 */

/** Rotates a group about a point in the drawing, not about its own box. */
const pivot = (x: number, y: number) => ({ transformBox: "view-box" as const, originX: `${x}px`, originY: `${y}px` });
const centre = { transformBox: "fill-box" as const, originX: 0.5, originY: 0.5 };

/* ───────────── Bleking: the shade guide ───────────── */

const FAN_STEPS = [
  ["open", 3000],
  ["glint", 2400],
  ["fold", 1100],
] as const;

// Real shade tabs run from ivory to white; these do too, lightest last.
const SHADES = ["#E9DDBE", "#EEE4C9", "#F2EAD4", "#F6F0DF", "#F9F5EA", "#FCFAF4", "#FFFFFF"];
const FAN = [-48, -32, -16, 0, 16, 32, 48];
const TAB = "M136,336 C132,300 132,262 138,246 C142,234 158,234 162,246 C168,262 168,300 164,336 Z";

export function PapirFargeskala({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, FAN_STEPS);
  const spread = reduced ? 1 : phase === "open" || phase === "glint" ? 1 : phase === "fold" ? 0.2 : 0;

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={NEAR_HILLS} fill={p.near} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2.2}>
        {/* Each tab throws its own shadow, onto the tab under it */}
        {SHADES.map((fill, k) => (
          <Piece
            key={k}
            style={pivot(150, 452)}
            initial={{ rotate: 0 }}
            animate={{ rotate: FAN[k] * spread }}
            transition={
              reduced
                ? { duration: 0 }
                : phase === "open"
                  ? { type: "spring", stiffness: 70, damping: 11, delay: 0.5 + Math.abs(k - 3) * 0.09 }
                  : { duration: 0.9, ease: [0.45, 0, 0.3, 1] }
            }
          >
            <rect x={147} y={330} width={6} height={124} rx={3} fill={p.ink} />
            <path d={TAB} fill={fill} />
          </Piece>
        ))}
        <circle cx={150} cy={452} r={9} fill={p.ink} />
        <circle cx={150} cy={452} r={3.5} fill={p.accent} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.9}>
        {/* A glint runs out along the tips, whitest last */}
        {[0, 2, 4, 6].map((k, j) => {
          const a = (FAN[k] * Math.PI) / 180;
          return (
            <Star
              key={k}
              x={150 + Math.sin(a) * 210}
              y={452 - Math.cos(a) * 210}
              s={0.55 + j * 0.15}
              show={phase === "glint"}
              delay={j * 0.28}
              reduced={reduced}
            />
          );
        })}
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.5}>
        <path d={scallops(504)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Fyllingsterapi: the curing light ───────────── */

const CURE_STEPS = [
  ["enter", 1300],
  ["fill", 1400],
  ["cure", 2400],
  ["done", 2200],
  ["reset", 700],
] as const;

// The curing light is blue on every palette: that is what it looks like.
const CURE_BLUE = "#8EC5EE";
const CAVITY = "M128,238 C130,228 144,226 148,236 C151,246 141,253 134,250 C128,248 127,243 128,238 Z";

export function PapirHerdelampe({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, CURE_STEPS, 1);
  const filled = reduced ? on : phase === "fill" || phase === "cure" || phase === "done";
  const hard = reduced ? on : phase === "done";
  const curing = phase === "cure" && !reduced;
  const wand = phase === "cure" || phase === "done";

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
        <path d={CAVITY} fill={p.ink} opacity={0.72} />
        {/* The filling drops in soft, and turns hard white under the light */}
        <Piece
          initial={{ y: -130, opacity: 0 }}
          animate={filled ? { y: 0, opacity: 1 } : { y: -130, opacity: 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : phase === "fill"
                ? { y: { type: "spring", stiffness: 90, damping: 10 }, opacity: { duration: 0.2 } }
                : { duration: 0.8 }
          }
          shadow={<path d={CAVITY} />}
        >
          <motion.path
            d={CAVITY}
            initial={{ fill: "#EFE6CF" }}
            animate={{ fill: hard ? "#FFFFFF" : "#EFE6CF" }}
            transition={{ duration: reduced ? 0 : 0.8 }}
          />
        </Piece>
        <Star x={170} y={236} s={0.8} show={phase === "done"} delay={0.2} reduced={reduced} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <path d={GUM_FRONT(482)} fill={p.mid} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.3}>
        <Piece
          initial={{ x: 110, y: -110 }}
          animate={wand && !reduced ? { x: 0, y: 0 } : { x: 110, y: -110 }}
          transition={{ type: "spring", stiffness: 55, damping: 12 }}
        >
          {/* Light cone from the tip down onto the filling */}
          <NoShadow>
            <motion.path
              d="M160,224 L118,268 L176,268 Z"
              fill={CURE_BLUE}
              initial={{ opacity: 0 }}
              animate={curing ? { opacity: [0.25, 0.7, 0.4, 0.75, 0.3] } : { opacity: 0 }}
              transition={curing ? { duration: 2.2, ease: "easeInOut" } : { duration: 0.3 }}
            />
          </NoShadow>
          <path d="M232,64 L264,78 L224,196 L196,186 Z" fill={p.ink} />
          <path d="M236,96 L256,104 L250,122 L230,114 Z" fill={CURE_BLUE} />
          <path d="M204,186 L216,190 C208,214 188,226 164,228 L160,220 C182,218 198,208 204,186 Z" fill={STEEL} />
          <NoShadow>
            <motion.circle
              cx={162}
              cy={224}
              r={5}
              fill={CURE_BLUE}
              style={{ filter: "drop-shadow(0 0 6px rgba(142,197,238,0.9))" }}
              initial={{ opacity: 0 }}
              animate={curing ? { opacity: [0.6, 1, 0.6] } : { opacity: 0 }}
              transition={curing ? { duration: 0.5, repeat: Infinity } : { duration: 0.2 }}
            />
          </NoShadow>
        </Piece>
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.9}>
        <path d={scallops(514, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Rotfylling: the root file ───────────── */

const ROOT_STEPS = [
  ["enter", 1200],
  ["file", 2800],
  ["fill", 1900],
  ["done", 2000],
  ["reset", 800],
] as const;

// The tooth cut open: crown, two roots, and the canals inside them.
const WHOLE_TOOTH =
  "M112,300 C106,262 106,214 118,190 C126,176 140,178 150,190 C160,178 174,176 182,190 C194,214 194,262 188,300 C190,340 186,392 176,446 C172,462 160,464 158,448 C156,410 154,372 150,352 C146,372 144,410 142,448 C140,464 128,462 124,446 C114,392 110,340 112,300 Z";
const DENTIN =
  "M122,296 C118,262 118,224 126,206 C132,194 142,196 150,206 C158,196 168,194 174,206 C182,224 182,262 178,296 C180,336 176,388 168,438 C166,448 164,448 164,440 C162,404 160,370 156,344 C154,336 146,336 144,344 C140,370 138,404 136,440 C136,448 134,448 132,438 C124,388 120,336 122,296 Z";
const CANALS =
  "M132,262 C130,244 140,236 150,246 C160,236 170,244 168,262 C166,272 164,278 163,284 C166,322 168,382 166,436 L160,436 C160,382 158,324 156,288 L144,288 C142,324 140,382 140,436 L134,436 C132,382 134,322 137,284 C136,278 134,272 132,262 Z";

export function PapirRotfil({ active, reduced, d }: SceneProps) {
  const id = useId().replace(/:/g, "");
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, ROOT_STEPS, 1);
  const filing = phase === "file" && !reduced;
  const filled = reduced ? on : phase === "fill" || phase === "done";

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        {/* Bone behind the roots, gum along the top of it */}
        <path d="M-420,318 C-200,306 60,316 150,306 C240,316 500,306 720,318 L720,540 L-420,540 Z" fill={p.near} />
        <path d="M-420,318 C-200,306 60,316 150,306 C240,316 500,306 720,318 L720,334 C500,322 240,332 150,322 C60,332 -200,322 -420,334 Z" fill={p.mid} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <NoShadow>
          <defs>
            {/* The filling rises up the canals from the root tips */}
            <clipPath id={`fill-${id}`}>
              <motion.rect
                x={120}
                y={236}
                width={60}
                height={210}
                initial={{ y: 210 }}
                animate={{ y: filled ? 0 : 210 }}
                transition={{ duration: reduced ? 0 : filled ? 1.6 : 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </clipPath>
          </defs>
        </NoShadow>
        <path d={WHOLE_TOOTH} fill={p.paper} />
        <path d={DENTIN} fill={p.shade} />
        {/* Empty canals are dark, so the filling rising up them reads in any palette */}
        <path d={CANALS} fill={p.ink} opacity={0.62} />
        <g clipPath={`url(#fill-${id})`}>
          <path d={CANALS} fill={p.accent} />
        </g>
        <Star x={196} y={200} s={0.8} show={phase === "done"} delay={0.2} reduced={reduced} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.8}>
        <NoShadow>
          <defs>
            <clipPath id={`shaft-${id}`}>
              <path d="M136,64 L142,64 L140,252 Q139,258 138,252 Z" />
            </clipPath>
          </defs>
        </NoShadow>
        {/* The file screws down into the left canal and back out */}
        <Piece
          initial={{ y: -80, opacity: 0 }}
          animate={
            filing
              ? { y: [-80, 0, 170, 130, 180, 60, 0], opacity: 1 }
              : phase === "enter"
                ? { y: -20, opacity: 1 }
                : { y: -150, opacity: 0 }
          }
          transition={filing ? { duration: 2.7, ease: "easeInOut", times: [0, 0.12, 0.4, 0.52, 0.72, 0.9, 1] } : { duration: 0.6 }}
        >
          <rect x={126} y={36} width={26} height={24} rx={6} fill={p.accent} />
          <rect x={134} y={58} width={10} height={8} fill={p.ink} />
          <path d="M136,64 L142,64 L140,252 Q139,258 138,252 Z" fill={STEEL} />
          <NoShadow>
            <g clipPath={`url(#shaft-${id})`}>
              <motion.g
                animate={filing ? { y: [0, -8] } : { y: 0 }}
                transition={filing ? { duration: 0.18, repeat: Infinity, ease: "linear" } : { duration: 0.1 }}
              >
                {Array.from({ length: 28 }, (_, k) => (
                  <path key={k} d={`M132,${70 + k * 8} L148,${62 + k * 8}`} stroke={p.ink} strokeWidth={1.4} opacity={0.55} />
                ))}
              </motion.g>
            </g>
          </NoShadow>
        </Piece>
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.6}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Visdomstennene: the panoramic X-ray ───────────── */

const XRAY_STEPS = [
  ["enter", 1100],
  ["scan", 2400],
  ["mark", 1000],
  ["lift", 1800],
  ["rest", 1400],
  ["reset", 700],
] as const;

const FILM = { x: 26, y: 292, w: 248, h: 118 };
const TEETH_X = Array.from({ length: 8 }, (_, k) => 44 + k * 30);
const upperTooth = (x: number) => `M${x - 12},302 L${x + 12},302 L${x + 11},330 Q${x},346 ${x - 11},330 Z`;
const lowerTooth = (x: number) => `M${x - 12},400 L${x + 12},400 L${x + 11},372 Q${x},356 ${x - 11},372 Z`;
// The wisdom tooth that comes out: bottom right, tipped over as they often are.
const WISDOM = "M246,398 L270,396 L268,370 Q256,354 246,370 Z";

export function PapirRontgen({ active, reduced, d }: SceneProps) {
  const id = useId().replace(/:/g, "");
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, XRAY_STEPS, 1);
  const scanned = reduced ? on : phase !== "off" && phase !== "enter" && phase !== "reset";
  const scanning = phase === "scan" && !reduced;
  const lifted = phase === "lift" || phase === "rest";

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.3}>
        {/* The machine: a column and the arm that swings round your head */}
        <rect x={144} y={40} width={12} height={132} rx={4} fill={p.ink} />
        <rect x={70} y={164} width={160} height={12} rx={6} fill={p.ink} />
        <Piece
          initial={{ x: 0 }}
          animate={scanning ? { x: [0, 150, 0] } : { x: 0 }}
          transition={scanning ? { duration: 2.2, ease: "easeInOut" } : { duration: 0.4 }}
        >
          <rect x={66} y={176} width={34} height={48} rx={8} fill={p.paper} />
          <rect x={72} y={206} width={22} height={8} rx={3} fill={p.accent} />
        </Piece>
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <NoShadow>
          <defs>
            {/* The picture appears behind the scan bar as it passes */}
            <clipPath id={`scan-${id}`}>
              <motion.rect
                x={FILM.x}
                y={FILM.y}
                height={FILM.h}
                initial={{ width: 0 }}
                animate={{ width: scanned ? FILM.w : 0 }}
                transition={{ duration: reduced ? 0 : scanning ? 2.2 : 0.4, ease: "linear" }}
              />
            </clipPath>
          </defs>
        </NoShadow>
        <rect x={FILM.x} y={FILM.y} width={FILM.w} height={FILM.h} rx={16} fill={p.deep} />
        <g clipPath={`url(#scan-${id})`}>
          <path d={`M${FILM.x + 8},${FILM.y + 58} L${FILM.x + FILM.w - 8},${FILM.y + 58}`} stroke={p.near} strokeWidth={2} opacity={0.5} />
          {TEETH_X.map((x, k) => (
            <path key={`u${k}`} d={upperTooth(x)} fill={p.paper} transform={k === 0 || k === 7 ? `rotate(${k === 0 ? -14 : 14} ${x} 316)` : undefined} />
          ))}
          {TEETH_X.slice(0, 7).map((x, k) => (
            <path key={`l${k}`} d={lowerTooth(x)} fill={p.paper} transform={k === 0 ? `rotate(14 ${x} 386)` : undefined} />
          ))}
        </g>
        {/* The scan bar, which is light */}
        <NoShadow>
          <motion.rect
            x={FILM.x}
            y={FILM.y - 6}
            width={10}
            height={FILM.h + 12}
            rx={5}
            fill={p.accent}
            initial={{ opacity: 0, x: 0 }}
            animate={scanning ? { opacity: [0, 0.8, 0.8, 0], x: [0, FILM.w - 10] } : { opacity: 0, x: 0 }}
            transition={scanning ? { duration: 2.2, ease: "linear" } : { duration: 0.2 }}
          />
        </NoShadow>
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.8}>
        {/* The wisdom tooth, ringed, then lifted out */}
        <NoShadow>
          <motion.circle
            cx={258}
            cy={380}
            r={22}
            fill="none"
            stroke={p.accent}
            strokeWidth={3}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={phase === "mark" || lifted ? { opacity: phase === "mark" ? 1 : 0, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.5 }}
          />
        </NoShadow>
        <Piece
          style={pivot(258, 380)}
          initial={{ opacity: 0 }}
          animate={
            !scanned
              ? { opacity: 0, y: 0, rotate: 0, scale: 1 }
              : lifted && !reduced
                ? { opacity: 1, y: -130, x: -40, rotate: -16, scale: 1.7 }
                : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }
          }
          transition={lifted ? { type: "spring", stiffness: 40, damping: 10 } : { duration: phase === "scan" ? 0.3 : 0.5, delay: phase === "scan" ? 2 : 0 }}
        >
          <path d={WISDOM} fill={p.paper} transform="rotate(-18 258 380)" />
        </Piece>
        <Star x={196} y={236} s={0.9} show={phase === "rest"} delay={0.1} reduced={reduced} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.5}>
        <path d={scallops(506, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Bittskinner: the bite splint ───────────── */

const BITE_STEPS = [
  ["open", 1000],
  ["grind", 1700],
  ["open2", 800],
  ["splint", 1300],
  ["close", 1500],
  ["rest", 2400],
] as const;

const UPPER_X = Array.from({ length: 6 }, (_, k) => 75 + k * 30);
const MOON = "M232,86 A34,34 0 1 0 256,142 A28,28 0 1 1 232,86 Z";
const NIGHT_STARS = [
  [60, 90, 0.5],
  [98, 58, 0.35],
  [180, 70, 0.45],
  [120, 118, 0.3],
] as const;

export function PapirBittskinne({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, BITE_STEPS);
  const splint = reduced ? on : phase === "splint" || phase === "close" || phase === "rest";
  const closed = reduced ? on : phase === "grind" || phase === "close" || phase === "rest";
  const grinding = phase === "grind" && !reduced;
  // With the splint in, the jaw closes onto it and stops a little lower.
  const jawY = closed ? (splint ? 8 : 0) : 44;

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet
        n={0}
        on={on}
        reduced={reduced}
        d={d}
        depth={0.6}
        shadow={false}
        loose={
          // The stars are only light. They twinkle on a layer of their own,
          // so each twinkle repaints a star and not the moon's glow beside it.
          <Loose shadow={false}>
            {NIGHT_STARS.map(([x, y, s], k) => (
              <motion.path
                key={k}
                d={starPath(x, y, s)}
                fill={p.paper}
                style={centre}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={on && !reduced ? { opacity: [0.4, 1, 0.4], scale: [0.85, 1.1, 0.85] } : { opacity: 0.8 }}
                transition={on && !reduced ? { duration: 2.4 + k * 0.5, repeat: Infinity, delay: k * 0.3 } : { duration: 0.3 }}
              />
            ))}
          </Loose>
        }
      >
        {/* The moon is paper that glows */}
        <motion.g
          initial={{ y: 0, opacity: 0.9 }}
          animate={phase === "rest" ? { y: -6, opacity: 1 } : { y: 0, opacity: 0.9 }}
          transition={{ duration: 2 }}
        >
          <PaperShadow>
            <path d={MOON} />
          </PaperShadow>
          <path d={MOON} fill={p.accent} style={{ filter: `drop-shadow(0 0 10px ${p.accent})` }} />
        </motion.g>
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={1.8}>
        {/* Upper jaw, and the splint that slides onto it */}
        {UPPER_X.map((x) => (
          <path key={x} d={`M${x - 13},240 L${x + 13},240 L${x + 12},286 Q${x},300 ${x - 12},286 Z`} fill={p.paper} />
        ))}
        <path d="M48,214 C90,206 210,206 252,214 L252,246 C230,238 214,250 196,242 C178,250 162,238 150,246 C138,238 122,250 104,242 C86,250 70,238 48,246 Z" fill={p.mid} />
        <Piece
          initial={{ y: -150, opacity: 0 }}
          animate={splint ? { y: 0, opacity: 1 } : { y: -150, opacity: 0 }}
          transition={reduced ? { duration: 0 } : splint ? { type: "spring", stiffness: 60, damping: 12 } : { duration: 0.5 }}
        >
          <rect x={52} y={262} width={196} height={40} rx={18} fill={p.paper} opacity={0.62} />
          <path d="M66,272 L234,272" stroke={p.paper} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
        </Piece>
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        {/* Lower jaw: it closes, grinds when there is nothing between, rests when there is */}
        <Piece
          initial={{ y: 44 }}
          animate={grinding ? { y: 0, x: [0, 5, -5, 5, -5, 0] } : { y: jawY, x: 0 }}
          transition={grinding ? { x: { duration: 1.4, ease: "easeInOut" }, y: { duration: 0.3 } } : { duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {UPPER_X.map((x) => (
            <path key={x} d={`M${x - 13},352 L${x + 13},352 L${x + 12},312 Q${x},298 ${x - 12},312 Z`} fill={p.paper} />
          ))}
          <path d="M48,380 C90,388 210,388 252,380 L252,346 C230,354 214,342 196,350 C178,342 162,354 150,346 C138,354 122,342 104,350 C86,342 70,354 48,346 Z" fill={p.deep} />
        </Piece>
        {/* Grinding: little jolts at the sides, only without the splint */}
        <NoShadow>
          {[
            "M34,294 L44,300 L36,306 L46,312",
            "M266,294 L256,300 L264,306 L254,312",
          ].map((z, k) => (
            <motion.path
              key={k}
              d={z}
              fill="none"
              stroke={p.ink}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={grinding ? { opacity: [0, 1, 0, 1, 0], x: k ? [0, 3, 0] : [0, -3, 0] } : { opacity: 0 }}
              transition={grinding ? { duration: 1.4 } : { duration: 0.2 }}
            />
          ))}
        </NoShadow>
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.4}>
        <path d={scallops(506, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Tannlegeskrekk: the chair, breathing ───────────── */

// Everything here moves for as long as the scene is on, so every loop is a
// Loose layer (paper-breathe, paper-glow and paper-recline in globals.css):
// in for four, out for four, and the chair's back in time with it.
const vars = (v: Record<string, string>) => v as React.CSSProperties;

export function PapirStol({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const breathe = on && !reduced;

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet
        n={0}
        on={on}
        reduced={reduced}
        d={d}
        depth={0.5}
        shadow={false}
        loose={
          <>
            <Loose loop="breathe" on={breathe} shadow={false} style={vars({ "--at": "50% 46.2963%", "--in": "0.86", "--out": "1.06", "--rest": "0.95" })}>
              <circle cx={150} cy={250} r={112} fill={p.far} />
            </Loose>
            <Loose loop="breathe" on={breathe} shadow={false} style={vars({ "--at": "50% 46.2963%", "--in": "0.8", "--out": "1.12", "--delay": "0.3s" })}>
              <circle cx={150} cy={250} r={70} fill={p.sky} />
            </Loose>
          </>
        }
      />
      <Sheet
        n={1}
        on={on}
        reduced={reduced}
        d={d}
        depth={1}
        loose={
          // Fourteen units out and back over sixteen seconds.
          <Loose loop="drift" on={breathe} style={vars({ "--drift": "4.6667%", "--drift-time": "16s" })}>
            <path d="M26,120 Q26,104 42,106 Q48,92 64,98 Q76,88 86,102 Q100,102 98,116 L34,118 Q26,118 26,120 Z" fill={p.paper} />
          </Loose>
        }
      >
        <path d="M-420,440 C-200,428 60,436 150,430 C240,436 500,428 720,440 L720,540 L-420,540 Z" fill={p.near} />
      </Sheet>
      <Sheet
        n={2}
        on={on}
        reduced={reduced}
        d={d}
        depth={2}
        loose={
          <>
            {/* The lamp's glow, and the lamp's head over it */}
            <Loose loop="glow" on={breathe} shadow={false}>
              <ellipse cx={204} cy={126} rx={34} ry={22} fill={p.accent} />
            </Loose>
            <Loose>
              <rect x={184} y={110} width={40} height={24} rx={11} fill={p.paper} />
            </Loose>
            {/* The back and headrest; held back a little when the scene is still */}
            <Loose loop="recline" on={breathe} style={vars({ "--rest": on && reduced ? "rotate(-16deg)" : "none" })}>
              <path d="M92,382 L66,276 Q64,266 74,264 L90,262 Q100,262 102,272 L118,378 Z" fill={p.mid} />
              <rect x={60} y={226} width={40} height={30} rx={13} fill={p.paper} />
              <rect x={76} y={252} width={8} height={14} fill={p.ink} />
            </Loose>
          </>
        }
      >
        <path d="M296,20 L292,26 L214,112 L208,106 Z" fill={p.ink} />
        {/* Base, seat and leg rest */}
        <path d="M112,452 Q150,440 188,452 L188,462 L112,462 Z" fill={p.ink} />
        <rect x={140} y={392} width={20} height={62} fill={p.ink} />
        <rect x={98} y={370} width={104} height={24} rx={11} fill={p.mid} />
        <path d="M196,372 L250,410 Q256,418 248,424 L236,428 L186,392 Z" fill={p.mid} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={3}>
        <path d={scallops(506, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Akutt tannhjelp: the operating lamp (front page) ───────────── */

const LAMP_STEPS = [
  ["pain", 1800],
  ["lamp", 1200],
  ["light", 2400],
  ["rest", 1600],
  ["reset", 700],
] as const;

const JOLTS = [
  "M86,244 L100,252 L90,258 L106,268",
  "M214,244 L200,252 L210,258 L194,268",
  "M142,176 L150,190 L140,194 L150,208",
];

export function PapirLampe({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, LAMP_STEPS);
  const pain = !reduced && (phase === "pain" || phase === "lamp");
  const lit = reduced ? on : phase === "light" || phase === "rest";
  const lampIn = reduced ? on : phase === "lamp" || lit;

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={GUM_BACK(452)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        {/* Soft light pooling on the tooth */}
        <NoShadow>
          <motion.path
            d="M186,122 L96,300 L220,300 Z"
            fill={p.paper}
            initial={{ opacity: 0 }}
            animate={{ opacity: lit ? 0.55 : 0 }}
            transition={{ duration: 0.9 }}
          />
        </NoShadow>
        <path d={MOLAR} fill={p.paper} />
        <path d={MOLAR_SHADE} fill={p.shade} />
        <NoShadow>
          {JOLTS.map((z, k) => (
            <motion.path
              key={k}
              d={z}
              fill="none"
              stroke={p.ink}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={centre}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={pain ? { opacity: 1, scale: [1, 1.18, 1], x: [0, k === 0 ? -2 : 2, 0] } : { opacity: 0, scale: 0.6 }}
              transition={pain ? { duration: 0.5, repeat: Infinity, delay: k * 0.12 } : { duration: 0.5 }}
            />
          ))}
        </NoShadow>
        <Star x={178} y={226} s={0.85} show={phase === "rest"} delay={0.1} reduced={reduced} />
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <path d={GUM_FRONT(482)} fill={p.mid} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        {/* The lamp swings in on its arm and switches on */}
        <Piece
          style={pivot(300, 0)}
          initial={{ rotate: -40 }}
          animate={{ rotate: lampIn ? 0 : -40 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 45, damping: 9 }}
          shadow={
            <>
              <path d="M300,0 L306,8 L206,108 L198,100 Z" />
              <rect x={160} y={98} width={62} height={34} rx={16} />
            </>
          }
        >
          <path d="M300,0 L306,8 L206,108 L198,100 Z" fill={p.ink} />
          <rect x={160} y={98} width={62} height={34} rx={16} fill={p.paper} />
          <motion.rect
            x={170}
            y={122}
            width={42}
            height={8}
            rx={4}
            fill={p.accent}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: lit ? 1 : 0.25 }}
            transition={{ duration: 0.4 }}
            style={{ filter: lit ? `drop-shadow(0 0 8px ${p.accent})` : undefined }}
          />
        </Piece>
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(514, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Implantater: screw, post, crown (front page) ───────────── */

const IMPLANT_STEPS = [
  ["enter", 1000],
  ["screw", 2400],
  ["post", 1000],
  ["crown", 1700],
  ["rest", 2200],
  ["reset", 800],
] as const;

const SCREW = "M136,300 L164,300 L162,330 L160,370 L156,392 Q150,404 144,392 L140,370 L138,330 Z";

export function PapirImplantat({ active, reduced, d }: SceneProps) {
  const id = useId().replace(/:/g, "");
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, IMPLANT_STEPS, 1);
  const screwing = phase === "screw" && !reduced;
  const inBone = reduced ? on : ["screw", "post", "crown", "rest"].includes(phase);
  const post = reduced ? on : ["post", "crown", "rest"].includes(phase);
  const crown = reduced ? on : phase === "crown" || phase === "rest";

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        {/* The socket in the bone, seen through the cut */}
        <path d="M-420,392 C-200,384 60,392 150,388 C240,392 500,384 720,392 L720,540 L-420,540 Z" fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={1.9}>
        <NoShadow>
          <defs>
            <clipPath id={`screw-${id}`}>
              <path d={SCREW} />
            </clipPath>
          </defs>
        </NoShadow>
        <Piece
          initial={{ y: -260 }}
          animate={{ y: inBone ? 84 : -260 }}
          transition={reduced ? { duration: 0 } : screwing ? { duration: 2.2, ease: [0.3, 0, 0.3, 1] } : { duration: 0.6 }}
        >
          <path d={SCREW} fill={STEEL} />
          <NoShadow>
            <g clipPath={`url(#screw-${id})`}>
              <motion.g
                animate={screwing ? { y: [0, -9] } : { y: 0 }}
                transition={screwing ? { duration: 0.16, repeat: Infinity, ease: "linear" } : { duration: 0.1 }}
              >
                {Array.from({ length: 14 }, (_, k) => (
                  <path key={k} d={`M130,${306 + k * 9} L170,${298 + k * 9}`} stroke={p.ink} strokeWidth={2.2} opacity={0.4} />
                ))}
              </motion.g>
            </g>
          </NoShadow>
        </Piece>
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.5}>
        {/* Bone in front, cut away where the implant goes, and the gum over it */}
        <path d="M-420,392 C-200,384 60,392 126,390 L126,500 Q150,512 174,500 L174,390 C240,392 500,384 720,392 L720,540 L-420,540 Z" fill={p.near} />
        <path d="M-420,380 C-200,372 60,378 124,376 Q136,396 150,396 Q164,396 176,376 C240,378 500,372 720,380 L720,398 C500,390 240,396 174,394 L126,394 C60,396 -200,390 -420,398 Z" fill={p.mid} />
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3}>
        {/* The post drops onto the implant, then the crown onto the post */}
        <Piece
          initial={{ y: -200, opacity: 0 }}
          animate={post ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }}
          transition={reduced ? { duration: 0 } : post ? { type: "spring", stiffness: 90, damping: 11 } : { duration: 0.4 }}
        >
          <path d="M140,352 L160,352 L164,384 L136,384 Z" fill={STEEL} />
        </Piece>
        <Piece
          initial={{ y: -260, opacity: 0 }}
          animate={crown ? { y: 0, opacity: 1 } : { y: -260, opacity: 0 }}
          transition={reduced ? { duration: 0 } : crown ? { type: "spring", stiffness: 42, damping: 8 } : { duration: 0.4 }}
        >
          <g transform="translate(45 58) scale(0.7)">
            <path d={CROWN} fill={p.paper} />
            <path d={CROWN_SHADE} fill={p.shade} />
          </g>
        </Piece>
        <Star x={200} y={258} s={0.85} show={phase === "rest"} delay={0.3} reduced={reduced} />
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.7}>
        <path d={scallops(514, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

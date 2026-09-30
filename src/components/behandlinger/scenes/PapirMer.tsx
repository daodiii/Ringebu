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

/* ───────────── Tanntrekking: the panoramic X-ray ───────────── */

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

/* ───────────── Stabiliseringsskinner: the bite splint ───────────── */

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

/* ───────────── Tannimplantater: the cut through the jaw ───────────── */

/** A warm sun, the same in every palette. */
const SUN = "#F2E7B8";

// A row of teeth with a gap, cut open so the bone shows. The screw turns into
// the gap, the gum closes over it while the sun crosses the sky (it takes a
// few months), and the crown is lowered on strings.
const SNITT_STEPS = [
  ["enter", 900],
  ["screw", 2400],
  ["heal", 2800],
  ["crown", 2000],
  ["rest", 2200],
  ["reset", 800],
] as const;

// The same screw, a little smaller, set into the bone under the gap.
const SNITT_SCREW = "M138,352 L162,352 L160,378 L158,410 L155,428 Q150,438 145,428 L142,410 L140,378 Z";
const NEIGHBOUR = (tx: number) => `translate(${tx} 96) scale(0.6)`;

export function PapirImplantatSnitt({ active, reduced, d }: SceneProps) {
  const id = useId().replace(/:/g, "");
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, SNITT_STEPS, 1);
  const screwing = phase === "screw" && !reduced;
  const inBone = reduced ? on : ["screw", "heal", "crown", "rest"].includes(phase);
  const healed = reduced ? on : ["heal", "crown", "rest"].includes(phase);
  const crown = reduced ? on : phase === "crown" || phase === "rest";
  const strings = !reduced && phase === "crown";
  const sun = phase === "heal" && !reduced;

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.6}>
        {/* The sun crosses while the gum heals */}
        <Piece
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={sun ? { x: [0, 110, 220], y: [0, -70, 0], opacity: [0, 1, 1, 0] } : { x: 0, y: 0, opacity: 0 }}
          transition={sun ? { duration: 2.6, ease: "linear" } : { duration: 0.3 }}
        >
          <circle cx={40} cy={190} r={20} fill={SUN} />
        </Piece>
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={1.5}>
        {/* The bone, cut open, and the socket the screw goes into */}
        <path d="M-420,344 C-200,338 60,344 150,342 C240,344 500,338 720,344 L720,540 L-420,540 Z" fill={p.near} />
        <path d="M136,346 L164,346 L162,436 Q150,448 138,436 Z" fill={p.deep} />
        {[[70, 400], [96, 460], [212, 420], [238, 470], [58, 486], [190, 492]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={5} fill={p.far} />
        ))}
        <NoShadow>
          <defs>
            <clipPath id={`snitt-${id}`}>
              <path d={SNITT_SCREW} />
            </clipPath>
          </defs>
        </NoShadow>
        <Piece
          initial={{ y: -300 }}
          animate={{ y: inBone ? 0 : -300 }}
          transition={reduced ? { duration: 0 } : screwing ? { duration: 2.2, ease: [0.3, 0, 0.3, 1] } : { duration: 0.6 }}
          shadow={<path d={SNITT_SCREW} />}
        >
          <path d={SNITT_SCREW} fill={STEEL} />
          <NoShadow>
            <g clipPath={`url(#snitt-${id})`}>
              <motion.g
                animate={screwing ? { y: [0, -8] } : { y: 0 }}
                transition={screwing ? { duration: 0.16, repeat: 13, ease: "linear" } : { duration: 0.1 }}
              >
                {Array.from({ length: 12 }, (_, k) => (
                  <path key={k} d={`M134,${356 + k * 8} L166,${349 + k * 8}`} stroke={p.ink} strokeWidth={2} opacity={0.4} />
                ))}
              </motion.g>
            </g>
          </NoShadow>
        </Piece>
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2}>
        {/* The neighbours, and the gum with its opening */}
        <g transform={NEIGHBOUR(-30)}>
          <path d={MOLAR} fill={p.paper} />
          <path d={MOLAR_SHADE} fill={p.shade} />
        </g>
        <g transform={NEIGHBOUR(150)}>
          <path d={MOLAR} fill={p.paper} />
          <path d={MOLAR_SHADE} fill={p.shade} />
        </g>
        <path d="M-420,334 C-200,326 40,332 92,324 Q110,318 126,330 L126,360 L-420,360 Z" fill={p.mid} />
        <path d="M174,330 Q190,318 208,324 C260,332 500,326 720,334 L720,360 L174,360 Z" fill={p.mid} />
        {/* The gum closes over the screw */}
        <Piece
          initial={{ x: -24 }}
          animate={{ x: healed ? 0 : -24 }}
          transition={reduced ? { duration: 0 } : healed ? { duration: 2.2, ease: [0.4, 0, 0.2, 1] } : { duration: 0.5 }}
        >
          <path d="M124,330 Q137,324 151,327 L151,360 L124,360 Z" fill={p.mid} />
        </Piece>
        <Piece
          initial={{ x: 24 }}
          animate={{ x: healed ? 0 : 24 }}
          transition={reduced ? { duration: 0 } : healed ? { duration: 2.2, ease: [0.4, 0, 0.2, 1] } : { duration: 0.5 }}
        >
          <path d="M149,327 Q163,324 176,330 L176,360 L149,360 Z" fill={p.mid} />
        </Piece>
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={2.6}>
        <NoShadow>
          <motion.g
            initial={{ y: -320 }}
            animate={{ y: crown ? 0 : -320 }}
            transition={reduced ? { duration: 0 } : crown ? { type: "spring", stiffness: 38, damping: 7.5, mass: 1.2 } : { duration: 0.8, ease: [0.45, 0, 0.3, 1] }}
          >
            <motion.path
              d="M132,252 L124,-340 M168,252 L176,-340"
              stroke={p.ink}
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: strings ? 0.75 : 0 }}
              transition={{ duration: 0.6 }}
            />
            <Piece>
              <g transform="translate(59.4 78.4) scale(0.6)">
                <path d={CROWN} fill={p.paper} />
                <path d={CROWN_SHADE} fill={p.shade} />
              </g>
            </Piece>
          </motion.g>
        </NoShadow>
        <Star x={196} y={236} s={0.85} show={phase === "rest"} delay={0.3} reduced={reduced} />
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.4}>
        <path d={scallops(514, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Proteser: the piece that fits the gap ───────────── */

const PARTIAL_STEPS = [
  ["enter", 1000],
  ["down", 1500],
  ["click", 900],
  ["rest", 1900],
  ["out", 1400],
] as const;

const ROW = [60, 96, 132, 168, 204, 240];
const MISSING = [132, 168];
const rowTooth = (x: number) => `M${x - 15},380 L${x + 15},380 L${x + 14},318 Q${x},298 ${x - 14},318 Z`;

export function PapirDelprotese({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, PARTIAL_STEPS, 1);
  const seated = reduced ? on : phase === "down" || phase === "click" || phase === "rest";
  const y = seated ? 0 : phase === "out" ? -90 : -300;
  const clicking = phase === "click" && !reduced;

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet
        n={0}
        on={on}
        reduced={reduced}
        d={d}
        depth={0.6}
        loose={
          <Loose loop="drift" on={on && !reduced}>
            <path d="M40,150 Q40,132 58,134 Q64,118 82,124 Q94,114 106,128 Q122,128 120,144 Q122,156 108,156 L50,156 Q40,156 40,150 Z" fill={p.paper} />
          </Loose>
        }
      />
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={1.6}>
        {/* A row of lower teeth, two missing */}
        {ROW.filter((x) => !MISSING.includes(x)).map((x) => (
          <path key={x} d={rowTooth(x)} fill={p.paper} />
        ))}
        {ROW.filter((x) => !MISSING.includes(x)).map((x) => (
          <path key={`s${x}`} d={`M${x + 6},380 L${x + 15},380 L${x + 14},318 Q${x + 10},306 ${x + 6},302 Q${x + 9},320 ${x + 6},380 Z`} fill={p.shade} />
        ))}
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.2}>
        {/* The partial denture: a gum-coloured saddle with two teeth, and a clasp round each neighbour */}
        <Piece
          initial={{ y: -300 }}
          animate={{ y }}
          transition={
            reduced
              ? { duration: 0 }
              : seated
                ? { type: "spring", stiffness: 70, damping: 11 }
                : { duration: 1, ease: [0.45, 0, 0.3, 1] }
          }
          shadow={
            <>
              <path d="M112,362 Q150,352 188,362 L190,388 L110,388 Z" />
              {MISSING.map((x) => (
                <path key={x} d={rowTooth(x)} />
              ))}
            </>
          }
        >
          {MISSING.map((x) => (
            <path key={x} d={rowTooth(x)} fill={p.paper} />
          ))}
          <path d="M112,362 Q150,352 188,362 L190,388 L110,388 Z" fill={p.mid} />
          <NoShadow>
            <path d="M114,364 Q104,340 82,338" fill="none" stroke={STEEL} strokeWidth={3.5} strokeLinecap="round" />
            <path d="M186,364 Q196,340 218,338" fill="none" stroke={STEEL} strokeWidth={3.5} strokeLinecap="round" />
          </NoShadow>
        </Piece>
        {/* A click at each clasp */}
        <NoShadow>
          {["M70,322 L62,314 M74,316 L72,306", "M230,322 L238,314 M226,316 L228,306"].map((z, k) => (
            <motion.path
              key={k}
              d={z}
              fill="none"
              stroke={p.ink}
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={clicking ? { opacity: [0, 1, 0] } : { opacity: 0 }}
              transition={clicking ? { duration: 0.6, delay: k * 0.15 } : { duration: 0.1 }}
            />
          ))}
        </NoShadow>
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={2.8}>
        {/* The gum in front */}
        <path d="M-420,384 C-200,372 30,386 44,376 Q60,366 76,376 Q96,384 116,376 Q150,368 184,376 Q204,384 224,376 Q240,366 256,376 C300,386 500,372 720,384 L720,540 L-420,540 Z" fill={p.mid} />
        <Star x={150} y={274} s={0.9} show={phase === "rest"} delay={0.2} reduced={reduced} />
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.4}>
        <path d={scallops(514, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

/* ───────────── Tannskader: the football ───────────── */

const BALL_STEPS = [
  ["enter", 1000],
  ["kick", 700],
  ["hit", 1300],
  ["fix", 1800],
  ["rest", 1900],
  ["reset", 400],
] as const;

// A front tooth, the corner the ball knocks off, and what is left.
const BROKEN = "M116,440 C112,380 106,300 110,246 Q114,206 150,204 L156,226 L166,234 L172,250 L190,262 C194,300 188,380 184,440 Z";
const CHIP = "M150,204 Q186,206 190,246 L190,262 L172,250 L166,234 L156,226 Z";
const BROKEN_SHADE = "M180,262 C186,300 182,380 176,440 L184,440 C188,380 194,300 190,262 Z";

function Ball() {
  const { p } = usePaper();
  return (
    <>
      <circle cx={214} cy={232} r={21} fill={p.paper} />
      <NoShadow>
        <path d="M214,224 L221,229 L218,237 L210,237 L207,229 Z" fill={p.ink} />
        <path d="M214,224 L214,212 M221,229 L233,226 M218,237 L224,248 M210,237 L204,248 M207,229 L195,226" stroke={p.ink} strokeWidth={1.4} />
      </NoShadow>
    </>
  );
}

export function PapirFotball({ active, reduced, d }: SceneProps) {
  const { p } = usePaper();
  const on = active;
  const phase = usePhase(active, BALL_STEPS, 1);
  const knocked = reduced ? false : phase === "hit" || phase === "fix" || phase === "rest";
  const mended = reduced ? on : phase === "fix" || phase === "rest";
  const strings = !reduced && phase === "fix";

  const ball =
    reduced || phase === "off" || phase === "enter" || phase === "reset"
      ? { animate: { x: 170, y: -160, opacity: 0 }, transition: { duration: 0 } }
      : phase === "kick"
        ? { animate: { x: [170, 0], y: [-160, 0], opacity: [0, 1] }, transition: { duration: 0.6, ease: [0.5, 0, 1, 1] as const } }
        : phase === "hit"
          ? { animate: { x: [0, 70, 160], y: [0, -60, 150], opacity: [1, 1, 0] }, transition: { duration: 1.1, ease: "easeOut" as const } }
          : { animate: { x: 170, y: -160, opacity: 0 }, transition: { duration: 0 } };

  return (
    <Stage active={active} reduced={reduced}>
      <Sheet n={0} on={on} reduced={reduced} d={d} depth={0.8}>
        <path d={FAR_HILLS} fill={p.far} />
      </Sheet>
      <Sheet n={1} on={on} reduced={reduced} d={d} depth={1.4}>
        <path d={GUM_BACK(446)} fill={p.deep} />
      </Sheet>
      <Sheet n={2} on={on} reduced={reduced} d={d} depth={2}>
        <path d={BROKEN} fill={p.paper} />
        <path d={BROKEN_SHADE} fill={p.shade} />
        {/* The corner, until the ball knocks it off */}
        <Piece
          style={centre}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={knocked ? { x: -70, y: -190, rotate: -200, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={knocked && phase === "hit" ? { duration: 0.9, ease: "easeOut" } : { duration: 0 }}
        >
          <path d={CHIP} fill={p.paper} />
        </Piece>
      </Sheet>
      <Sheet n={3} on={on} reduced={reduced} d={d} depth={2.6}>
        <Piece initial={{ x: 170, y: -160, opacity: 0 }} {...ball}>
          <Ball />
        </Piece>
        {/* The knock */}
        <NoShadow>
          {["M196,214 L206,196", "M204,250 L222,262", "M186,222 L178,206"].map((z, k) => (
            <motion.path
              key={k}
              d={z}
              stroke={p.ink}
              strokeWidth={3}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={phase === "hit" && !reduced ? { opacity: [0, 1, 0] } : { opacity: 0 }}
              transition={phase === "hit" && !reduced ? { duration: 0.5 } : { duration: 0.1 }}
            />
          ))}
        </NoShadow>
        {/* A new corner, lowered on strings into place */}
        <NoShadow>
          <motion.g
            initial={{ y: -320, opacity: 0 }}
            animate={mended ? { y: 0, opacity: 1 } : { y: -320, opacity: 0 }}
            transition={reduced ? { duration: 0 } : mended ? { type: "spring", stiffness: 42, damping: 8.5 } : { duration: 0 }}
          >
            <motion.path
              d="M162,210 L152,-340 M184,230 L196,-340"
              stroke={p.ink}
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: strings ? 0.75 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <Piece>
              <path d={CHIP} fill={p.paper} />
            </Piece>
          </motion.g>
        </NoShadow>
      </Sheet>
      <Sheet n={4} on={on} reduced={reduced} d={d} depth={3.2}>
        <path d={GUM_FRONT(476)} fill={p.mid} />
        <Star x={214} y={200} show={phase === "rest"} delay={0.2} reduced={reduced} />
      </Sheet>
      <Sheet n={5} on={on} reduced={reduced} d={d} depth={3.8}>
        <path d={scallops(512, 12)} fill={p.lip} />
      </Sheet>
    </Stage>
  );
}

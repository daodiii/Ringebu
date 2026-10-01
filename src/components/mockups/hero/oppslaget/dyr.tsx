import { Fragment } from "react";
import { NoShadow, PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { bumpy, r2 } from "@/components/home/landskap";

/**
 * The sheep and the moose from the closing pasture (home/Sauene.tsx), copied
 * here because Sauene keeps its drawings to itself. Same paper, same shapes:
 * each animal is drawn in its own units, standing at 0,0 and facing right,
 * with the head apart so it can graze.
 */

export type Dyr =
  | { kind: "sau"; wool: string; top: string; head: string; eye: string; bell?: boolean }
  | { kind: "elg"; bull?: boolean };

export const HVIT_SAU = { kind: "sau", wool: "#F4F1E8", top: "#FFFFFF", head: "#DDD4C5", eye: "#2B2725" } as const;
export const SVART_SAU = { kind: "sau", wool: "#3F3A38", top: "#4E4845", head: "#35302D", eye: "#E9E4D8" } as const;

const MOOSE = { hide: "#4E3E32", back: "#5E4B3D", leg: "#3E3129", sock: "#CBBBA3", snout: "#685444", antler: "#DDCCA8", far: "#BDAA88", eye: "#E9E4D8" };
const MOOSE_BODY = "M-26,-47 Q-27,-55 -19,-56 Q-2,-58 8,-66 Q15,-72 22,-64 Q28,-54 25,-42 Q22,-36 14,-37 L-17,-37.5 Q-25,-38 -26,-47 Z";
const ANTLER = "M29,-62 L30,-68 Q24,-69 17,-73 L12,-80 L17.5,-78.5 L17.5,-86 L22,-80.5 L24.5,-89 L27.5,-81.5 L31.5,-90 L33,-82 L38,-88 L38,-80 L44,-83 L41,-75 Q37.5,-70 34,-67.5 L33,-61.5 Z";

type Form = {
  /** The box round the animal, cut at the ground: x, y, w, h in its own units. */
  box: [number, number, number, number];
  /** The neck the head turns round. */
  neck: [number, number];
  /** How far the head lifts, in degrees, facing right. */
  lift: number;
  body: React.ReactNode;
  head: React.ReactNode;
};

export function form(dyr: Dyr, seed: number): Form {
  if (dyr.kind === "sau") {
    const body = bumpy(0, -25, 23, 13.5, 11, 10 + seed, 0.45);
    return {
      box: [-34, -50, 72, 50],
      neck: [16, -26],
      lift: 40,
      body: (
        <>
          <PaperShadow>
            <path d={body} />
          </PaperShadow>
          {[-15, -9, 8, 14].map((lx) => <rect key={lx} x={lx - 1.6} y={-16} width={3.2} height={16} rx={1} fill="#4A4540" />)}
          <path d={body} fill={dyr.wool} />
          <path d={bumpy(-2, -29, 17, 8, 9, 30 + seed, 0.5)} fill={dyr.top} />
          <path d={bumpy(-23, -28, 3.2, 3.2, 5, 50 + seed, 0.6)} fill={dyr.wool} />
          {dyr.bell && (
            <>
              <NoShadow>
                <path d="M12,-21 Q16,-16 21,-18" stroke="#6E4E3A" strokeWidth={1.4} fill="none" />
              </NoShadow>
              <circle cx={17} cy={-15} r={2.8} fill="#D9B45C" />
            </>
          )}
        </>
      ),
      head: (
        <>
          <ellipse cx={16} cy={-29} rx={5.4} ry={2.4} fill={dyr.head} transform="rotate(-24 16 -29)" />
          <ellipse cx={16.4} cy={-29.2} rx={3.2} ry={1.1} fill="#E7B8B0" transform="rotate(-24 16 -29)" />
          <path d="M15,-29 Q28,-27 32,-15 Q34,-7 28,-5 Q22,-5 18,-13 Z" fill={dyr.head} />
          <path d={bumpy(20, -30, 5, 3.6, 6, 70 + seed, 0.6)} fill={dyr.top} />
          <circle cx={25.5} cy={-19} r={1.2} fill={dyr.eye} />
          <ellipse cx={30} cy={-8} rx={2.6} ry={1.8} fill="#8F8278" opacity={0.7} />
        </>
      ),
    };
  }
  return {
    box: [-56, -94, 112, 94],
    neck: [19, -57],
    lift: dyr.bull ? 10 : 14,
    body: (
      <>
        <PaperShadow>
          <path d={MOOSE_BODY} />
        </PaperShadow>
        {[-21, -14, 12, 19].map((lx) => (
          <Fragment key={lx}>
            <rect x={lx - 1.9} y={-41} width={3.8} height={41} rx={1} fill={MOOSE.leg} />
            <rect x={lx - 1.9} y={-19} width={3.8} height={16.5} fill={MOOSE.sock} />
          </Fragment>
        ))}
        <path d="M-25.5,-53 Q-29.5,-51 -28,-46 Q-26.5,-48.5 -25,-48 Z" fill={MOOSE.hide} />
        <path d={MOOSE_BODY} fill={MOOSE.hide} />
        <path d="M-19,-55.6 Q-2,-57.6 8,-65.5 Q15,-71.5 21,-64.5 Q12,-64 2,-59 Q-8,-55 -19,-55.6 Z" fill={MOOSE.back} />
      </>
    ),
    head: (
      <>
        {dyr.bull && <path d={ANTLER} fill={MOOSE.far} transform="translate(6 2)" />}
        <path d="M15,-63 Q25,-66 31,-63 Q40,-59 46,-52 Q51,-48 53,-43 Q54.5,-37 49.5,-36 Q46,-35.5 44,-39 Q38,-44 32,-45.5 Q27,-45 24,-41 Q19,-45 15,-51 Z" fill={MOOSE.hide} />
        <path d="M45.5,-50.5 Q51,-48 53,-43 Q54.5,-37 49.5,-36 Q46,-35.5 44,-39 Q43,-45 45.5,-50.5 Z" fill={MOOSE.snout} />
        <ellipse cx={51} cy={-40.5} rx={1.3} ry={0.8} fill={MOOSE.leg} />
        <path d="M29,-45.5 Q32,-36 28.5,-31 Q26,-36.5 26.8,-45.5 Z" fill={MOOSE.hide} />
        <ellipse cx={28.5} cy={-65} rx={5.6} ry={2.1} fill={MOOSE.hide} transform="rotate(-38 28.5 -65)" />
        {dyr.bull && <path d={ANTLER} fill={MOOSE.antler} />}
        <circle cx={39} cy={-56} r={1.1} fill={MOOSE.eye} />
      </>
    ),
  };
}

/**
 * An animal drawn for a piece of the book: its box in the animal's own units
 * scaled by `k` and turned to `face`, the body and the head as two SVGs over
 * the same box, the neck as a transform-origin in % of the box, and its
 * silhouette for the shadow it throws on the page.
 */
export function cutDyr(dyr: Dyr, k: number, face: 1 | -1, seed: number) {
  const f = form(dyr, seed);
  const [bx, by, bw, bh] = f.box;
  // Facing left, the box is mirrored about the animal's own 0.
  const x0 = face > 0 ? bx : -(bx + bw);
  const view = `${r2(x0 * k)} ${r2(by * k)} ${r2(bw * k)} ${r2(bh * k)}`;
  const place = `scale(${r2(k * face)} ${r2(k)})`;
  const neckX = face > 0 ? f.neck[0] : -f.neck[0];
  return {
    w: r2(bw * k),
    h: r2(bh * k),
    /** Where the animal's feet are, from the box's left edge. */
    foot: r2(-x0 * k),
    neck: `${r2(((neckX - x0) / bw) * 100)}% ${r2(((f.neck[1] - by) / bh) * 100)}%`,
    body: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full">
        <g transform={place}>{f.body}</g>
      </svg>
    ),
    head: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
        <g transform={place}>{f.head}</g>
      </svg>
    ),
    /** The whole animal, body and head, for its shadow and the back of its paper. */
    view,
    shape: (
      <g transform={place}>
        {f.body}
        {f.head}
      </g>
    ),
  };
}

import { Fragment, type CSSProperties } from "react";
import { NoShadow, PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { bumpy, r2 } from "@/components/home/landskap";
import { H, W } from "./art";
import s from "./dalen.module.css";

/**
 * The animals of the front page's closing pasture (Sauene.tsx), cut the same
 * way; copied here because Sauene keeps its drawings to itself. Each one
 * belongs to some of the seasons: sheep and lambs in spring, sheep and cows
 * in summer, a bull moose in autumn, a cow moose and her calf in winter, the
 * moose at the rowan in the meadow. When
 * its season comes an animal pops up onto the grass; when it goes, it ducks
 * away again. They stand on small layers of their own, so neither costs a
 * repaint of the paper behind them.
 */

export type Season = "winter" | "spring" | "summer" | "autumn";

type Dyr = { x: number; y: number; k: number; face: 1 | -1; t: number; delay: number; in: Season[]; sheet: "lia" | "dal" | "naer" } & (
  | { kind: "sau"; wool: string; top: string; head: string; eye: string; bell?: boolean }
  | { kind: "ku" }
  | { kind: "elg"; bull?: boolean }
);

const WHITE = { kind: "sau", wool: "#F4F1E8", top: "#FFFFFF", head: "#DDD4C5", eye: "#2B2725" } as const;
const BLACK = { kind: "sau", wool: "#3F3A38", top: "#4E4845", head: "#35302D", eye: "#E9E4D8" } as const;
const BROWN = { kind: "sau", wool: "#9A7B62", top: "#A98B72", head: "#8A6E58", eye: "#2B2725" } as const;

export const ANIMALS: Dyr[] = [
  // Cows on the fields across the river, in summer
  { kind: "ku", x: 880, y: 804, k: 0.56, face: 1, t: 10, delay: 1.4, in: ["summer"], sheet: "dal" },
  { kind: "ku", x: 1206, y: 801, k: 0.52, face: -1, t: 11, delay: 3.4, in: ["summer"], sheet: "dal" },
  { kind: "ku", x: 1290, y: 804, k: 0.55, face: 1, t: 9.5, delay: 5.2, in: ["summer"], sheet: "dal" },
  // Sheep on this side; lambs in spring
  { ...WHITE, x: 936, y: 858, k: 1.02, face: 1, t: 8.5, delay: 1.8, in: ["spring", "summer"], sheet: "naer", bell: true },
  { ...BLACK, x: 1030, y: 846, k: 0.88, face: -1, t: 9, delay: 0.5, in: ["summer"], sheet: "naer" },
  { ...WHITE, x: 1020, y: 862, k: 0.6, face: 1, t: 6.5, delay: 2.2, in: ["spring"], sheet: "naer" },
  { ...WHITE, x: 1206, y: 864, k: 1.08, face: -1, t: 7.5, delay: 2.6, in: ["spring", "summer"], sheet: "naer", bell: true },
  { ...WHITE, x: 1284, y: 866, k: 0.62, face: -1, t: 6, delay: 4, in: ["spring"], sheet: "naer" },
  { ...BROWN, x: 1330, y: 850, k: 0.9, face: 1, t: 8.5, delay: 4.2, in: ["summer"], sheet: "naer" },
  // Moose come down to the rowan in the meadow, as they do for its twigs and berries: the bull in autumn, a cow and her calf in winter
  { kind: "elg", bull: true, x: 1196, y: 858, k: 0.98, face: -1, t: 10, delay: 2, in: ["autumn"], sheet: "naer" },
  { kind: "elg", x: 1192, y: 858, k: 0.92, face: -1, t: 12, delay: 2, in: ["winter"], sheet: "naer" },
  { kind: "elg", x: 1288, y: 864, k: 0.58, face: -1, t: 9, delay: 5, in: ["winter"], sheet: "naer" },
];

// Red and white, as most cows in Norway are
const COW = { hide: "#B0644C", back: "#BF765C", ear: "#9A543F", leg: "#955340", hoof: "#4A3B34", white: "#F4F1E8", pink: "#E6B3A8", nose: "#C98E84", horn: "#EFE6D2" };
// Dark brown, with pale legs and pale antlers
const MOOSE = { hide: "#4E3E32", back: "#5E4B3D", leg: "#3E3129", sock: "#CBBBA3", snout: "#685444", antler: "#DDCCA8", far: "#BDAA88", eye: "#E9E4D8" };

const COW_BODY = "M-40,-47 Q-41,-55 -33,-55 Q-10,-52 12,-54 Q24,-55 28,-47 Q31,-38 27,-29 Q23,-23 14,-24 Q-4,-19 -22,-23 Q-36,-25 -40,-34 Z";
const MOOSE_BODY = "M-26,-47 Q-27,-55 -19,-56 Q-2,-58 8,-66 Q15,-72 22,-64 Q28,-54 25,-42 Q22,-36 14,-37 L-17,-37.5 Q-25,-38 -26,-47 Z";
const ANTLER = "M29,-62 L30,-68 Q24,-69 17,-73 L12,-80 L17.5,-78.5 L17.5,-86 L22,-80.5 L24.5,-89 L27.5,-81.5 L31.5,-90 L33,-82 L38,-88 L38,-80 L44,-83 L41,-75 Q37.5,-70 34,-67.5 L33,-61.5 Z";

/** An animal in its own units, standing at 0,0 and facing right: the box round it, the neck its head turns round, how far the head lifts, body and head apart. */
function form(dyr: Dyr, i: number) {
  switch (dyr.kind) {
    case "sau": {
      const body = bumpy(0, -25, 23, 13.5, 11, 10 + i, 0.45);
      return {
        box: [-34, -50, 72, 54],
        neck: [16, -26],
        lift: 40,
        body: (
          <>
            <PaperShadow>
              <path d={body} />
            </PaperShadow>
            {[-15, -9, 8, 14].map((lx) => <rect key={lx} x={lx - 1.6} y={-16} width={3.2} height={16} rx={1} fill="#4A4540" />)}
            <path d={body} fill={dyr.wool} />
            <path d={bumpy(-2, -29, 17, 8, 9, 30 + i, 0.5)} fill={dyr.top} />
            <path d={bumpy(-23, -28, 3.2, 3.2, 5, 50 + i, 0.6)} fill={dyr.wool} />
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
            <path d={bumpy(20, -30, 5, 3.6, 6, 70 + i, 0.6)} fill={dyr.top} />
            <circle cx={25.5} cy={-19} r={1.2} fill={dyr.eye} />
            <ellipse cx={30} cy={-8} rx={2.6} ry={1.8} fill="#8F8278" opacity={0.7} />
          </>
        ),
      };
    }
    case "ku":
      return {
        box: [-50, -64, 100, 68],
        neck: [30, -38],
        lift: 10,
        body: (
          <>
            <PaperShadow>
              <path d={COW_BODY} />
            </PaperShadow>
            {[-35, -27, 13, 21].map((lx) => (
              <Fragment key={lx}>
                <rect x={lx - 2.6} y={-28} width={5.2} height={28} rx={1.2} fill={COW.leg} />
                <rect x={lx - 2.6} y={-3} width={5.2} height={3} fill={COW.hoof} />
              </Fragment>
            ))}
            <ellipse cx={-17} cy={-21} rx={6} ry={4.2} fill={COW.pink} />
            <path d="M-39,-51 Q-45,-45 -43.6,-27 L-41.8,-27 Q-43,-44 -38,-49 Z" fill={COW.leg} />
            <path d={bumpy(-42.8, -25.5, 2.2, 3, 5, 90 + i, 0.5)} fill={COW.hoof} />
            <path d={COW_BODY} fill={COW.hide} />
            <path d="M-34,-54.2 Q-10,-51.4 12,-53.2 Q21,-53.8 24,-50.5 Q10,-49.8 -10,-49 Q-28,-49.6 -34,-54.2 Z" fill={COW.back} />
            <path d={bumpy(-10, -37, 11, 8, 7, 92 + i, 0.3)} fill={COW.white} />
            <path d={bumpy(12, -43, 6, 5, 6, 94 + i, 0.3)} fill={COW.white} />
            <path d="M18,-24.6 Q-4,-19.6 -24,-23.6 L-22,-27 Q-4,-24 16,-28 Z" fill={COW.white} />
          </>
        ),
        head: (
          <>
            <path d="M18,-54 Q27,-55 31,-50 L31,-36 Q26,-31 21,-32 Z" fill={COW.hide} />
            <ellipse cx={22.5} cy={-49.5} rx={6} ry={2.5} fill={COW.ear} transform="rotate(14 22.5 -49.5)" />
            <ellipse cx={22.8} cy={-49.4} rx={3.6} ry={1.2} fill={COW.pink} transform="rotate(14 22.8 -49.4)" />
            <ellipse cx={43.5} cy={-49.5} rx={6} ry={2.5} fill={COW.ear} transform="rotate(-14 43.5 -49.5)" />
            <ellipse cx={43.2} cy={-49.4} rx={3.6} ry={1.2} fill={COW.pink} transform="rotate(-14 43.2 -49.4)" />
            <path d="M27.5,-53.5 Q25.5,-58 22.5,-59 Q25.6,-59.8 28.6,-56 Z" fill={COW.horn} />
            <path d="M38.5,-53.5 Q40.5,-58 43.5,-59 Q40.4,-59.8 37.4,-56 Z" fill={COW.horn} />
            <path d="M26,-54 Q33,-57 40,-54 Q41.5,-45 39.5,-38 Q33,-35 26.5,-38 Q24.5,-45 26,-54 Z" fill={COW.hide} />
            <path d="M31,-55.6 Q33,-56 35,-55.6 L35.4,-41 L30.6,-41 Z" fill={COW.white} />
            <ellipse cx={33} cy={-36.5} rx={7.6} ry={5} fill={COW.pink} />
            <ellipse cx={30.3} cy={-36.2} rx={1} ry={1.4} fill={COW.nose} />
            <ellipse cx={35.7} cy={-36.2} rx={1} ry={1.4} fill={COW.nose} />
            <circle cx={28.8} cy={-46} r={1.2} fill="#2B2725" />
            <circle cx={37.2} cy={-46} r={1.2} fill="#2B2725" />
          </>
        ),
      };
    case "elg":
      return {
        box: [-56, -94, 112, 98],
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
}

const pct = (n: number, of: number) => `${r2((n / of) * 100 * 100) / 100}%`;

/** Each animal drawn once: its box on the strip (in % of it), the body, and the head apart. */
const ART = ANIMALS.map((dyr, i) => {
  const { k, face } = dyr;
  const f = form(dyr, i);
  const [bx, by, bw, bh] = f.box;
  const box = { x: r2(dyr.x + bx * k), y: r2(dyr.y + by * k), w: r2(bw * k), h: r2(bh * k) };
  const view = `${box.x} ${box.y} ${box.w} ${box.h}`;
  const place = `translate(${dyr.x} ${dyr.y}) scale(${r2(k * face)} ${k})`;
  return {
    box,
    neck: `${pct(dyr.x + f.neck[0] * k * face - box.x, box.w)} ${pct(dyr.y + f.neck[1] * k - box.y, box.h)}`,
    lift: `${face > 0 ? -f.lift : f.lift}deg`,
    body: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
        <g transform={place}>{f.body}</g>
      </svg>
    ),
    head: (
      <svg viewBox={view} className="absolute inset-0 h-full w-full overflow-visible">
        <g transform={place}>{f.head}</g>
      </svg>
    ),
  };
});

/** The animals that stand on one sheet, made once. */
export function animalsOn(sheet: Dyr["sheet"]) {
  return ANIMALS.map((dyr, i) => {
    if (dyr.sheet !== sheet) return null;
    const art = ART[i];
    return (
      <div
        key={i}
        className={s.hop}
        data-s={dyr.in.join(" ")}
        style={
          {
            left: pct(art.box.x, W),
            top: pct(art.box.y, H),
            width: pct(art.box.w, W),
            height: pct(art.box.h, H),
            "--delay": `${r2(0.5 + (i % 6) * 0.17)}s`,
            "--enter": `${r2(2 + (i % 6) * 0.12)}s`,
          } as CSSProperties
        }
      >
        {art.body}
        <div
          className={`${s.head} ${s.graze}`}
          style={{ transformOrigin: art.neck, "--t": `${dyr.t}s`, "--gd": `${dyr.delay}s`, "--lift": art.lift } as CSSProperties}
        >
          {art.head}
        </div>
      </div>
    );
  });
}

/* ── Round bales in autumn, wrapped in white plastic as they are all over the valley ── */

const BALES = [
  { x: 690, y: 804, r: 8.4 }, { x: 716, y: 806, r: 8.4 }, { x: 1010, y: 801, r: 8 }, { x: 1042, y: 803, r: 8 }, { x: 1074, y: 800, r: 8 },
  { x: 1376, y: 800, r: 7.8 }, { x: 1404, y: 802, r: 7.8 }, { x: 2050, y: 802, r: 8.2 },
];
export const BALER = BALES.map((b, i) => {
  const box = { x: b.x - b.r * 1.3, y: b.y - b.r * 2.1, w: b.r * 2.6, h: b.r * 2.2 };
  return (
    <div
      key={i}
      className={s.hop}
      data-s="autumn"
      style={
        {
          left: pct(box.x, W),
          top: pct(box.y, H),
          width: pct(box.w, W),
          height: pct(box.h, H),
          "--delay": `${r2(0.9 + i * 0.12)}s`,
          "--enter": "2s",
        } as CSSProperties
      }
    >
      <svg viewBox={`${r2(box.x)} ${r2(box.y)} ${r2(box.w)} ${r2(box.h)}`} className="absolute inset-0 h-full w-full overflow-visible">
        <PaperShadow dy={2}>
          <rect x={r2(b.x - b.r * 1.2)} y={r2(b.y - b.r * 2)} width={r2(b.r * 2.4)} height={r2(b.r * 2)} rx={r2(b.r * 0.5)} />
        </PaperShadow>
        <rect x={r2(b.x - b.r * 1.2)} y={r2(b.y - b.r * 2)} width={r2(b.r * 2.4)} height={r2(b.r * 2)} rx={r2(b.r * 0.5)} fill="#FBFBF8" />
        <rect x={r2(b.x - b.r * 1.2)} y={r2(b.y - b.r * 0.7)} width={r2(b.r * 2.4)} height={r2(b.r * 0.7)} rx={r2(b.r * 0.3)} fill="#E3E6E2" />
      </svg>
    </div>
  );
});

"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { PALETTES } from "@/components/behandlinger/scenes/Papir";
import { Blomst, Bjork, Cloud, Gran, Strip, bumpy, lip, r2, ridge, ridgeY, rng, snowcap, usePopUp, type Pts } from "@/components/home/landskap";
import { Handlinger } from "@/components/kontakt/Handlinger";
import { supportPages } from "@/data/content";
import s from "./veiviseren.module.css";

/**
 * /dekning, «Veiviseren». The support schemes as a signpost where the path
 * forks in the valley: one arm for each, pointing out over the field, and
 * each arm leads to its page. It replaces a page of template cards and icon
 * tiles, the last page outside the paper world.
 *
 * Built like Gardsutsalget on /priser: fjell and fields on strips 2400 wide
 * behind, the post standing on the field in the right-hand column. It stands
 * up once and holds still; only a hovered arm lifts.
 */

const H = 360;
const SKY = "#EEF3EC";

/* ── The land, back to front, on a strip 2400 wide ── */

// ridge() takes a start and then three points per curve: 4, 7, 10 … points
const FAR: Pts = [
  [0, 190], [150, 186], [300, 140], [440, 140], [580, 140], [740, 78], [880, 78], [1020, 78], [1160, 172], [1300, 172],
  [1440, 172], [1580, 128], [1720, 128], [1860, 66], [2000, 66], [2140, 66], [2260, 170], [2340, 172], [2400, 174],
];
const MID: Pts = [
  [0, 248], [300, 236], [520, 230], [740, 238], [960, 246], [1160, 236], [1360, 228], [1560, 224], [1760, 230], [1960, 240],
  [2160, 234], [2300, 236], [2400, 238],
];
const FIELD: Pts = [[0, 272], [400, 266], [800, 262], [1200, 266], [1600, 262], [2000, 258], [2400, 262]];
const NEAR: Pts = [[0, 326], [400, 320], [800, 318], [1200, 320], [1600, 322], [2000, 318], [2400, 322]];

const SPRUCES = (() => {
  const rand = rng(31);
  const trees: { x: number; y: number; h: number }[] = [];
  for (const [a, b] of [[20, 820], [1420, 2390]] as const) {
    for (let x = a; x < b; x += 12 + rand() * 16) {
      trees.push({ x: r2(x), y: r2(ridgeY(MID, x) + 10 + rand() * 5), h: r2(22 + rand() * 24) });
    }
  }
  return trees;
})();

const DAISIES = (() => {
  const rand = rng(67);
  return Array.from({ length: 28 }, () => {
    const x = 160 + rand() * 2080;
    return { x: r2(x), y: r2(ridgeY(NEAR, x) + 10 + rand() * 18), r: r2(3.4 + rand() * 2) };
  });
})();

const FAR_ART = (
  <>
    <path d={ridge(FAR, H)} fill="#D7E2E5" />
    <path d={snowcap(FAR, 740, 1020, 30, 7)} fill="#F7FAFA" />
    <path d={snowcap(FAR, 1860, 2140, 28, 9)} fill="#F7FAFA" />
  </>
);
const MID_ART = (
  <>
    {SPRUCES.map((t, i) => (
      <Gran key={i} x={t.x} y={t.y} h={t.h} w={r2(t.h * 0.3)} tiers={4} fill="#6E9076" dark="#5D7F66" />
    ))}
    <path d={ridge(MID, H)} fill="#C6D7C3" />
  </>
);
const FIELD_ART = (
  <>
    <path d={ridge(FIELD, H)} fill="#CFE0A8" />
    <Bjork x={300} y={276} h={150} seed={41} lean={0.2} />
    <Bjork x={372} y={280} h={112} seed={43} lean={-0.2} />
    <Bjork x={2060} y={272} h={140} seed={47} lean={-0.3} />
  </>
);
const NEAR_ART = (
  <>
    <path d={ridge(NEAR, H)} fill="#B4CE8B" />
    {DAISIES.map((d, i) => (
      <Blomst key={i} x={d.x} y={d.y} r={d.r} seed={i + 5} />
    ))}
  </>
);
const LIP_ART = <path d={lip(346, 12, H)} fill="#FCF9F2" />;

/* ── The signpost, in a box 560 × 520 ── */

const WOOD = "#8A7258";
const WOOD_DARK = "#74604B";

// Stones heaped round the foot of the post, as they are under a cairn
const STONES = [
  { cx: 252, cy: 470, rx: 26, ry: 13, f: PALETTES.bjork.mid },
  { cx: 306, cy: 472, rx: 30, ry: 14, f: PALETTES.frost.mid },
  { cx: 280, cy: 478, rx: 34, ry: 14, f: PALETTES.bjork.deep },
  { cx: 232, cy: 482, rx: 18, ry: 9, f: PALETTES.frost.deep },
  { cx: 330, cy: 484, rx: 20, ry: 9, f: PALETTES.bjork.mid },
].map((st, i) => ({ ...st, d: bumpy(st.cx, st.cy, st.rx, st.ry, 7, 11 + i * 3, 0.08) }));

// The path comes up from the front and forks at the post, one way left and one
// right, each narrowing as it runs off up the field.
const PATH =
  "M196,520 C212,504 234,492 254,486 C214,474 168,454 132,436 L126,430 C178,446 236,460 282,466 C326,458 382,444 428,426 L434,432 C394,452 350,472 310,486 C332,494 352,506 366,520 Z";

const POST_ART = (
  <>
    <path d={PATH} fill="#E4E2C6" />
    <PaperShadow>
      <rect x={272} y={44} width={16} height={430} />
      <path d="M262,46 L280,30 L298,46 Z" />
    </PaperShadow>
    <rect x={272} y={44} width={16} height={430} fill={WOOD} />
    <rect x={284} y={44} width={4} height={430} fill={WOOD_DARK} />
    <path d="M262,46 L280,30 L298,46 Z" fill={WOOD_DARK} />
    <PaperShadow dy={3}>
      {STONES.map((st, i) => (
        <path key={i} d={st.d} />
      ))}
    </PaperShadow>
    {STONES.map((st, i) => (
      <path key={i} d={st.d} fill={st.f} />
    ))}
  </>
);

// Each arm a different paper from the valley's palettes, pale enough for ink.
const PAPERS = [PALETTES.fjord.far, PALETTES.lav.far, PALETTES.molte.far, PALETTES.lyng.far, PALETTES.bjork.far, PALETTES.mose.far];
// Where each arm sits on the post (top, as a share of the box), and its tilt
const ARMS = [
  { top: 8, tilt: -1.6 },
  { top: 20.5, tilt: 1.2 },
  { top: 33, tilt: 0.8 },
  { top: 45.5, tilt: -1.1 },
  { top: 58, tilt: -0.6 },
  { top: 70.5, tilt: 1.4 },
];

function Skilt({ up }: { up: boolean }) {
  return (
    <div className={s.post} data-up={up}>
      <svg aria-hidden="true" viewBox="0 0 560 520" className="absolute inset-0 h-full w-full overflow-visible">
        {POST_ART}
      </svg>
      {supportPages.map((p, i) => {
        const side = i % 2 === 0 ? s.right : s.left;
        const style = {
          top: `${ARMS[i].top}%`,
          ["--tilt" as string]: `${ARMS[i].tilt}deg`,
          ["--delay" as string]: `${r2(0.75 + i * 0.12)}s`,
          ["--paper" as string]: PAPERS[i % PAPERS.length],
        } as CSSProperties;
        return (
          <Link key={p.slug} href={`/dekning/${p.slug}`} className={`${s.arm} ${side}`} style={style}>
            <span aria-hidden="true" className={s.shade} />
            <span className={s.plank}>
              <span className={s.name}>{p.shortTitle}</span>
              <span className={s.sub}>{p.heroSubtitle}</span>
            </span>
            <span aria-hidden="true" className={s.nail} />
          </Link>
        );
      })}
    </div>
  );
}

/* ── The section ── */

export function Veiviseren() {
  const { ref, up } = usePopUp();

  return (
    <section ref={ref} className="relative isolate overflow-hidden" style={{ background: SKY }}>
      {/* The land behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[360px]">
        <Strip n={0} up={up} top={40} h={H}>{FAR_ART}</Strip>
        <Strip n={1} up={up} top={170} h={H}>{MID_ART}</Strip>
        <Strip n={2} up={up} top={110} h={H}>{FIELD_ART}</Strip>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px]">
        <Cloud x={1040} y={150} w={100} drift={0} time={1} on={false} />
        <Cloud x={1880} y={96} w={116} drift={0} time={1} on={false} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[360px]">
        <Strip n={4} up={up} top={300} h={H}>{NEAR_ART}</Strip>
        <Strip n={5} up={up} top={338} h={H}>{LIP_ART}</Strip>
      </div>

      <div className="mx-auto grid w-full max-w-[var(--container-max,1280px)] grid-cols-1 gap-y-10 px-[var(--container-px,24px)] pb-[44px] pt-[120px] md:pt-[136px] lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-x-14 lg:pb-[54px] xl:gap-x-20">
        <div className="relative z-[60] max-w-[460px] lg:pb-[170px]">
          <h1 className="display-page text-balance text-[var(--color-ink)]">Støtte og rettigheter</h1>
          <p className="mt-6 max-w-[40ch] text-pretty text-[19px] leading-[1.55] text-[var(--color-ink)]">
            Mange har rett på hel eller delvis dekning av tannlegekostnader uten å vite det. Her er ordningene som finnes i Norge.
          </p>
          <p className="mt-4 max-w-[40ch] border-t border-[rgba(14,42,48,0.14)] pt-4 text-pretty text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
            Vi har direkte oppgjør med HELFO. Lurer du på hva du har rett på, spør oss.
          </p>
          <Handlinger className="mt-8" />
        </div>

        {/* No z-index: the post stands among the strips, the near grass in front of its foot */}
        <div className="relative z-10 mx-auto w-full max-w-[600px] self-end lg:mr-0">
          <Skilt up={up} />
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { Blomst, bumpy, lip, ridge, type Pts } from "@/components/home/landskap";

/**
 * The 404 page (app/not-found.tsx): a sheep that has wandered out through a
 * gap in the skigard and stands on the path looking back at it, in the same
 * paper as the pasture on the front page (and, as there, no eyes on any
 * animal). It holds still. A client component because the paper helpers it
 * draws with live in client modules.
 */

const SKY = "#EEF3EC";
const W = 1440;
const H = 360;

// ridge() takes a start and then three points per curve: 4, 7, 10 … points
const HILL: Pts = [[0, 170], [480, 128], [960, 186], [1440, 150]];
const FIELD: Pts = [[0, 232], [480, 214], [960, 238], [1440, 222]];

// The sheep, drawn as the pasture's sheep are, standing at 0,0 facing right
const BODY = bumpy(0, -25, 23, 13.5, 11, 17, 0.45);
const SAU = (
  <>
    <PaperShadow>
      <path d={BODY} />
    </PaperShadow>
    {[-15, -9, 8, 14].map((x) => (
      <rect key={x} x={x - 1.6} y={-16} width={3.2} height={16} rx={1} fill="#4A4540" />
    ))}
    <path d={BODY} fill="#F4F1E8" />
    <path d={bumpy(-2, -29, 17, 8, 9, 37, 0.5)} fill="#FFFFFF" />
    <path d={bumpy(-23, -28, 3.2, 3.2, 5, 57, 0.6)} fill="#F4F1E8" />
    <ellipse cx={16} cy={-29} rx={5.4} ry={2.4} fill="#DDD4C5" transform="rotate(-24 16 -29)" />
    <ellipse cx={16.4} cy={-29.2} rx={3.2} ry={1.1} fill="#E7B8B0" transform="rotate(-24 16.4 -29.2)" />
    <path d="M15,-29 Q28,-27 32,-15 Q34,-7 28,-5 Q22,-5 18,-13 Z" fill="#DDD4C5" />
    <path d={bumpy(20, -30, 5, 3.6, 6, 77, 0.6)} fill="#FFFFFF" />
    <ellipse cx={30} cy={-8} rx={2.6} ry={1.8} fill="#8F8278" opacity={0.7} />
  </>
);

// A run of skigard: posts with the rails laid slantwise between them
function Skigard({ x0, x1, y }: { x0: number; x1: number; y: number }) {
  const posts: number[] = [];
  for (let x = x0; x <= x1; x += 36) posts.push(x);
  return (
    <>
      <PaperShadow dy={4}>
        {posts.map((x) => (
          <rect key={x} x={x - 2.5} y={y - 50} width={5} height={52} />
        ))}
      </PaperShadow>
      {posts.slice(0, -1).map((x) =>
        [0, 1, 2, 3, 4].map((k) => (
          <path
            key={`${x}-${k}`}
            d={`M${x + 2},${y - 6 - k * 9} L${x + 36},${y - 12 - k * 9} L${x + 36},${y - 8 - k * 9} L${x + 2},${y - 2 - k * 9} Z`}
            fill={k % 2 ? "#A58E73" : "#B49C80"}
          />
        ))
      )}
      {posts.map((x) => (
        <rect key={x} x={x - 2.5} y={y - 50} width={5} height={52} fill="#7A6450" />
      ))}
    </>
  );
}

const FLOWERS = [
  [700, 300, 5], [760, 330, 4.4], [1180, 296, 5.2], [1250, 326, 4.6], [1330, 300, 4.8], [610, 318, 4.2],
] as const;

const SCENE = (
  <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMax slice" className="absolute inset-0 h-full w-full">
    <path d={ridge(HILL, H)} fill="#C6D7C3" />
    <path d={ridge(FIELD, H)} fill="#CADFA0" />
    {/* The path out through the gap and down towards you */}
    <path d="M1002,238 C1000,250 994,262 990,276 C980,304 960,334 936,360 L1056,360 C1040,334 1028,304 1022,276 C1018,262 1016,250 1014,238 Z" fill="#E4E2C6" />
    <Skigard x0={560} x1={956} y={262} />
    <Skigard x0={1060} x1={1420} y={258} />
    {FLOWERS.map(([x, y, r], i) => (
      <Blomst key={i} x={x} y={y} r={r} seed={i + 3} />
    ))}
    {/* Outside the fence, on the path, turned back towards the gap it came through */}
    <g transform="translate(1110 330) scale(-2.6 2.6)">{SAU}</g>
    <path d={lip(346, 12, H)} fill="#FCF9F2" />
  </svg>
);

export function Bortkommen() {
  return (
    <main className="relative isolate overflow-hidden" style={{ background: SKY }}>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[300px] md:h-[360px]">
        {SCENE}
      </div>
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-[330px] pt-32 md:pb-[380px] md:pt-40">
        <h1 className="display-page max-w-[16ch] text-balance text-[var(--color-ink)]">Denne siden har gått seg bort.</h1>
        <p className="mt-6 max-w-[36ch] text-[19px] leading-[1.55] text-[var(--color-ink)]">
          Den finnes ikke, eller den har flyttet. Herfra finner du veien tilbake.
        </p>
        <Link href="/" className="knapp knapp-blekk mt-8">
          Til forsiden
        </Link>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[16px] font-medium">
          {[
            ["Behandlinger", "/behandlinger"],
            ["Symptomer", "/symptomer"],
            ["Priser", "/priser"],
            ["Kontakt", "/kontakt"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="text-[var(--color-ink)] underline decoration-[rgba(14,42,48,0.25)] underline-offset-[5px] hover:decoration-[var(--color-ink)]">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

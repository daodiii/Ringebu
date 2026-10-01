"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { starPath } from "@/components/behandlinger/scenes/Papir";
import { r2 } from "@/components/home/landskap";
import {
  BEITE_ART, CLOUD, DAL_ART, FJELL_ART, FRAMME_ART, FUGL_KROPP, FUGL_VINGER, GLINTS, LIER_ART, NES_ART, SAU_ART, VH, VW, VIDDE_ART,
} from "./buen/landskap";
import { Skilt } from "./buen/Skilt";
import { useHode } from "./buen/useHode";
import s from "./buen/buen.module.css";

/**
 * Buen. The hero is a paper wall with the name on it, and beside the words
 * an arch is cut into the wall, the same arch as the arcade on
 * /behandlinger. Through it you look down Gudbrandsdalen: fjell with snow,
 * the forested valley sides, Lågen glinting on the valley floor, sheep on a
 * pasture, birches in the grass at the front.
 *
 * The wall has a thickness: inside the opening you see its reveal, and the
 * view is framed by the back edge of the wall, which shifts against the front
 * edge as your head moves. The pointer stands in for your head, and every
 * sheet of the valley moves by its distance, the far fjell most and the grass
 * at the front least, as through a real window. The clinic's sign hangs from
 * the crown of the arch, in front of it all, and swings when brushed.
 *
 * The entrance is CSS, so it starts at the first paint: the arch is cut, the
 * cut-out paper falls away into the valley, and the sheets rise into place
 * back to front. The light in the valley goes slowly from morning to evening
 * and back.
 */

/** How far the head moves the view at most, in % of the opening's width (x) and height (y). */
const HEAD_X = 9;
const HEAD_Y = 4.5;
/** How far the back edge of the wall moves, in the same units: it is nearer than any of the view. */
const BACK_X = 2.6;
const BACK_Y = 1.2;
// The back opening is 0.9 of the front's width; the stage is 1.5 of it tall.
const ownX = (k: number) => r2((k * HEAD_X - BACK_X) / 0.9);
const ownY = (k: number) => r2((k * HEAD_Y - BACK_Y) / 1.5);

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* ── One sheet of the valley ── */

function Ark({
  hx, hy, k, n, children, over, className,
}: {
  hx: MotionValue<number>;
  hy: MotionValue<number>;
  /** How far away: 1 is the sky, which moves with your head; less is nearer. */
  k: number;
  /** Its turn to rise, back to front; none for layers that do not rise. */
  n?: number;
  children?: React.ReactNode;
  over?: React.ReactNode;
  className?: string;
}) {
  const [dx, dy] = [ownX(k), ownY(k)];
  const x = useTransform(hx, (v) => `${r2(v * dx)}%`);
  const y = useTransform(hy, (v) => `${r2(v * dy)}%`);
  return (
    <motion.div className={s.ark} style={{ x, y, ...vars({ "--dx": `${dx}%`, "--dy": `${dy}%` }) }}>
      <div
        className={`${n === undefined ? "" : s.reis} ${className ?? ""} absolute inset-0`}
        style={n === undefined ? undefined : vars({ "--delay": `${r2(1.4 + n * 0.12)}s` })}
      >
        {children && (
          <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full overflow-visible">
            {children}
          </svg>
        )}
        {over}
      </div>
    </motion.div>
  );
}

/* ── Small things on layers of their own, made once ── */

const pct = (u: number, of: number) => `${r2((u / of) * 100)}%`;

const SOL = (
  <div className={s.sol} style={{ left: pct(80 - 55, VW), top: pct(240 - 55, VH), width: pct(110, VW) }}>
    <svg viewBox="-55 -55 110 110" className="block h-auto w-full overflow-visible">
      <circle r={50} fill="#FAEFD2" />
      <circle r={29} fill="#FCE6AE" />
    </svg>
    <svg viewBox="-55 -55 110 110" className={`${s.kveldsol} absolute inset-0 block h-auto w-full overflow-visible`}>
      <circle r={50} fill="#F9DCC0" />
      <circle r={29} fill="#F8C98F" />
    </svg>
  </div>
);

const HIMMEL = (
  <>
    <span className={s.dag} />
    <span className={s.kveld} />
    {SOL}
  </>
);

const SKYER = (
  <>
    {[
      { x: -40, y: 318, w: 128, t: 46, d: "60%" },
      { x: 430, y: 222, w: 96, t: 58, d: "-70%" },
      { x: 236, y: 432, w: 70, t: 52, d: "55%" },
    ].map((c, i) => (
      <div
        key={i}
        className={s.sky}
        style={{ left: pct(c.x, VW), top: pct(c.y, VH), width: pct(c.w, VW), ...vars({ "--t": `${c.t}s`, "--d": c.d }) }}
      >
        <svg viewBox="30 124 100 54" className="block h-auto w-full overflow-visible">
          <path d={CLOUD} transform="translate(0 4)" fill="#0E2A30" opacity={0.08} />
          <path d={CLOUD} fill="#FFFFFF" />
        </svg>
      </div>
    ))}
  </>
);

/** Three birds crossing the sky in a loose line, now and then. */
const FUGLER = (
  <div className={s.flokk} style={{ top: pct(236, VH) }}>
    {[
      { x: 0, y: 0, s: 1 },
      { x: 4.2, y: -2.4, s: 0.82 },
      { x: 8.6, y: 1.4, s: 0.9 },
    ].map((f, i) => (
      <div key={i} className={s.fugl} style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${r2(f.s * 4.4)}%`, ...vars({ "--fd": `${i * 0.23}s` }) }}>
        {/* The wings are a layer of their own, so a beat moves them without drawing the bird again */}
        <div className={s.vinge}>
          <svg viewBox="-13 -8 26 12" className="block h-auto w-full overflow-visible">
            <path d={FUGL_VINGER} fill="#3B4A50" />
          </svg>
        </div>
        <svg viewBox="-13 -8 26 12" className="relative block h-auto w-full overflow-visible">
          <path d={FUGL_KROPP} fill="#3B4A50" />
        </svg>
      </div>
    ))}
  </div>
);

/** The sun on the river, two sets of glints that take turns. */
const GLIMT = [0, 1].map((set) => (
  <div key={set} className={s.glimt} style={vars({ "--gd": `${set * 2.6}s` })}>
    {/* Only the stretch of the valley the river runs through: a small layer, not the whole stage */}
    <svg viewBox="200 580 240 420" className="absolute inset-0 h-full w-full overflow-visible">
      {GLINTS.filter((g) => g.set === set).map((g, i) => (
        <path key={i} d={starPath(g.x, g.y, g.s)} fill="#FFFFFF" />
      ))}
    </svg>
  </div>
));

const SAUENE = SAU_ART.map((a, i) => (
  <div key={i} className={s.hopp} style={{ ...a.pos, ...vars({ "--delay": `${r2(2.55 + i * 0.16)}s` }) }}>
    {a.body}
    <div
      className={s.hode}
      style={{ transformOrigin: a.neck, ...vars({ "--t": `${a.sau.t}s`, "--gdelay": `${a.sau.delay}s`, "--lift": a.lift }) }}
    >
      {a.head}
    </div>
  </div>
));

/* ── The arch ── */

function Bue({ hx, hy, reduced }: { hx: MotionValue<number>; hy: MotionValue<number>; reduced: boolean }) {
  const backX = useTransform(hx, (v) => `${r2((v * BACK_X) / 0.9)}%`);
  const backY = useTransform(hy, (v) => `${r2((v * BACK_Y) / 1.5)}%`);
  // The sign hangs in front of the wall, so it moves the other way
  const signX = useTransform(hx, (v) => `${r2(v * -1.4)}%`);

  return (
    <div className={s.bue}>
      {/* The raised band round the opening, and the sill under it */}
      <span className={s.ramme} />
      <span className={s.karm} />

      <div className={s.apning}>
        {/* The back edge of the wall: the view is seen through it */}
        <motion.div
          className={s.bak}
          style={{ x: backX, y: backY, ...vars({ "--dx": `${r2(BACK_X / 0.9)}%`, "--dy": `${r2(BACK_Y / 1.5)}%` }) }}
        >
          <div className={s.scene}>
            <Ark hx={hx} hy={hy} k={1} over={HIMMEL} />
            <Ark hx={hx} hy={hy} k={0.98} n={0}>{VIDDE_ART}</Ark>
            <Ark hx={hx} hy={hy} k={0.94} n={1}>{FJELL_ART}</Ark>
            <Ark hx={hx} hy={hy} k={0.92} className={s.ut} over={SKYER} />
            <Ark hx={hx} hy={hy} k={0.86} n={2}>{NES_ART}</Ark>
            <Ark hx={hx} hy={hy} k={0.84} over={FUGLER} />
            <Ark hx={hx} hy={hy} k={0.76} n={3}>{LIER_ART}</Ark>
            <Ark hx={hx} hy={hy} k={0.64} n={4} over={GLIMT}>{DAL_ART}</Ark>
            <Ark hx={hx} hy={hy} k={0.53} n={5} over={SAUENE}>{BEITE_ART}</Ark>
            <Ark hx={hx} hy={hy} k={0.42} n={6}>{FRAMME_ART}</Ark>
            <span className={s.varme} />
          </div>
          {/* The shade the wall throws at the top of the opening */}
          <span className={s.skygge} />
        </motion.div>

        {/* The piece cut out of the wall, falling away into the valley */}
        <span className={s.lokk} />
        <span className={s.kant} />
      </div>

      {/* The cut: up both sides, meeting at the crown */}
      <span className={`${s.snitt} ${s.snittV}`} />
      <span className={`${s.snitt} ${s.snittH}`} />
      <svg viewBox="0 0 100 50" className={s.snittBue} aria-hidden="true">
        <path d="M0,50 A50,50 0 0 1 50,0" pathLength={1} />
        <path d="M100,50 A50,50 0 0 0 50,0" pathLength={1} />
      </svg>

      <Skilt x={signX} reduced={reduced} />
    </div>
  );
}

/* ── The hero ── */

export function Buen() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion() ?? false;
  const { hx, hy } = useHode(ref, !reduced);

  // Tell the floating nav when it is over the hero, and stop the loops when it is not.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          window.dispatchEvent(new CustomEvent(entry.isIntersecting ? "ringebu:hero-enter" : "ringebu:hero-exit"));
        }
      },
      { threshold: 0.15 },
    );
    const looper = new IntersectionObserver(([entry]) => {
      el.dataset.on = entry.isIntersecting ? "true" : "false";
    });
    observer.observe(el);
    looper.observe(el);
    return () => {
      observer.disconnect();
      looper.disconnect();
    };
  }, []);

  return (
    <section ref={ref} className={`${s.hero} relative isolate overflow-hidden`} aria-label="Velkommen">
      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[var(--container-max,1280px)] grid-rows-[auto_1fr] px-[var(--container-px,24px)] md:grid-cols-[1fr_1fr] md:grid-rows-1 md:items-center md:pb-[64px] md:pt-[72px]">
        {/* ── The words ── */}
        <div className="relative z-10 pt-[clamp(100px,14svh,132px)] md:pt-0">
          <h1 className="text-[var(--color-ink)]" style={{ fontSize: "clamp(38px, 6vw, 92px)", lineHeight: 0.96, letterSpacing: "-0.05em" }}>
            <span className="sr-only">Ringebu Tannlegesenter</span>
            {(
              [
                { text: "Ringebu", weight: 700 },
                { text: "Tannlegesenter", weight: 400 },
              ] as const
            ).map((line, li) => (
              // The mask reaches below the letters, so the g of Ringebu keeps its tail
              <span key={li} aria-hidden="true" className={s.maske}>
                <span className={s.linje} style={{ fontWeight: line.weight, ...vars({ "--d": `${0.2 + li * 0.11}s` }) }}>
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className={`${s.loft} mt-6 max-w-[34ch] text-[26px] font-light leading-[1.25] tracking-[-0.02em] text-[var(--color-text-secondary)] md:text-[30px]`}
            style={vars({ "--d": "0.5s", "--from-y": "10px" })}
          >
            Hos oss er alle velkomne
          </p>

          <div className={`${s.loft} mt-9 flex flex-wrap items-center gap-2.5`} style={vars({ "--d": "0.72s", "--from-y": "12px" })}>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(14,42,48,0.5)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(14,42,48,0.55)]"
            >
              Bestill time
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a
              href="tel:61280412"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(14,42,48,0.18)] bg-white/70 px-5 py-3.5 text-[13px] font-medium text-[var(--color-ink)] backdrop-blur-sm transition-colors duration-300 hover:border-[rgba(14,42,48,0.38)] hover:bg-white"
            >
              61 28 04 12
            </a>
          </div>
        </div>

        {/* ── The arch, beside the words; under them on a phone ── */}
        <div aria-hidden="true" className={s.celle}>
          <Bue hx={hx} hy={hy} reduced={reduced} />
        </div>
      </div>

      <div
        className={`${s.fade} absolute inset-x-0 bottom-0 z-30 hidden border-t border-[rgba(14,42,48,0.08)] bg-white/55 md:block`}
        style={vars({ "--d": "1.5s" })}
      >
        {/* Five days of hours need ~900px beside the address: one line from lg, two below */}
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] flex-col items-start gap-1.5 px-[var(--container-px,24px)] py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <span>Jernbanegata 4, 2630 Ringebu</span>
          <span>Man 08.00–15.30 · Tir 08.30–18.00 · Ons 08.00–15.00 · Tor 09.00–18.00 · Fre 08.00–15.00</span>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { NEAR_HILLS, PALETTES, withPalette, type PaletteName } from "@/components/behandlinger/scenes/Papir";
import { PapirStol } from "@/components/behandlinger/scenes/PapirMer";
import { useStopSettle, useViewport } from "@/components/behandlinger/hooks";
import type { Scene } from "@/components/behandlinger/scenes/types";
import { EASE_OUT, SYMPTOMS, URGENCY_COLOR, type Symptom, type SymptomSlug } from "./data";
import { TOOTH, TOOTH_SHADE, paperScene } from "./scenes/Scener";

/**
 * Bildeboka. The symptoms are a pop-up book lying open on the page.
 * Scrolling turns the leaves: each one lifts from its outer edge, bends as
 * it goes over and lands on the left, and the paper theatre printed on its
 * back stands up out of the page. Coloured index tabs stick out of the page
 * edges, one per symptom, and travel over with their leaf.
 *
 * It sits in the middle of the front page, so its headings start at h2 and
 * the hero keeps the page's only h1.
 */

const NAV = 72;
/** Leaves that turn: the cover and one per symptom. Leaf 9 is the last page. */
const TURNS = SYMPTOMS.length + 1;
const PAGE = "#FFFCF6";
const BOARD = "#D5E2DF";
const FOLD = 0.62;
/** Scroll per turn, in screen heights: nine turns come to 4.5 screens of page. */
const STEP = 0.5;
const FINAL: PaletteName = "lav";
const FinalScene = withPalette(PapirStol, FINAL, true);
// Every symptom's scene in its own paper, made once.
const SCENES = Object.fromEntries(SYMPTOMS.map((s) => [s.slug, paperScene(s.slug, s.palette, true)])) as Record<SymptomSlug, Scene>;

type Face =
  | { kind: "cover" }
  | { kind: "text"; s: Symptom }
  | { kind: "cta" }
  | { kind: "scene"; s: Symptom | null };

const frontOf = (leaf: number): Face =>
  leaf === 0 ? { kind: "cover" } : leaf <= SYMPTOMS.length ? { kind: "text", s: SYMPTOMS[leaf - 1] } : { kind: "cta" };
const backOf = (leaf: number): Face => ({ kind: "scene", s: SYMPTOMS[leaf] ?? null });

/** Splits the turn position into the leaf being turned and how far over it is. */
function split(v: number) {
  let k = Math.floor(v);
  let t = v - k;
  if (t > 0.985) {
    k += 1;
    t = 0;
  }
  if (t < 0.015) t = 0;
  if (k >= TURNS) return { k: TURNS, t: 0 };
  return { k: Math.max(0, k), t };
}

function geometry(vw: number, vh: number) {
  const tabW = 172;
  let H = Math.min(740, vh - NAV - 92);
  let W = Math.round(H * 0.74);
  const maxW = Math.floor((vw - 2 * tabW - 72) / 2);
  if (W > maxW) {
    W = maxW;
    H = Math.round(W / 0.74);
  }
  const top = NAV + Math.round((vh - NAV - H) / 2) + 4;
  return { W, H, tabW, top, spine: Math.round(vw / 2) };
}

export function Bildeboka() {
  const vp = useViewport();
  if (vp.ready && vp.w < 900) return <BildebokaListe />;
  return <Bok vw={vp.w} vh={vp.h} />;
}

function Bok({ vw, vh }: { vw: number; vh: number }) {
  const g = useMemo(() => geometry(vw, vh), [vw, vh]);
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const step = Math.round(vh * STEP);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, (v) => v * TURNS);
  const sprung = useSpring(raw, { stiffness: 95, damping: 22, mass: 0.6 });
  const pos = reduced ? raw : sprung;

  const [at, setAt] = useState(() => split(0));
  useMotionValueEvent(pos, "change", (v) => {
    const s = split(v);
    const lifting = s.t >= 0.06;
    setAt((a) => (a.k === s.k && a.t >= 0.06 === lifting && (a.t === 0) === (s.t === 0) ? a : s));
  });
  const k = at.k;
  const moving = at.t > 0;
  const lifting = at.t >= 0.06;

  const t = useTransform(pos, (v) => split(v).t);
  // The leaf bends as it turns: the outer part leads, as it does when a
  // hand lifts a page by its edge.
  const inner = useTransform(t, (v) => (reduced ? -180 * v : -180 * v + 11 * Math.sin(Math.PI * v)));
  const outer = useTransform(t, (v) => (reduced ? 0 : -22 * Math.sin(Math.PI * v)));
  // A dog-ear on the page at rest: its size, in pixels.
  const corner = useMotionValue(0);

  // Pointer: the book tilts a little towards the hand, the paper layers lean.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(useTransform(py, (v) => 9 - v * 2.5), { stiffness: 60, damping: 18 });
  const tiltY = useSpring(useTransform(px, (v) => v * 3.5), { stiffness: 60, damping: 18 });
  const lean = useSpring(useTransform(px, (v) => v * 0.55), { stiffness: 50, damping: 16 });

  const [hoverRight, setHoverRight] = useState(false);

  // An idle page folds its corner now and then, asking to be turned; under
  // the hand it folds further.
  useEffect(() => {
    if (reduced || moving || k >= TURNS) {
      animate(corner, 0, { duration: 0.25 });
      return;
    }
    if (hoverRight) {
      const c = animate(corner, 70, { type: "spring", stiffness: 220, damping: 20 });
      return () => c.stop();
    }
    let alive = true;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await animate(corner, 0, { duration: 0.3 });
      await wait(2200);
      while (alive) {
        await animate(corner, 46, { duration: 0.55, ease: [0.3, 0, 0.2, 1] });
        if (!alive) break;
        await wait(500);
        if (!alive) break;
        await animate(corner, 0, { type: "spring", stiffness: 260, damping: 14 });
        await wait(4200);
      }
    })();
    return () => {
      alive = false;
      corner.stop();
    };
  }, [reduced, moving, hoverRight, k, corner]);

  // Rest on a spread, never between two.
  const [onBook, setOnBook] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const on = v < 0.999;
    setOnBook((o) => (o === on ? o : on));
  });
  const stops = useMemo(() => Array.from({ length: TURNS + 1 }, (_, i) => i * step), [step]);
  useStopSettle(sectionRef, stops, !reduced);

  const goTo = useCallback(
    (spread: number) => {
      const top = (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      window.scrollTo({ top: top + Math.max(0, Math.min(TURNS, spread)) * step, behavior: reduced ? "auto" : "smooth" });
    },
    [step, reduced]
  );

  useEffect(() => {
    if (!onBook) return;
    const onKey = (e: KeyboardEvent) => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r || r.top > 10 || r.bottom < vh - 10) return;
      if (e.key === "ArrowRight") goTo(k + 1);
      else if (e.key === "ArrowLeft") goTo(k - 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBook, goTo, k, vh]);

  const introOpacity = useTransform(pos, [0, 0.35], [1, 0]);
  const introX = useTransform(pos, [0, 0.5], [0, -40]);
  const boardLeft = useTransform(pos, [0.9, 0.99], [0, 1]);

  // Shadow thrown by the turning leaf on the page it uncovers.
  const edge = useTransform([inner, outer], ([a, b]: number[]) => {
    const r = Math.PI / 180;
    return g.W * FOLD * Math.cos(a * r) + g.W * (1 - FOLD) * Math.cos((a + b) * r);
  });
  const lift = useTransform(inner, (a) => Math.abs(Math.sin((a * Math.PI) / 180)));
  const rightShadowX = useTransform(edge, (e) => Math.max(0, e));
  const rightShadowO = useTransform([edge, lift], ([e, l]: number[]) => (e > 0 ? l * 0.9 : 0));
  const leftShadowX = useTransform(edge, (e) => g.W + Math.min(0, e) - 140);
  const leftShadowO = useTransform([edge, lift], ([e, l]: number[]) => (e < 0 ? l * 0.9 : 0));

  const leftFace = k >= 1 ? backOf(k - 1) : null;
  const rightFace = k + 1 <= TURNS ? frontOf(k + 1) : null;
  const leafFront = k < TURNS ? frontOf(k) : null;
  const leafBack = k < TURNS ? backOf(k) : null;
  const endFace = k >= TURNS ? frontOf(TURNS) : null;
  const tabStep = (g.H - 56) / SYMPTOMS.length;
  const tabH = Math.min(44, tabStep - 8);

  return (
    <section
      ref={sectionRef}
      id="symptomer"
      aria-labelledby="symptomer-tittel"
      className="relative bg-[var(--color-paper)]"
      style={{ height: vh + TURNS * step }}
      onPointerMove={(e) => {
        px.set((e.clientX / vw) * 2 - 1);
        py.set((e.clientY / vh) * 2 - 1);
      }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Intro, beside the closed book */}
        <motion.div
          className="absolute flex flex-col justify-center"
          style={{ left: Math.max(24, g.spine - g.W + 8), width: g.W - 80, top: g.top, height: g.H, opacity: introOpacity, x: introX }}
        >
          <h2
            id="symptomer-tittel"
            className="font-sans font-extralight text-[var(--color-ink)]"
            style={{ fontSize: "clamp(44px, 4.6vw, 72px)", letterSpacing: "-0.045em", lineHeight: 0.95 }}
          >
            Kjenner du noe av dette?
          </h2>
          <p className="mt-6 max-w-[30ch] text-[19px] leading-[1.5] text-[var(--color-text-secondary)]">
            Åtte vanlige plager. Hva de betyr, og hva du bør gjøre.
          </p>
        </motion.div>

        {/* A soft shadow on the table */}
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            left: g.spine - g.W - 20,
            top: g.top + g.H - 30,
            width: g.W * 2 + 40,
            height: 70,
            background: "radial-gradient(50% 50% at 50% 50%, rgba(14,42,48,0.22), transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        <div className="absolute inset-0" style={{ perspective: 3200, perspectiveOrigin: `50% ${g.top + g.H * 0.2}px` }}>
          <motion.div
            className="absolute"
            style={{
              left: g.spine - g.W,
              top: g.top,
              width: g.W * 2,
              height: g.H,
              transformStyle: "preserve-3d",
              rotateX: reduced ? 6 : tiltX,
              rotateY: reduced ? 0 : tiltY,
            }}
          >
            {/* The case: board under the page block */}
            <div aria-hidden="true" className="absolute rounded-[5px]" style={{ left: g.W, top: -9, width: g.W + 10, height: g.H + 18, background: BOARD, boxShadow: "0 2px 0 rgba(14,42,48,0.08)" }} />
            <motion.div aria-hidden="true" className="absolute rounded-[5px]" style={{ left: -10, top: -9, width: g.W + 10, height: g.H + 18, background: BOARD, opacity: boardLeft }} />

            {/* Turned leaves' tabs, on the left edge */}
            {SYMPTOMS.map((s, m) => {
              const leaf = m + 1;
              if (leaf >= k) return null;
              return (
                <Tab key={s.slug} s={s} side="left" top={28 + m * tabStep} h={tabH} w={g.tabW} onClick={() => goTo(leaf)} />
              );
            })}
            {/* Leaves still to come: their tabs on the right edge */}
            {SYMPTOMS.map((s, m) => {
              const leaf = m + 1;
              if (leaf <= k) return null;
              return (
                <Tab key={s.slug} s={s} side="right" top={28 + m * tabStep} h={tabH} w={g.tabW} x={g.W * 2} onClick={() => goTo(leaf)} />
              );
            })}

            {/* Left page */}
            {leftFace && (
              <div
                className="absolute left-0 top-0 cursor-pointer overflow-hidden"
                style={{ width: g.W, height: g.H, boxShadow: stack(k, -1) }}
                onClick={() => goTo(k - 1)}
              >
                <PageFace face={leftFace} W={g.W} H={g.H} live active={!lifting} d={lean} reduced={reduced} />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 h-full w-[140px]"
                  style={{ x: leftShadowX, opacity: leftShadowO, background: "linear-gradient(to left, rgba(20,34,36,0.22), transparent)" }}
                />
              </div>
            )}

            {/* Right page, under the leaf */}
            {(rightFace || endFace) && (
              <div className="absolute top-0 overflow-hidden" style={{ left: g.W, width: g.W, height: g.H, boxShadow: stack(TURNS - k, 1) }}>
                <PageFace face={(endFace ?? rightFace)!} W={g.W} H={g.H} d={lean} reduced={reduced} />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 h-full w-[160px]"
                  style={{ x: rightShadowX, opacity: rightShadowO, background: "linear-gradient(to right, rgba(20,34,36,0.24), transparent)" }}
                />
              </div>
            )}

            {/* The leaf being turned */}
            {leafFront && leafBack && (
              <Leaf
                W={g.W}
                H={g.H}
                inner={inner}
                outer={outer}
                corner={corner}
                flap={leafBack.kind === "scene" ? PALETTES[leafBack.s?.palette ?? FINAL].sky : PAGE}
                front={<PageFace face={leafFront} W={g.W} H={g.H} d={lean} reduced={reduced} />}
                back={<PageFace face={leafBack} W={g.W} H={g.H} d={lean} reduced={reduced} />}
                tab={
                  k >= 1 && k <= SYMPTOMS.length ? (
                    <LeafTab s={SYMPTOMS[k - 1]} top={28 + (k - 1) * tabStep} h={tabH} w={g.tabW} active={!moving} />
                  ) : null
                }
                onEnter={() => setHoverRight(true)}
                onLeave={() => setHoverRight(false)}
                onClick={() => goTo(k + 1)}
              />
            )}
          </motion.div>
        </div>
        <GrainOverlay opacity={0.03} />
      </div>
    </section>
  );
}

/** The page block's edge: a few offset hairlines, more of them where there are more pages. */
function stack(pages: number, dir: 1 | -1) {
  const n = Math.max(1, Math.min(6, Math.round(pages * 0.7)));
  return Array.from({ length: n }, (_, i) => `${dir * (i + 1)}px ${i + 1}px 0 ${i % 2 ? "#F4EEE2" : "#E6DDCB"}`).join(", ");
}

/* ───────────── The turning leaf ───────────── */

function Leaf({
  W, H, inner, outer, corner, flap, front, back, tab, onEnter, onLeave, onClick,
}: {
  W: number;
  H: number;
  inner: MotionValue<number>;
  outer: MotionValue<number>;
  corner: MotionValue<number>;
  flap: string;
  front: React.ReactNode;
  back: React.ReactNode;
  tab: React.ReactNode;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const a = Math.round(W * FOLD);
  const b = W - a;
  const abs = useTransform([inner, outer], ([i, o]: number[]) => i + o);
  const shadeIn = useTransform(inner, (v) => Math.abs(Math.sin((v * Math.PI) / 180)) * 0.2);
  const shadeOut = useTransform(abs, (v) => Math.abs(Math.sin((v * Math.PI) / 180)) * 0.26);
  const cut = useMotionTemplate`polygon(0 0, 100% 0, 100% calc(100% - ${corner}px), calc(100% - ${corner}px) 100%, 0 100%)`;

  return (
    <motion.div
      className="absolute top-0 cursor-pointer"
      style={{ left: W, width: W, height: H, transformStyle: "preserve-3d", transformOrigin: "0% 50%", rotateY: inner, z: 1 }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={onClick}
    >
      <Clip w={a + 1} h={H} W={W} offset={0} shade={shadeIn}>
        {front}
      </Clip>
      <Clip w={a + 1} h={H} W={W} offset={b} back shade={shadeIn}>
        {back}
      </Clip>
      {/* The outer part repeats the page it is cut from; screen readers get it once, above. */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0"
        style={{ left: a, width: b, height: H, transformStyle: "preserve-3d", transformOrigin: "0% 50%", rotateY: outer }}
      >
        <Clip w={b} h={H} W={W} offset={a} shade={shadeOut} cut={cut} flap={<DogEar size={corner} color={flap} />}>
          {front}
        </Clip>
        <Clip w={b} h={H} W={W} offset={0} back shade={shadeOut}>
          {back}
        </Clip>
        {tab}
      </motion.div>
    </motion.div>
  );
}

/** One face of one part of the leaf: the page, cut to that part. */
function Clip({
  w, h, W, offset, back = false, shade, cut, flap, children,
}: {
  w: number;
  h: number;
  W: number;
  offset: number;
  back?: boolean;
  shade: MotionValue<number>;
  cut?: MotionValue<string>;
  flap?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute left-0 top-0"
      style={{
        width: w,
        height: h,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: back ? "rotateY(180deg)" : undefined,
      }}
    >
      <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: cut }}>
        <div className="absolute top-0" style={{ left: -offset, width: W, height: h }}>
          {children}
        </div>
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0E2A30]" style={{ opacity: shade }} />
      </motion.div>
      {flap}
    </div>
  );
}

/** The folded corner: the back of the page, in the colour of the scene printed there. */
function DogEar({ size, color }: { size: MotionValue<number>; color: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0"
      style={{ width: size, height: size, filter: "drop-shadow(-3px -3px 4px rgba(20,34,36,0.18))" }}
    >
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(100% 0, 0 0, 0 100%)",
          background: `linear-gradient(to top left, rgba(255,255,255,0.55), ${color} 45%, ${color})`,
        }}
      />
    </motion.div>
  );
}

/* ───────────── Index tabs ───────────── */

/** A tab sticks out of the page edge; its round end and its label face outward. */
function TabBody({ s, h, w, side, active = false }: { s: Symptom; h: number; w: number; side: "left" | "right"; active?: boolean }) {
  const p = PALETTES[s.palette];
  return (
    <span
      className="flex items-center whitespace-nowrap text-[12.5px] tracking-[-0.005em]"
      style={{
        width: w,
        height: h,
        justifyContent: side === "right" ? "flex-end" : "flex-start",
        padding: "0 14px",
        background: active ? p.mid : p.near,
        color: p.ink,
        fontWeight: active ? 600 : 500,
        borderRadius: side === "right" ? "0 10px 10px 0" : "10px 0 0 10px",
        boxShadow: "0 1px 1px rgba(14,42,48,0.12), 0 4px 8px -4px rgba(14,42,48,0.25)",
      }}
    >
      {s.title}
    </span>
  );
}

function Tab({
  s, side, top, h, w, x = 0, onClick,
}: {
  s: Symptom;
  side: "left" | "right";
  top: number;
  h: number;
  w: number;
  x?: number;
  onClick: () => void;
}) {
  const out = w - 18;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={s.title}
      className="absolute rounded-[10px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)]"
      style={{ top, height: h, width: out, left: side === "right" ? x : -out }}
      whileHover={{ x: side === "right" ? 6 : -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <TabBody s={s} h={h} w={out} side={side} />
    </motion.button>
  );
}

/** The tab on the turning leaf: part of the leaf, so it goes over with it. */
function LeafTab({ s, top, h, w, active }: { s: Symptom; top: number; h: number; w: number; active: boolean }) {
  const out = w - 18;
  // Seen from behind, once the leaf is over, it is a left-hand tab.
  const face = (back: boolean) => (
    <span
      className="absolute left-0 top-0"
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: back ? "rotateY(180deg)" : undefined }}
    >
      <TabBody s={s} h={h} w={out} side={back ? "left" : "right"} active={active} />
    </span>
  );
  return (
    <div className="pointer-events-none absolute" style={{ left: "100%", top, width: out, height: h, transformStyle: "preserve-3d" }}>
      {face(false)}
      {face(true)}
    </div>
  );
}

/* ───────────── Pages ───────────── */

function PageFace({
  face, W, H, live = false, active = false, d, reduced,
}: {
  face: Face;
  W: number;
  H: number;
  live?: boolean;
  active?: boolean;
  d: MotionValue<number>;
  reduced: boolean;
}) {
  switch (face.kind) {
    case "cover":
      return <CoverFace W={W} H={H} />;
    case "text":
      return <TextFace s={face.s} W={W} />;
    case "cta":
      return <CtaFace W={W} />;
    case "scene": {
      const palette = face.s?.palette ?? FINAL;
      if (!live) return <FlatFace palette={palette} />;
      const S = face.s ? SCENES[face.s.slug] : FinalScene;
      return (
        <div className="absolute inset-0 overflow-hidden" style={{ background: PAGE }}>
          <S active={active} d={d} reduced={reduced} mode="door" />
          <Gutter side="right" />
        </div>
      );
    }
  }
}

function Gutter({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 w-20"
      style={{
        [side]: 0,
        background: `linear-gradient(to ${side === "left" ? "right" : "left"}, rgba(52,44,28,0.16), rgba(52,44,28,0.05) 35%, transparent)`,
      }}
    />
  );
}

/** A scene's page while it lies folded: just its printed sky. */
function FlatFace({ palette }: { palette: PaletteName }) {
  const p = PALETTES[palette];
  return (
    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${p.sky}, ${p.far})` }}>
      <svg viewBox="0 0 300 540" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <path d={NEAR_HILLS} fill={p.near} opacity={0.35} />
      </svg>
      <Gutter side="right" />
    </div>
  );
}

function CoverFace({ W, H }: { W: number; H: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: BOARD }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(14,42,48,0.05) 0 1px, transparent 1px 4px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute rounded-[3px]"
        style={{ inset: Math.round(W * 0.05), boxShadow: "inset 0 0 0 1px rgba(14,42,48,0.10), inset 0 1px 3px rgba(14,42,48,0.12)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center" style={{ paddingTop: H * 0.2 }}>
        <svg viewBox="98 254 104 196" className="overflow-visible" style={{ height: H * 0.15 }} aria-hidden="true">
          <path d={TOOTH} fill="#FFFFFF" style={{ filter: "drop-shadow(0 1px 1px rgba(14,42,48,0.16)) drop-shadow(0 7px 9px rgba(14,42,48,0.13))" }} />
          <path d={TOOTH_SHADE} fill="#E3EBE9" />
        </svg>
        <div
          className="mt-[9%] font-sans font-extralight text-[var(--color-ink)]"
          style={{ fontSize: Math.round(W * 0.125), letterSpacing: "-0.05em", lineHeight: 0.9 }}
        >
          Symptomer
        </div>
        <div className="mt-4 text-[var(--color-ink)]/70" style={{ fontSize: Math.round(W * 0.031) }}>
          Hva de betyr, og hva du bør gjøre.
        </div>
        <div className="mt-auto pb-[9%] text-[var(--color-ink)]/60" style={{ fontSize: Math.round(W * 0.025), fontWeight: 500 }}>
          Ringebu Tannlegesenter
        </div>
      </div>
      <GrainOverlay opacity={0.08} />
    </div>
  );
}

function TextFace({ s, W }: { s: Symptom; W: number }) {
  const p = PALETTES[s.palette];
  const f = (r: number) => Math.round(W * r * 10) / 10;
  return (
    <div className="absolute inset-0" style={{ background: PAGE }}>
      <Gutter side="left" />
      <div className="relative flex h-full flex-col" style={{ padding: `${W * 0.1}px ${W * 0.1}px ${W * 0.09}px ${W * 0.12}px` }}>
        <h3 className="font-sans font-light text-[var(--color-ink)]" style={{ fontSize: f(0.084), letterSpacing: "-0.045em", lineHeight: 0.98 }}>
          {s.title}
        </h3>
        <p className="mt-2" style={{ fontSize: f(0.034), color: p.deep }}>
          {s.kicker}
        </p>
        <p className="mt-6 text-[var(--color-text-secondary)]" style={{ fontSize: f(0.033), lineHeight: 1.55 }}>
          {s.description}
        </p>
        <div className="mt-7">
          <div className="font-medium" style={{ fontSize: f(0.026), color: p.deep }}>
            Mulige årsaker
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {s.causes.map((c) => (
              <li key={c} className="flex items-baseline gap-2.5 text-[var(--color-text-primary)]" style={{ fontSize: f(0.029) }}>
                <span aria-hidden="true" className="inline-block size-1.5 shrink-0 translate-y-[-2px] rounded-full" style={{ background: p.accent }} />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 border-t pt-6" style={{ borderColor: "rgba(14,42,48,0.12)" }}>
          <div className="font-medium" style={{ fontSize: f(0.026), color: p.deep }}>
            Hva du gjør
          </div>
          <p className="mt-2 text-[var(--color-text-primary)]" style={{ fontSize: f(0.031), lineHeight: 1.55 }}>
            {s.whatToDo}
          </p>
        </div>
        <p className="mt-auto flex items-center gap-2.5 font-medium" style={{ fontSize: f(0.027), color: URGENCY_COLOR[s.urgency] }}>
          <span aria-hidden="true" className="inline-block size-2 rounded-full" style={{ background: URGENCY_COLOR[s.urgency] }} />
          {s.severity}
        </p>
      </div>
      <GrainOverlay opacity={0.05} />
    </div>
  );
}

function CtaFace({ W }: { W: number }) {
  return (
    <div className="absolute inset-0" style={{ background: PAGE }}>
      <Gutter side="left" />
      <div className="relative flex h-full flex-col justify-end" style={{ padding: `${W * 0.1}px ${W * 0.1}px ${W * 0.12}px ${W * 0.12}px` }}>
        <h3 className="font-sans font-light text-[var(--color-ink)]" style={{ fontSize: Math.round(W * 0.09), letterSpacing: "-0.045em", lineHeight: 0.98 }}>
          Kjenner du deg igjen?
        </h3>
        <p className="mt-5 max-w-[30ch] text-[var(--color-text-secondary)]" style={{ fontSize: Math.round(W * 0.035), lineHeight: 1.5 }}>
          Ring oss, så finner vi ut av det sammen.
        </p>
        <div className="mt-8 flex flex-wrap gap-3" onClick={(e) => e.stopPropagation()}>
          <Link href="/kontakt" className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[14px] font-semibold text-white">
            Bestill time <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a href="tel:61280412" className="inline-flex items-center rounded-full border border-[rgba(14,42,48,0.2)] bg-white/60 px-5 py-3.5 text-[14px] font-medium text-[var(--color-ink)]">
            61 28 04 12
          </a>
        </div>
      </div>
      <GrainOverlay opacity={0.05} />
    </div>
  );
}

/* ───────────── Narrow screens: the spreads, one under the other ───────────── */

function BildebokaListe() {
  const reduced = useReducedMotion() ?? false;
  return (
    <section id="symptomer" aria-labelledby="symptomer-tittel" className="bg-[var(--color-paper)] px-5 py-[var(--space-section)]">
      <h2 id="symptomer-tittel" className="font-sans font-extralight text-[var(--color-ink)]" style={{ fontSize: 44, letterSpacing: "-0.045em", lineHeight: 0.95 }}>
        Kjenner du noe av dette?
      </h2>
      <p className="mt-5 text-[18px] leading-[1.5] text-[var(--color-text-secondary)]">Åtte vanlige plager. Hva de betyr, og hva du bør gjøre.</p>
      <div className="mt-10 space-y-10">
        {SYMPTOMS.map((s) => (
          <ListeSide key={s.slug} s={s} reduced={reduced} />
        ))}
      </div>
    </section>
  );
}

function ListeSide({ s, reduced }: { s: Symptom; reduced: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const still = useMotionValue(0);
  const S = SCENES[s.slug];
  return (
    <motion.article
      ref={ref}
      className="overflow-hidden rounded-[6px] bg-[#FFFCF6] shadow-[0_1px_0_rgba(14,42,48,0.08),0_18px_40px_-24px_rgba(14,42,48,0.35)]"
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
    >
      <div className="relative aspect-[4/3]">
        <S active={inView} d={still} reduced={reduced} mode="door" />
      </div>
      <div className="p-6">
        <h3 className="font-sans text-[32px] font-light tracking-[-0.04em] text-[var(--color-ink)]">{s.title}</h3>
        <p className="mt-3 text-[16px] leading-[1.55] text-[var(--color-text-secondary)]">{s.description}</p>
        <p className="mt-4 text-[15px] leading-[1.55] text-[var(--color-text-primary)]">{s.whatToDo}</p>
        <p className="mt-4 text-[14px] font-medium" style={{ color: URGENCY_COLOR[s.urgency] }}>
          {s.severity}
        </p>
      </div>
    </motion.article>
  );
}

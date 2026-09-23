"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
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
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ARCADE_TREATMENTS as T, EASE_OUT, type ArcadeTreatment } from "./data";
import { TreatmentBody } from "./TreatmentBody";
import { useLayerKeys, useScrollLock, useStopSettle, useViewport } from "./hooks";
import type { SceneSet } from "./scenes/types";

/**
 * Buegangen. The page is a long wall with a row of arches cut into it.
 * Scrolling walks you along the wall. Each arch is one solid colour, taken
 * from its scene's paper, until it reaches the middle of the screen; then the
 * paper theatre inside it stands up and plays. Choosing an arch walks you
 * through it: the opening grows until the scene fills the screen, and the
 * treatment's details slide in beside it.
 */

const NAV = 72;
const DOOR_EASE = [0.76, 0, 0.24, 1] as const;

type Geo = {
  vw: number;
  vh: number;
  sm: boolean;
  archW: number;
  archH: number;
  r: number;
  gap: number;
  top: number;
  padL: number;
  introW: number;
  lefts: number[];
  endLeft: number;
  endW: number;
  trackW: number;
  maxX: number;
};

function geometry(vw: number, vh: number): Geo {
  const sm = vw < 768;
  const archW = sm ? Math.round(vw * 0.6) : Math.round(Math.min(330, Math.max(230, vw * 0.2)));
  const labelH = sm ? 92 : 112;
  const archH = Math.round(Math.min(vh - NAV - labelH - (sm ? 56 : 72), archW * (sm ? 1.5 : 1.8)));
  const gap = sm ? Math.round(vw * 0.1) : Math.round(Math.min(96, Math.max(48, vw * 0.05)));
  const top = Math.round(NAV + (vh - NAV - archH - labelH) / 2);
  const padL = sm ? 20 : Math.round(Math.max(24, (vw - 1280) / 2 + 36));
  const introW = sm ? Math.round(vw - 40) : Math.round(Math.min(560, vw * 0.4));
  // Far enough right that the first arch starts out plain, not half-open.
  const first = Math.max(padL + introW + gap, Math.round(vw * 0.67 - archW / 2));
  const lefts = T.map((_, i) => first + i * (archW + gap));
  const endLeft = lefts[lefts.length - 1] + archW + gap * 1.5;
  const endW = sm ? Math.round(vw - 40) : Math.round(Math.min(560, vw * 0.42));
  const trackW = endLeft + endW + padL;
  return {
    vw, vh, sm, archW, archH, r: archW / 2, gap, top, padL, introW, lefts,
    endLeft, endW, trackW, maxX: Math.max(0, trackW - vw),
  };
}

/** One path for the wall: the whole track, with every arch cut out of it. */
function wallPath(g: Geo) {
  const holes = g.lefts
    .map((l) => {
      const b = g.top + g.archH;
      const s = g.top + g.r;
      return `M${l},${b} L${l},${s} A${g.r},${g.r} 0 0 1 ${l + g.archW},${s} L${l + g.archW},${b} Z`;
    })
    .join(" ");
  return `M0,0 H${g.trackW} V${g.vh} H0 Z ${holes}`;
}

/** The arcade, with one scene per treatment. */
export function Buegang({ scenes }: { scenes: SceneSet }) {
  const vp = useViewport();
  const g = useMemo(() => geometry(vp.w, vp.h), [vp.w, vp.h]);
  const reduced = useReducedMotion() ?? false;

  const sectionRef = useRef<HTMLElement | null>(null);
  const holeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rawX = useTransform(scrollYProgress, (p) => -p * g.maxX);
  // A little weight on the walk, so the wall glides rather than ticks. It
  // comes to rest within half a pixel. Left to framer-motion's defaults, a
  // walk that ended on a small last step crept on to within 0.005px for
  // about two more seconds, moving every scene layer on the wall each frame
  // to no visible effect.
  const rest = { restDelta: 0.5, restSpeed: 10 };
  const x = useSpring(
    rawX,
    reduced ? { stiffness: 1000, damping: 100, ...rest } : { stiffness: 170, damping: 32, mass: 0.35, ...rest }
  );
  // Once the wall has scrolled out of sight, what is left of the glide would
  // only move scenes nobody can see: put it where it was going.
  const inView = useInView(sectionRef);
  useEffect(() => {
    if (!inView) x.jump(rawX.get());
  }, [inView, x, rawX]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(x, "change", (v) => {
    let best = 0;
    let bestD = Infinity;
    g.lefts.forEach((l, i) => {
      const d = Math.abs(l + g.archW / 2 + v - g.vw / 2);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive((a) => (a === best ? a : best));
  });

  /** Page scroll position that puts arch i in the middle of the screen. */
  const scrollForArch = useCallback(
    (i: number) => {
      const top = (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      const want = g.lefts[i] + g.archW / 2 - g.vw / 2;
      return top + Math.min(g.maxX, Math.max(0, want));
    },
    [g]
  );

  const [layer, setLayer] = useState<{ i: number; rect: DOMRect } | null>(null);
  useScrollLock(layer !== null);

  // Where scrolling comes to rest, an arch comes to rest in the middle, so the
  // walk never stops between two half-open rooms. The stops are the start and
  // end of the wall and the scroll position that centres each arch. Only
  // while the wall is pinned, though: page-wide snapping once pulled readers
  // of the list underneath back up to the wall.
  const stops = useMemo(
    () => [0, ...g.lefts.map((l) => Math.min(g.maxX, Math.max(0, l + g.archW / 2 - g.vw / 2))), g.maxX],
    [g]
  );
  useStopSettle(sectionRef, stops, !reduced && layer === null);
  const [hovered, setHovered] = useState<number | null>(null);

  const openArch = (i: number) => {
    const el = holeRefs.current[i];
    if (!el) return;
    setLayer({ i, rect: el.getBoundingClientRect() });
  };

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Behandlinger"
        className="relative bg-[var(--color-paper)]"
        style={{ height: g.vh + g.maxX }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div className="absolute left-0 top-0" style={{ x, width: g.trackW, height: g.vh }}>
            {/* Scenes, behind the wall */}
            {T.map((t, i) => (
              <SceneRoom
                key={t.slug}
                Scene={scenes[t.slug]}
                i={i}
                g={g}
                x={x}
                reduced={reduced}
                hovered={hovered === i && layer === null}
              />
            ))}

            {/* The wall */}
            <svg
              aria-hidden="true"
              width={g.trackW}
              height={g.vh}
              className="pointer-events-none absolute left-0 top-0"
            >
              <path d={wallPath(g)} fill="var(--color-paper)" fillRule="evenodd" />
              {/* The floor the arches stand on */}
              <line
                x1={0}
                x2={g.trackW}
                y1={g.top + g.archH + 0.5}
                y2={g.top + g.archH + 0.5}
                stroke="rgba(14,42,48,0.14)"
              />
            </svg>

            {/* Intro, painted on the wall */}
            <div
              className="absolute flex flex-col justify-end"
              style={{ left: g.padL, top: g.top, width: g.introW, height: g.archH }}
            >
              <motion.h1
                className="font-sans font-extralight text-[var(--color-ink)]"
                style={{ fontSize: g.sm ? 56 : "clamp(64px, 7.4vw, 112px)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
              >
                Behandlinger
              </motion.h1>
              <motion.p
                className="mt-6 max-w-[34ch] text-balance text-[18px] leading-[1.5] text-[var(--color-text-secondary)] md:text-[20px]"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE_OUT, delay: 0.3 }}
              >
                Fra vanlig kontroll til rotfylling. Her er alt vi gjør.
              </motion.p>
            </div>

            {/* The arches themselves: opening, jamb shadow and name */}
            {T.map((t, i) => (
              <Arch
                key={t.slug}
                t={t}
                i={i}
                g={g}
                x={x}
                active={active === i}
                reduced={reduced}
                onHover={(on) => setHovered((h) => (on ? i : h === i ? null : h))}
                refCb={(el) => {
                  holeRefs.current[i] = el;
                }}
                onOpen={() => openArch(i)}
                onFocusArch={() => {
                  // Focus can land on an arch that is off to the side; walk to it.
                  const y = scrollForArch(i);
                  if (Math.abs(window.scrollY - y) > 4) window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
                }}
              />
            ))}

            {/* End of the wall */}
            <div
              className="absolute flex flex-col justify-end"
              style={{ left: g.endLeft, top: g.top, width: g.endW, height: g.archH }}
            >
              <h2
                className="font-sans font-light text-[var(--color-ink)]"
                style={{ fontSize: g.sm ? 36 : "clamp(38px, 3.6vw, 54px)", letterSpacing: "-0.035em", lineHeight: 1 }}
              >
                Fant du ikke det du lette etter?
              </h2>
              <p className="mt-5 max-w-[34ch] text-[18px] leading-[1.5] text-[var(--color-text-secondary)]">
                Ring oss, så finner vi ut av det sammen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[14px] font-semibold text-white"
                >
                  Bestill time <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href="tel:61280412"
                  className="inline-flex items-center rounded-full border border-[rgba(14,42,48,0.2)] bg-white/60 px-5 py-3.5 text-[14px] font-medium text-[var(--color-ink)]"
                >
                  61 28 04 12
                </a>
              </div>
            </div>
          </motion.div>

          <GrainOverlay opacity={0.035} />
        </div>
      </section>

      <AnimatePresence>
        {layer && (
          <Doorway
            key="doorway"
            start={layer}
            reduced={reduced}
            vp={g}
            scenes={scenes}
            onIndex={(i) => setLayer((l) => (l ? { ...l, i } : l))}
            prepareClose={async (i) => {
              window.scrollTo({ top: scrollForArch(i), behavior: "auto" });
              // Let the springs settle on the new position before measuring.
              await new Promise((r) => setTimeout(r, reduced ? 0 : 60));
              x.jump(rawX.get());
              await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
              return holeRefs.current[i]?.getBoundingClientRect() ?? null;
            }}
            onClosed={(i) => {
              setLayer(null);
              holeRefs.current[i]?.focus({ preventScroll: true });
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** Distance of an arch's centre from the middle of the screen, in half-screens. */
function useArchDistance(i: number, g: Geo, x: MotionValue<number>) {
  return useTransform(x, (v) => (g.lefts[i] + g.archW / 2 + v - g.vw / 2) / (g.vw / 2));
}

// A scene plays while its arch is within this distance of the middle.
const SCENE_ZONE = 0.2;

/**
 * The scene behind one arch. It is told when it is on stage, and only then
 * does it perform; the rest of the time the arch shows its plain colour.
 */
function SceneRoom({
  Scene, i, g, x, reduced, hovered,
}: {
  Scene?: SceneSet[string];
  i: number;
  g: Geo;
  x: MotionValue<number>;
  reduced: boolean;
  hovered: boolean;
}) {
  const d = useArchDistance(i, g, x);
  const [centred, setCentred] = useState(() => Math.abs(d.get()) < SCENE_ZONE);
  useMotionValueEvent(d, "change", (v) => {
    const on = Math.abs(v) < SCENE_ZONE;
    setCentred((c) => (c === on ? c : on));
  });
  if (!Scene) return null;
  return (
    <div
      aria-hidden="true"
      className="absolute overflow-hidden"
      style={{
        left: g.lefts[i],
        top: g.top,
        width: g.archW,
        height: g.archH,
        borderRadius: `${g.r}px ${g.r}px 0 0`,
      }}
    >
      <Scene active={centred || hovered} d={d} reduced={reduced} mode="arch" />
    </div>
  );
}

function Arch({
  t, i, g, x, active, reduced, onHover, refCb, onOpen, onFocusArch,
}: {
  t: ArcadeTreatment;
  i: number;
  g: Geo;
  x: MotionValue<number>;
  active: boolean;
  reduced: boolean;
  onHover: (on: boolean) => void;
  refCb: (el: HTMLButtonElement | null) => void;
  onOpen: () => void;
  onFocusArch: () => void;
}) {
  const d = useArchDistance(i, g, x);
  // The inside of the opening: you see the jamb on the side facing you, and
  // it changes sides as the arch passes — the wall has a thickness.
  const side = useTransform(d, (v) => (reduced ? 0 : Math.max(-1, Math.min(1, v)) * -18));
  const jamb = useMotionTemplate`inset ${side}px 0 26px -16px rgba(8,30,35,0.42), inset 0 14px 22px -16px rgba(8,30,35,0.35), inset 0 0 0 1px rgba(14,42,48,0.10)`;

  return (
    <button
      ref={refCb}
      type="button"
      onClick={onOpen}
      onFocus={onFocusArch}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      aria-label={`${t.title}. ${t.subtitle}`}
      className="group absolute cursor-pointer text-left outline-none"
      style={{ left: g.lefts[i], top: g.top, width: g.archW, height: g.archH + (g.sm ? 92 : 112) }}
    >
      {/* Jamb shadow inside the opening */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 block"
        style={{
          width: g.archW,
          height: g.archH,
          borderRadius: `${g.r}px ${g.r}px 0 0`,
          boxShadow: jamb,
        }}
      />
      {/* Focus ring follows the arch */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 hidden rounded-t-full ring-2 ring-[var(--color-ink)] ring-offset-4 ring-offset-[var(--color-paper)] group-focus-visible:block"
        style={{ width: g.archW, height: g.archH }}
      />

      <span className="absolute left-0 block w-full" style={{ top: g.archH + 18 }}>
        <span
          className="block font-sans font-light transition-colors duration-500"
          style={{
            fontSize: g.sm ? 24 : "clamp(22px, 1.9vw, 29px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: active ? "var(--color-ink)" : "rgba(14,42,48,0.42)",
          }}
        >
          {t.title}
        </span>
        <span
          className="mt-1.5 flex items-baseline justify-between gap-3 text-[14px] transition-opacity duration-500"
          style={{ opacity: active ? 1 : 0 }}
        >
          <span className="text-[var(--color-text-secondary)]">{t.subtitle}</span>
          <span className="shrink-0 tabular-nums text-[var(--color-text-muted)]">{t.duration}</span>
        </span>
      </span>
    </button>
  );
}

/* ───────────── Walking through ───────────── */

function Doorway({
  start, reduced, vp, scenes, onIndex, prepareClose, onClosed,
}: {
  start: { i: number; rect: DOMRect };
  reduced: boolean;
  vp: Geo;
  scenes: SceneSet;
  onIndex: (i: number) => void;
  prepareClose: (i: number) => Promise<DOMRect | null>;
  onClosed: (i: number) => void;
}) {
  const [scope, animate] = useAnimate();
  const [i, setI] = useState(start.i);
  const [panel, setPanel] = useState(false);
  const closing = useRef(false);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  // In the doorway the scene is always centre stage.
  const still = useMotionValue(0);
  const t = T[i];
  const Scene = scenes[t.slug];

  const boxOf = (r: DOMRect) => ({
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height,
    borderTopLeftRadius: r.width / 2,
    borderTopRightRadius: r.width / 2,
  });
  const FULL = { left: 0, top: 0, width: vp.vw, height: vp.vh, borderTopLeftRadius: 0, borderTopRightRadius: 0 };

  useEffect(() => {
    let alive = true;
    (async () => {
      await animate("[data-room-box]", FULL, reduced ? { duration: 0.01 } : { duration: 1.05, ease: DOOR_EASE });
      if (!alive) return;
      setPanel(true);
      closeBtn.current?.focus({ preventScroll: true });
    })();
    return () => {
      alive = false;
    };
    // Runs once, when the doorway is first walked through.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = useCallback(
    (to: number) => {
      const n = (to + T.length) % T.length;
      setI(n);
      onIndex(n);
    },
    [onIndex]
  );

  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    setPanel(false);
    await new Promise((r) => setTimeout(r, reduced ? 0 : 420));
    const r = await prepareClose(i);
    if (r) {
      await animate("[data-room-box]", boxOf(r), reduced ? { duration: 0.01 } : { duration: 0.9, ease: DOOR_EASE });
    }
    onClosed(i);
  }, [i, reduced, prepareClose, onClosed, animate]);

  useLayerKeys(true, { onClose: close, onPrev: () => go(i - 1), onNext: () => go(i + 1) });

  const next = T[(i + 1) % T.length];

  return (
    <motion.div
      ref={scope}
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      className="fixed inset-0 z-[60]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* The room is the arch's own colour, so the opening grows without a seam
          and the strip beside the scene matches it once the details slide in. */}
      <div
        data-room-box
        className="absolute overflow-hidden transition-[background-color] duration-500"
        style={{ ...boxOf(start.rect), backgroundColor: Scene?.ground ?? "var(--color-paper)" }}
      >
        <motion.div
          className="absolute left-0 top-0"
          initial={false}
          animate={
            panel
              ? vp.sm
                ? { width: "100%", height: "24%" }
                : { width: "52%", height: "100%" }
              : { width: "100%", height: "100%" }
          }
          transition={{ duration: reduced ? 0.01 : 0.6, ease: DOOR_EASE }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={t.slug}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              {Scene && <Scene active d={still} reduced={reduced} mode="door" />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {panel && (
          <motion.aside
            key="panel"
            className="absolute bottom-0 right-0 flex max-h-[76svh] w-full flex-col overflow-y-auto overscroll-contain bg-[var(--color-paper)] shadow-[-30px_0_80px_-40px_rgba(8,30,35,0.45)] md:top-0 md:max-h-none md:w-[min(620px,48vw)]"
            initial={vp.sm ? { y: "100%" } : { x: "100%" }}
            animate={vp.sm ? { y: 0 } : { x: 0 }}
            exit={vp.sm ? { y: "100%" } : { x: "100%" }}
            transition={{ duration: reduced ? 0.01 : 0.6, ease: DOOR_EASE }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-[var(--color-paper)]/92 px-6 py-4 backdrop-blur md:px-12 md:pt-8">
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-ink)] outline-none focus-visible:underline"
              >
                <X className="size-4" aria-hidden="true" />
                Tilbake til buegangen
              </button>
              <div className="flex gap-1">
                <IconBtn label="Forrige" onClick={() => go(i - 1)}>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </IconBtn>
                <IconBtn label="Neste" onClick={() => go(i + 1)}>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </IconBtn>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={t.slug}
                className="px-6 pb-14 pt-4 md:px-12 md:pt-10"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                <h2
                  className="font-sans font-light text-[var(--color-ink)]"
                  style={{ fontSize: "clamp(40px, 4.4vw, 64px)", letterSpacing: "-0.045em", lineHeight: 0.95 }}
                >
                  {t.title}
                </h2>
                <p className="mb-8 mt-3 text-[19px] text-[var(--color-stone)]">{t.subtitle}</p>
                <TreatmentBody t={t} />
                <button
                  type="button"
                  onClick={() => go(i + 1)}
                  className="group mt-14 flex w-full items-baseline justify-between border-t border-[var(--color-rule)] pt-6 text-left"
                >
                  <span className="text-[13px] font-medium text-[var(--color-text-muted)]">Neste rom</span>
                  <span className="flex items-center gap-2 font-sans text-[26px] font-light tracking-[-0.03em] text-[var(--color-ink)]">
                    {next.title}
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full text-[var(--color-ink)] transition-colors hover:bg-[rgba(14,42,48,0.06)] focus-visible:bg-[rgba(14,42,48,0.08)] focus-visible:outline-none"
    >
      {children}
    </button>
  );
}

"use client";

import Link from "next/link";
import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { ARCADE_TREATMENTS as T, EASE_OUT, type ArcadeTreatment } from "./data";
import { TreatmentBody } from "./TreatmentBody";
import { useElementSize, useLayerKeys, useScrollLock } from "./hooks";
import type { SceneSet } from "./scenes/types";

/**
 * Buegangen. A wall one screen tall with a row of arches cut into it. Two
 * arrows walk you along it an arch at a time; on a phone you can swipe it
 * sideways as well, and scrolling the page goes straight past it to the list
 * below. Each arch is one solid colour, taken from its scene's
 * paper, until it reaches the middle of the screen; then the paper theatre
 * inside it stands up and plays. Choosing an arch walks you through it: the
 * opening grows until the scene fills the screen, and the treatment's details
 * slide in beside it.
 *
 * The wall is a sideways scroller, so the browser slides it. It used to be
 * walked by scrolling the page down, which people found awkward, and which
 * moved the wall from JavaScript at every step.
 */

const NAV = 72;
const DOOR_EASE = [0.76, 0, 0.24, 1] as const;
/** A phone's pair of arrows under the arch names: 16px above, 44px of button. */
const ARROWS_SM = 60;

type Geo = {
  vw: number;
  vh: number;
  sm: boolean;
  archW: number;
  archH: number;
  labelH: number;
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
  // On a phone the arrows are a pair under the names, not at the sides,
  // where they would cover the words at either end of the wall.
  const arrowsH = sm ? ARROWS_SM : 0;
  const archH = Math.round(Math.min(vh - NAV - labelH - arrowsH - (sm ? 56 : 72), archW * (sm ? 1.5 : 1.8)));
  const gap = sm ? Math.round(vw * 0.1) : Math.round(Math.min(96, Math.max(48, vw * 0.05)));
  const top = Math.round(NAV + (vh - NAV - archH - labelH - arrowsH) / 2);
  const padL = sm ? 20 : Math.round(Math.max(24, (vw - 1280) / 2 + 36));
  const introW = sm ? Math.round(vw - 40) : Math.round(Math.min(560, vw * 0.4));
  // Far enough right that the first arch starts out plain, not half-open.
  const first = Math.max(padL + introW + gap, Math.round(vw * 0.67 - archW / 2));
  const lefts = T.map((_, i) => first + i * (archW + gap));
  const endLeft = lefts[lefts.length - 1] + archW + gap * 1.5;
  const endW = sm ? Math.round(vw - 40) : Math.round(Math.min(560, vw * 0.42));
  const trackW = endLeft + endW + padL;
  return {
    vw, vh, sm, archW, archH, labelH, r: archW / 2, gap, top, padL, introW, lefts,
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

/**
 * Where the wall can come to rest: its start, each arch in the middle of the
 * screen, and its end. Stop k + 1 is arch k.
 */
function stopsOf(g: Geo) {
  const clamp = (v: number) => Math.min(g.maxX, Math.max(0, Math.round(v)));
  return [0, ...g.lefts.map((l) => clamp(l + g.archW / 2 - g.vw / 2)), g.maxX];
}

/** The stop nearest to a scroll position. */
const nearest = (stops: number[], at: number) =>
  stops.reduce((best, s, k) => (Math.abs(s - at) < Math.abs(stops[best] - at) ? k : best), 0);

/** The treatment a link's hash names, or -1. */
const slugIndex = (hash: string) => T.findIndex((t) => `#${t.slug}` === hash);

/** The arcade, with one scene per treatment. */
export function Buegang({ scenes }: { scenes: SceneSet }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const size = useElementSize(scrollerRef);
  const g = useMemo(() => geometry(size.w, size.h), [size.w, size.h]);
  const stops = useMemo(() => stopsOf(g), [g]);
  const reduced = useReducedMotion() ?? false;
  const holeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // How far the wall has slid, as a (negative) offset: the arches, their
  // jambs and their scenes all answer to it.
  const x = useMotionValue(0);
  // The stop a walk is heading for, so that a second press of an arrow while
  // the wall is still sliding goes one further instead of starting over.
  const heading = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const arrive = () => {
      heading.current = null;
    };
    const onScroll = () => {
      x.set(-el.scrollLeft);
      clearTimeout(idle);
      idle = setTimeout(arrive, 250);
    };
    x.set(-el.scrollLeft);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", arrive);
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", arrive);
      clearTimeout(idle);
    };
  }, [x]);

  const [active, setActive] = useState(0);
  const [edge, setEdge] = useState<"start" | "end" | null>("start");
  const follow = (v: number) => {
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
    const e = -v < 2 ? "start" : -v > g.maxX - 2 ? "end" : null;
    setEdge((p) => (p === e ? p : e));
  };
  useMotionValueEvent(x, "change", follow);

  const walkTo = useCallback(
    (k: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      heading.current = k;
      el.scrollTo({ left: stops[k], behavior: reduced ? "auto" : "smooth" });
    },
    [stops, reduced]
  );

  /** Walks one stop left or right; returns the stop it went to, or null at an end. */
  const step = useCallback(
    (dir: 1 | -1) => {
      const el = scrollerRef.current;
      if (!el) return null;
      const from = heading.current ?? nearest(stops, el.scrollLeft);
      // An arch too near an end to be centred shares its stop with that end.
      let k = from + dir;
      while (k > 0 && k < stops.length - 1 && Math.abs(stops[k] - stops[from]) < 2) k += dir;
      if (k < 0 || k > stops.length - 1 || Math.abs(stops[k] - stops[from]) < 2) return null;
      walkTo(k);
      // The arrow for the way the wall can no longer go is about to be put
      // away; hand its focus to the other one.
      if (k === 0 && document.activeElement === prevRef.current) nextRef.current?.focus({ preventScroll: true });
      if (k === stops.length - 1 && document.activeElement === nextRef.current) prevRef.current?.focus({ preventScroll: true });
      return k;
    },
    [stops, walkTo]
  );

  // The arrow keys walk too. From an arch they go from arch to arch and take
  // the focus along, so Enter opens the one now in the middle; they stop at
  // the first and last arch rather than leave the focus on one walked past.
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if ((e.key !== "ArrowLeft" && e.key !== "ArrowRight") || e.altKey || e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const j = holeRefs.current.findIndex((b) => b !== null && b === document.activeElement);
    if (j < 0) {
      step(dir);
      return;
    }
    // Focusing the arch walks the wall to it (onFocusArch).
    holeRefs.current[j + dir]?.focus({ preventScroll: true });
  };

  const [layer, setLayer] = useState<{ i: number; rect: DOMRect } | null>(null);
  useScrollLock(layer !== null);
  const [hovered, setHovered] = useState<number | null>(null);

  const openArch = (i: number) => {
    const el = holeRefs.current[i];
    if (!el) return;
    setHovered(null);
    setLayer({ i, rect: el.getBoundingClientRect() });
  };

  // A link to a treatment (/behandlinger#rotfylling, as "Les mer" on the
  // front page and the footer use) walks the wall to its arch and goes
  // through it.
  const goThrough = useCallback(
    (i: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      // The wall is at the top of the page; coming back out of the arch
      // should find it there, not wherever the last page was scrolled to.
      window.scrollTo({ top: 0, behavior: "instant" });
      el.scrollLeft = stops[i + 1];
      x.set(-el.scrollLeft);
      requestAnimationFrame(() => requestAnimationFrame(() => openArch(i)));
    },
    [stops, x]
  );

  // Arriving with one: once, and only after the wall has been measured, or
  // the stops are still the guess.
  const arrived = useRef(false);
  useEffect(() => {
    const el = scrollerRef.current;
    if (arrived.current || !el || el.clientWidth !== g.vw) return;
    arrived.current = true;
    const i = slugIndex(window.location.hash);
    if (i >= 0) goThrough(i);
  }, [g.vw, goThrough]);

  // Following one from this page, from the footer: a hash change alone would
  // do nothing, so go up to the wall and through the arch here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^='/behandlinger#']");
      const href = a?.getAttribute("href");
      const i = href ? slugIndex(href.slice(href.indexOf("#"))) : -1;
      if (i < 0 || !href) return;
      e.preventDefault();
      window.history.pushState(null, "", href);
      goThrough(i);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [goThrough]);

  return (
    <>
      <section
        aria-label="Behandlinger"
        className="relative h-[100svh] overflow-hidden bg-[var(--color-paper)]"
        onKeyDown={onKeyDown}
      >
        <WalkArrow dir={-1} g={g} off={edge === "start"} btnRef={prevRef} onClick={() => step(-1)} />
        <WalkArrow dir={1} g={g} off={edge === "end"} btnRef={nextRef} onClick={() => step(1)} />

        {/* The wall slides sideways inside this. Its stops are snap points, so
            a swipe comes to rest with an arch in the middle, never between two. */}
        <div
          ref={scrollerRef}
          className="absolute inset-0 snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain bg-[var(--color-paper)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="relative" style={{ width: g.trackW, height: g.vh }}>
            {stops.map((s, k) => (
              <span key={k} aria-hidden="true" className="pointer-events-none absolute top-0 h-px w-px snap-start" style={{ left: s }} />
            ))}

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

            {/* Intro, painted on the wall. Hidden at first for everyone, as in
                the server's HTML, which cannot know the motion setting;
                reduced motion skips the rise instead. */}
            <div
              className="absolute flex flex-col justify-end"
              style={{ left: g.padL, top: g.top, width: g.introW, height: g.archH }}
            >
              <motion.h1
                className="font-sans font-extralight text-[var(--color-ink)]"
                style={{ fontSize: g.sm ? 56 : "clamp(64px, 7.4vw, 112px)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
              >
                Behandlinger
              </motion.h1>
              <motion.p
                className="mt-6 max-w-[34ch] text-balance text-[18px] leading-[1.5] text-[var(--color-text-secondary)] md:text-[20px]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 1, ease: EASE_OUT, delay: 0.3 }}
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
                onHover={(on) => setHovered((h) => (on ? i : h === i ? null : h))}
                refCb={(el) => {
                  holeRefs.current[i] = el;
                }}
                onOpen={() => openArch(i)}
                onFocusArch={() => {
                  // Focus can land on an arch that is off to the side; walk to it.
                  const el = scrollerRef.current;
                  if (el && Math.abs(el.scrollLeft - stops[i + 1]) > 2) walkTo(i + 1);
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
          </div>
        </div>
      </section>

      <AnimatePresence>
        {layer && (
          <Doorway
            key="doorway"
            start={layer}
            reduced={reduced}
            sm={g.sm}
            scenes={scenes}
            onIndex={(i) => setLayer((l) => (l ? { ...l, i } : l))}
            prepareClose={async (i) => {
              // Bring the arch you are leaving by to the middle of the wall.
              const el = scrollerRef.current;
              if (el) {
                heading.current = null;
                el.scrollLeft = stops[i + 1];
                x.set(-el.scrollLeft);
              }
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

/**
 * One of the two arrows: at the sides of the wall, level with the middle of
 * the arches, or on a phone side by side under the names. At either end of
 * the wall the one pointing off it is put away; on a phone it only fades, so
 * the pair still reads as a pair.
 */
function WalkArrow({
  dir, g, off, btnRef, onClick,
}: {
  dir: 1 | -1;
  g: Geo;
  off: boolean;
  btnRef: React.RefObject<HTMLButtonElement | null>;
  onClick: () => void;
}) {
  const size = g.sm ? 44 : 52;
  const place = g.sm
    ? { top: g.top + g.archH + g.labelH + ARROWS_SM - size, left: g.vw / 2 + (dir < 0 ? -size - 8 : 8) }
    : { top: g.top + g.archH / 2 - size / 2, ...(dir < 0 ? { left: 24 } : { right: 24 }) };
  return (
    <button
      ref={btnRef}
      type="button"
      aria-label={dir < 0 ? "Forrige behandling" : "Neste behandling"}
      onClick={onClick}
      disabled={off}
      className={`absolute z-10 grid place-items-center rounded-full bg-[var(--color-paper)] text-[var(--color-ink)] shadow-[0_0_0_1px_rgba(14,42,48,0.14),0_10px_24px_-14px_rgba(8,30,35,0.55)] transition-[opacity,background-color,scale] duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)] active:scale-95 disabled:pointer-events-none ${g.sm ? "disabled:opacity-35" : "disabled:opacity-0"}`}
      style={{ width: size, height: size, ...place }}
    >
      {dir < 0 ? <ArrowLeft className="size-5" aria-hidden="true" /> : <ArrowRight className="size-5" aria-hidden="true" />}
    </button>
  );
}

/** Distance of an arch's centre from the middle of the screen, in half-screens. */
function useArchDistance(i: number, g: Geo, x: MotionValue<number>) {
  return useTransform(x, (v) => (g.lefts[i] + g.archW / 2 + v - g.vw / 2) / (g.vw / 2));
}

// A scene plays while its arch is within this distance of the middle.
const SCENE_ZONE = 0.2;
// A scene is built while its arch is within this distance: the next one or
// two along on a phone, a few more on a wide screen.
const NEAR = 2;
// How long a scene takes to fold away once its arch leaves the middle, in ms.
const FOLDING = 800;

/**
 * The scene behind one arch. It is told when it is on stage, and only then
 * does it perform; the rest of the time the arch shows its plain colour.
 *
 * Only the scenes near the middle exist at all. Nine kept mounted cost the
 * page most of its start-up work, and their sheets were moved at every step
 * of the walk. A scene is built ahead of its arch, in a deferred render that
 * React puts together in short pieces between frames: built in one go as
 * the arch arrived, it held up a slow phone for a tenth of a second or more.
 * Built but off stage, it is hidden outright, and the room shows its colour
 * itself: folded sheets are still layers the browser would sort at every
 * step.
 */
const SceneRoom = memo(function SceneRoom({
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
  const [near, setNear] = useState(() => Math.abs(d.get()) < NEAR);
  useMotionValueEvent(d, "change", (v) => {
    const a = Math.abs(v);
    setCentred((c) => (c === a < SCENE_ZONE ? c : a < SCENE_ZONE));
    setNear((n) => (n === a < NEAR ? n : a < NEAR));
  });
  const on = centred || hovered;
  // Shown while on stage, and for as long as it takes to fold away after.
  const [shown, setShown] = useState(on);
  useEffect(() => {
    const t = setTimeout(() => setShown(on), on ? 0 : FOLDING);
    return () => clearTimeout(t);
  }, [on]);
  // Deferred, so the building happens in a background render that React
  // can break off for a frame; on stage, the scene is needed at once.
  const built = useDeferredValue(near || on || shown, false);
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
        background: Scene.ground,
      }}
    >
      {(built || on) && (
        <div className="absolute inset-0" style={{ display: on || shown ? undefined : "none" }}>
          <Scene active={on} d={d} reduced={reduced} mode="arch" />
        </div>
      )}
    </div>
  );
});

/** How far the jamb's sliding sheet reaches past the opening on every side. */
const JAMB_PAD = 40;
// The side of the jamb is an inset shadow whose inner edge lies 16px outside
// the opening (a spread of -16). On the sheet, which is JAMB_PAD larger all
// round, the same edge is its own edge pulled in by JAMB_PAD - 16.
const JAMB_SIDE = `inset 0 0 26px ${JAMB_PAD - 16}px rgba(8,30,35,0.42)`;
const JAMB_TOP = "inset 0 14px 22px -16px rgba(8,30,35,0.35), inset 0 0 0 1px rgba(14,42,48,0.10)";

function Arch({
  t, i, g, x, active, onHover, refCb, onOpen, onFocusArch,
}: {
  t: ArcadeTreatment;
  i: number;
  g: Geo;
  x: MotionValue<number>;
  active: boolean;
  onHover: (on: boolean) => void;
  refCb: (el: HTMLButtonElement | null) => void;
  onOpen: () => void;
  onFocusArch: () => void;
}) {
  const d = useArchDistance(i, g, x);
  // The inside of the opening: you see the jamb on the side facing you, and
  // it changes sides as the arch passes — the wall has a thickness. Reduced
  // motion holds it still in globals.css (.buegang-jamb), not here: the
  // server cannot know the setting, and its HTML must match the first render.
  const side = useTransform(d, (v) => Math.max(-1, Math.min(1, v)) * -18);

  return (
    <button
      ref={refCb}
      type="button"
      onClick={onOpen}
      onFocus={onFocusArch}
      // Only a pointer that can hover plays the scene early. A tap sends a
      // mouseenter too, and often no mouseleave, which left that arch's
      // scene playing after you had walked away from it.
      onPointerEnter={(e) => e.pointerType !== "touch" && onHover(true)}
      onPointerLeave={(e) => e.pointerType !== "touch" && onHover(false)}
      aria-label={`${t.title}. ${t.subtitle}`}
      className="group absolute cursor-pointer text-left outline-none"
      style={{ left: g.lefts[i], top: g.top, width: g.archW, height: g.archH + g.labelH }}
    >
      {/* Jamb shadow inside the opening. The side that changes is painted
          once, on a sheet larger than the opening that slides sideways inside
          it, so the shadow moves across without being drawn again. Redrawing
          a blurred shadow in every arch at every step of the walk was most of
          what the walk cost a phone. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 block overflow-hidden"
        style={{
          width: g.archW,
          height: g.archH,
          borderRadius: `${g.r}px ${g.r}px 0 0`,
          boxShadow: JAMB_TOP,
        }}
      >
        <motion.span
          className="buegang-jamb absolute block"
          style={{
            left: -JAMB_PAD,
            top: -JAMB_PAD,
            width: g.archW + 2 * JAMB_PAD,
            height: g.archH + 2 * JAMB_PAD,
            borderRadius: `${g.r + JAMB_PAD}px ${g.r + JAMB_PAD}px 0 0`,
            boxShadow: JAMB_SIDE,
            x: side,
            willChange: "transform",
          }}
        />
      </span>
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
          className="mt-1.5 block text-[14px] text-[var(--color-text-secondary)] transition-opacity duration-500"
          style={{ opacity: active ? 1 : 0 }}
        >
          {t.subtitle}
        </span>
      </span>
    </button>
  );
}

/* ───────────── Walking through ───────────── */

function Doorway({
  start, reduced, sm, scenes, onIndex, prepareClose, onClosed,
}: {
  start: { i: number; rect: DOMRect };
  reduced: boolean;
  sm: boolean;
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
  // The whole window, read when the opening grows rather than kept in state:
  // a phone's address bar changes the window's height as it comes and goes.
  const full = () => ({
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      await animate("[data-room-box]", full(), reduced ? { duration: 0.01 } : { duration: 1.05, ease: DOOR_EASE });
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
              ? sm
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
            initial={sm ? { y: "100%" } : { x: "100%" }}
            animate={sm ? { y: 0 } : { x: 0 }}
            exit={sm ? { y: "100%" } : { x: "100%" }}
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

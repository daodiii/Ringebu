"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PALETTES, PaperShadow, type PaletteName } from "@/components/behandlinger/scenes/Papir";
import { useViewport } from "@/components/behandlinger/hooks";
import { EASE_OUT, SYMPTOMS, type Symptom, type SymptomSlug } from "./data";
import { paperScene } from "./scenes/Scener";
import { THING_BOX, Thing } from "./scenes/Ting";

/**
 * Hverdagen. Eight ordinary things lie on the table in front of an arch: a
 * bar of chocolate, a toothbrush, an ice cube, a mirror, mints, floss, an
 * apple, a pillow. Each is the moment you would notice one of the symptoms.
 * Pick one up and put it in the arch (or just tap it): it flies in, grows to
 * the size of the paper theatre behind the opening and does its thing, and
 * the teeth answer with the symptom. The arch takes the solid colour of the
 * scene on show.
 */

const NAV = 72;
const EASE_DOOR = [0.76, 0, 0.24, 1] as const;

type Keys = { x?: number[]; y?: number[]; rotate?: number[]; duration: number };
type Place = {
  /** Where the thing's centre goes in the scene, in scene units (300 × 540). */
  at: [number, number];
  rot: number;
  act?: Keys;
  /** How it lies on the table: rotation, and a size override for long things. */
  rest: number;
  size?: number;
};

const PLACE: Record<SymptomSlug, Place> = {
  tannpine: { at: [150, 190], rot: -6, rest: -8, act: { y: [0, 42, 30, 42, 0], duration: 1.4 } },
  blodende: { at: [236, 420], rot: -8, rest: -32, size: 0.46, act: { x: [0, 34, 0, 34, 0, 34, 0, 34, 0], duration: 2.4 } },
  sensitive: { at: [150, 402], rot: 0, rest: 7, act: { x: [0, -2, 2, -2, 2, -1, 1, 0], duration: 1.1 } },
  hovne: { at: [62, 336], rot: -16, rest: -20, size: 0.56, act: { rotate: [-16, -6, -16], duration: 1.8 } },
  aande: { at: [150, 480], rot: 0, rest: 4, act: { y: [-110, 0, -22, 0, -6, 0], duration: 1.1 } },
  betennelse: { at: [248, 128], rot: 10, rest: -6 },
  lose: { at: [52, 306], rot: 0, rest: 12, act: { x: [0, 24, 0, 24, 0], duration: 1.1 } },
  kjeve: { at: [150, 488], rot: 0, rest: -5, act: { y: [-60, 0, -10, 0], duration: 0.9 } },
};

// The floss stays the scene's own: the dispenser only parks beside it.
const KEEP_PUPPET: Partial<Record<SymptomSlug, true>> = { betennelse: true };
// The healthy teeth shown before anything is picked.
const IDLE: PaletteName = "eukalyptus";
// Things that hop now and then until someone picks one up.
const TEASERS: SymptomSlug[] = ["sensitive", "blodende", "lose"];

export function Hverdagen() {
  const vp = useViewport();
  const reduced = useReducedMotion() ?? false;
  const sm = vp.w < 900;

  const stageW = sm ? vp.w - 40 : Math.round(vp.w * 0.62);
  const archW = sm ? Math.round(Math.min(300, vp.w * 0.66)) : Math.round(Math.min(440, Math.max(300, stageW * 0.46)));
  const archH = sm ? Math.round(archW * 1.3) : Math.round(Math.min(archW * 1.42, vp.h - NAV - 230));
  const floorW = sm ? vp.w - 40 : Math.min(stageW - 40, 900);

  const archRef = useRef<HTMLDivElement | null>(null);
  // Off screen, the scene in the arch and the hopping on the table stop, so
  // reading the list below costs nothing.
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef);
  const still = useMotionValue(0);
  const [placed, setPlaced] = useState<SymptomSlug | null>(null);
  const [over, setOver] = useState(false);
  const [touched, setTouched] = useState(false);
  const [nudge, setNudge] = useState<SymptomSlug | null>(null);

  // Until the first touch, one thing now and then hops towards the arch.
  useEffect(() => {
    if (touched || reduced || !inView) return;
    let i = 0;
    let t = setTimeout(function hop() {
      setNudge(TEASERS[i % TEASERS.length]);
      i++;
      t = setTimeout(() => {
        setNudge(null);
        t = setTimeout(hop, 3600);
      }, 1400);
    }, 2600);
    return () => clearTimeout(t);
  }, [touched, reduced, inView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaced(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = placed ? SYMPTOMS.find((s) => s.slug === placed)! : null;
  const Scene = useMemo(
    () => (current ? paperScene(current.slug, current.palette, false) : paperScene("frisk", IDLE, false)),
    [current]
  );
  const ground = PALETTES[current?.palette ?? IDLE].ground;

  const isOverArch = useCallback((x: number, y: number) => {
    const r = archRef.current?.getBoundingClientRect();
    if (!r) return false;
    return x > r.left - 30 && x < r.right + 30 && y > r.top - 30 && y < r.bottom + 40;
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Symptomer"
      className="relative overflow-hidden bg-[var(--color-paper)]"
      style={{ minHeight: sm ? undefined : Math.max(760, vp.h), paddingTop: NAV }}
    >
      <div className={sm ? "flex flex-col" : "grid"} style={sm ? undefined : { gridTemplateColumns: `${stageW}px 1fr`, height: Math.max(760, vp.h) - NAV }}>
        {/* The arch and the table */}
        <div className="relative flex flex-col items-center justify-end pb-8" style={sm ? { paddingTop: 24 } : undefined}>
          <motion.div
            ref={archRef}
            className="relative overflow-hidden"
            style={{ width: archW, height: archH, borderRadius: `${archW / 2}px ${archW / 2}px 0 0` }}
            animate={{ scale: over ? 1.025 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {/* Under the crossfading scenes, so the colour never dips towards the page */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              initial={false}
              animate={{ backgroundColor: ground }}
              transition={{ duration: reduced ? 0 : 0.5 }}
            />
            <AnimatePresence initial={false}>
              <motion.div
                key={current?.slug ?? "frisk"}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.5 }}
              >
                <Scene active={inView} d={still} reduced={reduced} mode="door" puppet={!!(current && KEEP_PUPPET[current.slug])} />
              </motion.div>
            </AnimatePresence>
            {/* The jamb: the wall has a thickness */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: `${archW / 2}px ${archW / 2}px 0 0`,
                boxShadow: "inset 14px 0 26px -16px rgba(8,30,35,0.42), inset -14px 0 26px -16px rgba(8,30,35,0.32), inset 0 14px 22px -16px rgba(8,30,35,0.35), inset 0 0 0 1px rgba(14,42,48,0.10)",
              }}
            />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ borderRadius: `${archW / 2}px ${archW / 2}px 0 0`, boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.9)" }}
              animate={{ opacity: over ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          {/* The table edge the things lie on */}
          <div aria-hidden="true" className="h-px w-full" style={{ maxWidth: floorW + 60, background: "rgba(14,42,48,0.14)" }} />
          <div className={sm ? "mt-4 grid w-full grid-cols-4 gap-y-2" : "mt-5 grid w-full grid-cols-8"} style={{ maxWidth: floorW }}>
            {SYMPTOMS.map((s, i) => (
              <Ting
                key={s.slug}
                s={s}
                i={i}
                slotW={sm ? floorW / 4 : floorW / 8}
                placed={placed === s.slug}
                nudge={nudge === s.slug}
                reduced={reduced}
                archRef={archRef}
                archW={archW}
                archH={archH}
                isOverArch={isOverArch}
                onOver={setOver}
                onTouch={() => setTouched(true)}
                onPlace={() => setPlaced(s.slug)}
                onHome={() => setPlaced((p) => (p === s.slug ? null : p))}
              />
            ))}
          </div>
        </div>

        {/* The words */}
        <div className="relative flex flex-col justify-center py-10 pr-[max(32px,calc((100vw-1280px)/2+36px))]" style={sm ? { padding: "8px 20px 64px" } : { paddingLeft: 8 }}>
          <motion.h1
            className="font-sans font-extralight text-[var(--color-ink)]"
            initial={false}
            animate={{ fontSize: current ? (sm ? 26 : 34) : sm ? 44 : 76, letterSpacing: current ? "-0.03em" : "-0.05em" }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE_DOOR }}
            style={{ lineHeight: 0.95 }}
          >
            Har du noen av disse plagene?
          </motion.h1>
          {/* Room for the tallest symptom, so the heading stands still from one
              to the next; grows as the heading shrinks, so the intro sits centred. */}
          <div
            className="relative mt-6"
            style={{
              minHeight: sm ? undefined : current ? 560 : 140,
              // A CSS transition: framer left this min-height where it started.
              transition: reduced ? undefined : "min-height 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
            }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={current?.slug ?? "intro"}
                className={sm ? "" : "absolute inset-x-0 top-0"}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT, delay: 0.15 } }}
                exit={reduced ? undefined : { opacity: 0, y: -10, transition: { duration: 0.22, ease: "easeIn" } }}
              >
                {current ? (
                  <Detail s={current} sm={sm} />
                ) : (
                  <p className="max-w-[32ch] leading-[1.5] text-[var(--color-text-secondary)]" style={{ fontSize: sm ? 19 : 26 }}>
                    Åtte vanlige plager. Hva de betyr.
                  </p>
                )}
                <KontaktOss />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function KontaktOss() {
  return (
    <Link href="/kontakt" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[14px] font-semibold text-white">
      Kontakt oss <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

/** One long word, like Tannkjøttbetennelse, is set smaller so it fits the column. */
const titleSize = (t: string) => (!t.includes(" ") && t.length > 12 ? "clamp(38px, 3.9vw, 58px)" : "clamp(48px, 5.4vw, 84px)");

function Detail({ s, sm }: { s: Symptom; sm: boolean }) {
  const p = PALETTES[s.palette];
  return (
    <div className={sm ? "max-w-[520px]" : "max-w-[620px]"}>
      <p className="leading-[1.4]" style={{ color: p.deep, fontSize: sm ? 20 : 24 }}>
        {s.moment}
      </p>
      <h2 className="mt-4 font-sans font-light text-[var(--color-ink)]" style={{ fontSize: sm ? 36 : titleSize(s.title), letterSpacing: "-0.045em", lineHeight: 0.98 }}>
        {s.title}
      </h2>
      <p className="mt-6 leading-[1.55] text-[var(--color-text-secondary)]" style={{ fontSize: sm ? 18 : 22 }}>{s.description}</p>
      <ul className={sm ? "mt-6 grid grid-cols-2 gap-x-6 gap-y-2" : "mt-8 grid grid-cols-2 gap-x-8 gap-y-3"}>
        {s.causes.map((c) => (
          <li key={c} className="flex items-baseline gap-2.5 text-[var(--color-text-primary)]" style={{ fontSize: sm ? 15.5 : 19 }}>
            <span aria-hidden="true" className="inline-block size-1.5 shrink-0 translate-y-[-2px] rounded-full" style={{ background: p.accent }} />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── One thing on the table ───────────── */

function Ting({
  s, i, slotW, placed, nudge, reduced, archRef, archW, archH, isOverArch, onOver, onTouch, onPlace, onHome,
}: {
  s: Symptom;
  i: number;
  slotW: number;
  placed: boolean;
  nudge: boolean;
  reduced: boolean;
  archRef: React.RefObject<HTMLDivElement | null>;
  archW: number;
  archH: number;
  isOverArch: (x: number, y: number) => boolean;
  onOver: (on: boolean) => void;
  onTouch: () => void;
  onPlace: () => void;
  onHome: () => void;
}) {
  const place = PLACE[s.slug];
  const box = THING_BOX[s.slug];
  const p = PALETTES[s.palette];
  // Size on the table, in pixels per scene unit.
  const unit = place.size ?? Math.min((slotW - 18) / box[2], 84 / box[3], 1);
  // Size in the arch: the scene's own scale.
  const sceneUnit = Math.min(archW / 300, archH / 540);

  const slotRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(place.rest);
  const vx = useVelocity(x);
  const tilt = useSpring(useTransform(vx, [-1600, 1600], [-22, 22], { clamp: true }), { stiffness: 300, damping: 30 });
  const [dragging, setDragging] = useState(false);
  const dragged = useRef(false);
  const [version, setVersion] = useState(0);

  /** Offset from the table to this thing's spot in the arch. */
  const target = useCallback(() => {
    const a = archRef.current?.getBoundingClientRect();
    const h = slotRef.current?.getBoundingClientRect();
    if (!a || !h) return null;
    const offX = (archW - 300 * sceneUnit) / 2;
    const offY = (archH - 540 * sceneUnit) / 2;
    return {
      dx: a.left + offX + place.at[0] * sceneUnit - (h.left + h.width / 2),
      dy: a.top + offY + place.at[1] * sceneUnit - (h.top + h.height / 2),
      scale: sceneUnit / unit,
    };
  }, [archRef, archW, archH, sceneUnit, unit, place.at]);

  // Go where we belong: into the arch and act, or home to the table.
  useEffect(() => {
    let stop = false;
    const spring = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 120, damping: 17, mass: 0.9 };
    (async () => {
      if (placed) {
        const t = target();
        if (!t) return;
        await Promise.all([
          animate(x, t.dx, spring),
          animate(y, t.dy, spring),
          animate(scale, t.scale, spring),
          animate(rotate, place.rot, spring),
        ]);
        if (stop || reduced || !place.act) return;
        const a = place.act;
        const k = sceneUnit;
        await Promise.all([
          a.x ? animate(x, a.x.map((v) => t.dx + v * k), { duration: a.duration, ease: "easeInOut" }) : null,
          a.y ? animate(y, a.y.map((v) => t.dy + v * k), { duration: a.duration, ease: "easeInOut" }) : null,
          a.rotate ? animate(rotate, a.rotate, { duration: a.duration, ease: "easeInOut" }) : null,
        ]);
      } else {
        await Promise.all([
          animate(x, 0, spring),
          animate(y, 0, spring),
          animate(scale, 1, spring),
          animate(rotate, place.rest, spring),
        ]);
      }
    })();
    return () => {
      stop = true;
    };
    // `version` re-runs this after every drag, even when the answer is the same.
  }, [placed, version, reduced, target, x, y, scale, rotate, place, sceneUnit]);

  // The teaser hop, towards the arch.
  useEffect(() => {
    if (!nudge || placed || reduced) return;
    const t = target();
    const dir = t ? Math.sign(t.dx) || 1 : 1;
    const c1 = animate(y, [0, -34, 0, -12, 0], { duration: 1.2, ease: "easeOut" });
    const c2 = animate(x, [0, dir * 22, dir * 10, 0], { duration: 1.2, ease: "easeInOut" });
    const c3 = animate(rotate, [place.rest, place.rest - dir * 12, place.rest + dir * 5, place.rest], { duration: 1.2 });
    return () => {
      c1.stop();
      c2.stop();
      c3.stop();
    };
  }, [nudge, placed, reduced, target, x, y, rotate, place.rest]);

  // A relayout moves the arch; put a placed thing straight back on its spot.
  useEffect(() => {
    if (!placed) return;
    const t = target();
    if (!t) return;
    x.jump(t.dx);
    y.jump(t.dy);
    scale.jump(t.scale);
    // Only when the geometry changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archW, archH, slotW]);

  const [bx, by, bw, bh] = box;
  const pointerOf = (e: MouseEvent | TouchEvent | PointerEvent) =>
    "touches" in e ? e.changedTouches[0] : (e as PointerEvent);

  return (
    <div ref={slotRef} className="relative flex h-[104px] items-center justify-center">
      <motion.button
        type="button"
        aria-label={`${s.thing}: ${s.title}`}
        aria-pressed={placed}
        className="relative cursor-grab touch-none outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-paper)]"
        style={{ x, y, scale, rotate, zIndex: dragging || placed ? 40 : 1, width: bw * unit, height: bh * unit }}
        // Hidden at first for everyone, as in the server's HTML, which cannot
        // know the motion setting; reduced motion skips the fade and the fall.
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.4, delay: 0.3 + i * 0.08 }}
        drag
        dragMomentum={false}
        onDragStart={() => {
          dragged.current = true;
          setDragging(true);
          onTouch();
        }}
        onDrag={(e) => {
          const pt = pointerOf(e);
          onOver(isOverArch(pt.clientX, pt.clientY));
        }}
        onDragEnd={(e) => {
          const pt = pointerOf(e);
          const inside = isOverArch(pt.clientX, pt.clientY);
          onOver(false);
          setDragging(false);
          if (inside) onPlace();
          else onHome();
          setVersion((v) => v + 1);
          setTimeout(() => (dragged.current = false), 0);
        }}
        onClick={() => {
          if (dragged.current) return;
          onTouch();
          if (placed) onHome();
          else onPlace();
        }}
        whileHover={placed || reduced ? undefined : { y: -6 }}
      >
        {/* Falls onto the table, and tilts in the hand */}
        <motion.span
          className="absolute inset-0 block"
          initial={{ y: -70, rotate: -14 }}
          animate={{ y: 0, rotate: 0 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 11, delay: 0.3 + i * 0.08 }}
        >
        <motion.span className="absolute inset-0 block" style={{ rotate: tilt }}>
          <svg viewBox={`${bx} ${by} ${bw} ${bh}`} className="h-full w-full overflow-visible" aria-hidden="true">
            {/* Its shadow on the table, falling further off while it is held */}
            <motion.g initial={false} animate={{ y: dragging ? 14 : 0 }} transition={{ duration: 0.2 }}>
              <PaperShadow dy={6}>
                <Thing slug={s.slug} p={p} />
              </PaperShadow>
            </motion.g>
            <Thing slug={s.slug} p={p} />
          </svg>
        </motion.span>
        </motion.span>
      </motion.button>
    </div>
  );
}

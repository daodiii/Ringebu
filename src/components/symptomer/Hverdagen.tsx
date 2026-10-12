"use client";

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

import { PALETTES, PaperShadow, type PaletteName } from "@/components/behandlinger/scenes/Papir";
import { useScrollLock, useViewport } from "@/components/behandlinger/hooks";
import { EASE_OUT, SYMPTOMS, type Symptom, type SymptomSlug } from "./data";
import { paperScene } from "./scenes/Scener";
import { THING_BOX, Thing } from "./scenes/Ting";
import { Handlinger } from "@/components/kontakt/Handlinger";
import { Hjelp } from "./Hjelp";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

/**
 * Hverdagen. Eight ordinary things lie on the table in front of an arch: a
 * bar of chocolate, a toothbrush, an ice cube, a mirror, mints, floss, an
 * apple, a pillow. Each is the moment you would notice one of the symptoms.
 * Pick one up and put it in the arch (or just tap it): it flies in, grows to
 * the size of the paper theatre behind the opening and does its thing, and
 * the teeth answer with the symptom. The arch takes the solid colour of the
 * scene on show.
 *
 * On a phone the words would land under the table, a scroll past the other
 * things away; there they rise in a sheet over the table instead, under the
 * arch, and the sheet steps on through the others.
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
  lose: { at: [52, 306], rot: 0, rest: 12, act: { x: [0, 24, 0, 24, 0], duration: 1.1 } },
  kjeve: { at: [150, 488], rot: 0, rest: -5, act: { y: [-60, 0, -10, 0], duration: 0.9 } },
};

// The healthy teeth shown before anything is picked.
const IDLE: PaletteName = "eukalyptus";
// Things that hop now and then until someone picks one up.
const TEASERS: SymptomSlug[] = ["sensitive", "blodende", "lose"];

export function Hverdagen() {
  const vp = useViewport();
  const reduced = useReducedMotion() ?? false;
  const sm = vp.w < 900;
  // A short desktop window (a 768px-tall laptop): the same words, closer together.
  const short = !sm && vp.h < 860;

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
  // On a phone the symptom shows in the sheet; the words under the table keep the intro.
  const shown = sm ? null : current;
  const sheet = sm && current !== null;
  useScrollLock(sheet);

  // The arch up under the menu, so the sheet leaves it in view.
  const place = useCallback(
    (slug: SymptomSlug) => {
      setPlaced(slug);
      if (!sm || !sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      if (Math.abs(top) > 2) window.scrollBy({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [sm, reduced]
  );
  const step = useCallback(
    (by: number) =>
      setPlaced((p) => {
        const i = SYMPTOMS.findIndex((s) => s.slug === p);
        return SYMPTOMS[(i + by + SYMPTOMS.length) % SYMPTOMS.length].slug;
      }),
    []
  );
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
      // Until the window is measured the sizes are a desktop guess; shown on
      // a phone, the stage would be laid out once wrong and then jump.
      className={`relative overflow-hidden bg-[var(--color-paper)] ${vp.ready ? "" : "*:invisible"}`}
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
                <Scene active={inView} d={still} reduced={reduced} mode="door" puppet={false} />
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
          <div className={sm ? "mt-4 grid w-full grid-cols-4 gap-y-2" : "mt-5 grid w-full grid-cols-7"} style={{ maxWidth: floorW }}>
            {SYMPTOMS.map((s, i) => (
              <Ting
                key={s.slug}
                s={s}
                i={i}
                slotW={sm ? floorW / 4 : floorW / 7}
                placed={placed === s.slug}
                nudge={nudge === s.slug}
                reduced={reduced}
                archRef={archRef}
                archW={archW}
                archH={archH}
                isOverArch={isOverArch}
                onOver={setOver}
                onTouch={() => setTouched(true)}
                onPlace={() => place(s.slug)}
                onHome={() => setPlaced((p) => (p === s.slug ? null : p))}
              />
            ))}
          </div>
        </div>

        {/* The words */}
        <div className={`relative flex flex-col justify-center ${short ? "py-6" : "py-10"} pr-[max(32px,calc((100vw-1280px)/2+36px))]`} style={sm ? { padding: "8px 20px 64px" } : { paddingLeft: 8 }}>
          {/* The page title (.display-page sizes), smaller while a symptom is on show */}
          <motion.h1
            className="font-sans font-medium text-[var(--color-ink)]"
            initial={false}
            animate={{ fontSize: shown ? 34 : sm ? 40 : 64, letterSpacing: shown ? "-0.03em" : "-0.035em" }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE_DOOR }}
            style={{ lineHeight: 1 }}
          >
            Har du noen av disse plagene?
          </motion.h1>
          {/* Room for the tallest symptom, so the heading stands still from one
              to the next; grows as the heading shrinks, so the intro sits centred. */}
          <div
            className="relative mt-6"
            style={{
              minHeight: sm ? undefined : shown ? (short ? 560 : 620) : 140,
              // A CSS transition: framer left this min-height where it started.
              transition: reduced ? undefined : "min-height 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
            }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={shown?.slug ?? "intro"}
                className={sm ? "" : "absolute inset-x-0 top-0"}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT, delay: 0.15 } }}
                exit={reduced ? undefined : { opacity: 0, y: -10, transition: { duration: 0.22, ease: "easeIn" } }}
              >
                {shown ? (
                  <Detail s={shown} sm={sm} short={short} />
                ) : (
                  <p className="max-w-[32ch] leading-[1.5] text-[var(--color-text-secondary)]" style={{ fontSize: sm ? 19 : 26 }}>
                    Sju vanlige plager. Hva de betyr.
                  </p>
                )}
                <KontaktOss short={short} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {sheet && current && (
          <Ark
            key="ark"
            s={current}
            reduced={reduced}
            top={NAV + 24 + archH + 12}
            vh={vp.h}
            onClose={() => setPlaced(null)}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Arket: a phone's sheet with the symptom in the arch. It rises once the
 * thing has landed, up to the arch's foot so the teeth stay in view, and is
 * pulled up by its top (or a scroll in it) to read the rest. It goes with
 * the close button, a pull down past its first height, or a tap anywhere
 * above it; the thing goes home.
 */
function Ark({
  s, reduced, top, vh, onClose, onStep,
}: {
  s: Symptom;
  reduced: boolean;
  /** Where the arch ends with the page scrolled to it, in pixels from the top of the window. */
  top: number;
  vh: number;
  onClose: () => void;
  onStep: (by: number) => void;
}) {
  // Two heights: down to the arch's foot (on a short phone a little over it), and most of the window.
  const full = Math.round(vh * 0.88);
  const low = Math.min(full, Math.max(200, vh - top));
  const h = useMotionValue(low);
  const [open, setOpen] = useState(false);
  const from = useRef(low);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
  }, []);

  const snap = useCallback(
    (up: boolean) => {
      setOpen(up);
      animate(h, up ? full : low, reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 38 });
    },
    [h, full, low, reduced]
  );

  return (
    <>
      {/* Above the sheet: a tap here puts the thing back */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[55] touch-none"
        onClick={onClose}
        exit={{ opacity: 0 }}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={s.title}
        className="fixed inset-x-0 bottom-0 z-[60] flex flex-col rounded-t-[22px] bg-[var(--color-paper)] shadow-[0_-24px_60px_-28px_rgba(8,30,35,0.5)]"
        style={{ height: h }}
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: reduced ? { duration: 0 } : { duration: 0.55, ease: EASE_DOOR, delay: 0.55 } }}
        exit={{ y: "100%", transition: { duration: reduced ? 0 : 0.35, ease: EASE_DOOR } }}
      >
        {/* The top: pull it up to read on, down to close */}
        <motion.div
          className="shrink-0 touch-none px-4 pb-1 pt-1.5"
          onPanStart={() => (from.current = h.get())}
          onPan={(_, info) => h.set(Math.min(full, Math.max(0, from.current - info.offset.y)))}
          onPanEnd={(_, info) => {
            const now = h.get();
            if (now < low - 70 || (!open && info.velocity.y > 500)) onClose();
            else snap(info.velocity.y < -300 || (info.velocity.y <= 300 && now > (low + full) / 2));
          }}
        >
          <button
            type="button"
            aria-label={open ? "Vis mindre" : "Vis mer"}
            aria-expanded={open}
            onClick={() => snap(!open)}
            className="mx-auto flex h-5 w-16 items-center justify-center outline-none"
          >
            <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-[rgba(14,42,48,0.2)]" />
          </button>
          <div className="flex items-center justify-between">
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center gap-2 px-1 text-[14px] font-medium text-[var(--color-ink)] outline-none focus-visible:underline"
            >
              <X className="size-4" aria-hidden="true" />
              Legg tilbake
            </button>
            <div className="flex gap-1">
              <IconBtn label="Forrige" onClick={() => onStep(-1)}>
                <ArrowLeft className="size-4" aria-hidden="true" />
              </IconBtn>
              <IconBtn label="Neste" onClick={() => onStep(1)}>
                <ArrowRight className="size-4" aria-hidden="true" />
              </IconBtn>
            </div>
          </div>
        </motion.div>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(32px,env(safe-area-inset-bottom))] pt-2"
          // Reading on lifts the sheet the rest of the way
          onScroll={(e) => {
            if (!open && e.currentTarget.scrollTop > 16) snap(true);
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={s.slug}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } }}
              exit={reduced ? undefined : { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } }}
            >
              <Detail s={s} sm short={false} />
            </motion.div>
          </AnimatePresence>
          {/* Either way out of the sheet: a call, or down the page to the form */}
          <div onClickCapture={onClose}>
            <KontaktOss short={false} />
          </div>
        </div>
      </motion.aside>
    </>
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

function KontaktOss({ short }: { short: boolean }) {
  return (
    <Handlinger className={short ? "mt-6" : "mt-8"} />
  );
}

/** A long name is set smaller so it fits the column. */
const titleSize = (t: string) => (!t.includes(" ") && t.length > 12 ? "clamp(38px, 3.9vw, 58px)" : "clamp(48px, 5.4vw, 84px)");

function Detail({ s, sm, short }: { s: Symptom; sm: boolean; short: boolean }) {
  const p = PALETTES[s.palette];
  return (
    <div className={sm ? "max-w-[520px]" : "max-w-[620px]"}>
      <p className="leading-[1.4]" style={{ color: p.deep, fontSize: sm ? 20 : 24 }}>
        {s.moment}
      </p>
      <h2 className={`${short ? "mt-3" : "mt-4"} font-sans font-light text-[var(--color-ink)]`} style={{ fontSize: sm ? 36 : titleSize(s.title), letterSpacing: "-0.045em", lineHeight: 0.98 }}>
        {s.title}
      </h2>
      <p className={`${short ? "mt-4" : "mt-6"} leading-[1.55] text-[var(--color-text-secondary)]`} style={{ fontSize: sm ? 18 : 22 }}>{s.description}</p>
      <ul className={sm ? "mt-6 grid grid-cols-2 gap-x-6 gap-y-2" : short ? "mt-5 grid grid-cols-2 gap-x-8 gap-y-2" : "mt-8 grid grid-cols-2 gap-x-8 gap-y-3"}>
        {s.causes.map((c) => (
          <li key={c} className="flex items-baseline gap-2.5 text-[var(--color-text-primary)]" style={{ fontSize: sm ? 15.5 : 19 }}>
            <span aria-hidden="true" className="inline-block size-1.5 shrink-0 translate-y-[-2px] rounded-full" style={{ background: p.accent }} />
            {c}
          </li>
        ))}
      </ul>
      <Hjelp s={s} size={sm ? 16 : 18} className={short ? "mt-5" : "mt-7"} />
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

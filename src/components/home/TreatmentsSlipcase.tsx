"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ARCADE_TREATMENTS } from "@/components/behandlinger/data";
import { PapirKrone, PapirSpeil, withPalette } from "@/components/behandlinger/scenes/Papir";
import { PapirHerdelampe, PapirImplantatSnitt, PapirRotfil } from "@/components/behandlinger/scenes/PapirMer";
import type { Scene } from "@/components/behandlinger/scenes/types";
import { PlayOnce } from "@/components/behandlinger/scenes/usePhase";

/**
 * "Dette kan vi hjelpe deg med." The first five treatments from /behandlinger,
 * as boxes side by side: the closed ones run white to cream, the open one
 * turns petrol (darkest on the left, a step lighter to the right) and gains
 * an arched window where that treatment's paper theatre pops up, in the same
 * scene and paper as its arch on /behandlinger. The scene plays its routine
 * once and then holds still: on the front page only the book and the pasture
 * keep moving.
 */

type Spine = {
  id: string;
  name: string;
  body: string;
  detail: string;
  closedTone: string;
  openTone: string;
  Scene: Scene;
};

// Each box: its closed and open tones, and its scene in its own paper. The
// copy comes from /behandlinger, so the two pages cannot drift apart.
const BOXES: ReadonlyArray<{ slug: string; closedTone: string; openTone: string; Scene: Scene }> = [
  { slug: "forebyggende-behandling", closedTone: "#FFFFFF", openTone: "#0E2A30", Scene: withPalette(PapirSpeil, "fjord", true) },
  { slug: "fyllingsterapi", closedTone: "#F9F6EF", openTone: "#193B3F", Scene: withPalette(PapirHerdelampe, "lav", true) },
  { slug: "rotfylling", closedTone: "#F3ECDF", openTone: "#254C4E", Scene: withPalette(PapirRotfil, "bjork", true) },
  { slug: "kroner-og-broer", closedTone: "#ECE3CF", openTone: "#305D5D", Scene: withPalette(PapirKrone, "lyng", true) },
  { slug: "tannimplantater", closedTone: "#E6DABF", openTone: "#3B6E6C", Scene: withPalette(PapirImplantatSnitt, "frost", true) },
];

const SPINES: ReadonlyArray<Spine> = BOXES.map(({ slug, ...box }) => {
  const t = ARCADE_TREATMENTS.find((a) => a.slug === slug);
  if (!t) throw new Error(`No treatment "${slug}" on /behandlinger`);
  return { id: slug, name: t.title, body: t.subtitle, detail: t.description, ...box };
});

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * The arched window a scene plays in. The scene only plays while the window
 * is on screen: its loops repaint shadowed paper every frame, and they used
 * to run on however far down the page you had scrolled.
 */
function Window({ spine, active, tilt, reduced }: { spine: Spine; active: boolean; tilt: MotionValue<number>; reduced: boolean }) {
  const { Scene } = spine;
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      data-still
      className="relative h-full overflow-hidden rounded-t-full shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)] ring-1 ring-white/15"
      style={{ aspectRatio: "300 / 540" }}
    >
      <PlayOnce.Provider value>
        <Scene active={active && inView} d={tilt} reduced={reduced} mode="arch" />
      </PlayOnce.Provider>
    </div>
  );
}

export function TreatmentsSlipcase() {
  const [openId, setOpenId] = useState<string>(SPINES[0].id);
  const reduced = useReducedMotion() ?? false;
  // The scenes stand still in their boxes: no lean with the pointer.
  const tilt = useMotionValue(0);
  // A box opened from the keyboard: its heading takes the focus once it is in.
  const focusOpened = useRef("");

  const open = (id: string) => {
    if (id === openId) return;
    setOpenId(id);
  };

  return (
    <section id="behandlinger" className="bg-[var(--color-paper)] pb-[var(--space-section-tight)] pt-[var(--space-chapter)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <div className="mb-10 md:mb-14">
          <h2 className="display-section max-w-[30ch] text-balance text-[var(--color-text-primary)]">
            Dette kan vi hjelpe deg med.
          </h2>
        </div>

        {/* Desktop. A closed box is a button; the open one is content, with its
            «Les mer» link, so no control sits inside another (the whole box was
            once a focusable tab with the link inside it). A box opened from the
            keyboard hands focus to its heading, since its button goes inert. */}
        <div className="hidden h-[520px] gap-2 md:flex">
          {SPINES.map((spine, i) => {
            const isOpen = openId === spine.id;
            return (
              <motion.div
                key={spine.id}
                onMouseEnter={() => open(spine.id)}
                animate={{ flex: isOpen ? 7 : 1 }}
                transition={reduced ? { duration: 0 } : { duration: 0.7, ease: EASE }}
                style={{ backgroundColor: isOpen ? spine.openTone : spine.closedTone }}
                className={`relative overflow-hidden border-l border-[var(--color-rule)] text-left transition-colors ${
                  isOpen ? "text-white" : "text-[var(--color-text-primary)]"
                } ${i === SPINES.length - 1 ? "border-r border-[var(--color-rule)]" : ""}`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute left-0 right-0 top-0 h-px transition-colors duration-500 ${
                    isOpen ? "bg-[var(--color-amber)]" : "bg-[var(--color-brass)]/40"
                  }`}
                />

                <button
                  type="button"
                  aria-expanded={isOpen}
                  inert={isOpen}
                  onClick={(e) => {
                    // detail is 0 when Enter or Space pressed the button
                    if (e.detail === 0) focusOpened.current = spine.id;
                    open(spine.id);
                  }}
                  className={`absolute inset-0 flex cursor-pointer flex-col items-center justify-center px-2 outline-none transition-opacity duration-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-ink)] ${
                    isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span
                    className="font-sans text-[16px] font-medium tracking-[-0.01em]"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {spine.name}
                  </span>
                </button>

                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      key="expanded"
                      // Hidden at first for everyone, as in the server's HTML:
                      // the server cannot know the motion setting. Reduced
                      // motion skips the fade instead.
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.15, ease: EASE }}
                      className="relative flex h-full gap-8 p-8 md:p-10"
                    >
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <h3
                          tabIndex={-1}
                          ref={(el) => {
                            if (el && focusOpened.current === spine.id) {
                              focusOpened.current = "";
                              el.focus();
                            }
                          }}
                          className="text-balance font-sans text-white outline-none"
                          style={{ fontWeight: 400, fontSize: "clamp(32px, 2.8vw, 44px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}
                        >
                          {spine.name}
                        </h3>
                        <div className="max-w-[420px]">
                          <p className="text-[21px] font-medium leading-[1.35] tracking-[-0.01em] text-white">{spine.body}</p>
                          <p className="mt-4 text-[16px] leading-[1.6] text-[var(--color-amber)]">{spine.detail}</p>
                          <Link
                            href={`/behandlinger#${spine.id}`}
                            className="group mt-8 inline-flex items-center gap-2 text-[16px] font-semibold text-white"
                          >
                            Les mer
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                      <Window spine={spine} active tilt={tilt} reduced={reduced} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: the same boxes stacked; the open one shows its window above the text */}
        <div className="flex flex-col gap-2 md:hidden">
          {SPINES.map((spine) => {
            const isOpen = openId === spine.id;
            return (
              <div key={spine.id} className="relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className={`absolute left-0 right-0 top-0 z-10 h-px transition-colors duration-500 ${
                    isOpen ? "bg-[var(--color-amber)]" : "bg-[var(--color-brass)]/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : spine.id)}
                  aria-expanded={isOpen}
                  style={{ backgroundColor: isOpen ? spine.openTone : spine.closedTone }}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-500 ${
                    isOpen ? "text-white" : "text-[var(--color-text-primary)]"
                  }`}
                >
                  <span
                    className="font-sans tracking-[-0.025em]"
                    style={{ fontWeight: isOpen ? 400 : 500, fontSize: isOpen ? "clamp(28px, 7vw, 34px)" : "21px", lineHeight: 1.05 }}
                  >
                    {spine.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`size-2 shrink-0 rounded-full transition-transform duration-500 ${
                      isOpen ? "rotate-45 bg-[var(--color-amber)]" : "bg-[var(--color-brass)]"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      style={{ backgroundColor: spine.openTone }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-8 pt-2">
                        <div className="mx-auto mb-7 h-[300px]" style={{ aspectRatio: "300 / 540" }}>
                          <Window spine={spine} active tilt={tilt} reduced={reduced} />
                        </div>
                        <p className="text-[19px] font-medium leading-[1.35] text-white">{spine.body}</p>
                        <p className="mt-3 text-[16px] leading-[1.6] text-[var(--color-amber)]">{spine.detail}</p>
                        <Link
                          href={`/behandlinger#${spine.id}`}
                          className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-white"
                        >
                          Les mer
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/behandlinger"
            className="group inline-flex items-center gap-2 text-[17px] font-semibold text-[var(--color-text-primary)] underline decoration-[rgba(14,42,48,0.25)] underline-offset-[6px] transition-colors hover:decoration-[var(--color-ink)]"
          >
            Se alle behandlinger
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useInView, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PALETTES } from "@/components/behandlinger/scenes/Papir";
import type { Scene } from "@/components/behandlinger/scenes/types";
import { SYMPTOMS, URGENCY_COLOR, type Symptom, type SymptomSlug } from "./data";
import { paperScene } from "./scenes/Scener";

/**
 * Kartoteket, the symptoms on a phone: a box of index cards like the patient
 * files at a dental office. The cards stand in the box one behind the other,
 * each with a tab in its own colours, the tabs to either side so every name
 * can be read. One card is out on the table below with its paper theatre and
 * what to do, and its slot in the box stands empty. Tap another tab and the
 * card on the table goes back in, and that one comes out from under the
 * front of the box, tab first.
 *
 * The front page is about the clinic and the symptoms are a side trip, so
 * this keeps them to about one screen; the stack of eight cards it replaced
 * ran to five and a half. Only the card on the table has a scene, and the
 * scene only plays while it is on screen. The motion is CSS (the kartotek-*
 * classes in globals.css).
 */

const N = SYMPTOMS.length;
/** How much lower each card stands in the box than the one behind it, in px. */
const STEP = 20;
const TAB = 32;
/** Room above the back card's tab, so a focus ring is not cut off. */
const HEAD = 4;
/** The front card's body showing between its tab and the front panel. */
const TOE = 14;
/** The box's front panel. */
const LIP = 30;
const BOX_H = HEAD + (N - 1) * STEP + TAB + TOE + LIP;
/** The box's board: a shade deeper than the book's case, so the front reads against the cards. */
const BOARD = "#C9D9D5";
/** How long a card takes to land on the table before its scene stands up. */
const LANDING = 620;

// Every symptom's scene on solid paper, as in the arches, made once.
const SCENES = Object.fromEntries(
  SYMPTOMS.map((s) => [s.slug, paperScene(s.slug, s.palette, false)])
) as Record<SymptomSlug, Scene>;

const side = (i: number) => (i % 2 === 0 ? "left" : "right");

export function Kartotek() {
  const reduced = useReducedMotion() ?? false;
  // The card out on the table, and the one whose scene may play: the same
  // card, once it has landed.
  const [out, setOut] = useState(0);
  const [landed, setLanded] = useState(0);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(tableRef, { amount: 0.3 });
  const still = useMotionValue(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (landed === out) return;
    const t = setTimeout(() => setLanded(out), reduced ? 0 : LANDING);
    return () => clearTimeout(t);
  }, [out, landed, reduced]);

  // Arrow keys move along the tabs, in the order the cards stand in the box.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const by = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    const next = by ? (out + by + N) % N : e.key === "Home" ? 0 : e.key === "End" ? N - 1 : null;
    if (next === null) return;
    e.preventDefault();
    setOut(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      id="symptomer"
      aria-labelledby="symptomer-tittel"
      className="kartotek bg-[var(--color-paper)] px-[var(--container-px,24px)] py-[var(--space-section)]"
    >
      <div className="mx-auto max-w-[560px]">
        <h2
          id="symptomer-tittel"
          className="font-sans font-extralight text-[var(--color-ink)]"
          style={{ fontSize: 44, letterSpacing: "-0.045em", lineHeight: 0.95 }}
        >
          Kjenner du noe av dette?
        </h2>
        <p className="mt-5 text-[18px] leading-[1.5] text-[var(--color-text-secondary)]">
          Åtte vanlige plager. Hva de betyr, og hva du bør gjøre.
        </p>

        {/* The box: every card but the one on the table, standing in its slot */}
        <div
          role="tablist"
          aria-label="Symptomer"
          onKeyDown={onKeyDown}
          className="relative mt-9 overflow-hidden"
          style={{ height: BOX_H }}
        >
          {SYMPTOMS.map((s, i) => {
            const p = PALETTES[s.palette];
            const isOut = i === out;
            return (
              <div
                key={s.slug}
                className="kartotek-slot pointer-events-none absolute inset-x-1.5 bottom-0"
                data-out={isOut}
                style={{ top: HEAD + i * STEP, zIndex: i, "--sink": `${BOX_H - i * STEP}px` } as CSSProperties}
              >
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`kartotek-fane-${s.slug}`}
                  aria-selected={isOut}
                  aria-controls={`kartotek-kort-${s.slug}`}
                  tabIndex={isOut ? 0 : -1}
                  onClick={() => setOut(i)}
                  className="kartotek-tab pointer-events-auto absolute top-0 flex min-w-[38%] items-center whitespace-nowrap rounded-t-[8px] px-3 text-[13px] font-medium tracking-[-0.005em]"
                  style={{ [side(i)]: 10, height: TAB, background: p.near, color: p.ink }}
                >
                  {s.title}
                </button>
                {/* The card's edge above the ones in front: tapping it picks the card too */}
                <div
                  aria-hidden="true"
                  onClick={() => setOut(i)}
                  className="pointer-events-auto absolute inset-x-0 bottom-0 rounded-t-[3px]"
                  style={{ top: TAB, background: p.far, boxShadow: "0 -1px 0 rgba(14,42,48,0.10)" }}
                />
              </div>
            );
          })}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 rounded-[3px_3px_6px_6px]"
            style={{
              height: LIP,
              zIndex: N + 1,
              background: BOARD,
              boxShadow:
                "0 -1px 0 rgba(14,42,48,0.14), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 0 rgba(14,42,48,0.07)",
            }}
          />
        </div>

        {/* The table, starting at the front of the box: cards come out from under it */}
        <div ref={tableRef} className="relative grid overflow-hidden pb-8" style={{ paddingTop: TAB + 8 }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3"
            style={{ background: "linear-gradient(rgba(14,42,48,0.10), rgba(14,42,48,0))" }}
          />
          {SYMPTOMS.map((s, i) => (
            <Card
              key={s.slug}
              s={s}
              i={i}
              isOut={i === out}
              live={i === landed}
              active={inView && i === landed && landed === out}
              d={still}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  s, i, isOut, live, active, d, reduced,
}: {
  s: Symptom;
  i: number;
  isOut: boolean;
  /** Its scene is mounted: the card has landed, or is only just leaving. */
  live: boolean;
  active: boolean;
  d: MotionValue<number>;
  reduced: boolean;
}) {
  const p = PALETTES[s.palette];
  const S = SCENES[s.slug];
  return (
    <article
      id={`kartotek-kort-${s.slug}`}
      role="tabpanel"
      aria-labelledby={`kartotek-fane-${s.slug}`}
      aria-hidden={!isOut}
      inert={!isOut}
      data-out={isOut}
      className="kartotek-card relative [grid-area:1/1]"
    >
      {/* Its own tab, where it stood in the box */}
      <span
        aria-hidden="true"
        className="kartotek-cardtab absolute flex items-center whitespace-nowrap rounded-t-[8px] px-3 text-[13px] font-semibold tracking-[-0.005em]"
        style={{ [side(i)]: 10, top: -TAB, height: TAB, minWidth: "38%", background: p.mid, color: p.ink }}
      >
        {s.title}
      </span>
      <div
        className="rounded-[4px] p-5 shadow-[0_1px_0_rgba(14,42,48,0.08),0_18px_32px_-22px_rgba(14,42,48,0.45)]"
        style={{ background: p.far }}
      >
        <h3
          className="font-sans font-light"
          style={{ color: p.ink, fontSize: 30, letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          {s.title}
        </h3>
        <p className="mt-1.5 text-[15px]" style={{ color: p.ink }}>
          {s.kicker}
        </p>

        <div className="mt-5 flex gap-4">
          <div
            className="relative w-[112px] shrink-0 overflow-hidden rounded-t-full"
            style={{ aspectRatio: "300 / 540", background: p.ground }}
          >
            {live && <S active={active} d={d} reduced={reduced} mode="arch" />}
          </div>
          <div className="flex min-w-0 flex-col">
            <p className="text-[15px] leading-[1.55] text-[var(--color-text-secondary)]">{s.description}</p>
            <p
              className="mt-auto flex items-baseline gap-2 pt-4 text-[13.5px] font-medium leading-[1.35]"
              style={{ color: URGENCY_COLOR[s.urgency] }}
            >
              <span
                aria-hidden="true"
                className="inline-block size-2 shrink-0 translate-y-[-1px] rounded-full"
                style={{ background: URGENCY_COLOR[s.urgency] }}
              />
              {s.severity}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t pt-4" style={{ borderColor: "rgba(14,42,48,0.12)" }}>
          <h4 className="text-[13px] font-medium" style={{ color: p.ink }}>
            Hva du gjør
          </h4>
          <p className="mt-1.5 text-[15px] leading-[1.55] text-[var(--color-text-primary)]">{s.whatToDo}</p>
        </div>

        <Link
          href={`/symptomer#${s.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium transition-opacity hover:opacity-70"
          style={{ color: p.ink }}
        >
          Les mer
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

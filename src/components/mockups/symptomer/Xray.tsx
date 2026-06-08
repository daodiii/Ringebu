"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function CrossTick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
      <line x1="7" y1="1.5" x2="7" y2="12.5" />
      <line x1="1.5" y1="7" x2="12.5" y2="7" />
    </svg>
  );
}
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { symptoms } from "@/data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Panoramic film: 12 teeth in a gentle arch, 8 carry a symptom. */
const N = 12;
const TOOTH_SYMPTOM: Record<number, string> = {
  0: "Sensitive tenner",
  1: "Tannpine",
  3: "Dårlig ånde",
  4: "Blødende tannkjøtt",
  6: "Tannkjøttbetennelse",
  7: "Hovne tannkjøtt",
  9: "Løse tenner",
  10: "Kjevesmerter",
};

const VW = 760;
const VH = 230;

function toothPath(w: number, h: number) {
  const hw = w / 2;
  const ht = h / 2;
  return [
    `M ${-hw},${-ht * 0.5}`,
    `C ${-hw},${-ht} ${hw},${-ht} ${hw},${-ht * 0.5}`,
    `L ${hw * 0.9},${ht * 0.5}`,
    `Q ${hw * 0.9},${ht} 0,${ht}`,
    `Q ${-hw * 0.9},${ht} ${-hw * 0.9},${ht * 0.5}`,
    "Z",
  ].join(" ");
}

const TEETH = Array.from({ length: N }, (_, i) => {
  const t = i / (N - 1);
  const x = 70 + t * (VW - 140);
  const y = 150 - Math.sin(Math.PI * t) * 48;
  const d = Math.abs(t - 0.5);
  const width = 22 + d * 28;
  const height = 78 + d * 20;
  const rot = (t - 0.5) * -42;
  return { i, x, y, width, height, rot, title: TOOTH_SYMPTOM[i] ?? null };
});

export function Xray() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(symptoms[0].title);
  const current = symptoms.find((s) => s.title === active) ?? symptoms[0];

  // Measure the film width so the scan beam sweeps edge to edge with transforms.
  const filmRef = useRef<HTMLDivElement | null>(null);
  const [filmW, setFilmW] = useState(900);
  useEffect(() => {
    const el = filmRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setFilmW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink-warm)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <h2
          className="max-w-[18ch] font-sans font-extralight text-[var(--color-amber)]"
          style={{ fontSize: "clamp(40px, 5.4vw, 78px)", letterSpacing: "-0.045em", lineHeight: 0.92 }}
        >
          Se hva tennene{" "}
          <span className="text-[var(--color-amber-deep)]">prøver å si.</span>
        </h2>
        <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-[var(--color-text-on-dark-muted)]">
          Et symptom er sjelden tilfeldig. Velg et tegn, så lyser vi opp hva som kan ligge bak.
        </p>

        {/* ── Film viewer ── */}
        <div
          ref={filmRef}
          className="relative mt-10 overflow-hidden rounded-[8px] border border-[var(--color-rule-dark)]"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%, rgba(214,231,225,0.10), transparent 60%), linear-gradient(180deg, #0b252a, #061a1e)",
          }}
        >
          {/* scan beam */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-10 w-[120px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(214,231,225,0.16) 45%, rgba(214,231,225,0.22) 50%, rgba(214,231,225,0.16) 55%, transparent)",
              }}
              initial={{ x: -140 }}
              animate={{ x: filmW + 20 }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
            />
          )}

          <svg viewBox={`0 0 ${VW} ${VH}`} className="relative z-[1] block w-full" role="img" aria-label="Panoramisk røntgen av tannrekken">
            <defs>
              <linearGradient id="bone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(214,231,225,0.34)" />
                <stop offset="100%" stopColor="rgba(214,231,225,0.10)" />
              </linearGradient>
              <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* gum ridge hint */}
            <path
              d={`M40,${152} Q${VW / 2},${60} ${VW - 40},${152}`}
              fill="none"
              stroke="rgba(214,231,225,0.12)"
              strokeWidth={26}
              strokeLinecap="round"
            />

            {TEETH.map((t) => {
              const on = t.title === active;
              const symp = Boolean(t.title);
              return (
                <g
                  key={t.i}
                  transform={`translate(${t.x},${t.y}) rotate(${t.rot})`}
                  style={{ cursor: symp ? "pointer" : "default" }}
                  onMouseEnter={() => symp && setActive(t.title as string)}
                  onClick={() => symp && setActive(t.title as string)}
                  filter={on ? "url(#glow)" : undefined}
                >
                  <path
                    d={toothPath(t.width, t.height)}
                    fill="url(#bone)"
                    stroke={on ? "var(--color-amber)" : "rgba(214,231,225,0.45)"}
                    strokeWidth={on ? 2 : 1}
                  />
                  {/* pulp/root hint */}
                  <path
                    d={`M0,${-t.height * 0.32} L0,${t.height * 0.22}`}
                    stroke={on ? "var(--color-amber-deep)" : "rgba(214,231,225,0.25)"}
                    strokeWidth={1.4}
                  />
                </g>
              );
            })}

            {/* crosshair marker on the active tooth */}
            {(() => {
              const t = TEETH.find((x) => x.title === active);
              if (!t) return null;
              return (
                <g transform={`translate(${t.x},${t.y - t.height * 0.5 - 14})`}>
                  <circle r={7} fill="none" stroke="var(--color-amber)" strokeWidth={1.3} />
                  <line x1={-11} y1={0} x2={11} y2={0} stroke="var(--color-amber)" strokeWidth={1} />
                  <line x1={0} y1={-11} x2={0} y2={11} stroke="var(--color-amber)" strokeWidth={1} />
                </g>
              );
            })()}
          </svg>

          <GrainOverlay opacity={0.05} />
          {/* corner ticks for the lightbox frame */}
          <span className="pointer-events-none absolute left-3 top-3 text-[var(--color-amber)]/40">
            <CrossTick className="size-3.5" />
          </span>
          <span className="pointer-events-none absolute bottom-3 right-3 text-[var(--color-amber)]/40">
            <CrossTick className="size-3.5" />
          </span>
        </div>

        {/* ── Controls + detail ── */}
        <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* chips */}
          <div className="flex flex-wrap gap-2 self-start">
            {symptoms.map((s) => {
              const on = s.title === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(s.title)}
                  aria-pressed={on}
                  className="rounded-full border px-3.5 py-2 text-[14px] transition-colors"
                  style={{
                    borderColor: on ? "var(--color-amber)" : "var(--color-rule-dark)",
                    backgroundColor: on ? "var(--color-amber)" : "transparent",
                    color: on ? "var(--color-ink)" : "var(--color-text-on-dark-muted)",
                  }}
                >
                  {s.title}
                </button>
              );
            })}
          </div>

          {/* detail */}
          <div className="border-t border-[var(--color-rule-dark)] pt-7 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: EASE }}
              >
                <h3
                  className="font-sans font-light tracking-[-0.03em] text-[var(--color-amber)]"
                  style={{ fontSize: "clamp(30px, 3.4vw, 46px)", lineHeight: 1.0 }}
                >
                  {current.title}
                </h3>
                <p className="mt-4 max-w-[48ch] text-[19px] font-light leading-[1.5] text-[var(--color-text-on-dark)]">
                  {current.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {current.causes.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-[var(--color-rule-dark)] px-3.5 py-1.5 text-[13.5px] text-[var(--color-text-on-dark-muted)]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.6] text-[var(--color-text-on-dark-muted)]">
                  {current.whatToDo}
                </p>
                <Link
                  href={current.slug ? `/artikler/${current.slug}` : "/symptomer"}
                  className="mt-6 inline-flex items-center gap-1.5 text-[16px] font-medium text-[var(--color-amber-deep)] transition-colors hover:text-[var(--color-amber)]"
                >
                  Les mer
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

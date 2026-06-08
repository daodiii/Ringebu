"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { symptoms } from "@/data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Twelve teeth across the upper arch. Eight carry a symptom (by title),
   four are neutral so the arch reads as a real mouth, not a menu. */
const TEETH_COUNT = 12;
const A_START = 170;
const A_END = 10;

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

const URGENCY: Record<string, number> = {
  "Sensitive tenner": 1,
  "Dårlig ånde": 2,
  Kjevesmerter: 2,
  "Blødende tannkjøtt": 2,
  Tannkjøttbetennelse: 3,
  Tannpine: 4,
  "Hovne tannkjøtt": 4,
  "Løse tenner": 5,
};

function urgencyColor(u: number) {
  if (u >= 5) return "var(--color-urgent)";
  if (u === 4) return "var(--color-copper)";
  if (u === 3) return "var(--color-brass)";
  return "var(--color-stone)";
}

// ── Geometry ──
const CX = 320;
const CY = 314;
const R_OUT = 278;
const R_IN = 198;
const R_MID = (R_OUT + R_IN) / 2;

const polar = (ang: number, r: number): [number, number] => [
  CX + r * Math.cos((ang * Math.PI) / 180),
  CY - r * Math.sin((ang * Math.PI) / 180),
];

// Soft gum band behind the teeth (sampled polygon — robust).
const GUM_PATH = (() => {
  const steps = 60;
  const a0 = A_START + 8;
  const a1 = A_END - 8;
  const seg: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    const [x, y] = polar(a, R_OUT - 4);
    seg.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  for (let i = steps; i >= 0; i--) {
    const a = a0 + ((a1 - a0) * i) / steps;
    const [x, y] = polar(a, R_MID - 6);
    seg.push(`L${x.toFixed(1)},${y.toFixed(1)}`);
  }
  seg.push("Z");
  return seg.join(" ");
})();

// A single stylized tooth: crown rounded toward +y (mouth opening),
// root domed toward -y. Drawn in local space, centered on origin.
function toothPath(w: number, h: number) {
  const hw = w / 2;
  const ht = h / 2;
  return [
    `M ${-hw},${-ht * 0.55}`,
    `C ${-hw},${-ht} ${hw},${-ht} ${hw},${-ht * 0.55}`,
    `L ${hw * 0.92},${ht * 0.45}`,
    `Q ${hw * 0.92},${ht} 0,${ht}`,
    `Q ${-hw * 0.92},${ht} ${-hw * 0.92},${ht * 0.45}`,
    "Z",
  ].join(" ");
}

const TEETH = Array.from({ length: TEETH_COUNT }, (_, i) => {
  const angle = A_START + ((A_END - A_START) * (i + 0.5)) / TEETH_COUNT;
  const fromCenter = Math.abs(i - (TEETH_COUNT - 1) / 2);
  const width = 17 + fromCenter * 1.9; // incisors slim, molars broad
  const height = 70 + fromCenter * 1.1;
  const [x, y] = polar(angle, R_MID);
  return { i, angle, x, y, width, height, title: TOOTH_SYMPTOM[i] ?? null };
});

export function MouthMap() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(symptoms[0].title);
  const current = symptoms.find((s) => s.title === active) ?? symptoms[0];
  const u = URGENCY[current.title] ?? 2;
  const col = urgencyColor(u);

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-paper)] py-[var(--space-section)]">
      {/* faint atmospheric warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 8%, rgba(184,148,92,0.07), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <h2
          className="max-w-[16ch] font-sans font-extralight text-[var(--color-text-primary)]"
          style={{ fontSize: "clamp(42px, 5.8vw, 82px)", letterSpacing: "-0.045em", lineHeight: 0.9 }}
        >
          Hvor kjenner du det
          <span className="text-[var(--color-copper)]">?</span>
        </h2>
        <p className="mt-5 max-w-[42ch] text-[18px] leading-[1.6] text-[var(--color-text-secondary)]">
          Pek på området som plager deg. Tennene gir signaler lenge før det haster — vi
          hjelper deg å lese dem.
        </p>

        <div className="mt-10 grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:mt-4 lg:grid-cols-[1.08fr_0.92fr]">
          {/* ── Arch ── */}
          <div className="relative">
            <svg
              viewBox="0 0 640 330"
              className="w-full overflow-visible"
              role="img"
              aria-label="Diagram av tannbuen med vanlige symptomområder"
            >
              <defs>
                <filter id="toothShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0E2A30" floodOpacity="0.14" />
                </filter>
                <linearGradient id="gumGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-petrol-mist)" />
                  <stop offset="100%" stopColor="var(--color-paper-warm)" />
                </linearGradient>
              </defs>

              {/* gum */}
              <path d={GUM_PATH} fill="url(#gumGrad)" stroke="var(--color-brass)" strokeOpacity={0.28} strokeWidth={1} />

              {/* teeth */}
              <g filter="url(#toothShadow)">
                {TEETH.map((t) => {
                  const sympUrg = t.title ? URGENCY[t.title] ?? 2 : 0;
                  const on = t.title === active;
                  const interactive = Boolean(t.title);
                  const fill = on ? urgencyColor(sympUrg) : "var(--color-paper)";
                  const stroke = on ? "var(--color-paper)" : "var(--color-brass)";
                  return (
                    <g
                      key={t.i}
                      transform={`translate(${t.x},${t.y}) rotate(${90 - t.angle}) scale(${on ? 1.1 : 1})`}
                      style={{ cursor: interactive ? "pointer" : "default", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }}
                      onMouseEnter={() => interactive && setActive(t.title as string)}
                      onClick={() => interactive && setActive(t.title as string)}
                    >
                      <path
                        d={toothPath(t.width, t.height)}
                        fill={fill}
                        stroke={stroke}
                        strokeOpacity={on ? 0.9 : 0.45}
                        strokeWidth={on ? 2 : 1.2}
                      />
                      {/* marker dot for symptomatic teeth */}
                      {interactive && !on && (
                        <circle cx={0} cy={t.height * 0.28} r={3.4} fill={urgencyColor(sympUrg)} />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* pulsing halo on the active tooth */}
              {!prefersReduced &&
                (() => {
                  const t = TEETH.find((x) => x.title === active);
                  if (!t) return null;
                  return (
                    <motion.circle
                      cx={t.x}
                      cy={t.y}
                      r={10}
                      fill="none"
                      stroke={col}
                      strokeWidth={1.5}
                      initial={{ scale: 0.5, opacity: 0.7 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      style={{ transformOrigin: `${t.x}px ${t.y}px` }}
                    />
                  );
                })()}
            </svg>

            {/* selector chips */}
            <div className="mt-2 flex flex-wrap gap-2">
              {symptoms.map((s) => {
                const on = s.title === active;
                const dot = urgencyColor(URGENCY[s.title] ?? 2);
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActive(s.title)}
                    aria-pressed={on}
                    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[14px] transition-colors"
                    style={{
                      borderColor: on ? "var(--color-text-primary)" : "var(--color-rule)",
                      backgroundColor: on ? "var(--color-text-primary)" : "transparent",
                      color: on ? "var(--color-paper)" : "var(--color-text-secondary)",
                    }}
                  >
                    <span className="size-2 rounded-full" style={{ backgroundColor: dot }} aria-hidden="true" />
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Detail ── */}
          <div className="lg:pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: EASE }}
              >
                <h3
                  className="font-sans font-light tracking-[-0.03em] text-[var(--color-text-primary)]"
                  style={{ fontSize: "clamp(32px, 3.6vw, 48px)", lineHeight: 1.0 }}
                >
                  {current.title}
                </h3>

                <p className="mt-5 max-w-[48ch] text-[20px] font-light leading-[1.5] tracking-[-0.01em] text-[var(--color-text-primary)]">
                  {current.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {current.causes.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-[var(--color-paper-warm)] px-3.5 py-1.5 text-[14px] text-[var(--color-text-secondary)]"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-start gap-3 rounded-[6px] border border-[var(--color-brass)]/25 bg-[var(--color-paper-warm)]/60 px-5 py-4">
                  <ArrowRight className="mt-1 size-4 shrink-0 text-[var(--color-copper)]" aria-hidden="true" />
                  <p className="text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
                    {current.whatToDo}
                  </p>
                </div>

                <Link
                  href={current.slug ? `/artikler/${current.slug}` : "/symptomer"}
                  className="mt-7 inline-flex items-center gap-1.5 text-[16px] font-medium text-[var(--color-copper)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  Les mer om {current.title.toLowerCase()}
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

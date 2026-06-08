"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { symptoms } from "@/data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

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

type Node = { x: number; y: number; lx: number; ly: number; anchor: "start" | "middle" | "end" };
const NODES: Record<string, Node> = {
  "Dårlig ånde": { x: 300, y: 78, lx: 300, ly: 36, anchor: "middle" },
  Tannpine: { x: 168, y: 172, lx: 150, ly: 128, anchor: "end" },
  "Sensitive tenner": { x: 96, y: 312, lx: 96, ly: 368, anchor: "middle" },
  "Blødende tannkjøtt": { x: 432, y: 138, lx: 470, ly: 104, anchor: "start" },
  Tannkjøttbetennelse: { x: 470, y: 286, lx: 512, ly: 300, anchor: "start" },
  "Hovne tannkjøtt": { x: 602, y: 196, lx: 602, ly: 152, anchor: "middle" },
  "Løse tenner": { x: 612, y: 360, lx: 612, ly: 414, anchor: "middle" },
  Kjevesmerter: { x: 300, y: 392, lx: 300, ly: 446, anchor: "middle" },
};
const LINKS: [string, string][] = [
  ["Blødende tannkjøtt", "Tannkjøttbetennelse"],
  ["Tannkjøttbetennelse", "Hovne tannkjøtt"],
  ["Hovne tannkjøtt", "Løse tenner"],
  ["Tannkjøttbetennelse", "Løse tenner"],
  ["Tannpine", "Sensitive tenner"],
  ["Tannpine", "Tannkjøttbetennelse"],
  ["Dårlig ånde", "Blødende tannkjøtt"],
  ["Kjevesmerter", "Løse tenner"],
];

const radius = (u: number) => 20 + u * 5;

export function Konstellasjon() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(symptoms[0].title);
  const current = symptoms.find((s) => s.title === active) ?? symptoms[0];

  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--color-paper)] py-[var(--space-section)]"
      style={{ background: "radial-gradient(80% 70% at 70% 30%, var(--color-paper-warm), var(--color-paper) 70%)" }}
    >
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <h2
          className="max-w-[18ch] font-sans font-extralight text-[var(--color-text-primary)]"
          style={{ fontSize: "clamp(40px, 5.4vw, 78px)", letterSpacing: "-0.045em", lineHeight: 0.92 }}
        >
          Alt henger sammen
          <span className="text-[var(--color-copper)]">.</span>
        </h2>
        <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
          Ett tegn fører ofte til det neste. Følg trådene mellom symptomene og se hvor de møtes.
        </p>

        <div className="mt-8 grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ── Constellation ── */}
          <div>
            <svg viewBox="0 0 720 480" className="w-full overflow-visible" role="img" aria-label="Sammenhenger mellom vanlige tannsymptomer">
              {/* links */}
              {LINKS.map(([a, b], i) => {
                const na = NODES[a];
                const nb = NODES[b];
                if (!na || !nb) return null;
                const on = a === active || b === active;
                return (
                  <line
                    key={i}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke={on ? "var(--color-copper)" : "var(--color-brass)"}
                    strokeOpacity={on ? 0.7 : 0.22}
                    strokeWidth={on ? 1.8 : 1}
                  />
                );
              })}

              {/* nodes */}
              {symptoms.map((s, i) => {
                const n = NODES[s.title];
                if (!n) return null;
                const u = URGENCY[s.title] ?? 2;
                const on = s.title === active;
                const r = radius(u) * (on ? 1.16 : 1);
                const col = urgencyColor(u);
                return (
                  <motion.g
                    key={s.title}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setActive(s.title)}
                    onClick={() => setActive(s.title)}
                    animate={prefersReduced ? undefined : { y: [0, -6, 0] }}
                    transition={
                      prefersReduced
                        ? undefined
                        : { duration: 5 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                    }
                  >
                    {on && !prefersReduced && (
                      <motion.circle
                        cx={n.x}
                        cy={n.y}
                        r={r}
                        fill="none"
                        stroke={col}
                        strokeWidth={1.4}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.7, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                      />
                    )}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={r}
                      fill={on ? col : "var(--color-paper)"}
                      stroke={col}
                      strokeWidth={on ? 0 : 1.6}
                    />
                    {!on && <circle cx={n.x} cy={n.y} r={3} fill={col} />}
                    <text
                      x={n.lx}
                      y={n.ly}
                      textAnchor={n.anchor}
                      style={{ fontSize: 15.5, fontWeight: on ? 600 : 400, letterSpacing: "-0.01em" }}
                      fill={on ? "var(--color-text-primary)" : "var(--color-text-muted)"}
                    >
                      {s.title}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          {/* ── Detail ── */}
          <div className="lg:border-l lg:border-[var(--color-brass)]/25 lg:pl-12">
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
                  style={{ fontSize: "clamp(30px, 3.4vw, 46px)", lineHeight: 1.0 }}
                >
                  {current.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[19px] font-light leading-[1.5] text-[var(--color-text-primary)]">
                  {current.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {current.causes.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-[var(--color-paper-warm)] px-3.5 py-1.5 text-[14px] text-[var(--color-text-secondary)]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-start gap-3">
                  <ArrowRight className="mt-1 size-4 shrink-0 text-[var(--color-copper)]" aria-hidden="true" />
                  <p className="text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">{current.whatToDo}</p>
                </div>
                <Link
                  href={current.slug ? `/artikler/${current.slug}` : "/symptomer"}
                  className="mt-7 inline-flex items-center gap-1.5 text-[16px] font-medium text-[var(--color-copper)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  Les mer
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* chip fallback — accessible + touch friendly */}
            <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--color-brass)]/25 pt-6">
              {symptoms.map((s) => {
                const on = s.title === active;
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActive(s.title)}
                    aria-pressed={on}
                    className="rounded-full border px-3 py-1.5 text-[13.5px] transition-colors"
                    style={{
                      borderColor: on ? "var(--color-text-primary)" : "var(--color-rule)",
                      backgroundColor: on ? "var(--color-text-primary)" : "transparent",
                      color: on ? "var(--color-paper)" : "var(--color-text-muted)",
                    }}
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { symptoms } from "@/data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028 } },
  exit: { transition: { staggerChildren: 0.012, staggerDirection: -1 } },
};
const letter = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: "-0.35em", filter: "blur(8px)", transition: { duration: 0.3, ease: EASE } },
};

export function Storformat() {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = symptoms[index];

  // Gentle autoplay that yields the moment the visitor takes over.
  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % symptoms.length), 4400);
    return () => window.clearInterval(id);
  }, [paused, prefersReduced]);

  const select = (i: number) => {
    setIndex(i);
    setPaused(true);
  };

  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <p className="max-w-[40ch] text-[18px] leading-[1.6] text-[var(--color-text-secondary)]">
          Tennene sier fra lenge før du oppsøker noen. Kjenner du igjen ett av disse?
        </p>

        <div className="mt-8 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_300px]">
          {/* ── Stage ── */}
          <div className="min-w-0">
            {/* giant kinetic word */}
            <div className="min-h-[1.05em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={current.title}
                  variants={prefersReduced ? undefined : container}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="flex flex-wrap font-sans font-extralight text-[var(--color-text-primary)]"
                  style={{ fontSize: "clamp(48px, 11vw, 150px)", letterSpacing: "-0.05em", lineHeight: 0.92 }}
                  aria-label={current.title}
                >
                  {current.title.split("").map((ch, i) => (
                    <motion.span
                      key={`${current.title}-${i}`}
                      variants={prefersReduced ? undefined : letter}
                      className="inline-block"
                      style={{ whiteSpace: "pre" }}
                    >
                      {ch === " " ? " " : ch}
                    </motion.span>
                  ))}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: prefersReduced ? 0 : 0.15 }}
                className="mt-8 max-w-[60ch] border-t border-[var(--color-brass)]/30 pt-8"
              >
                <p className="text-[23px] font-light leading-[1.45] tracking-[-0.015em] text-[var(--color-text-primary)]">
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
                <div className="mt-6 flex items-start gap-3">
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

          {/* ── Index rail ── */}
          <ul className="flex flex-col lg:border-l lg:border-[var(--color-brass)]/25 lg:pl-8">
            {symptoms.map((s, i) => {
              const on = i === index;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    onMouseEnter={() => select(i)}
                    aria-pressed={on}
                    className="group flex w-full items-center gap-3 py-2.5 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px bg-[var(--color-copper)] transition-all duration-300"
                      style={{ width: on ? 28 : 0, opacity: on ? 1 : 0 }}
                    />
                    <span
                      className="transition-all duration-300"
                      style={{
                        fontSize: on ? 21 : 17,
                        fontWeight: on ? 500 : 400,
                        color: on ? "var(--color-text-primary)" : "var(--color-text-muted)",
                        marginLeft: on ? 0 : 0,
                      }}
                    >
                      {s.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

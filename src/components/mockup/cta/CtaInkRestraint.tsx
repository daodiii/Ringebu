"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function CtaInkRestraint() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] py-[var(--space-section)]">
      {/* Ultra-subtle warm radial */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at 50% 55%, rgba(184,148,92,0.06) 0%, transparent 70%), " +
            "linear-gradient(180deg, #0A0A0A 0%, #080808 100%)",
        }}
      />
      <GrainOverlay opacity={0.05} />

      <motion.div
        ref={ref}
        initial={prefersReduced ? false : { opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto flex min-h-[64vh] w-full max-w-[var(--container-max,1280px)] flex-col px-[var(--container-px,24px)] md:min-h-[72vh]"
      >
        {/* Top eyebrow */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-block h-px w-10"
            style={{ background: "var(--color-brass)" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-brass)]">
            Bestill en time
          </span>
        </div>

        {/* Big statement, anchored to bottom of section for negative space above */}
        <div className="mt-auto pt-24 md:pt-32">
          <h2
            className="font-sans text-white"
            style={{
              fontWeight: 200,
              fontSize: "clamp(56px, 11vw, 168px)",
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
            }}
          >
            Smilet ditt
            <br />
            fortjener{" "}
            <span className="italic font-light text-[var(--color-amber)]">litt mer tid.</span>
          </h2>

          {/* CTA + ring number — quiet, restrained */}
          <div className="mt-14 flex flex-wrap items-center gap-6 md:mt-16">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 border-b border-[var(--color-amber)] pb-2 text-[14px] font-medium uppercase tracking-[0.22em] text-[var(--color-amber)] transition-colors hover:text-white"
            >
              Finn en ledig time
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <span aria-hidden="true" className="h-4 w-px bg-[var(--color-rule-dark)]" />
            <a
              href="tel:61280412"
              className="text-[14px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-amber)]"
            >
              eller ring 61 28 04 12
            </a>
          </div>
        </div>

        {/* Tiny mono contact block at the very bottom */}
        <div className="mt-24 grid grid-cols-2 gap-x-10 gap-y-5 border-t border-[var(--color-rule-dark)] pt-8 sm:grid-cols-4">
          {[
            { label: "Adresse", value: "Hanstadgata 2, 2630 Ringebu" },
            { label: "Telefon", value: "61 28 04 12" },
            { label: "E-post", value: "post@ringebutann.no" },
            { label: "Åpent", value: "Man – Fre · 08:00 – 15:30" },
          ].map((row) => (
            <div key={row.label}>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                {row.label}
              </div>
              <div className="mt-1.5 text-[12px] tracking-[-0.005em] text-[var(--color-text-on-dark)]">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

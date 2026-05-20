"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const COLOPHON: ReadonlyArray<{ label: string; value: string; href?: string }> = [
  { label: "Klinikk", value: "Ringebu Tannlegesenter" },
  { label: "Adresse", value: "Hanstadgata 2, 2630 Ringebu" },
  { label: "Telefon", value: "61 28 04 12", href: "tel:61280412" },
  { label: "E-post", value: "post@ringebutann.no", href: "mailto:post@ringebutann.no" },
  { label: "Åpent", value: "Man – Tor · 08:00 – 15:30 · Fre · 08:00 – 15:00" },
  { label: "Etablert", value: "Anno 1985 · Gudbrandsdalen" },
];

export function CtaAlmanacBackCover() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] py-[var(--space-section)]">
      {/* Subtle warm wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(184,148,92,0.08) 0%, transparent 70%), " +
            "linear-gradient(180deg, #0A0A0A 0%, #0F0B07 100%)",
        }}
      />
      <GrainOverlay opacity={0.06} />

      {/* Brass top accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-brass) 25%, var(--color-amber) 50%, var(--color-brass) 75%, transparent 100%)",
        }}
      />

      <motion.div
        ref={ref}
        initial={prefersReduced ? false : { opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]"
      >
        {/* Back-cover ornament */}
        <div className="mb-12 flex flex-col items-center gap-5 md:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-brass)]">
            Almanakken · Slutt
          </span>
          <span
            aria-hidden="true"
            className="inline-block h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--color-brass) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Closing statement */}
        <div className="mx-auto max-w-[1000px] text-center">
          <h2
            className="font-sans text-white"
            style={{
              fontWeight: 200,
              fontSize: "clamp(44px, 7.5vw, 112px)",
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
            }}
          >
            Vi venter <span className="italic font-light text-[var(--color-amber)]">på deg.</span>
          </h2>

          {/* Brass ornament */}
          <div className="mt-12 flex items-center justify-center gap-4 md:mt-14">
            <span className="h-px w-10 bg-[var(--color-brass)]/40" />
            <span aria-hidden="true" className="font-mono text-[14px] text-[var(--color-brass)]">
              ◆
            </span>
            <span className="h-px w-10 bg-[var(--color-brass)]/40" />
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-amber)] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-amber-deep)]"
            >
              Bestill time
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="tel:61280412"
              className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-on-dark-muted)] underline decoration-[var(--color-brass)] underline-offset-[6px] hover:text-[var(--color-amber)]"
            >
              Ring 61 28 04 12
            </a>
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-20 border-t border-[var(--color-rule-dark)] pt-7 md:mt-28">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
              Kolofon
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-on-dark-muted)]">
              Utgave 01
            </span>
          </div>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-3.5 sm:grid-cols-2 md:grid-cols-3">
            {COLOPHON.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[90px_1fr] items-baseline gap-3"
              >
                <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-on-dark-muted)]">
                  {row.label}
                </dt>
                <dd className="text-[13px] tracking-[-0.005em] text-[var(--color-text-on-dark)]">
                  {row.href ? (
                    <a href={row.href} className="hover:text-[var(--color-amber)]">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}

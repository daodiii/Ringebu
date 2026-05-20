"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function CtaReservationCard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] py-[var(--space-section)]">
      {/* Subtle warm wash — same warm-radial language as the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(184,148,92,0.10) 0%, transparent 65%), " +
            "linear-gradient(180deg, #0A0A0A 0%, #0F0B07 50%, #0A0A0A 100%)",
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
        transition={{ duration: 0.85, ease: EASE }}
        className="relative mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]"
      >
        <div className="mx-auto max-w-[920px]">
          {/* Outer brass card with double border */}
          <div
            className="relative overflow-hidden bg-[var(--color-paper-warm)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
            style={{
              border: "1px solid var(--color-brass)",
            }}
          >
            {/* Inner double-line border */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 border"
              style={{ borderColor: "rgba(184,148,92,0.45)" }}
            />

            {/* Perforated tear strip on right edge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 right-0 top-6 w-[18px]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, var(--color-ink) 2.5px, transparent 3px)",
                backgroundSize: "18px 14px",
                backgroundRepeat: "repeat-y",
                backgroundPosition: "center",
                opacity: 0.55,
              }}
            />

            <div className="relative px-7 pt-7 pb-9 md:px-12 md:pt-10 md:pb-12">
              {/* Header — masthead row */}
              <div className="flex items-start justify-between gap-6 border-b border-dashed border-[var(--color-brass)]/40 pb-6">
                {/* Brass stamp */}
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="relative flex size-14 shrink-0 items-center justify-center rounded-full"
                    style={{
                      border: "1.5px solid var(--color-brass)",
                      boxShadow: "inset 0 0 0 3px var(--color-paper-warm), inset 0 0 0 4px rgba(184,148,92,0.35)",
                    }}
                  >
                    <span className="font-mono text-[8.5px] font-semibold uppercase leading-tight tracking-[0.18em] text-[var(--color-brass)]">
                      RTS
                    </span>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
                      Bestillingsslipp
                    </div>
                    <div className="mt-1 font-sans text-[16px] font-medium tracking-[-0.018em] text-[var(--color-text-primary)]">
                      Ringebu Tannlegesenter
                    </div>
                  </div>
                </div>

                {/* Stamped date */}
                <div className="hidden flex-col items-end md:flex">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                    Anno
                  </span>
                  <span
                    className="font-sans text-[22px] font-light tracking-[-0.02em] text-[var(--color-text-primary)]"
                    style={{ lineHeight: 1 }}
                  >
                    1985
                  </span>
                </div>
              </div>

              {/* Body — printed form fields */}
              <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-[1.4fr_1fr]">
                <div>
                  {/* Pulled headline */}
                  <h2
                    className="font-sans text-[var(--color-text-primary)]"
                    style={{
                      fontWeight: 300,
                      fontSize: "clamp(32px, 4.6vw, 58px)",
                      lineHeight: 0.98,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Smilet ditt fortjener{" "}
                    <span className="italic text-[var(--color-stone)]">litt mer tid.</span>
                  </h2>

                  {/* Pseudo-form fields */}
                  <dl className="mt-9 grid grid-cols-1 gap-y-4">
                    {[
                      { label: "Pasient", value: "_______________________" },
                      { label: "Behandling", value: "Rutinekontroll · Akutt · Bleking · …" },
                      { label: "Ønsket dato", value: "_______________________" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-[100px_1fr] items-baseline gap-4 border-b border-dotted border-[var(--color-brass)]/35 pb-2 md:grid-cols-[120px_1fr]"
                      >
                        <dt className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                          {row.label}
                        </dt>
                        <dd
                          className="font-sans text-[14px] tracking-[-0.005em] text-[var(--color-text-secondary)]"
                          style={{
                            fontStyle: row.value.includes("_") ? "normal" : "italic",
                          }}
                        >
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* CTA — stamped */}
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <Link
                      href="/kontakt"
                      className="group relative inline-flex items-center gap-2.5 bg-[var(--color-ink)] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-amber)] transition-colors hover:bg-[var(--color-ink-warm)]"
                      style={{
                        boxShadow:
                          "0 0 0 1px var(--color-brass), 0 0 0 3px var(--color-paper-warm), 0 0 0 4px var(--color-brass)",
                      }}
                    >
                      Bestill time
                      <ArrowUpRight
                        className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                    <a
                      href="tel:61280412"
                      className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-primary)] underline decoration-[var(--color-brass)] underline-offset-[6px] hover:decoration-[var(--color-text-primary)]"
                    >
                      Ring 61 28 04 12
                    </a>
                  </div>
                </div>

                {/* Right column — clinic info as a stamped sidebar */}
                <aside className="md:border-l md:border-dashed md:border-[var(--color-brass)]/40 md:pl-10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
                    Klinikken
                  </div>
                  <ul className="mt-4 space-y-3.5 text-[13px] text-[var(--color-text-primary)]">
                    <li>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                        Adresse
                      </span>
                      <span className="block mt-0.5">Hanstadgata 2, 2630 Ringebu</span>
                    </li>
                    <li>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                        Telefon
                      </span>
                      <a href="tel:61280412" className="block mt-0.5 font-medium hover:text-[var(--color-stone)]">
                        61 28 04 12
                      </a>
                    </li>
                    <li>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                        E-post
                      </span>
                      <a
                        href="mailto:post@ringebutann.no"
                        className="block mt-0.5 hover:text-[var(--color-stone)]"
                      >
                        post@ringebutann.no
                      </a>
                    </li>
                    <li>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                        Åpent
                      </span>
                      <span className="block mt-0.5 leading-[1.55]">
                        Man – Tor · 08:00 – 15:30
                        <br />
                        Fredag · 08:00 – 15:00
                      </span>
                    </li>
                  </ul>
                </aside>
              </div>

              {/* Footer — colophon */}
              <div className="mt-10 flex items-center justify-between border-t border-dashed border-[var(--color-brass)]/40 pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                  HELFO · Direkte oppgjør
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Slipp · 01 · av et helt smil
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

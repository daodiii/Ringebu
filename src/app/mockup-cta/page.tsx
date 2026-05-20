"use client";

import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsNewspaper } from "@/components/home/SymptomsNewspaper";
import { AboutPlate } from "@/components/home/AboutPlate";
import { CtaCloseout } from "@/components/home/CtaCloseout";
import { CtaReservationCard } from "@/components/mockup/cta/CtaReservationCard";
import { CtaAlmanacBackCover } from "@/components/mockup/cta/CtaAlmanacBackCover";
import { CtaInkRestraint } from "@/components/mockup/cta/CtaInkRestraint";

const SECTIONS = [
  { id: "a-reservation", label: "A — Reservation Card" },
  { id: "b-back-cover", label: "B — Almanac Back Cover" },
  { id: "c-ink-restraint", label: "C — Big Ink Restraint" },
  { id: "current", label: "Current" },
];

export default function MockupCtaPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <nav
        aria-label="Mockup-navigasjon"
        className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] flex-wrap items-center gap-4 px-[var(--container-px,24px)] py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
            Mockup
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            CTA Closeout
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-3 py-1.5 text-[12px] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-stone-100)]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Full page context — see the closeout in real flow */}
      <Hero />
      <TreatmentsSlipcase />
      <TrustSection />
      <SymptomsNewspaper />
      <AboutPlate />

      {/* === A — Reservation Card === */}
      <SectionLabel
        id="a-reservation"
        eyebrow="Direction A"
        title="Reservation Card"
        note="Trykt avtaleskjema midt på en mørk side. Brass-stempel, perforert kant, klinikkdata som fortrykt sidefelt."
        tone="recommended"
      />
      <CtaReservationCard />

      {/* === B — Almanac Back Cover === */}
      <SectionLabel
        id="b-back-cover"
        eyebrow="Direction B"
        title="Almanac Back Cover"
        note="Et stort, lett-vekts avslutningsutsagn sentrert i mørket. Brass-ornament. Kontaktinfo som kolofon."
      />
      <CtaAlmanacBackCover />

      {/* === C — Big Ink Restraint === */}
      <SectionLabel
        id="c-ink-restraint"
        eyebrow="Direction C"
        title="Big Ink Restraint"
        note="Pur mørk side, ingen ornament. Én massiv erklæring i krem på blekk. Sterkest når det er færrest elementer."
      />
      <CtaInkRestraint />

      {/* === Current === */}
      <SectionLabel
        id="current"
        eyebrow="Baseline"
        title="Nåværende"
        note="Mørkt + clinic-valley.jpg som bakgrunn — samme bilde som hero gjentar. Den vi prøver å løfte."
      />
      <CtaCloseout />

      <div className="h-32 bg-[var(--color-paper)]" />
    </main>
  );
}

function SectionLabel({
  id,
  eyebrow,
  title,
  note,
  tone,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note: string;
  tone?: "recommended";
}) {
  return (
    <div
      id={id}
      className="border-y border-[var(--color-rule)] bg-[var(--color-paper-warm)]"
    >
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] py-8">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
                {eyebrow}
              </span>
              {tone === "recommended" && (
                <span className="rounded-full bg-[var(--color-brass)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white">
                  Anbefalt
                </span>
              )}
            </div>
            <h2 className="mt-2 font-sans text-[28px] font-medium tracking-[-0.02em] text-[var(--color-text-primary)]">
              {title}
            </h2>
          </div>
          <p className="max-w-[440px] text-[13px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsNewspaper } from "@/components/home/SymptomsNewspaper";
import { AboutPlate } from "@/components/home/AboutPlate";
import { CtaCloseout } from "@/components/home/CtaCloseout";
import { AboutLetter } from "@/components/mockup/about/AboutLetter";
import { AboutAlmanakEntry } from "@/components/mockup/about/AboutAlmanakEntry";
import { AboutVitalStatistics } from "@/components/mockup/about/AboutVitalStatistics";

const SECTIONS = [
  { id: "a-letter", label: "A — Brev fra dalen" },
  { id: "b-almanak", label: "B — Almanak entry" },
  { id: "c-vital", label: "C — Vital statistics" },
  { id: "current", label: "Current" },
];

export default function MockupAboutPage() {
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
            AboutPlate
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

      {/* Full page context — see About in real flow */}
      <Hero />
      <TreatmentsSlipcase />
      <TrustSection />
      <SymptomsNewspaper />

      {/* === A — Letter === */}
      <SectionLabel
        id="a-letter"
        eyebrow="Direction A"
        title="Brev fra dalen"
        note="Et håndskrevet-følt brev fra klinikken til pasienten. Personalia som P.S. nederst. Ingen bilder."
        tone="recommended"
      />
      <AboutLetter />

      {/* === B — Almanak === */}
      <SectionLabel
        id="b-almanak"
        eyebrow="Direction B"
        title="Almanak entry"
        note="Oppslag i Almanakken. Drop cap, to-spalters layout, fakta som personalia til høyre. Forsetter print-metaforen."
      />
      <AboutAlmanakEntry />

      {/* === C — Vital statistics === */}
      <SectionLabel
        id="c-vital"
        eyebrow="Direction C"
        title="Vital statistics"
        note="Frisk innendørs-bilde (about-clinic.jpg) til venstre, fire store tall til høyre. Bilde + tall, ikke prosa."
      />
      <AboutVitalStatistics />

      {/* === Current === */}
      <SectionLabel
        id="current"
        eyebrow="Baseline"
        title="Nåværende"
        note="Bruker fortsatt ringebutannMain.jpg — samme bilde som hero. Det er denne vi prøver å løfte."
      />
      <AboutPlate />

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

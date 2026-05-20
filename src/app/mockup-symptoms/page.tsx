"use client";

import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { SymptomsAlmanac } from "@/components/home/SymptomsAlmanac";
import { SymptomsInvertedPyramid } from "@/components/mockup/symptoms/SymptomsInvertedPyramid";
import { SymptomsNewspaper } from "@/components/mockup/symptoms/SymptomsNewspaper";
import { SymptomsStampSheet } from "@/components/mockup/symptoms/SymptomsStampSheet";
import { SymptomsTriageChart } from "@/components/mockup/symptoms/SymptomsTriageChart";
import { SymptomsCabinet } from "@/components/mockup/symptoms/SymptomsCabinet";
import { SymptomsTwoStreams } from "@/components/mockup/symptoms/SymptomsTwoStreams";

const SECTIONS = [
  { id: "d-pyramid", label: "D — Pyramid" },
  { id: "e-newspaper", label: "E — Newspaper" },
  { id: "f-stamps", label: "F — Stamps" },
  { id: "c-two-streams", label: "C — Two Streams" },
  { id: "a-triage", label: "A — Triage (rejected)" },
  { id: "b-cabinet", label: "B — Cabinet (rejected)" },
  { id: "current", label: "Current" },
];

export default function MockupSymptomsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <nav
        aria-label="Mockup-navigasjon"
        className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] flex-wrap items-center gap-4 px-[var(--container-px,24px)] py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
            Mockup · v2
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Symptomer — tre nye retninger
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

      {/* Real context: hero + slipcase above */}
      <Hero />
      <TreatmentsSlipcase />

      {/* === D — Inverted Pyramid === */}
      <SectionLabel
        id="d-pyramid"
        eyebrow="Direction D"
        title="Inverted Pyramid by Urgency"
        note="Skriftstørrelse = alvorlighet. Det mest akutte er stort. Den minste ting er liten. Visuelt hierarki løser kommunikasjonen."
      />
      <SymptomsInvertedPyramid />

      {/* === E — Newspaper === */}
      <SectionLabel
        id="e-newspaper"
        eyebrow="Direction E"
        title="Newspaper Front Page"
        note="Et hovedoppslag i stort format + fem mindre 'også notert'-saker under foldelinjen. Asymmetrisk, redaksjonelt."
        tone="recommended"
      />
      <SymptomsNewspaper />

      {/* === F — Stamp Sheet === */}
      <SectionLabel
        id="f-stamps"
        eyebrow="Direction F"
        title="Stamp Sheet — arkiverte merker"
        note="Et rutenett av små stempel/postkort med perforerte kanter. Taktilt, samlerpreg. Hover-løft, ingen åpne/lukke."
      />
      <SymptomsStampSheet />

      {/* === C — Two Streams (kept) === */}
      <SectionLabel
        id="c-two-streams"
        eyebrow="Direction C"
        title="Two Streams Editorial (trygt valg)"
        note="Eksisterende struktur, høyere polering. Sikker. Mindre kreativt sprang."
      />
      <SymptomsTwoStreams />

      {/* === A & B (rejected, kept for reference) === */}
      <SectionLabel
        id="a-triage"
        eyebrow="A (forkastet)"
        title="Triage Chart"
        note="For nært slipcase-mønsteret over."
      />
      <SymptomsTriageChart />

      <SectionLabel
        id="b-cabinet"
        eyebrow="B (forkastet)"
        title="Symptom Cabinet"
        note="For nært slipcase-mønsteret over."
      />
      <SymptomsCabinet />

      {/* === Baseline === */}
      <SectionLabel
        id="current"
        eyebrow="Baseline"
        title="Nåværende"
        note="Den vi prøver å løfte."
      />
      <SymptomsAlmanac />

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

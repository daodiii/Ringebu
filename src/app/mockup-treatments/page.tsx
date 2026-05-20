"use client";

import { Hero } from "@/components/home/Hero";
import { TreatmentsBento } from "@/components/home/TreatmentsBento";
import { TreatmentsEditorial } from "@/components/mockup/TreatmentsEditorial";
import { TreatmentsAnatomical } from "@/components/mockup/TreatmentsAnatomical";
import { TreatmentsSlipcase } from "@/components/mockup/TreatmentsSlipcase";
import { TonalMap } from "@/components/mockup/TonalMap";

const SECTIONS = [
  { id: "c-default", label: "C — Default (one tone)" },
  { id: "c-subtle", label: "C — Subtle tones" },
  { id: "c-full", label: "C — Full tones" },
  { id: "c-functional", label: "C — Functional" },
  { id: "tonal-map", label: "Page tonal map" },
  { id: "current", label: "Old Bento" },
  { id: "a-editorial", label: "A (ref)" },
  { id: "b-anatomical", label: "B (ref)" },
];

export default function MockupTreatmentsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      {/* Sticky comparison nav */}
      <nav
        aria-label="Mockup-navigasjon"
        className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max,1280px)] flex-wrap items-center gap-4 px-[var(--container-px,24px)] py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
            Mockup
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Feature-seksjon + tonal map
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

      {/* Hero for context */}
      <Hero />

      {/* === C — Default (one tone) === */}
      <SectionLabel
        id="c-default"
        eyebrow="Slipcase · default"
        title="Én tone (nåværende)"
        note="Alle ryggene i samme paper-warm. Trygg og koherent — men kan føles flat."
      />
      <TreatmentsSlipcase variant="default" />

      {/* === C — Subtle === */}
      <SectionLabel
        id="c-subtle"
        eyebrow="Slipcase · subtle"
        title="Subtile toner — 5–8% variasjon"
        note="Hver rygg får sin egen knapt merkbare nyanse. Føles intensjonelt først ved nært blikk."
        tone="recommended"
      />
      <TreatmentsSlipcase variant="subtle" hideHeader />

      {/* === C — Full === */}
      <SectionLabel
        id="c-full"
        eyebrow="Slipcase · full"
        title="Full tonal trapp"
        note="Klare steg fra bone til saddle. Som en kuratert hylle med vintage Penguin-bøker."
      />
      <TreatmentsSlipcase variant="full" hideHeader />

      {/* === C — Functional === */}
      <SectionLabel
        id="c-functional"
        eyebrow="Slipcase · functional"
        title="Tonen betyr noe"
        note="Akutt = messing-varm (urgency). Bleking = kjøligste krem (estetikk). Resten paper-warm (rutine)."
      />
      <TreatmentsSlipcase variant="functional" hideHeader />

      {/* === TONAL MAP === */}
      <SectionLabel
        id="tonal-map"
        eyebrow="Helsidens kadens"
        title="Tonal map — alle seksjoner"
        note="Tre alternativer for hvordan hele siden puster. Samme palett, ulik rytme."
      />
      <TonalMap />

      {/* === Reference: current bento (kept for context) === */}
      <SectionLabel
        id="current"
        eyebrow="Baseline"
        title="Nåværende — Bento Grid (referanse)"
        note="6 fliser, 4 gjentar hero-bilder. Slipcase erstatter dette."
      />
      <TreatmentsBento />

      {/* === Reference: A === */}
      <SectionLabel
        id="a-editorial"
        eyebrow="Direction A (forkastet)"
        title="Editorial Plates"
        note="For lang, for lite innhold per visuelt rom. Beholdt som referanse."
      />
      <TreatmentsEditorial />

      {/* === Reference: B === */}
      <SectionLabel
        id="b-anatomical"
        eyebrow="Direction B (forkastet)"
        title="Anatomical Diagram"
        note="Konseptet er sterkt, men tannen krever ekte illustrasjonsarbeid for å lande."
      />
      <TreatmentsAnatomical />

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
  tone?: "locked" | "recommended";
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
              {tone === "locked" && (
                <span className="rounded-full bg-[var(--color-ink)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-amber)]">
                  Låst
                </span>
              )}
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
          <p className="max-w-[420px] text-[13px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

type Section = {
  name: string;
  height: number; // relative weight
  // Each variant's color
  current: string;
  refined: string;
  bold: string;
  // Tone names per variant
  currentName: string;
  refinedName: string;
  boldName: string;
  // Whether text on the band is light or dark
  toneOnDark?: { current?: boolean; refined?: boolean; bold?: boolean };
};

const SECTIONS: ReadonlyArray<Section> = [
  {
    name: "Hero",
    height: 1.4,
    current: "#0A0A0A",
    refined: "#0A0A0A",
    bold: "#0A0A0A",
    currentName: "Ink",
    refinedName: "Ink",
    boldName: "Ink",
    toneOnDark: { current: true, refined: true, bold: true },
  },
  {
    name: "Behandlinger (Slipcase)",
    height: 1.0,
    current: "#F5F0E6",
    refined: "#F5F0E6",
    bold: "#F0E8D6",
    currentName: "Paper",
    refinedName: "Paper",
    boldName: "Warm cream",
  },
  {
    name: "Trust / Klinikken",
    height: 0.9,
    current: "#0F0B07",
    refined: "#0F0B07",
    bold: "#0F0B07",
    currentName: "Ink-warm",
    refinedName: "Ink-warm",
    boldName: "Ink-warm",
    toneOnDark: { current: true, refined: true, bold: true },
  },
  {
    name: "Symptomer",
    height: 1.0,
    current: "#F5F0E6",
    refined: "#ECE4D0",
    bold: "#3D2418",
    currentName: "Paper (same as #2!)",
    refinedName: "Bone",
    boldName: "Oxblood",
    toneOnDark: { current: false, refined: false, bold: true },
  },
  {
    name: "Om oss / Klinikken",
    height: 0.9,
    current: "#EFE8DA",
    refined: "#EFE8DA",
    bold: "#E5D7B8",
    currentName: "Paper-warm",
    refinedName: "Paper-warm",
    boldName: "Saddle cream",
  },
  {
    name: "CTA Closeout",
    height: 0.7,
    current: "#0A0A0A",
    refined: "#0A0A0A",
    bold: "#0A0A0A",
    currentName: "Ink",
    refinedName: "Ink",
    boldName: "Ink",
    toneOnDark: { current: true, refined: true, bold: true },
  },
];

type Variant = "current" | "refined" | "bold";

const TOTAL_WEIGHT = SECTIONS.reduce((sum, s) => sum + s.height, 0);

function PageStrip({
  variant,
  title,
  subtitle,
}: {
  variant: Variant;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-baseline gap-3">
        <h3 className="font-sans text-[18px] font-medium tracking-[-0.02em] text-[var(--color-text-primary)]">
          {title}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
          {subtitle}
        </span>
      </div>
      <div
        className="flex w-full flex-col overflow-hidden ring-1 ring-[var(--color-rule)]"
        style={{ height: "520px" }}
      >
        {SECTIONS.map((section) => {
          const color = section[variant];
          const toneName = section[`${variant}Name` as const];
          const onDark = section.toneOnDark?.[variant];
          return (
            <div
              key={section.name}
              className="relative flex shrink-0 items-center justify-between px-4 transition-colors"
              style={{
                backgroundColor: color,
                height: `${(section.height / TOTAL_WEIGHT) * 100}%`,
              }}
            >
              <span
                className={`font-sans text-[12px] font-medium tracking-[-0.01em] ${
                  onDark ? "text-[var(--color-amber)]" : "text-[var(--color-text-primary)]"
                }`}
              >
                {section.name}
              </span>
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.22em] ${
                  onDark ? "text-[var(--color-amber)]/60" : "text-[var(--color-text-muted)]"
                }`}
              >
                {toneName}
              </span>
              {/* Subtle top hairline between bands */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: onDark
                    ? "rgba(245,233,203,0.10)"
                    : "rgba(26,20,16,0.08)",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TonalMap() {
  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <h2 className="display-section max-w-[640px] text-[var(--color-text-primary)]">
            Tonal map — hvordan{" "}
            <span className="font-light text-[var(--color-stone)]">siden</span> puster.
          </h2>
          <p className="max-w-[340px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Hver kolonne viser hele sidens vertikale fargeflyt. Samme varme palett — bare ulik kadens.
          </p>
        </div>

        {/* Three side-by-side strips */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          <PageStrip
            variant="current"
            title="Nåværende"
            subtitle="Status quo"
          />
          <PageStrip
            variant="refined"
            title="Refined"
            subtitle="Én endring"
          />
          <PageStrip
            variant="bold"
            title="Bold"
            subtitle="Full kadens"
          />
        </div>

        {/* Commentary */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          <div className="border-t border-[var(--color-rule)] pt-5">
            <p className="text-[13px] leading-[1.6] text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">
                Problem:
              </span>{" "}
              Behandlinger og Symptomer er begge ren <em>Paper</em>. Det merkes ikke
              som to seksjoner — det merkes som én lang cremesone delt av Trust.
            </p>
          </div>
          <div className="border-t border-[var(--color-brass)] pt-5">
            <p className="text-[13px] leading-[1.6] text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">
                Refined:
              </span>{" "}
              Symptomer flyttes til <em>Bone</em> — én tone kjøligere. Minimal
              risiko, gir umiddelbar separasjon. Alt annet uendret.
            </p>
          </div>
          <div className="border-t border-[var(--color-urgent)] pt-5">
            <p className="text-[13px] leading-[1.6] text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">
                Bold:
              </span>{" "}
              Symptomer går <em>oxblood</em> (dramatisk mørk varm), Behandlinger
              og Om oss skyves mot varmere kremtoner. Side med fire dypder, ikke to.
            </p>
          </div>
        </div>

        {/* Tone reference legend */}
        <div className="mt-16 border-t border-[var(--color-rule)] pt-8">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-brass)]">
            Palett — alle innenfor samme varme verden
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-7">
            {[
              { name: "Ink", hex: "#0A0A0A" },
              { name: "Ink-warm", hex: "#0F0B07" },
              { name: "Oxblood", hex: "#3D2418" },
              { name: "Saddle", hex: "#E5D7B8" },
              { name: "Paper-warm", hex: "#EFE8DA" },
              { name: "Warm cream", hex: "#F0E8D6" },
              { name: "Bone", hex: "#ECE4D0" },
            ].map((swatch) => (
              <div key={swatch.name} className="flex flex-col gap-2">
                <div
                  className="aspect-[3/2] w-full ring-1 ring-[var(--color-rule)]"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div>
                  <div className="font-sans text-[11px] font-medium text-[var(--color-text-primary)]">
                    {swatch.name}
                  </div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {swatch.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

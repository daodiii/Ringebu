// src/components/treatments/TreatmentSpread.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Treatment } from "@/app/behandlinger/data";
import { RefusionChip } from "./RefusionChip";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface Props {
  treatment: Treatment;
  index: number;
}

export function TreatmentSpread({ treatment, index }: Props) {
  const idxLabel = String(index + 1).padStart(2, "0");
  const photoOnRight = index % 2 === 1;

  return (
    <section className="border-t border-[var(--color-brass)]/30 bg-[var(--color-paper)] py-10 md:py-14">
      <RevealOnScroll
        className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]"
      >
        <div
          className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
          style={photoOnRight ? { direction: "rtl" } : undefined}
        >
          {/* Photo column — square plate, ~1/3 width on desktop */}
          <div
            className="relative aspect-square w-full overflow-hidden shadow-[inset_0_0_0_1px_rgba(184,148,92,0.32)]"
            style={{
              direction: "ltr",
              background: treatment.photoTone,
            }}
          >
            {treatment.photo ? (
              <Image
                src={treatment.photo}
                alt={`${treatment.title}, illustrasjonsbilde fra Ringebu Tannlegesenter`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]/60">
                Klinikkfoto
              </div>
            )}
            <span className="absolute bottom-3 left-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-[var(--color-paper)] mix-blend-difference">
              {treatment.category}
            </span>
          </div>

          {/* Content column */}
          <div style={{ direction: "ltr" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]">
              {idxLabel} · {treatment.subtitle}
            </div>

            <h2
              className="mt-3 font-sans font-light text-[var(--color-text-primary)]"
              style={{
                fontSize: "clamp(28px, 3vw, 42px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.04,
              }}
            >
              {treatment.title}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RefusionChip refusion={treatment.refusion} />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                {treatment.duration}
              </span>
            </div>

            <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">
              {treatment.description}
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {treatment.features.map((f) => (
                <li
                  key={f}
                  className="flex items-baseline gap-2.5 text-[13.5px] text-[var(--color-text-primary)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] inline-block size-1 shrink-0 rounded-full bg-[var(--color-brass)]"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {treatment.prices.length > 0 && (
              <div className="mt-5 border-t border-[var(--color-brass)]/30 pt-3">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
                  {treatment.prices.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <span className="text-[12.5px] text-[var(--color-text-primary)]">{p.name}</span>
                      <span className="font-mono text-[10.5px] tracking-[0.05em] text-[var(--color-text-muted)]">
                        {p.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/kontakt"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-copper)] px-5 py-2.5 text-[12px] font-semibold tracking-[0.005em] text-[var(--color-paper)] transition-colors hover:bg-[var(--color-copper)]/90"
            >
              Bestill time
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { symptoms } from "@/data/content";
import type { SymptomMeta } from "@/app/symptomer/data";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Symptom = (typeof symptoms)[number];

interface Props {
  symptom: Symptom;
  meta: SymptomMeta;
  index: number;
}

export function SymptomSpread({ symptom, meta, index }: Props) {
  const photoOnRight = index % 2 === 1;

  return (
    <section className="border-t border-[var(--color-brass)]/30 bg-[var(--color-paper)] py-10 md:py-14">
      <RevealOnScroll className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <div
          className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
          style={photoOnRight ? { direction: "rtl" } : undefined}
        >
          {/* Photo column — square plate */}
          <div
            className="relative aspect-square w-full overflow-hidden shadow-[inset_0_0_0_1px_rgba(184,148,92,0.32)]"
            style={{
              direction: "ltr",
              background: meta.photoTone,
            }}
          >
            {meta.photo ? (
              <Image
                src={meta.photo}
                alt={`${symptom.title}, illustrasjonsbilde fra Ringebu Tannlegesenter`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-brass)]/60">
                Illustrasjonsbilde
              </div>
            )}
            <span className="absolute bottom-3 left-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-[var(--color-paper)] mix-blend-difference">
              {meta.region}
            </span>
          </div>

          {/* Content column */}
          <div style={{ direction: "ltr" }}>
            <h2
              className="font-sans font-light text-[var(--color-text-primary)]"
              style={{
                fontSize: "clamp(28px, 3vw, 42px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.04,
              }}
            >
              {symptom.title}
            </h2>

            <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-[var(--color-text-secondary)]">
              {symptom.description}
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {symptom.causes.map((cause) => (
                <li
                  key={cause}
                  className="flex items-baseline gap-2.5 text-[13.5px] text-[var(--color-text-primary)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] inline-block size-1 shrink-0 rounded-full bg-[var(--color-brass)]"
                  />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-[var(--color-brass)]/30 pt-3">
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brass)]">
                Hva du gjør
              </div>
              <p className="text-[13.5px] leading-[1.6] text-[var(--color-text-primary)]">
                {symptom.whatToDo}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              {symptom.slug && (
                <Link
                  href={`/artikler/${symptom.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-copper)]"
                >
                  Les artikkel
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

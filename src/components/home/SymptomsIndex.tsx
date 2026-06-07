import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { symptoms } from "@/data/content";

export function SymptomsIndex() {
  return (
    <section id="symptomer" className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <RevealOnScroll className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-[0.85fr_1.15fr]">
          {/* Framing */}
          <div className="md:sticky md:top-28 md:self-start">
            <h2
              className="font-sans font-extralight text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "-0.04em", lineHeight: 0.94 }}
            >
              Når noe rører seg<span className="text-[var(--color-copper)]">.</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-pretty text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
              Tennene sier fra lenge før du oppsøker noen. Kjenn igjen det vanligste, så tar vi det
              derfra.
            </p>
            <Link
              href="/symptomer"
              className="group mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-copper)]"
            >
              Se alle symptomer
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Hairline index */}
          <ul className="border-t border-[var(--color-brass)]/30">
            {symptoms.map((s) => (
              <li key={s.title}>
                <Link
                  href={s.slug ? `/artikler/${s.slug}` : "/symptomer"}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-5 border-b border-[var(--color-brass)]/30 py-4 transition-transform duration-150 ease-out active:scale-[0.997]"
                >
                  <span className="min-w-0">
                    <span className="block font-sans font-light tracking-[-0.025em] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-copper)]" style={{ fontSize: "clamp(19px, 2vw, 24px)", lineHeight: 1.12 }}>
                      {s.title}
                    </span>
                    <span className="mt-1 block truncate text-[13.5px] leading-[1.4] text-[var(--color-text-muted)]">
                      {s.description.split(".")[0]}.
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 self-center text-[var(--color-brass)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>
    </section>
  );
}

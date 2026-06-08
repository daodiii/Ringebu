import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const pillars = [
  "God tid til hver enkelt",
  "Ærlig og rett fram",
  "Klar beskjed, hver gang",
];

export function AboutLetter() {
  return (
    <section
      id="om-oss"
      className="relative overflow-hidden border-b border-[var(--color-rule-dark)] bg-[var(--color-ink)] py-[var(--space-section)] text-[var(--color-text-on-dark)]"
    >
      {/* Atmospheric eucalyptus glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 32%, rgba(124,177,167,0.12) 0%, rgba(124,177,167,0.04) 38%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[var(--container-max,1280px)] flex-col items-center px-[var(--container-px,24px)] text-center">
        <RevealOnScroll>
          <h2
            className="mx-auto max-w-[18ch] font-semibold tracking-[-0.03em] text-balance"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(2.125rem, 6.2vw, 4.25rem)",
              lineHeight: 1.04,
            }}
          >
            Et lite sted, med god tid til deg.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.12}>
          <p className="mx-auto mt-8 max-w-[54ch] text-lg font-light leading-relaxed text-[var(--color-text-on-dark-muted)] md:text-xl">
            Vi er en liten tannlegeklinikk i Ringebu. Vi tar én pasient om
            gangen, sier det som det er, og forteller deg alltid hva som skjer
            videre.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.24}>
          <ul className="mt-12 flex flex-col items-center justify-center gap-x-7 gap-y-4 sm:flex-row">
            {pillars.map((pillar, i) => (
              <li key={pillar} className="flex items-center gap-x-7">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-amber-deep)] sm:block"
                  />
                )}
                <span className="text-base font-medium tracking-[-0.01em] text-[var(--color-text-on-dark)] md:text-lg">
                  {pillar}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={0.36}>
          <Link
            href="/informasjon"
            className="group mt-12 inline-flex items-center gap-2 text-base font-medium tracking-[-0.01em] text-white transition-colors duration-300 hover:text-[var(--color-amber-deep)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-amber-deep)]"
          >
            Bli kjent med oss
            <ArrowRight className="h-[1.05rem] w-[1.05rem] transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

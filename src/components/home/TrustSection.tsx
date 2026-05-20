import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const CREDENTIALS = [
  {
    name: "Medlem av Den norske tannlegeforening (NTF).",
    sub: "Etiske retningslinjer, kontinuerlig etterutdanning, kvalitetssikret praksis.",
  },
  {
    name: "Direkte oppgjør med HELFO.",
    sub: "Du betaler kun egenandelen. Vi sender refusjonskravet på dine vegne.",
  },
  {
    name: "Praksis i Gudbrandsdalen siden 1985.",
    sub: "Over fire tiår i samme dal — vi kjenner pasientene våre.",
  },
] as const;

export function TrustSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink-warm)] py-[var(--space-section)] text-[var(--color-text-on-dark)]">
      <GrainOverlay opacity={0.05} />
      <RevealOnScroll className="relative mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <SectionEyebrow tone="ink" withRule className="mb-7">
          Trygghet & kvalitet
        </SectionEyebrow>

        <p className="max-w-[620px] font-sans text-[28px] font-medium leading-[1.1] tracking-[-0.025em] text-[var(--color-text-on-dark)] md:text-[32px]">
          Tre konkrete grunner til at tannhelsen din er trygg hos oss.
        </p>

        <ul className="mt-12 divide-y divide-[var(--color-rule-dark)] border-y border-[var(--color-rule-dark)]">
          {CREDENTIALS.map((c) => (
            <li key={c.name} className="py-7">
              <div className="font-sans text-[22px] font-medium leading-[1.15] tracking-[-0.022em] text-[var(--color-text-on-dark)] md:text-[24px]">
                {c.name}
              </div>
              <p className="mt-2 max-w-[640px] text-[14px] leading-[1.55] text-[var(--color-text-on-dark-muted)]">
                {c.sub}
              </p>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}

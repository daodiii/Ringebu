import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { symptoms } from "@/data/content";
import { SeverityPill, type Severity } from "@/components/ui/SeverityPill";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

function mapSeverity(raw: string): Severity {
  const s = raw.toLowerCase();
  if (s.includes("snarest") || s.includes("oppsøk")) return "now";
  if (s.includes("behandles") || s.includes("undersøk")) return "soon";
  return "watch";
}

const TIPS = [
  { title: "Kaffe, brunost og tennene dine: ", accent: "norsk kosthold og tannhelse.", href: "/artikler" },
  { title: "Munnskyll — når det hjelper og når du ", accent: "kaster bort penger.", href: "/artikler" },
  { title: "Spyttets superkrefter: kroppens egen ", accent: "tannbeskyttelse.", href: "/artikler" },
] as const;

export function SymptomsAlmanac() {
  const top5 = symptoms.slice(0, 5);

  return (
    <section className="bg-[var(--color-paper)] py-[var(--space-section)]">
      <RevealOnScroll className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <h2 className="display-section max-w-[640px] text-[var(--color-text-primary)]">
            Hva er det egentlig — og hvor raskt bør du handle?
          </h2>
          <p className="max-w-[300px] text-[15px] leading-[1.55] text-[var(--color-text-secondary)] md:text-right">
            Veiledning til de vanligste symptomene — ikke selvdiagnose.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.2fr_1fr] lg:gap-9">
          <ul className="rounded-[var(--radius-tile)] bg-white ring-1 ring-[var(--color-rule)]">
            {top5.map((s) => {
              const sev = mapSeverity(s.severity);
              return (
                <li
                  key={s.slug + s.title}
                  className="border-b border-[var(--color-rule)] last:border-b-0"
                >
                  <Link
                    href={`/symptomer/${s.slug}`}
                    className="grid grid-cols-[1fr_auto] items-center gap-5 px-6 py-5 transition-colors hover:bg-[var(--color-paper)]/70 md:px-7 md:py-6"
                  >
                    <span>
                      <span className="block font-sans text-[16px] font-medium tracking-[-0.01em] text-[var(--color-text-primary)]">
                        {s.title}
                      </span>
                      <span className="mt-1 block font-sans text-[13px] text-[var(--color-text-secondary)]">
                        {s.description.split(".")[0]}.
                      </span>
                    </span>
                    <SeverityPill severity={sev} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-3.5">
            {TIPS.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group rounded-[var(--radius-tile)] bg-white p-6 ring-1 ring-[var(--color-rule)] transition-shadow hover:shadow-[0_8px_30px_rgba(26,20,16,0.06)]"
              >
                <div className="font-sans text-[19px] font-medium leading-[1.25] tracking-[-0.018em] text-[var(--color-text-primary)]">
                  {t.title}
                  <span className="font-normal text-[var(--color-stone)]">{t.accent}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-text-primary)]">
                  Les mer
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            href="/symptomer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-text-primary)] underline decoration-[var(--color-brass)] underline-offset-[6px] hover:decoration-[var(--color-text-primary)]"
          >
            Se alle symptomer
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/artikler"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-text-primary)] underline decoration-[var(--color-brass)] underline-offset-[6px] hover:decoration-[var(--color-text-primary)]"
          >
            Se alle artikler
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}

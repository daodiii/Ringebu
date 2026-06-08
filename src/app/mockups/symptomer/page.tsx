import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Symptomer-seksjon mockups", robots: { index: false } };

const CONCEPTS = [
  {
    n: "A",
    name: "Munnkart — nåværende valg",
    desc: "Interaktivt diagram av tannbuen i ekte tenner. Pek på et område eller velg en knapp, og årsaker og råd trer fram ved siden av. Anatomisk og umiddelbart gjenkjennelig.",
    href: "/mockups/symptomer/a",
  },
  {
    n: "B",
    name: "Røntgen",
    desc: "Et mørkt klinisk lysbord. Et panoramisk røntgenbilde av tannrekken med en skannestråle som sveiper over filmen; velg et tegn og tannen lyser opp med siktekors. Atmosfærisk og medisinsk presist.",
    href: "/mockups/symptomer/b",
  },
  {
    n: "C",
    name: "Storformat",
    desc: "Et redaksjonelt oppslag i kjempeformat. Symptomnavnet settes enormt i ekstralett Geist og bygges opp bokstav for bokstav når det skifter. Rolig autoplay som gir fra seg styringen i det du tar over.",
    href: "/mockups/symptomer/c",
  },
  {
    n: "D",
    name: "Konstellasjon",
    desc: "Symptomene som et levende nettverk. Noder i størrelse etter alvorsgrad, bundet sammen av tynne tråder som viser hvordan ett tegn henger sammen med det neste. Velg en node, og trådene lyser opp.",
    href: "/mockups/symptomer/d",
  },
];

export default function SymptomerMockupsIndex() {
  return (
    <main className="bg-[var(--color-paper)]">
      <header className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-12 pt-32 md:pt-40">
        <h1
          className="font-sans font-extralight text-[var(--color-text-primary)]"
          style={{ fontSize: "clamp(48px, 7vw, 92px)", letterSpacing: "-0.045em", lineHeight: 0.92 }}
        >
          Symptomer-seksjonen<span className="text-[var(--color-copper)]">.</span>
        </h1>
        <p className="mt-6 max-w-[54ch] text-pretty text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
          Tre retninger for symptom-seksjonen på forsiden. Hver er bygd for å få deg til å kjenne
          igjen et tegn og klikke deg videre.
        </p>
      </header>

      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-28">
        <div className="border-t border-[var(--color-brass)]/30">
          {CONCEPTS.map((c) => (
            <article
              key={c.n}
              className="grid grid-cols-1 gap-6 border-b border-[var(--color-brass)]/30 py-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12"
            >
              <span className="font-mono text-[12px] tracking-[0.1em] tabular-nums text-[var(--color-copper)]">
                {c.n}
              </span>
              <div className="max-w-[60ch]">
                <h2
                  className="font-sans font-light text-[var(--color-text-primary)]"
                  style={{ fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  {c.name}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-text-secondary)]">
                  {c.desc}
                </p>
              </div>
              <Link
                href={c.href}
                className="inline-flex items-center justify-between gap-6 self-start border border-[var(--color-brass)]/40 px-5 py-2.5 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)]"
              >
                Se mockup
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Papirteater · mockups", robots: { index: false } };

const PAPER = [
  {
    name: "Forsiden",
    desc: "Hele forsiden, med papirteater i de seks boksene under toppen. Når en boks åpner seg, spretter scenen opp i et buet vindu ved siden av teksten. Hver boks har sine egne papirfarger. Beveg pekeren over boksen, så lener lagene seg.",
    href: "/mockups/forside",
  },
  {
    name: "Behandlinger i farger",
    desc: "Buegangen med papirteater i alle ni buene. Hver bue har sin egen scene og sine egne farger: fjord, frost, lav, lyng, bjørk, mose, eukalyptus, skumring og molte.",
    href: "/mockups/buegangen/papir-farger",
  },
];

export default function PapirteaterIndex() {
  return (
    <main className="bg-[var(--color-paper)]">
      <header className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-12 pt-32 md:pt-40">
        <h1
          className="font-sans font-extralight text-[var(--color-text-primary)]"
          style={{ fontSize: "clamp(48px, 7vw, 92px)", letterSpacing: "-0.045em", lineHeight: 0.92 }}
        >
          Papirteater
        </h1>
        <p className="mt-6 max-w-[56ch] text-pretty text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
          Et lite papirteater for hver behandling, på forsiden og på behandlingssiden.
        </p>
      </header>

      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-28">
        <div className="border-t border-[var(--color-brass)]/30">
          {PAPER.map((c) => (
            <article
              key={c.href}
              className="grid grid-cols-1 gap-6 border-b border-[var(--color-brass)]/30 py-10 md:grid-cols-[1fr_auto] md:items-start md:gap-12"
            >
              <div className="max-w-[64ch]">
                <h2
                  className="font-sans font-light text-[var(--color-text-primary)]"
                  style={{ fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  {c.name}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-text-secondary)]">{c.desc}</p>
              </div>
              <Link
                href={c.href}
                className="inline-flex items-center justify-between gap-6 self-start border border-[var(--color-brass)]/40 px-5 py-2.5 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-ink)]"
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

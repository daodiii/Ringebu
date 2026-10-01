import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Hero · tre retninger", robots: { index: false } };

const RETNINGER = [
  {
    name: "Dalen",
    desc: "Gudbrandsdalen i papir under navnet. Arkene reiser seg ett for ett, og året går av seg selv: sommer, høst, vinter og vår vasker over dalen. Dyrene kommer og går med årstiden, og toget passerer.",
    href: "/mockups/hero/dalen",
  },
  {
    name: "Buen",
    desc: "En bue skjært inn i papirveggen, med dalen dypt der inne. Flytt musa, og du ser inn som gjennom et ekte vindu. Skiltet henger i åpningen og svinger når du kommer borti det.",
    href: "/mockups/hero/buen",
  },
  {
    name: "Oppslaget",
    desc: "En sprettopp-bok som åpner seg, og dalen folder seg opp av midten: fjell, bjørk, elg og sauer. Når du ruller forbi, legger den seg flat igjen.",
    href: "/mockups/hero/oppslag",
  },
];

export default function HeroMockups() {
  return (
    <main className="bg-[var(--color-paper)]">
      <header className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-12 pt-32 md:pt-40">
        <h1 className="display-section text-[var(--color-text-primary)]">Tre forsider i papir</h1>
      </header>
      <ul className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-28">
        {RETNINGER.map((r) => (
          <li key={r.href} className="border-b border-[var(--color-rule)] first:border-t">
            <Link href={r.href} className="group grid gap-4 py-10 md:grid-cols-[1fr_auto] md:items-center">
              <div className="max-w-[60ch]">
                <h2 className="font-sans text-[34px] font-light tracking-[-0.035em] text-[var(--color-ink)]">{r.name}</h2>
                <p className="mt-3 text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">{r.desc}</p>
              </div>
              <ArrowUpRight aria-hidden="true" className="size-6 text-[var(--color-ink)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

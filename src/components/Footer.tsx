import Link from "next/link";
import { ARCADE_TREATMENTS } from "@/components/behandlinger/data";
import { FIRMA, KONTAKT } from "@/components/kontakt/data";

// The five on the front page, each straight to its arch on /behandlinger.
const TREATMENTS = ["forebyggende-behandling", "fyllingsterapi", "rotfylling", "kroner-og-broer", "tannimplantater"].map((slug) => {
  const t = ARCADE_TREATMENTS.find((a) => a.slug === slug);
  if (!t) throw new Error(`No treatment "${slug}" on /behandlinger`);
  return { label: t.title, href: `/behandlinger#${slug}` };
});

const PRACTICAL = [
  { label: "Priser", href: "/priser" },
  { label: "Støtteordninger", href: "/dekning" },
  { label: "Symptomer", href: "/symptomer" },
  { label: "Slik finner du oss", href: "/kontakt#slik-finner-du-oss" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink-warm)] text-white border-t border-[var(--color-brass)]/40">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-10 pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <div className="font-sans text-[18px] font-semibold tracking-[-0.015em] text-white">
                Ringebu Tannlegesenter
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/80">
              Tannhelse med tid og omtanke. For hele dalen, og for de som besøker den.
            </p>
          </div>

          <FooterColumn title="Behandling" links={TREATMENTS} />
          <FooterColumn title="Praktisk" links={PRACTICAL} />

          <div>
            <h4 className="mb-4 font-sans text-[15px] font-semibold text-white">
              Kontakt
            </h4>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <a
                  href={KONTAKT.phone.href}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {KONTAKT.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={KONTAKT.email.href}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {KONTAKT.email.display}
                </a>
              </li>
              <li className="text-white/80">Jernbanegata 4</li>
              <li className="text-white/80">2630 Ringebu</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-rule-dark)] pt-6 text-[14px] text-white/70">
          <span>
            © {new Date().getFullYear()} {FIRMA.name}
          </span>
          <span>Org.nr. {FIRMA.orgnr}</span>
          <Link href="/personvern" className="underline-offset-4 transition-colors hover:text-white hover:underline">
            Personvern
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="mb-4 font-sans text-[15px] font-semibold text-white">
        {title}
      </h4>
      <ul className="space-y-2.5 text-[15px]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

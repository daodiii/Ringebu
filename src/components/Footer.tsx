import Link from "next/link";

const TREATMENTS = [
  { label: "Forebyggende", href: "/behandlinger" },
  { label: "Generell", href: "/behandlinger" },
  { label: "Akutt tannhjelp", href: "/behandlinger" },
  { label: "Estetisk", href: "/behandlinger" },
  { label: "Implantater", href: "/behandlinger" },
];

const PRACTICAL = [
  { label: "Priser", href: "/priser" },
  { label: "Støtteordninger", href: "/dekning" },
  { label: "Symptomer", href: "/symptomer" },
  { label: "Tips & råd", href: "/artikler" },
  { label: "Slik finner du oss", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink-warm)] text-white border-t border-[var(--color-brass)]/40">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <div className="font-sans text-base font-semibold tracking-[-0.01em] text-white">
                Ringebu Tannlegesenter
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/80">
              Tannhelse med tid og omtanke — for hele dalen, og for de som besøker den.
            </p>
          </div>

          <FooterColumn title="Behandling" links={TREATMENTS} />
          <FooterColumn title="Praktisk" links={PRACTICAL} />

          <div>
            <h4 className="mb-4 font-sans text-[14px] font-medium text-white">
              Kontakt
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a
                  href="tel:61280412"
                  className="text-white/80 transition-colors hover:text-white"
                >
                  61 28 04 12
                </a>
              </li>
              <li>
                <a
                  href="mailto:post@ringebutann.no"
                  className="text-white/80 transition-colors hover:text-white"
                >
                  post@ringebutann.no
                </a>
              </li>
              <li className="text-white/80">Hanstadgata 2</li>
              <li className="text-white/80">2630 Ringebu</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-rule-dark)] pt-5">
          <span className="text-[13px] text-white/70">
            © {new Date().getFullYear()} Ringebu Tannlegesenter
          </span>
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
      <h4 className="mb-4 font-sans text-[14px] font-medium text-white">
        {title}
      </h4>
      <ul className="space-y-2.5 text-[13px]">
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

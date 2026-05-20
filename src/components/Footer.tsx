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
  { label: "Symptomer", href: "/symptomer" },
  { label: "Tips & råd", href: "/artikler" },
  { label: "Slik finner du oss", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink-warm)] text-[var(--color-text-on-dark)] border-t border-[var(--color-brass)]/40">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <div className="font-sans text-base font-semibold tracking-[-0.01em] text-[var(--color-text-on-dark)]">
                Ringebu Tannlegesenter
              </div>
              <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                Gudbrandsdalen · siden 1985
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[var(--color-text-on-dark-muted)]">
              Tannhelse med tid og omtanke — for hele dalen, og for de som besøker den.
            </p>
          </div>

          <FooterColumn title="Behandling" links={TREATMENTS} />
          <FooterColumn title="Praktisk" links={PRACTICAL} />

          <div>
            <h4 className="mb-4 font-mono text-[9.5px] font-semibold uppercase tracking-[0.3em] text-[var(--color-brass)]">
              Kontakt
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a
                  href="tel:61280412"
                  className="text-[var(--color-text-on-dark)]/80 transition-colors hover:text-[var(--color-text-on-dark)]"
                >
                  61 28 04 12
                </a>
              </li>
              <li>
                <a
                  href="mailto:post@ringebutann.no"
                  className="text-[var(--color-text-on-dark)]/80 transition-colors hover:text-[var(--color-text-on-dark)]"
                >
                  post@ringebutann.no
                </a>
              </li>
              <li className="text-[var(--color-text-on-dark)]/80">Hanstadgata 2</li>
              <li className="text-[var(--color-text-on-dark)]/80">2630 Ringebu</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-rule-dark)] pt-5 sm:flex-row sm:items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-on-dark-muted)]">
            © {new Date().getFullYear()} Ringebu Tannlegesenter
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-on-dark-muted)]">
            Tannhelse · Gudbrandsdalen
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
      <h4 className="mb-4 font-mono text-[9.5px] font-semibold uppercase tracking-[0.3em] text-[var(--color-brass)]">
        {title}
      </h4>
      <ul className="space-y-2.5 text-[13px]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[var(--color-text-on-dark)]/80 transition-colors hover:text-[var(--color-text-on-dark)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supportPages } from "@/data/content";

/**
 * Every scheme as plain text under the signpost: what it is, for whom, and
 * the way to its page. The arms say only the names, so this is where the
 * page's text lives, for anyone who would rather read, and for search
 * engines. Set like «Alle behandlinger» and «Alle symptomer».
 */
export function OrdningListe() {
  return (
    <section aria-labelledby="alle-ordninger" className="bg-[var(--color-paper)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] py-[var(--space-section)]">
        <h2 id="alle-ordninger" className="display-section text-[var(--color-text-primary)]">
          Alle ordninger
        </h2>
        <ul className="mt-12 border-t border-[var(--color-rule)] lg:mt-16">
          {supportPages.map((p) => (
            <li
              key={p.slug}
              className="grid grid-cols-1 gap-x-16 gap-y-3 border-b border-[var(--color-rule)] py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:py-12 lg:gap-x-24"
            >
              <div>
                <h3 className="font-sans text-[var(--color-ink)]" style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                  {p.shortTitle}
                </h3>
                <p className="mt-2 text-[17px] text-[var(--color-stone)] lg:text-[19px]">
                  {p.heroSubtitle} · {p.badge}
                </p>
              </div>
              <div>
                <p className="max-w-[46ch] text-pretty text-[18px] leading-[1.6] text-[var(--color-text-secondary)] lg:text-[20px]">{p.hubSummary}</p>
                <Link
                  href={`/dekning/${p.slug}`}
                  className="group mt-5 inline-flex items-center gap-2 text-[17px] font-semibold text-[var(--color-ink)] underline decoration-[rgba(14,42,48,0.25)] underline-offset-[6px] hover:decoration-[var(--color-ink)]"
                >
                  Les mer<span className="sr-only"> om {p.shortTitle}</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

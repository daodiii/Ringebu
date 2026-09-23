import { ARCADE_TREATMENTS as T } from "./data";
import { TreatmentBody } from "./TreatmentBody";

/**
 * Every treatment in full, as plain text under the arcade. In the arcade the
 * details only appear once you walk through an arch, so without this list the
 * page's HTML would carry nothing but the names, for search engines and for
 * anyone who would rather read than walk.
 */
export function TreatmentIndex() {
  return (
    <section aria-labelledby="alle-behandlinger" className="border-t border-[var(--color-rule)] bg-[var(--color-paper)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] py-[var(--space-section)]">
        <h2 id="alle-behandlinger" className="display-section text-[var(--color-text-primary)]">
          Alle behandlinger
        </h2>
        <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.5] text-[var(--color-text-secondary)]">
          Alt fra buene over, samlet på ett sted.
        </p>

        <ul className="mt-12 border-t border-[var(--color-rule)]">
          {T.map((t) => (
            <li
              key={t.slug}
              id={t.slug}
              className="grid scroll-mt-28 grid-cols-1 gap-x-16 gap-y-2 border-b border-[var(--color-rule)] py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:py-14"
            >
              <div>
                <h3
                  className="font-sans font-light text-[var(--color-ink)]"
                  style={{ fontSize: "clamp(28px, 2.8vw, 40px)", letterSpacing: "-0.035em", lineHeight: 1.02 }}
                >
                  {t.title}
                </h3>
                <p className="mt-2 text-[17px] text-[var(--color-stone)]">{t.subtitle}</p>
              </div>
              <TreatmentBody t={t} cta={false} level={4} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

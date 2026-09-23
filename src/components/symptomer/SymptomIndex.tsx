import { SYMPTOMS, URGENCY_COLOR } from "./data";

/**
 * Every symptom in full, as plain text under the arch. The arch only shows
 * the symptom you pick, so without this list the page's HTML would carry
 * one symptom at most, for search engines and for anyone who would rather
 * read than pick things up.
 */
export function SymptomIndex() {
  return (
    <section aria-labelledby="alle-symptomer" className="border-t border-[var(--color-rule)] bg-[var(--color-paper)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] py-[var(--space-section)]">
        <h2 id="alle-symptomer" className="display-section text-[var(--color-text-primary)]">
          Alle symptomer
        </h2>
        <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.5] text-[var(--color-text-secondary)]">
          Alt fra buen over, samlet på ett sted.
        </p>

        <ul className="mt-12 border-t border-[var(--color-rule)]">
          {SYMPTOMS.map((s) => (
            <li
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-28 grid-cols-1 gap-x-16 gap-y-2 border-b border-[var(--color-rule)] py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:py-14"
            >
              <div>
                <h3
                  className="font-sans font-light text-[var(--color-ink)]"
                  style={{ fontSize: "clamp(28px, 2.8vw, 40px)", letterSpacing: "-0.035em", lineHeight: 1.02 }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-[17px] text-[var(--color-stone)]">{s.kicker}</p>
              </div>
              <div className="text-[var(--color-text-primary)]">
                <p className="max-w-[46ch] text-pretty text-[18px] leading-[1.6] text-[var(--color-text-secondary)]">
                  {s.description}
                </p>
                <Block label="Mulige årsaker">
                  <ul>
                    {s.causes.map((c) => (
                      <li
                        key={c}
                        className="border-t border-[var(--color-rule)] py-3 text-[16px] leading-[1.45] first:border-t-0 first:pt-0"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block label="Hva du gjør">
                  <p className="max-w-[46ch] text-[16px] leading-[1.55]">{s.whatToDo}</p>
                  <p className="mt-3 flex items-center gap-2.5 text-[14.5px] font-medium" style={{ color: URGENCY_COLOR[s.urgency] }}>
                    <span aria-hidden="true" className="inline-block size-2 rounded-full" style={{ background: URGENCY_COLOR[s.urgency] }} />
                    {s.severity}
                  </p>
                </Block>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h4 className="mb-3 text-[13px] font-medium tracking-[-0.005em] text-[var(--color-text-muted)]">{label}</h4>
      {children}
    </section>
  );
}

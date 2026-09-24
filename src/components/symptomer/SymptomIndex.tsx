"use client";

import { useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { SYMPTOMS, type Symptom } from "./data";

/**
 * Every symptom in full, as plain text under the arch. The arch only shows
 * the symptom you pick, so without this list the page's HTML would carry
 * one symptom at most, for search engines and for anyone who would rather
 * read than pick things up.
 *
 * On a phone the eight ran to six screens, so there each one is a row that
 * opens: the name and one line show, the rest is a tap away. The text is in
 * the page either way, and a link straight to a symptom (/symptomer#tannpine,
 * as the cards on the front page use) arrives with it open. From 768px up
 * they all stand open, as before.
 */
export function SymptomIndex() {
  return (
    <section aria-labelledby="alle-symptomer" className="border-t border-[var(--color-rule)] bg-[var(--color-paper)]">
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] py-[var(--space-section)]">
        <h2 id="alle-symptomer" className="display-section text-[var(--color-text-primary)]">
          Alle symptomer
        </h2>
        <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.5] text-[var(--color-text-secondary)] lg:text-[22px]">
          Alt fra buen over, samlet på ett sted.
        </p>

        <ul className="mt-12 border-t lg:mt-16 border-[var(--color-rule)]">
          {SYMPTOMS.map((s) => (
            <Entry key={s.slug} s={s} />
          ))}
        </ul>
      </div>
    </section>
  );
}

const onHashChange = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

function Entry({ s }: { s: Symptom }) {
  // A link to this symptom opens it; after that, the reader's tap decides.
  const linked = useSyncExternalStore(onHashChange, () => window.location.hash, () => "") === `#${s.slug}`;
  const [chosen, setChosen] = useState<boolean | null>(null);
  const open = chosen ?? linked;
  const titleId = `${s.slug}-tittel`;
  const bodyId = `${s.slug}-tekst`;

  return (
    <li
      id={s.slug}
      className="grid scroll-mt-28 grid-cols-1 gap-x-16 gap-y-2 border-b border-[var(--color-rule)] py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:py-14 lg:gap-x-24 lg:py-20"
    >
      <div className="relative pr-10 md:pr-0">
        <h3
          id={titleId}
          className="font-sans font-light text-[var(--color-ink)]"
          style={{ fontSize: "clamp(28px, 3.8vw, 58px)", letterSpacing: "-0.035em", lineHeight: 1.02 }}
        >
          {s.title}
        </h3>
        <p className="mt-2 text-[17px] text-[var(--color-stone)] lg:mt-3 lg:text-[21px]">{s.kicker}</p>
        {/* On a phone the whole row opens and closes */}
        <button
          type="button"
          aria-labelledby={titleId}
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setChosen(!open)}
          className="absolute inset-0 rounded-[2px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)] md:hidden"
        >
          {/* A plus while closed; it turns into a cross when open */}
          <X
            aria-hidden="true"
            className={`absolute right-0 top-2 size-5 text-[var(--color-ink)] transition-transform duration-300 ${open ? "" : "rotate-45"}`}
          />
        </button>
      </div>
      <div id={bodyId} className={`${open ? "block" : "hidden"} pt-3 text-[var(--color-text-primary)] md:block md:pt-0`}>
        <p className="max-w-[46ch] text-pretty text-[18px] leading-[1.6] text-[var(--color-text-secondary)] lg:text-[23px] lg:leading-[1.55]">
          {s.description}
        </p>
        <Block label="Mulige årsaker">
          <ul className="lg:grid lg:grid-cols-2 lg:gap-x-10">
            {s.causes.map((c) => (
              <li
                key={c}
                className="border-t border-[var(--color-rule)] py-3 text-[16px] leading-[1.45] first:border-t-0 first:pt-0 lg:py-4 lg:text-[19px] lg:[&:nth-child(2)]:border-t-0 lg:[&:nth-child(-n+2)]:pt-0"
              >
                {c}
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </li>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-9 lg:mt-12">
      <h4 className="mb-3 text-[13px] font-medium tracking-[-0.005em] text-[var(--color-text-muted)] lg:mb-5 lg:text-[15px]">{label}</h4>
      {children}
    </section>
  );
}

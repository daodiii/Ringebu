import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArcadeTreatment } from "./data";

/**
 * The facts of one treatment: beside its scene when you walk through an arch,
 * and again in the plain list under the arcade.
 *
 * `cta` adds the booking buttons (the doorway wants them; nine copies down the
 * list would not). `level` is the heading level of the small section labels,
 * one below whatever titles the treatment where it is shown.
 */
export function TreatmentBody({ t, cta = true, level = 3 }: { t: ArcadeTreatment; cta?: boolean; level?: 3 | 4 }) {
  return (
    <div className="text-[var(--color-text-primary)]">
      <p className="max-w-[46ch] text-pretty text-[18px] leading-[1.6] text-[var(--color-text-secondary)]">
        {t.description}
      </p>

      <Block level={level} label="Dette gjør vi">
        <ul>
          {t.features.map((f) => (
            <li
              key={f}
              className="border-t border-[var(--color-rule)] py-3 text-[16px] leading-[1.45] first:border-t-0 first:pt-0"
            >
              {f}
            </li>
          ))}
        </ul>
      </Block>

      {cta && (
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[14px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Bestill time
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <a
            href="tel:61280412"
            className="inline-flex items-center rounded-full border border-[rgba(14,42,48,0.18)] px-5 py-3.5 text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:border-[rgba(14,42,48,0.4)]"
          >
            61 28 04 12
          </a>
        </div>
      )}
    </div>
  );
}

function Block({ label, level, children }: { label: string; level: 3 | 4; children: React.ReactNode }) {
  const H = level === 3 ? "h3" : "h4";
  return (
    <section className="mt-9">
      <H className="mb-3 text-[13px] font-medium tracking-[-0.005em] text-[var(--color-text-muted)]">{label}</H>
      {children}
    </section>
  );
}

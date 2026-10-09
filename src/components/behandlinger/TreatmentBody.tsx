import type { ArcadeTreatment } from "./data";
import { Handlinger } from "@/components/kontakt/Handlinger";

/**
 * The facts of one treatment: beside its scene when you walk through an arch,
 * and again in the plain list under the arcade.
 *
 * `cta` adds the call and «Be om time» buttons (the doorway wants them; eleven copies down
 * the list would not). `level` is the heading level of the small section labels,
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
        <Handlinger className="mt-10" />
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

import { cn } from "@/lib/utils";

export type Severity = "now" | "soon" | "watch";

interface Props {
  severity: Severity;
  className?: string;
}

const LABELS: Record<Severity, string> = {
  now: "Oppsøk nå",
  soon: "Undersøk",
  watch: "Følg med",
};

const STYLES: Record<Severity, string> = {
  now: "bg-[var(--color-urgent)] text-[var(--color-paper)]",
  soon: "bg-[var(--color-amber-deep)] text-[var(--color-ink)]",
  watch: "bg-[rgba(26,20,16,0.08)] text-[var(--color-text-secondary)]",
};

export function SeverityPill({ severity, className }: Props) {
  return (
    <span
      className={cn(
        "inline-block rounded-full font-mono text-[9.5px] uppercase tracking-[0.15em] px-2.5 py-1 font-semibold",
        STYLES[severity],
        className
      )}
    >
      {LABELS[severity]}
    </span>
  );
}

import { cn } from "@/lib/utils";

type Tone = "ink" | "paper";

interface Props {
  label: string;
  value: React.ReactNode;
  tone?: Tone;
  className?: string;
}

const labelToneClasses: Record<Tone, string> = {
  ink: "text-[var(--color-brass)]",
  paper: "text-[var(--color-text-muted)]",
};

const valueToneClasses: Record<Tone, string> = {
  ink: "text-[var(--color-text-on-dark)]",
  paper: "text-[var(--color-text-primary)]",
};

export function DataCell({ label, value, tone = "paper", className }: Props) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-mono text-[9.5px] uppercase tracking-[0.25em]",
          labelToneClasses[tone]
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-sans text-[13px] font-semibold tracking-[-0.01em]",
          valueToneClasses[tone]
        )}
      >
        {value}
      </span>
    </div>
  );
}

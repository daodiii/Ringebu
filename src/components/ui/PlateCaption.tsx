import { cn } from "@/lib/utils";

interface Props {
  marker: string;
  subject: string;
  origin: string;
  className?: string;
}

export function PlateCaption({ marker, subject, origin, className }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-6 border-t border-[var(--color-rule)] pt-3 text-[var(--color-text-muted)]",
        "font-mono text-[10px] uppercase tracking-[0.18em]",
        className
      )}
    >
      <strong className="font-semibold text-[var(--color-text-primary)]">{marker}</strong>
      <span>{subject}</span>
      <span>{origin}</span>
    </div>
  );
}

import { cn } from "@/lib/utils";

type Tone = "ink" | "paper";

interface Props {
  children: React.ReactNode;
  tone?: Tone;
  withRule?: boolean;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  ink: "text-[var(--color-amber)]",
  paper: "text-[var(--color-stone)]",
};

const ruleToneClasses: Record<Tone, string> = {
  ink: "bg-[var(--color-brass)]",
  paper: "bg-[var(--color-brass)]",
};

export function SectionEyebrow({
  children,
  tone = "paper",
  withRule = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-3.5",
        toneClasses[tone],
        className
      )}
    >
      {withRule && (
        <span
          aria-hidden="true"
          className={cn("inline-block h-px w-7", ruleToneClasses[tone])}
        />
      )}
      <span>{children}</span>
    </div>
  );
}

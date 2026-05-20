// src/components/treatments/RefusionChip.tsx
import type { Refusion } from "@/app/behandlinger/data";

const COLOR_VAR: Record<Refusion, string> = {
  "HELFO":        "var(--color-stone)",   // sage in the new palette
  "Delvis HELFO": "var(--color-brass)",
  "Egenandel":    "var(--color-copper)",
};

interface Props {
  refusion: Refusion;
}

export function RefusionChip({ refusion }: Props) {
  const color = COLOR_VAR[refusion];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block size-[5px] rounded-full"
        style={{ background: color }}
      />
      {refusion}
    </span>
  );
}

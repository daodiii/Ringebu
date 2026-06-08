import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  /** Use a transparent chip and draw the mark in petrol (for light contexts). */
  inverted?: boolean;
}

/* Tooth + heart mark, rebuilt as a clean line drawing.
   Colors come from CSS tokens so it follows the palette. */
export function Logo({ className, inverted = false }: Props) {
  const chip = inverted ? "transparent" : "var(--color-ink)";
  const mark = inverted ? "var(--color-ink)" : "var(--color-amber)";
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Ringebu Tannlegesenter"
    >
      <rect x="0" y="0" width="100" height="100" rx="24" fill={chip} />
      <g
        fill="none"
        stroke={mark}
        strokeWidth={4.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* tooth outline — smooth crown, two roots splaying from the centre */}
        <path d="M22,42 C22,27 33,19 45,24 C48,25 49,29 50,32 C51,29 52,25 55,24 C67,19 78,27 78,42 C78,52 75,63 68,73 C65,78 62,82 59,82 C56,80 52,72 50,68 C48,72 44,80 41,82 C38,82 35,78 32,73 C25,63 22,52 22,42 Z" />
        {/* calligraphic flourish at the crown */}
        <path d="M50,31 C49,23 53,18 59,17 C56,21 55,26 56,31" />
        {/* heart nestled at the centre */}
        <path d="M50,48 C50,45 46,42 41,42 C34,42 34,50 34,50 C34,55 41,59 50,66 C59,59 66,55 66,50 C66,50 66,42 59,42 C54,42 50,45 50,48 Z" />
      </g>
    </svg>
  );
}

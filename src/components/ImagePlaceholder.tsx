import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  className?: string;
  tone?: "light" | "mid" | "dark";
  rounded?: string;
  label?: string;
}

const toneMap = {
  light: "bg-[var(--color-placeholder)]",
  mid: "bg-[var(--color-placeholder-mid)]",
  dark: "bg-[var(--color-placeholder-dark)]",
};

export default function ImagePlaceholder({
  className,
  tone = "light",
  rounded = "rounded-xl",
  label,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        toneMap[tone],
        rounded,
        className
      )}
    >
      {label && (
        <span className="absolute bottom-4 left-4 text-xs text-[var(--color-text-muted)] font-sans opacity-50">
          {label}
        </span>
      )}
    </div>
  );
}

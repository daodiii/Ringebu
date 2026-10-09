import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hjelpFor, type Symptom } from "./data";

/**
 * From the problem to the help: the treatments a symptom leads to, each a
 * link that walks the arcade on /behandlinger to its arch and opens it. A
 * link, not advice: the owner removed every «what to do» line from the
 * symptoms, and this adds none.
 */
export function Hjelp({ s, size = 17, className = "" }: { s: Symptom; size?: number; className?: string }) {
  const hjelp = hjelpFor(s);
  return (
    <p className={`flex flex-wrap items-baseline gap-x-5 gap-y-2 ${className}`} style={{ fontSize: size }}>
      <span className="text-[var(--color-text-secondary)]">Dette kan hjelpe:</span>
      {/* The links wrap as one: a second link alone under the label read as a new line of text */}
      <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
        {hjelp.map((h) => (
          <Link
            key={h.slug}
            href={h.href}
            className="group inline-flex items-center gap-1.5 font-semibold text-[var(--color-ink)] underline decoration-[rgba(14,42,48,0.25)] underline-offset-[5px] hover:decoration-[var(--color-ink)]"
          >
            {h.title}
            <ArrowRight className="size-[0.9em] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        ))}
      </span>
    </p>
  );
}

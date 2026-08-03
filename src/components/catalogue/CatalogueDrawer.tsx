"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Plate } from "./Plate";
import type { SpreadItem } from "./items";

interface Props {
  title: string;
  lead: string;
  items: SpreadItem[];
}

function Drawer({ item, open, onToggle, priority }: {
  item: SpreadItem;
  open: boolean;
  onToggle: () => void;
  priority?: boolean;
}) {
  // A row without a usable photograph carries no plate at all — the text runs
  // full width rather than sitting beside an empty square.
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPlate = Boolean(item.photo) && !photoFailed;

  // Must stay referentially stable: next/image keys its internal ref callback
  // on `onError`, so a fresh closure each render re-attaches the ref and
  // reassigns `img.src` on every row toggle.
  const handlePhotoError = useCallback(() => {
    // Degrading quietly would hide a renamed or missing file in production.
    console.error(
      `CatalogueDrawer: photo failed to load for "${item.title}" (${item.photo}). Rendering the row without a plate.`
    );
    setPhotoFailed(true);
  }, [item.title, item.photo]);

  return (
    <div className="border-b border-[var(--color-brass)]/30">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group relative grid w-full grid-cols-[1fr_auto] items-baseline gap-5 py-6 text-left transition-transform duration-150 ease-out active:scale-[0.997] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-copper)] md:py-7"
      >
        <span
          className="font-sans font-light transition-colors duration-300"
          style={{
            fontSize: "clamp(31px, 3.9vw, 55px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            color: open ? "var(--color-text-primary)" : "var(--color-text-muted)",
          }}
        >
          {item.title}
        </span>
        <span className="flex items-center gap-4">
          <svg
            viewBox="0 0 16 16"
            className="size-5 shrink-0 text-[var(--color-text-muted)] transition-transform duration-[400ms] ease-out"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M8 2.5v11M2.5 8h11" />
          </svg>
        </span>

        {/* Copper rule draws across on open */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-[var(--color-copper)] transition-transform duration-[500ms] ease-out"
          style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
        />
      </button>

      {/* Drawer body — grid-rows height transition */}
      <div
        className="grid transition-[grid-template-rows] duration-[450ms] ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "grid grid-cols-1 items-center gap-8 py-6 md:gap-14 md:py-8",
              showPlate && "md:grid-cols-[1fr_minmax(0,343px)]"
            )}
          >
            <div className="md:order-1">
              {item.kicker && (
                <p className="text-[26px] italic leading-[1.4] text-[var(--color-copper)]">
                  {item.kicker}
                </p>
              )}
              <p className="mt-4 max-w-[60ch] text-[23px] leading-[1.6] text-[var(--color-text-secondary)]">
                {item.description}
              </p>
              <ul className="mt-8 grid grid-cols-1 gap-x-12 gap-y-3 sm:grid-cols-2">
                {item.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-baseline gap-3 text-[21px] text-[var(--color-text-primary)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[11px] inline-block size-1.5 shrink-0 rounded-full bg-[var(--color-brass)]"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              {item.note && (
                <div className="mt-8 border-t border-[var(--color-brass)]/30 pt-4">
                  <div className="mb-2 text-[18px] font-medium text-[var(--color-copper)]">
                    {item.note.label}
                  </div>
                  <p className="text-[21px] leading-[1.6] text-[var(--color-text-primary)]">
                    {item.note.body}
                  </p>
                </div>
              )}
              {item.link && (
                <Link
                  href={item.link.href}
                  className="mt-8 inline-flex items-center gap-2 text-[18px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-copper)]"
                >
                  {item.link.label}
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </Link>
              )}
            </div>

            {showPlate && item.photo && (
              <Plate
                title={item.title}
                photo={item.photo}
                photoTone={item.photoTone}
                open={open}
                priority={priority}
                onError={handlePhotoError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CatalogueDrawer({ title, lead, items }: Props) {
  // Each row opens independently, so opening one never collapses another
  // above it — the panel simply expands downward in place, no page jump.
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <main className="bg-[var(--color-paper)]">
      {/* Text-only hero */}
      <header className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-8 pt-24 md:pb-10 md:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h1
            className="font-sans font-extralight text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(52px, 8vw, 104px)", letterSpacing: "-0.045em", lineHeight: 0.9 }}
          >
            {title}
            <span className="text-[var(--color-copper)]">.</span>
          </h1>
        </div>
        <p className="mt-6 max-w-[52ch] text-pretty text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
          {lead}
        </p>
      </header>

      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)] pb-8">
        <div className="border-t border-[var(--color-brass)]/30">
          {items.map((item, i) => (
            <Drawer
              key={item.title}
              item={item}
              open={openSet.has(i)}
              onToggle={() => toggle(i)}
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

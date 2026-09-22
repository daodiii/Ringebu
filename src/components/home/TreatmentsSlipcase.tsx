"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Spine = {
  id: string;
  name: string;
  body: string;
  detail: string;
  // Monotonic white → cream ramp across the row — each spine a notch deeper.
  closedTone: string;
  // The open panel follows the same row in petrol: full --color-ink on the
  // first, a notch lighter on each one to the right. The last stop is the
  // lightest that keeps --color-amber text at 4.5:1; lighter than that and
  // the text on the open panel would have to turn dark.
  openTone: string;
};

const SPINES: ReadonlyArray<Spine> = [
  {
    id: "forebyggende",
    name: "Forebyggende",
    body: "Kontroll før det gjør vondt.",
    detail:
      "Kontroll, rens og fluor. Vi ser etter de små tegnene før de blir store problemer.",
    closedTone: "#FFFFFF",
    openTone: "#0E2A30",
  },
  {
    id: "generell",
    name: "Generell tannbehandling",
    body: "Fyllinger, kroner og broer.",
    detail:
      "Fyllingene matcher fargen på dine egne tenner. Kroner og broer tilpasser vi så de sitter godt og ser naturlige ut.",
    closedTone: "#FAF8F2",
    openTone: "#17383C",
  },
  {
    id: "akutt",
    name: "Akutt tannhjelp",
    body: "Vi hjelper deg samme dag.",
    detail:
      "Tannverk kan ikke vente. Vi holder av tid hver dag. Ring tidlig, så finner vi en løsning.",
    closedTone: "#F5F0E5",
    openTone: "#204548",
  },
  {
    id: "bleking",
    name: "Bleking & estetikk",
    body: "Bleking hos tannlege.",
    detail:
      "Vi bleker under kontroll, ikke med produkter fra butikken. Resultatet blir naturlig og varer lenge.",
    closedTone: "#F0E9D9",
    openTone: "#295354",
  },
  {
    id: "implantater",
    name: "Implantater",
    body: "En ny tann som varer.",
    detail:
      "Et implantat ser ut og føles som din egen tann. Vi gjør hele jobben her, fra første vurdering til ferdig tann.",
    closedTone: "#EBE1CC",
    openTone: "#326060",
  },
  {
    id: "rotbehandling",
    name: "Rotbehandling",
    body: "Vi redder tannen.",
    detail:
      "Du får lokalbedøvelse, så det gjør ikke vondt underveis. Målet er alltid å beholde din egen tann.",
    closedTone: "#E6DABF",
    openTone: "#3B6E6C",
  },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function TreatmentsSlipcase() {
  const [openId, setOpenId] = useState<string>(SPINES[0].id);
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="behandlinger"
      className="bg-[var(--color-paper)] py-[var(--space-section)]"
    >
      <div className="mx-auto w-full max-w-[var(--container-max,1280px)] px-[var(--container-px,24px)]">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="display-section max-w-[720px] text-balance text-[var(--color-text-primary)]">
            Dette kan vi hjelpe deg med.
          </h2>
        </div>

        {/* Slipcase — desktop */}
        <div
          className="hidden h-[520px] gap-2 md:flex"
          role="tablist"
          aria-label="Behandlinger"
        >
          {SPINES.map((spine, i) => {
            const isOpen = openId === spine.id;
            return (
              <motion.button
                type="button"
                key={spine.id}
                role="tab"
                aria-selected={isOpen}
                onClick={() => setOpenId(spine.id)}
                onMouseEnter={() => setOpenId(spine.id)}
                animate={{ flex: isOpen ? 5 : 1 }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { duration: 0.7, ease: EASE }
                }
                style={{ backgroundColor: isOpen ? spine.openTone : spine.closedTone }}
                className={`group relative overflow-hidden border-l border-[var(--color-rule)] text-left transition-colors ${
                  isOpen ? "text-white" : "text-[var(--color-text-primary)]"
                } ${i === SPINES.length - 1 ? "border-r border-[var(--color-rule)]" : ""}`}
              >
                {/* Top brass tick */}
                <div
                  aria-hidden="true"
                  className={`absolute left-0 right-0 top-0 h-px transition-colors duration-500 ${
                    isOpen ? "bg-[var(--color-amber)]" : "bg-[var(--color-brass)]/40"
                  }`}
                />

                {/* Collapsed (spine) content */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center px-2 transition-opacity duration-500 ${
                    isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                  aria-hidden={isOpen}
                >
                  <span
                    className="font-sans text-[15px] font-medium tracking-[-0.01em]"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {spine.name}
                  </span>
                </div>

                {/* Expanded content */}
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      key="expanded"
                      initial={prefersReduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                      className="relative flex h-full flex-col justify-between p-8 md:p-10"
                    >
                      <h3
                        className="font-sans text-white"
                        style={{
                          fontWeight: 300,
                          fontSize: "clamp(34px, 3.6vw, 56px)",
                          lineHeight: 1.02,
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {spine.name}
                      </h3>

                      <div className="max-w-[520px]">
                        <p className="text-[20px] leading-[1.4] text-[var(--color-amber)]">
                          {spine.body}
                        </p>
                        <p className="mt-4 text-[14px] leading-[1.6] text-[var(--color-amber)]">
                          {spine.detail}
                        </p>
                        <Link
                          href="/behandlinger"
                          className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-amber)] transition-colors hover:text-white"
                        >
                          Les mer
                          <ArrowUpRight
                            className="size-4 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile — same slipcase language, stacked vertically.
            Closed panels carry the warm tonal spine; the open panel
            expands into its petrol tone exactly like desktop. */}
        <div className="flex flex-col gap-2 md:hidden">
          {SPINES.map((spine) => {
            const isOpen = openId === spine.id;
            return (
              <div key={spine.id} className="relative overflow-hidden">
                {/* Top brass tick — mirrors desktop */}
                <div
                  aria-hidden="true"
                  className={`absolute left-0 right-0 top-0 z-10 h-px transition-colors duration-500 ${
                    isOpen ? "bg-[var(--color-amber)]" : "bg-[var(--color-brass)]/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : spine.id)}
                  aria-expanded={isOpen}
                  style={{ backgroundColor: isOpen ? spine.openTone : spine.closedTone }}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-500 ${
                    isOpen ? "text-white" : "text-[var(--color-text-primary)]"
                  }`}
                >
                  <span
                    className="font-sans tracking-[-0.025em]"
                    style={{
                      fontWeight: isOpen ? 300 : 500,
                      fontSize: isOpen ? "clamp(28px, 7vw, 34px)" : "21px",
                      lineHeight: 1.05,
                    }}
                  >
                    {spine.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`size-2 shrink-0 rounded-full transition-transform duration-500 ${
                      isOpen
                        ? "rotate-45 bg-[var(--color-amber)]"
                        : "bg-[var(--color-brass)]"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      style={{ backgroundColor: spine.openTone }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-8 pt-1">
                        <p className="text-[18px] leading-[1.4] text-[var(--color-amber)]">
                          {spine.body}
                        </p>
                        <p className="mt-3 text-[14.5px] leading-[1.6] text-[var(--color-amber)]">
                          {spine.detail}
                        </p>
                        <Link
                          href="/behandlinger"
                          className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-amber)] transition-colors hover:text-white"
                        >
                          Les mer
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer link */}
        <div className="mt-12">
          <Link
            href="/behandlinger"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-stone)]"
          >
            Se alle behandlinger
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

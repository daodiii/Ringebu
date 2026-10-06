"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { PaperShadow } from "@/components/behandlinger/scenes/Papir";
import { Skjema } from "./Skjema";

/**
 * The contact form with a small open envelope beside its Send button. When
 * the message has gone, the form becomes a letter that shrinks and drops
 * into the envelope, the flap folds over, the clinic's seal is pressed on,
 * and the sealed envelope comes to the middle with the thanks under it.
 * Everything happens inside the room the form already takes, so the page
 * around it does not move.
 *
 * Every piece is moved by a Web Animation of its own, started once.
 */

/* ── The envelope, in its parts, each drawn once ── */

const BAK = (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block h-full w-full overflow-visible" aria-hidden="true">
    <PaperShadow dy={4}>
      <rect width={100} height={100} />
    </PaperShadow>
    <rect width={100} height={100} fill="#E5D8BC" />
  </svg>
);

// The open flap, standing up above the envelope: its inside shows.
const KLAFF_APEN = (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block h-full w-full" aria-hidden="true">
    <path d="M0,100 L47,6 Q50,0 53,6 L100,100 Z" fill="#DCCDAE" />
  </svg>
);

// The front: two side flaps and the bottom flap, over the letter.
const FRAM = (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block h-full w-full overflow-visible" aria-hidden="true">
    <path d="M0,0 L48,58 L0,100 Z" fill="#EFE4CC" />
    <path d="M100,0 L52,58 L100,100 Z" fill="#E9DDC2" />
    <PaperShadow dy={-3}>
      <path d="M0,100 L48,46 Q50,44 52,46 L100,100 Z" />
    </PaperShadow>
    <path d="M0,100 L48,46 Q50,44 52,46 L100,100 Z" fill="#F4EBD8" />
  </svg>
);

// The flap folded down over the front.
const KLAFF_LUKKET = (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block h-full w-full overflow-visible" aria-hidden="true">
    <PaperShadow dy={4}>
      <path d="M0,0 L48,94 Q50,98 52,94 L100,0 Z" />
    </PaperShadow>
    <path d="M0,0 L48,94 Q50,98 52,94 L100,0 Z" fill="#E2D4B6" />
  </svg>
);

// The tooth from the logo, as in Tannskilt.
const TOOTH = "M-9,-11 C-14,-11 -15,-4 -13,2 C-11,8 -9,12 -6,12 C-3,12 -3,5 0,5 C3,5 3,12 6,12 C9,12 11,8 13,2 C15,-4 14,-11 9,-11 C5,-11 4,-9 0,-9 C-4,-9 -5,-11 -9,-11 Z";

// A wax seal with the tooth pressed into it.
const SEGL = (
  <svg viewBox="-24 -24 48 48" className="block h-full w-full overflow-visible" aria-hidden="true">
    <PaperShadow dy={2}>
      <circle r={20} />
    </PaperShadow>
    <path d="M0,-21 C6,-22 9,-17 14,-16 C19,-14 18,-8 21,-4 C23,1 19,5 19,10 C18,16 12,16 8,19 C3,22 -2,20 -7,20 C-13,19 -15,14 -18,10 C-22,5 -20,0 -21,-5 C-21,-11 -16,-14 -12,-17 C-8,-20 -5,-20 0,-21 Z" fill="#B9473A" />
    <circle r={14} fill="#A93D31" />
    <g transform="scale(0.78)">
      <path d={TOOTH} fill="none" stroke="#E6A193" strokeWidth={2.4} />
    </g>
  </svg>
);

// The letter: the form, written out on paper, as it goes into the envelope.
const BREV = {
  backgroundColor: "#FFFDF8",
  backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 22px, rgba(14,42,48,0.13) 22px 24px)",
} as const;

export function SkjemaKonvolutt({
  as,
  takk = "Takk for meldingen.",
  onSent,
  className = "",
}: {
  as?: "h2" | "h3";
  takk?: string;
  onSent?: () => void;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const box = useRef<HTMLDivElement>(null);
  const env = useRef<HTMLDivElement>(null);
  const brev = useRef<HTMLDivElement>(null);
  const apen = useRef<HTMLDivElement>(null);
  const lukket = useRef<HTMLDivElement>(null);
  const segl = useRef<HTMLDivElement>(null);
  const hilsen = useRef<HTMLDivElement>(null);

  const sent = useCallback(() => {
    onSent?.();
    const els = [box.current, env.current, brev.current, apen.current, lukket.current, segl.current, hilsen.current];
    if (els.some((e) => !e)) return;
    const [b, c, l, o, k, s, h] = els as HTMLDivElement[];
    const br = b.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    const cw = c.offsetWidth;
    const ch = c.offsetHeight;

    // Where the sealed envelope comes to rest: the middle of the form's room, a size larger.
    const grow = 1.5;
    const dx = br.left + br.width / 2 - (cr.left + cw / 2);
    const dy = br.top + br.height * 0.4 - (cr.top + ch / 2);
    h.style.top = `${Math.round(br.height * 0.4 + (ch * grow) / 2 + 24)}px`;

    if (reduced) {
      o.style.transform = "scaleY(0)";
      k.style.transform = "scaleY(1)";
      s.style.transform = "scale(1)";
      c.style.transform = `translate(${dx}px, ${dy}px) scale(${grow})`;
      h.style.opacity = "1";
      return;
    }

    // The letter starts as large as the form, and shrinks into the envelope.
    l.style.left = `${br.left - cr.left}px`;
    l.style.top = `${br.top - cr.top}px`;
    l.style.width = `${br.width}px`;
    l.style.height = `${br.height}px`;
    const sx = (cw * 0.76) / br.width;
    const sy = (ch * 0.72) / br.height;
    const tx = cw * 0.12 - (br.left - cr.left);
    const above = -ch * 0.55 - (br.top - cr.top);
    const inside = ch * 0.2 - (br.top - cr.top);
    const fwd = { fill: "forwards" as const };
    l.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: "none", opacity: 1, offset: 0.08 },
        { transform: `translate(${tx}px, ${above}px) scale(${sx}, ${sy})`, offset: 0.62, easing: "ease-in" },
        { transform: `translate(${tx}px, ${inside}px) scale(${sx}, ${sy})`, opacity: 1 },
      ],
      { duration: 1250, easing: "cubic-bezier(0.45, 0, 0.25, 1)", ...fwd },
    );
    o.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }], { duration: 220, delay: 1300, easing: "ease-in", ...fwd });
    k.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 260, delay: 1520, easing: "ease-out", ...fwd });
    s.animate(
      [
        { transform: "scale(0) rotate(-20deg)" },
        { transform: "scale(1.25) rotate(4deg)", offset: 0.6 },
        { transform: "scale(1) rotate(0deg)" },
      ],
      { duration: 420, delay: 1800, easing: "ease-out", ...fwd },
    );
    c.animate([{ transform: "none" }, { transform: `translate(${dx}px, ${dy}px) scale(${grow})` }], {
      duration: 800,
      delay: 2300,
      easing: "cubic-bezier(0.3, 0, 0.2, 1)",
      ...fwd,
    });
    h.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 600, delay: 2850, easing: "ease-out", ...fwd });
  }, [onSent, reduced]);

  return (
    // The form's own thanks stays for screen readers; on screen the envelope says it
    <div ref={box} className={`relative [&_[role=status]]:opacity-0 ${className}`}>
      <Skjema as={as} takk={takk} onSent={sent} />

      {/* The open envelope, beside the Send button, low enough that its flap stays
          under the note above Send however that note wraps. Its parts stack in this order:
          the back, the letter, the front, then the flap and the seal once shut. */}
      <div
        ref={env}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 right-1 h-[44px] w-[70px] origin-center sm:right-2"
      >
        <div ref={apen} className="absolute inset-x-0 bottom-full h-[24px] origin-bottom">
          {KLAFF_APEN}
        </div>
        <div className="absolute inset-0">{BAK}</div>
        <div ref={brev} className="absolute left-0 top-0 h-0 w-0 origin-top-left opacity-0 shadow-[0_3px_0_rgba(14,42,48,0.12)]" style={BREV} />
        <div className="absolute inset-0">{FRAM}</div>
        <div ref={lukket} className="absolute inset-x-0 top-0 h-[28px] origin-top" style={{ transform: "scaleY(0)" }}>
          {KLAFF_LUKKET}
        </div>
        <div
          ref={segl}
          className="absolute left-1/2 top-[18px] -ml-[11px] h-[22px] w-[22px]"
          style={{ transform: "scale(0)" }}
        >
          {SEGL}
        </div>
      </div>

      {/* Under the sealed envelope: the thanks */}
      <div ref={hilsen} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center text-center opacity-0">
        <p className="text-[24px] font-medium tracking-[-0.02em] text-[var(--color-ink)]">{takk}</p>
        <p className="mt-2 text-[17px] text-[rgba(14,42,48,0.74)]">Vi svarer deg så snart vi kan.</p>
      </div>
    </div>
  );
}

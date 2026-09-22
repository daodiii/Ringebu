"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

/**
 * Pointer position over the hero, as springy −1…1 values measured from the
 * centre. With no mouse — on a phone, or before the first move on desktop —
 * the values drift along a slow Lissajous path so the hero is never static.
 */
export function useHeroPointer(
  ref: RefObject<HTMLElement | null>,
  enabled = true
) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 70, damping: 23, mass: 0.9 };
  const nx = useSpring(rawX, spring);
  const ny = useSpring(rawY, spring);

  const engaged = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let frame = 0;
    let stopped = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      engaged.current = true;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
      rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    el.addEventListener("pointermove", onMove);

    const t0 = performance.now();
    const drift = () => {
      if (stopped) return;
      if (!engaged.current) {
        // Two incommensurate frequencies — the path never visibly repeats.
        const t = ((performance.now() - t0) / 1000 / 30) * Math.PI * 2;
        rawX.set(Math.sin(t) * 0.8);
        rawY.set(Math.sin(t * 1.618) * 0.5);
      }
      frame = requestAnimationFrame(drift);
    };
    frame = requestAnimationFrame(drift);

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, [ref, enabled, rawX, rawY]);

  return { nx, ny } as { nx: MotionValue<number>; ny: MotionValue<number> };
}

"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

/**
 * Pointer position over the hero, as springy −1…1 values measured from the
 * centre. With no mouse — on a phone, or before the first move on desktop —
 * the values drift along a slow Lissajous path so the hero is never static.
 *
 * The drift only runs while the hero is on screen and the tab is visible.
 * Every step repaints the valley in the ghost, the windows and the letters,
 * and it used to run forever: scrolled down to the footer, a phone was still
 * repainting a hero it could not see, every frame.
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
    let onScreen = false;
    // Time on the path, counted only while it runs, so the drift carries on
    // from where it stopped instead of jumping ahead after a pause.
    let elapsed = 0;
    let last = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      engaged.current = true;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
      rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    el.addEventListener("pointermove", onMove);

    const drift = (now: number) => {
      if (last) elapsed += Math.min(now - last, 100);
      last = now;
      if (!engaged.current) {
        // Two incommensurate frequencies — the path never visibly repeats.
        const t = (elapsed / 1000 / 30) * Math.PI * 2;
        rawX.set(Math.sin(t) * 0.8);
        rawY.set(Math.sin(t * 1.618) * 0.5);
      }
      frame = requestAnimationFrame(drift);
    };

    const sync = () => {
      const run = onScreen && !document.hidden;
      if (run && !frame) {
        last = 0;
        frame = requestAnimationFrame(drift);
      } else if (!run && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, [ref, enabled, rawX, rawY]);

  return { nx, ny } as { nx: MotionValue<number>; ny: MotionValue<number> };
}

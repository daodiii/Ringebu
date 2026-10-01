"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

/** A mouse, or anything else that hovers: phones and tablets get the CSS drift instead. */
const FINE = "(hover: hover) and (pointer: fine)";

/**
 * Where your head is in front of the window, as springy −1…1 values: the
 * mouse over the hero stands in for it. Before the mouse has moved, the head
 * sways on a slow path of its own so the window is never still.
 *
 * On a phone that reports how it is held (Android does, without asking),
 * tilting it moves your head instead: turn the phone and you look past the
 * edge of the arch. The hero is marked data-tilt then, which turns off the CSS
 * drift that moves the layers on any other touch screen (buen.module.css).
 * Everything stops while the hero is off screen or the tab is hidden.
 */
export function useHode(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 42, damping: 18, mass: 1 };
  const hx = useSpring(rawX, spring);
  const hy = useSpring(rawY, spring);
  const engaged = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const fine = window.matchMedia(FINE);

    let frame = 0;
    let onScreen = false;
    let elapsed = 0;
    let last = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      engaged.current = true;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      rawX.set(Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)));
      rawY.set(Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)));
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      rawX.set(0);
      rawY.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const drift = (now: number) => {
      if (last) elapsed += Math.min(now - last, 100);
      last = now;
      if (!engaged.current) {
        // Two frequencies that never line up, so the path does not visibly repeat
        const t = (elapsed / 1000 / 26) * Math.PI * 2;
        rawX.set(Math.sin(t) * 0.7);
        rawY.set(Math.sin(t * 1.618) * 0.45);
        frame = requestAnimationFrame(drift);
      } else {
        frame = 0;
      }
    };

    // Tilt, measured from how the phone was held when it was first seen,
    // and slowly re-centred, so a new way of holding it becomes the middle.
    let base: { b: number; g: number } | null = null;
    let tilting = false;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      if (!base) {
        base = { b: e.beta, g: e.gamma };
        el.dataset.tilt = "true";
      }
      base.b += (e.beta - base.b) * 0.0015;
      base.g += (e.gamma - base.g) * 0.0015;
      const x = Math.max(-1, Math.min(1, -(e.gamma - base.g) / 16));
      const y = Math.max(-1, Math.min(1, (e.beta - base.b) / 16));
      // Below a hair's breadth the springs are left to rest
      if (Math.abs(x - rawX.get()) > 0.01) rawX.set(x);
      if (Math.abs(y - rawY.get()) > 0.01) rawY.set(y);
    };

    const sync = () => {
      const tilt = onScreen && !document.hidden && !fine.matches;
      if (tilt && !tilting) window.addEventListener("deviceorientation", onTilt);
      else if (!tilt && tilting) window.removeEventListener("deviceorientation", onTilt);
      tilting = tilt;

      const run = onScreen && !document.hidden && fine.matches && !engaged.current;
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
    fine.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      fine.removeEventListener("change", sync);
      cancelAnimationFrame(frame);
      window.removeEventListener("deviceorientation", onTilt);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, enabled, rawX, rawY]);

  return { hx, hy } as { hx: MotionValue<number>; hy: MotionValue<number> };
}

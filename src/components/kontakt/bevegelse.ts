"use client";

import { useEffect, useRef } from "react";

/**
 * A loop as a Web Animation, made once for its element and played only while
 * `on` (the scene on screen, and motion allowed). The keyframes must be made
 * once too, at module scope. With reduced motion `on` never turns true, and the
 * element keeps its first keyframe.
 */
export function useLoop<T extends Element>(frames: Keyframe[], seconds: number, on: boolean, delay = 0) {
  const ref = useRef<T | null>(null);
  const anim = useRef<Animation | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!anim.current) {
      anim.current = el.animate(frames, { duration: seconds * 1000, iterations: Infinity, delay: delay * 1000 });
      anim.current.pause();
    }
    if (on) anim.current.play();
    else anim.current.pause();
  }, [on, frames, seconds, delay]);
  useEffect(
    () => () => {
      anim.current?.cancel();
      anim.current = null;
    },
    [],
  );
  return ref;
}

/** Keyframe offsets from times in seconds within a round, clamped so they never go backwards. */
export function at(t: number, round: number) {
  return Math.min(1, Math.max(0, Math.round((t / round) * 10000) / 10000));
}

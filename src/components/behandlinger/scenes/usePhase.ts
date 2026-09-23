"use client";

import { useEffect, useState } from "react";

/**
 * Steps a scene through named phases on a timer while it is on stage, then
 * loops from `loopFrom`. Off stage it returns "off", so a scene always starts
 * its routine from the top when its arch comes back to the middle.
 *
 * Every state change happens in a timer callback, never in the effect body,
 * so a change of stage never cascades into an extra synchronous render.
 */
export function usePhase<P extends string>(
  active: boolean,
  steps: readonly (readonly [P, number])[],
  loopFrom = 0
): P | "off" {
  const [idx, setIdx] = useState(-1);
  useEffect(() => {
    let i = active ? 0 : -1;
    let timer = setTimeout(function step() {
      setIdx(i);
      if (i < 0) return;
      const wait = steps[i][1];
      i = i + 1 >= steps.length ? loopFrom : i + 1;
      timer = setTimeout(step, wait);
    }, 0);
    return () => clearTimeout(timer);
  }, [active, steps, loopFrom]);
  return active && idx >= 0 ? steps[idx][0] : "off";
}

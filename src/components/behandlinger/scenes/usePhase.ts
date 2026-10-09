"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Scenes inside this play their routine once and then hold still (the front
 * page's boxes). Every routine ends on a step that only undoes it so it can
 * loop, so played once a scene stops on the step before: the crown seated,
 * the filling cured, the implant crowned.
 */
export const PlayOnce = createContext(false);

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
  const once = useContext(PlayOnce);
  const [idx, setIdx] = useState(-1);
  useEffect(() => {
    let i = active ? 0 : -1;
    let timer = setTimeout(function step() {
      setIdx(i);
      if (i < 0) return;
      if (once && i >= steps.length - 2) return;
      const wait = steps[i][1];
      i = i + 1 >= steps.length ? loopFrom : i + 1;
      timer = setTimeout(step, wait);
    }, 0);
    return () => clearTimeout(timer);
  }, [active, steps, loopFrom, once]);
  return active && idx >= 0 ? steps[idx][0] : "off";
}

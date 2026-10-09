"use client";

import { BE_OM_TIME } from "./data";

/**
 * Takes the visitor to the form (#be-om-time), and checks where it landed.
 *
 * A plain link to the anchor is not enough on the front page: its sections
 * below the screen are laid out only as they come near (content-visibility
 * in globals.css), so a scroll aimed at the form from the top is aimed with
 * stand-in heights and overshot it by ~130px on a phone. On /kontakt the
 * board is still settling when the browser jumps to the anchor. So once a
 * scroll ends, this measures again and corrects, at most twice.
 *
 * Returns false when there is no form on the page, so a link can fall back
 * to its own href.
 */
export function tilSkjema(behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(BE_OM_TIME.id);
  if (!el) return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const off = () => el.getBoundingClientRect().top - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0);
  let tries = 0;
  const go = (how: ScrollBehavior) => {
    let timer = 0;
    const settled = () => {
      window.removeEventListener("scrollend", settled);
      window.clearTimeout(timer);
      if (Math.abs(off()) > 4 && ++tries <= 2) go(reduced ? "auto" : "smooth");
    };
    window.addEventListener("scrollend", settled);
    // Browsers without scrollend, and a scroll that had nowhere to go
    timer = window.setTimeout(settled, 1400);
    window.scrollBy({ top: off(), behavior: how });
  };
  go(reduced ? "auto" : behavior);
  if (location.hash !== `#${BE_OM_TIME.id}`) history.replaceState(history.state, "", `#${BE_OM_TIME.id}`);
  return true;
}

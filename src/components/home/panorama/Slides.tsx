"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./panorama.module.css";

type Conn = { saveData?: boolean; effectiveType?: string };

/**
 * The two rounds of clinic photographs.
 *
 * Round one is rendered with the page: it arrives over the valley on the first
 * screen. Round two is not put in the page until the page has loaded and the browser
 * is idle, so its three photographs never compete with the valley (the LCP). It
 * fades in once its photographs are decoded and the hold time has passed, never
 * before they are ready, and then round one is hidden.
 *
 * On Save-Data or a 2g connection round two is skipped and the entrance is cut: the
 * first round stays.
 *
 * holdDesk and holdPhone are milliseconds from the start of the page load.
 */
export function Slides({ a, b, holdDesk, holdPhone }: { a: ReactNode; b: ReactNode; holdDesk: number; holdPhone: number }) {
  const bRef = useRef<HTMLDivElement | null>(null);
  const [mount, setMount] = useState(false);
  const [show, setShow] = useState(false);
  const [goneA, setGoneA] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) {
      bRef.current?.closest("section")?.setAttribute("data-calm", "");
      return;
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const idle = (fn: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(fn, { timeout: 1500 }) : window.setTimeout(fn, 300));
    const start = () => idle(() => setMount(true));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  useEffect(() => {
    if (!mount) return;
    let cancelled = false;
    let t1 = 0;
    let t2 = 0;
    const imgs = Array.from(bRef.current?.querySelectorAll("img") ?? []);
    Promise.all(imgs.map((i) => i.decode().catch(() => undefined))).then(() => {
      if (cancelled) return;
      const hold = window.matchMedia("(max-width: 899px)").matches ? holdPhone : holdDesk;
      t1 = window.setTimeout(
        () => {
          setShow(true);
          t2 = window.setTimeout(() => setGoneA(true), 1400);
        },
        Math.max(0, hold - performance.now()),
      );
    });
    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [mount, holdDesk, holdPhone]);

  return (
    <>
      <div className={`${s.slide} ${s.slide1} ${goneA ? s.goneA : ""}`}>{a}</div>
      <div ref={bRef} className={`${s.slide} ${s.slide2} ${show ? s.showB : s.pendB}`}>
        {mount && b}
      </div>
    </>
  );
}

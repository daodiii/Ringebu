"use client";

import { BE_OM_TIME } from "@/components/kontakt/data";
import { tilSkjema } from "@/components/kontakt/tilSkjema";
import s from "./panorama.module.css";

/** «Be om time»: to the form further down this page, which is why it needs the browser. */
export function AskButton() {
  return (
    <a
      href={`#${BE_OM_TIME.id}`}
      onClick={(e) => {
        if (tilSkjema()) e.preventDefault();
      }}
      className={`knapp ${s.dempet}`}
    >
      {BE_OM_TIME.label}
    </a>
  );
}

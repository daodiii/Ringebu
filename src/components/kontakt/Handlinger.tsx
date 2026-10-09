"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { BE_OM_TIME, RING } from "./data";
import { tilSkjema } from "./tilSkjema";

/**
 * The site's two actions side by side, the same on every page: call the
 * clinic, or ask for an appointment in the form. «Be om time» goes to the
 * form on this page when there is one (the front page, /symptomer, /dekning
 * and /kontakt end with it), and to /kontakt otherwise. `iSiden` only sets
 * the plain href, for a visitor without JavaScript.
 */
export function Handlinger({ iSiden = false, className = "" }: { iSiden?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={RING.href} className="knapp knapp-blekk">
        <Phone aria-hidden="true" />
        {RING.label}
      </a>
      {iSiden ? (
        <a href={`#${BE_OM_TIME.id}`} onClick={(e) => { if (tilSkjema()) e.preventDefault(); }} className="knapp knapp-papir">
          {BE_OM_TIME.label}
        </a>
      ) : (
        <Link href={BE_OM_TIME.href} onClick={(e) => { if (tilSkjema()) e.preventDefault(); }} className="knapp knapp-papir">
          {BE_OM_TIME.label}
        </Link>
      )}
    </div>
  );
}

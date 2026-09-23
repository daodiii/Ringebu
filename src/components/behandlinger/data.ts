import { TREATMENTS, type Treatment } from "@/app/behandlinger/data";

/** A treatment as the arcade uses it: the live data plus a stable slug for its scene. */
export interface ArcadeTreatment extends Treatment {
  slug: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const ARCADE_TREATMENTS: ArcadeTreatment[] = TREATMENTS.map((t) => ({ ...t, slug: slugify(t.title) }));

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

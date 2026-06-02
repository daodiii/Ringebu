// Shared, normalized item shape so the three mockup concepts can render
// both /behandlinger (treatments) and /symptomer (symptoms) identically.
import { TREATMENTS } from "@/app/behandlinger/data";
import { symptoms } from "@/data/content";
import { SYMPTOM_META, type SymptomMeta } from "@/app/symptomer/data";

export interface SpreadItem {
  title: string;
  /** Short editorial line (treatment.subtitle / symptom meta.subtitle). */
  kicker: string;
  /** Category or anatomical region — used as the plate corner caption. */
  tag: string;
  description: string;
  points: readonly string[];
  /** Symptom-only: the "Hva du gjør" guidance block. */
  note?: { label: string; body: string };
  /** Symptom-only: link to the related article. */
  link?: { href: string; label: string };
  photo?: string;
  photoTone: string;
}

export const treatmentItems: SpreadItem[] = TREATMENTS.map((t) => ({
  title: t.title,
  kicker: t.subtitle,
  tag: t.category,
  description: t.description,
  points: t.features,
  photo: t.photo,
  photoTone: t.photoTone,
}));

const FALLBACK_META: SymptomMeta = {
  subtitle: "",
  region: "Tann",
  photoTone: "#ECE6D6",
};

export const symptomItems: SpreadItem[] = symptoms.map((s) => {
  const meta = SYMPTOM_META[s.title] ?? FALLBACK_META;
  return {
    title: s.title,
    kicker: meta.subtitle,
    tag: meta.region,
    description: s.description,
    points: s.causes,
    note: { label: "Hva du gjør", body: s.whatToDo },
    link: s.slug ? { href: `/artikler/${s.slug}`, label: "Les artikkel" } : undefined,
    photo: meta.photo,
    photoTone: meta.photoTone,
  };
});

export const PAGE_COPY = {
  behandlinger: {
    title: "Behandlinger",
    lead: "Ni fagområder, ett team, og god tid til hver enkelt.",
    items: treatmentItems,
  },
  symptomer: {
    title: "Symptomer",
    lead: "Åtte ting tennene gjør når noe rører seg. Hva det er, og hva du gjør med det.",
    items: symptomItems,
  },
} as const;

export type PageKey = keyof typeof PAGE_COPY;

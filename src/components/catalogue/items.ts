// Shared, normalized item shape so the three mockup concepts can render
// both /behandlinger (treatments) and /symptomer (symptoms) identically.
import { TREATMENTS } from "@/app/behandlinger/data";
import { symptoms } from "@/data/content";
import { SYMPTOM_META, type SymptomMeta } from "@/app/symptomer/data";

export interface SpreadItem {
  title: string;
  /** Short editorial line (treatment.subtitle / symptom meta.subtitle). */
  kicker: string;
  /** Category or anatomical region. Not currently rendered. */
  tag: string;
  description: string;
  points: readonly string[];
  /** Symptom-only: the "Hva du gjør" guidance block. */
  note?: { label: string; body: string };
  /** Symptom-only: link to the related article. */
  link?: { href: string; label: string };
  /** When absent the row has no plate at all and the text runs full width. */
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
  photoTone: "#E6EDE9",
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
    // The symptom articles were removed; the card keeps its "Hva du gjør" advice.
    link: undefined,
    photoTone: meta.photoTone,
  };
});

export const PAGE_COPY = {
  behandlinger: {
    title: "Behandlinger",
    lead: "Dette gjør vi, og hva det koster.",
    items: treatmentItems,
  },
  symptomer: {
    title: "Symptomer",
    lead: "Åtte vanlige plager. Hva de betyr, og hva du bør gjøre.",
    items: symptomItems,
  },
} as const;

export type PageKey = keyof typeof PAGE_COPY;

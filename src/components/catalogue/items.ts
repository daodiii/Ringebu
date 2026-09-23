// The item shape CatalogueDrawer renders. /symptomer is its only page now:
// /behandlinger moved to the arcade in components/behandlinger.
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
  symptomer: {
    title: "Symptomer",
    lead: "Åtte vanlige plager. Hva de betyr, og hva du bør gjøre.",
    items: symptomItems,
  },
} as const;

export type PageKey = keyof typeof PAGE_COPY;

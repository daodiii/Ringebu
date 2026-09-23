export type SymptomRegion = "Tann" | "Tannkjøtt" | "Kjeve" | "Munn";

export interface SymptomMeta {
  /** Short editorial caption shown above the title (mono small caps) */
  subtitle: string;
  /** Anatomical region. Carried through as `tag`; not currently rendered. */
  region: SymptomRegion;
  /** Plate background tone, shown behind a row with no photo. */
  photoTone: string;
}

// Symptoms carry no photography by design: /behandlinger shows the clinic,
// /symptomer states what is happening. With no photo on any row, the drawer
// drops its right-hand column and the text runs full width.
export const SYMPTOM_META: Record<string, SymptomMeta> = {
  "Tannpine": {
    subtitle: "Smerten som ikke gir seg",
    region: "Tann",
    photoTone: "#DCE6E2",
  },
  "Blødende tannkjøtt": {
    subtitle: "De første tegnene",
    region: "Tannkjøtt",
    photoTone: "#E6EDE9",
  },
  "Sensitive tenner": {
    subtitle: "Når noe kaldt blir for kaldt",
    region: "Tann",
    photoTone: "#E1EAE5",
  },
  "Hovne tannkjøtt": {
    subtitle: "Når noe har bygd seg opp",
    region: "Tannkjøtt",
    photoTone: "#E4ECE7",
  },
  "Dårlig ånde": {
    subtitle: "Når pusten ikke vil gi seg",
    region: "Munn",
    photoTone: "#E9EFEC",
  },
  "Tannkjøttbetennelse": {
    subtitle: "Begynnelsen på noe",
    region: "Tannkjøtt",
    photoTone: "#E7EEEA",
  },
  "Løse tenner": {
    subtitle: "Tenner som har gitt etter",
    region: "Tann",
    photoTone: "#DCE6E2",
  },
  "Kjevesmerter": {
    subtitle: "Kjeven som jobber for mye",
    region: "Kjeve",
    photoTone: "#E6EDE9",
  },
};

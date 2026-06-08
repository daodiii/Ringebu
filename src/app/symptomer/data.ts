export type SymptomRegion = "Tann" | "Tannkjøtt" | "Kjeve" | "Munn";

export interface SymptomMeta {
  /** Short editorial caption shown above the title (mono small caps) */
  subtitle: string;
  /** Anatomical region — shown as the corner caption on the photo plate */
  region: SymptomRegion;
  /** Optional photo path. If absent or missing on disk, the plate falls back to `photoTone`. */
  photo?: string;
  /** Plate background tone, same convention as TREATMENTS in /behandlinger/data.ts */
  photoTone: string;
}

export const SYMPTOM_META: Record<string, SymptomMeta> = {
  "Tannpine": {
    subtitle: "Smerten som ikke gir seg",
    region: "Tann",
    photo: "/images/article-toothache.jpg",
    photoTone: "#DCE6E2",
  },
  "Blødende tannkjøtt": {
    subtitle: "De første tegnene",
    region: "Tannkjøtt",
    photo: "/images/article-gum-health.jpg",
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
    photo: "/images/article-mouthwash.jpg",
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
    photo: "/images/article-teeth-grinding.jpg",
    photoTone: "#E6EDE9",
  },
};

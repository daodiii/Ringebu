import { symptoms } from "@/data/content";
import type { PaletteName } from "@/components/behandlinger/scenes/Papir";

/**
 * The eight symptoms as the book on the front page and the arch on
 * /symptomer use them: the live text from data/content, plus what each needs
 * to stage it. Each symptom gets its own paper palette, as each arch does on
 * /behandlinger, and no two neighbours share one.
 *
 * The site describes symptoms and their causes; it does not tell anyone what
 * to do about them. data/content still carries that advice for the mockups.
 */

export type SymptomSlug =
  | "tannpine"
  | "blodende"
  | "sensitive"
  | "hovne"
  | "aande"
  | "betennelse"
  | "lose"
  | "kjeve";

export interface Symptom {
  slug: SymptomSlug;
  title: string;
  kicker: string;
  description: string;
  causes: readonly string[];
  palette: PaletteName;
  /** Hverdagen: the everyday thing that gives the symptom away. */
  thing: string;
  /** Hverdagen: the moment you notice it, with that thing. */
  moment: string;
}

type Staging = Pick<Symptom, "slug" | "kicker" | "palette" | "thing" | "moment">;

const STAGING: Record<string, Staging> = {
  Tannpine: { slug: "tannpine", kicker: "Smerten som ikke gir seg", palette: "molte", thing: "Sjokolade", moment: "Du tar en bit sjokolade, og det gjør vondt i tennene." },
  "Blødende tannkjøtt": { slug: "blodende", kicker: "De første tegnene", palette: "lyng", thing: "Tannbørste", moment: "Du pusser tennene, og det kommer blod." },
  "Sensitive tenner": { slug: "sensitive", kicker: "Når noe kaldt blir for kaldt", palette: "frost", thing: "Isbit", moment: "Du drikker noe kaldt, og det isner." },
  "Hovne tannkjøtt": { slug: "hovne", kicker: "Når noe har bygd seg opp", palette: "bjork", thing: "Speil", moment: "Du ser i speilet, og tannkjøttet er hovent." },
  "Dårlig ånde": { slug: "aande", kicker: "Når pusten ikke vil gi seg", palette: "mose", thing: "Pastiller", moment: "Du tar enda en pastill, men det hjelper ikke." },
  Tannkjøttbetennelse: { slug: "betennelse", kicker: "Begynnelsen på noe", palette: "eukalyptus", thing: "Tanntråd", moment: "Du bruker tanntråd, og tannkjøttet er rødt og ømt." },
  "Løse tenner": { slug: "lose", kicker: "Tenner som har gitt etter", palette: "fjord", thing: "Eple", moment: "Du biter i et eple, og en tann gir etter." },
  Kjevesmerter: { slug: "kjeve", kicker: "Kjeven som jobber for mye", palette: "skumring", thing: "Pute", moment: "Du våkner, og kjeven er stiv og øm." },
};

export const SYMPTOMS: Symptom[] = symptoms.map((s) => {
  const st = STAGING[s.title];
  if (!st) throw new Error(`symptomer: no staging for "${s.title}"`);
  return {
    ...st,
    title: s.title,
    description: s.description,
    causes: s.causes,
  };
});

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

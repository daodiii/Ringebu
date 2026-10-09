import { symptoms } from "@/data/content";
import type { PaletteName } from "@/components/behandlinger/scenes/Papir";
import { ARCADE_TREATMENTS } from "@/components/behandlinger/data";

/**
 * The seven symptoms as the book on the front page and the arch on
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
  /**
   * The treatments that can help, as slugs of /behandlinger, in the order to
   * show them. A first draft from the symptom and the treatment texts; the
   * owner has not confirmed the pairs yet.
   */
  hjelp: readonly string[];
}

type Staging = Pick<Symptom, "slug" | "kicker" | "palette" | "thing" | "moment" | "hjelp">;

const STAGING: Record<string, Staging> = {
  Tannpine: { slug: "tannpine", kicker: "Smerten som ikke gir seg", palette: "molte", thing: "Sjokolade", moment: "Du tar en bit sjokolade, og det gjør vondt i tennene.", hjelp: ["fyllingsterapi", "rotfylling"] },
  "Blødende tannkjøtt": { slug: "blodende", kicker: "De første tegnene", palette: "lyng", thing: "Tannbørste", moment: "Du pusser tennene, og det kommer blod.", hjelp: ["tannkjottbehandling"] },
  "Sensitive tenner": { slug: "sensitive", kicker: "Når noe kaldt blir for kaldt", palette: "frost", thing: "Isbit", moment: "Du drikker noe kaldt, og det isner.", hjelp: ["forebyggende-behandling"] },
  "Hovent tannkjøtt": { slug: "hovne", kicker: "Når noe har bygd seg opp", palette: "bjork", thing: "Speil", moment: "Du ser i speilet, og tannkjøttet er hovent.", hjelp: ["tannkjottbehandling"] },
  "Dårlig ånde": { slug: "aande", kicker: "Når pusten ikke vil gi seg", palette: "mose", thing: "Pastiller", moment: "Du tar enda en pastill, men det hjelper ikke.", hjelp: ["tannkjottbehandling"] },
  "Løse tenner": { slug: "lose", kicker: "Tenner som har gitt etter", palette: "fjord", thing: "Eple", moment: "Du biter i et eple, og en tann gir etter.", hjelp: ["tannkjottbehandling", "tannimplantater"] },
  Kjevesmerter: { slug: "kjeve", kicker: "Kjeven som jobber for mye", palette: "skumring", thing: "Pute", moment: "Du våkner, og kjeven er stiv og øm.", hjelp: ["stabiliseringsskinner"] },
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

/** Each symptom's treatments with their names, for the «Dette kan hjelpe» links. */
export function hjelpFor(s: Symptom) {
  return s.hjelp.map((slug) => {
    const t = ARCADE_TREATMENTS.find((a) => a.slug === slug);
    if (!t) throw new Error(`symptomer: no treatment "${slug}" on /behandlinger`);
    return { slug, title: t.title, href: `/behandlinger#${slug}` };
  });
}

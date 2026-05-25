import { symptoms } from "@/data/content";
import { SymptomerHero } from "@/components/symptoms/SymptomerHero";
import { SymptomSpread } from "@/components/symptoms/SymptomSpread";
import { CtaCloseout } from "@/components/home/CtaCloseout";
import { SYMPTOM_META, type SymptomMeta } from "./data";

const FALLBACK_META: SymptomMeta = {
  subtitle: "",
  region: "Tann",
  photoTone: "#ECE6D6",
};

export default function SymptomerPage() {
  return (
    <main>
      <SymptomerHero />
      {symptoms.map((symptom, index) => (
        <SymptomSpread
          key={symptom.title}
          symptom={symptom}
          meta={SYMPTOM_META[symptom.title] ?? FALLBACK_META}
          index={index}
        />
      ))}
      <CtaCloseout />
    </main>
  );
}

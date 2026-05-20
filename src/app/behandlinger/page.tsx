import { TREATMENTS } from "./data";
import { BehandlingerHero } from "@/components/treatments/BehandlingerHero";
import { TreatmentSpread } from "@/components/treatments/TreatmentSpread";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function BehandlingerPage() {
  return (
    <main>
      <BehandlingerHero />
      {TREATMENTS.map((treatment, index) => (
        <TreatmentSpread
          key={treatment.title}
          treatment={treatment}
          index={index}
        />
      ))}
      <CtaCloseout />
    </main>
  );
}

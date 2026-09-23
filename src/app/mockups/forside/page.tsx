import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsConstellation } from "@/components/home/SymptomsConstellation";
import { AboutLetter } from "@/components/home/AboutLetter";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export const metadata = { title: "Forsiden · papirteater i boksene", robots: { index: false } };

/** The paper-theatre front page, kept at its mockup address. It renders the live components. */
export default function Page() {
  return (
    <main>
      <Hero />
      <TreatmentsSlipcase />
      <TrustSection />
      <SymptomsConstellation />
      <AboutLetter />
      <CtaCloseout />
    </main>
  );
}

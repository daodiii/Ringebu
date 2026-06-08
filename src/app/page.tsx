import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsConstellation } from "@/components/home/SymptomsConstellation";
import { AboutLetter } from "@/components/home/AboutLetter";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function Home() {
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

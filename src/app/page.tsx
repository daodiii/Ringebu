import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsNewspaper } from "@/components/home/SymptomsNewspaper";
import { AboutLetter } from "@/components/home/AboutLetter";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function Home() {
  return (
    <main>
      <Hero />
      <TreatmentsSlipcase />
      <TrustSection />
      <SymptomsNewspaper />
      <AboutLetter />
      <CtaCloseout />
    </main>
  );
}

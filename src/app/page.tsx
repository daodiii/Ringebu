import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsIndex } from "@/components/home/SymptomsIndex";
import { AboutLetter } from "@/components/home/AboutLetter";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function Home() {
  return (
    <main>
      <Hero />
      <TreatmentsSlipcase />
      <TrustSection />
      <SymptomsIndex />
      <AboutLetter />
      <CtaCloseout />
    </main>
  );
}

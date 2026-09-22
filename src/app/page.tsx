import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsConstellation } from "@/components/home/SymptomsConstellation";
import { AboutLetter } from "@/components/home/AboutLetter";
import { CtaCloseout } from "@/components/home/CtaCloseout";

// The root layout no longer declares a canonical, so the homepage owns its own.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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

import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { Vardene } from "@/components/home/Vardene";
import { Bildeboka } from "@/components/symptomer/Bildeboka";
import { Sauene } from "@/components/home/Sauene";

// The root layout no longer declares a canonical, so the homepage owns its own.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <TreatmentsSlipcase />
      <Vardene />
      <Bildeboka />
      <Sauene />
    </main>
  );
}

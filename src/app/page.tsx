import type { Metadata } from "next";

import { Panorama } from "@/components/home/Panorama";
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
    <main className="forside">
      <Panorama />
      <TreatmentsSlipcase />
      <Vardene />
      <Bildeboka />
      <Sauene />
    </main>
  );
}

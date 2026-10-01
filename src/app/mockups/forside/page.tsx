import { Panorama } from "@/components/home/Panorama";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { Vardene } from "@/components/home/Vardene";
import { Bildeboka } from "@/components/symptomer/Bildeboka";
import { Sauene } from "@/components/home/Sauene";

export const metadata = { title: "Forsiden · papirteater i boksene", robots: { index: false } };

/** The paper-theatre front page, kept at its mockup address. It renders the live components. */
export default function Page() {
  return (
    <main>
      <Panorama />
      <TreatmentsSlipcase />
      <Vardene />
      <Bildeboka />
      <Sauene />
    </main>
  );
}

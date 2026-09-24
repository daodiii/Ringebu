import { Hero } from "@/components/home/Hero";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { Vardene } from "@/components/home/Vardene";
import { Bildeboka } from "@/components/symptomer/Bildeboka";
import { AboutLetter } from "@/components/home/AboutLetter";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export const metadata = { title: "Forsiden · papirteater i boksene", robots: { index: false } };

/** The paper-theatre front page, kept at its mockup address. It renders the live components. */
export default function Page() {
  return (
    <main>
      <Hero />
      <TreatmentsSlipcase />
      <Vardene />
      <Bildeboka />
      <AboutLetter />
      <CtaCloseout />
    </main>
  );
}

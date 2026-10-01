import { Buen } from "@/components/mockups/hero/Buen";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";

export const metadata = { title: "Hero · Buen", robots: { index: false } };

export default function Page() {
  return (
    <main>
      <Buen />
      <TreatmentsSlipcase />
    </main>
  );
}

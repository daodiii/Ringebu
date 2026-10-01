import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";
import { Dalen } from "@/components/mockups/hero/Dalen";

export const metadata = { title: "Hero · Dalen", robots: { index: false } };

export default function Page() {
  return (
    <main>
      <Dalen />
      <TreatmentsSlipcase />
    </main>
  );
}

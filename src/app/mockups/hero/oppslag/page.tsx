import { Oppslaget } from "@/components/mockups/hero/Oppslaget";
import { TreatmentsSlipcase } from "@/components/home/TreatmentsSlipcase";

export const metadata = { title: "Hero · Oppslaget", robots: { index: false } };

export default function Page() {
  return (
    <main>
      <Oppslaget />
      <TreatmentsSlipcase />
    </main>
  );
}

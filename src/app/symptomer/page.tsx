import { Hverdagen } from "@/components/symptomer/Hverdagen";
import { SymptomIndex } from "@/components/symptomer/SymptomIndex";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function SymptomerPage() {
  return (
    <main>
      <Hverdagen />
      <SymptomIndex />
      <CtaCloseout />
    </main>
  );
}

import { Hverdagen } from "@/components/symptomer/Hverdagen";
import { SymptomIndex } from "@/components/symptomer/SymptomIndex";
import { Sauene } from "@/components/home/Sauene";

// Ends in the pasture with the contact lines and the form, as the front page
// does: every page that ends with an invitation ends in the same place.
export default function SymptomerPage() {
  return (
    <main>
      <Hverdagen />
      <SymptomIndex />
      <div className="senere">
        <Sauene />
      </div>
    </main>
  );
}

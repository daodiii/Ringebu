import { Sauene } from "@/components/home/Sauene";
import { BehandlingerArcade } from "@/components/behandlinger/BehandlingerArcade";
import { TreatmentIndex } from "@/components/behandlinger/TreatmentIndex";

export default function BehandlingerPage() {
  return (
    <main>
      <BehandlingerArcade />
      <TreatmentIndex />
      {/* Every page that ends with an invitation ends in the pasture */}
      <div className="senere">
        <Sauene />
      </div>
    </main>
  );
}

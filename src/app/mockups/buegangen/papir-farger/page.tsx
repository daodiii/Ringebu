import { BehandlingerArcade } from "@/components/behandlinger/BehandlingerArcade";

export const metadata = { title: "Buegangen · Papirteater i farger", robots: { index: false } };

/** The paper-theatre /behandlinger, kept at its mockup address. It renders the live component. */
export default function Page() {
  return (
    <main>
      <BehandlingerArcade />
    </main>
  );
}

import { OrdningListe } from "@/components/dekning/OrdningListe";
import { Veiviseren } from "@/components/dekning/Veiviseren";
import { Sauene } from "@/components/home/Sauene";

// The signpost, the schemes in full, and the pasture with the contact lines
// and the form, where every page that ends with an invitation ends.
export default function DekningPage() {
  return (
    <main>
      <Veiviseren />
      <OrdningListe />
      <div className="senere">
        <Sauene />
      </div>
    </main>
  );
}

import { Sauene } from "@/components/home/Sauene";
import type { Metadata } from "next";
import { Enga } from "@/components/informasjon/Enga";
import { AVSNITT, TITTEL } from "@/components/informasjon/tekst";
import { DELEBILDE } from "@/app/delebilde";

// The owner's own first lines, so what a search result says is what the page says.
const description = `${TITTEL} ${AVSNITT[0]}`;

export const metadata: Metadata = {
  title: "Om oss",
  description,
  alternates: { canonical: "/informasjon" },
  openGraph: {
    images: [DELEBILDE],
    title: "Om oss | Ringebu Tannlegesenter",
    description,
  },
};

export default function OmOss() {
  return (
    <main>
      <Enga />
      {/* Every page that ends with an invitation ends in the pasture */}
      <div className="senere">
        <Sauene />
      </div>
    </main>
  );
}

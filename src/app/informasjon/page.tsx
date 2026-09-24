import type { Metadata } from "next";
import { Enga } from "@/components/informasjon/Enga";
import { AVSNITT, TITTEL } from "@/components/informasjon/tekst";

// The owner's own first lines, so what a search result says is what the page says.
const description = `${TITTEL} ${AVSNITT[0]}`;

export const metadata: Metadata = {
  title: "Om oss",
  description,
  alternates: { canonical: "/informasjon" },
  openGraph: {
    title: "Om oss | Ringebu Tannlegesenter",
    description,
  },
};

export default function OmOss() {
  return (
    <main>
      <Enga />
    </main>
  );
}

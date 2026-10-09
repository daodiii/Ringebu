import type { Metadata } from "next";
import { Gardsutsalget } from "@/components/priser/Gardsutsalget";
import { DELEBILDE } from "@/app/delebilde";

const description =
  "Priser hos Ringebu Tannlegesenter. Undersøkelse 1 490 kr, fylling fra 1 390 kr, rotfylling, krone og tanntrekking.";

export const metadata: Metadata = {
  title: "Priser",
  description,
  alternates: { canonical: "/priser" },
  openGraph: {
    images: [DELEBILDE],
    title: "Priser | Ringebu Tannlegesenter",
    description,
  },
};

export default function Priser() {
  return (
    <main>
      <Gardsutsalget />
    </main>
  );
}

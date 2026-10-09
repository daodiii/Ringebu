import type { Metadata } from "next";
import { DELEBILDE } from "@/app/delebilde";

export const metadata: Metadata = {
  title: "Behandlinger",
  description:
    "Behandlinger hos Ringebu Tannlegesenter. Undersøkelse, fyllinger, rotfylling, implantater, proteser og tannskader.",
  alternates: { canonical: "/behandlinger" },
  openGraph: {
    images: [DELEBILDE],
    title: "Behandlinger | Ringebu Tannlegesenter",
    description:
      "Fra vanlig undersøkelse til rotfylling. Her er alt vi gjør.",
  },
};

export default function BehandlingerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

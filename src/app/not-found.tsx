import type { Metadata } from "next";
import { Bortkommen } from "@/components/feil/Bortkommen";

export const metadata: Metadata = {
  title: "Fant ikke siden",
};

export default function NotFound() {
  return <Bortkommen />;
}

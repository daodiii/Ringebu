import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symptomer",
  description:
    "Har du tannpine, blødende tannkjøtt eller andre symptomer? Se hva som kan være årsaken.",
  alternates: { canonical: "/symptomer" },
  openGraph: {
    title: "Symptomer | Ringebu Tannlegesenter",
    description:
      "Se hva tannsmertene dine kan bety.",
  },
};

export default function SymptomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

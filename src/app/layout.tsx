import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ringebu Tannlegesenter | Profesjonell Tannpleie",
    template: "%s | Ringebu Tannlegesenter",
  },
  description:
    "Ringebu Tannlegesenter tilbyr moderne tannbehandling av høy kvalitet. Erfarne tannleger, siste teknologi, og fokus på din komfort. Bestill time i dag.",
  keywords: [
    "tannlege",
    "Ringebu",
    "tannlegesenter",
    "tannbehandling",
    "tannhelse",
    "Gudbrandsdalen",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans min-h-screen selection:bg-[var(--color-accent-gold)]/20">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

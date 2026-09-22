import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#0E2A30",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ringebutann.no"),
  title: {
    default: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    template: "%s | Ringebu Tannlegesenter",
  },
  description:
    "Tannlege i Ringebu sentrum. Vi tar én pasient om gangen og har god tid til deg. Ring 61 28 04 12 for time.",
  keywords: [
    "tannlege Ringebu",
    "tannlegesenter",
    "tannbehandling",
    "tannhelse",
    "Gudbrandsdalen",
    "tannpine",
    "tannkjøtt",
    "tannbleking",
    "implantater",
    "akutt tannlege",
  ],
  // No `alternates.canonical` here on purpose. Next inherits it into every
  // child route that does not override it, so declaring "/" at the root made
  // whole sections of the site announce themselves as duplicates of the
  // homepage. Each route sets its own; the homepage sets "/" in page.tsx.
  openGraph: {
    title: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    description:
      "Tannlege i Ringebu sentrum, med god tid til hver pasient.",
    type: "website",
    locale: "nb_NO",
    siteName: "Ringebu Tannlegesenter",
    url: "https://ringebutann.no",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    description:
      "Tannlege i Ringebu sentrum, med god tid til hver pasient.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // Safe: hardcoded static data, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Ringebu Tannlegesenter",
              description:
                "Tannlege i Ringebu sentrum, med god tid til hver pasient.",
              url: "https://ringebutann.no",
              telephone: "+4761280412",
              email: "post@ringebutann.no",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Hanstadgata 2",
                addressLocality: "Ringebu",
                postalCode: "2630",
                addressCountry: "NO",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 61.52,
                longitude: 10.17,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "08:00",
                  closes: "15:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Friday",
                  opens: "08:00",
                  closes: "15:00",
                },
              ],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

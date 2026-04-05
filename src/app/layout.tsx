import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#3C2415",
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
    "Ringebu Tannlegesenter tilbyr moderne tannbehandling med personlig omsorg. Erfarne tannleger, siste teknologi og fokus på din komfort. Bestill time i dag.",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    description:
      "Moderne tannbehandling med personlig omsorg i hjertet av Gudbrandsdalen.",
    type: "website",
    locale: "nb_NO",
    siteName: "Ringebu Tannlegesenter",
    url: "https://ringebutann.no",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ringebu Tannlegesenter | Din Tannlege i Ringebu",
    description:
      "Moderne tannbehandling med personlig omsorg i hjertet av Gudbrandsdalen.",
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
    <html lang="nb" className={`${fraunces.variable} ${dmSans.variable}`}>
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
                "Moderne tannbehandling med personlig omsorg i hjertet av Gudbrandsdalen.",
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

import type { MetadataRoute } from "next";

// So «Legg til på startskjermen» gets the right name, icon and colours.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ringebu Tannlegesenter",
    short_name: "Tannlegen",
    description: "Tannlege i Ringebu sentrum.",
    lang: "nb",
    start_url: "/",
    display: "browser",
    background_color: "#FCF9F2",
    theme_color: "#0E2A30",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

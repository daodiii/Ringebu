import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  experimental: {
    // The CSS goes in each page's <head> instead of three stylesheets the
    // first paint waits a round trip for (PageSpeed, 2026-10-07: "render-
    // blocking requests", est. 510 ms on a phone). Every page's HTML is
    // ~25 KB heavier for it.
    inlineCss: true,
  },
  images: {
    // AVIF first, WebP for browsers without it. Measured on the hero photos
    // (2026-10-07): 24% smaller on a phone, 19% on desktop.
    formats: ["image/avif", "image/webp"],
    // next/image qualities used across the site (Next 16 requires them listed).
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

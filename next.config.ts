import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Browsers that have been here once go straight to https from then on, even
  // when someone types the address without it. Two years, as Vercel's own;
  // without includeSubDomains, since the domain's mail lives elsewhere.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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

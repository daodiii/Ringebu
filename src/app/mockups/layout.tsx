import type { Metadata } from "next";

// Design mockups kept for the owner to look back at. Reachable by link, but
// kept out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MockupsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

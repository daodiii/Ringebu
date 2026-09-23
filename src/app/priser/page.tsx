import { permanentRedirect } from "next/navigation";

// /priser is a permanent alias for /behandlinger. The site no longer lists
// prices, but links to them should still land on the treatments.
// permanentRedirect issues 308 rather than the 307
// that redirect() sends: a temporary redirect tells search engines to keep
// /priser indexed separately instead of consolidating it onto the target.
// The route is kept rather than deleted so existing links and bookmarks
// still resolve.
export default function Priser() {
  permanentRedirect("/behandlinger");
}

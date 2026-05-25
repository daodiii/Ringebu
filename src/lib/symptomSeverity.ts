export type Tier = "now" | "soon" | "watch";

export function getTier(severity: string): Tier {
  const s = severity.toLowerCase();
  if (s.includes("haster") || s.includes("snarest")) return "now";
  if (s.includes("vanlig")) return "watch";
  return "soon";
}

export const TIER_ACTION: Record<Tier, { verb: string; helper: string }> = {
  now: {
    verb: "Ring nå",
    helper: "Vi tar imot akutte henvendelser samme dag.",
  },
  soon: {
    verb: "Bestill time",
    helper: "Bør undersøkes innen en uke eller to.",
  },
  watch: {
    verb: "Nevn det ved neste kontroll",
    helper: "Trenger sjelden egen time — ta det opp ved neste rutinebesøk.",
  },
};

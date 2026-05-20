import { symptoms } from "@/data/content";
import type { Severity } from "@/components/ui/SeverityPill";

export function mapSeverity(raw: string): Severity {
  const s = raw.toLowerCase();
  if (s.includes("snarest") || s.includes("oppsøk") || s.includes("haster")) return "now";
  if (s.includes("behandles") || s.includes("undersøk")) return "soon";
  return "watch";
}

export const TOP_SYMPTOMS = symptoms.slice(0, 6);

export const TIER_META: Record<
  Severity,
  { label: string; band: string; dot: string; text: string; subtitle: string }
> = {
  now: {
    label: "Krever umiddelbar handling",
    band: "#3D2418",
    dot: "#B8624A",
    text: "#F5E9CB",
    subtitle: "Tannverk venter ikke. Ring oss samme dag.",
  },
  soon: {
    label: "Bør undersøkes",
    band: "#B8945C",
    dot: "#8B6F4A",
    text: "#1A1410",
    subtitle: "Vent ikke på neste rutinekontroll — bestill time.",
  },
  watch: {
    label: "Følg utviklingen",
    band: "#ECE2CE",
    dot: "#8B6F4A",
    text: "#1A1410",
    subtitle: "Hold øye, ta opp ved neste besøk.",
  },
};

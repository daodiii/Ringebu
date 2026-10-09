"use client";

import { useMotionValue } from "framer-motion";
import { SCENES } from "@/components/behandlinger/BehandlingerArcade";
import { ARCADE_TREATMENTS } from "@/components/behandlinger/data";
import { PlayOnce } from "@/components/behandlinger/scenes/usePhase";

/**
 * Every arch's scene in its finished pose, side by side, for
 * scripts/buegang-stills.cjs to photograph into public/images/buegang/.
 * The arcade shows those stills in the arches that are not playing. Each
 * scene plays its routine once and holds (PlayOnce), with its loops still
 * (data-still), at the desktop arch's size (330 × 594, the scene's own
 * 300 × 540 proportions). Not linked from the site; /mockups is noindex.
 */
export default function Stillbilder() {
  const d = useMotionValue(0);
  return (
    <main className="flex flex-wrap gap-6 bg-[var(--color-paper)] p-8 pt-28">
      {ARCADE_TREATMENTS.map((t) => {
        const Scene = SCENES[t.slug];
        if (!Scene) return null;
        return (
          <div key={t.slug} data-rom={t.slug} data-still className="relative overflow-hidden" style={{ width: 330, height: 594, background: Scene.ground }}>
            <PlayOnce.Provider value>
              <Scene active d={d} reduced={false} mode="arch" />
            </PlayOnce.Provider>
          </div>
        );
      })}
    </main>
  );
}

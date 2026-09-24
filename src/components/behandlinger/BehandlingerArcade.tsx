"use client";

import { Buegang } from "./Buegang";
import { PapirKrone, PapirSkraper, PapirSpeil, withPalette } from "./scenes/Papir";
import { PapirBittskinne, PapirFargeskala, PapirHerdelampe, PapirRontgen, PapirRotfil, PapirStol } from "./scenes/PapirMer";
import type { SceneSet } from "./scenes/types";

// Every arch its own scene and its own paper. The hues step along the walk,
// so no two neighbours share a colour. Keys are the treatment slugs from ./data.
const SCENES: SceneSet = {
  "forebyggende-behandling": withPalette(PapirSpeil, "fjord"),
  bleking: withPalette(PapirFargeskala, "frost"),
  fyllingsterapi: withPalette(PapirHerdelampe, "lav"),
  "kroner-og-broer": withPalette(PapirKrone, "lyng"),
  rotfylling: withPalette(PapirRotfil, "bjork"),
  visdomstennene: withPalette(PapirRontgen, "mose"),
  "tannkjott-tannstein": withPalette(PapirSkraper, "eukalyptus"),
  bittskinner: withPalette(PapirBittskinne, "skumring"),
  tannlegeskrekk: withPalette(PapirStol, "molte"),
};

/**
 * /behandlinger: the arcade with a paper theatre in every arch. Pages are
 * server components and cannot pass component references to a client one,
 * so the scene set is wired up here.
 */
export function BehandlingerArcade() {
  return <Buegang scenes={SCENES} />;
}

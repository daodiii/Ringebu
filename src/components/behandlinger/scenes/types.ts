import type { ComponentType } from "react";
import type { MotionValue } from "framer-motion";

/**
 * One animated scene inside an arch of the arcade, in place of a photograph.
 * The valley is always behind it: in an arch the page's own valley shows
 * through, and in the doorway the room paints the valley under the scene.
 */
export type SceneProps = {
  /** True while the arch is in the middle of the screen, hovered, or walked into. */
  active: boolean;
  /** How far the arch is from the middle, in half-screens (negative is left). */
  d: MotionValue<number>;
  reduced: boolean;
  /** "arch" inside the opening on the wall; "door" when it fills the screen. */
  mode: "arch" | "door";
};

export type Scene = ComponentType<SceneProps>;

/** Scenes by treatment slug. Arches without one look out on the valley. */
export type SceneSet = Partial<Record<string, Scene>>;

/** Every scene is drawn in this box, the shape of an arch. */
export const VB = { w: 300, h: 540 } as const;

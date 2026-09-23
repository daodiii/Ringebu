import type { ComponentType } from "react";
import type { MotionValue } from "framer-motion";

/**
 * One animated scene inside an arch of the arcade, in place of a photograph.
 * The scene paints its own backdrop, so it looks the same in an arch and in
 * the doorway.
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

/** `ground` is the solid colour the scene paints behind itself in an arch. */
export type Scene = ComponentType<SceneProps> & { ground?: string };

/** Scenes by treatment slug. Arches without one stay bare paper. */
export type SceneSet = Partial<Record<string, Scene>>;

/** Every scene is drawn in this box, the shape of an arch. */
export const VB = { w: 300, h: 540 } as const;

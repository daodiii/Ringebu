import { getImageProps, type StaticImageData } from "next/image";
import far from "./far.webp";
import farPhone from "./far-phone.webp";
import farTall from "./far-tall.webp";
import near from "./near.webp";
import nearPhone from "./near-phone.webp";
import nearTall from "./near-tall.webp";
import s from "./panorama.module.css";

/**
 * The view from the lookout above Ringebu: the river Lågen running down
 * Gudbrandsdalen. The far valley, and the near things (the birches, the concrete
 * lookout, the path) laid back over it, each as <picture> with one source per
 * screen shape, so a screen fetches only the crop it can show. It paints at full
 * opacity from the first frame, which keeps it the page's LCP.
 */
const WIDE = "100vw";
const TALL = "calc(100svh * 0.9)";
const PHONE = "calc(100svh * 0.56)";

function art(wide: StaticImageData, tall: StaticImageData, phone: StaticImageData) {
  const common = { alt: "", loading: "eager", fetchPriority: "high" } as const;
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, sizes: WIDE, src: wide });
  const {
    props: { srcSet: tallSet, ...img },
  } = getImageProps({ ...common, sizes: TALL, src: tall });
  const {
    props: { srcSet: phoneSet },
  } = getImageProps({ ...common, sizes: PHONE, src: phone });
  return { wideSet, tallSet, phoneSet, img };
}
const FAR = art(far, farTall, farPhone);
const NEAR = art(near, nearTall, nearPhone);

function Layer({ a, alt }: { a: ReturnType<typeof art>; alt: string }) {
  return (
    <picture className={s.vpl}>
      <source media="(min-aspect-ratio: 1/1)" srcSet={a.wideSet} sizes={WIDE} />
      <source media="(max-aspect-ratio: 9/16)" srcSet={a.phoneSet} sizes={PHONE} />
      <img {...a.img} srcSet={a.tallSet} sizes={TALL} alt={alt} />
    </picture>
  );
}

export function ValleyPicture() {
  return (
    <div className={s.vp}>
      <Layer a={FAR} alt="Utsikt over Lågen og Gudbrandsdalen fra utkikkspunktet over Ringebu" />
      <Layer a={NEAR} alt="" />
    </div>
  );
}

import type { Bilde } from "./klinikk";
import s from "./panorama.module.css";

/**
 * One tile's photograph. Low fetch priority: the valley is the first screen and the
 * page's LCP, and the photographs must not compete with it for the connection.
 */
export function KlinikkBilde({ b, sizes }: { b: Bilde; sizes: string }) {
  const f = (w: number) => `/images/klinikk/${b.n}-${w}.webp`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={s.ph}
      src={f(960)}
      srcSet={`${f(720)} 720w, ${f(960)} 960w, ${f(1920)} 1920w, ${f(2880)} 2880w`}
      sizes={sizes}
      width={b.w}
      height={b.h}
      alt={b.alt}
      loading="eager"
      fetchPriority="low"
      decoding="async"
      style={{ objectPosition: b.pos }}
    />
  );
}

export function Flis({ b, sizes }: { b: Bilde; sizes: string }) {
  return (
    <div className={s.tile}>
      <KlinikkBilde b={b} sizes={sizes} />
    </div>
  );
}

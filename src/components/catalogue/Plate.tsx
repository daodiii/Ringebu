"use client";

import Image from "next/image";

interface Props {
  title: string;
  photo: string;
  photoTone: string;
  open: boolean;
  /** The first row is open on load, so its plate is the LCP candidate. */
  priority?: boolean;
  onError: () => void;
}

/** Reveals downward via a vertical clip as its row opens. */
export function Plate({ title, photo, photoTone, open, priority, onError }: Props) {
  return (
    <div className="md:order-2">
      <div
        className="relative aspect-square w-full overflow-hidden shadow-[inset_0_0_0_1px_rgba(14,42,48,0.16)] transition-[clip-path] duration-[600ms] ease-out motion-reduce:transition-none"
        style={{
          background: photoTone,
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        }}
      >
        <Image
          src={photo}
          alt={`${title}, illustrasjonsbilde fra Ringebu Tannlegesenter`}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
          priority={priority}
          onError={onError}
        />
      </div>
    </div>
  );
}

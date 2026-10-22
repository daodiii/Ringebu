/**
 * The six clinic photographs (public/images/klinikk, the gallery on /informasjon),
 * each in 720, 960, 1920 and 2880 px wide. 720 is for phones: a tile there is
 * 150-240 px wide, so at 3x it needs about 700 px, and the file is 40% lighter
 * than the 960 one.
 *
 * pos is where the photograph is cut in its tile; posM (optional) is the cut on a
 * phone: the treatment room's big tile is tall and narrow there and shows about half
 * the width, so the chair, which sits to the right, is moved into it; the dental chair's
 * big tile is full width on a phone (its set is turned a quarter), so only the height is
 * cut, to the seat.
 */
export const KLINIKK = {
  rom: { n: "01-treatment-room", w: 1440, h: 1920, pos: "50% 42%", posM: "82% 50%", alt: "Behandlingsrommet med tannlegestol, lampe og instrumenter" },
  stol: { n: "02-dental-chair", w: 1440, h: 1920, pos: "50% 55%", posM: "50% 68%", alt: "Tannlegestolen med blått underlag" },
  utstyr: { n: "03-instruments", w: 1920, h: 1440, pos: "50% 40%", alt: "Instrumenter på et blått underlag ved tannlegestolen" },
  gang: { n: "05-clinic-interior", w: 1440, h: 1920, pos: "50% 48%", alt: "Gangen på klinikken, med utsikt over dalen på glassveggen" },
  skilt: { n: "06-clinic-sign", w: 1920, h: 1790, pos: "56% 46%", alt: "Skiltet utenfor Ringebu Tannlegesenter mot en blå himmel" },
  rontgen: { n: "07-xray-machine", w: 1440, h: 1920, pos: "50% 46%", alt: "Panoramarøntgen (OPG) på klinikken" },
} as const;

export type Bilde = (typeof KLINIKK)[keyof typeof KLINIKK];

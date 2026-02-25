declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
    export interface IconProps extends SVGProps<SVGSVGElement> {
        size?: string | number;
        absoluteStrokeWidth?: boolean;
    }
    export type Icon = FC<IconProps>;

    // Common
    export const ArrowRight: Icon;
    export const Phone: Icon;
    export const Mail: Icon;
    export const MapPin: Icon;
    export const Clock: Icon;
    export const Calendar: Icon;
    export const Menu: Icon;
    export const X: Icon;
    export const Info: Icon;
    export const User: Icon;
    export const Star: Icon;
    export const Heart: Icon;
    export const Sparkles: Icon;
    export const Shield: Icon;
    export const Award: Icon;
    export const CheckCircle: Icon;

    // Medical / Specific
    export const Stethoscope: Icon;
    export const Syringe: Icon;
    export const Zap: Icon;
    export const SmilePlus: Icon;
    export const Camera: Icon;
    export const Crown: Icon;
    export const ShieldCheck: Icon;
    export const Paintbrush: Icon;
    export const CircleDot: Icon;
    export const Droplets: Icon;
    export const AlarmClock: Icon;
    export const HandHeart: Icon;

    // Social / Other (might be used via dynamic names but adding just in case)
    export const Facebook: Icon;
    export const Instagram: Icon;
    export const Linkedin: Icon;
    export const Twitter: Icon;
    export const Youtube: Icon;
    export const ChevronRight: Icon;
    export const ChevronLeft: Icon;
}

declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
    export interface IconProps extends SVGProps<SVGSVGElement> {
        size?: string | number;
        absoluteStrokeWidth?: boolean;
    }
    export type Icon = FC<IconProps>;
    export type LucideIcon = Icon;

    // Common Navigation
    export const ArrowRight: Icon;
    export const ArrowLeft: Icon;
    export const ArrowUpRight: Icon;
    export const ChevronRight: Icon;
    export const ChevronLeft: Icon;
    export const ChevronDown: Icon;
    export const ChevronUp: Icon;

    // UI
    export const Menu: Icon;
    export const X: Icon;
    export const Info: Icon;
    export const AlertCircle: Icon;
    export const AlertTriangle: Icon;

    // Contact
    export const Phone: Icon;
    export const Mail: Icon;
    export const MapPin: Icon;
    export const Clock: Icon;
    export const Calendar: Icon;

    // People
    export const User: Icon;
    export const Star: Icon;

    // Medical / Dental
    export const Heart: Icon;
    export const Sparkles: Icon;
    export const Shield: Icon;
    export const ShieldCheck: Icon;
    export const ShieldAlert: Icon;
    export const Award: Icon;
    export const Stethoscope: Icon;
    export const Syringe: Icon;
    export const Zap: Icon;
    export const SmilePlus: Icon;
    export const Camera: Icon;
    export const Crown: Icon;
    export const Paintbrush: Icon;
    export const CircleDot: Icon;
    export const Droplets: Icon;
    export const AlarmClock: Icon;
    export const HandHeart: Icon;
    export const HandCoins: Icon;
    export const Thermometer: Icon;
    export const Wind: Icon;
    export const Flame: Icon;
    export const Unlink: Icon;
    export const Frown: Icon;
    export const CheckCircle: Icon;

    // Social
    export const Facebook: Icon;
    export const Instagram: Icon;
    export const Linkedin: Icon;
    export const Twitter: Icon;
    export const Youtube: Icon;

    // Legacy (used by old components still in codebase)
    export const QuoteIcon: Icon;
    export const ChevronRightIcon: Icon;
}

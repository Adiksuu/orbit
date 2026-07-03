import { AlertOctagon, icons, type LucideIcon } from 'lucide-react';

interface IconProps {
    name: keyof typeof icons;
    size?: number;
    color?: string;
    className?: string;
}

function Icon({ name, size = 16, color, className }: IconProps) {
    const LucideIcon: LucideIcon = icons[name];

    if (!LucideIcon) {
        console.warn(
            `Icon with name ${name} not found. Please check your spelling or use different icon name.`,
        );
        return <AlertOctagon size={size} color={color} className={className} />;
    }

    return <LucideIcon color={color} size={size} className={className} />;
}

export default Icon;

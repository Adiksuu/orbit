import Icon from '@/Components/Atoms/Icon/Icon';
import { Link } from '@inertiajs/react';
import { icons } from 'lucide-react';

interface SettingsTabItemProps {
    label: string;
    href: string;
    icon: keyof typeof icons;
    isActive?: boolean;
}

export default function SettingsTabItem({
    label,
    href,
    icon,
    isActive = false,
}: SettingsTabItemProps) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                isActive
                    ? 'bg-[var(--accent-color-opacity)] text-white'
                    : 'text-zinc-400 hover:bg-[var(--bg-light-color)] hover:text-white'
            }`}
        >
            <Icon name={icon} size={15} />
            <span>{label}</span>
        </Link>
    );
}

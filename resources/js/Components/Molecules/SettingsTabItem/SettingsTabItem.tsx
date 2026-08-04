import Icon from '@/Components/Atoms/Icon/Icon';
import { Link } from '@inertiajs/react';
import { icons } from 'lucide-react';

interface SettingsTabItemProps {
    label: string;
    href: string;
    icon: keyof typeof icons;
    isActive?: boolean;
    onClick?: () => void;
}

export default function SettingsTabItem({
    label,
    href,
    icon,
    isActive = false,
    onClick,
}: SettingsTabItemProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`group flex items-center gap-2.5 rounded-md border-l-2 px-2.5 py-2 text-sm transition-colors ${
                isActive
                    ? 'border-[var(--accent-color)] bg-[var(--bg-light-color)] text-white'
                    : 'border-transparent text-zinc-400 hover:bg-[var(--bg-light-color)] hover:text-white'
            }`}
        >
            <Icon
                name={icon}
                size={16}
                className={
                    isActive
                        ? 'text-[var(--accent-color)]'
                        : 'text-zinc-500 group-hover:text-zinc-300'
                }
            />
            <span className="truncate font-medium">{label}</span>
        </Link>
    );
}

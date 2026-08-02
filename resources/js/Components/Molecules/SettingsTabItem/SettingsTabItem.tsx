import Icon from '@/Components/Atoms/Icon/Icon';
import { Link } from '@inertiajs/react';
import { icons } from 'lucide-react';

interface SettingsTabItemProps {
    label: string;
    href: string;
    icon: keyof typeof icons;
    description?: string;
    isActive?: boolean;
}

export default function SettingsTabItem({
    label,
    href,
    icon,
    description,
    isActive = false,
}: SettingsTabItemProps) {
    return (
        <Link
            href={href}
            className={`group flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-xs transition-all sm:text-sm ${
                isActive
                    ? 'border-[var(--accent-color-opacity)] bg-[var(--accent-color-opacity)] text-white'
                    : 'border-transparent text-zinc-400 hover:border-[var(--bg-light-color)] hover:bg-[var(--bg-light-color)] hover:text-white'
            }`}
        >
            <span
                className={`mt-0.5 rounded-md p-1.5 ${
                    isActive
                        ? 'bg-[var(--accent-color)]/20 text-[var(--accent-color)]'
                        : 'bg-[var(--bg-light-color)] text-zinc-300 group-hover:text-white'
                }`}
            >
                <Icon name={icon} size={14} />
            </span>
            <span className="min-w-0 space-y-0.5">
                <span className="block truncate font-medium">{label}</span>
                {description ? (
                    <span
                        className={`line-clamp-1 hidden text-xs sm:block ${
                            isActive
                                ? 'text-zinc-200'
                                : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                    >
                        {description}
                    </span>
                ) : null}
            </span>
        </Link>
    );
}

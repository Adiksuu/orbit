import Badge from '@/Components/Atoms/Badge/Badge';
import Icon from '@/Components/Atoms/Icon/Icon';
import { Link } from '@inertiajs/react';
import { icons } from 'lucide-react';

interface SettingsTabItemProps {
    label: string;
    href: string;
    icon: keyof typeof icons;
    isActive?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
}

export default function SettingsTabItem({
    label,
    href,
    icon,
    isActive = false,
    isDisabled = false,
    onClick,
}: SettingsTabItemProps) {
    const content = (
        <>
            <Icon
                name={icon}
                size={16}
                className={
                    isActive
                        ? 'text-[var(--accent-color)]'
                        : isDisabled
                          ? 'text-zinc-600'
                          : 'text-zinc-500 group-hover:text-zinc-300'
                }
            />
            <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
            {isDisabled && (
                <Badge
                    color="in_progress"
                    className="shrink-0 px-1.5 uppercase tracking-wide"
                >
                    Soon
                </Badge>
            )}
        </>
    );

    if (isDisabled) {
        return (
            <div
                aria-disabled="true"
                className="group flex cursor-not-allowed items-center gap-2.5 rounded-md border-l-2 border-transparent px-2.5 py-2 text-sm text-zinc-600"
            >
                {content}
            </div>
        );
    }

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
            {content}
        </Link>
    );
}

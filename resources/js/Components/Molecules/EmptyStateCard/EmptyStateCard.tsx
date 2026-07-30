import Icon from '@/Components/Atoms/Icon/Icon';
import { useShortcuts } from '@/context/ShortcutContext';
import { DashboardEmptyStateProps } from '@/types/Components';
import { Link } from '@inertiajs/react';
import React from 'react';

function DashboardEmptyState({
    iconName,
    title,
    description,
    actionHref,
    actionShortcut,
}: DashboardEmptyStateProps) {
    const { triggerShortcut } = useShortcuts();

    const handleClick = (e: React.MouseEvent) => {
        if (actionShortcut) {
            e.preventDefault();
            triggerShortcut(actionShortcut);
        }
    };

    return (
        <Link
            href={actionHref}
            onClick={handleClick}
            className="hover:bg-[var(--accent-color)]/[0.02] group flex flex-col items-center justify-center bg-zinc-900/20 p-8 text-center transition-all duration-200"
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500 transition-colors group-hover:border-purple-500/30 group-hover:text-[var(--accent-color)]">
                <Icon name={iconName} size={22} />
            </div>

            <div className="max-w-xs">
                <h4 className="text-sm font-semibold text-zinc-300 transition-colors group-hover:text-white">
                    {title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    {description}
                </p>
            </div>
        </Link>
    );
}

export default DashboardEmptyState;

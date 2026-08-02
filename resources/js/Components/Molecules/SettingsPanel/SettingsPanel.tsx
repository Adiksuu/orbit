import React from 'react';

interface SettingsPanelProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function SettingsPanel({
    title,
    description,
    children,
}: SettingsPanelProps) {
    return (
        <section className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-dark-color)]">
            <header className="border-b border-[var(--bg-light-color)] px-5 py-4">
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                {description && (
                    <p className="mt-1 text-sm text-zinc-400">{description}</p>
                )}
            </header>
            <div className="divide-y divide-[var(--bg-light-color)]">{children}</div>
        </section>
    );
}

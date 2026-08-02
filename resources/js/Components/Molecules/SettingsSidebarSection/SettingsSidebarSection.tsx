import React from 'react';

interface SettingsSidebarSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function SettingsSidebarSection({
    title,
    children,
}: SettingsSidebarSectionProps) {
    return (
        <section className="space-y-2">
            <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {title}
            </h2>
            <div className="space-y-1">{children}</div>
        </section>
    );
}

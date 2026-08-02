import React from 'react';

interface SettingsPanelRowProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export default function SettingsPanelRow({
    title,
    description,
    action,
}: SettingsPanelRowProps) {
    return (
        <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium text-white">{title}</p>
                {description && (
                    <p className="text-sm text-zinc-400">{description}</p>
                )}
            </div>
            {action && (
                <div className="w-full md:w-auto md:shrink-0 [&>*]:w-full md:[&>*]:w-auto">
                    {action}
                </div>
            )}
        </div>
    );
}

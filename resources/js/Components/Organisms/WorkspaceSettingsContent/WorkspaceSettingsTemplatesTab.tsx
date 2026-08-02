import Button from '@/Components/Atoms/Button/Button';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { useState } from 'react';

export default function WorkspaceSettingsTemplatesTab() {
    const [templateVisibility, setTemplateVisibility] = useState('Workspace');

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Issue templates"
                description="Create reusable structures to speed up issue creation."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                    {[
                        {
                            title: 'Bug report',
                            fields: ['Summary', 'Steps to reproduce', 'Logs'],
                        },
                        {
                            title: 'Feature request',
                            fields: ['Problem', 'Proposal', 'Acceptance'],
                        },
                    ].map((template) => (
                        <div
                            key={template.title}
                            className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4"
                        >
                            <p className="text-sm font-medium text-white">
                                {template.title}
                            </p>
                            <div className="mt-2 space-y-1">
                                {template.fields.map((field) => (
                                    <div
                                        key={field}
                                        className="rounded-md bg-[var(--bg-light-color)] px-2 py-1 text-xs text-zinc-400"
                                    >
                                        {field}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <SettingsPanelRow
                    title="Template library"
                    description="Create and manage workspace-wide issue templates."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Open library
                        </Button>
                    }
                />
                <SettingsPanelRow
                    title="Default visibility"
                    description="Control who can use new templates by default."
                    action={
                        <button
                            type="button"
                            className="rounded-full border border-[var(--bg-light-color)] px-3 py-1.5 text-xs font-medium text-zinc-300"
                            onClick={() =>
                                setTemplateVisibility(
                                    templateVisibility === 'Workspace'
                                        ? 'Project only'
                                        : 'Workspace',
                                )
                            }
                        >
                            {templateVisibility}
                        </button>
                    }
                />
            </SettingsPanel>
            <SettingsPanel
                title="Quality controls"
                description="Keep templates clear and reliable."
            >
                <SettingsPanelRow
                    title="Review before publishing"
                    description="Require approval from admins before templates are available."
                />
            </SettingsPanel>
        </div>
    );
}

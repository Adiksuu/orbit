import Button from '@/Components/Atoms/Button/Button';
import LabelBadge from '@/Components/Atoms/LabelBadge/LabelBadge';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { IssueLabel } from '@/types/Issues';
import { useState } from 'react';

const sampleLabels: IssueLabel[] = [
    'bug',
    'feature',
    'performance',
    'design',
    'ux',
    'chore',
];

export default function WorkspaceSettingsLabelsTab() {
    const [autoLabelColor, setAutoLabelColor] = useState(true);

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Label taxonomy"
                description="Maintain consistent issue categorization across the workspace."
            >
                <div className="space-y-4 px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {sampleLabels.map((label) => (
                            <LabelBadge key={label} label={label} />
                        ))}
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--bg-light-color)] px-2 py-0.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
                        >
                            + Add label
                        </button>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-sm font-medium text-white">
                                Auto-assign label colors
                            </p>
                            <ToggleSwitch
                                checked={autoLabelColor}
                                onChange={setAutoLabelColor}
                            />
                        </div>
                    </div>
                </div>
            </SettingsPanel>
            <SettingsPanel
                title="Governance"
                description="Keep naming standards and ownership clear."
            >
                <SettingsPanelRow
                    title="Required naming pattern"
                    description="Encourage label names that map to product or domain taxonomy."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Configure
                        </Button>
                    }
                />
            </SettingsPanel>
        </div>
    );
}

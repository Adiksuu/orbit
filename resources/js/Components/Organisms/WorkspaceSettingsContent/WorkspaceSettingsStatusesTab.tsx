import Button from '@/Components/Atoms/Button/Button';
import StatusDot from '@/Components/Atoms/StatusDot/StatusDot';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { useState } from 'react';

export default function WorkspaceSettingsStatusesTab() {
    const [statusModel, setStatusModel] = useState('Kanban flow');

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Workflow statuses"
                description="Define the lifecycle model and visible status lanes."
            >
                <div className="space-y-4 px-5 py-4">
                    <div className="flex items-center justify-between rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3">
                        <p className="text-sm font-medium text-white">
                            Status model
                        </p>
                        <button
                            type="button"
                            className="rounded-full border border-[var(--bg-light-color)] px-3 py-1.5 text-xs font-medium text-zinc-300"
                            onClick={() =>
                                setStatusModel(
                                    statusModel === 'Kanban flow'
                                        ? 'Custom flow'
                                        : 'Kanban flow',
                                )
                            }
                        >
                            {statusModel}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        {[
                            { key: 'open', label: 'Open', count: 14 },
                            {
                                key: 'in_progress',
                                label: 'In progress',
                                count: 8,
                            },
                            { key: 'closed', label: 'Closed', count: 21 },
                        ].map((status) => (
                            <div
                                key={status.key}
                                className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3"
                            >
                                <div className="mb-1 flex items-center gap-2">
                                    <StatusDot
                                        status={
                                            status.key as
                                                | 'open'
                                                | 'in_progress'
                                                | 'closed'
                                        }
                                    />
                                    <p className="text-sm font-medium text-white">
                                        {status.label}
                                    </p>
                                </div>
                                <p className="text-xs text-zinc-400">
                                    {status.count} items in snapshot
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </SettingsPanel>
            <SettingsPanel
                title="Status maintenance"
                description="Manage transitions and historical consistency."
            >
                <SettingsPanelRow
                    title="Reorder statuses"
                    description="Set the order used in boards, lists, and automation."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Reorder
                        </Button>
                    }
                />
            </SettingsPanel>
        </div>
    );
}

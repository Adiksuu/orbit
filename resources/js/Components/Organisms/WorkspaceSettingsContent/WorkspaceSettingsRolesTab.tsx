import Button from '@/Components/Atoms/Button/Button';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { useState } from 'react';

export default function WorkspaceSettingsRolesTab() {
    const [roleApproval, setRoleApproval] = useState(true);

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Roles and permissions"
                description="Define permission boundaries and admin responsibilities."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-white">
                            Permission matrix preview
                        </p>
                        <div className="mt-2 space-y-1.5 text-xs">
                            {[
                                { role: 'Admin', access: 'Full access' },
                                { role: 'Member', access: 'Edit + comment' },
                                { role: 'Guest', access: 'Read only' },
                            ].map((row) => (
                                <div
                                    key={row.role}
                                    className="flex items-center justify-between rounded-md bg-[var(--bg-light-color)] px-2 py-1 text-zinc-300"
                                >
                                    <span>{row.role}</span>
                                    <span>{row.access}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-white">
                            Role change policy
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-zinc-400">
                                Approval workflow
                            </span>
                            <ToggleSwitch
                                checked={roleApproval}
                                onChange={setRoleApproval}
                            />
                        </div>
                    </div>
                </div>
                <SettingsPanelRow
                    title="Role matrix"
                    description="Review and update permissions for each workspace role."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Edit matrix
                        </Button>
                    }
                />
            </SettingsPanel>
            <SettingsPanel
                title="Administration"
                description="Operational controls for workspace governance."
            >
                <SettingsPanelRow
                    title="Audit logs"
                    description="Inspect security-sensitive role and policy changes."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            View logs
                        </Button>
                    }
                />
            </SettingsPanel>
        </div>
    );
}

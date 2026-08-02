import Button from '@/Components/Atoms/Button/Button';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { useState } from 'react';

export default function WorkspaceSettingsMembersTab() {
    const [guestInvites, setGuestInvites] = useState(true);

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Member access"
                description="Manage invites, directory controls, and workspace onboarding."
            >
                <div className="space-y-2 px-5 py-4">
                    {[
                        { initials: 'JD', name: 'John Doe', role: 'Admin' },
                        {
                            initials: 'AK',
                            name: 'Anna Kowalska',
                            role: 'Member',
                        },
                        { initials: 'MK', name: 'Marek Kowal', role: 'Member' },
                    ].map((member) => (
                        <div
                            key={member.name}
                            className="flex items-center justify-between rounded-lg border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-2"
                        >
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-color-opacity)] text-xs font-semibold text-white">
                                    {member.initials}
                                </span>
                                <div>
                                    <p className="text-sm text-white">
                                        {member.name}
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="rounded-md border border-[var(--bg-light-color)] px-2 py-1 text-xs text-zinc-300"
                            >
                                Manage
                            </button>
                        </div>
                    ))}
                </div>
                <SettingsPanelRow
                    title="Invite members"
                    description="Add teammates and assign default role at invitation time."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Invite
                        </Button>
                    }
                />
                <SettingsPanelRow
                    title="Allow guest invites"
                    description="Allow members to invite external collaborators."
                    action={
                        <ToggleSwitch
                            checked={guestInvites}
                            onChange={setGuestInvites}
                        />
                    }
                />
            </SettingsPanel>
            <SettingsPanel
                title="Directory"
                description="Centralized directory controls for teams."
            >
                <SettingsPanelRow
                    title="SCIM sync"
                    description="Manage automatic membership provisioning."
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

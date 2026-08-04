import Input from '@/Components/Atoms/Input/Input';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import { useState } from 'react';

export default function AccountSettingsProfileTab() {
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john@acme.com');
    const [title, setTitle] = useState('Product Engineer');
    const [timezone, setTimezone] = useState('Europe/Warsaw');
    const [pronouns, setPronouns] = useState('he/him');

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Profile details"
                description="Information shown to teammates in Orbit."
            >
                <div className="grid grid-cols-1 gap-5 px-5 py-4 lg:grid-cols-[1.4fr_1fr]">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Input
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                        />
                        <div className="md:col-span-2">
                            <Input
                                value={pronouns}
                                onChange={(e) => setPronouns(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted-color)]">
                            Profile preview
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-color-opacity)] text-sm font-semibold text-white">
                                JD
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[var(--text-color)]">
                                    {fullName}
                                </p>
                                <p className="text-xs text-[var(--text-gray-color)]">
                                    {title}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2 text-xs text-[var(--text-gray-color)]">
                            <p>{email}</p>
                            <p>{timezone}</p>
                            <p>{pronouns}</p>
                        </div>
                    </div>
                </div>
            </SettingsPanel>
            <SettingsPanel
                title="Profile actions"
                description="Access profile-level appearance and visibility controls."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-[var(--text-color)]">
                            Avatar and cover
                        </p>
                        <p className="mt-1 text-sm text-[var(--text-gray-color)]">
                            Upload profile media and personalize your presence.
                        </p>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-[var(--text-color)]">
                                Public profile visibility
                            </p>
                            <ToggleSwitch checked onChange={() => {}} />
                        </div>
                        <p className="mt-2 text-sm text-[var(--text-gray-color)]">
                            Allow workspace members to discover your profile
                            details.
                        </p>
                    </div>
                </div>
            </SettingsPanel>
        </div>
    );
}

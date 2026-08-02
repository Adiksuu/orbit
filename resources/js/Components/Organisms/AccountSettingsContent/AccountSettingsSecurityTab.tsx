import Button from '@/Components/Atoms/Button/Button';
import Icon from '@/Components/Atoms/Icon/Icon';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import { useState } from 'react';

export default function AccountSettingsSecurityTab() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState('8 hours');
    const [ipAllowlist, setIpAllowlist] = useState(false);

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Sign-in and verification"
                description="Protect access to your account and active sessions."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-3">
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <Icon name="ShieldCheck" size={15} />
                            <p className="text-sm font-medium text-white">
                                Two-factor authentication
                            </p>
                        </div>
                        <Button
                            type="button"
                            isBox
                            className="px-3 py-1.5"
                            onClick={() =>
                                setTwoFactorEnabled(!twoFactorEnabled)
                            }
                        >
                            {twoFactorEnabled ? 'Enabled' : 'Enable'}
                        </Button>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <Icon name="Clock3" size={15} />
                            <p className="text-sm font-medium text-white">
                                Session timeout
                            </p>
                        </div>
                        <button
                            type="button"
                            className="rounded-full border border-[var(--bg-light-color)] px-3 py-1.5 text-xs font-medium text-zinc-300"
                            onClick={() =>
                                setSessionTimeout(
                                    sessionTimeout === '8 hours'
                                        ? '12 hours'
                                        : '8 hours',
                                )
                            }
                        >
                            {sessionTimeout}
                        </button>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <p className="text-sm font-medium text-white">
                                IP allowlist mode
                            </p>
                            <ToggleSwitch
                                checked={ipAllowlist}
                                onChange={setIpAllowlist}
                            />
                        </div>
                    </div>
                </div>
            </SettingsPanel>
            <SettingsPanel
                title="Active sessions"
                description="Review and revoke active signed-in devices."
            >
                <div className="space-y-2 px-5 py-4">
                    {[
                        { device: 'MacBook Pro', active: 'Current session' },
                        { device: 'iPhone', active: 'Last active 2 hours ago' },
                    ].map((session) => (
                        <div
                            key={session.device}
                            className="flex items-center justify-between rounded-lg border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-2"
                        >
                            <p className="text-sm text-white">
                                {session.device}
                            </p>
                            {session.active === 'Current session' ? (
                                <span className="text-xs font-medium text-emerald-400">
                                    Current
                                </span>
                            ) : (
                                <Button
                                    type="button"
                                    isBox
                                    className="px-3 py-1.5"
                                >
                                    Revoke
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </SettingsPanel>
        </div>
    );
}

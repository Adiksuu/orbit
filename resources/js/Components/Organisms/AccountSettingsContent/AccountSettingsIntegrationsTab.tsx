import Button from '@/Components/Atoms/Button/Button';
import Icon from '@/Components/Atoms/Icon/Icon';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';

const integrations = [
    {
        id: 'github',
        name: 'GitHub',
        icon: 'GitBranch' as const,
        status: 'Connected',
        accent: 'text-emerald-400',
        features: ['PR links', 'Commit mentions', 'Auto-closing'],
        action: 'Manage',
    },
    {
        id: 'slack',
        name: 'Slack',
        icon: 'MessageSquare' as const,
        status: 'Not connected',
        accent: 'text-zinc-400',
        features: ['Channel digests', 'Mentions', 'Workflow notifications'],
        action: 'Connect',
    },
    {
        id: 'calendar',
        name: 'Calendar',
        icon: 'CalendarDays' as const,
        status: 'Connected',
        accent: 'text-emerald-400',
        features: ['Due dates', 'Milestones', 'Time blocks'],
        action: 'Manage',
    },
];

export default function AccountSettingsIntegrationsTab() {
    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Connected services"
                description="Manage personal integrations for notifications and sync."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-3">
                    {integrations.map((integration) => (
                        <div
                            key={integration.id}
                            className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-md bg-[var(--bg-light-color)] p-1.5">
                                        <Icon
                                            name={integration.icon}
                                            size={14}
                                        />
                                    </span>
                                    <p className="text-sm font-medium text-white">
                                        {integration.name}
                                    </p>
                                </div>
                                <span
                                    className={`text-[11px] font-semibold ${integration.accent}`}
                                >
                                    {integration.status}
                                </span>
                            </div>
                            <div className="mb-4 flex flex-wrap gap-1.5">
                                {integration.features.map((feature) => (
                                    <span
                                        key={feature}
                                        className="rounded-full bg-[var(--bg-light-color)] px-2 py-1 text-[10px] text-zinc-300"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                            <Button
                                type="button"
                                isBox
                                className="w-full py-1.5"
                            >
                                {integration.action}
                            </Button>
                        </div>
                    ))}
                </div>
            </SettingsPanel>
            <SettingsPanel
                title="API access"
                description="Token and endpoint access for external tooling."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-white">
                            Personal access tokens
                        </p>
                        <div className="mt-3 rounded-lg bg-zinc-950/60 px-2 py-1.5 font-mono text-xs text-zinc-300">
                            orbit_live_xxxxxxxxxxxxxxxx
                        </div>
                        <Button
                            type="button"
                            isBox
                            className="mt-3 w-full py-1.5"
                        >
                            Manage
                        </Button>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-white">
                            Webhook deliveries
                        </p>
                        <div className="mt-3 h-1.5 rounded-full bg-zinc-700">
                            <div className="h-1.5 w-[88%] rounded-full bg-emerald-500" />
                        </div>
                        <Button
                            type="button"
                            isBox
                            className="mt-3 w-full py-1.5"
                        >
                            View logs
                        </Button>
                    </div>
                </div>
            </SettingsPanel>
        </div>
    );
}

import Button from '@/Components/Atoms/Button/Button';
import Icon from '@/Components/Atoms/Icon/Icon';
import Input from '@/Components/Atoms/Input/Input';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { AccountSettingsTabId } from '@/types/Settings';
import { useState } from 'react';

interface AccountSettingsContentProps {
    tabId: AccountSettingsTabId;
}

const selectablePillClass =
    'rounded-full border border-[var(--bg-light-color)] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-500';

const integrationCardClass =
    'rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4';

const homeViewOptions = [
    {
        value: 'Dashboard',
        title: 'Dashboard',
        icon: 'LayoutDashboard' as const,
        preview: ['Stats', 'Charts', 'Summary'],
    },
    {
        value: 'My issues',
        title: 'My issues',
        icon: 'ListTodo' as const,
        preview: ['Inbox', 'Assigned', 'Due soon'],
    },
    {
        value: 'Projects',
        title: 'Projects',
        icon: 'FolderGit2' as const,
        preview: ['Roadmap', 'Boards', 'Teams'],
    },
];

const integrations = [
    {
        id: 'github',
        name: 'GitHub',
        icon: 'GitBranch' as const,
        description: 'Link pull requests, branches, and issue references.',
        status: 'Connected',
        accent: 'text-emerald-400',
        features: ['PR links', 'Commit mentions', 'Auto-closing'],
        action: 'Manage',
    },
    {
        id: 'slack',
        name: 'Slack',
        icon: 'MessageSquare' as const,
        description: 'Route issue updates and mention alerts to channels.',
        status: 'Not connected',
        accent: 'text-zinc-400',
        features: ['Channel digests', 'Mentions', 'Workflow notifications'],
        action: 'Connect',
    },
    {
        id: 'calendar',
        name: 'Calendar',
        icon: 'CalendarDays' as const,
        description: 'Sync due dates and planning windows with your calendar.',
        status: 'Connected',
        accent: 'text-emerald-400',
        features: ['Due dates', 'Milestones', 'Time blocks'],
        action: 'Manage',
    },
];

export default function AccountSettingsContent({
    tabId,
}: AccountSettingsContentProps) {
    const [preferences, setPreferences] = useState({
        homeView: 'My issues',
        displayNames: 'Full name',
        firstDay: 'Monday',
        commentsSubmit: 'Enter',
        convertEmoticons: true,
        compactNumbers: false,
    });
    const [profile, setProfile] = useState({
        fullName: 'John Doe',
        email: 'john@acme.com',
        title: 'Product Engineer',
        timezone: 'Europe/Warsaw',
        pronouns: 'he/him',
    });
    const [notifications, setNotifications] = useState({
        assignedIssues: true,
        mentions: true,
        projectDigest: false,
        desktop: true,
        digestFrequency: 'Daily',
    });
    const [security, setSecurity] = useState({
        twoFactorEnabled: false,
        sessionTimeout: '8 hours',
        ipAllowlist: false,
    });

    if (tabId === 'preferences') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Default home view"
                    description="Choose the first view shown when opening Orbit."
                >
                    <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-3">
                        {homeViewOptions.map((option) => {
                            const isActive =
                                preferences.homeView === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() =>
                                        setPreferences((prev) => ({
                                            ...prev,
                                            homeView: option.value,
                                        }))
                                    }
                                    className={`rounded-xl border p-3 text-left transition-colors ${
                                        isActive
                                            ? 'border-[var(--accent-color)] bg-[var(--accent-color-opacity)]'
                                            : 'border-[var(--bg-light-color)] bg-[var(--bg-color)] hover:border-zinc-500'
                                    }`}
                                >
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="rounded-md bg-[var(--bg-light-color)] p-1.5">
                                            <Icon
                                                name={option.icon}
                                                size={14}
                                            />
                                        </span>
                                        <p className="text-sm font-medium text-white">
                                            {option.title}
                                        </p>
                                    </div>
                                    <div className="space-y-1.5">
                                        {option.preview.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center justify-between rounded-md bg-[var(--bg-light-color)] px-2 py-1 text-[11px] text-zinc-400"
                                            >
                                                <span>{item}</span>
                                                <span className="h-1.5 w-8 rounded-full bg-zinc-600/60" />
                                            </div>
                                        ))}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </SettingsPanel>

                <SettingsPanel
                    title="Interface and behavior"
                    description="Choose how personal information and writing behavior should appear."
                >
                    <div className="space-y-4 px-5 py-4">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Display names
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Full name', 'First name', 'Handle'].map(
                                    (option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() =>
                                                setPreferences((prev) => ({
                                                    ...prev,
                                                    displayNames: option,
                                                }))
                                            }
                                            className={`${selectablePillClass} ${
                                                preferences.displayNames ===
                                                option
                                                    ? 'border-[var(--accent-color)] text-white'
                                                    : ''
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <SettingsPanelRow
                                title="First day of week"
                                description="Used in date pickers and planning views."
                                action={
                                    <button
                                        type="button"
                                        className={selectablePillClass}
                                        onClick={() =>
                                            setPreferences((prev) => ({
                                                ...prev,
                                                firstDay:
                                                    prev.firstDay === 'Monday'
                                                        ? 'Sunday'
                                                        : 'Monday',
                                            }))
                                        }
                                    >
                                        {preferences.firstDay}
                                    </button>
                                }
                            />
                            <SettingsPanelRow
                                title="Send comments with"
                                description="Set your default submit key."
                                action={
                                    <button
                                        type="button"
                                        className={selectablePillClass}
                                        onClick={() =>
                                            setPreferences((prev) => ({
                                                ...prev,
                                                commentsSubmit:
                                                    prev.commentsSubmit ===
                                                    'Enter'
                                                        ? 'Ctrl+Enter'
                                                        : 'Enter',
                                            }))
                                        }
                                    >
                                        {preferences.commentsSubmit}
                                    </button>
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-3 rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-3 md:grid-cols-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-zinc-300">
                                    Convert text emoticons
                                </p>
                                <ToggleSwitch
                                    checked={preferences.convertEmoticons}
                                    onChange={(checked) =>
                                        setPreferences((prev) => ({
                                            ...prev,
                                            convertEmoticons: checked,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-zinc-300">
                                    Compact number formatting
                                </p>
                                <ToggleSwitch
                                    checked={preferences.compactNumbers}
                                    onChange={(checked) =>
                                        setPreferences((prev) => ({
                                            ...prev,
                                            compactNumbers: checked,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </SettingsPanel>
            </div>
        );
    }

    if (tabId === 'profile') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Profile details"
                    description="Information shown to teammates in Orbit."
                >
                    <div className="grid grid-cols-1 gap-5 px-5 py-4 lg:grid-cols-[1.4fr_1fr]">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Full name
                                </p>
                                <Input
                                    value={profile.fullName}
                                    onChange={(e) =>
                                        setProfile((prev) => ({
                                            ...prev,
                                            fullName: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Work email
                                </p>
                                <Input
                                    value={profile.email}
                                    onChange={(e) =>
                                        setProfile((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Job title
                                </p>
                                <Input
                                    value={profile.title}
                                    onChange={(e) =>
                                        setProfile((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Timezone
                                </p>
                                <Input
                                    value={profile.timezone}
                                    onChange={(e) =>
                                        setProfile((prev) => ({
                                            ...prev,
                                            timezone: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Pronouns
                                </p>
                                <Input
                                    value={profile.pronouns}
                                    onChange={(e) =>
                                        setProfile((prev) => ({
                                            ...prev,
                                            pronouns: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Profile preview
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-color-opacity)] text-sm font-semibold text-white">
                                    JD
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        {profile.fullName}
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        {profile.title}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2 text-xs text-zinc-400">
                                <p>{profile.email}</p>
                                <p>{profile.timezone}</p>
                                <p>{profile.pronouns}</p>
                            </div>
                        </div>
                    </div>
                </SettingsPanel>
                <SettingsPanel
                    title="Profile actions"
                    description="Access profile-level appearance and visibility controls."
                >
                    <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                        <button
                            type="button"
                            className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4 text-left transition-colors hover:border-zinc-500"
                        >
                            <p className="text-sm font-medium text-white">
                                Avatar and cover
                            </p>
                            <p className="mt-1 text-sm text-zinc-400">
                                Upload profile media and personalize your
                                presence.
                            </p>
                            <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-[var(--accent-color)]">
                                Update
                            </span>
                        </button>
                        <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white">
                                    Public profile visibility
                                </p>
                                <ToggleSwitch checked onChange={() => {}} />
                            </div>
                            <p className="mt-2 text-sm text-zinc-400">
                                Allow workspace members to discover your profile
                                details and activity context.
                            </p>
                        </div>
                    </div>
                </SettingsPanel>
            </div>
        );
    }

    if (tabId === 'notifications') {
        return (
            <div className="space-y-5">
                <SettingsPanel
                    title="Activity notifications"
                    description="Choose which events should notify you."
                >
                    <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-3">
                        {[
                            {
                                title: 'Assigned issues',
                                subtitle: 'Direct ownership',
                                enabled: notifications.assignedIssues,
                                key: 'assignedIssues',
                            },
                            {
                                title: 'Mentions and replies',
                                subtitle: 'Conversation activity',
                                enabled: notifications.mentions,
                                key: 'mentions',
                            },
                            {
                                title: 'Project digest',
                                subtitle: 'Workspace summaries',
                                enabled: notifications.projectDigest,
                                key: 'projectDigest',
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-sm font-medium text-white">
                                        {item.title}
                                    </p>
                                    <ToggleSwitch
                                        checked={item.enabled}
                                        onChange={(checked) =>
                                            setNotifications((prev) => ({
                                                ...prev,
                                                [item.key]: checked,
                                            }))
                                        }
                                    />
                                </div>
                                <p className="text-xs text-zinc-400">
                                    {item.subtitle}
                                </p>
                            </div>
                        ))}
                    </div>
                </SettingsPanel>
                <SettingsPanel
                    title="Delivery preferences"
                    description="Control how and when notifications are sent."
                >
                    <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                        <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white">
                                    Desktop notifications
                                </p>
                                <ToggleSwitch
                                    checked={notifications.desktop}
                                    onChange={(checked) =>
                                        setNotifications((prev) => ({
                                            ...prev,
                                            desktop: checked,
                                        }))
                                    }
                                />
                            </div>
                            <p className="mt-2 text-xs text-zinc-400">
                                Show browser alerts while Orbit is open.
                            </p>
                        </div>
                        <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                            <p className="text-sm font-medium text-white">
                                Digest frequency
                            </p>
                            <p className="mt-2 text-xs text-zinc-400">
                                Set cadence for bundled notification updates.
                            </p>
                            <div className="mt-3 flex gap-2">
                                {['Daily', 'Weekly'].map((frequency) => (
                                    <button
                                        key={frequency}
                                        type="button"
                                        onClick={() =>
                                            setNotifications((prev) => ({
                                                ...prev,
                                                digestFrequency: frequency,
                                            }))
                                        }
                                        className={`${selectablePillClass} ${
                                            notifications.digestFrequency ===
                                            frequency
                                                ? 'border-[var(--accent-color)] text-white'
                                                : ''
                                        }`}
                                    >
                                        {frequency}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </SettingsPanel>
            </div>
        );
    }

    if (tabId === 'security-access') {
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
                            <p className="mb-3 text-xs text-zinc-400">
                                Add an additional verification step for sign in.
                            </p>
                            <Button
                                type="button"
                                isBox
                                className="px-3 py-1.5"
                                onClick={() =>
                                    setSecurity((prev) => ({
                                        ...prev,
                                        twoFactorEnabled:
                                            !prev.twoFactorEnabled,
                                    }))
                                }
                            >
                                {security.twoFactorEnabled
                                    ? 'Enabled'
                                    : 'Enable'}
                            </Button>
                        </div>
                        <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <Icon name="Clock3" size={15} />
                                <p className="text-sm font-medium text-white">
                                    Session timeout
                                </p>
                            </div>
                            <p className="mb-3 text-xs text-zinc-400">
                                Automatically sign out after inactivity.
                            </p>
                            <button
                                type="button"
                                className={selectablePillClass}
                                onClick={() =>
                                    setSecurity((prev) => ({
                                        ...prev,
                                        sessionTimeout:
                                            prev.sessionTimeout === '8 hours'
                                                ? '12 hours'
                                                : '8 hours',
                                    }))
                                }
                            >
                                {security.sessionTimeout}
                            </button>
                        </div>
                        <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-sm font-medium text-white">
                                    IP allowlist mode
                                </p>
                                <ToggleSwitch
                                    checked={security.ipAllowlist}
                                    onChange={(checked) =>
                                        setSecurity((prev) => ({
                                            ...prev,
                                            ipAllowlist: checked,
                                        }))
                                    }
                                />
                            </div>
                            <p className="text-xs text-zinc-400">
                                Restrict account access to approved network
                                ranges.
                            </p>
                        </div>
                    </div>
                </SettingsPanel>
                <SettingsPanel
                    title="Active sessions"
                    description="Review and revoke active signed-in devices."
                >
                    <div className="space-y-2 px-5 py-4">
                        {[
                            {
                                device: 'MacBook Pro',
                                browser: 'Chrome',
                                location: 'Warsaw',
                                active: 'Current session',
                            },
                            {
                                device: 'iPhone',
                                browser: 'Safari',
                                location: 'Warsaw',
                                active: 'Last active 2 hours ago',
                            },
                        ].map((session) => (
                            <div
                                key={session.device}
                                className="flex items-center justify-between rounded-lg border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-2"
                            >
                                <div>
                                    <p className="text-sm text-white">
                                        {session.device} • {session.browser} •{' '}
                                        {session.location}
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        {session.active}
                                    </p>
                                </div>
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

    if (tabId === 'integrations') {
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
                                className={integrationCardClass}
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
                                <p className="mb-3 text-xs text-zinc-400">
                                    {integration.description}
                                </p>
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
                        <div className={integrationCardClass}>
                            <p className="text-sm font-medium text-white">
                                Personal access tokens
                            </p>
                            <p className="mt-1 text-xs text-zinc-400">
                                Create scoped tokens for scripts and automation.
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
                        <div className={integrationCardClass}>
                            <p className="text-sm font-medium text-white">
                                Webhook deliveries
                            </p>
                            <p className="mt-1 text-xs text-zinc-400">
                                Monitor endpoint health and recent delivery
                                results.
                            </p>
                            <div className="mt-3 space-y-1.5 text-xs">
                                <div className="flex items-center justify-between text-zinc-300">
                                    <span>Success rate</span>
                                    <span>98.7%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-zinc-700">
                                    <div className="h-1.5 w-[88%] rounded-full bg-emerald-500" />
                                </div>
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

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Export data"
                description="Generate portable snapshots of your account data."
            >
                <div className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-white">
                            Full account export
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">
                            Includes profile information, personal preferences,
                            and activity.
                        </p>
                        <div className="mt-3 text-xs text-zinc-500">
                            Estimated size: 12 MB
                        </div>
                        <Button
                            type="button"
                            isBox
                            className="mt-3 w-full py-1.5"
                        >
                            Request export
                        </Button>
                    </div>
                    <div className="rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] p-4">
                        <p className="text-sm font-medium text-white">
                            Activity log export
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">
                            Download a machine-readable archive of activity
                            events.
                        </p>
                        <div className="mt-3 text-xs text-zinc-500">
                            Format: CSV, JSON
                        </div>
                        <Button
                            type="button"
                            isBox
                            className="mt-3 w-full py-1.5"
                        >
                            Download CSV
                        </Button>
                    </div>
                </div>
            </SettingsPanel>
            <SettingsPanel
                title="Privacy"
                description="Control retention and removal of personal account data."
            >
                <SettingsPanelRow
                    title="Delete account"
                    description="Permanently remove your Orbit account and associated content."
                    action={
                        <Button
                            type="button"
                            isBox
                            className="bg-red-500/10 px-3 py-1.5 text-red-300 hover:bg-red-500/20"
                        >
                            Delete account
                        </Button>
                    }
                />
            </SettingsPanel>
        </div>
    );
}

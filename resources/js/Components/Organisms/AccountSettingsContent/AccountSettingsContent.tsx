import Button from '@/Components/Atoms/Button/Button';
import Input from '@/Components/Atoms/Input/Input';
import ToggleSwitch from '@/Components/Atoms/ToggleSwitch/ToggleSwitch';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import { AccountSettingsTabId } from '@/types/Settings';
import { useState } from 'react';

interface AccountSettingsContentProps {
    tabId: AccountSettingsTabId;
}

const selectActionClass =
    'rounded-md border border-[var(--bg-light-color)] bg-[var(--bg-color)] px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:border-zinc-500';

export default function AccountSettingsContent({
    tabId,
}: AccountSettingsContentProps) {
    const [preferences, setPreferences] = useState({
        homeView: 'My issues',
        displayNames: 'Full name',
        firstDay: 'Monday',
        commentsSubmit: 'Enter',
        convertEmoticons: true,
    });
    const [profile, setProfile] = useState({
        fullName: 'John Doe',
        email: 'john@acme.com',
        title: 'Product Engineer',
        timezone: 'Europe/Warsaw',
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
                    title="General"
                    description="Personal defaults that shape your day-to-day workflow."
                >
                    <SettingsPanelRow
                        title="Default home view"
                        description="Choose the first view shown when opening Orbit."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
                                onClick={() =>
                                    setPreferences((prev) => ({
                                        ...prev,
                                        homeView:
                                            prev.homeView === 'My issues'
                                                ? 'Dashboard'
                                                : 'My issues',
                                    }))
                                }
                            >
                                {preferences.homeView}
                            </button>
                        }
                    />
                    <SettingsPanelRow
                        title="Display names"
                        description="Choose how names appear across comments and activity."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
                                onClick={() =>
                                    setPreferences((prev) => ({
                                        ...prev,
                                        displayNames:
                                            prev.displayNames === 'Full name'
                                                ? 'First name'
                                                : 'Full name',
                                    }))
                                }
                            >
                                {preferences.displayNames}
                            </button>
                        }
                    />
                    <SettingsPanelRow
                        title="First day of week"
                        description="Used in date pickers, planning boards, and reports."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
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
                </SettingsPanel>
                <SettingsPanel
                    title="Writing and input"
                    description="Control behavior while creating and discussing work."
                >
                    <SettingsPanelRow
                        title="Convert text emoticons"
                        description="Convert common emoticons into emoji while typing."
                        action={
                            <ToggleSwitch
                                checked={preferences.convertEmoticons}
                                onChange={(checked) =>
                                    setPreferences((prev) => ({
                                        ...prev,
                                        convertEmoticons: checked,
                                    }))
                                }
                            />
                        }
                    />
                    <SettingsPanelRow
                        title="Send comments with"
                        description="Set your default key behavior when submitting comments."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
                                onClick={() =>
                                    setPreferences((prev) => ({
                                        ...prev,
                                        commentsSubmit:
                                            prev.commentsSubmit === 'Enter'
                                                ? 'Ctrl+Enter'
                                                : 'Enter',
                                    }))
                                }
                            >
                                {preferences.commentsSubmit}
                            </button>
                        }
                    />
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
                    <div className="grid grid-cols-1 gap-4 px-5 py-4 md:grid-cols-2">
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
                    </div>
                </SettingsPanel>
                <SettingsPanel
                    title="Profile actions"
                    description="Access profile-level appearance and visibility controls."
                >
                    <SettingsPanelRow
                        title="Avatar and cover"
                        description="Upload a profile image and update personal branding."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Update
                            </Button>
                        }
                    />
                    <SettingsPanelRow
                        title="Public profile visibility"
                        description="Allow workspace members to discover your profile details."
                        action={<ToggleSwitch checked onChange={() => {}} />}
                    />
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
                    <SettingsPanelRow
                        title="Assigned issues"
                        description="Get notified when issues are assigned to you."
                        action={
                            <ToggleSwitch
                                checked={notifications.assignedIssues}
                                onChange={(checked) =>
                                    setNotifications((prev) => ({
                                        ...prev,
                                        assignedIssues: checked,
                                    }))
                                }
                            />
                        }
                    />
                    <SettingsPanelRow
                        title="Mentions and replies"
                        description="Receive updates when someone mentions you in comments."
                        action={
                            <ToggleSwitch
                                checked={notifications.mentions}
                                onChange={(checked) =>
                                    setNotifications((prev) => ({
                                        ...prev,
                                        mentions: checked,
                                    }))
                                }
                            />
                        }
                    />
                    <SettingsPanelRow
                        title="Project digest"
                        description="Summary of major project updates."
                        action={
                            <ToggleSwitch
                                checked={notifications.projectDigest}
                                onChange={(checked) =>
                                    setNotifications((prev) => ({
                                        ...prev,
                                        projectDigest: checked,
                                    }))
                                }
                            />
                        }
                    />
                </SettingsPanel>
                <SettingsPanel
                    title="Delivery preferences"
                    description="Control how and when notifications are sent."
                >
                    <SettingsPanelRow
                        title="Desktop notifications"
                        description="Show push notifications while Orbit is open."
                        action={
                            <ToggleSwitch
                                checked={notifications.desktop}
                                onChange={(checked) =>
                                    setNotifications((prev) => ({
                                        ...prev,
                                        desktop: checked,
                                    }))
                                }
                            />
                        }
                    />
                    <SettingsPanelRow
                        title="Digest frequency"
                        description="Set cadence for bundled notification updates."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
                                onClick={() =>
                                    setNotifications((prev) => ({
                                        ...prev,
                                        digestFrequency:
                                            prev.digestFrequency === 'Daily'
                                                ? 'Weekly'
                                                : 'Daily',
                                    }))
                                }
                            >
                                {notifications.digestFrequency}
                            </button>
                        }
                    />
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
                    <SettingsPanelRow
                        title="Two-factor authentication"
                        description="Add an additional verification step for sign in."
                        action={
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
                        }
                    />
                    <SettingsPanelRow
                        title="Session timeout"
                        description="Automatically sign out after inactivity."
                        action={
                            <button
                                type="button"
                                className={selectActionClass}
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
                        }
                    />
                    <SettingsPanelRow
                        title="IP allowlist mode"
                        description="Restrict account access to approved network ranges."
                        action={
                            <ToggleSwitch
                                checked={security.ipAllowlist}
                                onChange={(checked) =>
                                    setSecurity((prev) => ({
                                        ...prev,
                                        ipAllowlist: checked,
                                    }))
                                }
                            />
                        }
                    />
                </SettingsPanel>
                <SettingsPanel
                    title="Active sessions"
                    description="Review and revoke active signed-in devices."
                >
                    <SettingsPanelRow
                        title="MacBook Pro • Chrome • Warsaw"
                        description="Current session · Last active now"
                        action={
                            <span className="text-xs font-medium text-emerald-400">
                                Current
                            </span>
                        }
                    />
                    <SettingsPanelRow
                        title="iPhone • Safari • Warsaw"
                        description="Last active 2 hours ago"
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Revoke
                            </Button>
                        }
                    />
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
                    <SettingsPanelRow
                        title="GitHub"
                        description="Connect pull requests and development references."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Connected
                            </Button>
                        }
                    />
                    <SettingsPanelRow
                        title="Slack"
                        description="Send issue updates and mentions to Slack channels."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Connect
                            </Button>
                        }
                    />
                    <SettingsPanelRow
                        title="Google Calendar"
                        description="Sync due dates and personal planning blocks."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Connect
                            </Button>
                        }
                    />
                </SettingsPanel>
                <SettingsPanel
                    title="API access"
                    description="Token and endpoint access for external tooling."
                >
                    <SettingsPanelRow
                        title="Personal access tokens"
                        description="Create scoped tokens for scripts and automation."
                        action={
                            <Button type="button" isBox className="px-3 py-1.5">
                                Manage
                            </Button>
                        }
                    />
                    <SettingsPanelRow
                        title="Webhook deliveries"
                        description="Review endpoint health and retry failed deliveries."
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

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Export data"
                description="Generate portable snapshots of your account data."
            >
                <SettingsPanelRow
                    title="Full account export"
                    description="Includes profile information, personal preferences, and activity."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Request export
                        </Button>
                    }
                />
                <SettingsPanelRow
                    title="Activity log export"
                    description="Download a machine-readable archive of your activity events."
                    action={
                        <Button type="button" isBox className="px-3 py-1.5">
                            Download CSV
                        </Button>
                    }
                />
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

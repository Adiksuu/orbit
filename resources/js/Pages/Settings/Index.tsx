import Button from '@/Components/Atoms/Button/Button';
import Icon from '@/Components/Atoms/Icon/Icon';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import SettingsSidebarSection from '@/Components/Molecules/SettingsSidebarSection/SettingsSidebarSection';
import SettingsTabItem from '@/Components/Molecules/SettingsTabItem/SettingsTabItem';
import AccountSettingsContent from '@/Components/Organisms/AccountSettingsContent/AccountSettingsContent';
import WorkspaceSettingsContent from '@/Components/Organisms/WorkspaceSettingsContent/WorkspaceSettingsContent';
import { PageProps } from '@/types';
import {
    SETTINGS_DEFAULT_TAB,
    SETTINGS_TABS,
    isAccountSettingsTabId,
    isSettingsTabId,
    isWorkspaceSettingsTabId,
} from '@/types/Settings';
import { Link, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export default function SettingsIndex() {
    const { url } = usePage<PageProps>();

    const activeTab = useMemo(() => {
        const [, queryString = ''] = url.split('?');
        const params = new URLSearchParams(queryString);
        const tabParam = params.get('tab');

        if (tabParam && isSettingsTabId(tabParam)) {
            return tabParam;
        }

        return SETTINGS_DEFAULT_TAB;
    }, [url]);

    const activeTabConfig = useMemo(() => {
        return (
            SETTINGS_TABS.find((tab) => tab.id === activeTab) ??
            SETTINGS_TABS[0]
        );
    }, [activeTab]);

    const accountTabs = SETTINGS_TABS.filter(
        (tab) => tab.section === 'account',
    );
    const workspaceTabs = SETTINGS_TABS.filter(
        (tab) => tab.section === 'workspace',
    );

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-color)]">
            <aside className="flex h-full w-[300px] shrink-0 flex-col border-r border-[var(--bg-light-color)] bg-[var(--bg-dark-color)] px-4 py-5">
                <Link
                    href="/"
                    className="mb-5 inline-flex w-fit items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-[var(--bg-light-color)] hover:text-white"
                >
                    <Icon name="ChevronLeft" size={16} />
                    Back to app
                </Link>
                <div className="space-y-6 overflow-y-auto pr-1">
                    <SettingsSidebarSection title="Account">
                        {accountTabs.map((tab) => (
                            <SettingsTabItem
                                key={tab.id}
                                icon={tab.icon}
                                label={tab.label}
                                href={`/settings?tab=${tab.id}`}
                                isActive={tab.id === activeTab}
                            />
                        ))}
                    </SettingsSidebarSection>
                    <SettingsSidebarSection title="Workspace">
                        {workspaceTabs.map((tab) => (
                            <SettingsTabItem
                                key={tab.id}
                                icon={tab.icon}
                                label={tab.label}
                                href={`/settings?tab=${tab.id}`}
                                isActive={tab.id === activeTab}
                            />
                        ))}
                    </SettingsSidebarSection>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-8 py-10">
                    <header className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                            Settings
                        </p>
                        <h1 className="text-3xl font-semibold text-white">
                            {activeTabConfig.label}
                        </h1>
                        <p className="max-w-3xl text-sm text-zinc-400">
                            {activeTabConfig.description}
                        </p>
                    </header>

                    {isAccountSettingsTabId(activeTab) ? (
                        <AccountSettingsContent tabId={activeTab} />
                    ) : isWorkspaceSettingsTabId(activeTab) ? (
                        <WorkspaceSettingsContent tabId={activeTab} />
                    ) : (
                        <>
                            <SettingsPanel
                                title="General"
                                description="Foundational controls for this settings area."
                            >
                                <SettingsPanelRow
                                    title={`${activeTabConfig.label} configuration`}
                                    description="This section is prepared and ready for detailed controls."
                                    action={
                                        <Button type="button" isBox>
                                            Configure
                                        </Button>
                                    }
                                />
                                <SettingsPanelRow
                                    title="Navigation behavior"
                                    description="Each settings tab is deep-linkable through the URL for direct access."
                                    action={
                                        <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-color)]">
                                            Enabled
                                        </span>
                                    }
                                />
                            </SettingsPanel>

                            <SettingsPanel
                                title="Structure"
                                description="Layout and organization preview for this tab."
                            >
                                <SettingsPanelRow
                                    title="Section grouping"
                                    description="Controls are grouped in focused cards for clarity and faster scanning."
                                />
                                <SettingsPanelRow
                                    title="Orbit theme"
                                    description="All visuals use Orbit color tokens and dark interface styling."
                                />
                            </SettingsPanel>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

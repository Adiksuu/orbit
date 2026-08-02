import Button from '@/Components/Atoms/Button/Button';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import AccountSettingsContent from '@/Components/Organisms/AccountSettingsContent/AccountSettingsContent';
import SettingsNavigation from '@/Components/Organisms/SettingsNavigation/SettingsNavigation';
import WorkspaceSettingsContent from '@/Components/Organisms/WorkspaceSettingsContent/WorkspaceSettingsContent';
import { PageProps } from '@/types';
import {
    SETTINGS_DEFAULT_TAB,
    SETTINGS_TABS,
    isAccountSettingsTabId,
    isSettingsTabId,
    isWorkspaceSettingsTabId,
} from '@/types/Settings';
import { usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function SettingsIndex() {
    const { url } = usePage<PageProps>();
    const [isDesktopNavigationHidden, setIsDesktopNavigationHidden] =
        useState(false);

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
        <div className="min-h-screen bg-[var(--bg-color)]">
            <div className="flex w-full flex-col gap-6 px-0 py-4 sm:py-5">
                <div className="px-4 sm:px-6 lg:px-8">
                    <SettingsNavigation
                        activeTab={activeTab}
                        activeTabConfig={activeTabConfig}
                        accountTabs={accountTabs}
                        workspaceTabs={workspaceTabs}
                        isDesktopNavigationHidden={isDesktopNavigationHidden}
                        onDesktopNavigationToggle={() =>
                            setIsDesktopNavigationHidden((prev) => !prev)
                        }
                    />
                </div>

                <main className="w-full">
                    <div className="flex w-full flex-col gap-6 px-3 py-2 sm:px-4 lg:px-6">
                        <header className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                Settings
                            </p>
                            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
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
        </div>
    );
}

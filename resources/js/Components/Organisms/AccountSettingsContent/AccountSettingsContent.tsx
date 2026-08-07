import { AccountSettingsTabId } from '@/types/Settings';
import AccountSettingsExportTab from './AccountSettingsExportTab';
import AccountSettingsIntegrationsTab from './AccountSettingsIntegrationsTab';
import AccountSettingsNotificationsTab from './AccountSettingsNotificationsTab';
import AccountSettingsPreferencesTab from './AccountSettingsPreferencesTab';
import AccountSettingsProfileTab from './AccountSettingsProfileTab';
import AccountSettingsSecurityTab from './AccountSettingsSecurityTab';

interface AccountSettingsContentProps {
    tabId: AccountSettingsTabId;
    userName?: string;
}

export default function AccountSettingsContent({
    tabId,
    userName,
}: AccountSettingsContentProps) {
    if (tabId === 'preferences') {
        return <AccountSettingsPreferencesTab />;
    }

    if (tabId === 'profile') {
        return <AccountSettingsProfileTab userName={userName} />;
    }

    if (tabId === 'notifications') {
        return <AccountSettingsNotificationsTab />;
    }

    if (tabId === 'security-access') {
        return <AccountSettingsSecurityTab />;
    }

    if (tabId === 'integrations') {
        return <AccountSettingsIntegrationsTab />;
    }

    return <AccountSettingsExportTab />;
}

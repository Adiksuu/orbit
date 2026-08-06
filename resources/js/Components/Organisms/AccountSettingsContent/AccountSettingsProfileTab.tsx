import Input from '@/Components/Atoms/Input/Input';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import AccountSettingsAvatarUploader from '@/Components/Organisms/AccountSettingsContent/AccountSettingsAvatarUploader';
import AccountSettingsProfilePreview from '@/Components/Organisms/AccountSettingsContent/AccountSettingsProfilePreview';
import { useState } from 'react';

const getInitials = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
        return '?';
    }

    const [first, ...rest] = trimmed.split(/\s+/);
    const last = rest.length > 0 ? rest[rest.length - 1] : '';

    return (first.charAt(0) + last.charAt(0)).toUpperCase();
};

export default function AccountSettingsProfileTab() {
    const [name, setName] = useState('John Doe');
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

    const initials = getInitials(name);

    return (
        <div className="space-y-5">
            <SettingsPanel
                title="Profile"
                description="Manage your personal details and how you appear to teammates."
                icon="User"
            >
                <SettingsPanelRow
                    title="Username"
                    description="Teammates will see this name and can @mention you with it."
                    action={
                        <Input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Your name"
                            className="w-56"
                        />
                    }
                />
                <SettingsPanelRow
                    title="Profile photo"
                    description="This photo will be visible to others across Orbit."
                    action={
                        <AccountSettingsAvatarUploader
                            avatarSrc={avatarSrc}
                            initials={initials}
                            onUpload={setAvatarSrc}
                            onReset={() => setAvatarSrc(null)}
                        />
                    }
                />
            </SettingsPanel>

            <SettingsPanel
                title="Live preview"
                description="Updates instantly as you edit your photo and name."
                icon="Eye"
            >
                <AccountSettingsProfilePreview
                    name={name}
                    avatarSrc={avatarSrc}
                    initials={initials}
                />
            </SettingsPanel>
        </div>
    );
}

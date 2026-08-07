import Input from '@/Components/Atoms/Input/Input';
import SettingsPanel from '@/Components/Molecules/SettingsPanel/SettingsPanel';
import SettingsPanelRow from '@/Components/Molecules/SettingsPanelRow/SettingsPanelRow';
import AccountSettingsAvatarUploader from '@/Components/Organisms/AccountSettingsContent/AccountSettingsAvatarUploader';
import AccountSettingsProfilePreview from '@/Components/Organisms/AccountSettingsContent/AccountSettingsProfilePreview';
import { useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

const getInitials = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
        return '?';
    }

    const [first, ...rest] = trimmed.split(/\s+/);
    const last = rest.length > 0 ? rest[rest.length - 1] : '';

    return (first.charAt(0) + last.charAt(0)).toUpperCase();
};

interface AccountSettingsProfileTabProps {
    userName?: string;
}

export default function AccountSettingsProfileTab({
    userName = 'John Doe',
}: AccountSettingsProfileTabProps) {
    const { data, setData, post } = useForm({
        name: userName,
    });
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

    const initials = getInitials(data.name);

    const handleSubmitUsername = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('account.rename'), { preserveScroll: true });
    };

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
                        <form onSubmit={handleSubmitUsername}>
                            <Input
                                name="name"
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                                placeholder="Your name"
                                className="w-56"
                            />
                        </form>
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
                    name={data.name}
                    avatarSrc={avatarSrc}
                    initials={initials}
                />
            </SettingsPanel>
        </div>
    );
}

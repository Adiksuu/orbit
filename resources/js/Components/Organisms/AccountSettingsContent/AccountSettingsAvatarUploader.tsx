import Avatar from '@/Components/Atoms/Avatar/Avatar';
import { ChangeEvent, useRef } from 'react';

interface AccountSettingsAvatarUploaderProps {
    avatarSrc: string | null;
    initials: string;
    onUpload: (dataUrl: string) => void;
    onReset: () => void;
}

export default function AccountSettingsAvatarUploader({
    avatarSrc,
    initials,
    onUpload,
    onReset,
}: AccountSettingsAvatarUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const openFilePicker = () => inputRef.current?.click();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                onUpload(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex items-center gap-3">
            <Avatar
                src={avatarSrc ?? undefined}
                alt="Avatar preview"
                initials={initials}
                size="xl"
            />

            <div className="flex flex-col items-start gap-1.5">
                <button
                    type="button"
                    onClick={openFilePicker}
                    className="rounded-md border border-[var(--border-color-strong)] px-3 py-1.5 text-xs font-medium text-[var(--text-color)] transition-colors hover:bg-[var(--bg-light-color)]"
                >
                    Upload new photo
                </button>
                <button
                    type="button"
                    onClick={onReset}
                    disabled={!avatarSrc}
                    className="px-1 text-xs font-medium text-[var(--error-color)] transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:no-underline"
                >
                    Reset to default
                </button>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import AccountSettingsAvatarUploader from './AccountSettingsAvatarUploader';

const getFileInput = () =>
    document.querySelector('input[type="file"]') as HTMLInputElement;

describe('AccountSettingsAvatarUploader', () => {
    test('shows initials and disables the reset control when there is no photo', () => {
        render(
            <AccountSettingsAvatarUploader
                avatarSrc={null}
                initials="JD"
                onUpload={() => {}}
                onReset={() => {}}
            />,
        );

        expect(screen.getByText('JD')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Reset to default' }),
        ).toBeDisabled();
    });

    test('shows the photo and a reset control when a photo is set', async () => {
        const onReset = vi.fn();
        render(
            <AccountSettingsAvatarUploader
                avatarSrc="data:image/png;base64,abc"
                initials="JD"
                onUpload={() => {}}
                onReset={onReset}
            />,
        );

        expect(screen.getByAltText('Avatar preview')).toHaveAttribute(
            'src',
            'data:image/png;base64,abc',
        );

        await userEvent.click(
            screen.getByRole('button', { name: 'Reset to default' }),
        );
        expect(onReset).toHaveBeenCalledTimes(1);
    });

    test('clicking "Upload new photo" opens the hidden file picker', async () => {
        render(
            <AccountSettingsAvatarUploader
                avatarSrc={null}
                initials="JD"
                onUpload={() => {}}
                onReset={() => {}}
            />,
        );

        const clickSpy = vi.spyOn(getFileInput(), 'click');

        await userEvent.click(
            screen.getByRole('button', { name: 'Upload new photo' }),
        );

        expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    test('selecting a file calls onUpload with its data URL', async () => {
        const onUpload = vi.fn();
        render(
            <AccountSettingsAvatarUploader
                avatarSrc={null}
                initials="JD"
                onUpload={onUpload}
                onReset={() => {}}
            />,
        );

        const file = new File(['hello'], 'avatar.png', { type: 'image/png' });

        await userEvent.upload(getFileInput(), file);

        await waitFor(() => expect(onUpload).toHaveBeenCalledTimes(1));
        expect(onUpload.mock.calls[0][0]).toMatch(/^data:image\/png;base64,/);
    });
});

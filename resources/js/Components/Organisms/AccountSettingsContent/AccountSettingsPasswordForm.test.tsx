import { AlertProvider } from '@/context/AlertContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import AccountSettingsPasswordForm from './AccountSettingsPasswordForm';

vi.mock('@inertiajs/react', async () => {
    const actual =
        await vi.importActual<typeof import('@inertiajs/react')>(
            '@inertiajs/react',
        );
    return {
        ...actual,
        usePage: () => ({ props: { flash: {} } }),
    };
});

const renderForm = () =>
    render(
        <AlertProvider>
            <AccountSettingsPasswordForm />
        </AlertProvider>,
    );

describe('AccountSettingsPasswordForm', () => {
    test('shows a validation error when passwords do not match', async () => {
        renderForm();
        const user = userEvent.setup();

        await user.type(
            screen.getByLabelText(/Current password/),
            'oldpassword',
        );
        await user.type(screen.getByLabelText(/New password/), 'newpassword1');
        await user.type(
            screen.getByLabelText(/Confirm new password/),
            'somethingelse',
        );
        await user.click(
            screen.getByRole('button', { name: 'Update password' }),
        );

        expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    });

    test('rejects a new password shorter than 8 characters', async () => {
        renderForm();
        const user = userEvent.setup();

        await user.type(
            screen.getByLabelText(/Current password/),
            'oldpassword',
        );
        await user.type(screen.getByLabelText(/New password/), 'short');
        await user.type(screen.getByLabelText(/Confirm new password/), 'short');
        await user.click(
            screen.getByRole('button', { name: 'Update password' }),
        );

        expect(
            screen.getByText('Use at least 8 characters.'),
        ).toBeInTheDocument();
    });

    test('submits successfully and clears the form when everything is valid', async () => {
        renderForm();
        const user = userEvent.setup();

        await user.type(
            screen.getByLabelText(/Current password/),
            'oldpassword',
        );
        await user.type(screen.getByLabelText(/New password/), 'newpassword1');
        await user.type(
            screen.getByLabelText(/Confirm new password/),
            'newpassword1',
        );
        await user.click(
            screen.getByRole('button', { name: 'Update password' }),
        );

        expect(
            screen.getByText('Your password has been updated.'),
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/Current password/)).toHaveValue('');
        expect(screen.getByLabelText(/New password/)).toHaveValue('');
    });

    test('locks the form after 5 failed attempts', async () => {
        renderForm();
        const user = userEvent.setup();

        const submit = screen.getByRole('button', {
            name: 'Update password',
        });

        for (let i = 0; i < 5; i += 1) {
            await user.click(submit);
        }

        expect(
            screen.getByText(/Too many attempts\. Try again in \d+s\./),
        ).toBeInTheDocument();
        expect(submit).toBeDisabled();
    });
});

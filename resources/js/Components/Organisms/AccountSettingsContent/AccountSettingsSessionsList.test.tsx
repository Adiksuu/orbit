import { AlertProvider } from '@/context/AlertContext';
import { Session } from '@/types/Users';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import AccountSettingsSessionsList from './AccountSettingsSessionsList';

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

const mockSessions: Session[] = [
    {
        id: 'session-1',
        ipAddress: '192.168.1.1',
        userAgent: 'Chrome on macOS',
        lastActiveAt: new Date().toISOString(),
        isCurrent: true,
    },
    {
        id: 'session-2',
        ipAddress: '192.168.1.2',
        userAgent: 'Safari on iOS',
        lastActiveAt: new Date().toISOString(),
        isCurrent: false,
    },
    {
        id: 'session-3',
        ipAddress: '192.168.1.3',
        userAgent: 'Edge on Windows',
        lastActiveAt: new Date().toISOString(),
        isCurrent: false,
    },
];

const renderList = (sessions: Session[] = mockSessions) =>
    render(
        <AlertProvider>
            <AccountSettingsSessionsList sessions={sessions} />
        </AlertProvider>,
    );

describe('AccountSettingsSessionsList', () => {
    test('marks the current device and offers revoke on the others', () => {
        renderList();

        expect(screen.getByText('This device')).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: 'Revoke' }).length).toBe(
            2,
        );
    });

    test('revoking a session removes it from the list', async () => {
        renderList();
        const user = userEvent.setup();

        expect(screen.getByText('192.168.1.2')).toBeInTheDocument();

        await user.click(screen.getAllByRole('button', { name: 'Revoke' })[0]);

        expect(screen.queryByText('192.168.1.2')).not.toBeInTheDocument();
        expect(
            screen.getByText('Signed out of "192.168.1.2".'),
        ).toBeInTheDocument();
    });

    test('"Sign out of all other sessions" clears every non-current session', async () => {
        renderList();
        const user = userEvent.setup();

        await user.click(
            screen.getByRole('button', {
                name: 'Sign out of all other sessions',
            }),
        );

        expect(screen.queryAllByRole('button', { name: 'Revoke' }).length).toBe(
            0,
        );
        expect(screen.getByText('This device')).toBeInTheDocument();
        expect(
            screen.queryByRole('button', {
                name: 'Sign out of all other sessions',
            }),
        ).not.toBeInTheDocument();
    });
});

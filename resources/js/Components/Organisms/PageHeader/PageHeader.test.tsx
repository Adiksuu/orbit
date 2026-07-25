import { formattedDate } from '@/utils/time';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import PageHeader from './PageHeader';

vi.mock('@/Components/Organisms/NotificationsPopup/NotificationsPopup', () => ({
    default: () => <div data-testid="notifications-popup" />,
}));

describe('PageHeader Component', () => {
    test('renders the provided title', () => {
        render(<PageHeader title="Dashboard" />);

        expect(
            screen.getByRole('heading', { name: 'Dashboard' }),
        ).toBeInTheDocument();
    });

    test('renders the current formatted date', () => {
        render(<PageHeader title="Dashboard" />);

        expect(screen.getByText(formattedDate())).toBeInTheDocument();
    });

    test('renders bell and settings icon buttons', () => {
        const { container } = render(<PageHeader title="Dashboard" />);

        expect(container.querySelector('.lucide-bell')).toBeInTheDocument();
        expect(container.querySelector('.lucide-settings')).toBeInTheDocument();
    });

    test('renders children alongside the header actions', () => {
        render(
            <PageHeader title="Dashboard">
                <button>New Issue</button>
            </PageHeader>,
        );

        expect(
            screen.getByRole('button', { name: 'New Issue' }),
        ).toBeInTheDocument();
    });

    test('does not show the notifications popup by default', () => {
        render(<PageHeader title="Dashboard" />);

        expect(
            screen.queryByTestId('notifications-popup'),
        ).not.toBeInTheDocument();
    });

    test('toggles the notifications popup when the bell button is clicked', async () => {
        const user = userEvent.setup();
        const { container } = render(<PageHeader title="Dashboard" />);

        const bellButton = container
            .querySelector('.lucide-bell')
            ?.closest('button') as HTMLElement;

        await user.click(bellButton);
        expect(screen.getByTestId('notifications-popup')).toBeInTheDocument();

        await user.click(bellButton);
        expect(
            screen.queryByTestId('notifications-popup'),
        ).not.toBeInTheDocument();
    });
});

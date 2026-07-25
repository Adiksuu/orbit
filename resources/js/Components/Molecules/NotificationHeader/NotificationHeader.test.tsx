import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import NotificationHeader from './NotificationHeader';

describe('NotificationHeader Component', () => {
    test('renders the title without an unread badge or mark-all button when unreadCount is 0', () => {
        render(
            <NotificationHeader
                unreadCount={0}
                onlyUnread={false}
                onToggleOnlyUnread={() => {}}
                onMarkAllAsRead={() => {}}
            />,
        );

        expect(screen.getByText('Notifications')).toBeInTheDocument();
        expect(screen.queryByText('0')).not.toBeInTheDocument();
        expect(screen.queryByText('Mark all as read')).not.toBeInTheDocument();
    });

    test('shows the unread count badge and mark-all button when there are unread notifications', () => {
        render(
            <NotificationHeader
                unreadCount={5}
                onlyUnread={false}
                onToggleOnlyUnread={() => {}}
                onMarkAllAsRead={() => {}}
            />,
        );

        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Mark all as read')).toBeInTheDocument();
    });

    test('calls onMarkAllAsRead when the mark all as read button is clicked', async () => {
        const user = userEvent.setup();
        const onMarkAllAsRead = vi.fn();
        render(
            <NotificationHeader
                unreadCount={3}
                onlyUnread={false}
                onToggleOnlyUnread={() => {}}
                onMarkAllAsRead={onMarkAllAsRead}
            />,
        );

        await user.click(screen.getByText('Mark all as read'));

        expect(onMarkAllAsRead).toHaveBeenCalledTimes(1);
    });

    test('calls onToggleOnlyUnread with the inverted value when the toggle is clicked', async () => {
        const user = userEvent.setup();
        const onToggleOnlyUnread = vi.fn();
        render(
            <NotificationHeader
                unreadCount={0}
                onlyUnread={false}
                onToggleOnlyUnread={onToggleOnlyUnread}
                onMarkAllAsRead={() => {}}
            />,
        );

        await user.click(screen.getByRole('button'));

        expect(onToggleOnlyUnread).toHaveBeenCalledWith(true);
    });

    test('reflects the onlyUnread state on the toggle switch', () => {
        const { rerender, container } = render(
            <NotificationHeader
                unreadCount={0}
                onlyUnread={false}
                onToggleOnlyUnread={() => {}}
                onMarkAllAsRead={() => {}}
            />,
        );

        const toggle = container.querySelector('button') as HTMLElement;
        expect(toggle).not.toHaveClass('bg-[var(--accent-color)]');

        rerender(
            <NotificationHeader
                unreadCount={0}
                onlyUnread={true}
                onToggleOnlyUnread={() => {}}
                onMarkAllAsRead={() => {}}
            />,
        );

        expect(toggle).toHaveClass('bg-[var(--accent-color)]');
    });
});

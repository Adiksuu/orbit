import { Notification } from '@/types/Notification';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
    const makeNotification = (
        overrides: Partial<Notification> = {},
    ): Notification => ({
        id: 1,
        user_id: 1,
        type: 'info',
        title: 'New comment on your issue',
        message: 'Someone left a comment.',
        read: false,
        action_url: '',
        ...overrides,
    });

    test('renders the notification title and message', () => {
        render(
            <NotificationItem
                notification={makeNotification()}
                onMarkAsRead={() => {}}
            />,
        );

        expect(
            screen.getByText('New comment on your issue'),
        ).toBeInTheDocument();
        expect(screen.getByText('Someone left a comment.')).toBeInTheDocument();
    });

    test('does not render a message paragraph when message is empty', () => {
        const { container } = render(
            <NotificationItem
                notification={makeNotification({ message: '' })}
                onMarkAsRead={() => {}}
            />,
        );

        expect(container.querySelector('p')).not.toBeInTheDocument();
    });

    test('renders a "View details" link when action_url is present', () => {
        render(
            <NotificationItem
                notification={makeNotification({
                    action_url: '/issues/42',
                })}
                onMarkAsRead={() => {}}
            />,
        );

        const link = screen.getByText('View details');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/issues/42');
    });

    test('does not render a "View details" link when action_url is empty', () => {
        render(
            <NotificationItem
                notification={makeNotification({ action_url: '' })}
                onMarkAsRead={() => {}}
            />,
        );

        expect(screen.queryByText('View details')).not.toBeInTheDocument();
    });

    test('shows the unread indicator when the notification is unread', () => {
        const { container } = render(
            <NotificationItem
                notification={makeNotification({ read: false })}
                onMarkAsRead={() => {}}
            />,
        );

        expect(container.querySelector('.cursor-pointer')).toBeInTheDocument();
    });

    test('hides the unread indicator when the notification is read', () => {
        const { container } = render(
            <NotificationItem
                notification={makeNotification({ read: true })}
                onMarkAsRead={() => {}}
            />,
        );

        expect(
            container.querySelector('.cursor-pointer'),
        ).not.toBeInTheDocument();
    });

    test('calls onMarkAsRead with the notification id when the unread indicator is clicked', async () => {
        const user = userEvent.setup();
        const onMarkAsRead = vi.fn();
        const { container } = render(
            <NotificationItem
                notification={makeNotification({ id: 7, read: false })}
                onMarkAsRead={onMarkAsRead}
            />,
        );

        const indicator = container.querySelector(
            '.cursor-pointer',
        ) as HTMLElement;
        await user.click(indicator);

        expect(onMarkAsRead).toHaveBeenCalledWith(7);
    });
});

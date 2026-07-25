import { Notification } from '@/types/Notification';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import NotificationsPopup from './NotificationsPopup';

const pageState = vi.hoisted(() => ({
    notifications: [] as Notification[],
}));
const mockPost = vi.hoisted(() => vi.fn());
const mockTransform = vi.hoisted(() => vi.fn());

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({
        props: {
            auth: { user: { id: 1, name: 'John Doe', email: 'john@acme.com' } },
            notifications: pageState.notifications,
        },
    }),
    useForm: () => ({
        post: mockPost,
        transform: mockTransform,
    }),
}));

const makeNotification = (
    overrides: Partial<Notification> = {},
): Notification => ({
    id: 1,
    user_id: 1,
    type: 'info',
    title: 'Notification title',
    message: 'Notification message',
    read: false,
    action_url: '',
    ...overrides,
});

describe('NotificationsPopup Component', () => {
    beforeEach(() => {
        pageState.notifications = [];
        mockPost.mockClear();
        mockTransform.mockClear();
    });

    test('renders the empty state when there are no notifications', () => {
        render(<NotificationsPopup />);

        expect(
            screen.getByText('No notifications to display'),
        ).toBeInTheDocument();
        expect(screen.queryByText('Mark all as read')).not.toBeInTheDocument();
    });

    test('renders all notifications and the unread count badge', () => {
        pageState.notifications = [
            makeNotification({ id: 1, title: 'First', read: false }),
            makeNotification({ id: 2, title: 'Second', read: true }),
            makeNotification({ id: 3, title: 'Third', read: false }),
        ];
        render(<NotificationsPopup />);

        expect(screen.getByText('First')).toBeInTheDocument();
        expect(screen.getByText('Second')).toBeInTheDocument();
        expect(screen.getByText('Third')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('filters to only unread notifications when the toggle is switched on', async () => {
        const user = userEvent.setup();
        pageState.notifications = [
            makeNotification({ id: 1, title: 'Read one', read: true }),
            makeNotification({ id: 2, title: 'Unread one', read: false }),
        ];
        render(<NotificationsPopup />);

        expect(screen.getByText('Read one')).toBeInTheDocument();
        expect(screen.getByText('Unread one')).toBeInTheDocument();

        const toggle = screen
            .getByText('Only show unread')
            .parentElement?.querySelector('button') as HTMLElement;
        await user.click(toggle);

        expect(screen.queryByText('Read one')).not.toBeInTheDocument();
        expect(screen.getByText('Unread one')).toBeInTheDocument();
    });

    test('posts to mark-all-read when "Mark all as read" is clicked', async () => {
        const user = userEvent.setup();
        pageState.notifications = [
            makeNotification({ id: 1, title: 'First', read: false }),
        ];
        render(<NotificationsPopup />);

        await user.click(screen.getByText('Mark all as read'));

        expect(mockPost).toHaveBeenCalledWith('/notifications/mark-all-read', {
            preserveScroll: true,
        });
    });

    test('marks a single notification as read via the item indicator', async () => {
        const user = userEvent.setup();
        pageState.notifications = [
            makeNotification({
                id: 9,
                title: 'Target notification',
                read: false,
            }),
        ];
        const { container } = render(<NotificationsPopup />);

        const indicator = container.querySelector(
            '.group\\/btn',
        ) as HTMLElement;
        await user.click(indicator);

        expect(mockTransform).toHaveBeenCalledTimes(1);
        expect(mockPost).toHaveBeenCalledWith('/notifications/9', {
            preserveScroll: true,
        });
    });
});

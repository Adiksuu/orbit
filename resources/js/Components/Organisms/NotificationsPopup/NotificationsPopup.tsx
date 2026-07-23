import NotificationHeader from '@/Components/Molecules/NotificationHeader/NotificationHeader';
import NotificationsList from '@/Components/Organisms/NotificationsList/NotificationsList';
import { Notification } from '@/types/Notification';
import { useEffect, useState } from 'react';

function NotificationsPopup() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [onlyUnread, setOnlyUnread] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('/notifications');
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    const handleMarkAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((item) => ({ ...item, read: true })),
        );
    };

    const handleMarkAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, read: true } : item,
            ),
        );
    };

    const filteredNotifications = onlyUnread
        ? notifications.filter((item) => !item.read)
        : notifications;

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="fixed right-2 top-16 z-[9999] w-[calc(100vw-1rem)] max-w-[420px] rounded-2xl border border-white/10 bg-[var(--bg-dark-color)] p-4 text-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:right-4 sm:top-24 sm:w-[420px] sm:p-5">
            <NotificationHeader
                unreadCount={unreadCount}
                onlyUnread={onlyUnread}
                onToggleOnlyUnread={setOnlyUnread}
                onMarkAllAsRead={handleMarkAllAsRead}
            />
            <NotificationsList
                notifications={filteredNotifications}
                onMarkAsRead={handleMarkAsRead}
            />
        </div>
    );
}

export default NotificationsPopup;

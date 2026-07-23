import NotificationEmptyState from '@/Components/Molecules/NotificationEmptyState/NotificationEmptyState';
import NotificationItem from '@/Components/Molecules/NotificationItem/NotificationItem';
import { Notification } from '@/types/Notification';

interface NotificationsListProps {
    notifications: Notification[];
    onMarkAsRead: (id: number) => void;
}

function NotificationsList({
    notifications,
    onMarkAsRead,
}: NotificationsListProps) {
    if (notifications.length === 0) {
        return <NotificationEmptyState />;
    }

    return (
        <div className="no-scrollbar -mx-1 mt-2 max-h-[calc(85vh-140px)] space-y-1.5 overflow-y-auto px-3 py-2 sm:max-h-[440px]">
            {notifications.map((item) => (
                <NotificationItem
                    key={item.id}
                    notification={item}
                    onMarkAsRead={onMarkAsRead}
                />
            ))}
        </div>
    );
}

export default NotificationsList;

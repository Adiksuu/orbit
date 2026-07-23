import Badge from '@/Components/Atoms/Badge/Badge';
import { Notification } from '@/types/Notification';

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: number) => void;
}

function NotificationItem({
    notification,
    onMarkAsRead,
}: NotificationItemProps) {
    return (
        <div
            className={`group relative flex items-start justify-between rounded-xl p-3 transition-all duration-150 ${
                notification.read
                    ? 'hover:bg-white/[0.03]'
                    : 'bg-white/[0.02] hover:bg-white/[0.05]'
            }`}
        >
            <div className="min-w-0 flex-1 pr-2">
                <h2 className="break-words text-sm font-semibold tracking-tight text-white transition-colors group-hover:text-[var(--accent-color)]">
                    {notification.title}
                </h2>

                {notification.message && (
                    <p className="mt-1 break-words text-xs leading-relaxed text-gray-400">
                        {notification.message}
                    </p>
                )}

                {notification.action_url && (
                    <div className="mt-2.5 flex items-center gap-3">
                        <a
                            href={notification.action_url}
                            className="text-xs font-medium text-[var(--accent-color)] hover:underline"
                        >
                            View details
                        </a>
                    </div>
                )}
            </div>

            {!notification.read && (
                <div className="shrink-0 pl-1">
                    <Badge
                        onClick={() => onMarkAsRead(notification.id)}
                        variant={'ghost'}
                        tooltip={true}
                        tooltipText={'Mark as read'}
                        className="group/btn cursor-pointer justify-center rounded-full p-2 transition-all hover:bg-white/10"
                    >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)] transition-transform group-hover/btn:scale-125" />
                    </Badge>
                </div>
            )}
        </div>
    );
}

export default NotificationItem;

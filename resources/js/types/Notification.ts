export type NotificationTypes = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
    id: number;
    type: NotificationTypes;
    title: string;
    message: string;
    read: boolean;
    action_url: string;
}

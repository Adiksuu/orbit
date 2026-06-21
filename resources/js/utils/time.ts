export function formatDate(dateString: number | undefined): string {
    const date = new Date(dateString || Date.now());
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${dayOfMonth}.${month} ${hours}:${minutes}`;
}
export function formatTimeAgo(dateString: number | undefined): string {
    const date = new Date(dateString || Date.now());
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}

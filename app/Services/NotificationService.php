<?php

namespace App\Services;

use App\Models\Notification;
use App\Repositories\NotificationRepository;
use Illuminate\Support\Collection;

class NotificationService
{
    public function __construct(
        protected NotificationRepository $notificationRepository
    ) {}

    public function getAllForUser(int $userId): Collection {
        return $this->notificationRepository->getAllForUser($userId);
    }
    public function store(array $data): Notification {
        return $this->notificationRepository->store($data);
    }
    public function update(Notification $notification, array $data): Notification {
        return $this->notificationRepository->update($notification, $data);
    }
    public function markAllAsReadForUser(int $userId): int {
        return $this->notificationRepository->markAllAsReadForUser($userId);
    }

    /**
     * Create a notification targeted at a single recipient.
     */
    public function notify(int $userId, string $type, string $title, string $message, ?string $actionUrl = null): Notification {
        return $this->notificationRepository->store([
            'user_id' => $userId,
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'read' => false,
            'action_url' => $actionUrl,
        ]);
    }
}

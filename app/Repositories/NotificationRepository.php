<?php

namespace App\Repositories;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Collection;

class NotificationRepository
{
    public function getAllForUser(int $userId): Collection
    {
        return Notification::query()->where('user_id', $userId)->latest()->get();
    }
    public function store(array $data): Notification
    {
        return Notification::query()->create($data);
    }
    public function update(Notification $notification, array $data): Notification
    {
        $notification->update($data);

        return $notification;
    }

    public function markAllAsReadForUser(int $userId): int
    {
        return Notification::query()
            ->where('user_id', $userId)
            ->where('read', false)
            ->update(['read' => true]);
    }
}

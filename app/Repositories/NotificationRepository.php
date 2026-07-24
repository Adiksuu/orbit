<?php

namespace App\Repositories;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Collection;

class NotificationRepository
{
    public function getAll(): Collection
    {
        return Notification::query()->latest()->get();
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

    public function markAllAsRead(): int
    {
        return Notification::query()->where('read', false)->update(['read' => true]);
    }
}

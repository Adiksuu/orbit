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

    public function getAll(): Collection {
        return $this->notificationRepository->getAll();
    }
    public function store(array $data): Notification {
        return $this->notificationRepository->store($data);
    }
    public function update(Notification $notification, array $data): Notification {
        return $this->notificationRepository->update($notification, $data);
    }
}

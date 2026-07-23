<?php

use App\Models\Notification;
use App\Repositories\NotificationRepository;
use App\Services\NotificationService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->notificationRepository = Mockery::mock(NotificationRepository::class);
    $this->service = new NotificationService($this->notificationRepository);
});

test('it can get all notifications', function () {
    $notifications = new Collection([new Notification(['id' => 1])]);

    $this->notificationRepository->shouldReceive('getAll')
        ->once()
        ->andReturn($notifications);

    $result = $this->service->getAll();

    expect($result)->toBe($notifications);
});

test('it can store a new notification', function () {
    $data = ['type' => 'info', 'title' => 'Test', 'message' => 'Test message', 'read' => false];
    $notification = new Notification($data);

    $this->notificationRepository->shouldReceive('store')
        ->once()
        ->with($data)
        ->andReturn($notification);

    $result = $this->service->store($data);

    expect($result)->toBe($notification);
});

test('it can update a notification', function () {
    $notification = Notification::factory()->make(['id' => 1]);
    $data = ['title' => 'Updated Title'];

    $this->notificationRepository->shouldReceive('update')
        ->once()
        ->with($notification, $data)
        ->andReturn($notification);

    $result = $this->service->update($notification, $data);

    expect($result)->toBe($notification);
});

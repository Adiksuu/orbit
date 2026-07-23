<?php

use App\Models\Notification;
use App\Repositories\NotificationRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new NotificationRepository();
});

test('it can get all notifications', function () {
    Notification::factory()->count(3)->create();

    $notifications = $this->repository->getAll();

    expect($notifications)->toHaveCount(3);
});

test('it can store a new notification', function () {
    $data = [
        'type' => 'info',
        'title' => 'New Notification',
        'message' => 'Something happened',
        'read' => false,
    ];

    $notification = $this->repository->store($data);

    expect($notification)->toBeInstanceOf(Notification::class);
    $this->assertDatabaseHas('notifications', ['title' => 'New Notification']);
});

test('it can update a notification', function () {
    $notification = Notification::factory()->create(['title' => 'Old Title']);

    $updated = $this->repository->update($notification, ['title' => 'New Title']);

    expect($updated->title)->toBe('New Title');
    $this->assertDatabaseHas('notifications', ['id' => $notification->id, 'title' => 'New Title']);
});

test('it can mark all unread notifications as read', function () {
    Notification::factory()->count(2)->create(['read' => false]);
    Notification::factory()->create(['read' => true]);

    $count = $this->repository->markAllAsRead();

    expect($count)->toBe(2);
    expect(Notification::where('read', false)->count())->toBe(0);
});

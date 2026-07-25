<?php

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new UserRepository();
});

test('it can get assignable users', function () {
    User::factory()->count(5)->create();

    $users = $this->repository->getAssignableUsers();

    expect($users)->toHaveCount(5);
    expect($users->first())->toHaveKeys(['id', 'name', 'avatar']);
});

test('it can update a user', function () {
    $user = User::factory()->create(['name' => 'Old Name']);

    $updatedUser = $this->repository->update($user, ['name' => 'New Name']);

    expect($updatedUser->name)->toBe('New Name');
    $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'New Name']);
});

test('it can create a user', function () {
    $user = $this->repository->create([
        'name' => 'New User',
        'email' => 'new@example.com',
        'password' => 'password123',
    ]);

    expect($user)->toBeInstanceOf(User::class);
    $this->assertDatabaseHas('users', ['id' => $user->id, 'email' => 'new@example.com']);
});

test('it reports no users exist when the table is empty', function () {
    expect($this->repository->hasAnyUsers())->toBeFalse();
});

test('it reports users exist once at least one has been created', function () {
    User::factory()->create();

    expect($this->repository->hasAnyUsers())->toBeTrue();
});

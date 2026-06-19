<?php

use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->userRepository = Mockery::mock(UserRepository::class);
    $this->service = new UserService($this->userRepository);
});

test('it can update profile without avatar', function () {
    $user = User::factory()->create();
    $data = ['name' => 'New Name'];

    $this->userRepository->shouldReceive('update')
        ->once()
        ->with($user, $data)
        ->andReturn($user);

    $result = $this->service->updateProfile($user, $data);

    expect($result)->toBe($user);
});

test('it can update profile with avatar', function () {
    Storage::fake('public');
    $user = User::factory()->create(['avatar' => null]);
    $file = UploadedFile::fake()->create('avatar.jpg', 100);
    $data = ['name' => 'New Name'];

    $this->userRepository->shouldReceive('update')
        ->once()
        ->with($user, Mockery::on(function ($arg) {
            return $arg['name'] === 'New Name' && str_contains($arg['avatar'], 'avatars/');
        }))
        ->andReturn($user);

    $result = $this->service->updateProfile($user, $data, $file);

    expect($result)->toBe($user);
    Storage::disk('public')->assertExists('avatars/' . $file->hashName());
});

test('it deletes old avatar when uploading new one', function () {
    Storage::fake('public');
    $oldAvatarPath = 'avatars/old.jpg';
    Storage::disk('public')->put($oldAvatarPath, 'content');

    $user = User::factory()->create(['avatar' => '/storage/' . $oldAvatarPath]);
    $file = UploadedFile::fake()->create('new.jpg', 100);
    $data = ['name' => 'New Name'];

    $this->userRepository->shouldReceive('update')
        ->once()
        ->andReturn($user);

    $this->service->updateProfile($user, $data, $file);

    Storage::disk('public')->assertMissing($oldAvatarPath);
    Storage::disk('public')->assertExists('avatars/' . $file->hashName());
});

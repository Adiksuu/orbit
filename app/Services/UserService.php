<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function __construct(protected UserRepository $userRepository) {}

    public function getAssignableUsers(): Collection {
        return $this->userRepository->getAssignableUsers();
    }

    public function updateProfile(User $user, array $data, ?UploadedFile $avatarFile = null): User {
        if ($avatarFile) {
            if ($user->avatar) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->avatar));
            }

            $path = $avatarFile->store('avatars', 'public');
            $data['avatar'] = Storage::url($path);
        }

        return $this->userRepository->update($user, $data);
    }
}

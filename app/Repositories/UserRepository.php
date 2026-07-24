<?php
namespace App\Repositories;

use App\Models\User;

class UserRepository {
    public function getAssignableUsers() {
        return User::query()->select('id', 'name', 'avatar')->get();
    }

    public function update(User $user, array $data): User {
        $user->update($data);
        return $user;
    }

    public function create(array $data): User {
        return User::create($data);
    }

    public function hasAnyUsers(): bool {
        return User::query()->exists();
    }
}

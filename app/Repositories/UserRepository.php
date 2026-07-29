<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserRepository {
    public function getAssignableUsers(): Collection
    {
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

    public function completeOnboarding(User $user): User {
        $user->update(['has_completed_onboarding' => true]);
        return $user;
    }
}

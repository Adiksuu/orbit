<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

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

    public function resetAvatar(User $user): User {
        if ($user->avatar) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $user->avatar));
        }

        return $this->userRepository->update($user, ['avatar' => null]);
    }

    public function completeOnboarding(User $user): User {
        return $this->userRepository->completeOnboarding($user);
    }

    public function completeProjectOnboarding(User $user): User {
        return $this->userRepository->completeProjectOnboarding($user);
    }
    public function rename(User $user, string $newName): User {
        return $this->userRepository->rename($user, $newName);
    }
    public function updatePassword(User $user, string $currentPassword, string $newPassword): User {
        if (! Hash::check($currentPassword, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'The provided password does not match your current password.',
            ]);
        }

        return $this->userRepository->updatePassword($user, $newPassword);
    }
    public function getUserSessions(User $user): SupportCollection {
        $sessions = $this->userRepository->getUserSessions($user);

        return $sessions->map(fn ($session) => [
            'id' => $session->id,
            'ipAddress' => $session->ip_address,
            'userAgent' => $session->user_agent,
            'lastActiveAt' => Carbon::createFromTimestamp(
                $session->last_activity
            )->toIso8601String(),
            'isCurrent' => $session->id === request()->session()->getId(),
        ]);
    }

    public function revokeSession(User $user, string $sessionId): void {
        if ($sessionId === request()->session()->getId()) {
            throw ValidationException::withMessages([
                'session' => 'You cannot revoke your current session.',
            ]);
        }

        $revoked = $this->userRepository->deleteSession($user, $sessionId);

        if (! $revoked) {
            throw ValidationException::withMessages([
                'session' => 'Session not found.',
            ]);
        }
    }

    public function revokeOtherSessions(User $user): void {
        $this->userRepository->deleteOtherSessions($user, request()->session()->getId());
    }
}

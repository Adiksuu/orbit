<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    public function completeOnboarding(): RedirectResponse
    {
        $this->userService->completeOnboarding(auth()->user());

        return redirect()->back();
    }

    public function completeProjectOnboarding(): RedirectResponse
    {
        $this->userService->completeProjectOnboarding(auth()->user());

        return redirect()->back();
    }
}

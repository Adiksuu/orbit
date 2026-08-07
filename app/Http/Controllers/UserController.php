<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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

    public function rename(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $this->userService->rename($request->user(), $validated['name']);

        return redirect()->back();
    }
}

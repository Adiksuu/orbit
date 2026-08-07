<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:30|min:3',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput()
                ->with(
                    'error',
                    'Profile name update failed. Please fix the form errors.',
                );
        }

        $validated = $validator->validated();

        $this->userService->rename($request->user(), $validated['name']);

        return redirect()
            ->back()
            ->with('success', 'Profile name has been updated successfully.');
    }
}

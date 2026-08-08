<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function __construct(protected UserService $userService) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Settings/Index', [
            'sessions' => $this->userService->getUserSessions($request->user()),
        ]);
    }
}

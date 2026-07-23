<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct(
        protected NotificationService $notificationService
    ) {}
    public function index()
    {
        return $this->notificationService->getAll();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:success,info,warning,error',
            'title' => 'required|string',
            'message' => 'required|string',
            'read' => 'boolean',
            'action_url' => 'nullable|string'
        ]);

        $this->notificationService->store($data);
        return redirect()->back();
    }

    public function update(Request $request, Notification $notification): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:success,info,warning,error',
            'title' => 'required|string',
            'message' => 'required|string',
            'read' => 'boolean',
            'action_url' => 'nullable|string'
        ]);

        $this->notificationService->update($notification, $validated);
        return redirect()->back();
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json();
    }
}

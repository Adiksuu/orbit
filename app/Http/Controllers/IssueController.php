<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Services\IssueService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function __construct(
        protected IssueService $issueService
    ) {}

    public function update(Request $request, Issue $issue): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'status' => 'sometimes|required|string',
            'priority' => 'sometimes|required|string',
            'assignee_id' => 'sometimes|nullable|exists:users,id',
            'labels' => 'sometimes|nullable|array',
        ]);

        $this->issueService->updateIssue($issue, $data);

        return redirect()->back();
    }
}

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
            'start_date' => 'sometimes|nullable|date',
            'end_date' => 'sometimes|nullable|date|after_or_equal:start_date',
        ]);

        $this->issueService->updateIssue($issue, $data);

        return redirect()->back()
            ->with('success', 'Issue has been updated successfully!')
            ->with('action_url', route('projects.show', $issue->project_id) . '?issue=' . $issue->id);
    }
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'priority' => 'required|string',
            'status' => 'required|string',
            'assignee_id' => 'nullable|exists:users,id',
            'labels' => 'nullable|array',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $issue = $this->issueService->createIssue($data);

        return redirect()->back()
            ->with('success', 'Issue has been created successfully.')
            ->with('action_url', route('projects.show', $issue->project_id) . '?issue=' . $issue->id);
    }
}

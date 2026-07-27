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

        $before = $this->issueService->snapshot($issue);

        $this->issueService->updateIssue($issue, $data);

        $changesSummary = $this->issueService->summarizeChanges($issue, $before);
        $message = $changesSummary
            ? "Issue #$issue->id \"$issue->title\" updated: $changesSummary."
            : "Issue #$issue->id \"$issue->title\" saved — no changes detected.";

        return redirect()->back()
            ->with('success', $message)
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
            ->with('success', "Issue #$issue->id \"$issue->title\" has been created successfully.")
            ->with('action_url', route('projects.show', $issue->project_id) . '?issue=' . $issue->id);
    }
    public function destroy(Issue $issue): RedirectResponse
    {
        $this->issueService->deleteIssue($issue);

        return redirect()->back()
            ->with('success', "Issue #$issue->id \"$issue->title\" has been deleted successfully.");
    }
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['required', 'integer', 'exists:issues,id'],
        ]);

        $this->issueService->bulkDeleteIssues($validated['ids']);

        return redirect()->back()
            ->with('success', "Selected issues have been deleted successfully.");
    }
}

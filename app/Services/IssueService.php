<?php

namespace App\Services;

use App\Models\Issue;
use App\Repositories\IssueRepository;

class IssueService
{
    public function __construct(
        protected IssueRepository $issueRepository,
        protected ActivityLogService $activityLogService
    ) {}

    public function createIssue(array $data): Issue {
        $data['user_id'] = auth()->id();

        $issue = $this->issueRepository->store($data);
        $this->activityLogService->log($issue->project_id, "Added new task: #{$issue->id}");

        return $issue;
    }
}

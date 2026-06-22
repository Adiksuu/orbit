<?php

namespace App\Services;

use App\Models\Issue;
use App\Repositories\IssueRepository;
use Illuminate\Support\Collection;

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
    public function getAll(): Collection
    {
        return $this->issueRepository->getAll();
    }

    public function updateIssue(Issue $issue, array $data): Issue {
        $this->issueRepository->update($issue, $data);
        return $issue;
    }
}

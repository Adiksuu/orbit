<?php

namespace App\Repositories;

use App\Models\Issue;
use Illuminate\Support\Collection;

class IssueRepository
{
    public function getForProject(int $projectId): Collection {
        return Issue::query()->where('project_id', $projectId)->with(['creator', 'assignee'])->orderByRaw("FIELD(priority, 'high', 'medium', 'low')")->get();
    }
    public function store(array $data): Issue {
        return Issue::query()->create($data);
    }
    public function update(Issue $issue, array $data): Issue {
        $issue->update($data);
        return $issue;
    }
}

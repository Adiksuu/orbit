<?php

namespace App\Repositories;

use App\Models\Issue;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class IssueRepository
{
    public function getForProject(int $projectId): Collection {
        return Issue::query()
            ->where('project_id', $projectId)
            ->with(['creator', 'assignee'])
            ->orderByRaw("CASE WHEN priority = 'high' THEN 1 WHEN priority = 'medium' THEN 2 WHEN priority = 'low' THEN 3 ELSE 4 END")
            ->get();
    }
    public function store(array $data): Issue {
        return Issue::query()->create($data);
    }
    public function update(Issue $issue, array $data): Issue {
        $issue->update($data);
        return $issue;
    }
    public function getAll(): Collection {
        return Issue::query()->with(['creator', 'assignee'])->get();
    }
    public function getAllPaginated(int $perPage = 20): LengthAwarePaginator {
        return Issue::query()->with(['creator', 'assignee'])->paginate($perPage);
    }
}

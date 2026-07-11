<?php

namespace App\Repositories;

use App\Models\Issue;
use Carbon\Carbon;
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
        return Issue::query()->with(['creator', 'assignee'])->latest()->get();
    }
    public function getAllPaginated(string | int $projectID = 'all', int $perPage = 20, array $sortParams = []): LengthAwarePaginator {
        $query = Issue::query()->with(['creator', 'assignee']);

        if ($projectID !== 'all') {
            $query->where('project_id', $projectID);
        }

        $directionInput = $sortParams['direction'] ?? 'AZ';
        $direction = $directionInput === 'ZA' ? 'desc' : 'asc';

        $column = $sortParams['sort'] ?? null;
        $allowedColumns = ['id', 'title', 'status', 'assignee', 'priority', 'labels'];

        if ($column && in_array($column, $allowedColumns)) {
            switch ($column) {
                case 'id':
                case 'title':
                case 'status':
                case 'labels':
                    $query->orderBy($column, $direction);
                    break;

                case 'priority':
                    if ($direction === 'asc') {
                        $query->orderByRaw("CASE WHEN priority = 'high' THEN 1 WHEN priority = 'medium' THEN 2 WHEN priority = 'low' THEN 3 ELSE 4 END");
                    } else {
                        $query->orderByRaw("CASE WHEN priority = 'high' THEN 4 WHEN priority = 'medium' THEN 3 WHEN priority = 'low' THEN 2 ELSE 1 END");
                    }
                    break;

                case 'assignee':
                    $query->leftJoin('users', 'issues.assignee_id', '=', 'users.id')
                        ->select('issues.*')
                        ->orderBy('users.name', $direction);
                    break;
            }
        } else {
            $query->latest();
        }
        return $query->paginate($perPage)->withQueryString();
    }
    public function getProductivityTrend(): array
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        $issues = Issue::query()
            ->whereBetween('updated_at', [$startOfWeek, $endOfWeek])
            ->select('updated_at')
            ->get();

        $rawStats = $issues->groupBy(function ($issue) {
            return $issue->updated_at->format('l');
        })->map(fn($group) => $group->count())->toArray();

        $chartDays = [
            'Monday' => 'Mon', 'Tuesday' => 'Tue', 'Wednesday' => 'Wed',
            'Thursday' => 'Thu', 'Friday' => 'Fri', 'Saturday' => 'Sat', 'Sunday' => 'Sun'
        ];

        $formattedData = [];
        foreach ($chartDays as $fullDay => $shortDay) {
            $formattedData[] = [
                'day' => $shortDay,
                'count' => $rawStats[$fullDay] ?? 0
            ];
        }

        return $formattedData;
    }
}

<?php

namespace App\Repositories;

use App\Models\ActivityLog;
use Illuminate\Support\Collection;

class ActivityLogRepository
{
    public function getRecentForProject(int $projectId, int $limit = 15): Collection {
        return ActivityLog::query()->where('project_id', $projectId)->with('user')->latest()->limit($limit)->get();
    }
}

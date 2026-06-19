<?php

use App\Models\ActivityLog;
use App\Models\Project;
use App\Repositories\ActivityLogRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new ActivityLogRepository();
});

test('it can get recent activity logs for a project', function () {
    $project = Project::factory()->create();
    ActivityLog::factory()->count(20)->create(['project_id' => $project->id]);
    ActivityLog::factory()->count(5)->create(); // other project

    $logs = $this->repository->getRecentForProject($project->id, 10);

    expect($logs)->toHaveCount(10);
});

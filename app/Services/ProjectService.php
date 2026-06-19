<?php

namespace App\Services;

use App\Models\Project;
use App\Repositories\ProjectRepository;
use Illuminate\Support\Str;

class ProjectService
{
    public function __construct(
        protected ProjectRepository $projectRepository,
        protected ActivityLogService $activityLogService
    ) {}

    public function createProject(array $data): Project {
        $data['slug'] = Str::slug($data['name']);
        $project = $this->projectRepository->store($data);
        $this->activityLogService->log($project->id, "Created project: {$project->name}");

        return $project;
    }
}

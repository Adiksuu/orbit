<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Services\IssueService;
use App\Services\ProjectService;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    protected ProjectService $projectService;
    protected IssueService $issueService;

    public function __construct(ProjectService $projectService, IssueService $issueService) {
        $this->projectService = $projectService;
        $this->issueService = $issueService;
    }

    public function show(Project $project): Response
    {
        $projects = $this->projectService->getAll();
        $issues = $this->issueService->getAllByProjectID($project->id);

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'projects' => $projects,
            'issues' => $issues
        ]);
    }
    public function index(Project $project): Response
    {
        $projects = Project::with('issues')->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }
}

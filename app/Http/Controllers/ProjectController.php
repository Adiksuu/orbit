<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Services\IssueService;
use App\Services\ProjectService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

        $sortParams = request()->only(['sort', 'direction']);
        $perPage = (int) request()->get('perPage', 10);
        $searchParams = request()->only(['search']);
        $issues = $this->issueService->getAllByProjectID($project->id, $sortParams, $perPage, $searchParams);

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'projects' => $projects,
            'issues' => $issues,
            'queryParams' => request()->query() ?: null,
        ]);
    }
    public function index(Project $project): Response
    {
        $projects = Project::with('issues')->latest()->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:30',
            'description' => 'nullable|string',
            'slug' => 'required|string|max:30',
            'color' => 'required|string'
        ]);

        $this->projectService->createProject($data);

        return redirect()->back()->with('success', 'Project has been created successfully.');
    }
    public function updateColumns(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'columns' => 'required|array',
            'columns.id' => 'sometimes|boolean',
            'columns.title' => 'sometimes|boolean',
            'columns.status' => 'sometimes|boolean',
            'columns.assignee' => 'sometimes|boolean',
            'columns.priority' => 'sometimes|boolean',
            'columns.labels' => 'sometimes|boolean',
            'columns.updated_at' => 'sometimes|boolean',
        ]);

        $this->projectService->updateColumns($project, $validated['columns']);

        return redirect()->back()->with('success', 'Columns configuration updated successfully.');
    }
}

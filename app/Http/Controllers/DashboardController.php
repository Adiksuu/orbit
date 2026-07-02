<?php

namespace App\Http\Controllers;

use App\Services\IssueService;
use App\Services\ProjectService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected IssueService $issueService;
    protected ProjectService $projectService;

    public function __construct(IssueService $issueService, ProjectService $projectService) {
        $this->issueService = $issueService;
        $this->projectService = $projectService;
    }

    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        $issues = $this->issueService->getAll();
        $projects = $this->projectService->getAll();

        return Inertia::render('Dashboard', [
            'issues' => $issues,
            'projects' => $projects,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\IssueService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected IssueService $issueService;

    public function __construct(IssueService $issueService) {
        $this->issueService = $issueService;
    }

    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        $issues = $this->issueService->getAll();

        return Inertia::render('Dashboard', [
            'issues' => $issues
        ]);
    }
}

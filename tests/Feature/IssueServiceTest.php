<?php

use App\Models\Issue;
use App\Models\User;
use App\Repositories\IssueRepository;
use App\Services\ActivityLogService;
use App\Services\IssueService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->issueRepository = Mockery::mock(IssueRepository::class);
    $this->activityLogService = Mockery::mock(ActivityLogService::class);
    $this->service = new IssueService($this->issueRepository, $this->activityLogService);
});

test('it can create an issue and log activity', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $data = ['project_id' => 1, 'title' => 'Test Issue'];
    $issue = new Issue(['id' => 123, 'project_id' => 1, 'title' => 'Test Issue']);

    $this->issueRepository->shouldReceive('store')
        ->once()
        ->with(Mockery::on(function ($arg) use ($user) {
            return $arg['project_id'] === 1 && $arg['user_id'] === $user->id;
        }))
        ->andReturn($issue);

    // This expectation will fail if my suspicion about #{$issue} is correct, and it returns the whole object stringified
    $this->activityLogService->shouldReceive('log')
        ->once()
        ->with(1, 'Added new task: #123');

    $result = $this->service->createIssue($data);

    expect($result)->toBe($issue);
});

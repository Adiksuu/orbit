<?php

use App\Models\Issue;
use App\Models\Project;
use App\Models\User;
use App\Repositories\IssueRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new IssueRepository();
});

test('it can get issues for a project', function () {
    $project = Project::factory()->create();
    Issue::factory()->count(3)->create(['project_id' => $project->id]);
    Issue::factory()->count(2)->create(); // other project

    $issues = $this->repository->getForProject($project->id);

    expect($issues)->toHaveCount(3);
});

test('it can store a new issue', function () {
    $project = Project::factory()->create();
    $user = User::factory()->create();
    $data = [
        'project_id' => $project->id,
        'user_id' => $user->id,
        'title' => 'Test Issue',
        'description' => 'Issue body',
        'priority' => 'high',
        'status' => 'open',
    ];

    $issue = $this->repository->store($data);

    expect($issue)->toBeInstanceOf(Issue::class);
    $this->assertDatabaseHas('issues', ['title' => 'Test Issue']);
});

test('it can update an issue', function () {
    $issue = Issue::factory()->create(['title' => 'Old Title']);

    $updatedIssue = $this->repository->update($issue, ['title' => 'New Title']);

    expect($updatedIssue->title)->toBe('New Title');
    $this->assertDatabaseHas('issues', ['id' => $issue->id, 'title' => 'New Title']);
});

test('it returns issues ordered by priority', function () {
    $project = Project::factory()->create();
    Issue::factory()->create(['project_id' => $project->id, 'priority' => 'low', 'title' => 'Low Issue']);
    Issue::factory()->create(['project_id' => $project->id, 'priority' => 'high', 'title' => 'High Issue']);
    Issue::factory()->create(['project_id' => $project->id, 'priority' => 'medium', 'title' => 'Medium Issue']);

    $issues = $this->repository->getForProject($project->id);

    expect($issues[0]->priority)->toBe('high');
    expect($issues[1]->priority)->toBe('medium');
    expect($issues[2]->priority)->toBe('low');
});
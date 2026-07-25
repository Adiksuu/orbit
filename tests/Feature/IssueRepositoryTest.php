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

test('it can search issues by title', function () {
    $project = Project::factory()->create();
    Issue::factory()->create(['project_id' => $project->id, 'title' => 'Searchable Title']);
    Issue::factory()->create(['project_id' => $project->id, 'title' => 'Another Issue']);

    $results = $this->repository->getAllPaginated($project->id, 10, [], ['search' => 'Searchable']);

    expect($results->items())->toHaveCount(1);
    expect($results->items()[0]->title)->toBe('Searchable Title');
});

test('it can search issues by description', function () {
    $project = Project::factory()->create();
    Issue::factory()->create(['project_id' => $project->id, 'description' => 'Target description']);
    Issue::factory()->create(['project_id' => $project->id, 'description' => 'Other content']);

    $results = $this->repository->getAllPaginated($project->id, 10, [], ['search' => 'Target']);

    expect($results->items())->toHaveCount(1);
    expect($results->items()[0]->description)->toBe('Target description');
});

test('it can search issues by ID', function () {
    $project = Project::factory()->create();
    $issue = Issue::factory()->create(['project_id' => $project->id, 'id' => 999]);
    Issue::factory()->create(['project_id' => $project->id, 'id' => 888]);

    $results = $this->repository->getAllPaginated($project->id, 10, [], ['search' => '999']);

    expect($results->items())->toHaveCount(1);
    expect($results->items()[0]->id)->toBe(999);
});

test('it can filter issues by a single assignee', function () {
    $project = Project::factory()->create();
    $assignee = User::factory()->create();
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => $assignee->id]);
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => User::factory()->create()->id]);

    $results = $this->repository->getAllPaginated($project->id, 10, [], [], ['assignee' => (string) $assignee->id]);

    expect($results->items())->toHaveCount(1);
    expect($results->items()[0]->assignee_id)->toBe($assignee->id);
});

test('it can filter issues by multiple assignees', function () {
    $project = Project::factory()->create();
    $first = User::factory()->create();
    $second = User::factory()->create();
    $third = User::factory()->create();
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => $first->id]);
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => $second->id]);
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => $third->id]);

    $results = $this->repository->getAllPaginated($project->id, 10, [], [], ['assignee' => "{$first->id},{$second->id}"]);

    expect($results->items())->toHaveCount(2);
});

test('it can filter issues by assignee combined with unassigned', function () {
    $project = Project::factory()->create();
    $assignee = User::factory()->create();
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => $assignee->id]);
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => null]);
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => User::factory()->create()->id]);

    $results = $this->repository->getAllPaginated($project->id, 10, [], [], ['assignee' => "{$assignee->id},unassigned"]);

    expect($results->items())->toHaveCount(2);
});

test('it can still filter unassigned issues only', function () {
    $project = Project::factory()->create();
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => null]);
    Issue::factory()->create(['project_id' => $project->id, 'assignee_id' => User::factory()->create()->id]);

    $results = $this->repository->getAllPaginated($project->id, 10, [], [], ['assignee' => 'unassigned']);

    expect($results->items())->toHaveCount(1);
    expect($results->items()[0]->assignee_id)->toBeNull();
});

test('it can search issues by labels', function () {
    $project = Project::factory()->create();
    Issue::factory()->create([
        'project_id' => $project->id,
        'labels' => [\App\Enums\IssueLabel::BUG],
    ]);
    Issue::factory()->create([
        'project_id' => $project->id,
        'labels' => [\App\Enums\IssueLabel::FEATURE],
    ]);

    $results = $this->repository->getAllPaginated($project->id, 10, [], ['search' => 'bug']);

    expect($results->items())->toHaveCount(1);
});


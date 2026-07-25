<?php

use App\Models\ActivityLog;
use App\Models\Issue;
use App\Models\Project;
use App\Models\SavedFilter;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('a factory-created project persists with the expected attribute types', function () {
    $project = Project::factory()->create();

    expect($project->exists)->toBeTrue();
    expect($project->name)->toBeString();
    expect($project->slug)->toBeString();
    expect($project->columns)->toBeArray();
});

test('mass assignment via fillable creates a project', function () {
    $project = Project::create([
        'name' => 'New Project',
        'slug' => 'new-project',
        'description' => 'A description',
        'color' => 'blue',
        'columns' => ['id' => true],
    ]);

    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'name' => 'New Project',
        'slug' => 'new-project',
    ]);
});

test('the slug column must be unique', function () {
    Project::factory()->create(['slug' => 'duplicate-slug']);
    Project::factory()->create(['slug' => 'duplicate-slug']);
})->throws(QueryException::class);

test('the color column rejects a value outside its enum', function () {
    Project::factory()->create(['color' => 'not-a-real-color']);
})->throws(QueryException::class);

test('columns are cast to an array', function () {
    $project = Project::factory()->create(['columns' => ['id' => true, 'title' => false]]);

    $fresh = $project->fresh();

    expect($fresh->columns)->toBeArray();
    expect($fresh->columns['id'])->toBeTrue();
    expect($fresh->columns['title'])->toBeFalse();
});

test('issues() returns only issues belonging to the project', function () {
    $project = Project::factory()->create();
    $ownIssues = Issue::factory()->count(3)->create(['project_id' => $project->id]);
    Issue::factory()->count(2)->create();

    expect($project->issues())->toBeInstanceOf(HasMany::class);
    expect($project->issues)->toHaveCount(3);
    expect($project->issues->pluck('id')->sort()->values()->all())
        ->toBe($ownIssues->pluck('id')->sort()->values()->all());
});

test('savedFilters() returns only saved filters belonging to the project', function () {
    $project = Project::factory()->create();
    SavedFilter::factory()->count(2)->create(['project_id' => $project->id]);
    SavedFilter::factory()->create(['project_id' => Project::factory()->create()->id]);

    expect($project->savedFilters())->toBeInstanceOf(HasMany::class);
    expect($project->savedFilters)->toHaveCount(2);
});

test('deleting a project cascades to delete its saved filters and activity logs', function () {
    $project = Project::factory()->create();
    $filter = SavedFilter::factory()->create(['project_id' => $project->id]);
    $log = ActivityLog::factory()->create(['project_id' => $project->id]);

    $project->delete();

    $this->assertDatabaseMissing('saved_filters', ['id' => $filter->id]);
    $this->assertDatabaseMissing('activity_logs', ['id' => $log->id]);
});

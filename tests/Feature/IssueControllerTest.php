<?php

use App\Models\Issue;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('a project member can create an issue', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $response = $this->actingAs($user)->post('/issues', [
        'title' => 'New issue',
        'description' => 'Something to do',
        'project_id' => $project->id,
        'priority' => 'high',
        'status' => 'open',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('issues', [
        'title' => 'New issue',
        'project_id' => $project->id,
        'user_id' => $user->id,
    ]);
});

test('creating an issue stamps the authenticated user as the creator', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $this->actingAs($user)->post('/issues', [
        'title' => 'New issue',
        'project_id' => $project->id,
        'priority' => 'high',
        'status' => 'open',
    ]);

    $issue = Issue::where('title', 'New issue')->firstOrFail();
    expect($issue->user_id)->toBe($user->id);
});

test('creating an issue redirects back with a success flash message and an action url', function () {
    $user = User::factory()->create();
    $project = Project::factory()->create();

    $response = $this->actingAs($user)->post('/issues', [
        'title' => 'Flash message issue',
        'project_id' => $project->id,
        'priority' => 'high',
        'status' => 'open',
    ]);

    $issue = Issue::where('title', 'Flash message issue')->firstOrFail();

    $response->assertSessionHas('success', "Issue #{$issue->id} \"Flash message issue\" has been created successfully.");
    $response->assertSessionHas('action_url', route('projects.show', $project->id).'?issue='.$issue->id);
});

test('creating an issue requires a title, project_id, priority and status', function () {
    $response = $this->actingAs(User::factory()->create())->post('/issues', []);

    $response->assertSessionHasErrors(['title', 'project_id', 'priority', 'status']);
});

test('creating an issue requires the project_id to reference a real project', function () {
    $response = $this->actingAs(User::factory()->create())->post('/issues', [
        'title' => 'Orphan issue',
        'project_id' => 999999,
        'priority' => 'high',
        'status' => 'open',
    ]);

    $response->assertSessionHasErrors('project_id');
});

test('creating an issue requires the assignee_id to reference a real user when given', function () {
    $project = Project::factory()->create();

    $response = $this->actingAs(User::factory()->create())->post('/issues', [
        'title' => 'Bad assignee',
        'project_id' => $project->id,
        'priority' => 'high',
        'status' => 'open',
        'assignee_id' => 999999,
    ]);

    $response->assertSessionHasErrors('assignee_id');
});

test('creating an issue rejects an end_date before the start_date', function () {
    $project = Project::factory()->create();

    $response = $this->actingAs(User::factory()->create())->post('/issues', [
        'title' => 'Bad dates',
        'project_id' => $project->id,
        'priority' => 'high',
        'status' => 'open',
        'start_date' => now()->toDateString(),
        'end_date' => now()->subDay()->toDateString(),
    ]);

    $response->assertSessionHasErrors('end_date');
});

test('guests cannot create an issue', function () {
    $response = $this->post('/issues', []);

    $response->assertRedirect(route('login'));
});

test('a project member can update an issue', function () {
    $issue = Issue::factory()->create(['title' => 'Old title']);

    $response = $this->actingAs(User::factory()->create())->patch("/issues/{$issue->id}", [
        'title' => 'New title',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('issues', ['id' => $issue->id, 'title' => 'New title']);
});

test('updating an issue redirects back with a summary of what changed', function () {
    $issue = Issue::factory()->create(['title' => 'Old title', 'priority' => 'low']);

    $response = $this->actingAs(User::factory()->create())->patch("/issues/{$issue->id}", [
        'priority' => 'high',
    ]);

    $response->assertSessionHas(
        'success',
        "Issue #{$issue->id} \"Old title\" updated: priority changed from \"low\" to \"high\"."
    );
});

test('updating an issue with no actual changes says so in the flash message', function () {
    $issue = Issue::factory()->create(['title' => 'Same title', 'priority' => 'high']);

    $response = $this->actingAs(User::factory()->create())->patch("/issues/{$issue->id}", [
        'priority' => 'high',
    ]);

    $response->assertSessionHas(
        'success',
        "Issue #{$issue->id} \"Same title\" saved — no changes detected."
    );
});

test('updating a non-existent issue returns a 404', function () {
    $response = $this->actingAs(User::factory()->create())->patch('/issues/999999', [
        'title' => 'Nope',
    ]);

    $response->assertStatus(404);
});

test('updating an issue rejects an end_date before a start_date sent in the same request', function () {
    $issue = Issue::factory()->create([
        'start_date' => now(),
        'end_date' => now()->addDay(),
    ]);

    $response = $this->actingAs(User::factory()->create())->patch("/issues/{$issue->id}", [
        'start_date' => now()->toDateString(),
        'end_date' => now()->subDay()->toDateString(),
    ]);

    $response->assertSessionHasErrors('end_date');
});

// Known gap: `after_or_equal:start_date` only compares against a `start_date` present in
// *this* request's payload, not the issue's persisted value. Sending `end_date` alone skips
// validation entirely and lets an invalid date pair reach the DB, where the check-constraint
// trigger throws a raw exception that Laravel renders as a 500 instead of a normal
// validation redirect.
test('updating only end_date without start_date bypasses validation and returns a server error', function () {
    $issue = Issue::factory()->create([
        'start_date' => now(),
        'end_date' => now()->addDay(),
    ]);

    $response = $this->actingAs(User::factory()->create())->patch("/issues/{$issue->id}", [
        'end_date' => now()->subDay()->toDateString(),
    ]);

    $response->assertStatus(500);
});

test('updating an issue rejects an invalid status or priority value type', function () {
    $issue = Issue::factory()->create();

    $response = $this->actingAs(User::factory()->create())->patch("/issues/{$issue->id}", [
        'status' => '',
    ]);

    $response->assertSessionHasErrors('status');
});

test('guests cannot update an issue', function () {
    $issue = Issue::factory()->create();

    $response = $this->patch("/issues/{$issue->id}", ['title' => 'Nope']);

    $response->assertRedirect(route('login'));
});

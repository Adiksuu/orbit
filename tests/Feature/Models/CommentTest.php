<?php

use App\Models\Comment;
use App\Models\Issue;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('a factory-created comment persists with the expected attributes', function () {
    $comment = Comment::factory()->create();

    expect($comment->exists)->toBeTrue();
    expect($comment->body)->toBeString();
});

test('mass assignment via fillable creates a comment', function () {
    $issue = Issue::factory()->create();
    $user = User::factory()->create();

    $comment = Comment::create([
        'issue_id' => $issue->id,
        'user_id' => $user->id,
        'body' => 'Looks good to me',
    ]);

    $this->assertDatabaseHas('comments', [
        'id' => $comment->id,
        'issue_id' => $issue->id,
        'user_id' => $user->id,
        'body' => 'Looks good to me',
    ]);
});

test('user() belongs to the user referenced by user_id', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->create(['user_id' => $user->id]);

    expect($comment->user())->toBeInstanceOf(BelongsTo::class);
    expect($comment->user->id)->toBe($user->id);
});

test('issue() belongs to the issue referenced by issue_id', function () {
    $issue = Issue::factory()->create();
    $comment = Comment::factory()->create(['issue_id' => $issue->id]);

    expect($comment->issue())->toBeInstanceOf(BelongsTo::class);
    expect($comment->issue->id)->toBe($issue->id);
});

test('deleting the issue cascades to delete its comments', function () {
    $issue = Issue::factory()->create();
    $comment = Comment::factory()->create(['issue_id' => $issue->id]);

    $issue->delete();

    $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
});

test('deleting the user cascades to delete their comments', function () {
    $user = User::factory()->create();
    $comment = Comment::factory()->create(['user_id' => $user->id]);

    $user->delete();

    $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
});

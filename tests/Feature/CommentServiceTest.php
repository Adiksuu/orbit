<?php

use App\Models\Comment;
use App\Models\Issue;
use App\Models\User;
use App\Repositories\CommentRepository;
use App\Services\ActivityLogService;
use App\Services\CommentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->commentRepository = Mockery::mock(CommentRepository::class);
    $this->activityLogService = Mockery::mock(ActivityLogService::class);
    $this->service = new CommentService($this->commentRepository, $this->activityLogService);
});

test('getForIssue delegates to the repository', function () {
    $comments = new Collection;

    $this->commentRepository->shouldReceive('getForIssue')
        ->once()
        ->with(7)
        ->andReturn($comments);

    expect($this->service->getForIssue(7))->toBe($comments);
});

test('addComment stamps the authenticated user, stores the comment and logs activity', function () {
    $user = User::factory()->create(['name' => 'Jane Cooper']);
    $issue = Issue::factory()->create(['id' => 3, 'title' => 'Fix login crash']);
    $comment = Comment::factory()->make(['issue_id' => $issue->id, 'user_id' => $user->id]);

    $this->actingAs($user);

    $this->commentRepository->shouldReceive('store')
        ->once()
        ->with(Mockery::on(fn ($data) => $data['issue_id'] === $issue->id && $data['user_id'] === $user->id && $data['body'] === 'Looks good'))
        ->andReturn($comment);

    $this->activityLogService->shouldReceive('log')
        ->once()
        ->with($issue->project_id, 'Jane Cooper commented on issue #3 "Fix login crash"');

    $result = $this->service->addComment($issue, ['body' => 'Looks good']);

    expect($result)->toBe($comment);
});

test('deleteComment removes the comment and logs activity', function () {
    $user = User::factory()->create(['name' => 'Jane Cooper']);
    $issue = Issue::factory()->create(['id' => 5, 'title' => 'Fix login crash']);
    $comment = Comment::factory()->create(['issue_id' => $issue->id]);

    $this->actingAs($user);

    $this->commentRepository->shouldReceive('delete')
        ->once()
        ->with($comment);

    $this->activityLogService->shouldReceive('log')
        ->once()
        ->with($issue->project_id, 'Jane Cooper deleted a comment on issue #5 "Fix login crash"');

    $this->service->deleteComment($comment);
});

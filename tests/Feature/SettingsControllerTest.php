<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->withoutVite();
});

test('authenticated user can view the settings page', function () {
    $response = $this->actingAs(User::factory()->create())->get('/settings');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Settings/Index')
    );
});

test('guest is redirected to login when visiting settings', function () {
    $response = $this->get('/settings');

    $response->assertRedirect(route('login'));
});

test('settings page includes the authenticated user sessions with the current one flagged', function () {
    $user = User::factory()->create();

    $currentSessionId = str_repeat('a', 40);
    \Illuminate\Support\Facades\DB::table('sessions')->insert([
        [
            'id' => $currentSessionId,
            'user_id' => $user->id,
            'ip_address' => '10.0.0.1',
            'user_agent' => 'Current Agent',
            'payload' => base64_encode(serialize([])),
            'last_activity' => now()->timestamp,
        ],
        [
            'id' => 'another-session-id',
            'user_id' => $user->id,
            'ip_address' => '10.0.0.5',
            'user_agent' => 'Other Agent',
            'payload' => base64_encode(serialize([])),
            'last_activity' => now()->timestamp,
        ],
    ]);

    $response = $this->withCookie(config('session.cookie'), $currentSessionId)
        ->actingAs($user)
        ->get('/settings');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Settings/Index')
        ->has('sessions', 2)
        ->where('sessions', fn ($sessions) => collect($sessions)
            ->firstWhere('id', $currentSessionId)['isCurrent'] === true
            && collect($sessions)->firstWhere('id', 'another-session-id')['isCurrent'] === false)
    );
});

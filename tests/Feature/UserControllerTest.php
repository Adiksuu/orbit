<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('an authenticated user can mark onboarding as completed', function () {
    $user = User::factory()->create(['has_completed_onboarding' => false]);

    $response = $this->actingAs($user)->post('/onboarding/complete');

    $response->assertRedirect();
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'has_completed_onboarding' => true,
    ]);
});

test('guests cannot mark onboarding as completed', function () {
    $response = $this->post('/onboarding/complete');

    $response->assertRedirect(route('login'));
});

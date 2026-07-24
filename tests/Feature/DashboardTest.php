<?php

use App\Models\User;

test('dashboard page is displayed for an authenticated user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/');

    $response->assertStatus(200);
});

test('guests are redirected to login instead of seeing the dashboard', function () {
    $response = $this->get('/');

    $response->assertRedirect(route('login'));
});

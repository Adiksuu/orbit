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

test('an authenticated user can mark project onboarding as completed', function () {
    $user = User::factory()->create(['has_completed_project_onboarding' => false]);

    $response = $this->actingAs($user)->post('/onboarding/project/complete');

    $response->assertRedirect();
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'has_completed_project_onboarding' => true,
    ]);
});

test('guests cannot mark project onboarding as completed', function () {
    $response = $this->post('/onboarding/project/complete');

    $response->assertRedirect(route('login'));
});

test('an authenticated user can rename account name', function () {
    $user = User::factory()->create(['name' => 'Old Name']);

    $response = $this->actingAs($user)->post('/account/rename', [
        'name' => 'New Name',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Profile name has been updated successfully.');
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'New Name',
    ]);
});

test('rename name requires a non-empty name', function () {
    $user = User::factory()->create(['name' => 'Old Name']);

    $response = $this->from('/settings')->actingAs($user)->post('/account/rename', [
        'name' => '',
    ]);

    $response->assertRedirect('/settings');
    $response->assertSessionHasErrors(['name']);
    $response->assertSessionHas(
        'error',
        'Profile name update failed. Please fix the form errors.',
    );
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Old Name',
    ]);
});

test('guests cannot rename account name', function () {
    $response = $this->post('/account/rename', [
        'name' => 'New Name',
    ]);

    $response->assertRedirect(route('login'));
});

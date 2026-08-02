<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

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

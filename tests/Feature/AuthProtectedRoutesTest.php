<?php

test('guests are redirected to login when visiting the projects index', function () {
    $response = $this->get('/projects');

    $response->assertRedirect(route('login'));
});

test('guests are redirected to login when visiting a project', function () {
    $response = $this->get('/projects/1');

    $response->assertRedirect(route('login'));
});

test('guests are redirected to login when creating a project', function () {
    $response = $this->post('/projects', []);

    $response->assertRedirect(route('login'));
});

test('guests are redirected to login when creating an issue', function () {
    $response = $this->post('/issues', []);

    $response->assertRedirect(route('login'));
});

test('guests are redirected to login when updating an issue', function () {
    $response = $this->patch('/issues/1', []);

    $response->assertRedirect(route('login'));
});

test('guests are redirected to login when visiting notifications', function () {
    $response = $this->get('/notifications');

    $response->assertRedirect(route('login'));
});

test('guests are redirected to login when creating a saved filter', function () {
    $response = $this->post('/saved-filters', []);

    $response->assertRedirect(route('login'));
});

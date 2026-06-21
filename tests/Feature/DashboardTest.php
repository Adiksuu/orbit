<?php

test('dashboard page is displayed', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

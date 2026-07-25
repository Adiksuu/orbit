<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'type' => fake()->randomElement(['success', 'info', 'warning', 'error']),
            'title' => fake()->sentence,
            'message' => fake()->paragraph,
            'read' => fake()->boolean(),
            'action_url' => fake()->optional()->url,
        ];
    }
}

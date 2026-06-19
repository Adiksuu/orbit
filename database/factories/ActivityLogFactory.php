<?php

namespace Database\Factories;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ActivityLog>
 */
class ActivityLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'activity_type' => fake()->randomElement(['created', 'updated', 'deleted']),
            'activity_description' => fake()->sentence(),
            'activity_date' => fake()->dateTimeBetween('-1 year')
        ];
    }
}

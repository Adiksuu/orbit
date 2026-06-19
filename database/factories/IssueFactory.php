<?php

namespace Database\Factories;

use App\Models\Issue;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Issue>
 */
class IssueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement(['open', 'closed']),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'project_id' => Project::factory(),
            'user_id' => User::factory(),
            'assignee_id' => fake()->boolean(90) ? User::factory() : null,
        ];
    }
}

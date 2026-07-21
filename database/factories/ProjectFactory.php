<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $availableColors = [
            'red',
            'orange',
            'yellow',
            'green',
            'lime',
            'blue',
            'sky',
            'violet',
            'purple',
            'pink',
        ];

        return [
            'name' => fake()->sentence(3),
            'slug' => fake()->slug(),
            'description' => fake()->paragraph(),
            'color' => fake()->randomElement($availableColors),
            'columns' => [
                'id' => fake()->boolean(),
                'title' => fake()->boolean(),
                'status' => fake()->boolean(),
                'assignee' => fake()->boolean(),
                'priority' => fake()->boolean(),
                'labels' => fake()->boolean(),
                'updated_at' => fake()->boolean(),
                'start_date' => fake()->boolean(),
                'end_date' => fake()->boolean(),
            ],
        ];
    }
}

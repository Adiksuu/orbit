<?php

namespace Database\Factories;

use App\Models\SavedFilter;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class SavedFilterFactory extends Factory
{
    protected $model = SavedFilter::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'context' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'query_params' => [
                'status' => $this->faker->randomElement(['open', 'closed']),
                'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
                'labels' => implode(',', $this->faker->randomElements(['bug', 'feature', 'ux', 'design'], 2)),
            ],
        ];
    }
}

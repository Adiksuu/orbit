<?php

namespace Database\Seeders;

use App\Models\Issue;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//         User::factory()->create([
//             'name' => 'Test User',
//             'email' => 'test@example.com',
//         ]);

        $users = User::factory()->count(10)->create();
        $projects = Project::factory()->count(3)->create();
        Issue::factory()->count(10)->recycle($users, $projects)->create();
    }
}

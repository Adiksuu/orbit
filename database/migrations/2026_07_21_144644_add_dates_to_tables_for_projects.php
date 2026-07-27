<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up(): void
    {
        $newColumns = [
            'start_date' => false,
            'end_date' => false,
        ];

        DB::table('projects')->whereNotNull('columns')->chunkById(100, function ($projects) use ($newColumns) {
            foreach ($projects as $project) {
                $columns = json_decode($project->columns, true) ?? [];

                $updatedColumns = array_merge($newColumns, $columns);

                DB::table('projects')
                    ->where('id', $project->id)
                    ->update(['columns' => json_encode($updatedColumns)]);
            }
        });
    }

    public function down(): void
    {
        $keysToRemove = ['created_at', 'due_date'];

        DB::table('projects')->whereNotNull('columns')->chunkById(100, function ($projects) use ($keysToRemove) {
            foreach ($projects as $project) {
                $columns = json_decode($project->columns, true) ?? [];

                foreach ($keysToRemove as $key) {
                    unset($columns[$key]);
                }

                DB::table('projects')
                    ->where('id', $project->id)
                    ->update(['columns' => json_encode($columns)]);
            }
        });
    }
};

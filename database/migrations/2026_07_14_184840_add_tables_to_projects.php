<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->json('columns')
                ->default(json_encode([
                    'id' => true,
                    'title' => true,
                    'status' => true,
                    'assignee' => true,
                    'priority' => true,
                    'labels' => true,
                    'updated_at' => true,
                ]))
                ->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('columns');
        });
    }
};

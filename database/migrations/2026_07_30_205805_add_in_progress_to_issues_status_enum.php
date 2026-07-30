<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('issues', function (Blueprint $table) {
            $table->enum('status', ['open', 'in_progress', 'closed'])
                ->default('open')
                ->change();
        });

        // On SQLite, ->change() rebuilds the table (create new, copy, drop old,
        // rename) to apply the widened CHECK constraint. SQLite automatically
        // drops triggers when their table is dropped, so the date-order
        // triggers from add_date_check_constraint_to_issues_table are silently
        // lost by that rebuild — recreate them here.
        $this->recreateDateCheckTriggers();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Existing 'in_progress' rows are remapped to 'open' before the
        // constraint is narrowed back, since 'closed' would misrepresent them.
        DB::table('issues')->where('status', 'in_progress')->update(['status' => 'open']);

        Schema::table('issues', function (Blueprint $table) {
            $table->enum('status', ['open', 'closed'])
                ->default('open')
                ->change();
        });

        // Same rebuild-drops-triggers caveat applies in reverse.
        $this->recreateDateCheckTriggers();
    }

    /**
     * Re-run the trigger definitions from add_date_check_constraint_to_issues_table.
     */
    private function recreateDateCheckTriggers(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS validate_issue_dates_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS validate_issue_dates_update');

        DB::unprepared('
            CREATE TRIGGER validate_issue_dates_insert
            BEFORE INSERT ON issues
            FOR EACH ROW
            WHEN NEW.end_date IS NOT NULL AND NEW.start_date IS NOT NULL AND NEW.end_date < NEW.start_date
            BEGIN
                SELECT RAISE(ABORT, "The end date must be greater than or equal to the start date.");
            END;
        ');

        DB::unprepared('
            CREATE TRIGGER validate_issue_dates_update
            BEFORE UPDATE ON issues
            FOR EACH ROW
            WHEN NEW.end_date IS NOT NULL AND NEW.start_date IS NOT NULL AND NEW.end_date < NEW.start_date
            BEGIN
                SELECT RAISE(ABORT, "The end date must be greater than or equal to the start date.");
            END;
        ');
    }
};

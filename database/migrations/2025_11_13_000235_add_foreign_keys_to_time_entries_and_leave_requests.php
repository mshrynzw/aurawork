<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('t_time_entries', function (Blueprint $table) {
            $table->foreign('approval_binding_id')
                ->references('id')
                ->on('t_approval_bindings')
                ->onDelete('set null');
        });

        Schema::table('t_leave_requests', function (Blueprint $table) {
            $table->foreign('approval_binding_id')
                ->references('id')
                ->on('t_approval_bindings')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('t_time_entries', function (Blueprint $table) {
            $table->dropForeign(['approval_binding_id']);
        });

        Schema::table('t_leave_requests', function (Blueprint $table) {
            $table->dropForeign(['approval_binding_id']);
        });
    }
};

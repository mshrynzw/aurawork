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
        Schema::create('t_time_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('m_users')->onDelete('cascade')->comment('ユーザーID');
            $table->date('work_date')->comment('対象日');
            $table->dateTime('clock_in', 3)->nullable()->comment('出勤日時');
            $table->dateTime('clock_out', 3)->nullable()->comment('退勤日時');
            $table->smallInteger('break_minutes')->default(0)->comment('休憩(分)');
            $table->enum('source', ['web', 'mobile', 'ic', 'import'])->default('web')->comment('由来');
            $table->enum('status', ['draft', 'submitted', 'approved', 'rejected'])->default('draft')->comment('申請状態');
            $table->smallInteger('late_minutes')->default(0)->comment('遅刻(分)');
            $table->smallInteger('early_leave_minutes')->default(0)->comment('早退(分)');
            $table->smallInteger('overtime_minutes')->default(0)->comment('残業(分)');
            $table->unsignedBigInteger('approval_binding_id')->nullable()->comment('承認紐づけID');
            $table->timestamps(3);
            $table->softDeletes('deleted_at', 3);
            $table->unsignedBigInteger('created_by')->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
            
            $table->index(['work_date', 'user_id']);
            $table->index('approval_binding_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_time_entries');
    }
};

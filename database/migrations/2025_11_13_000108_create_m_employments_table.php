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
        Schema::create('m_employments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('m_users')->onDelete('cascade')->comment('ユーザーID');
            $table->enum('employment_type', ['fulltime', 'contract', 'parttime', 'intern'])->comment('雇用区分');
            $table->decimal('base_hourly_rate', 10, 2)->nullable()->comment('基本時給');
            $table->decimal('base_monthly_salary', 12, 2)->nullable()->comment('基本月給');
            $table->decimal('work_hours_per_week', 5, 2)->comment('週所定労働時間');
            $table->date('effective_from')->comment('適用開始日');
            $table->date('effective_to')->nullable()->comment('適用終了日');
            $table->timestamps(3);
            $table->softDeletes('deleted_at', 3);
            $table->unsignedBigInteger('created_by')->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_employments');
    }
};

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
        Schema::create('t_leave_balances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('m_users')->onDelete('cascade')->comment('ユーザーID');
            $table->enum('type', ['annual', 'sick', 'special'])->comment('区分');
            $table->date('period_start')->comment('期間開始日');
            $table->date('period_end')->comment('期間終了日');
            $table->decimal('granted', 4, 2)->default(0)->comment('付与日数');
            $table->decimal('taken', 4, 2)->default(0)->comment('取得日数');
            $table->decimal('carryover', 4, 2)->default(0)->comment('繰越日数');
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
        Schema::dropIfExists('t_leave_balances');
    }
};

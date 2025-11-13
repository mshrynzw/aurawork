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
        Schema::create('t_leave_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('m_users')->onDelete('cascade')->comment('ユーザーID');
            $table->enum('type', ['annual', 'sick', 'special', 'unpaid'])->comment('区分');
            $table->date('start_date')->comment('開始日');
            $table->date('end_date')->comment('終了日');
            $table->decimal('days', 4, 2)->comment('日数');
            $table->string('reason', 255)->nullable()->comment('理由');
            $table->enum('status', ['draft', 'submitted', 'approved', 'rejected'])->default('draft')->comment('状態');
            $table->unsignedBigInteger('approval_binding_id')->nullable()->comment('承認紐づけID');
            $table->timestamps(3);
            $table->softDeletes('deleted_at', 3);
            $table->unsignedBigInteger('created_by')->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
            
            $table->index('approval_binding_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_leave_requests');
    }
};

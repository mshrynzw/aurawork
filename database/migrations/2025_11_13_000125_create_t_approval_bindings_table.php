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
        Schema::create('t_approval_bindings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flow_id')->constrained('m_approval_flows')->onDelete('cascade')->comment('フローID');
            $table->string('target_table', 64)->comment('対象テーブル');
            $table->unsignedBigInteger('target_id')->comment('対象ID');
            $table->smallInteger('current_step')->default(1)->comment('現在段階');
            $table->enum('status', ['draft', 'in_review', 'approved', 'rejected'])->default('draft')->comment('状態');
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
        Schema::dropIfExists('t_approval_bindings');
    }
};

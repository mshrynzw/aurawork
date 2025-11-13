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
        Schema::create('m_approval_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('approval_flow_id')->constrained('m_approval_flows')->onDelete('cascade')->comment('フローID');
            $table->smallInteger('step_order')->comment('段階順');
            $table->enum('approver_type', ['role', 'user', 'manager'])->comment('承認者種別');
            $table->foreignId('approver_role_id')->nullable()->constrained('m_roles')->onDelete('set null')->comment('承認ロールID');
            $table->foreignId('approver_user_id')->nullable()->constrained('m_users')->onDelete('set null')->comment('承認ユーザーID');
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
        Schema::dropIfExists('m_approval_steps');
    }
};

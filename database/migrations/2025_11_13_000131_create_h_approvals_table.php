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
        Schema::create('h_approvals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('binding_id')->constrained('t_approval_bindings')->onDelete('cascade')->comment('紐づけID');
            $table->smallInteger('step_order')->comment('段階');
            $table->foreignId('approver_user_id')->constrained('m_users')->onDelete('cascade')->comment('承認者ユーザーID');
            $table->enum('action', ['approve', 'reject', 'comment'])->comment('アクション');
            $table->string('comment', 255)->nullable()->comment('コメント');
            $table->dateTime('acted_at', 3)->comment('実行日時');
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
        Schema::dropIfExists('h_approvals');
    }
};

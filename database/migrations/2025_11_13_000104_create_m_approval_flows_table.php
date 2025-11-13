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
        Schema::create('m_approval_flows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('m_companies')->onDelete('cascade')->comment('会社ID');
            $table->string('name', 191)->comment('名称');
            $table->enum('target', ['time_entry', 'leave_request', 'generic'])->comment('対象');
            $table->boolean('is_active')->default(true)->comment('有効');
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
        Schema::dropIfExists('m_approval_flows');
    }
};

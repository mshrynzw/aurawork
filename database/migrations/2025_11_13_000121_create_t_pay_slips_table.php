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
        Schema::create('t_pay_slips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pay_run_id')->constrained('t_pay_runs')->onDelete('cascade')->comment('支給処理ID');
            $table->foreignId('user_id')->constrained('m_users')->onDelete('cascade')->comment('ユーザーID');
            $table->decimal('gross_amount', 12, 2)->default(0)->comment('総支給額');
            $table->decimal('total_deduction', 12, 2)->default(0)->comment('控除合計');
            $table->decimal('net_amount', 12, 2)->default(0)->comment('差引支給額');
            $table->char('currency', 3)->default('JPY')->comment('通貨');
            $table->enum('status', ['draft', 'finalized', 'paid'])->default('draft')->comment('状態');
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
        Schema::dropIfExists('t_pay_slips');
    }
};

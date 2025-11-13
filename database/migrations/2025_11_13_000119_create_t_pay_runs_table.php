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
        Schema::create('t_pay_runs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('m_companies')->onDelete('cascade')->comment('会社ID');
            $table->date('period_start')->comment('締め期間開始');
            $table->date('period_end')->comment('締め期間終了');
            $table->date('pay_date')->comment('支給日');
            $table->enum('status', ['draft', 'calculating', 'finalized', 'paid'])->default('draft')->comment('状態');
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
        Schema::dropIfExists('t_pay_runs');
    }
};

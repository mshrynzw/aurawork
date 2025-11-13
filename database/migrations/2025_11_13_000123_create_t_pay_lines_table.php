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
        Schema::create('t_pay_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pay_slip_id')->constrained('t_pay_slips')->onDelete('cascade')->comment('明細ID');
            $table->foreignId('pay_item_id')->constrained('m_pay_items')->onDelete('restrict')->comment('項目ID');
            $table->decimal('quantity', 10, 2)->nullable()->comment('数量');
            $table->decimal('rate', 12, 2)->nullable()->comment('レート');
            $table->decimal('amount', 12, 2)->comment('金額');
            $table->string('memo', 255)->nullable()->comment('備考');
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
        Schema::dropIfExists('t_pay_lines');
    }
};

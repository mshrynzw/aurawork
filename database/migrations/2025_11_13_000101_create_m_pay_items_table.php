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
        Schema::create('m_pay_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('m_companies')->onDelete('cascade')->comment('会社ID');
            $table->string('code', 64)->comment('コード');
            $table->string('name', 191)->comment('名称');
            $table->enum('kind', ['earning', 'deduction'])->comment('種別');
            $table->enum('calc_base', ['hour', 'day', 'month', 'fixed', 'overtime', 'night', 'transport'])->comment('計算基礎');
            $table->boolean('taxable')->default(true)->comment('課税対象');
            $table->boolean('social_insurance')->default(true)->comment('社保対象');
            $table->smallInteger('order_no')->comment('表示順');
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
        Schema::dropIfExists('m_pay_items');
    }
};

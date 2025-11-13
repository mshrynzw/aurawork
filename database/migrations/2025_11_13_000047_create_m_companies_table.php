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
        Schema::create('m_companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191)->comment('会社名');
            $table->string('code', 64)->comment('会社コード')->index();
            $table->string('timezone', 64)->comment('タイムゾーン')->default('Asia/Tokyo');
            $table->tinyInteger('start_of_week')->comment('週の開始曜日(1=月)')->default(1);
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
        Schema::dropIfExists('m_companies');
    }
};

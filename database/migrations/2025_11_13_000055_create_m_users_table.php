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
        Schema::create('m_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('m_companies')->onDelete('cascade')->comment('会社ID');
            $table->foreignId('department_id')->nullable()->constrained('m_departments')->onDelete('set null')->comment('部門ID');
            $table->string('email', 191)->comment('メールアドレス');
            $table->string('password', 255)->comment('パスワードハッシュ');
            $table->string('code', 64)->comment('ユーザーコード')->index();
            $table->string('name_last', 64)->comment('姓');
            $table->string('name_first', 64)->comment('名');
            $table->string('name_last_kana', 128)->nullable()->comment('姓カナ');
            $table->string('name_first_kana', 128)->nullable()->comment('名カナ');
            $table->date('joined_on')->comment('入社日');
            $table->date('retired_on')->nullable()->comment('退職日');
            $table->enum('status', ['active', 'inactive', 'provisioned'])->default('provisioned')->comment('ステータス');
            $table->timestamps(3);
            $table->softDeletes('deleted_at', 3);
            $table->unsignedBigInteger('created_by')->comment('作成者ID');
            $table->unsignedBigInteger('updated_by')->comment('更新者ID');
            $table->unsignedBigInteger('deleted_by')->nullable()->comment('削除者ID');
            
            $table->unique(['email', 'company_id'], 'm_users_email_company_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_users');
    }
};

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
        // sessionsテーブルのuser_id外部キーが存在する場合のみ削除
        // 初期状態では外部キー制約が設定されていないため、存在チェックが必要
        $connection = Schema::getConnection();
        $databaseName = $connection->getDatabaseName();
        $tableName = 'sessions';
        $foreignKeyName = 'sessions_user_id_foreign';
        
        $foreignKeys = $connection->select(
            "SELECT CONSTRAINT_NAME 
             FROM information_schema.KEY_COLUMN_USAGE 
             WHERE TABLE_SCHEMA = ? 
             AND TABLE_NAME = ? 
             AND CONSTRAINT_NAME = ? 
             AND REFERENCED_TABLE_NAME IS NOT NULL",
            [$databaseName, $tableName, $foreignKeyName]
        );
        
        if (count($foreignKeys) > 0) {
            Schema::table('sessions', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
            });
        }
        
        // インデックスが存在する場合は削除（外部キーと一緒に削除される可能性があるが、念のため）
        $indexes = $connection->select(
            "SELECT INDEX_NAME 
             FROM information_schema.STATISTICS 
             WHERE TABLE_SCHEMA = ? 
             AND TABLE_NAME = ? 
             AND INDEX_NAME = 'sessions_user_id_index'",
            [$databaseName, $tableName]
        );
        
        if (count($indexes) > 0) {
            Schema::table('sessions', function (Blueprint $table) {
                $table->dropIndex(['user_id']);
            });
        }

        // 既存のusersテーブルを削除（m_usersに移行済みの場合）
        // 注意: データ移行が必要な場合は、このマイグレーションの前にデータ移行を行うこと
        Schema::dropIfExists('users');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // usersテーブルを再作成（簡易版）
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        // sessionsテーブルのuser_idを元に戻す
        Schema::table('sessions', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->index()->change();
        });
    }
};

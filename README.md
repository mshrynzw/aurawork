# Aurawork

<p align="center">
  <strong>勤怠・休暇・給与・承認を統合管理する人事労務プラットフォーム</strong>
</p>

<p align="center">
  <a href="https://github.com/mshrynzw/aurawork/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="License: AGPL v3">
  </a>
</p>

## 概要

Auraworkは、勤怠・休暇・給与・承認を統合管理する人事労務プラットフォームです。マルチテナント対応により、複数の会社を1つのシステムで管理できます。

## 主な機能

- **勤怠管理**: 打刻、勤務実績の記録・申請・承認
- **休暇管理**: 休暇申請、休暇残高の管理
- **給与管理**: 給与締め処理、給与明細の生成・閲覧
- **承認ワークフロー**: 柔軟な承認フローの設定と実行
- **マスタ管理**: 会社、部門、ユーザー、雇用情報、ロール/権限、賃金項目、休日などのマスタ管理
- **ダッシュボード**: 労働時間・給与の推移グラフ、休暇残高、承認待ち一覧など

## 技術スタック

- **バックエンド**: Laravel 11
- **フロントエンド**: React 18 + Vite
- **スタイリング**: Tailwind CSS v4 + shadcn/ui
- **データベース**: MySQL 8
- **認証**: Laravel Sanctum
- **言語**: PHP 8.2+, TypeScript

## システム要件

- PHP 8.2以上
- Composer 2.x以上
- Node.js 22.x以上
- pnpm
- MySQL 8.0以上

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/mshrynzw/aurawork.git
cd aurawork
```

### 2. PHP依存関係のインストール

```bash
composer install
```

### 3. JavaScript依存関係のインストール

```bash
pnpm install
```

### 4. 環境変数の設定

```bash
# .envファイルをコピー
cp .env.example .env

# アプリケーションキーを生成
php artisan key:generate
```

`.env`ファイルを編集して、データベース接続情報などを設定してください。

### 5. データベースのセットアップ

```bash
# マイグレーションの実行
php artisan migrate

# シーダーの実行（オプション）
php artisan db:seed
```

### 6. ストレージリンクの作成

```bash
php artisan storage:link
```

## 開発サーバーの起動

### 方法1: 一括起動（推奨）

以下のコマンドで、Laravel開発サーバー、キュー、Viteを同時に起動します：

```bash
composer dev
```

これにより以下が起動します：
- Laravel開発サーバー（`http://localhost:8000`）
- キューリスナー
- Vite開発サーバー（Hot Reload有効）

### 方法2: 個別起動

別々のターミナルで起動する場合：

```bash
# ターミナル1: Laravel開発サーバー
php artisan serve

# ターミナル2: キューリスナー
php artisan queue:listen --tries=1

# ターミナル3: Vite開発サーバー
pnpm dev
```

## ビルド

本番環境用のアセットをビルドする場合：

```bash
pnpm run build
```

## テスト

```bash
composer test
```

## ドキュメント

詳細なドキュメントは`docs`ディレクトリを参照してください：

- [要件定義書](docs/00-要件/01-要件定義書.md)
- [基本設計書](docs/20-基本設計/21-基本設計書.md)
- [詳細設計書](docs/30-詳細設計/31-詳細設計書.md)
- [開発環境構築](docs/40-開発/41-開発環境構築/開発環境構築.md)
- [コーディング規約](docs/40-開発/44-コーディングについて/コーディング規約.md)

## ライセンス

このプロジェクトは [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html) の下で公開されています。

詳細は [LICENSE](https://github.com/mshrynzw/aurawork/blob/master/LICENSE) ファイルを参照してください。

## 作者

- **mshrynzw** - [GitHub](https://github.com/mshrynzw)

## 貢献

貢献を歓迎します！プルリクエストを送信する前に、コーディング規約を確認してください。

## セキュリティ

セキュリティの脆弱性を発見した場合は、GitHubのセキュリティアドバイザリを通じて報告してください。

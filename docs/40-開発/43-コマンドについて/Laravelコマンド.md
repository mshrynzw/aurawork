# Laravel関連のコマンド

## プロジェクトを起動する

```bash
php artisan serve
```

## マイグレーションコマンド

```bash
php artisan migrate
```

## アプリケーションキーの生成

```bash
php artisan key:generate
```

## コントローラーを作成する

```bash
php artisan make:controller コントローラーの名前
```

## モデルを作成する

```bash
php artisan make:model モデルの名前
```

## マイグレーションファイルを作成する

**間違えやすいので、必ずコマンドを確認する事**

```bash
php artisan make:migration create_テーブル名_table --create=テーブル名
```

**例:**

```bash
php artisan make:migration create_payroll_calculation_dates_table --create=payroll_calculation_dates
```

## シーディング

```bash
php artisan db:seed
```

## キャッシュクリア

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan cache:clear
```

## ヘルプコマンド

```bash
php artisan --help
```

## ルーティングの確認

```bash
php artisan route:list
```

## プロジェクトを新規作成する（このコマンドは現在使わない）

```bash
composer create-project --prefer-dist laravel/laravel プロジェクト名 "10.*"
```

**例:**

```bash
composer create-project --prefer-dist laravel/laravel almeria-payroll-system-demo "10.*"
```

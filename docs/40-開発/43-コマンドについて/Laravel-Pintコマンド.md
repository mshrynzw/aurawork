# Laravel Pint コマンド

Laravel Pintは、Laravelの公式コードフォーマッターです。Next.jsのprettierやlinterと同じような役割を果たします。

---

## 📦 インストール済み

このプロジェクトには**Laravel Pint 1.0**が既にインストールされています（`composer.json`の`require-dev`に含まれています）。

---

## 🚀 基本的な使い方

### 1. コードの自動フォーマット（全ファイル）

```bash
# app/配下のすべてのPHPファイルを自動フォーマット
./vendor/bin/pint

# または
vendor/bin/pint
```

### 2. 特定のファイルをフォーマット

```bash
# 特定のファイルのみフォーマット
./vendor/bin/pint app/Http/Controllers/UserController.php

# 複数のファイルを指定
./vendor/bin/pint app/Http/Controllers/UserController.php app/Models/User.php
```

### 3. 特定のディレクトリをフォーマット

```bash
# app/Http/Controllers/配下のすべてのファイルをフォーマット
./vendor/bin/pint app/Http/Controllers/

# database/migrations/配下をフォーマット
./vendor/bin/pint database/migrations/
```

---

## 🔍 フォーマット前の確認（Dry Run）

変更を適用せずに、どのファイルが変更されるか確認できます。

```bash
# 変更をチェックするだけ（実際には変更しない）
./vendor/bin/pint --test

# 詳細な情報を表示
./vendor/bin/pint --verbose
```

---

## ⚙️ 設定

Pintの設定は`pint.json`ファイルで管理されます。

### 現在の設定内容

```json
{
    "preset": "laravel",
    "rules": {
        "declare_strict_types": false,
        "no_unused_imports": true,
        "ordered_imports": true,
        "array_syntax": {
            "syntax": "short"
        },
        "blank_line_before_statement": {
            "statements": ["return"]
        }
    }
}
```

### 主要な設定項目

| 設定 | 説明 |
|------|------|
| **preset** | Laravelのデフォルトルールセット |
| **no_unused_imports** | 未使用のimportを自動削除 |
| **ordered_imports** | importをアルファベット順に整列 |
| **array_syntax** | 配列構文を短縮形に統一 |

---

## 💡 実用的な運用方法

### コミット前に自動フォーマット

```bash
# ステージング前
./vendor/bin/pint app/Http/Controllers/
git add .
git commit -m "feat: add new feature"
```

### VS Codeとの連携

`.vscode/settings.json`に以下の設定を追加すると、保存時に自動フォーマットできます：

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "henningveenstra.laravel-pint"
}
```

---

## 🔄 よく使うコマンド例

```bash
# すべてのPHPファイルをフォーマット
./vendor/bin/pint

# テスト実行（変更しない）
./vendor/bin/pint --test

# 特定のコントローラーをフォーマット
./vendor/bin/pint app/Http/Controllers/PayrollController.php

# すべてのマイグレーションをフォーマット
./vendor/bin/pint database/migrations/

# Modelsディレクトリをフォーマット
./vendor/bin/pint app/Models/
```

---

## 📝 フォーマット対象外にする

特定のファイルをフォーマット対象外にするには、ファイルの先頭に以下を追加：

```php
<?php
// @formatter:off
// このファイルはフォーマット対象外です
// @formatter:on
```

---

## 🆚 他のツールとの比較

| ツール | 種類 | Laravelとの統合 |
|--------|------|----------------|
| **Pint** | フォーマッター | 公式推奨・内蔵 |
| **PHP CS Fixer** | フォーマッター | サードパーティ |
| **PHPStan** | 静的解析 | サードパーティ |
| **Psalm** | 静的解析 | サードパーティ |

---

## 🎯 推奨されるワークフロー

1. **開発中**
   ```bash
   # コーディング後、pushする前に
   ./vendor/bin/pint
   git add .
   git commit -m "feat: update feature"
   ```

2. **CI/CDでの利用**
   ```yaml
   # .github/workflows/test.yml
   - name: Check code style
     run: ./vendor/bin/pint --test
   ```

---

## 📚 参考資料

- [Laravel Pint公式ドキュメント](https://laravel.com/docs/pint)
- [PHP CS Fixer Docs](https://cs.symfony.com/doc/rules/)

---

## 更新履歴

| 日付 | 更新者 | 変更内容 |
|------|--------|----------|
| 2024-12-25 | システム | 初版作成 |


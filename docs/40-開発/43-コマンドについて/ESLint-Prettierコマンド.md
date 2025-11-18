# ESLint & Prettier コマンド

ESLintはJavaScript/TypeScriptのリンター（コード品質チェック）、Prettierはコードフォーマッターです。React + TypeScriptプロジェクトのコード品質と一貫性を保つために使用します。

---

## 📦 インストール済み

このプロジェクトには以下のパッケージが既にインストールされています：

- **ESLint 9.39.1** - リンター
- **Prettier 3.6.2** - フォーマッター
- **@typescript-eslint/eslint-plugin 8.46.4** - TypeScript用ESLintプラグイン
- **eslint-plugin-react 7.37.5** - React用ESLintプラグイン
- **eslint-plugin-prettier 5.5.4** - PrettierとESLintの統合

---

## 🚀 基本的な使い方

### 1. ESLintでコードチェック（自動修正付き）

```bash
# resources/js配下のすべてのTypeScript/Reactファイルをチェックして自動修正
pnpm lint
```

### 2. ESLintでコードチェックのみ（修正しない）

```bash
# エラーや警告を確認するだけ（自動修正しない）
pnpm lint:check
```

### 3. Prettierでコードフォーマット

```bash
# resources/js配下のすべてのファイルをフォーマット
pnpm format
```

### 4. Prettierでフォーマットチェックのみ

```bash
# フォーマットが必要かどうか確認するだけ（実際にはフォーマットしない）
pnpm format:check
```

---

## 🔍 詳細な使い方

### 特定のファイルをチェック

```bash
# 特定のファイルのみESLintでチェック
npx eslint resources/js/Pages/TimeEntries/Index.tsx --fix

# 特定のファイルのみPrettierでフォーマット
npx prettier --write resources/js/Pages/TimeEntries/Index.tsx
```

### 特定のディレクトリをチェック

```bash
# 特定のディレクトリのみESLintでチェック
npx eslint resources/js/Pages/TimeEntries/ --fix

# 特定のディレクトリのみPrettierでフォーマット
npx prettier --write "resources/js/Pages/TimeEntries/**/*.{ts,tsx}"
```

---

## ⚙️ 設定ファイル

### ESLint設定

設定ファイル: `eslint.config.js`

主な設定内容：
- TypeScriptファイル（`.ts`, `.tsx`）を対象
- React、React Hooks、TypeScriptの推奨ルールを有効化
- Prettierとの統合
- 未使用変数は`_`で始まる場合は警告を無視

### Prettier設定

設定ファイル: `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Prettier無視ファイル

設定ファイル: `.prettierignore`

以下のファイル/ディレクトリはフォーマット対象外：
- `node_modules/`
- `vendor/`
- `public/build/`
- `storage/`
- `bootstrap/cache/`
- その他のビルド成果物

---

## 💡 実用的な運用方法

### コミット前に自動チェック・フォーマット

```bash
# 1. コードをフォーマット
pnpm format

# 2. リンターでチェック・自動修正
pnpm lint

# 3. 変更をコミット
git add .
git commit -m "feat: add new feature"
```

### VS Codeとの連携

`.vscode/settings.json`に以下の設定を追加すると、保存時に自動フォーマット・リンターが動作します：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

必要な拡張機能：
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)

---

## 🔄 よく使うコマンド例

```bash
# すべてのファイルをチェック・修正
pnpm lint

# すべてのファイルをフォーマット
pnpm format

# チェックのみ（CI/CDで使用）
pnpm lint:check
pnpm format:check

# 特定のページをチェック
npx eslint resources/js/Pages/TimeEntries/ --fix

# 特定のコンポーネントをフォーマット
npx prettier --write resources/js/Components/layout/Sidebar.tsx
```

---

## 📝 フォーマット対象外にする

特定のコードブロックをフォーマット対象外にするには、コメントを追加：

```typescript
// prettier-ignore
const longLine = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 }
```

---

## 🆚 他のツールとの比較

| ツール | 種類 | 対象言語 | このプロジェクトでの用途 |
|--------|------|----------|------------------------|
| **ESLint** | リンター | JavaScript/TypeScript | コード品質チェック・バグ検出 |
| **Prettier** | フォーマッター | JavaScript/TypeScript/CSS/JSON | コードスタイル統一 |
| **Laravel Pint** | フォーマッター | PHP | PHPコードのフォーマット（別ファイル参照） |

---

## 🎯 推奨されるワークフロー

### 1. 開発中

```bash
# コーディング後、pushする前に
pnpm format
pnpm lint
git add .
git commit -m "feat: update feature"
```

### 2. CI/CDでの利用

```yaml
# .github/workflows/test.yml の例
- name: Check code style
  run: |
    pnpm format:check
    pnpm lint:check
```

### 3. 新規ファイル作成時

新しいコンポーネントやページを作成した後：

```bash
# 新しく作成したファイルをフォーマット
pnpm format
pnpm lint
```

---

## ⚠️ よくあるエラーと対処法

### ESLintのエラー

**エラー: `Cannot find module '@eslint/js'`**
```bash
# パッケージを再インストール
pnpm install
```

**エラー: `Parsing error: Unexpected token`**
- TypeScriptの構文エラーの可能性
- `tsconfig.json`の設定を確認

**その他のESLintエラー**
- `'React' is not defined` → Reactのインポートを追加
- `'window' is not defined` → `/* eslint-env browser */`を追加
- `Unexpected any` → 適切な型定義を使用
- `Cannot call impure function during render` → `useState`の初期化関数内で使用

詳細は [ESLintエラー防止ガイド](../44-コーディングについて/ESLintエラー防止ガイド.md) を参照してください。

### Prettierのエラー

**エラー: `No parser could be inferred`**
- ファイル拡張子が正しいか確認（`.ts`, `.tsx`など）

---

## 📚 参考資料

- [ESLint公式ドキュメント](https://eslint.org/docs/latest/)
- [Prettier公式ドキュメント](https://prettier.io/docs/en/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [ESLintエラー防止ガイド](../44-コーディングについて/ESLintエラー防止ガイド.md) - よくあるESLintエラーと解決方法

---

## 更新履歴

| 日付 | 更新者 | 変更内容 |
|------|--------|----------|
| 2025-11-13 | システム | 初版作成 |


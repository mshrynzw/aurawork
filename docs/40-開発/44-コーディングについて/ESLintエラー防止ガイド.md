# ESLintエラー防止ガイド

## 概要

本ドキュメントには、TypeScript/React開発においてESLintエラーを防ぐためのベストプラクティスとチェックリストを記載します。

---

## 1. Reactのインポート

### 1.1 問題点
`React.ComponentProps`や`React.useMemo`などのReact APIを使用する際に、Reactをインポートしていないとエラーが発生します。

### 1.2 解決方法
React APIを使用する場合は、必ずReactをインポートしてください。

```typescript
// ❌ 悪い例
function Button({ className, ...props }: React.ComponentProps<'button'>) {
  return <button className={className} {...props} />
}

// ✅ 良い例
import * as React from 'react'

function Button({ className, ...props }: React.ComponentProps<'button'>) {
  return <button className={className} {...props} />
}
```

### 1.3 チェックリスト
- [ ] `React.ComponentProps`を使用する場合は`import * as React from 'react'`を追加
- [ ] `React.useMemo`、`React.useState`などReact Hooksを使用する場合はインポートを確認
- [ ] `React.forwardRef`を使用する場合はインポートを確認

---

## 2. グローバル変数の定義

### 2.1 問題点
ブラウザ環境のグローバル変数（`window`、`document`など）を使用する際に、ESLintが未定義としてエラーを出す場合があります。

### 2.2 解決方法
ファイルの先頭にESLint環境設定を追加してください。

```javascript
// ✅ 良い例
/* eslint-env browser */
/* global window */
import axios from 'axios';
window.axios = axios;
```

### 2.3 チェックリスト
- [ ] `window`や`document`を使用する場合は`/* eslint-env browser */`を追加
- [ ] 必要に応じて`/* global window */`などのグローバル変数宣言を追加

---

## 3. 不純関数の使用

### 3.1 問題点
Reactコンポーネントのレンダリング中に`Math.random()`などの不純関数を直接呼び出すと、再レンダリングのたびに異なる値が生成され、予期しない動作を引き起こします。

### 3.2 解決方法
不純関数は`useState`の初期化関数内で呼び出すか、`useEffect`内で使用してください。

```typescript
// ❌ 悪い例
const Component = () => {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])
  // ...
}

// ✅ 良い例
const Component = () => {
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })
  // ...
}
```

### 3.3 チェックリスト
- [ ] `Math.random()`をコンポーネント内で使用する場合は`useState`の初期化関数内で呼び出す
- [ ] `Date.now()`など時間に依存する関数も同様に扱う
- [ ] 再レンダリングのたびに値が変わる可能性がある関数は避ける

---

## 4. any型の使用

### 4.1 問題点
`any`型を使用すると、TypeScriptの型安全性が失われ、実行時エラーのリスクが高まります。

### 4.2 解決方法
適切な型定義を使用するか、`unknown`型を使用してください。

```typescript
// ❌ 悪い例
const pages: Record<string, { default: React.ComponentType<any> }> = ...

// ✅ 良い例
const pages: Record<string, { default: React.ComponentType<unknown> }> = ...
```

### 4.3 型定義の例

#### コンポーネントのProps型定義
```typescript
// ✅ 良い例
interface User {
  id: number
  name: string
  email: string
}

interface Props {
  user: User
}

export default function Edit({ user }: Props) {
  // ...
}
```

#### Inertia.jsのlayoutプロパティ
```typescript
// ❌ 悪い例
;(Component as any).layout = (page: React.ReactNode) => <Layout>{page}</Layout>

// ✅ 良い例
;(
  Component as React.ComponentType<Props> & {
    layout?: (page: React.ReactNode) => React.ReactNode
  }
).layout = (page: React.ReactNode) => <Layout>{page}</Layout>
```

### 4.4 スキーマフォルダの活用

型定義は`resources/js/schemas/`フォルダに集約して管理します。

#### スキーマファイルの構造
```
resources/js/schemas/
├── index.ts          # エクスポート用インデックス
├── user.ts           # ユーザー関連の型定義
├── approval.ts       # 承認関連の型定義
├── leave.ts          # 休暇関連の型定義
├── time-entry.ts     # 勤怠関連の型定義
├── payroll.ts        # 給与関連の型定義
└── master.ts         # マスタデータ関連の型定義
```

#### 使用方法
```typescript
// スキーマから型をインポート
import type { User, Approval, LeaveRequest } from '@/schemas'

// 使用例
interface Props {
  user: User
  approvals: Approval[]
}

export default function Component({ user, approvals }: Props) {
  // ...
}
```

#### APIレスポンスの型定義
```typescript
// schemas/medication.ts
export interface Medication {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  created_by: string
  updated_by: string
  deleted_by: string | null
  source_id: number | null
  name: string
  generic_name: string | null
  memo: string | null
}

// APIレスポンスの型定義
export interface GetMedicationsResult {
  medications: Medication[]
}

// 使用例
import type { Medication, GetMedicationsResult } from '@/schemas'

const fetchMedications = async () => {
  const result = await getMedicationsAction() as GetMedicationsResult
  if (result?.medications) {
    setMedications(result.medications) // 型が一致
  }
}
```

### 4.5 チェックリスト
- [ ] `any`型を使用する前に、適切な型定義が可能か検討する
- [ ] どうしても型が不明な場合は`unknown`型を使用する
- [ ] コンポーネントのPropsには必ず型定義を追加する
- [ ] 型定義は`resources/js/schemas/`フォルダに集約する
- [ ] APIレスポンスの型定義もスキーマフォルダに定義する
- [ ] Inertia.jsのlayoutプロパティには適切な型アサーションを使用する

---

## 5. prop-typesのエラー

### 5.1 問題点
TypeScriptを使用している場合、`react/prop-types`ルールは不要ですが、ESLintがエラーを出す場合があります。

### 5.2 解決方法
TypeScriptで型定義済みの場合は、ESLintコメントで無効化してください。

```typescript
// ✅ 良い例
/* eslint-disable react/prop-types */
import * as React from 'react'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => {
    // ...
  }
)
```

### 5.3 チェックリスト
- [ ] TypeScriptで型定義されているコンポーネントでは`react/prop-types`を無効化
- [ ] ファイルの先頭に`/* eslint-disable react/prop-types */`を追加

---

## 6. 未使用変数・インポート

### 6.1 問題点
未使用の変数やインポートは、コードの可読性を下げ、バンドルサイズを増やします。

### 6.2 解決方法
未使用の変数やインポートは削除するか、使用する場合は`_`プレフィックスを付けて明示的に未使用であることを示します。

```typescript
// ❌ 悪い例
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react'
// MessageSquareが使用されていない

// ✅ 良い例
import { CheckCircle, XCircle } from 'lucide-react'
```

```typescript
// 型としてのみ使用する変数の場合
// ❌ 悪い例
const actionTypes = { ... } as const
type ActionType = typeof actionTypes

// ✅ 良い例
const _actionTypes = { ... } as const
type Action = {
  type: typeof _actionTypes['ADD_TOAST']
  // ...
}
```

### 6.3 チェックリスト
- [ ] 未使用のインポートを削除する
- [ ] 未使用の変数を削除する
- [ ] 型としてのみ使用する変数には`_`プレフィックスを付ける

---

## 7. 未知のプロパティ

### 7.1 問題点
Reactでは標準でないHTML属性を使用すると、ESLintがエラーを出す場合があります。

### 7.2 解決方法
カスタム属性は`data-`プレフィックスを使用するか、適切な型定義を追加してください。

```typescript
// ❌ 悪い例
<div cmdk-input-wrapper="">

// ✅ 良い例
<div data-cmdk-input-wrapper="">
```

### 7.3 チェックリスト
- [ ] カスタムHTML属性には`data-`プレフィックスを使用する
- [ ] 必要に応じて型定義を拡張する

---

## 8. 開発フローでのチェック

### 8.1 コミット前のチェック
```bash
# ESLintを実行してエラーを確認
pnpm lint

# 自動修正可能なエラーを修正
pnpm lint --fix
```

### 8.2 プルリクエスト前のチェックリスト
- [ ] `pnpm lint`を実行してエラーがないことを確認
- [ ] すべてのTypeScript型エラーが解決されている
- [ ] 未使用の変数やインポートが削除されている
- [ ] `any`型が適切に置き換えられている
- [ ] Reactのインポートが適切に行われている

### 8.3 IDE設定の推奨
- **ESLint拡張機能**: リアルタイムでエラーを表示
- **Prettier拡張機能**: コードフォーマットを自動化
- **TypeScript拡張機能**: 型エラーをリアルタイムで表示

---

## 9. よくあるエラーと解決方法

### 9.1 'React' is not defined
```typescript
// 解決方法
import * as React from 'react'
```

### 9.2 'window' is not defined
```javascript
// 解決方法
/* eslint-env browser */
/* global window */
```

### 9.3 Unexpected any. Specify a different type
```typescript
// 解決方法
// anyの代わりにunknownや適切な型を使用
const data: unknown = ...
// または
interface Props { ... }
```

### 9.4 Cannot call impure function during render
```typescript
// 解決方法
const [value] = React.useState(() => {
  return Math.random()
})
```

### 9.5 'className' is missing in props validation
```typescript
// 解決方法
/* eslint-disable react/prop-types */
// TypeScriptで型定義されている場合は無効化
```

---

## 10. 参考資料

- [React公式ドキュメント](https://react.dev/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/)
- [ESLint公式ドキュメント](https://eslint.org/)
- [コーディング規約.md](コーディング規約.md)

---

## 更新履歴

| 日付 | 更新者 | 変更内容 |
|------|--------|----------|
| 2024-12-25 | システム | 初版作成（ESLintエラー修正に基づく） |


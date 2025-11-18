# スキーマ型定義

このフォルダには、プロジェクト全体で使用するTypeScriptの型定義を集約しています。

## フォルダ構造

```
schemas/
├── index.ts          # エクスポート用インデックス
├── user.ts           # ユーザー関連の型定義
├── approval.ts       # 承認関連の型定義
├── leave.ts          # 休暇関連の型定義
├── time-entry.ts     # 勤怠関連の型定義
├── payroll.ts        # 給与関連の型定義
└── master.ts         # マスタデータ関連の型定義
```

## 使用方法

### 基本的なインポート

```typescript
import type { User, Approval, LeaveRequest } from '@/schemas'
```

### コンポーネントでの使用例

```typescript
import React from 'react'
import type { User, Approval } from '@/schemas'

interface Props {
  user: User
  approvals: Approval[]
}

export default function Component({ user, approvals }: Props) {
  // ...
}
```

### APIレスポンスの型定義

```typescript
// schemas/medication.ts
export interface Medication {
  id: number
  name: string
  // ...
}

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

## 型定義の追加方法

1. 適切なスキーマファイルを選択（または新規作成）
2. 型定義を追加
3. `index.ts`にエクスポートを追加

```typescript
// schemas/example.ts
export interface Example {
  id: number
  name: string
}

// schemas/index.ts
export * from './example'
```

## ベストプラクティス

- ✅ 型定義は必ず`schemas/`フォルダに集約する
- ✅ 各ファイルは関連する型定義をグループ化する
- ✅ APIレスポンスの型定義もスキーマフォルダに定義する
- ✅ `any`型は使用せず、適切な型定義を作成する
- ❌ ページファイル内に型定義を直接書かない

## 参考資料

- [ESLintエラー防止ガイド](../../../docs/40-開発/44-コーディングについて/ESLintエラー防止ガイド.md)


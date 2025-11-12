# 変更をGitHubにアップロードする（pushする）

変更した内容をGitHubに共有したい時は**以下の流れ**に従ってください。

### **●注意**

**pushを行う前に必ずチーム内で共有・報告をお願いします**

---

## 1. 動作確認

- `php artisan serve`で起動し、各ページにエラーが発生していないか、正常に表示されているかを確認する

---

## 2. push報告

- **pushを行いたい旨をチーム内で報告する**

---

## 3. SourceTreeで変更を確認

1. SourceTreeを起動し、対象のリポジトリを開く
2. 「**ファイルステータス**」タブを開く
3. **自分が変更していないファイルが勝手に変更されていないか確認を行う**
4. 変更されたファイル一覧を確認する：
   - **変更済み**: 変更されたファイル（緑色で表示）
   - **新規追加**: 新しく追加されたファイル
   - **削除**: 削除されたファイル

---

## 4. SourceTreeで変更をステージング

1. コミットしたいファイルを選択する
   - 個別に選択する場合：ファイルの右側にある「**＋**」ボタンをクリック
   - すべてを選択する場合：ファイル一覧上部の「**全てインデックスに追加**」ボタンをクリック
2. ステージングされたファイルは「**Indexにステージングしたファイル**」セクションに移動します

---

## 5. コミットメッセージの作成

### 5-1. コミットメッセージとは

コミットメッセージとは、Gitでコードをコミットする際に「何を・なぜ変更したのか」を簡潔に記録するメッセージのことです。
開発チーム全体での履歴共有や、後から変更意図を追いやすくするためにとても重要です。

### 5-2. コミットメッセージの基本構成

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 各部分の説明

| 部分 | 内容 | 例 |
|------|------|------|
| **type** | 変更の種類を表す（後述） | `feat`, `fix`, `docs`, `refactor`など |
| **scope** | 対象モジュールや機能（省略可） | `auth`, `payroll`, `ui`, `db`など |
| **subject** | 要約（命令形で書く・末尾にピリオド不要） | `add login page`, `fix typo in README` |
| **body** | （任意）詳細な説明（理由・背景・影響など） | `Refactored the logic to improve readability.` |
| **footer** | （任意）チケット番号・Breaking Changeなど | `Closes #123`, `BREAKING CHANGE: removed old API` |

### 5-3. よく使う type 一覧（Conventional Commits 準拠）

| type | 意味 |
|------|------|
| **feat** | 新機能の追加 |
| **fix** | バグ修正 |
| **docs** | ドキュメントの変更のみ |
| **style** | コードの意味に影響しない変更（空白、フォーマットなど） |
| **refactor** | 機能追加・修正を伴わないリファクタリング |
| **perf** | パフォーマンス改善 |
| **test** | テストコードの追加・修正 |
| **build** | ビルドシステム・依存関係に関する変更 |
| **ci** | CI設定・スクリプトに関する変更 |
| **chore** | その他（設定ファイルやツール関連など） |
| **revert** | コミットの取り消し |

### 5-4. コミットメッセージの例

```bash
feat(auth): add login form and validation
```

```bash
fix(api): correct wrong endpoint in attendance API
```

```bash
docs(readme): update setup instructions for Windows users
```

```bash
refactor(payroll): extract calculation logic into utils
```

```bash
chore: update dependencies and format code
```

### 5-5. 推奨される運用

- **1コミット1目的**にする（「複数の変更を1コミット」にしない）
- **タイトルは50文字以内、本文は72文字折り返し**

---

## 6. SourceTreeでコミット

1. SourceTreeの下部にある「**コミットメッセージ**」欄に、上記のルールに従ってコミットメッセージを入力
   - 簡潔な場合は1行目のみでOK
   - 詳細な説明が必要な場合は、1行目を空けて2行目以降に本文を記入
2. 「**コミット**」ボタンをクリック
3. コミットが完了すると、コミット履歴に新しいコミットが表示されます

---

## 7. SourceTreeでプッシュ（push）

1. SourceTreeの上部にある「**プッシュ**」ボタンをクリック
2. プッシュオプションを確認：
   - **リモート**: `origin`
   - **ブランチ**: 現在のブランチ（例：`dev/m.yonezawa/241225-00`）
3. 「**OK**」または「**プッシュ**」をクリック
4. 初回プッシュ時や、新しいブランチの場合、リモートにブランチを作成するか確認されます
   - 「**OK**」をクリックしてリモートにブランチを作成

---

## 8. プッシュの確認

### 8-1. SourceTreeでの確認

- プッシュが正常に完了すると、リモートのブランチに反映されます
- ブランチ一覧でリモートブランチ（`origin/dev/m.yonezawa/241225-00`など）が表示されることを確認

### 8-2. GitHub上での確認

push後、GitHubのリポジトリページで変更が反映されているか確認してください。

- リポジトリURL: `https://github.com/mshrynzw/aurawork`
- コミット履歴は「**Commits**」タブで確認できます
- ブランチは「**Branches**」タブで確認できます

---

## 補足：最新の変更を取得する（pull）

GitHubから最新のソースファイルをダウンロードしたい場合は、以下の手順で行います：

### SourceTreeでpull

1. SourceTreeの上部にある「**プル**」ボタンをクリック
2. 「**OK**」をクリック
3. 最新の変更がローカルに取得されます

### コマンドラインでpull

```bash
# masterブランチの最新を取得
git pull origin master

# 現在のブランチの最新を取得
git pull origin <ブランチ名>
```

---

## 参考資料

- [Conventional Commits](https://www.conventionalcommits.org/)
- [開発ガイドライン.md](../開発ガイドライン.md)
- [GitHubからcloneする時.md](GitHubからcloneする時.md)


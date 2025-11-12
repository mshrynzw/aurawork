# Git関連のコマンド

## NASからダウンロードする（pullする）

```bash
git pull origin master
```

## ステージングしたファイルの確認

```bash
git status
```

## コミットしたファイルの確認

```bash
git ls-tree --name-only -r HEAD
```

## 一時退避用コマンド → pullする時にコンフリクトするファイルがある場合
```bash
git stash
```

## stash（退避）したファイルを元に戻す
```bash
git stash pop
```

## クローンを作る
```bash
git clone //192.168.0.199/240701_給与計算_240930/src
```

# その他のコマンド

## 変更したファイルを確認する

```bash
git diff --name-only --cached
```

## 変更のログを確認する

```bash
git log --name-only
```

## ヘルプコマンド

```bash
git --help
```

# （以下のコマンドは使わないこと）

## 個別にファイルをステージングする

```bash
git add ファイルパス
```

## 全ファイルを一括でステージングする

```bash
git add -A
```

## コミットする

```bash
git commit -m "変更内容の説明"
```

## NASに送信する（pushする）

```bash
git push origin master
```

## VSCODEをGitに追加
```bash
git config --global core.editor "code --wait"
```

# キノコのポートフォリオ（Astro + TypeScript）

## はじめに動かしてみよう

Node.js（18以上）が入っていればOK。このフォルダでターミナルを開いて：

```bash
npm install      # 最初の1回だけ。必要な部品をダウンロードする
npm run dev      # 開発用サーバーが起動 → http://localhost:4321 を開く
```

ファイルを保存すると、ブラウザが自動で更新されるよ。

公開用のファイルを作るときは：

```bash
npm run build    # 型チェック → dist/ フォルダに完成版が出力される
```

## どこを編集すればいい？

| やりたいこと | 編集するファイル |
| --- | --- |
| 実績を追加・編集する | `src/data/works.ts` |
| 自己紹介・できること・料金・流れを変える | `src/data/profile.ts` |
| 実績の画像を追加する | `public/images/works/` に置いて、works.ts の `image` に `/images/works/ファイル名` を書く |
| AIデザインのサンプルを追加する | 画像を `public/images/ai/` に置いて、`src/data/aiSamples.ts` に書く |
| 色やフォントを変える | `src/styles/global.css` の一番上（`:root` の中） |

### 実績の追加方法

`src/data/works.ts` の配列に、こんな形で1件足すだけ：

```ts
{
  slug: 'new-lp',              // 英数字とハイフン
  title: '〇〇のLP',
  client: '株式会社〇〇',
  category: 'lp',              // 'lp' | 'site' | 'dev'
  summary: '一言説明',
  period: '2週間',
  role: ['デザイン', 'コーディング'],
  tech: ['HTML', 'CSS', 'TypeScript'],
  image: '/images/works/new-lp.webp',   // 非公開案件なら書かない
  url: 'https://example.com',           // 無ければ書かない
  challenge: '依頼時の課題',
  approach: '工夫したこと',
  result: '結果',
},
```

- `confidential: true` をつけると「非公開案件」のカードになるよ（画像なしでOK）
- `featured: true` をつけると一覧の先頭に出るよ
- 項目を書き間違えると `npm run build` の型チェックで教えてくれる。これがTypeScriptのいいところ！

### AIデザインのサンプルの画像を撮る（自動スクリーンショット）

Figma Make のLPを、上から下まで丸ごと撮って `public/images/ai/` に保存するスクリプトを用意してあるよ。

**最初の1回だけ**、このフォルダでブラウザをインストールしておく：

```bash
npm install
npx playwright install chromium
```

**LPごとに**、次の2ステップ：

1. Figma Make からダウンロードしたプロジェクトのフォルダで、LPを起動する
   ```bash
   npm install      # 最初の1回だけ
   npm run dev      # http://localhost:8443 で表示される
   ```
2. **起動したまま**、別のターミナルでこのポートフォリオのフォルダに移動して撮影する
   ```bash
   npm run capture -- recruit http://localhost:8443   # 工務店
   npm run capture -- beauty http://localhost:8443    # ヘアサロン
   npm run capture -- cafe http://localhost:8443      # カフェ
   ```
   ※ 1つ撮り終わったら、LPの方は `Ctrl + C` で止めて、次のLPを起動してね

PC版（横幅1440px）とスマホ版（横幅390px）の2枚が保存されて、`npm run dev` で確認するとポートフォリオに表示されるよ。
画像ファイルが無いサンプルは、公開用のビルドでは自動で隠れるから安心してね。

### AIデザインのサンプルを増やすとき

`src/data/aiSamples.ts` に1件追加して、`slug` と同じ名前で `npm run capture` すればOK。
`note` には「AIの案から自分で調整したところ」を書こう。

## 公開前のチェックリスト

- [ ] `【記入】` になっている文章を全部書き換えた（詳細画面で黄色い点線の枠になってるところ）
- [ ] `src/data/profile.ts` のメールアドレスと料金を設定した
- [ ] 各実績について、クライアントに掲載OKをもらった
- [ ] AIデザインのサンプルに使ったツールの規約で、商用利用・掲載がOKか確認した
- [ ] 非公開案件は、書いていい範囲を契約元・会社に確認した
- [ ] TAKA-Q の特集ページなど、リンク先がまだ公開中か確認した

## GitHub Pages で無料公開する方法

このフォルダには、GitHub に push するだけで自動で公開される設定（`.github/workflows/deploy.yml`）が入っているよ。

### よくある勘違い（ここが大事！）

- **「index.html が無いと公開できない」** → 公開されるのは、`npm run build` で作られる `dist/` の中身（`index.html` も入ってる）。この設定が、ビルドから公開まで自動でやってくれるから、自分で index.html を用意しなくてOK
- **「ファイルが多すぎて上げられない」** → このフォルダ自体は数十ファイルしかないよ。多いのは `node_modules`（数千ファイル）で、これは**アップしないもの**（`.gitignore` で自動的に除外される）。ブラウザへのドラッグ＆ドロップではなく、`git push` か GitHub Desktop を使うのがおすすめ

### 0. 先に決めておくこと

- **GitHubのユーザー名は、公開URLにそのまま入る**（`https://ユーザー名.github.io/...`）。本名がわかるユーザー名は避けて、ニックネームのアカウントで作ろう
- **無料プランでは、リポジトリは Public（公開）にする必要がある**。ソースコードも誰でも見られる状態になる
- **リポジトリ名でURLが変わる**
  - `ユーザー名.github.io` という名前にする → `https://ユーザー名.github.io/`（短くておすすめ。1アカウントに1つだけ）
  - それ以外の名前（例：`portfolio`）にする → `https://ユーザー名.github.io/portfolio/`
  - どちらでも、設定は自動で切り替わるよ

### 1. リポジトリを作る

GitHub で **New repository** → 名前を決めて **Public** を選ぶ。README などのチェックは**すべて外したまま**で作成。

### 2. コミットする名前とメールを設定する（push の前に！）

コミットには「名前」と「メール」が記録されて、公開リポジトリでは誰でも見られる。

GitHub の Settings → Emails で **Keep my email addresses private** にチェックを入れて、表示される `ID+ユーザー名@users.noreply.github.com` をコピーしておく。

```bash
cd portfolio-astro
git init -b main
git config user.name "ニックネーム"
git config user.email "ID+ユーザー名@users.noreply.github.com"
```

### 3. push する

```bash
git add .
git commit -m "ポートフォリオを追加"
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

ターミナルが不安なら、**GitHub Desktop**（無料アプリ）でもできるよ。フォルダを追加して、「Publish repository」を押せばOK。名前とメールは、Preferences の Git で同じように設定してね。

### 4. Pages を有効にする

1. リポジトリの **Settings → Pages** を開く
2. **Source** を **GitHub Actions** にする
3. **Actions** タブで `Deploy to GitHub Pages` が緑のチェックになるのを待つ（2〜3分）
4. 完了すると、Pages の画面に公開URLが表示される

以降は、`main` に push するたびに自動で更新されるよ。

### うまくいかないとき

| 症状 | 対処 |
| --- | --- |
| Actions が赤くなる | 失敗したステップをクリックして、ログをそのまま教えてね |
| 画面が真っ白／404 | Settings → Pages の Source が「GitHub Actions」になっているか確認 |
| 画像が出ない | リポジトリ名を変えたあとは、もう一度 push して再ビルドする |

> 補足：GitHub Pages は、オンラインで商売をするサイトや、決済を扱うサイトの無料ホスティングには使えないルールになっているよ。ポートフォリオ（実績の紹介）は一般的な使い方だけど、不安なときは公式のGitHub Pagesの利用ルールを確認してね。

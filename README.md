# Panda Factory

Gonsakuの3DCGアニメーション、Blenderツール開発、リギング、技術実験をまとめる個人サイト。

Semantic HTML / CSS / Vanilla JavaScriptによる静的構成です。配信時にNode.js、npm、フレームワーク、サーバー処理は不要です。共有レイアウトを保守しやすくするため、Python標準ライブラリだけの生成スクリプトを用意し、生成済みHTMLもGitに保存しています。

## ローカル表示

リポジトリのルートで実行します（Python 3.10以上）。

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

ブラウザーで `http://127.0.0.1:8000/` を開きます。停止はCtrl+C。ビルドせず、コミット済みファイルで表示できます。

## 編集

- コンテンツ、プロジェクト情報、共有ヘッダー・フッター: `tools/build_site.py`
- デザインとレスポンシブ: `assets/site.css`
- モバイルナビゲーション: `assets/site.js`
- オリジナルKV: `assets/KV.png`（変更禁止）
- 元の指示書: `docs/renewal-brief.md`
- 作業ルール: `AGENTS.md`

コンテンツを編集したら、以下を実行し、生成されたHTMLも一緒にコミットします。

CSSを更新して既存のブラウザーキャッシュも更新したい場合は、`tools/build_site.py` の `CSS_VERSION` を変更してから再生成します。

```powershell
python tools/build_site.py
python tools/check_site.py
```

ページは `/`、`/projects/`、`/works/`、`/lab/`、`/about/` の5つ。HTMLはJavaScriptなしでも読めます。JavaScriptが無効の場合、モバイルのナビゲーションを直接表示します。

HomeのDesktop Heroは画面の高さに収め、KV全体を切り取らずに表示します。キャッチコピーとCTAはHero下部の透過グラデーション上に配置しています。HomeのHeaderは初期表示で半透明グラデーション、スクロール後に黒背景へ切り替わります。検証記録は `docs/verification.md` を参照してください。

ワイド画面の余白には、同じKVをCSS背景としてぼかして配置しています。中央の画像は変更せず、ぼかし・明るさの調整は `.hero::before`、暗いオーバーレイは `.hero::after` で管理します。PCの下側グラデーションは `.hero-catch-gradient` でViewport全幅に表示し、CTAより背面に置きます。モバイルでは無効化し、ボタンの黄色に重ならない構成です。

プロジェクトの名称・説明・リポジトリ等は `PROJECTS` にまとめています。確認できた情報だけを追加してください。状態・バージョン・配布先が未確認なら `None` とします。GitHubリンクとPanda Tool v0.6.0のリリースは2026-10-02にGitHub APIおよび公式READMEで確認しました。Mixamo Rig Kai / PandaLipのリリース状態は断定していません。

## GitHub Pages公開

2026-10-02時点のGitHub API確認結果: **`master` ブランチの `/`（ルート）を公開**。リポジトリのデフォルト公開設定に合わせ、ブランチを改名していません。

1. ローカルで再生成・検証し、変更をレビューします。
2. 変更をコミットし、`master` に反映・pushします。
3. GitHubのSettings → Pagesで `Deploy from a branch`、`master`、`/ (root)` を確認します。
4. Pagesのデプロイ完了後、`https://sill-bill.github.io/` と各下層ページを確認します。

`.nojekyll` により静的ファイルをそのまま配信します。公開先のURLを変更する場合は `tools/build_site.py` の `ORIGIN`、`robots.txt`、`sitemap.xml` を更新します。CSS・JS・内部リンクは相対パスです。

公開サイトの更新は、上記の `master` へのpushによって行います。

## 旧サイトの保存・復元

旧サイトのHEAD（`a2cdc83`）を **`legacy-falcon-works`** という注釈付きタグで保存してから置き換えました。既存履歴は保持しています。リモートへの保存には以下のコマンドを使います。

```powershell
git push origin legacy-falcon-works
```

旧サイトを別フォルダーに取り出す例（新サイトの作業ツリーは保持します）:

```powershell
git worktree add ../falcon-works-legacy legacy-falcon-works
```

旧サイトを再度本番にする場合は、その内容を新しい復元コミットとして反映します。履歴のrewriteやforce pushは不要です。

## 検証

`python tools/check_site.py` は全HTMLのローカルリンク・アンカー・画像参照・主要ランドマーク・KV寸法を検証します。

ブラウザーで確認する項目:

- 360 / 390 / 768 / 1024 / 1440 / 1920pxでの表示と横はみ出し
- KV全体が表示され、画像上のタイトルとパンダが欠けないこと
- モバイルメニューのEnter・Tab・Shift+Tab・Escape・フォーカス復帰
- 下層ページとCTAの遷移
- JavaScript無効時のナビゲーション
- `prefers-reduced-motion`、コンソールエラー、リソースの404

外部リポジトリに依存する情報は、公開前に最新の状態を再確認してください。

## 今後の掲載内容

- Works: 公開可能な作品画像・映像と制作情報
- Lab: 実験の記録・検証記事
- Panda Key Offset: 確認済みの機能紹介・状態・配布先

架空の作品、スクリーンショット、実績、公開状態を補ってはいません。

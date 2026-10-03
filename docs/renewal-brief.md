# Panda Factory Web Site Renewal 指示書

## 0. この依頼のゴール

`sill-bill.github.io` を、既存サイトの改修ではなく **「Panda Factory」ブランドの新しい公式サイトとしてゼロから再構築**してください。

既存コンテンツ、既存HTML/CSS/JavaScript、過去のページ構成との互換性は原則不要です。古いサイトを継ぎ足すのではなく、新築として設計してください。

ただし、作業前に現在の状態をGitで復元できるよう退避してください。履歴そのものは失わないでください。

---

## 1. ブランド / コンセプト

### Site Name

**Panda Factory**

### Owner

**Gonsaku**

### Role

**3DCG Animator / Tool Developer**

### Theme

個人の3DCG制作、Blenderツール開発、Rigging、Animation、Unity、Shader / Toon Rendering、技術実験をまとめるポートフォリオ兼プロジェクトサイト。

「架空のCG開発工場 / 研究室 / 個人スタジオ」を感じさせる世界観を持たせる。

### Keywords

- Panda
- Factory
- 3DCG
- Animation
- Blender
- Rigging
- Tools
- Experiments
- Cozy workshop
- Industrial design
- Cute furry character

---

## 2. 最重要ビジュアル

同梱の `KV.png` をトップページのキービジュアルとして使用してください。

### KVの扱い

- **KV.pngの画像内容そのものは編集しないこと。**
- 色調変更、トリミング書き出し、文字消去、文字追加、画像生成による差し替えは禁止。
- Web表示上のCSSによるレスポンシブ配置は可。
- KV内にすでに大きな `PANDA FACTORY` タイトル、`TOOLS / ANIMATION / EXPERIMENTS`、`Built by Gonsaku` が含まれている。
- そのため、同じ大見出しをHTMLで重ねて二重表示しない。
- グローバルナビゲーションやCTAは画像には含めず、**Web UIとしてHTML/CSS側で配置**する。

### Heroの狙い

ページを開いた瞬間にKVを「バーン」と見せる。

Desktopではファーストビューの主役として大胆に表示すること。

ただしKVには左側のタイトルと中央付近のパンダの両方が重要情報として存在するため、レスポンシブで無理に `object-fit: cover` して重要部分を大きく切らないこと。

おすすめ方針:

- Desktop: 横幅いっぱいに大きく表示。画面高さに合わせたHeroでも可。
- Tablet: 全体が極端に欠けない範囲で調整。
- Mobile: 画像全体を認識できる比率を優先。必要ならHeroを縦に拡張し、画像を上部に置いてUIを別レイヤー / 別領域に逃がす。
- Mobileで左タイトルやパンダの顔が消えるような強いクロップは禁止。

---

## 3. デザイン方向

### 基本カラー

KVから拾った世界観をサイト全体へ展開する。

- Deep Black / Charcoal: `#141113` 前後
- Warm White: `#F5F1E9` 前後
- Panda Yellow: `#FFD400` 前後
- Warm Orange: `#F28B45` 前後
- Twilight Purple: `#403459` 前後

厳密な固定値ではなく、KVとの馴染みを優先して微調整してよい。

### トーン

- かわいいが子供向けではない
- ケモノ / パンダの愛嬌
- 3DCG制作現場らしい技術感
- 工業デザイン
- 温かい個人工房
- 黄昏時の落ち着いた色
- 過剰なCyberpunk HUDは避ける
- UIはモダンで読みやすく

### UIモチーフ

- Yellowの細いライン
- Industrial label
- Status chip
- Version label
- Grid
- Subtle border
- Section number
- Technical caption

装飾は少量に留め、KVを主役にする。

---

## 4. グローバルナビゲーション

KV画像内にはナビゲーションを焼き込まない。HTML UIとして実装する。

### Desktop

左:

- PANDA FACTORY または簡潔なロゴ表現

右:

- PROJECTS
- WORKS
- LAB
- ABOUT
- GITHUB

Hero上に重ねてもよいが、背景とのコントラストを確保すること。

### Mobile

- Compact Header
- Hamburger Menu
- キーボード操作可能
- Escで閉じられる
- Focus管理を行う

---

## 5. Hero CTA

KV画像からはCTAを削除済み。CTAはWeb UIとして実装する。

候補:

**EXPLORE PROJECTS**

Heroの右下付近、またはHero直下に配置してよい。

ただしKV内のパンダ、モニター、タイトルを隠さない位置を選ぶこと。

Yellowをアクセントにした明快なボタンとする。

---

## 6. トップページ構成

推奨順序:

1. Global Header
2. Hero / KV
3. Selected Projects
4. What I Do / Capabilities
5. Works Preview
6. Lab / Experiments Preview
7. About Preview
8. Footer

Hero直下は黒〜チャコールの背景に切り替え、KVの情報量から一度目を休ませる。

---

## 7. Selected Projects

主要プロジェクトをカード形式で掲載する。

初期候補:

### Panda Tool

Blender Utility Extension

### Mixamo Rig Kai

Character Rigging / Animation Workflow Tool

### PandaLip

LipSync Analysis / Blender Integration

### Panda Key Offset

Animation Utility

### Cardで表示したい情報

- Project Name
- Short Description
- Category
- Status
- Version (確認可能な場合のみ)
- Details
- GitHub / Repository link (確認可能な場合のみ)

### Status

以下のような表現を想定:

- RELEASED
- DEVELOPING
- EXPERIMENT

未確認情報を推測して埋めないこと。

---

## 8. ページ構成

最初の完成形として以下を想定。

- `/` Home
- `/projects/` Projects
- `/works/` Works
- `/lab/` Lab
- `/about/` About

必要であればプロジェクト詳細を将来追加しやすい構造にする。

例:

- `/projects/panda-tool/`
- `/projects/mixamo-rig-kai/`
- `/projects/pandalip/`

ただし初回実装時に中身の薄いページを大量生成する必要はない。

---

## 9. About

基本プロフィール:

- Gonsaku
- 3DCG Animator / Tool Developer

主要分野:

- 3DCG Animation
- Blender
- MotionBuilder
- Unity
- Rigging
- Tool Development
- Toon Rendering

旧サイト名として `Falcon-Works` を使っていた時期があるため、Aboutの片隅に以下のような小さな履歴を入れてよい。

`Falcon-Works → Panda Factory`

過去サイトのデザインを再現する必要はない。

---

## 10. 技術方針

ホスティングは **GitHub Pages**。

この規模では、巨大なFrameworkを必要なく導入しない。

### 第一候補

- Semantic HTML
- Modern CSS
- Vanilla JavaScript

これで十分実現できる場合はこの構成を優先。

### Frameworkを使う場合

既存リポジトリの事情や保守性の観点で明確な利点がある場合のみ採用可。

採用理由をREADMEまたはコミットメッセージで明確にすること。

### 基本要件

- GitHub Pagesで正常配信
- Responsive
- Semantic HTML
- Accessibility
- SEO基本対応
- Performanceを意識
- 画像に適切なaltまたは装飾扱いを設定
- `prefers-reduced-motion` 対応
- JS無効時でも主要情報へアクセス可能な設計を優先
- Console errorを残さない

---

## 11. Motion / Interaction

演出は控えめに。

OK:

- Headerの軽いfade
- Card hover
- Section reveal
- Yellow lineの短いアニメーション
- Heroから下へ誘導するスクロールサイン

避ける:

- 派手な3Dパララックス
- KVを常時大きく動かす演出
- 読み込みの重い背景WebGL
- 操作を妨げるアニメーション
- 過剰なGlitch

KV自体が情報量豊富なので、UI側は静かに支える。

---

## 12. Git作業

### 作業開始前

現在のmainを復元可能な形で保存する。

推奨例:

- `legacy-falcon-works` タグ
- または `archive/legacy-site` ブランチ

既存履歴をrewrite / force-deleteしない。

その後、mainをPanda Factoryとして再構築してよい。

### 重要

既存サイトファイルの削除は許可する。

ただし `.git`、Git履歴、リポジトリ設定、GitHub Pages公開に必要な設定を不用意に壊さない。

---

## 13. 実装の進め方

1. リポジトリを確認
2. 現行サイトをGitで退避
3. 現状の配信方式を確認
4. 新サイトの最小構成を設計
5. HomeのHero + Headerを実装
6. Selected Projectsを実装
7. 下層ページの骨格を実装
8. Responsive調整
9. Accessibility確認
10. GitHub Pages想定でbuild / preview / link確認
11. READMEを更新
12. 最終変更内容と確認項目をまとめる

途中で古いデザインへ寄せる必要はない。

---

## 14. 完了条件

最低限、以下を満たしたら初回リニューアル完了とする。

- Panda Factoryとして新しいトップページが成立している
- `KV.png` が主役として表示される
- Global NavigationがWeb UIとして実装されている
- CTAがWeb UIとして実装されている
- Selected Projectsが表示される
- Mobile / Tablet / Desktopで重大な崩れがない
- GitHub Pagesで配信可能
- 既存サイトへ戻せるGit退避がある
- KV.png自体が変更されていない
- Consoleに重大エラーがない
- READMEに起動 / 編集 / デプロイ方法がある

---

## 15. 実装上の判断基準

迷った場合は以下の順に優先する。

1. KVを最も美しく見せる
2. 読みやすさ
3. Panda Factoryらしい世界観
4. 保守しやすさ
5. 軽さ
6. 装飾

サイトの主役は派手なUIではなく、**作品 / ツール / Panda Factoryの世界観**です。

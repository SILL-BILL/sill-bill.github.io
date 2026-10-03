"""Render the committed static pages. Python standard library only."""
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GITHUB = "https://github.com/SILL-BILL"
ORIGIN = "https://sill-bill.github.io"
CSS_VERSION = "20261003-catch-restore"

PROJECTS = [
    dict(id="panda-tool", name="Panda Tool", category="BLENDER UTILITY EXTENSION",
         description="アニメーションとリギングのための、実用的なBlenderユーティリティ。制作中の小さな手間を減らすツール集。",
         status="RELEASED", version="v0.6.0", repo="panda-tool-blender", icon="tool",
         detail="Panda Apply Modifierは、シェイプキーを持つメッシュへのモディファイアー適用を支援します。元のオブジェクトを置き換える前にトポロジーを検証し、シェイプキーや関連データを保持する設計です。",
         release="https://github.com/SILL-BILL/panda-tool-blender/releases/tag/v0.6.0"),
    dict(id="mixamo-rig-kai", name="Mixamo Rig Kai", category="CHARACTER RIGGING / ANIMATION",
         description="MixamoのキャラクターをBlenderで扱うためのリギング・アニメーションワークフロー。",
         status=None, version=None, repo="mixamo-rig-kai", icon="rig",
         detail="AdobeのMixamo Blenderプラグインをベースとするプロジェクト。Blenderのバージョンごとの利用案内は、リポジトリのREADMEをご確認ください。"),
    dict(id="pandalip", name="PandaLip", category="LIPSYNC / BLENDER INTEGRATION",
         description="音声解析からBlenderへ。リップシンクのデータを、キャラクターの口の動きにつなぐワークフロー。",
         status=None, version=None, repo="panda-lip-blender", icon="lip",
         detail="Panda Lipで解析・書き出した.pandalipファイルをBlenderに取り込み、AIUEOコントローラーのアニメーションを生成。任意のメッシュのシェイプキーへ接続できます。特定のリグやシェイプキー名を前提としません。",
         extra_repo="panda-lip"),
    dict(id="panda-key-offset", name="Panda Key Offset", category="ANIMATION UTILITY",
         description="アニメーション制作のためのユーティリティ。機能紹介と配布情報は準備中です。",
         status=None, version=None, repo=None, icon="offset",
         detail="制作ツールのひとつとして、紹介を準備しています。公開できる機能説明や配布先が整い次第、このページでご案内します。"),
]

ICONS = {
    "tool": '<path d="M10 17h28v25H10zM16 17v-6h16v6M10 27h28M20 25v5h8v-5"/>',
    "rig": '<circle cx="24" cy="9" r="4"/><path d="M24 13v18M9 22l15-5 15 5M24 31l-11 12M24 31l11 12"/><circle cx="9" cy="22" r="2"/><circle cx="39" cy="22" r="2"/><circle cx="24" cy="31" r="2"/>',
    "lip": '<path d="M5 24h3l4-9 5 19 6-27 6 33 5-23 4 7h5"/>',
    "offset": '<path d="M7 36h34M13 10v26M25 10v26M37 10v26"/><path d="M9 20l4-4 4 4-4 4zM21 26l4-4 4 4-4 4zM33 17l4-4 4 4-4 4z"/>',
}


def symbol(kind):
    return f'<svg class="project-symbol" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS[kind]}</svg>'


def wordmark(prefix):
    return f'''<a class="brand" href="{prefix}" aria-label="Panda Factory ホーム">
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M3 28V15l8 5v-8l8 5V9h5V3h3v6h2v19H3Zm5-5v3h3v-3H8Zm8 0v3h3v-3h-3Zm8 0v3h3v-3h-3Z"/></svg>
    <span>PANDA FACTORY<small>GONSAKU'S CREATIVE WORKSHOP</small></span></a>'''


def text_link(url, label):
    return f'<a class="text-link" href="{escape(url, quote=True)}">{label}<span class="arrow" aria-hidden="true">↗</span></a>'


def chip(project):
    if project["status"]:
        return f'<span class="chip released">{project["status"]}</span>'
    return '<span class="chip">紹介準備中</span>' if not project["repo"] else ''


def cards(prefix):
    result = []
    for i, p in enumerate(PROJECTS, 1):
        result.append(f'''<article class="project-card">
          <div class="card-top"><span class="project-number mono">PF / {i:02}</span>{chip(p)}</div>
          {symbol(p['icon'])}<h3>{p['name']}</h3><p class="project-category mono">{p['category']}</p>
          <p class="project-description">{p['description']}</p>
          <div class="card-bottom">{text_link(prefix + 'projects/#' + p['id'], p['name'] + ' DETAILS')}
          <span class="card-version mono">{p['version'] or ''}</span></div></article>''')
    return '<div class="project-grid">' + ''.join(result) + '</div>'


def capabilities():
    return '''<div class="capability-grid">
      <article class="capability"><span class="eyebrow">01 / MAKE IT MOVE</span><h3>Animation &amp; Rigging</h3>
      <p>ポーズ、動き、表情。キャラクターの魅力を引き出す3DCGアニメーションと、その動きを支えるリグ。</p><div class="tags"><span>Blender</span><span>MotionBuilder</span><span>Rigging</span></div></article>
      <article class="capability"><span class="eyebrow">02 / MAKE IT EASIER</span><h3>Tools &amp; Workflow</h3>
      <p>制作の中で感じた「こうできたら」を、小さなツールへ。日々の作業に寄り添うBlenderツールの開発。</p><div class="tags"><span>Blender Extensions</span><span>Tool Development</span></div></article>
      <article class="capability"><span class="eyebrow">03 / TRY SOMETHING NEW</span><h3>Look &amp; Experiments</h3>
      <p>トゥーン表現、シェーダー、リアルタイムの見え方。手を動かしながら、新しい表現を探る実験。</p><div class="tags"><span>Unity</span><span>Shaders</span><span>Toon Rendering</span></div></article>
    </div>'''


def home():
    return f'''<section class="hero" aria-labelledby="home-title">
      <h1 id="home-title">Panda Factory — Gonsaku's creative workshop</h1>
      <img src="./assets/KV.png" width="1672" height="941" fetchpriority="high" alt="Panda Factory。黄昏のCG工房でパンダがくつろぎ、モニターにキャラクター制作画面が並ぶ。Tools / Animation / Experiments — Built by Gonsaku。">
      <div class="hero-catch-gradient" aria-hidden="true"></div>
      <div class="hero-footer"><div class="wrap hero-footer-inner">
      <div class="hero-note"><span class="indicator" aria-hidden="true"></span><div><p class="eyebrow">A SMALL WORKSHOP. A WORLD OF IDEAS.</p><p>つくる。動かす。ちょっと便利にする。</p></div></div>
      <a class="button" href="#selected-projects">EXPLORE PROJECTS<span class="arrow" aria-hidden="true">↘</span></a>
      </div></div>
    </section>
    <section class="section wrap" id="selected-projects" aria-labelledby="projects-title">
      <div class="section-head"><div><span class="eyebrow">01 / FROM THE WORKSHOP</span><h2 id="projects-title">Selected Projects</h2></div>{text_link('./projects/', 'ALL PROJECTS')}</div>
      <p class="intro">制作から生まれた、小さな道具たち。<br>Blenderのツールと、キャラクターアニメーションのためのワークフロー。</p>
      {cards('./')}
    </section>
    <section class="section capabilities" aria-labelledby="capabilities-title"><div class="wrap">
      <div class="section-head"><div><span class="eyebrow">02 / WHAT I DO</span><h2 id="capabilities-title">Ideas into motion.</h2></div></div>{capabilities()}
    </div></section>
    <div class="section wrap split-grid">
      <section class="preview-panel" aria-labelledby="works-title"><span class="eyebrow">03 / CREATIVE OUTPUT</span><h2 id="works-title">Works</h2>
      <p>キャラクターの動きと、表情のあるルック。<br>3DCGアニメーションとリアルタイム表現の制作領域。</p>
      <a class="line-item" href="./works/#animation"><div><strong>Character Animation</strong><small>MOTION / EXPRESSION / RIGGING</small></div><span class="arrow" aria-hidden="true">↗</span></a>
      <a class="line-item" href="./works/#toon"><div><strong>Toon &amp; Real-time</strong><small>LOOK DEVELOPMENT / UNITY</small></div><span class="arrow" aria-hidden="true">↗</span></a>
      <p class="preview-note">作品サンプルは順次掲載予定です。</p>{text_link('./works/', 'EXPLORE WORKS')}</section>
      <section class="preview-panel" aria-labelledby="lab-title"><span class="eyebrow">04 / ON THE WORKBENCH</span><h2 id="lab-title">Lab &amp; Experiments</h2>
      <p>気になったことを、試してみる。<br>シェーダー、リグ、制作の仕組みを探る実験室。</p>
      <a class="line-item" href="./lab/#toon"><div><strong>Toon Rendering</strong><small>SHADER / LIGHT / STYLE</small></div><span class="arrow" aria-hidden="true">↗</span></a>
      <a class="line-item" href="./lab/#workflow"><div><strong>Animation Workflow</strong><small>RIGGING / TOOLS / BLENDER</small></div><span class="arrow" aria-hidden="true">↗</span></a>
      <p class="preview-note">公開リポジトリと、これから掘り下げたいテーマ。</p>{text_link('./lab/', 'VISIT THE LAB')}</section>
    </div>
    <section class="about-strip" aria-labelledby="about-title"><div class="wrap about-inner"><div><span class="eyebrow">05 / THE PERSON BEHIND IT</span><h2 id="about-title">Gonsaku</h2><p class="mono">3DCG Animator / Tool Developer</p></div>
      <p>キャラクターを動かすこと。<br>つくる時間を、少し心地よくすること。<br>そんな制作と実験を、この工房から。</p>{text_link('./about/', 'ABOUT THE FACTORY')}</div></section>'''


def project_page():
    items = []
    for p in PROJECTS:
        facts = []
        if p['repo']:
            facts.append(text_link(GITHUB + '/' + p['repo'], 'GITHUB / ' + p['name']))
        if p.get('extra_repo'):
            facts.append(text_link(GITHUB + '/' + p['extra_repo'], 'PANDA LIP / ANALYSIS'))
        if p.get('release'):
            facts.append(text_link(p['release'], 'RELEASE ' + p['version']))
        if not facts:
            facts.append('<span>機能紹介・配布情報は準備中です。</span>')
        items.append(f'''<article class="project-detail" id="{p['id']}">
        <div class="detail-heading"><h2>{p['name']}</h2>{chip(p)}</div><p class="detail-category mono">{p['category']}</p>
        <p>{p['description']}</p><details><summary>{p['name']}について</summary><p>{p['detail']}</p></details>
        <div class="detail-facts">{''.join(facts)}</div></article>''')
    return ''.join(items) + '<p class="sources-note">公開情報の確認日: 2026-10-02。対応環境・導入手順・最新バージョンは各リポジトリをご確認ください。</p>'


def works_page():
    return '''<div class="feature-grid">
    <article class="feature-card" id="animation"><div class="feature-mark mono" aria-hidden="true">01 /</div><h2>Character Animation</h2><p>キャラクターの個性を、ポーズと動きで伝える。3DCGアニメーションと表情づくりを中心とした制作領域。</p><div class="tags"><span>Blender</span><span>MotionBuilder</span></div></article>
    <article class="feature-card"><div class="feature-mark mono" aria-hidden="true">02 /</div><h2>Rigging</h2><p>動かしやすさと表現の幅を支える、キャラクターの仕組み。アニメーション制作につながるリギング。</p><div class="tags"><span>Character Rig</span><span>Animation Workflow</span></div></article>
    <article class="feature-card" id="toon"><div class="feature-mark mono" aria-hidden="true">03 /</div><h2>Toon &amp; Real-time</h2><p>色、光、輪郭でつくるキャラクターの見え方。Unityとシェーダーを使った、トゥーン表現の探究。</p><div class="tags"><span>Unity</span><span>Toon Rendering</span></div></article>
    </div><aside class="notice"><h2>作品サンプルについて</h2><p>このページでは制作領域をご紹介しています。画像や映像を含む個別の作品は、公開準備が整い次第掲載します。</p></aside>'''


def lab_page():
    return f'''<div class="feature-grid">
    <article class="feature-card" id="toon"><div class="feature-mark mono" aria-hidden="true">T /</div><h2>Toon Rendering</h2><p>キャラクターの印象を決める、光と色と輪郭。トゥーンシェーダーを入り口に、表現の仕組みを探ります。</p>{text_link(GITHUB + '/Panda-Toon-Shader', 'PANDA TOON SHADER')}</article>
    <article class="feature-card" id="workflow"><div class="feature-mark mono" aria-hidden="true">R /</div><h2>Animation Workflow</h2><p>リグからアニメーションへ。キャラクター制作の流れを、道具と仕組みの両面から考えるテーマ。</p>{text_link('../projects/#mixamo-rig-kai', 'RIGGING PROJECT')}</article>
    <article class="feature-card" id="lipsync"><div class="feature-mark mono" aria-hidden="true">L /</div><h2>Voice into Motion</h2><p>音声から口の動きへ。解析結果とキャラクターの表情をつなぐ、リップシンクのワークフロー。</p>{text_link('../projects/#pandalip', 'PANDALIP PROJECT')}</article>
    </div><aside class="notice"><h2>工房の実験ノート</h2><p>公開リポジトリと研究テーマをご紹介しています。検証の過程や技術記事は、順次この場所にまとめていきます。</p></aside>'''


def about_page():
    return f'''<div class="bio-grid"><section aria-labelledby="gonsaku-title"><span class="eyebrow">THE PERSON BEHIND THE FACTORY</span><h2 id="gonsaku-title">Gonsaku</h2>
    <p class="bio-role mono">3DCG Animator / Tool Developer</p><p>キャラクターを動かし、制作を支える道具をつくる。Panda Factoryは、3DCGアニメーション、Blenderツール開発、技術実験をまとめる個人の工房です。</p>
    <p>制作の中で生まれたアイデアを試し、道具にして、次の制作へ。アニメーションと開発を行き来しながら、表現とワークフローを探っています。</p>
    {text_link(GITHUB, 'GITHUB / SILL-BILL')}<p class="history mono">Falcon-Works → Panda Factory</p></section>
    <dl class="bio-list"><div><dt>FOCUS</dt><dd>3DCG Animation / Rigging / Tool Development</dd></div><div><dt>WORKBENCH</dt><dd>Blender / MotionBuilder / Unity</dd></div><div><dt>EXPLORING</dt><dd>Shader / Toon Rendering / Animation Workflow</dd></div><div><dt>THIS PLACE</dt><dd>作品、制作ツール、技術実験をひとつの場所に。</dd></div></dl></div>'''


PAGES = {
    'home': dict(title='Panda Factory — Gonsaku | 3DCG Animation & Blender Tools', description='Gonsakuの3DCGアニメーション、Blenderツール開発、リギング、技術実験をまとめる個人の工房。', body=home),
    'projects': dict(title='Projects', description='制作から生まれたBlenderツールと、キャラクターアニメーションのワークフロー。', eyebrow='01 / FROM THE WORKSHOP', body=project_page),
    'works': dict(title='Works', description='キャラクターアニメーション、リギング、トゥーン表現。Panda Factoryの制作領域をご紹介。', eyebrow='02 / CREATIVE OUTPUT', body=works_page),
    'lab': dict(title='Lab & Experiments', description='気になったことを、試してみる。シェーダー、リグ、制作ツールを探る実験室。', eyebrow='03 / ON THE WORKBENCH', body=lab_page),
    'about': dict(title='About', description='Gonsaku — 3DCG Animator / Tool Developer。制作と実験をつなぐ、Panda Factoryについて。', eyebrow='04 / THE PERSON BEHIND IT', body=about_page),
}


def render(key, page):
    is_home = key == 'home'
    prefix = './' if is_home else '../'
    path = '/' if is_home else '/' + key + '/'
    title = page['title'] if is_home else page['title'] + ' — Panda Factory'
    nav = []
    for target in ('projects', 'works', 'lab', 'about'):
        current = ' aria-current="page"' if key == target else ''
        nav.append(f'<a class="nav-link" href="{prefix}{target}/"{current}>{target.upper()}</a>')
    nav.append(f'<a class="nav-link" href="{GITHUB}">GITHUB<span class="external" aria-hidden="true">↗</span></a>')
    body = page['body']()
    if not is_home:
        body = f'''<div class="page-heading"><div class="wrap"><span class="eyebrow">{page['eyebrow']}</span><h1 class="page-title">{escape(page['title'])}</h1><p>{page['description']}</p></div></div><div class="wrap page-content">{body}</div>'''
    return f'''<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{escape(title)}</title>
  <meta name="description" content="{escape(page['description'], quote=True)}">
  <meta name="theme-color" content="#141113">
  <link rel="canonical" href="{ORIGIN}{path}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Panda Factory">
  <meta property="og:title" content="{escape(title, quote=True)}">
  <meta property="og:description" content="{escape(page['description'], quote=True)}">
  <meta property="og:url" content="{ORIGIN}{path}">
  <meta property="og:image" content="{ORIGIN}/assets/KV.png">
  <meta property="og:image:width" content="1672">
  <meta property="og:image:height" content="941">
  <meta property="og:image:alt" content="Panda Factory — パンダがくつろぐ黄昏のCG工房">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="{prefix}assets/favicon.svg">
  <link rel="stylesheet" href="{prefix}assets/site.css?v={CSS_VERSION}">
  <script src="{prefix}assets/site.js" defer></script>
</head>
<body{' class="home"' if is_home else ''}>
  <a class="skip-link" href="#main">本文へスキップ</a>
  <header class="site-header"><div class="wrap header-inner">{wordmark(prefix)}
    <button class="menu-toggle" aria-label="メニューを開く" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span></button>
    <nav class="primary-nav" id="primary-nav" aria-label="メインナビゲーション">{''.join(nav)}</nav>
  </div></header>
  <main id="main" tabindex="-1">{body}</main>
  <footer class="site-footer"><div class="wrap"><div class="footer-top">{wordmark(prefix)}<span class="footer-label">TOOLS / ANIMATION / EXPERIMENTS</span></div>
  <div class="footer-bottom"><span>© 2026 Gonsaku / Panda Factory</span><div class="footer-links"><a href="{prefix}about/">About</a><a href="{GITHUB}">GitHub ↗</a><a href="#main">Back to top ↑</a></div></div></div></footer>
</body>
</html>
'''


if __name__ == '__main__':
    for key, page in PAGES.items():
        target = ROOT / 'index.html' if key == 'home' else ROOT / key / 'index.html'
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(render(key, page), encoding='utf-8', newline='\n')
        print(target.relative_to(ROOT))

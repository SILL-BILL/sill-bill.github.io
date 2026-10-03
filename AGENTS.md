# AGENTS.md

## Mission

Rebuild `sill-bill.github.io` as **Panda Factory**, a clean, maintainable GitHub Pages site for Gonsaku's 3DCG animation, Blender tools, rigging, Unity work, toon rendering, and technical experiments.

Treat this as a new site, not a legacy redesign.

Read `docs/renewal-brief.md` (the supplied 指示書.md) before making implementation decisions.

---

## Non-negotiable rules

1. **Do not modify `KV.png`.**
   - Do not regenerate it.
   - Do not recolor it.
   - Do not crop and overwrite the source file.
   - Do not add text or UI into the source image.
   - CSS layout and responsive presentation are allowed.

2. **Preserve Git history.**
   - Before deleting/replacing the current site, create a recoverable legacy reference such as a tag (`legacy-falcon-works`) or archive branch.
   - Do not rewrite history unless explicitly instructed.

3. **Existing site content may be removed.**
   - There is no requirement to preserve old page structure or visual design.
   - Keep only content/configuration that is still useful for the new site.

4. **The site must work on GitHub Pages.**
   - Avoid deployment assumptions that require a long-running server.
   - Use relative/root-safe asset paths appropriate for the repository's Pages configuration.

5. **Do not invent project facts.**
   - Do not fabricate URLs, release versions, dates, download counts, screenshots, awards, client names, or status.
   - If information cannot be verified from the repository, use neutral copy or a clearly marked TODO.

---

## Preferred implementation

Prefer the smallest stack that solves the problem well.

Default preference:

- Semantic HTML
- Modern CSS
- Vanilla JavaScript

A framework/build tool is acceptable only when it clearly improves maintainability or matches an already-useful repository setup. Do not introduce a large dependency tree for simple static presentation.

If a build step is introduced:

- keep it documented,
- keep dependencies minimal,
- ensure production output works on GitHub Pages,
- pin/reasonably constrain versions,
- provide simple local development commands.

---

## Visual direction

The design must be derived from `KV.png`.

Primary mood:

- cozy 3DCG workshop,
- industrial creative studio,
- cute panda/furry appeal,
- dusk / warm practical lights,
- professional but playful,
- black / warm white / yellow as the strongest UI colors.

Avoid:

- generic SaaS design,
- excessive glassmorphism,
- heavy cyberpunk HUD overlays,
- neon overload,
- large WebGL background effects,
- visual effects that compete with the key visual.

Suggested CSS tokens (adjust slightly if needed to match the KV):

```css
:root {
  --pf-bg: #141113;
  --pf-surface: #1d181b;
  --pf-text: #f5f1e9;
  --pf-muted: #b9b1aa;
  --pf-yellow: #ffd400;
  --pf-orange: #f28b45;
  --pf-twilight: #403459;
  --pf-border: rgba(255, 255, 255, 0.12);
}
```

---

## Hero requirements

`KV.png` is the hero art and should dominate the initial experience.

Important visual anchors inside the image:

- large PANDA FACTORY title on the left,
- subtitle / Built by Gonsaku on the left,
- main panda character around the center,
- workstation / monitors on the right.

Do not use aggressive responsive cropping that removes these anchors.

The image already contains the large branding title, so **do not duplicate that same large title as HTML over the hero**.

The global navigation and CTA are HTML UI, not part of the image.

CTA copy:

`EXPLORE PROJECTS`

Choose a placement that does not cover the panda's face, the baked title, or important monitor content.

On narrow mobile screens, prioritize preserving the whole composition over forcing a full-viewport crop. It is acceptable for the hero to be taller or for UI to sit in a separate block.

---

## Navigation

Desktop navigation:

- PROJECTS
- WORKS
- LAB
- ABOUT
- GITHUB

Mobile:

- accessible hamburger menu,
- keyboard operable,
- visible focus states,
- close on Escape,
- sensible focus handling.

Use a compact Panda Factory wordmark or text identity in the header if needed. Do not add another oversized hero title.

---

## Information architecture

Initial pages:

- `/`
- `/projects/`
- `/works/`
- `/lab/`
- `/about/`

Create additional detail pages only when they contain meaningful content.

Primary project candidates:

- Panda Tool
- Mixamo Rig Kai
- PandaLip
- Panda Key Offset

Project card model should support:

- name,
- category,
- short description,
- status,
- version when verified,
- detail link,
- repository link when verified.

Status vocabulary:

- RELEASED
- DEVELOPING
- EXPERIMENT

---

## Content rules

Keep copy concise and useful.

The site should read like a personal creative/technical workshop, not a corporation.

About identity:

- Gonsaku
- 3DCG Animator / Tool Developer

Relevant areas:

- 3DCG Animation
- Blender
- MotionBuilder
- Unity
- Rigging
- Tool Development
- Toon Rendering

A small historical note may mention:

`Falcon-Works → Panda Factory`

Do not over-explain the legacy site on the homepage.

---

## Accessibility

Required:

- semantic landmarks,
- logical heading hierarchy,
- visible keyboard focus,
- keyboard-accessible navigation,
- sufficient text contrast,
- meaningful link/button names,
- appropriate image `alt` decisions,
- support `prefers-reduced-motion`,
- no essential interaction dependent on hover only.

If `KV.png` is used as an `<img>` conveying brand/scene content, give it useful concise alt text. If it is purely decorative behind equivalent visible content, use appropriate decorative semantics. Do not create duplicate verbose screen-reader content.

---

## Responsive behavior

Test at minimum around:

- 360px
- 390px
- 768px
- 1024px
- 1440px
- wide desktop

Check:

- hero crop,
- navigation,
- project cards,
- text wrapping,
- horizontal overflow,
- footer,
- touch target sizes.

Do not ship a desktop-only composition.

---

## Performance

- Keep JS small.
- Avoid unnecessary third-party scripts.
- Optimize delivery without changing the source `KV.png` file itself.
- If creating derived web formats (for example WebP/AVIF) is useful, preserve `KV.png` unchanged and treat derivatives as generated assets.
- Use lazy loading for below-the-fold imagery.
- Avoid layout shifts.

---

## Motion

Use motion sparingly.

Acceptable:

- subtle card hover,
- small fades/reveals,
- short yellow accent line animation,
- gentle header transition.

Avoid:

- constant hero movement,
- large parallax on the KV,
- glitch effects,
- auto-playing heavy animation,
- motion that obscures content.

Respect `prefers-reduced-motion`.

---

## Repository workflow

Before implementation:

1. inspect the repository,
2. identify current GitHub Pages publishing method,
3. preserve the current site using a tag or archive branch,
4. confirm the working tree state before destructive cleanup.

Then:

1. establish the new static site structure,
2. add `KV.png` in an appropriate asset directory without modifying it,
3. build the homepage first,
4. implement responsive navigation,
5. implement Selected Projects,
6. add page skeletons/content,
7. test locally,
8. test GitHub Pages paths/build assumptions,
9. update README,
10. summarize changes and any remaining TODOs.

Do not silently discard uncommitted user work.

---

## Quality bar / definition of done

Before considering the first renewal complete, verify:

- Panda Factory branding is coherent,
- KV is the visual focus,
- source `KV.png` is unchanged,
- navigation works on desktop and mobile,
- CTA is real HTML UI,
- Selected Projects exists,
- main pages are reachable,
- no obvious broken links,
- no horizontal overflow at common widths,
- no serious console errors,
- keyboard navigation is usable,
- reduced motion is respected,
- GitHub Pages deployment/build path is valid,
- README documents local use and deployment,
- legacy site is recoverable from Git.

When there is a conflict between decoration and clarity, choose clarity.
When there is a conflict between fancy code and maintainability, choose maintainability.
When there is a conflict between UI spectacle and `KV.png`, let `KV.png` win.

# ASCII Template

A clean editorial Next.js starter with an animated ASCII hero, light + dark
mode, mobile drawer, markdown blog, dynamic OG images and favicons, IndexNow,
and an opt-in i18n addon.

**Live demo:** [ascii-template.vercel.app](https://ascii-template.vercel.app)

```
$ ¢ J W 0 1 + · ─ → ▲ ▼ t /
```

## Why

Most starters ship a kitchen sink and you spend day one tearing it out. This
one ships the smallest beautiful thing you can deploy, then meets you where
you grow. Six editorial primitives, one config file to rebrand, and opt-in
modules in `addons/` for the things only some projects need.

## Stack

| | |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Runtime | React 19 |
| Language | TypeScript 5.7 (strict) |
| Styling | Vanilla CSS with custom properties — no Tailwind |
| Fonts | Newsreader (display), Inter (body), JetBrains Mono (code) |
| Markdown | gray-matter + marked |
| Runtime deps | 5 total (next, react, react-dom, gray-matter, marked) |

## Quick start

```bash
git clone https://github.com/199-biotechnologies/ascii-template my-app
cd my-app
npm install
npm run dev          # http://localhost:3000
```

Build and deploy:

```bash
npm run build        # production build
npm run typecheck    # strict TypeScript
vercel --prod        # deploy
```

## What's included

### Wired and working out of the box

- **Animated ASCII hero** — sine-wave grid on a canvas, mutating cells, theme-aware (re-tints on toggle without remount), respects `prefers-reduced-motion`.
- **Editorial design system** — Newsreader + Inter + JBM, vanilla CSS with `--bg`, `--ink`, `--accent` custom properties.
- **Light + dark mode** — palettes via CSS variables, toggle cycles light/dark/system, localStorage-persisted, anti-FOUC inline script in `<head>` so there's no flash on first paint.
- **Mobile drawer** — hamburger trigger below 760px, slide-in panel with scrim, Escape closes, body scroll locks.
- **Markdown blog** — drop a `.md` in `/content` and it appears at `/blog/[slug]`. Front-matter parsed by gray-matter, body by marked. Sitemap auto-includes posts.
- **Dynamic OG image** — Edge-rendered 1200×630 social card from `lib/site.ts`. No design tool needed.
- **Dynamic favicon + apple-icon** — generated from the first letter of `site.name` with ASCII glyph corners. `/icon` (32×32), `/apple-icon` (180×180).
- **IndexNow** — `POST /api/indexnow` forwards URLs to api.indexnow.org. Reads `INDEXNOW_KEY` from env, returns 503 gracefully when absent.
- **Sitemap + robots** — Next built-in routes at `/sitemap.xml` and `/robots.txt`. Sitemap reads from a static routes list + every markdown post.
- **JSON-LD** — Organization + WebSite schema in `<head>`, sourced from `lib/site.ts`.
- **Security headers** — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, all in `next.config.mjs`.
- **Image optimization** — AVIF + WebP, year-long cache, full responsive size set.

### Editorial primitives (in `app/globals.css`)

CSS classes you can copy/paste into any markup. All theme-aware.

- `.signal-list` — three-column eyebrow + title + description grid
- `.kpi` — bordered metric strip with serif numerals
- `.findings` — auto-numbered lists with serif counters
- `.pull` — magazine-style pull quote with left border
- `.toc` — two-column table of contents row pattern
- `.pricing-card` (+ `.featured`, `.ribbon`) — pricing card with hover lift
- `.module-grid` — three-column code/title/description strip
- `.code-chip` (inline) and `.code-chip-lg` (block-level)

### Scaffolded as paste-in (not auto-wired)

- **`addons/i18n/`** — locale-prefixed routes, cookie persistence, Accept-Language fallback, RTL flag, redirect-loop protection. Adapted from clinic-starter, de-coupled from Supabase. See `addons/i18n/README.md` for the 5-step wiring.

## Rebrand in 60 seconds

Two files do almost all of it.

**`lib/site.ts`** — name, tagline, nav links, ASCII charset, accent triplets:

```ts
export const site = {
  name: 'Your Brand',
  tagline: 'Your tagline',
  description: '...',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  email: 'hello@yourdomain.com',

  hero: {
    chars: ['$', '¢', '0', '1', /* whatever fits your brand */],
    accents: {
      light: { ink: '...', navy: '...', warm: '...', muted: '...' },
      dark:  { ink: '...', navy: '...', warm: '...', muted: '...' },
    },
  },

  nav: [{ href: '/#features', label: 'Features' }, /* ... */],
  social: { github: '...', x: '...' },
}
```

**`app/globals.css`** — palette in `:root` and `[data-theme='dark']`:

```css
:root {
  --bg: #faf7f1;
  --ink: #1d1815;
  --accent: #1f3550;
  /* ... */
}

[data-theme='dark'] {
  --bg: #14110f;
  --ink: #f5efe2;
  /* ... */
}
```

Everything else (favicon, OG image, sitemap, JSON-LD) reads from these.

## Markdown blog

Drop a markdown file in `/content/`:

```markdown
---
title: My first post
date: '2026-04-28'
excerpt: One-sentence summary that shows on the index page.
author: Your name
tags: [intro, starter]
---

Body in **markdown**. The `.markdown` CSS class themes everything —
headings, links, code blocks, blockquotes, lists.
```

The slug becomes the URL: `welcome-to-the-template.md` → `/blog/welcome-to-the-template`.
Sitemap auto-includes new posts. The homepage's "latest writing" strip pulls
the three newest.

> **Note:** Quote dates in YAML (`date: '2026-04-28'`). Unquoted dates are parsed as `Date` objects, which React can't render directly. The pipeline coerces them anyway, but quoting is cleaner.

## Theme behavior

| State | Effect |
|---|---|
| First visit | Follows `prefers-color-scheme` |
| Click toggle once | Light → Dark, persists in localStorage |
| Click again | Dark → System, removes from localStorage |
| Click again | System → Light |

The ASCII hero canvas reads `document.documentElement.dataset.theme` (or
the media query as fallback) on every frame, so toggling re-tints the grid
without remounting the component.

## IndexNow setup

```bash
# Generate a 32-character key
openssl rand -hex 16
```

In your environment (Vercel project settings or `.env.local`):

```
INDEXNOW_KEY=<your 32-char key>
```

Rename `public/REPLACE-WITH-YOUR-INDEXNOW-KEY.txt` to `public/<your-key>.txt`
and put only the key inside the file. Redeploy.

Then ping URLs from any deploy hook or admin tool:

```bash
curl -X POST https://yoursite.com/api/indexnow \
  -H 'content-type: application/json' \
  -d '{"urls":["/","/blog/welcome-to-the-template"]}'
```

The route forwards to `api.indexnow.org` so Bing, Yandex, and Seznam re-crawl
quickly. Returns 503 if `INDEXNOW_KEY` is not set — safe to deploy without it.

## Project structure

```
ascii-template/
├── app/
│   ├── layout.tsx              # metadata, JSON-LD, anti-FOUC theme script
│   ├── page.tsx                # homepage
│   ├── globals.css             # entire design system, ~700 lines, readable
│   ├── icon.tsx                # 32×32 favicon (Edge-rendered)
│   ├── apple-icon.tsx          # 180×180 apple touch icon (Edge-rendered)
│   ├── opengraph-image.tsx     # 1200×630 social card (Edge-rendered)
│   ├── sitemap.ts              # /sitemap.xml — static routes + blog posts
│   ├── robots.ts               # /robots.txt
│   ├── blog/
│   │   ├── page.tsx            # /blog index, lists posts newest-first
│   │   └── [slug]/page.tsx     # /blog/[slug] with generateStaticParams
│   └── api/
│       └── indexnow/route.ts   # POST → forwards to api.indexnow.org
├── components/
│   ├── ascii-hero.tsx          # canvas sine-wave grid, theme-aware
│   ├── nav.tsx                 # client component, mobile drawer, theme toggle
│   ├── theme-toggle.tsx        # light/dark/system cycle button
│   ├── footer.tsx              # 4-column grid from site config
│   └── json-ld.tsx             # Organization + WebSite schema
├── lib/
│   ├── site.ts                 # ONE file to rebrand
│   └── content.ts              # listPosts() + getPost(slug) helpers
├── content/
│   └── *.md                    # markdown posts with front-matter
├── addons/
│   ├── README.md               # index of available + suggested addons
│   └── i18n/                   # locale routing scaffold (not wired)
├── public/
│   └── *.txt                   # IndexNow key file goes here
├── next.config.mjs             # security headers, image config
├── tsconfig.json               # strict
├── package.json
└── .env.example                # NEXT_PUBLIC_BASE_URL, INDEXNOW_KEY
```

## Addons

Paste-in modules. None imported by the base template; copy what you need.

### Available

- **`addons/i18n/`** — locale routing middleware, cookie persistence, RTL flag, Accept-Language detection. See `addons/i18n/README.md` for the wiring guide.

### Suggested (when you actually need them)

The base template stays small on purpose. Reach for these patterns when a
project needs them; don't pre-install:

- **Auth (Supabase)** — middleware session refresh, protected `/admin`, graceful no-env fallback.
- **Stripe checkout** — `/api/checkout` + `/api/webhooks/stripe` + success/cancel routes.
- **Web Vitals telemetry** — client reporter posting to `/api/vitals`. Wire only when you have somewhere to graph the data.
- **AI-crawler analytics** — middleware logs UA matches for GPTBot/ChatGPT-User/Claude-Web/etc. Useful for LLM citation tracking.
- **Speakable schema** — JSON-LD for voice assistants on news/article content.
- **Font subsetting** — Python scripts to shave ~200kB off custom variable fonts.

See `addons/README.md` for the running index.

## Deliberately not included

- **No Tailwind.** Vanilla CSS reads top-to-bottom. Brand swaps happen in one file.
- **No UI library.** Six primitives cover 90% of marketing-site needs. Add Radix or shadcn if you actually need it.
- **No CMS.** Markdown in `/content` covers blog/docs/changelog without one.
- **No auth, no DB, no payments** in the base. Those live in addon territory.
- **No analytics SDK.** Add Plausible or Vercel Analytics in three lines if you want it.

## Deploy

The repo deploys cleanly to Vercel with no configuration:

```bash
vercel --prod
```

Required environment variables: none.

Optional environment variables:
- `NEXT_PUBLIC_BASE_URL` — public URL of your site (used in metadata, sitemap, robots, OG image, IndexNow)
- `INDEXNOW_KEY` — 32-char key for the IndexNow ping route

## License

MIT. Fork it, brand it, ship it.

## Credits

Editorial design DNA borrowed from [inferenceinsight](https://github.com/) and
[metacog](https://github.com/) — both also use the ASCII-grid hero pattern.
Production-essentials patterns (security headers, sitemap, locale middleware
in `addons/i18n/`) adapted from
[clinic-starter](https://github.com/199-biotechnologies/clinic-starter).

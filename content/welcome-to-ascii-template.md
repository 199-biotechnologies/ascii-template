---
title: Welcome to the template
date: 2026-04-28
excerpt: A markdown post powered by gray-matter and marked. Drop a .md file in /content and it shows up here.
author: ASCII Template
tags: [intro, starter]
---

This page is rendered from `content/welcome-to-ascii-template.md`. The pipeline is twenty lines:
`gray-matter` parses the front-matter, `marked` converts the body to HTML, and a single
`app/blog/[slug]/page.tsx` route reads it.

## Why markdown

Most starters ship a database-backed CMS you don't need on day one. A folder of `.md` files
is enough to launch a blog, a docs section, or a changelog. Move to a CMS later if traffic justifies it.

## Front-matter you can use

```yaml
title: A friendly title
date: 2026-04-28
excerpt: One-sentence summary that shows on the index page.
author: Your name
tags: [topic-one, topic-two]
```

## What's already wired

- Editorial typography in the rendered HTML (`.markdown` class)
- Code blocks with the `--bg-deep` palette
- Pull quotes, lists, links, headings — all themed for light + dark mode
- The post index lists newest-first
- Sitemap auto-includes every post

> "Less code solving the right problem beats more code solving problems badly."

Delete this file and write your own. The slug becomes the URL — keep them lowercase, hyphenated, ASCII.

# Addons

Paste-in modules. None are imported by the base template; copy what you need.

## Available

- **`i18n/`** — locale routing middleware, cookie persistence, RTL flag,
  Accept-Language detection. Adapted from clinic-starter, de-coupled from
  Supabase. See `i18n/README.md`.

## Suggested when you need them

The base template stays small on purpose. Reach for these patterns when a
project actually needs them; don't pre-install:

- **Auth (Supabase)** — middleware session refresh, protected `/admin`,
  graceful no-env fallback. Copy from `clinic-starter/utils/supabase/`.
- **Stripe checkout** — port the `/api/checkout`, `/api/webhooks/stripe`,
  and `/purchase/success` routes from `inferenceinsight`.
- **Web Vitals telemetry** — `app/_components/web-vitals.tsx` posting to
  `/api/vitals`. Wire only when you have somewhere to graph the data.
- **AI-crawler analytics** — clinic-starter's middleware logs UA matches
  for GPTBot/ChatGPT-User/Claude-Web/etc. to `/api/analytics`. Useful when
  you care about LLM citation tracking.
- **Speakable schema** — JSON-LD for voice assistants on news/article
  content. Copy from `clinic-starter/lib/speakable-schema.ts`.
- **Font subsetting** — the Python scripts in `clinic-starter/scripts/`
  shave 200kB off custom variable fonts. Skip until you ship a custom font.

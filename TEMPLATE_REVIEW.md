# ASCII Template Review

This is now positioned as the reusable default starter, not a clinic-specific fork.

## Compared With Clinic Starter

Reference checked: <https://github.com/199-biotechnologies/clinic-starter>

Clinic Starter is useful as a design/SEO reference, but it is heavier and older as a reusable base:

- It is tied to a medical-clinic positioning and Steve Jobs Archive aesthetic.
- It uses Next.js 15-era defaults, Tailwind, shadcn/Radix pieces, web-vitals, and several component helpers.
- It already has mature SEO/i18n ideas worth preserving: locale routing, medical schema helpers, internal linking, resource hints, and metadata discipline.
- It is less ideal as the universal starter because the provider choices and visual identity are not neutral enough.

ASCII Template should keep the memorable ASCII identity, the editorial primitives, and the smaller dependency surface, while absorbing the practical infrastructure defaults that every serious site needs.

## Universal Defaults

These should stay in the baseline:

- Next.js current stable, React current stable, TypeScript strict.
- Supabase Auth, Postgres, and Storage.
- Supabase-backed admin auth with an owner/admin allow-list.
- Contact/support persistence in the database.
- Resend for transactional contact/support email.
- First-party analytics stored in Supabase.
- i18n from day one, including at least one RTL locale to expose layout issues early.
- SEO/AEO/GEO surface: metadata, sitemap, robots, JSON-LD, OG images, IndexNow, canonical/alternate language routing.
- Health/doctor checks before deployment.
- A small editorial design system and the animated ASCII hero.

## Not Universal

These should remain project decisions:

- Stripe: only when the project sells something.
- Upstash Redis: only for queues, hot counters, locks, realtime bursts, or cache-heavy workloads. Supabase is enough for the default contact/admin/analytics workload.
- Vercel Blob: use when Supabase Storage is not the right storage primitive for public asset delivery or large files.
- CMS: add when editors need workflows. Markdown is enough for starter docs/blog/changelog.
- AI routes: project-specific because model choice, secrets, rate limits, and UX vary too much.

## Implemented In This Pass

- Locale-prefixed app routes with `en`, `fr`, `es`, `de`, and `ar`.
- Supabase server/admin/browser clients.
- Supabase session proxy for Next.js 16.
- Admin login via Supabase magic link and admin allow-list.
- Supabase schema migration for contacts, inquiries, messages, analytics, files, SEO entries, redirects, settings, audit logs, admin users, and rate limits.
- Contact form and `/api/contact` backend.
- Resend notification and confirmation hooks.
- First-party `/api/events` analytics with a client tracker.
- Localized sitemap entries and language alternates.
- `.env.example`, `scripts/doctor.mjs`, `STARTER.md`, and `npm run check`.
- Package updates to current npm latest for Next, React, Supabase, Resend, Zod, and TypeScript.
- Audit-clearing overrides for vulnerable transitive `postcss` and `uuid`.
- Real admin sections for contacts, inquiries, analytics, files, SEO entries, redirects, and settings.
- Supabase hardening migration with storage buckets, analytics rollup views, migration marker, and storage RLS policies.
- `/api/health` with env, schema, migration, storage, Resend, and build checks.
- `llms.txt`, `humans.txt`, FAQ schema helper, and privacy page.
- First-party analytics consent notice in the bottom-right corner.
- Bootstrap script, deployment runbook, and Playwright smoke tests.

## Next Hardening Queue

1. Set final project env: `NEXT_PUBLIC_BASE_URL`, `ADMIN_EMAILS`, `RESEND_API_KEY`, `RESEND_FROM`, and `CONTACT_TO_EMAIL`.
2. Add richer admin editing flows where needed: contact tags, outbound support replies, file uploads, and SEO entry edit-in-place.
3. Add scheduled analytics retention cleanup and optional daily materialization if raw event volume grows.
4. Add a production deployment verification run after Vercel env is complete.
5. Keep Clinic Starter as the SEO/i18n reference, not the app architecture reference.

## Local Reshape Artifacts

Likely useful local references found:

- `/Users/biobook/Websites/reshape-clinic`
- `/Users/biobook/Websites/tempreshape`
- `/Users/biobook/Desktop/Stuff/reshape-clinic`
- `/Users/biobook/Code/seo/reshape-clinic-seo-audit.md`
- `/Users/biobook/Code/seo/reshape-clinic-ai-seo-audit.html`
- `/Users/biobook/Code/seo2/reshape-clinic-comprehensive-seo-audit.md`
- `/Users/biobook/Documents/199-Business/Reshape Clinic Assets`
- `/Users/biobook/Downloads/karimkhater_reshape-clinic-assets_2025-06-05_1719.zip`

These were inspected only to identify them. They were not modified.

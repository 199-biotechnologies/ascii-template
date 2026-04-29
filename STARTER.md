# ASCII Template Starter Contract

ASCII Template is the default operating base for multilingual websites and small SaaS/service products.

## Universal Defaults

- Next.js 16 App Router and React 19.
- Supabase Auth, Postgres, and Storage.
- Resend transactional email.
- First-party analytics stored in Supabase.
- Admin dashboard.
- Contact/support backend.
- Locale-prefixed routing from day one.
- SEO/AEO/GEO helpers: metadata, sitemap, robots, JSON-LD, OG image, IndexNow.
- ASCII animation and editorial design system.

## Not Default

- GA4.
- Vercel Analytics or Speed Insights paid dependency.
- Upstash Redis.
- Stripe.
- Public user accounts beyond admin auth.
- A heavy CMS.

Add these only when the project needs them.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Create a Supabase project.
3. Fill the Supabase URL, publishable key, and service role key.
4. Run `supabase/migrations/0001_ascii_template_core.sql`.
5. Add your admin email to `ADMIN_EMAILS`.
6. Configure Resend and set `RESEND_API_KEY`, `RESEND_FROM`, and `CONTACT_TO_EMAIL`.
7. Run `npm run doctor`.
8. Run `npm run check`.

## Analytics

The template does not use GA4 or Vercel Analytics. `components/analytics-tracker.tsx` sends `page.view` through `/api/events` with `navigator.sendBeacon`. Route handlers and server actions can call `trackEvent()` for business events.

Default events:

- `page.view`
- `contact.submitted`
- `admin.login`
- `admin.action`
- `file.uploaded`
- `seo.updated`
- `support.message_created`

## Contact Flow

The contact endpoint stores the contact and inquiry in Supabase first, then sends Resend notifications. Email failure does not lose the inquiry.

## i18n

Routes are locale-prefixed. The initial locales are `en`, `fr`, `es`, `de`, and `ar`. Arabic is included so RTL issues are visible early.

## Admin

Admin auth uses Supabase magic links. Access is granted when the signed-in email appears in `ADMIN_EMAILS` or in the `admin_users` table.

## Health

`/api/health` checks env, Supabase schema, migration marker, storage buckets, Resend configuration, and build metadata.

## Privacy

Analytics require the small bottom-right first-party analytics notice to be accepted. A decline is stored locally and stops the tracker.

# Deployment Runbook

ASCII Template expects Vercel, Supabase, and Resend by default.

## 1. Environment

Set these in Vercel and local `.env.local`:

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `CONTACT_TO_EMAIL`
- `INDEXNOW_KEY` optional

Pull Vercel env locally:

```bash
vercel env pull .env.local
```

## 2. Supabase

Link the project:

```bash
supabase link --project-ref <project-ref>
```

Apply migrations:

```bash
npm run db:push
```

The migrations create:

- contacts, inquiries, and messages
- analytics events and rollup views
- admin users
- files and storage buckets
- SEO entries and redirects
- settings, audit logs, rate limits
- template migration health marker

## 3. Admin

Add the first admin via `ADMIN_EMAILS`:

```bash
ADMIN_EMAILS=you@example.com
```

Later admins can live in `admin_users`.

## 4. Resend

Configure:

```bash
RESEND_API_KEY=re_...
RESEND_FROM="Your Site <hello@yourdomain.com>"
CONTACT_TO_EMAIL=team@yourdomain.com
```

Contact submissions are stored before email is sent, so a temporary Resend failure does not lose the message.

## 5. Verification

Run:

```bash
npm run doctor
npm run check
npm run test:e2e
```

Then check:

- `/api/health`
- `/{locale}`
- `/{locale}/contact`
- `/{locale}/admin`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/humans.txt`

## 6. Privacy

The starter uses a small bottom-right privacy notice. Analytics do not fire until the visitor accepts first-party analytics. Decline is stored locally and respected by the tracker.

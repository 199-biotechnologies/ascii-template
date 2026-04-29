create extension if not exists pgcrypto;

create table if not exists public.template_migrations (
  key text primary key,
  applied_at timestamptz not null default now(),
  details jsonb not null default '{}'::jsonb
);

insert into public.template_migrations (key, details)
values (
  'ascii-template-core-v1',
  jsonb_build_object(
    'description', 'Core ASCII Template schema, storage, analytics, admin, and health defaults',
    'tables', array[
      'contacts',
      'inquiries',
      'messages',
      'analytics_events',
      'analytics_daily',
      'admin_users',
      'files',
      'seo_entries',
      'redirects',
      'settings',
      'audit_logs',
      'rate_limits'
    ]
  )
)
on conflict (key) do update set applied_at = now(), details = excluded.details;

alter table public.contacts add column if not exists last_seen_at timestamptz;
alter table public.contacts add column if not exists unsubscribed_at timestamptz;
alter table public.contacts add column if not exists tags text[] not null default '{}'::text[];

alter table public.inquiries add column if not exists assigned_to text;
alter table public.inquiries add column if not exists resolved_at timestamptz;

alter table public.analytics_events add column if not exists country text;
alter table public.analytics_events add column if not exists device text;
alter table public.analytics_events add column if not exists utm_source text;
alter table public.analytics_events add column if not exists utm_medium text;
alter table public.analytics_events add column if not exists utm_campaign text;
alter table public.analytics_events add column if not exists is_bot boolean not null default false;

alter table public.files add column if not exists storage_object_id uuid;
alter table public.files add column if not exists uploaded_by text;

alter table public.seo_entries add column if not exists og_title text;
alter table public.seo_entries add column if not exists og_description text;
alter table public.seo_entries add column if not exists keywords text[] not null default '{}'::text[];
alter table public.seo_entries add column if not exists updated_by text;

alter table public.settings add column if not exists description text;
alter table public.settings add column if not exists updated_by text;

create index if not exists contacts_created_at_idx on public.contacts(created_at desc);
create index if not exists contacts_locale_idx on public.contacts(locale);
create index if not exists inquiries_status_created_at_idx on public.inquiries(status, created_at desc);
create index if not exists messages_inquiry_created_at_idx on public.messages(inquiry_id, created_at desc);
create index if not exists analytics_events_locale_created_at_idx on public.analytics_events(locale, created_at desc);
create index if not exists analytics_events_session_idx on public.analytics_events(session_id);
create index if not exists analytics_events_referrer_idx on public.analytics_events(referrer);
create index if not exists seo_entries_locale_path_idx on public.seo_entries(locale, path);
create index if not exists redirects_active_idx on public.redirects(active);
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);

create or replace view public.analytics_daily_rollup as
select
  date_trunc('day', created_at)::date as day,
  locale,
  path,
  count(*) filter (where event_name = 'page.view')::integer as pageviews,
  count(distinct nullif(session_id, ''))::integer as sessions,
  count(distinct visitor_hash)::integer as visitors,
  count(*)::integer as events,
  count(*) filter (
    where event_name in ('contact.submitted', 'signup.completed', 'checkout.completed')
  )::integer as conversions
from public.analytics_events
where is_bot = false
group by 1, 2, 3;

create or replace view public.analytics_referrer_rollup as
select
  coalesce(nullif(referrer, ''), 'direct') as referrer,
  count(*) filter (where event_name = 'page.view')::integer as pageviews,
  count(distinct nullif(session_id, ''))::integer as sessions,
  max(created_at) as last_seen_at
from public.analytics_events
where is_bot = false
group by 1
order by pageviews desc;

insert into public.settings (key, value, description)
values
  ('analytics.retention_days', '365'::jsonb, 'How long raw analytics events should be retained.'),
  ('site.privacy_mode', '"consent-required"'::jsonb, 'Default analytics privacy behavior.'),
  ('support.default_status', '"new"'::jsonb, 'Default inquiry status.')
on conflict (key) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'site-assets',
    'site-assets',
    true,
    10485760,
    array['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml', 'application/pdf']
  ),
  (
    'private-uploads',
    'private-uploads',
    false,
    52428800,
    array['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'application/pdf', 'text/plain']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public read site assets" on storage.objects;
create policy "public read site assets"
on storage.objects for select
using (bucket_id = 'site-assets');

drop policy if exists "admins read storage objects" on storage.objects;
create policy "admins read storage objects"
on storage.objects for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users au
    where au.active = true
      and au.user_id = auth.uid()
  )
);

drop policy if exists "admins write storage objects" on storage.objects;
create policy "admins write storage objects"
on storage.objects for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users au
    where au.active = true
      and au.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users au
    where au.active = true
      and au.user_id = auth.uid()
  )
);

insert into public.audit_logs (actor_type, action, entity_type, entity_id, metadata)
values (
  'system',
  'migration.applied',
  'template_migrations',
  'ascii-template-core-v1',
  jsonb_build_object('migration', '0002_ascii_template_hardening')
);

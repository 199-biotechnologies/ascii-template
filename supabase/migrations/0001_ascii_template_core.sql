create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  phone text,
  locale text not null default 'en',
  source text not null default 'website',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.contacts(id) on delete set null,
  subject text not null default 'Website inquiry',
  message text not null,
  status text not null default 'new',
  priority text not null default 'normal',
  locale text not null default 'en',
  source text not null default 'contact-form',
  user_agent text,
  referrer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid references public.inquiries(id) on delete cascade,
  direction text not null check (direction in ('inbound', 'outbound', 'internal')),
  channel text not null default 'email',
  subject text,
  body text not null,
  delivery_status text not null default 'queued',
  provider_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text not null default '/',
  locale text not null default 'en',
  session_id text,
  visitor_hash text,
  referrer text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx on public.analytics_events(created_at desc);
create index if not exists analytics_events_name_idx on public.analytics_events(event_name);
create index if not exists analytics_events_path_idx on public.analytics_events(path);

create table if not exists public.analytics_daily (
  day date not null,
  locale text not null default 'en',
  path text not null default '/',
  visitors integer not null default 0,
  sessions integer not null default 0,
  pageviews integer not null default 0,
  events integer not null default 0,
  conversions integer not null default 0,
  primary key (day, locale, path)
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  email text unique,
  role text not null default 'admin',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'site-assets',
  path text not null,
  filename text,
  content_type text,
  size_bytes bigint,
  access_level text not null default 'private',
  owner_contact_id uuid references public.contacts(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.seo_entries (
  id uuid primary key default gen_random_uuid(),
  locale text not null default 'en',
  path text not null,
  title text not null,
  description text not null,
  canonical_path text,
  noindex boolean not null default false,
  schema jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (locale, path)
);

create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  source_path text not null unique,
  target_path text not null,
  status_code integer not null default 308,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_type text not null default 'system',
  actor_id text,
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.rate_limits (
  id bigserial primary key,
  key text not null,
  scope text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_limits_key_created_at_idx on public.rate_limits(key, created_at desc);

alter table public.contacts enable row level security;
alter table public.inquiries enable row level security;
alter table public.messages enable row level security;
alter table public.analytics_events enable row level security;
alter table public.analytics_daily enable row level security;
alter table public.admin_users enable row level security;
alter table public.files enable row level security;
alter table public.seo_entries enable row level security;
alter table public.redirects enable row level security;
alter table public.settings enable row level security;
alter table public.audit_logs enable row level security;
alter table public.rate_limits enable row level security;

-- Server-side route handlers use the service role key. Public clients get no
-- direct table access by default; add project-specific RLS policies only when
-- a public user account surface is introduced.

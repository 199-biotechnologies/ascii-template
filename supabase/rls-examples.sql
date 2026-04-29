-- Optional direct-client RLS examples.
--
-- The starter routes use the service role on the server, so public clients get
-- no direct table access by default. If a project later introduces logged-in
-- users, copy the relevant policies below and tighten them around that product.

-- Admin users can read operational tables directly from a browser client.
drop policy if exists "admins read contacts" on public.contacts;
create policy "admins read contacts"
on public.contacts for select
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.active = true and au.user_id = auth.uid()
  )
);

drop policy if exists "admins read inquiries" on public.inquiries;
create policy "admins read inquiries"
on public.inquiries for select
to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.active = true and au.user_id = auth.uid()
  )
);

-- Users can read their own contact record when you connect contacts to auth.
-- Requires a `user_id uuid` column on `contacts`.
--
-- alter table public.contacts add column if not exists user_id uuid;
-- create policy "users read own contact"
-- on public.contacts for select
-- to authenticated
-- using (user_id = auth.uid());

-- Public inserts are intentionally omitted. Prefer `/api/contact`, which
-- validates, rate-limits, stores, audits, and sends email server-side.

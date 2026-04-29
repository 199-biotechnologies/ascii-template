import { getSupabaseAdmin } from '@/lib/supabase/admin'

export const adminSections = [
  { key: 'contacts', label: 'Contacts' },
  { key: 'inquiries', label: 'Inquiries' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'files', label: 'Files' },
  { key: 'seo', label: 'SEO' },
  { key: 'redirects', label: 'Redirects' },
  { key: 'settings', label: 'Settings' },
] as const

export type AdminSection = (typeof adminSections)[number]['key']

export function isAdminSection(value: string): value is AdminSection {
  return adminSections.some((section) => section.key === value)
}

type QueryResult<T> = {
  data: T[]
  error: string | null
}

function empty<T>(error?: string): QueryResult<T> {
  return { data: [], error: error ?? null }
}

export async function getTableCount(table: string) {
  const admin = getSupabaseAdmin()
  if (!admin) return 0
  const { count } = await admin.from(table).select('id', { count: 'exact', head: true })
  return count ?? 0
}

export async function getAdminOverview() {
  const admin = getSupabaseAdmin()
  if (!admin) return null

  const [contacts, inquiries, events, files, seo, redirects, settings, recentInquiries, recentEvents] =
    await Promise.all([
      getTableCount('contacts'),
      getTableCount('inquiries'),
      getTableCount('analytics_events'),
      getTableCount('files'),
      getTableCount('seo_entries'),
      getTableCount('redirects'),
      admin.from('settings').select('key', { count: 'exact', head: true }),
      admin
        .from('inquiries')
        .select('id, subject, status, priority, locale, source, created_at, contacts(name,email)')
        .order('created_at', { ascending: false })
        .limit(6),
      admin
        .from('analytics_events')
        .select('id, event_name, path, locale, created_at')
        .order('created_at', { ascending: false })
        .limit(8),
    ])

  return {
    counts: {
      contacts,
      inquiries,
      events,
      files,
      seo,
      redirects,
      settings: settings.count ?? 0,
    },
    recentInquiries: recentInquiries.data ?? [],
    recentEvents: recentEvents.data ?? [],
  }
}

export async function getContacts(): Promise<QueryResult<Record<string, any>>> {
  const admin = getSupabaseAdmin()
  if (!admin) return empty('Supabase admin client is not configured.')
  const { data, error } = await admin
    .from('contacts')
    .select('id, name, email, phone, locale, source, tags, created_at, last_seen_at, unsubscribed_at')
    .order('created_at', { ascending: false })
    .limit(100)
  return { data: data ?? [], error: error?.message ?? null }
}

export async function getInquiries(): Promise<QueryResult<Record<string, any>>> {
  const admin = getSupabaseAdmin()
  if (!admin) return empty('Supabase admin client is not configured.')
  const { data, error } = await admin
    .from('inquiries')
    .select(
      'id, subject, message, status, priority, locale, source, assigned_to, resolved_at, created_at, contacts(name,email,phone)',
    )
    .order('created_at', { ascending: false })
    .limit(100)
  return { data: data ?? [], error: error?.message ?? null }
}

export async function getAnalytics() {
  const admin = getSupabaseAdmin()
  if (!admin) return null

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const [events, daily, referrers] = await Promise.all([
    admin
      .from('analytics_events')
      .select('id, event_name, path, locale, session_id, referrer, created_at, metadata')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(500),
    admin
      .from('analytics_daily_rollup')
      .select('day, locale, path, pageviews, sessions, visitors, events, conversions')
      .order('day', { ascending: false })
      .limit(100),
    admin
      .from('analytics_referrer_rollup')
      .select('referrer, pageviews, sessions, last_seen_at')
      .limit(25),
  ])

  const rawEvents = events.data ?? []
  const pageviews = rawEvents.filter((event) => event.event_name === 'page.view').length
  const conversions = rawEvents.filter((event) =>
    ['contact.submitted', 'signup.completed', 'checkout.completed'].includes(event.event_name),
  ).length
  const sessions = new Set(rawEvents.map((event) => event.session_id).filter(Boolean)).size

  return {
    summary: {
      events: rawEvents.length,
      pageviews,
      conversions,
      sessions,
    },
    events: rawEvents.slice(0, 80),
    daily: daily.data ?? [],
    referrers: referrers.data ?? [],
    errors: [events.error?.message, daily.error?.message, referrers.error?.message].filter(Boolean),
  }
}

export async function getFiles(): Promise<QueryResult<Record<string, any>>> {
  const admin = getSupabaseAdmin()
  if (!admin) return empty('Supabase admin client is not configured.')

  const [files, buckets] = await Promise.all([
    admin
      .from('files')
      .select('id, bucket, path, filename, content_type, size_bytes, access_level, uploaded_by, created_at')
      .order('created_at', { ascending: false })
      .limit(100),
    admin.storage.listBuckets(),
  ])

  return {
    data: [
      ...(files.data ?? []),
      ...((buckets.data ?? []) as any[]).map((bucket) => ({
        id: `bucket:${bucket.id}`,
        bucket: bucket.name,
        path: bucket.public ? 'public bucket' : 'private bucket',
        filename: 'Storage bucket',
        content_type: 'bucket',
        size_bytes: null,
        access_level: bucket.public ? 'public' : 'private',
        uploaded_by: null,
        created_at: bucket.created_at,
      })),
    ],
    error: files.error?.message ?? buckets.error?.message ?? null,
  }
}

export async function getSeoEntries(): Promise<QueryResult<Record<string, any>>> {
  const admin = getSupabaseAdmin()
  if (!admin) return empty('Supabase admin client is not configured.')
  const { data, error } = await admin
    .from('seo_entries')
    .select('id, locale, path, title, description, canonical_path, noindex, og_title, og_description, keywords, updated_at')
    .order('updated_at', { ascending: false })
    .limit(100)
  return { data: data ?? [], error: error?.message ?? null }
}

export async function getRedirects(): Promise<QueryResult<Record<string, any>>> {
  const admin = getSupabaseAdmin()
  if (!admin) return empty('Supabase admin client is not configured.')
  const { data, error } = await admin
    .from('redirects')
    .select('id, source_path, target_path, status_code, active, created_at')
    .order('created_at', { ascending: false })
    .limit(100)
  return { data: data ?? [], error: error?.message ?? null }
}

export async function getSettings(): Promise<QueryResult<Record<string, any>>> {
  const admin = getSupabaseAdmin()
  if (!admin) return empty('Supabase admin client is not configured.')
  const { data, error } = await admin
    .from('settings')
    .select('key, value, description, updated_by, updated_at')
    .order('key', { ascending: true })
    .limit(100)
  return { data: data ?? [], error: error?.message ?? null }
}

import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function checkRateLimit({
  key,
  scope,
  limit,
  windowSeconds,
}: {
  key: string
  scope: string
  limit: number
  windowSeconds: number
}) {
  const admin = getSupabaseAdmin()
  if (!admin) return { allowed: true, configured: false, remaining: limit }

  const since = new Date(Date.now() - windowSeconds * 1000).toISOString()
  const fullKey = `${scope}:${key}`

  const { count, error: countError } = await admin
    .from('rate_limits')
    .select('id', { count: 'exact', head: true })
    .eq('key', fullKey)
    .gte('created_at', since)

  if (countError) return { allowed: true, configured: true, remaining: limit }

  if ((count ?? 0) >= limit) {
    return { allowed: false, configured: true, remaining: 0 }
  }

  await admin.from('rate_limits').insert({ key: fullKey, scope })
  return { allowed: true, configured: true, remaining: Math.max(0, limit - (count ?? 0) - 1) }
}

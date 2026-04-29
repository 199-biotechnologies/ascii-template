import { createHash } from 'node:crypto'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { env } from '@/lib/env'

export type AnalyticsEventInput = {
  eventName: string
  path?: string
  locale?: string
  sessionId?: string
  referrer?: string
  userAgent?: string
  visitorHint?: string
  metadata?: Record<string, unknown>
}

function hashVisitor(value: string) {
  return createHash('sha256').update(value).digest('hex').slice(0, 40)
}

export async function trackEvent(input: AnalyticsEventInput) {
  if (env.disableAnalytics) return { stored: false, reason: 'disabled' as const }

  const admin = getSupabaseAdmin()
  if (!admin) return { stored: false, reason: 'supabase-unconfigured' as const }

  const visitorHash = input.visitorHint ? hashVisitor(input.visitorHint) : null

  const { error } = await admin.from('analytics_events').insert({
    event_name: input.eventName,
    path: input.path ?? '/',
    locale: input.locale ?? 'en',
    session_id: input.sessionId ?? null,
    visitor_hash: visitorHash,
    referrer: input.referrer ?? null,
    user_agent: input.userAgent ?? null,
    metadata: input.metadata ?? {},
  })

  if (error) return { stored: false, reason: error.message }
  return { stored: true as const }
}

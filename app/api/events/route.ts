import { NextResponse } from 'next/server'
import { z } from 'zod'
import { trackEvent } from '@/lib/analytics'
import { getVisitorHint } from '@/lib/request'

const eventSchema = z.object({
  eventName: z.string().min(1).max(120),
  path: z.string().max(600).optional(),
  locale: z.string().max(12).optional(),
  sessionId: z.string().max(120).optional(),
  referrer: z.string().max(600).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid JSON' }, { status: 400 })
  }

  const parsed = eventSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid event' }, { status: 400 })
  }

  const result = await trackEvent({
    ...parsed.data,
    userAgent: request.headers.get('user-agent') || undefined,
    visitorHint: getVisitorHint(request),
  })

  return NextResponse.json({ ok: true, ...result })
}

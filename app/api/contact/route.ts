import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { checkRateLimit } from '@/lib/rate-limit'
import { getClientIp, getVisitorHint } from '@/lib/request'
import { sendContactConfirmation, sendContactNotification } from '@/lib/email'
import { trackEvent } from '@/lib/analytics'

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().max(80).optional(),
  message: z.string().min(10).max(5000),
  locale: z.string().max(12).optional(),
  source: z.string().max(120).optional(),
  company: z.string().max(120).optional(), // honeypot
})

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid JSON' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid contact payload' }, { status: 400 })
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true })
  }

  const ip = getClientIp(request)
  const limit = await checkRateLimit({
    key: ip,
    scope: 'contact',
    limit: 5,
    windowSeconds: 15 * 60,
  })

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: 'rate limited' }, { status: 429 })
  }

  const admin = getSupabaseAdmin()
  if (!admin) {
    return NextResponse.json({ ok: false, error: 'Contact service is not configured' }, { status: 503 })
  }

  const email = parsed.data.email.toLowerCase()
  const { data: contact, error: contactError } = await admin
    .from('contacts')
    .upsert(
      {
        email,
        name: parsed.data.name,
        phone: parsed.data.phone || null,
        locale: parsed.data.locale || 'en',
        source: parsed.data.source || 'contact-form',
        metadata: {},
      },
      { onConflict: 'email' },
    )
    .select('id')
    .single()

  if (contactError || !contact) {
    return NextResponse.json({ ok: false, error: 'contact write failed' }, { status: 500 })
  }

  const { data: inquiry, error: inquiryError } = await admin
    .from('inquiries')
    .insert({
      contact_id: contact.id,
      subject: 'Website inquiry',
      message: parsed.data.message,
      status: 'new',
      priority: 'normal',
      locale: parsed.data.locale || 'en',
      source: parsed.data.source || 'contact-form',
      user_agent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer'),
    })
    .select('id')
    .single()

  if (inquiryError || !inquiry) {
    return NextResponse.json({ ok: false, error: 'inquiry write failed' }, { status: 500 })
  }

  await admin.from('messages').insert({
    inquiry_id: inquiry.id,
    direction: 'inbound',
    channel: 'contact-form',
    subject: 'Website inquiry',
    body: parsed.data.message,
    delivery_status: 'received',
  })

  const emailInput = { ...parsed.data, email, inquiryId: inquiry.id }
  const [notification, confirmation] = await Promise.all([
    sendContactNotification(emailInput),
    sendContactConfirmation(emailInput),
    trackEvent({
      eventName: 'contact.submitted',
      path: '/contact',
      locale: parsed.data.locale || 'en',
      userAgent: request.headers.get('user-agent') || undefined,
      visitorHint: getVisitorHint(request),
      metadata: { inquiryId: inquiry.id, notificationQueued: true },
    }),
  ])

  await admin.from('audit_logs').insert({
    actor_type: 'system',
    action: 'contact.created',
    entity_type: 'inquiry',
    entity_id: inquiry.id,
    metadata: { notification, confirmation },
  })

  return NextResponse.json({ ok: true, inquiryId: inquiry.id, notification, confirmation })
}

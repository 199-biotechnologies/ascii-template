import { Resend } from 'resend'
import { env, hasResendEnv } from '@/lib/env'
import { site } from '@/lib/site'

export type ContactEmailInput = {
  name: string
  email: string
  phone?: string
  message: string
  inquiryId?: string
  locale?: string
}

function getResend() {
  if (!hasResendEnv()) return null
  return new Resend(env.resendApiKey)
}

export async function sendContactNotification(input: ContactEmailInput) {
  const resend = getResend()
  if (!resend) return { sent: false, reason: 'resend-unconfigured' as const }

  const subject = `New inquiry from ${input.name}`
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
    input.locale ? `Locale: ${input.locale}` : null,
    input.inquiryId ? `Inquiry ID: ${input.inquiryId}` : null,
    '',
    input.message,
  ]
    .filter(Boolean)
    .join('\n')

  const result = await resend.emails.send({
    from: env.resendFrom,
    to: env.contactToEmail,
    replyTo: input.email,
    subject,
    text: body,
  })

  if (result.error) return { sent: false, reason: result.error.message }
  return { sent: true as const, id: result.data?.id }
}

export async function sendContactConfirmation(input: ContactEmailInput) {
  const resend = getResend()
  if (!resend) return { sent: false, reason: 'resend-unconfigured' as const }

  const result = await resend.emails.send({
    from: env.resendFrom,
    to: input.email,
    subject: `We received your inquiry - ${site.name}`,
    text: `Hi ${input.name},\n\nThanks for getting in touch. We received your message and will reply soon.\n\n${site.name}`,
  })

  if (result.error) return { sent: false, reason: result.error.message }
  return { sent: true as const, id: result.data?.id }
}

const bool = (value: string | undefined) => value === '1' || value === 'true'

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',

  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublishableKey:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

  resendApiKey: process.env.RESEND_API_KEY,
  resendFrom: process.env.RESEND_FROM || 'ASCII Template <hello@example.com>',
  contactToEmail: process.env.CONTACT_TO_EMAIL || process.env.RESEND_TO_EMAIL || 'hello@example.com',

  adminEmails: (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),

  indexNowKey: process.env.INDEXNOW_KEY,
  disableAnalytics: bool(process.env.DISABLE_FIRST_PARTY_ANALYTICS),
}

export function hasSupabasePublicEnv() {
  return Boolean(env.supabaseUrl && env.supabasePublishableKey)
}

export function hasSupabaseAdminEnv() {
  return Boolean(env.supabaseUrl && env.supabaseServiceRoleKey)
}

export function hasResendEnv() {
  return Boolean(env.resendApiKey)
}

export function requireEnv(name: keyof typeof env): string {
  const value = env[name]
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { env } from '@/lib/env'
import { defaultLocale, isLocale } from '@/lib/i18n/config'

type Params = Promise<{ locale: string }>

async function sendMagicLink(formData: FormData) {
  'use server'

  const email = String(formData.get('email') || '').toLowerCase().trim()
  const rawLocale = String(formData.get('locale') || defaultLocale)
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale
  const supabase = await getSupabaseServerClient()

  if (!supabase || !email) return

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${env.siteUrl}/auth/callback?next=/${locale}/admin`,
    },
  })

  redirect(`/${locale}/admin/login?sent=1`)
}

export default async function AdminLoginPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <section>
      <div className="page">
        <div className="section-eyebrow">Admin</div>
        <h1>Admin login</h1>
        <p className="lede">Use an email sign-in link. Access is restricted to approved admin accounts.</p>
        <form action={sendMagicLink} className="form-stack">
          <input type="hidden" name="locale" value={locale} />
          <label>
            <span>Email</span>
            <input name="email" type="email" required placeholder="you@example.com" />
          </label>
          <button className="btn btn-primary btn-arrow" type="submit">
            Send magic link
          </button>
        </form>
      </div>
    </section>
  )
}

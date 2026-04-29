import type { ReactNode } from 'react'
import Link from 'next/link'
import { getAdminState, type AdminState } from '@/lib/admin'
import type { Locale } from '@/lib/i18n/config'

type OkAdminState = Extract<AdminState, { status: 'ok' }>

export async function AdminAccess({
  locale,
  children,
}: {
  locale: Locale
  children: (state: OkAdminState) => ReactNode | Promise<ReactNode>
}) {
  const state = await getAdminState()

  if (state.status === 'unconfigured') return <AdminSetup locale={locale} />
  if (state.status === 'anonymous') return <AdminLogin locale={locale} />
  if (state.status === 'forbidden') return <AdminForbidden email={state.email} />

  return <>{await children(state)}</>
}

function AdminLogin({ locale }: { locale: Locale }) {
  return (
    <section>
      <div className="page">
        <div className="section-eyebrow">Admin</div>
        <h1>Admin login</h1>
        <p className="lede">Sign in with an email link to access the operations dashboard.</p>
        <Link className="btn btn-primary btn-arrow" href={`/${locale}/admin/login`}>
          Send magic link
        </Link>
      </div>
    </section>
  )
}

function AdminForbidden({ email }: { email?: string }) {
  return (
    <section>
      <div className="page">
        <div className="section-eyebrow">Admin</div>
        <h1>Access pending</h1>
        <p className="lede">
          {email || 'This account'} is signed in, but is not listed in <code className="code-chip">admin_users</code> or{' '}
          <code className="code-chip">ADMIN_EMAILS</code>.
        </p>
      </div>
    </section>
  )
}

function AdminSetup({ locale }: { locale: Locale }) {
  return (
    <section>
      <div className="page">
        <div className="section-eyebrow">Admin</div>
        <h1>Backend setup required</h1>
        <p className="lede">
          Configure the backend environment, run the database migrations, and add your email to the admin allow-list.
        </p>
        <Link href={`/${locale}`} className="btn btn-ghost btn-arrow">
          Back to site
        </Link>
      </div>
    </section>
  )
}

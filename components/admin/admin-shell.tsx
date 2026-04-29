import type { ReactNode } from 'react'
import Link from 'next/link'
import { adminSections, type AdminSection } from '@/lib/admin-data'
import type { Locale } from '@/lib/i18n/config'

export function AdminShell({
  locale,
  active,
  title,
  lede,
  children,
}: {
  locale: Locale
  active?: AdminSection
  title: string
  lede?: string
  children: ReactNode
}) {
  return (
    <section>
      <div className="page-wide admin-page">
        <div className="section-eyebrow">Admin</div>
        <div className="admin-header">
          <div>
            <h1>{title}</h1>
            {lede ? <p className="lede">{lede}</p> : null}
          </div>
          <Link href={`/${locale}`} className="btn btn-ghost btn-arrow">
            View site
          </Link>
        </div>

        <nav className="admin-tabs" aria-label="Admin sections">
          <Link href={`/${locale}/admin`} data-active={!active}>
            Overview
          </Link>
          {adminSections.map((section) => (
            <Link key={section.key} href={`/${locale}/admin/${section.key}`} data-active={active === section.key}>
              {section.label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </section>
  )
}

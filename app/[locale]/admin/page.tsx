import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AdminAccess } from '@/components/admin/admin-access'
import { AdminShell } from '@/components/admin/admin-shell'
import { getAdminOverview } from '@/lib/admin-data'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { isLocale, type Locale } from '@/lib/i18n/config'

type Params = Promise<{ locale: string }>

export default async function AdminPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const normalizedLocale = locale as Locale
  const dict = getDictionary(normalizedLocale)

  return (
    <AdminAccess locale={normalizedLocale}>
      {async () => {
        const overview = await getAdminOverview()

        return (
          <AdminShell locale={normalizedLocale} title={dict.admin.title} lede={dict.admin.lede}>
            <div className="admin-kpi-grid">
              <Metric label="Contacts" value={overview?.counts.contacts ?? 0} href={`/${locale}/admin/contacts`} />
              <Metric label="Inquiries" value={overview?.counts.inquiries ?? 0} href={`/${locale}/admin/inquiries`} />
              <Metric label="Events" value={overview?.counts.events ?? 0} href={`/${locale}/admin/analytics`} />
              <Metric label="Files" value={overview?.counts.files ?? 0} href={`/${locale}/admin/files`} />
              <Metric label="SEO entries" value={overview?.counts.seo ?? 0} href={`/${locale}/admin/seo`} />
              <Metric label="Redirects" value={overview?.counts.redirects ?? 0} href={`/${locale}/admin/redirects`} />
            </div>

            <div className="admin-grid">
              <div className="admin-panel">
                <div className="admin-panel-head">
                  <h2>Recent inquiries</h2>
                  <Link href={`/${locale}/admin/inquiries`}>Open</Link>
                </div>
                <div className="admin-list">
                  {(overview?.recentInquiries ?? []).length ? (
                    overview?.recentInquiries.map((inquiry: any) => (
                      <div key={inquiry.id} className="admin-list-row">
                        <div>
                          <b>{inquiry.contacts?.name || inquiry.contacts?.email || 'Unknown contact'}</b>
                          <span>{inquiry.subject}</span>
                        </div>
                        <code>{inquiry.status}</code>
                      </div>
                    ))
                  ) : (
                    <p className="small">No inquiries yet.</p>
                  )}
                </div>
              </div>

              <div className="admin-panel">
                <div className="admin-panel-head">
                  <h2>Recent events</h2>
                  <Link href={`/${locale}/admin/analytics`}>Open</Link>
                </div>
                <div className="admin-list">
                  {(overview?.recentEvents ?? []).length ? (
                    overview?.recentEvents.map((event: any) => (
                      <div key={event.id} className="admin-list-row">
                        <div>
                          <b>{event.event_name}</b>
                          <span>{event.path}</span>
                        </div>
                        <code>{event.locale}</code>
                      </div>
                    ))
                  ) : (
                    <p className="small">No events yet.</p>
                  )}
                </div>
              </div>
            </div>
          </AdminShell>
        )
      }}
    </AdminAccess>
  )
}

function Metric({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="admin-metric">
      <span>{label}</span>
      <b>{value}</b>
    </Link>
  )
}

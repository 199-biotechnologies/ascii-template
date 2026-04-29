import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { AdminAccess } from '@/components/admin/admin-access'
import { AdminShell } from '@/components/admin/admin-shell'
import {
  getAnalytics,
  getContacts,
  getFiles,
  getInquiries,
  getRedirects,
  getSeoEntries,
  getSettings,
  isAdminSection,
  type AdminSection,
} from '@/lib/admin-data'
import {
  deleteAdminRowAction,
  updateInquiryAction,
  upsertRedirectAction,
  upsertSeoEntryAction,
  upsertSettingAction,
} from '@/lib/admin-actions'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'

type Params = Promise<{ locale: string; section: string }>

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    ['contacts', 'inquiries', 'analytics', 'files', 'seo', 'redirects', 'settings'].map((section) => ({
      locale,
      section,
    })),
  )
}

export default async function AdminSectionPage({ params }: { params: Params }) {
  const { locale, section } = await params
  if (!isLocale(locale) || !isAdminSection(section)) notFound()

  const normalizedLocale = locale as Locale
  const normalizedSection = section as AdminSection

  return (
    <AdminAccess locale={normalizedLocale}>
      {async () => (
        <AdminShell
          locale={normalizedLocale}
          active={normalizedSection}
          title={sectionTitle(normalizedSection)}
          lede={sectionLede(normalizedSection)}
        >
          {await renderSection(normalizedLocale, normalizedSection)}
        </AdminShell>
      )}
    </AdminAccess>
  )
}

async function renderSection(locale: Locale, section: AdminSection) {
  if (section === 'contacts') return <ContactsSection />
  if (section === 'inquiries') return <InquiriesSection locale={locale} />
  if (section === 'analytics') return <AnalyticsSection />
  if (section === 'files') return <FilesSection />
  if (section === 'seo') return <SeoSection locale={locale} />
  if (section === 'redirects') return <RedirectsSection locale={locale} />
  return <SettingsSection locale={locale} />
}

async function ContactsSection() {
  const result = await getContacts()
  return (
    <AdminTable error={result.error} empty="No contacts yet." hasData={result.data.length > 0}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Locale</th>
            <th>Source</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {result.data.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone || '-'}</td>
              <td>{contact.locale}</td>
              <td>{contact.source}</td>
              <td>{formatDate(contact.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminTable>
  )
}

async function InquiriesSection({ locale }: { locale: Locale }) {
  const result = await getInquiries()
  return (
    <div className="admin-stack">
      {result.error ? <p className="form-status error">{result.error}</p> : null}
      {result.data.length ? (
        result.data.map((inquiry) => (
          <article key={inquiry.id} className="admin-record">
            <div className="admin-record-main">
              <div>
                <h2>{inquiry.contacts?.name || inquiry.contacts?.email || 'Unknown contact'}</h2>
                <p>{inquiry.message}</p>
                <span className="small">
                  {inquiry.contacts?.email || 'No email'} / {formatDate(inquiry.created_at)} / {inquiry.source}
                </span>
              </div>
              <form action={updateInquiryAction} className="admin-inline-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="id" value={inquiry.id} />
                <select name="status" defaultValue={inquiry.status}>
                  {['new', 'open', 'waiting', 'resolved', 'closed'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select name="priority" defaultValue={inquiry.priority}>
                  {['low', 'normal', 'high', 'urgent'].map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                <input name="assigned_to" defaultValue={inquiry.assigned_to || ''} placeholder="Assigned to" />
                <button className="btn btn-ghost" type="submit">
                  Save
                </button>
              </form>
            </div>
          </article>
        ))
      ) : (
        <p className="small">No inquiries yet.</p>
      )}
    </div>
  )
}

async function AnalyticsSection() {
  const analytics = await getAnalytics()
  if (!analytics) return <p className="form-status error">Analytics backend is not configured.</p>

  return (
    <div className="admin-stack">
      {analytics.errors.length ? <p className="form-status error">{analytics.errors.join(' / ')}</p> : null}
      <div className="admin-kpi-grid">
        <div className="admin-metric static">
          <span>Events, 30d</span>
          <b>{analytics.summary.events}</b>
        </div>
        <div className="admin-metric static">
          <span>Pageviews, 30d</span>
          <b>{analytics.summary.pageviews}</b>
        </div>
        <div className="admin-metric static">
          <span>Sessions, 30d</span>
          <b>{analytics.summary.sessions}</b>
        </div>
        <div className="admin-metric static">
          <span>Conversions, 30d</span>
          <b>{analytics.summary.conversions}</b>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-panel">
          <h2>Top referrers</h2>
          <div className="admin-list">
            {analytics.referrers.map((row: any) => (
              <div key={row.referrer} className="admin-list-row">
                <div>
                  <b>{row.referrer}</b>
                  <span>{row.sessions} sessions</span>
                </div>
                <code>{row.pageviews}</code>
              </div>
            ))}
          </div>
        </div>
        <div className="admin-panel">
          <h2>Recent events</h2>
          <div className="admin-list">
            {analytics.events.slice(0, 18).map((event: any) => (
              <div key={event.id} className="admin-list-row">
                <div>
                  <b>{event.event_name}</b>
                  <span>{event.path}</span>
                </div>
                <code>{event.locale}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

async function FilesSection() {
  const result = await getFiles()
  return (
    <AdminTable error={result.error} empty="No files or storage buckets found." hasData={result.data.length > 0}>
      <table>
        <thead>
          <tr>
            <th>Bucket</th>
            <th>Path</th>
            <th>Type</th>
            <th>Access</th>
            <th>Size</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {result.data.map((file) => (
            <tr key={file.id}>
              <td>{file.bucket}</td>
              <td>{file.path}</td>
              <td>{file.content_type || '-'}</td>
              <td>{file.access_level}</td>
              <td>{file.size_bytes ? `${Math.round(Number(file.size_bytes) / 1024)} KB` : '-'}</td>
              <td>{formatDate(file.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminTable>
  )
}

async function SeoSection({ locale }: { locale: Locale }) {
  const result = await getSeoEntries()
  return (
    <div className="admin-grid">
      <div className="admin-panel">
        <h2>Add SEO entry</h2>
        <SeoForm locale={locale} />
      </div>
      <AdminTable error={result.error} empty="No SEO entries yet." hasData={result.data.length > 0}>
        <table>
          <thead>
            <tr>
              <th>Path</th>
              <th>Locale</th>
              <th>Title</th>
              <th>Noindex</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {result.data.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.path}</td>
                <td>{entry.locale}</td>
                <td>{entry.title}</td>
                <td>{entry.noindex ? 'yes' : 'no'}</td>
                <td>
                  <form action={deleteAdminRowAction}>
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="table" value="seo_entries" />
                    <input type="hidden" name="id" value={entry.id} />
                    <button className="text-button" type="submit">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
    </div>
  )
}

async function RedirectsSection({ locale }: { locale: Locale }) {
  const result = await getRedirects()
  return (
    <div className="admin-grid">
      <div className="admin-panel">
        <h2>Add redirect</h2>
        <form action={upsertRedirectAction} className="form-stack compact">
          <input type="hidden" name="locale" value={locale} />
          <label>
            <span>Source path</span>
            <input name="source_path" placeholder="/old-path" required />
          </label>
          <label>
            <span>Target path</span>
            <input name="target_path" placeholder="/new-path" required />
          </label>
          <label>
            <span>Status</span>
            <select name="status_code" defaultValue="308">
              <option value="301">301</option>
              <option value="302">302</option>
              <option value="307">307</option>
              <option value="308">308</option>
            </select>
          </label>
          <label className="checkbox-row">
            <input name="active" type="checkbox" defaultChecked />
            <span>Active</span>
          </label>
          <button className="btn btn-primary" type="submit">
            Save redirect
          </button>
        </form>
      </div>
      <AdminTable error={result.error} empty="No redirects yet." hasData={result.data.length > 0}>
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Target</th>
              <th>Status</th>
              <th>Active</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {result.data.map((redirect) => (
              <tr key={redirect.id}>
                <td>{redirect.source_path}</td>
                <td>{redirect.target_path}</td>
                <td>{redirect.status_code}</td>
                <td>{redirect.active ? 'yes' : 'no'}</td>
                <td>
                  <form action={deleteAdminRowAction}>
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="table" value="redirects" />
                    <input type="hidden" name="id" value={redirect.id} />
                    <button className="text-button" type="submit">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
    </div>
  )
}

async function SettingsSection({ locale }: { locale: Locale }) {
  const result = await getSettings()
  return (
    <div className="admin-grid">
      <div className="admin-panel">
        <h2>Upsert setting</h2>
        <form action={upsertSettingAction} className="form-stack compact">
          <input type="hidden" name="locale" value={locale} />
          <label>
            <span>Key</span>
            <input name="key" placeholder="site.example" required />
          </label>
          <label>
            <span>JSON value</span>
            <textarea name="value" rows={5} placeholder={'{"enabled":true}'} />
          </label>
          <label>
            <span>Description</span>
            <input name="description" />
          </label>
          <button className="btn btn-primary" type="submit">
            Save setting
          </button>
        </form>
      </div>
      <AdminTable error={result.error} empty="No settings yet." hasData={result.data.length > 0}>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Description</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((setting) => (
              <tr key={setting.key}>
                <td>{setting.key}</td>
                <td>
                  <code>{JSON.stringify(setting.value)}</code>
                </td>
                <td>{setting.description || '-'}</td>
                <td>{formatDate(setting.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
    </div>
  )
}

function SeoForm({ locale }: { locale: Locale }) {
  return (
    <form action={upsertSeoEntryAction} className="form-stack compact">
      <input type="hidden" name="locale" value={locale} />
      <label>
        <span>Locale</span>
        <select name="entry_locale" defaultValue={locale}>
          {locales.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Path</span>
        <input name="path" placeholder="/en/example" required />
      </label>
      <label>
        <span>Title</span>
        <input name="title" required />
      </label>
      <label>
        <span>Description</span>
        <textarea name="description" required rows={4} />
      </label>
      <label>
        <span>Canonical path</span>
        <input name="canonical_path" />
      </label>
      <label>
        <span>OG title</span>
        <input name="og_title" />
      </label>
      <label>
        <span>OG description</span>
        <input name="og_description" />
      </label>
      <label>
        <span>Keywords</span>
        <input name="keywords" placeholder="comma, separated, keywords" />
      </label>
      <label className="checkbox-row">
        <input name="noindex" type="checkbox" />
        <span>Noindex</span>
      </label>
      <button className="btn btn-primary" type="submit">
        Save SEO entry
      </button>
    </form>
  )
}

function AdminTable({
  error,
  empty,
  hasData,
  children,
}: {
  error: string | null
  empty: string
  hasData: boolean
  children: ReactNode
}) {
  return (
    <div className="admin-table-wrap">
      {error ? <p className="form-status error">{error}</p> : null}
      {hasData ? children : <p className="small admin-empty">{empty}</p>}
    </div>
  )
}

function sectionTitle(section: AdminSection) {
  const titles: Record<AdminSection, string> = {
    contacts: 'Contacts',
    inquiries: 'Inquiries',
    analytics: 'Analytics',
    files: 'Files',
    seo: 'SEO registry',
    redirects: 'Redirects',
    settings: 'Settings',
  }
  return titles[section]
}

function sectionLede(section: AdminSection) {
  const ledes: Record<AdminSection, string> = {
    contacts: 'Customer and lead records captured through forms and backend flows.',
    inquiries: 'Support and sales messages with status, priority, assignment, and audit trail.',
    analytics: 'Site activity and conversion metrics captured by this project.',
    files: 'Storage buckets and file registry for project assets and uploads.',
    seo: 'Per-locale metadata, canonical paths, noindex flags, keywords, and schema ownership.',
    redirects: 'Operational redirect map for migrations and SEO cleanup.',
    settings: 'Small runtime knobs that belong in the database, not scattered constants.',
  }
  return ledes[section]
}

function formatDate(value: string | null | undefined) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getHealthReport } from '@/lib/health'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import { getPageCopy } from '@/lib/i18n/pages'
import { site } from '@/lib/site'

export const dynamic = 'force-dynamic'

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const copy = getPageCopy(locale)
  return {
    title: copy.statusPage.metadataTitle,
    description: copy.statusPage.metadataDescription,
    alternates: {
      canonical: `/${locale}/status`,
      languages: Object.fromEntries(locales.map((item) => [item, `${site.url}/${item}/status`])),
    },
  }
}

export default async function StatusPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = getPageCopy(locale as Locale)
  const report = await getHealthReport()

  return (
    <>
      <section className="route-hero">
        <div className="page">
          <div className="section-eyebrow">{copy.statusPage.eyebrow}</div>
          <h1>{copy.statusPage.title}</h1>
          <p className="lede">{copy.statusPage.lede}</p>
        </div>
      </section>

      <section>
        <div className="page">
          <div className="kpi">
            <div>
              <div className="v">{report.status}</div>
              <div className="l">{copy.common.status}</div>
            </div>
            <div>
              <div className="v">{report.checks.filter((check) => check.ok).length}</div>
              <div className="l">{copy.common.passing}</div>
            </div>
            <div>
              <div className="v">{report.checks.filter((check) => !check.ok).length}</div>
              <div className="l">{copy.common.needsWork}</div>
            </div>
            <div>
              <div className="v">{report.build.nextVersion}</div>
              <div className="l">Next.js</div>
            </div>
          </div>

          <div className="status-list">
            {report.checks.map((check) => (
              <div key={check.name} className="status-row" data-ok={check.ok}>
                <div>
                  <b>{check.name.replaceAll('_', ' ')}</b>
                  <span>{check.message}</span>
                </div>
                <code>{check.ok ? copy.common.ok : copy.common.check}</code>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

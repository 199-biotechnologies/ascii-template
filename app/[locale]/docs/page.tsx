import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale, locales, type Locale, withLocale } from '@/lib/i18n/config'
import { getPageCopy } from '@/lib/i18n/pages'
import { site } from '@/lib/site'

type Params = Promise<{ locale: string }>

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const copy = getPageCopy(locale)
  return {
    title: copy.docs.metadataTitle,
    description: copy.docs.metadataDescription,
    alternates: {
      canonical: `/${locale}/docs`,
      languages: Object.fromEntries(locales.map((item) => [item, `${site.url}/${item}/docs`])),
    },
  }
}

export default async function DocsPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const currentLocale = locale as Locale
  const copy = getPageCopy(currentLocale)

  return (
    <>
      <section className="route-hero">
        <div className="page">
          <div className="section-eyebrow">{copy.docs.eyebrow}</div>
          <h1>{copy.docs.title}</h1>
          <p className="lede">{copy.docs.lede}</p>
        </div>
      </section>

      <section>
        <div className="page">
          <ol className="findings">
            {copy.docs.steps.map((step) => (
              <li key={step.head}>
                <span className="head">{step.head}</span>
                {step.text}
              </li>
            ))}
          </ol>

          <div className="module-grid" style={{ marginTop: 36 }}>
            {copy.docs.docs.map((doc) => (
              <DocLink key={doc.path} {...doc} />
            ))}
          </div>

          <div className="page-link-grid">
            <Link href={withLocale('/status', currentLocale)}>{copy.docs.links[0]}</Link>
            <Link href={withLocale('/admin', currentLocale)}>{copy.docs.links[1]}</Link>
            <Link href={withLocale('/contact', currentLocale)}>{copy.docs.links[2]}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function DocLink({ path, title, text }: { path: string; title: string; text: string }) {
  return (
    <div>
      <code>{path}</code>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  )
}

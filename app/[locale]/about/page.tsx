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
    title: copy.about.metadataTitle,
    description: copy.about.metadataDescription,
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries(locales.map((item) => [item, `${site.url}/${item}/about`])),
    },
  }
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const currentLocale = locale as Locale
  const copy = getPageCopy(currentLocale)

  return (
    <>
      <section className="route-hero">
        <div className="page">
          <div className="section-eyebrow">{copy.about.eyebrow}</div>
          <h1>{copy.about.title}</h1>
          <p className="lede">{copy.about.lede}</p>
        </div>
      </section>

      <section>
        <div className="page">
          <div className="grid-2">
            <div>
              <h2>{copy.about.whyTitle}</h2>
              {copy.about.why.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <div>
              <h2>{copy.about.borrowTitle}</h2>
              <ol className="findings">
                {copy.about.borrowed.map((item) => (
                  <li key={item.head}>
                    <span className="head">{item.head}</span>
                    {item.text}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="page-link-grid">
            <Link href={withLocale('/features', currentLocale)}>{copy.about.links[0]}</Link>
            <Link href={withLocale('/status', currentLocale)}>{copy.about.links[1]}</Link>
            <Link href={withLocale('/docs', currentLocale)}>{copy.about.links[2]}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

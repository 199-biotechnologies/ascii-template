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
    title: copy.features.metadataTitle,
    description: copy.features.metadataDescription,
    alternates: {
      canonical: `/${locale}/features`,
      languages: Object.fromEntries(locales.map((item) => [item, `${site.url}/${item}/features`])),
    },
  }
}

export default async function FeaturesPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const currentLocale = locale as Locale
  const copy = getPageCopy(currentLocale)

  return (
    <>
      <section className="route-hero">
        <div className="page">
          <div className="section-eyebrow">{copy.features.eyebrow}</div>
          <h1>{copy.features.title}</h1>
          <p className="lede">{copy.features.lede}</p>
        </div>
      </section>

      <section>
        <div className="page">
          <div className="module-grid">
            {copy.features.cards.slice(0, 3).map((item) => (
              <Feature key={item.path} {...item} />
            ))}
          </div>
          <div className="module-grid" style={{ marginTop: 18 }}>
            {copy.features.cards.slice(3).map((item) => (
              <Feature key={item.path} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="page">
          <div className="grid-2">
            <div>
              <div className="section-eyebrow">{copy.features.defaultEyebrow}</div>
              <h2>{copy.features.defaultTitle}</h2>
              <ol className="findings">
                {copy.features.defaultItems.map((item) => (
                  <li key={item.head}>
                    <span className="head">{item.head}</span>
                    {item.text}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <div className="section-eyebrow">{copy.features.optionalEyebrow}</div>
              <h2>{copy.features.optionalTitle}</h2>
              <ol className="findings">
                {copy.features.optionalItems.map((item) => (
                  <li key={item.head}>
                    <span className="head">{item.head}</span>
                    {item.text}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="page-link-grid">
            <Link href={withLocale('/docs', currentLocale)}>{copy.features.links[0]}</Link>
            <Link href={withLocale('/pricing', currentLocale)}>{copy.features.links[1]}</Link>
            <Link href={withLocale('/contact', currentLocale)}>{copy.features.links[2]}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Feature({ path, title, text }: { path: string; title: string; text: string }) {
  return (
    <div>
      <code>{path}</code>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  )
}

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
    title: copy.pricing.metadataTitle,
    description: copy.pricing.metadataDescription,
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: Object.fromEntries(locales.map((item) => [item, `${site.url}/${item}/pricing`])),
    },
  }
}

export default async function PricingPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const currentLocale = locale as Locale
  const copy = getPageCopy(currentLocale)
  const hrefs = [withLocale('/features', currentLocale), withLocale('/contact', currentLocale), withLocale('/docs', currentLocale)]

  return (
    <>
      <section className="route-hero">
        <div className="page">
          <div className="section-eyebrow">{copy.pricing.eyebrow}</div>
          <h1>{copy.pricing.title}</h1>
          <p className="lede">{copy.pricing.lede}</p>
        </div>
      </section>

      <section>
        <div className="page">
          <div className="pricing-grid">
            {copy.pricing.plans.map((plan, index) => (
              <Plan key={plan.tier} {...plan} href={hrefs[index]} ribbon={copy.common.recommended} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Plan({
  tier,
  price,
  note,
  items,
  cta,
  href,
  ribbon,
  featured,
}: {
  tier: string
  price: string
  note: string
  items: string[]
  cta: string
  href: string
  ribbon: string
  featured?: boolean
}) {
  return (
    <div className={featured ? 'pricing-card featured' : 'pricing-card'}>
      {featured ? <div className="ribbon">{ribbon}</div> : null}
      <div className="tier">{tier}</div>
      <div className="price">
        {price}
        <small>{note}</small>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link href={href} className={featured ? 'btn btn-primary btn-arrow' : 'btn btn-ghost btn-arrow'}>
        {cta}
      </Link>
    </div>
  )
}

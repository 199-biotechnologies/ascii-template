import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContactForm } from '@/components/contact-form'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getPageCopy } from '@/lib/i18n/pages'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import { site } from '@/lib/site'

type Params = Promise<{ locale: string }>

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)

  return {
    title: dict.contact.title,
    description: dict.contact.lede,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}/contact`])),
    },
  }
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const normalizedLocale = locale as Locale
  const dict = getDictionary(normalizedLocale)
  const copy = getPageCopy(normalizedLocale)

  return (
    <section>
      <div className="page">
        <div className="section-eyebrow">{dict.contact.title}</div>
        <h1>{dict.contact.title}</h1>
        <p className="lede">{dict.contact.lede}</p>

        <div className="grid-2 contact-layout">
          <div>
            <ContactForm locale={normalizedLocale} dictionary={dict} />
          </div>
          <div>
            <h3>{copy.contact.proofTitle}</h3>
            <ol className="findings">
              {copy.contact.proof.map((item) => (
                <li key={item.head}>
                  <span className="head">{item.head}</span>
                  {item.text}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

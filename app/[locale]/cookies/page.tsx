import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/legal-page'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
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
    title: copy.cookies.metadataTitle,
    description: copy.cookies.metadataDescription,
    alternates: {
      canonical: `/${locale}/cookies`,
      languages: Object.fromEntries(locales.map((item) => [item, `${site.url}/${item}/cookies`])),
    },
  }
}

export default async function CookiesPage({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = getPageCopy(locale as Locale)

  return <LegalPage copy={copy.cookies} />
}

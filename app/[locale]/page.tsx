import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import HomePage from '@/components/home-page'
import { getDictionary } from '@/lib/i18n/dictionaries'
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
    title: dict.home.title,
    description: dict.home.lede,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`])),
    },
  }
}

export default async function LocalizedHome({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <HomePage locale={locale as Locale} dictionary={getDictionary(locale as Locale)} />
}

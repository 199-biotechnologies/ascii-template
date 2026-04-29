import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogIndex from '@/app/blog/page'
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
    title: copy.blog.metadataTitle,
    description: copy.blog.metadataDescription,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: Object.fromEntries(locales.map((item) => [item, `${site.url}/${item}/blog`])),
    },
  }
}

export default async function LocalizedBlogIndex({ params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <BlogIndex locale={locale as Locale} />
}

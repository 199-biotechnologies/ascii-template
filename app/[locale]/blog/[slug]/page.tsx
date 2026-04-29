import { notFound } from 'next/navigation'
import PostPage, { generateMetadata as generatePostMetadata, generateStaticParams as generatePostParams } from '@/app/blog/[slug]/page'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'

type Params = Promise<{ locale: string; slug: string }>

export async function generateStaticParams() {
  const posts = await generatePostParams()
  return locales.flatMap((locale) => posts.map((post) => ({ ...post, locale })))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  return generatePostMetadata({ params: Promise.resolve({ slug }) })
}

export default async function LocalizedPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  return <PostPage params={Promise.resolve({ slug })} locale={locale as Locale} />
}

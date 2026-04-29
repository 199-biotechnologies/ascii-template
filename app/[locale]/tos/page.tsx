import { redirect } from 'next/navigation'
import { isLocale, locales } from '@/lib/i18n/config'

type Params = Promise<{ locale: string }>

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function TosRedirect({ params }: { params: Params }) {
  const { locale } = await params
  redirect(`/${isLocale(locale) ? locale : 'en'}/terms`)
}

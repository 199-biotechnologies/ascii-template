export const locales = ['en', 'fr', 'es', 'de', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
export const rtlLocales: Locale[] = ['ar']

export const localeNames: Record<Locale, { label: string; native: string; short: string }> = {
  en: { label: 'English', native: 'English', short: 'EN' },
  fr: { label: 'French', native: 'Français', short: 'FR' },
  es: { label: 'Spanish', native: 'Español', short: 'ES' },
  de: { label: 'German', native: 'Deutsch', short: 'DE' },
  ar: { label: 'Arabic', native: 'العربية', short: 'AR' },
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function getDirection(locale: Locale) {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0]
  return isLocale(segment) ? segment : defaultLocale
}

export function withLocale(path: string, locale: Locale) {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean === '/' ? '' : clean}`
}

export function stripLocale(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  if (isLocale(segments[0])) {
    return `/${segments.slice(1).join('/')}` || '/'
  }
  return pathname || '/'
}

export function localizedPath(pathname: string, locale: Locale) {
  return withLocale(stripLocale(pathname), locale)
}

export function getPreferredLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale

  const requested = acceptLanguage
    .split(',')
    .map((part) => part.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean)

  for (const item of requested) {
    const base = item.split('-')[0]
    if (isLocale(item)) return item
    if (isLocale(base)) return base
  }

  return defaultLocale
}

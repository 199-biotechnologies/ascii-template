/**
 * i18n addon — locale config.
 *
 * Wiring (3 steps):
 * 1. Move this file to /i18n/config.ts
 * 2. Move ../middleware.ts to /middleware.ts (project root)
 * 3. Create translation files under /i18n/locales/<locale>.json
 *
 * Then wrap your routes in /app/[locale]/ and use the translations.
 * See ../README.md for the full guide.
 */

export const locales = ['en', 'fr', 'es', 'zh', 'ru', 'ar'] as const
export const defaultLocale = 'en' as const
export type Locale = (typeof locales)[number]

export const rtlLocales = ['ar'] as const
export const LOCALE_COOKIE = 'locale'

export function isValidLocale(locale: unknown): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale as (typeof rtlLocales)[number]) ? 'rtl' : 'ltr'
}

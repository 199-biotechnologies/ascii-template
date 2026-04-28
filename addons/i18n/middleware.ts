/**
 * i18n addon — locale middleware (simplified from clinic-starter).
 *
 * What it does:
 * - Detects locale from cookie → Accept-Language → defaultLocale
 * - Redirects "/" to "/<locale>/", "/page" to "/<locale>/page"
 * - Handles multi-locale segments (e.g. /en/fr/page → /en/page)
 * - Persists choice in a 1-year cookie
 * - Breaks redirect loops via x-redirect-count header
 *
 * Wiring:
 * 1. Move this file to /middleware.ts (project root)
 * 2. Move ./config.ts to /i18n/config.ts
 * 3. Wrap your routes in /app/[locale]/page.tsx
 * 4. Update <html lang={locale} dir={getDirection(locale)}> in layout
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, isValidLocale, LOCALE_COOKIE, locales } from './config'

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale

  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const browserLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split('-')[0].trim().toLowerCase())
      .find((lang) => isValidLocale(lang))
    if (browserLocale) return browserLocale
  }

  return defaultLocale
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const search = request.nextUrl.search
  const hash = request.nextUrl.hash

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const redirectCount = parseInt(request.headers.get('x-redirect-count') || '0')
  if (redirectCount > 2) return NextResponse.next()

  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '').replace(/\/+/g, '/')
  const segments = normalized.split('/').filter(Boolean)
  const first = segments[0]
  const hasValidLocale = first && isValidLocale(first)

  // Multi-locale segments: keep only the first.
  const localeCount = segments.filter((s) => isValidLocale(s)).length
  if (localeCount > 1) {
    const firstLocale = segments.find((s) => isValidLocale(s))!
    const cleanSegs = [firstLocale, ...segments.filter((s) => !isValidLocale(s))]
    const newUrl = new URL(`/${cleanSegs.join('/')}${search}${hash}`, request.url)
    const res = NextResponse.redirect(newUrl)
    res.headers.set('x-redirect-count', String(redirectCount + 1))
    return res
  }

  if (hasValidLocale) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
    if (first !== cookieLocale) {
      const res = NextResponse.next()
      res.cookies.set(LOCALE_COOKIE, first, {
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      })
      return res
    }
    return NextResponse.next()
  }

  // No locale prefix — redirect.
  const locale = getLocale(request)
  const tail = normalized === '/' ? '' : normalized
  const newUrl = new URL(`/${locale}${tail}${search}${hash}`, request.url)
  const res = NextResponse.redirect(newUrl)
  res.headers.set('x-redirect-count', String(redirectCount + 1))
  res.cookies.set(LOCALE_COOKIE, locale, {
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
}

import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, getPreferredLocale, isLocale } from '@/lib/i18n/config'
import { updateSupabaseSession } from '@/lib/supabase/proxy'

const PUBLIC_FILE = /\.(.*)$/
const legacyUnprefixed = new Set(['/blog', '/admin', '/contact'])

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return updateSupabaseSession(request)
  }

  if (pathname === '/') {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    const locale = isLocale(cookieLocale) ? cookieLocale : getPreferredLocale(request.headers.get('accept-language'))
    return NextResponse.redirect(new URL(`/${locale || defaultLocale}`, request.url))
  }

  const first = pathname.split('/').filter(Boolean)[0]
  if (!isLocale(first) && legacyUnprefixed.has(`/${first}`)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  }

  return updateSupabaseSession(request)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}

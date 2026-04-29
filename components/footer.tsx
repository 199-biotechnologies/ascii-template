'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getLocaleFromPathname, localeNames, locales, localizedPath, withLocale } from '@/lib/i18n/config'

export function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname || '/')
  const dict = getDictionary(locale)
  const primaryItems = [
    { href: withLocale('/', locale), label: dict.nav.home },
    { href: withLocale('/features', locale), label: dict.nav.features },
    { href: withLocale('/pricing', locale), label: dict.nav.pricing },
    { href: withLocale('/blog', locale), label: dict.nav.blog },
    { href: withLocale('/contact', locale), label: dict.nav.contact },
  ]
  const utilityItems = [
    { href: withLocale('/about', locale), label: dict.nav.about },
    { href: withLocale('/docs', locale), label: dict.nav.docs },
    { href: withLocale('/status', locale), label: dict.nav.status },
    { href: withLocale('/admin', locale), label: dict.nav.admin },
  ]
  const legalItems = [
    { href: withLocale('/privacy', locale), label: dict.nav.privacy },
    { href: withLocale('/cookies', locale), label: dict.nav.cookies },
    { href: withLocale('/terms', locale), label: dict.nav.terms },
  ]

  function openCookieSettings() {
    window.dispatchEvent(new Event('ascii-cookie-preferences'))
  }

  return (
    <footer className="site">
      <div className="page-wide">
        <div className="grid">
          <div>
            <h4>{site.name}</h4>
            <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 360 }}>
              {site.description}
            </p>
          </div>
          <div>
            <h4>{dict.footer.sections}</h4>
            {primaryItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>{dict.footer.system}</h4>
            {utilityItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>{dict.footer.legal}</h4>
            {legalItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <button type="button" className="muted-link" onClick={openCookieSettings}>
              {dict.footer.cookieSettings}
            </button>
          </div>
          <div>
            <h4>{dict.footer.connect}</h4>
            <a href={site.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.social.x} target="_blank" rel="noreferrer">
              X
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
        <div className="footer-language" aria-label={dict.nav.language}>
          <span>{dict.nav.language}</span>
          {locales.map((item) => (
            <Link key={item} href={localizedPath(pathname || '/', item)} hrefLang={item} data-active={item === locale}>
              {localeNames[item].short}
            </Link>
          ))}
        </div>
        <div className="small">
          © {new Date().getFullYear()} {site.name} · {dict.footer.made}
        </div>
      </div>
    </footer>
  )
}

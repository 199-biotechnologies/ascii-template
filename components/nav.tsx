'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getLocaleFromPathname, withLocale } from '@/lib/i18n/config'
import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname || '/')
  const dict = getDictionary(locale)
  const navItems = [
    { href: withLocale('/features', locale), label: dict.nav.features },
    { href: withLocale('/pricing', locale), label: dict.nav.pricing },
    { href: withLocale('/blog', locale), label: dict.nav.blog },
    { href: withLocale('/contact', locale), label: dict.nav.contact },
    { href: withLocale('/admin', locale), label: dict.nav.admin },
  ]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <div className="nav-inner">
          <Link href={withLocale('/', locale)} className="nav-logo" onClick={() => setOpen(false)}>
            <span className="nav-logo-mark">{site.name}</span>
            <span className="nav-badge">v0.2</span>
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
            <a
              href={site.social.github}
              className="btn btn-ghost btn-arrow nav-cta"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <LanguageSwitcher label={dict.nav.language} />
            <ThemeToggle />
            <button
              type="button"
              className="icon-btn menu-trigger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <BurgerIcon />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="mobile-drawer"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="mobile-drawer-scrim" onClick={() => setOpen(false)} />
        <div className="mobile-drawer-panel">
          <div className="mobile-drawer-head">
            <span className="nav-logo-mark">{site.name}</span>
            <button
              type="button"
              className="icon-btn"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="mobile-drawer-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mobile-language">
            <h4>{dict.nav.language}</h4>
            <LanguageSwitcher label={dict.nav.language} compact onNavigate={() => setOpen(false)} />
          </div>
          <div className="mobile-drawer-cta">
            <a
              href={site.social.github}
              className="btn btn-ghost btn-arrow"
              target="_blank"
              rel="noreferrer"
              style={{ width: '100%' }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

function BurgerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M2.5 5h11M2.5 8h11M2.5 11h11" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </svg>
  )
}

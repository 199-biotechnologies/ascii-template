'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { getLocaleFromPathname, getDirection, localeNames, locales, localizedPath, type Locale } from '@/lib/i18n/config'

type LanguageSwitcherProps = {
  label?: string
  compact?: boolean
  onNavigate?: () => void
}

export function LanguageSwitcher({ label = 'Language', compact = false, onNavigate }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [searchString, setSearchString] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname() || '/'
  const current = getLocaleFromPathname(pathname)

  useEffect(() => {
    setSearchString(window.location.search.replace(/^\?/, ''))
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function hrefFor(locale: Locale) {
    const base = localizedPath(pathname, locale)
    return `${base}${searchString ? `?${searchString}` : ''}`
  }

  function remember(locale: Locale) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`
    localStorage.setItem('ascii_locale', locale)
    setOpen(false)
    onNavigate?.()
  }

  return (
    <div className={compact ? 'language-switcher compact' : 'language-switcher'} ref={ref}>
      <button
        type="button"
        className="language-trigger"
        aria-label={`${label}: ${localeNames[current].label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{localeNames[current].short}</span>
        <b>{localeNames[current].native}</b>
      </button>

      <div className="language-menu" data-open={open} role="menu" aria-label={label}>
        {locales.map((locale) => (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            lang={locale}
            dir={getDirection(locale)}
            role="menuitem"
            data-active={locale === current}
            onClick={() => remember(locale)}
          >
            <span>{localeNames[locale].short}</span>
            <b>{localeNames[locale].native}</b>
            <em>{localeNames[locale].label}</em>
          </Link>
        ))}
      </div>
    </div>
  )
}

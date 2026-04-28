'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { site } from '@/lib/site'
import { ThemeToggle } from './theme-toggle'

export function Nav() {
  const [open, setOpen] = useState(false)

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
          <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
            <span className="nav-logo-mark">{site.name}</span>
            <span className="nav-badge">v0.1</span>
          </Link>
          <div className="nav-links">
            {site.nav.map((item) => (
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
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
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

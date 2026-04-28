import Link from 'next/link'
import { site } from '@/lib/site'

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
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
        </div>
      </div>
    </nav>
  )
}

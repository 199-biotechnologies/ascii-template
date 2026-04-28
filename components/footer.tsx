import Link from 'next/link'
import { site } from '@/lib/site'

export function Footer() {
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
            <h4>Sections</h4>
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Modules</h4>
            <span className="muted-link">i18n · auth · stripe</span>
            <span className="muted-link">vitals · indexnow</span>
            <span className="muted-link">markdown · cms</span>
          </div>
          <div>
            <h4>Connect</h4>
            <a href={site.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.social.x} target="_blank" rel="noreferrer">
              X
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
        <div className="small">
          © {new Date().getFullYear()} {site.name} · MIT licensed · Made for builders.
        </div>
      </div>
    </footer>
  )
}

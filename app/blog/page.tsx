import Link from 'next/link'
import type { Metadata } from 'next'
import { listPosts } from '@/lib/content'
import { defaultLocale, type Locale, withLocale } from '@/lib/i18n/config'
import { getPageCopy } from '@/lib/i18n/pages'

export const metadata: Metadata = {
  title: getPageCopy(defaultLocale).blog.metadataTitle,
  description: getPageCopy(defaultLocale).blog.metadataDescription,
}

export default function BlogIndex({ locale = defaultLocale }: { locale?: Locale }) {
  const posts = listPosts()
  const copy = getPageCopy(locale)
  return (
    <section>
      <div className="page">
        <div className="section-eyebrow">{copy.blog.eyebrow}</div>
        <h1 style={{ marginBottom: 24 }}>{copy.blog.title}</h1>
        <p className="lede">
          {copy.blog.lede}
        </p>

        <div style={{ marginTop: 36 }}>
          {posts.length === 0 ? (
            <p className="small">{copy.blog.empty}</p>
          ) : (
            <ol className="findings" style={{ borderTop: '1px solid var(--line)' }}>
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={withLocale(`/blog/${p.slug}`, locale)}
                    style={{ borderBottom: 'none', display: 'block' }}
                  >
                    <span className="head" style={{ color: 'var(--ink)' }}>
                      {p.title}
                    </span>
                    {p.excerpt ? (
                      <span style={{ color: 'var(--body)', fontSize: 14.5 }}>{p.excerpt}</span>
                    ) : null}
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                        fontSize: 11,
                        color: 'var(--muted)',
                        letterSpacing: '0.06em',
                        marginTop: 8,
                      }}
                    >
                      {p.date}
                      {p.tags && p.tags.length ? ` · ${p.tags.join(' · ')}` : ''}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}

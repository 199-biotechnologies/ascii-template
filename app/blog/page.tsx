import Link from 'next/link'
import type { Metadata } from 'next'
import { listPosts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing from the team.',
}

export default function BlogIndex() {
  const posts = listPosts()
  return (
    <section>
      <div className="page">
        <div className="section-eyebrow">Writing</div>
        <h1 style={{ marginBottom: 24 }}>Blog</h1>
        <p className="lede">
          Posts live in <code className="code-chip">/content</code>. Add a markdown file with front-matter and it
          shows up here, newest first.
        </p>

        <div style={{ marginTop: 36 }}>
          {posts.length === 0 ? (
            <p className="small">No posts yet. Drop a markdown file in <code className="code-chip">/content</code>.</p>
          ) : (
            <ol className="findings" style={{ borderTop: '1px solid var(--line)' }}>
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
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

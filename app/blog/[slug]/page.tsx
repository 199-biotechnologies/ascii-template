import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPost, listPosts } from '@/lib/content'
import { defaultLocale, type Locale, withLocale } from '@/lib/i18n/config'
import { getPageCopy } from '@/lib/i18n/pages'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function PostPage({ params, locale = defaultLocale }: { params: Params; locale?: Locale }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const copy = getPageCopy(locale)

  return (
    <section>
      <div className="page">
        <Link href={withLocale('/blog', locale)} className="small" style={{ borderBottom: 'none' }}>
          {copy.common.backToBlog}
        </Link>

        <div className="section-eyebrow" style={{ marginTop: 24 }}>
          {post.date}
          {post.tags && post.tags.length ? ` · ${post.tags.join(' · ')}` : ''}
        </div>
        <h1 style={{ maxWidth: '24ch' }}>{post.title}</h1>
        {post.excerpt ? <p className="lede">{post.excerpt}</p> : null}

        <article className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />

        {post.author ? (
          <p className="small" style={{ marginTop: 48 }}>
            — {post.author}
          </p>
        ) : null}
      </div>
    </section>
  )
}

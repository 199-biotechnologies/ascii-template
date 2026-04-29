import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { listPosts } from '@/lib/content'
import { locales } from '@/lib/i18n/config'

const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/features', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/docs', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/status', changeFrequency: 'daily', priority: 0.5 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/cookies', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.4 },
]

function languageAlternates(path: string) {
  return Object.fromEntries(locales.map((locale) => [locale, `${site.url}/${locale}${path}`]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  )

  const posts: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    listPosts().map((p) => ({
      url: `${site.url}/${locale}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: { languages: languageAlternates(`/blog/${p.slug}`) },
    })),
  )

  return [...base, ...posts]
}

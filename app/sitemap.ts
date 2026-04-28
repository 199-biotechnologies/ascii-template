import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

/**
 * Add new routes here as you build. Next runs this at build time and
 * exposes /sitemap.xml automatically.
 */
const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}

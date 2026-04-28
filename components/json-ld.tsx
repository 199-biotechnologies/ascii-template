import { site } from '@/lib/site'

/**
 * Generic JSON-LD: Organization + WebSite. Drop into <head> via layout.
 * Add ProductSchema, ArticleSchema, FAQSchema as needed — keep it lean.
 */
export function JsonLd() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      sameAs: Object.values(site.social).filter(Boolean),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
      description: site.description,
    },
  ]
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

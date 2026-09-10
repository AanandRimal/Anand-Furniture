import type { MetadataRoute } from 'next'
import { categories, company } from '@/lib/catalog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages = ['', '/collections', '/interior-design', '/about', '/contact']
  return [
    ...pages.map((p) => ({
      url: `${company.url}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p === '' ? 1 : p === '/collections' || p === '/interior-design' ? 0.9 : 0.7,
    })),
    ...categories.map((c) => ({
      url: `${company.url}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}

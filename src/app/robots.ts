import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = 'https://lifeacademy-cc.dencapvision.workers.dev'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/student/', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}

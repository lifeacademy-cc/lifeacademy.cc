import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lifeacademy-cc.dencapvision.workers.dev'

  return [
    { url: base,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/courses`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/teachers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/news`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/contact`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/level-test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}

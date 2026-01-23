import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo-utils';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'],
        },
        sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    }
}

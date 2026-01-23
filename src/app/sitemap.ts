import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import { BlogPost } from '@/models/BlogPost';
import { siteConfig } from '@/lib/seo-utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await dbConnect();

    // Base URL
    const baseUrl = siteConfig.siteUrl;

    // Static pages
    const routes = [
        '',
        '/about',
        '/collection',
        '/blog',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic blog posts
    const posts = await BlogPost.find({ status: 'published' }).select('slug updatedAt');

    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`, // Slug is preserved (Arabic or English)
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}

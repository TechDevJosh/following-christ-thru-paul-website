import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://followingchristthrupaul.com'; // Replace with your actual domain

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/verse-by-verse`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/topics`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ask`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/connect/subscribe`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/connect/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/connect/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  try {
    // Dynamic sermon pages
    const sermonsQuery = `*[_type == "verseByVerse" && defined(slug.current)]{
      "slug": slug.current,
      book,
      publishedAt,
      _updatedAt
    }`;
    const sermons = await client.fetch(sermonsQuery);
    
    const sermonPages = sermons.map((sermon: any) => ({
      url: `${baseUrl}/verse-by-verse/${sermon.book}/${sermon.slug}`,
      lastModified: new Date(sermon._updatedAt || sermon.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // Dynamic topic pages
    const topicsQuery = `*[_type == "topics" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }`;
    const topics = await client.fetch(topicsQuery);
    
    const topicPages = topics.map((topic: any) => ({
      url: `${baseUrl}/topics/${topic.slug}`,
      lastModified: new Date(topic._updatedAt || topic.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Dynamic resource pages
    const resourcesQuery = `*[_type == "resources" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }`;
    const resources = await client.fetch(resourcesQuery);
    
    const resourcePages = resources.map((resource: any) => ({
      url: `${baseUrl}/resources/${resource.slug}`,
      lastModified: new Date(resource._updatedAt || resource.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Dynamic Q&A pages
    const askQuery = `*[_type == "ask" && defined(slug.current) && status == "published"]{
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }`;
    const askPages = await client.fetch(askQuery);
    
    const qaPages = askPages.map((qa: any) => ({
      url: `${baseUrl}/ask/${qa.slug}`,
      lastModified: new Date(qa._updatedAt || qa.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

    return [
      ...staticPages,
      ...sermonPages,
      ...topicPages,
      ...resourcePages,
      ...qaPages,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages if dynamic content fails
    return staticPages;
  }
}
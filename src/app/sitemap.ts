import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export const revalidate = 1800; // 30 minutes

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
      url: `${baseUrl}/school`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/newsletter`,
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
    const { data: sermons, error: sermonsError } = await supabase
      .from('verse_by_verse')
      .select('slug, book, published_at, updated_at');
    if (sermonsError) throw sermonsError;
    
    const sermonPages = (sermons || []).map((sermon: any) => ({
      url: `${baseUrl}/verse-by-verse/${sermon.book}/${sermon.slug}`,
      lastModified: new Date(sermon.updated_at || sermon.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // Dynamic topic pages
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('slug, published_at, updated_at');
    if (topicsError) throw topicsError;
    
    const topicPages = (topics || []).map((topic: any) => ({
      url: `${baseUrl}/topics/${topic.slug}`,
      lastModified: new Date(topic.updated_at || topic.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Dynamic resource pages
    const { data: resources, error: resourcesError } = await supabase
      .from('resources')
      .select('slug, published_at, updated_at');
    if (resourcesError) throw resourcesError;
    
    const resourcePages = (resources || []).map((resource: any) => ({
      url: `${baseUrl}/resources/${resource.slug}`,
      lastModified: new Date(resource.updated_at || resource.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Dynamic Q&A pages
    const { data: askPages, error: askError } = await supabase
      .from('ask')
      .select('slug, published_at, updated_at')
      .eq('status', 'published');
    if (askError) throw askError;
    
    const qaPages = (askPages || []).map((qa: any) => ({
      url: `${baseUrl}/ask/${qa.slug}`,
      lastModified: new Date(qa.updated_at || qa.published_at),
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
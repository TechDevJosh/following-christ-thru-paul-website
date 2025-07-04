import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import ShareButton from '@/components/ShareButton';
import Navbar from '@/components/Navbar';

export const revalidate = 1800; // 30 minutes

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Define the query to get a specific topic
const TOPIC_QUERY = `*[_type == "topics" && slug.current == $slug][0]{
  _id,
  title,
  description,
  content,
  slug,
  publishedAt,
  _createdAt,
  youtubeUrl,
  featuredImage,
  tags
}`;

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const topic = await client.fetch(TOPIC_QUERY, { slug: resolvedParams.slug });
    
    if (!topic) {
      return {
        title: 'Topic Not Found | Following Christ Thru Paul',
        description: 'The requested topic could not be found.',
      };
    }

    // Get image for social sharing
    let imageUrl = 'https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png'; // Default logo
    
    if (topic.youtubeUrl) {
      // Use YouTube thumbnail
      let videoId = '';
      if (topic.youtubeUrl.includes('youtube.com/watch?v=')) {
        videoId = topic.youtubeUrl.split('watch?v=')[1]?.split('&')[0] || '';
      } else if (topic.youtubeUrl.includes('youtu.be/')) {
        videoId = topic.youtubeUrl.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      if (videoId) {
        imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } else if (topic.featuredImage) {
      // Use featured image from Sanity
      imageUrl = topic.featuredImage.asset?.url || imageUrl;
    }

    return {
      title: `${topic.title} | Following Christ Thru Paul`,
      description: topic.description || `Learn about ${topic.title} through biblical study and teaching.`,
      openGraph: {
        title: `${topic.title} | Following Christ Thru Paul`,
        description: topic.description || `Learn about ${topic.title} through biblical study and teaching.`,
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: topic.title,
        }],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${topic.title} | Following Christ Thru Paul`,
        description: topic.description || `Learn about ${topic.title} through biblical study and teaching.`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: 'Topic | Following Christ Thru Paul',
      description: 'Biblical topic study and teaching.',
    };
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const resolvedParams = await params;
  let topic;
  
  try {
    topic = await client.fetch(TOPIC_QUERY, { slug: resolvedParams.slug });
  } catch (error) {
    console.error('Error fetching topic:', error);
  }

  if (!topic) {
    // Instead of showing 404, show under construction for topics that don't exist yet
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
              Topic Coming Soon
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-body">
              This biblical topic study is currently being prepared and will be available soon.
            </p>
            <p className="text-lg text-blue-600 font-medium mb-8">
              We&apos;re working on comprehensive content for: <span className="font-bold">{resolvedParams.slug.replace(/-/g, ' ')}</span>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
              Explore Other Topics
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/topics"
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Browse All Topics</h3>
                <p className="text-gray-600 text-sm">See available biblical topics and studies</p>
              </Link>
              <Link
                href="/verse-by-verse"
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Verse by Verse</h3>
                <p className="text-gray-600 text-sm">Systematic Bible study through Scripture</p>
              </Link>
              <Link
                href="/ask"
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Ask Questions</h3>
                <p className="text-gray-600 text-sm">Submit your biblical questions</p>
              </Link>
              <Link
                href="/resources"
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Resources</h3>
                <p className="text-gray-600 text-sm">Study materials and tools</p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/topics"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Topics
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If topic exists, render the full topic page
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container-custom py-16">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
              {topic.title}
            </h1>
            {topic.description && (
              <p className="text-xl text-gray-600 font-body leading-relaxed">
                {topic.description}
              </p>
            )}
            <div className="mt-6 text-sm text-gray-500">
              Published: {topic.publishedAt ? 
                new Date(topic.publishedAt).toLocaleDateString() : 
                new Date(topic._createdAt).toLocaleDateString()
              }
            </div>
          </header>

          {/* YouTube Video */}
          {topic.youtubeUrl && (
            <div className="mb-12">
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src={(() => {
                    const url = topic.youtubeUrl;
                    let videoId = '';
                    
                    if (url.includes('youtube.com/watch?v=')) {
                      videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                    } else if (url.includes('youtu.be/')) {
                      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                    } else if (url.includes('youtube.com/embed/')) {
                      videoId = url.split('embed/')[1]?.split('?')[0] || '';
                    }
                    
                    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
                  })()}
                  title={topic.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {topic.content && Array.isArray(topic.content) && topic.content.length > 0 ? (
              <div className="space-y-6">
                {topic.content.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <div key={index} className="font-body text-lg leading-relaxed text-gray-800">
                        {block.children?.map((child: any, childIndex: number) => (
                          <span key={childIndex}>{child.text}</span>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className="text-gray-600 font-body text-lg">Content for this topic is being prepared.</p>
            )}
          </div>

          {/* Tags */}
          {topic.tags && Array.isArray(topic.tags) && topic.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="font-heading text-xl text-gray-900 mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {topic.tags.map((tag: any, index: number) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-body font-medium text-sm"
                  >
                    {typeof tag === 'string' ? tag : String(tag)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Button */}
          <section className="mb-12 pb-8 border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="font-heading text-xl sm:text-2xl text-gray-900">Share This Topic</h3>
              <div className="flex justify-end">
                <ShareButton title={topic.title} />
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

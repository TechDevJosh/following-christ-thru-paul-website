
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ArticleStructuredData } from '@/components/StructuredDataProvider';

export const revalidate = 1800; // 30 minutes

interface Topic {
  id: string;
  title: string;
  description: string;
  seo_description?: string;
  slug: string;
  youtube_url?: string;
  published_at: string;
}

export async function generateMetadata() {
  return {
    title: 'Salvation Messages | Following Christ Thru Paul',
    description: 'A collection of sermons focused on the topic of salvation.',
  };
}

export default async function SalvationPage() {
  let messages: Topic[] = [];
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('series', 'Salvation Messages')
      .order('published_at', { ascending: false });

    if (error) throw error;
    messages = data || [];
  } catch (error) {
    console.error('Error fetching salvation messages:', error);
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <ArticleStructuredData
        title="Salvation Messages"
        description="A collection of sermons focused on the topic of salvation."
        author="Following Christ Thru Paul Ministry"
        publishedDate={new Date().toISOString()}
        modifiedDate={new Date().toISOString()}
        imageUrl="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png"
      />
      <header role="banner">
        <Navbar />
      </header>
      <main className="container-custom py-16">
        <div className="mb-12">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/topics" className="hover:text-blue-700">Topics</Link>
            <span className="mx-2">/</span>
            <span>Salvation Messages</span>
          </nav>
          
          <h1 className="font-heading text-4xl text-gray-900 mb-4">Salvation Messages</h1>
          <p className="text-lg text-gray-600">{messages.length} topics in this series</p>
        </div>

        <div className="space-y-8">
          {messages.map((topic, index) => (
            <article key={topic.id} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-center bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow`}>
              {/* YouTube Thumbnail */}
              {topic.youtube_url && (
                <div className="w-1/2">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={(() => {
                        const url = topic.youtube_url;
                        let videoId = '';
                        if (url.includes('youtube.com/watch?v=')) {
                          videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                        } else if (url.includes('youtu.be/')) {
                          videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                        }
                        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
                      })()}
                      alt={topic.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className={`${topic.youtube_url ? 'w-1/2' : 'w-full'} p-8`}>
                <h2 className="font-heading text-2xl text-gray-900 mb-4">{topic.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {topic.seo_description || topic.description}
                </p>
                
                <Link
                  href={`/topics/${topic.slug}`}
                  className="inline-flex items-center text-blue-700 hover:text-blue-800 font-semibold transition-colors"
                >
                  Read Full Study
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No topics found in this series.</p>
            <Link href="/topics" className="text-blue-700 hover:text-blue-800 mt-4 inline-block">
              Browse All Topics
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

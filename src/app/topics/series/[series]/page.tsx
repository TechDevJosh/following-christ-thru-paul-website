import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

export { generateStaticParams } from './generateStaticParams';

interface Topic {
  id: string;
  title: string;
  description: string;
  seo_description?: string;
  slug: string;
  youtube_url?: string;
  series?: string;
  series_order?: number;
  published_at: string;
  content?: string;
}

interface SeriesPageProps {
  params: Promise<{ series: string }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const resolvedParams = await params;
  const seriesSlug = resolvedParams.series;
  const seriesName = seriesSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  let topics: Topic[] = [];
  
  try {
    const query = supabase
      .from('topics')
      .select('*')
      .order('series_order', { ascending: true })
      .order('published_at', { ascending: false });

    if (seriesName === 'General') {
      query.or('series.eq.General,series.is.null');
    } else {
      query.eq('series', seriesName);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    topics = data || [];
  } catch (error) {
    console.error('Error fetching series topics:', error);
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      
      <main className="container-custom py-16">
        <div className="mb-12">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/topics" className="hover:text-blue-700">Topics</Link>
            <span className="mx-2">/</span>
            <span>{seriesName}</span>
          </nav>
          
          <h1 className="font-heading text-4xl text-gray-900 mb-4">{seriesName}</h1>
          <p className="text-lg text-gray-600">{topics.length} topics in this series</p>
        </div>

        <div className="space-y-8">
          {topics.map((topic, index) => (
            <article key={topic.id} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-center bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow`}>
              {/* YouTube Thumbnail */}
              {topic.youtube_url && (
                <div className="w-1/2">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={topic.youtube_url ? `https://img.youtube.com/vi/${topic.youtube_url.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg` : ''}
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
        
        {topics.length === 0 && (
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
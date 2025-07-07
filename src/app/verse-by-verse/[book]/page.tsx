
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

interface Sermon {
  id: string;
  title: string;
  description: string;
  seo_description?: string;
  slug: string;
  youtube_url?: string;
  published_at: string;
}

interface BookPageProps {
  params: Promise<{ book: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const resolvedParams = await params;
  const bookSlug = resolvedParams.book;
  const bookName = bookSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  let sermons: Sermon[] = [];
  
  try {
    const { data, error } = await supabase
      .from('verse_by_verse')
      .select('*')
      .eq('book', bookName)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    sermons = data || [];
  } catch (error) {
    console.error('Error fetching sermons:', error);
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      
      <main className="container-custom py-16">
        <div className="mb-12">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/verse-by-verse" className="hover:text-blue-700">Verse by Verse</Link>
            <span className="mx-2">/</span>
            <span>{bookName}</span>
          </nav>
          
          <h1 className="font-heading text-4xl text-gray-900 mb-4">{bookName}</h1>
          <p className="text-lg text-gray-600">{sermons.length} sermons in this series</p>
        </div>

        <div className="space-y-8">
          {sermons.map((sermon, index) => (
            <article key={sermon.id} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-center bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow`}>
              {/* YouTube Thumbnail */}
              {sermon.youtube_url && (
                <div className="w-1/2">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={(() => {
                        const url = sermon.youtube_url;
                        let videoId = '';
                        if (url.includes('youtube.com/watch?v=')) {
                          videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                        } else if (url.includes('youtu.be/')) {
                          videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                        }
                        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
                      })()}
                      alt={sermon.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className={`${sermon.youtube_url ? 'w-1/2' : 'w-full'} p-8`}>
                <h2 className="font-heading text-2xl text-gray-900 mb-4">{sermon.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {sermon.seo_description || sermon.description}
                </p>
                
                <Link
                  href={`/verse-by-verse/${bookSlug}/${sermon.slug}`}
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
        
        {sermons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No sermons found for this book.</p>
            <Link href="/verse-by-verse" className="text-blue-700 hover:text-blue-800 mt-4 inline-block">
              Browse All Books
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
// Removed OptimizedYouTubeEmbed for server component compatibility

interface Sermon {
  id: string;
  title: string;
  passage: string;
  book: string;
  slug: string;
  youtube_url?: string;
}

export default async function RecentSermons() {
  let sermons: Sermon[] = [];
  
  try {
    const { data, error } = await supabase
      .from('verse_by_verse')
      .select('id, title, passage, book, slug, youtube_url')
      .order('published_at', { ascending: false })
      .limit(3);
    
    if (error) throw error;
    sermons = data || [];
  } catch (error) {
    console.error('Error fetching recent sermons:', error);
  }

  return (
    <>
      {sermons.map((sermon) => {
        const youtubeVideoId = sermon.youtube_url ? 
          sermon.youtube_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1] : null;
        
        return (
          <div key={sermon.id} className="card-elevated p-6 group hover:-translate-y-1 transition-all duration-300">
            {youtubeVideoId ? (
              <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
                <Image
                  src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                  alt={sermon.title}
                  className="w-full h-full object-cover"
                  width={480}
                  height={270}
                  loading="lazy"
                />

              </div>
            ) : (
              <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">Audio Only</p>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-xl text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {sermon.title}
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  {sermon.passage || `${sermon.book} Study`}
                </p>
              </div>
              
              <div className="pt-2">
                <Link 
                  href={`/verse-by-verse/${sermon.book.toLowerCase()}/${sermon.slug}`} 
                  className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors group"
                >
                  Study This Passage
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

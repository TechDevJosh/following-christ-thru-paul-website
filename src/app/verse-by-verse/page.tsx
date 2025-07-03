import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

export const metadata: Metadata = {
  title: 'Verse by Verse Studies | Following Christ Thru Paul',
  description: 'Explore in-depth verse by verse biblical studies through the teachings of the Apostle Paul.',
};

// Define the query to get verse by verse content
const VERSE_BY_VERSE_QUERY = `*[_type == "verseByVerse"] | order(book asc, chapter asc, orderRank asc) {
  _id,
  title,
  book,
  chapter,
  slug,
  description,
  publishedAt,
  _createdAt
}`;

interface VerseByVerseEntry {
  _id: string;
  title: string;
  book: string;
  chapter?: number;
  slug: { current: string };
  description?: string;
  publishedAt?: string;
  _createdAt: string;
}

export default async function VerseByVersePage() {
  let verseByVerseEntries: VerseByVerseEntry[] = [];
  
  try {
    verseByVerseEntries = await client.fetch(VERSE_BY_VERSE_QUERY);
  } catch (error) {
    console.error('Error fetching verse by verse entries:', error);
  }

  // Group entries by book
  const entriesByBook = verseByVerseEntries.reduce((acc, entry) => {
    if (!acc[entry.book]) {
      acc[entry.book] = [];
    }
    acc[entry.book].push(entry);
    return acc;
  }, {} as Record<string, VerseByVerseEntry[]>);

  const books = Object.keys(entriesByBook).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              Verse by Verse Studies
            </h1>
            <p className="text-xl lg:text-2xl font-body opacity-90 mb-8">
              Deep, systematic study through the Word of God, verse by verse, 
              following the teachings and example of the Apostle Paul.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-lg font-medium">Current Studies Available</p>
                <p className="text-3xl font-bold">{books.length}</p>
                <p className="text-sm opacity-75">Books of the Bible</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-lg font-medium">Total Lessons</p>
                <p className="text-3xl font-bold">{verseByVerseEntries.length}</p>
                <p className="text-sm opacity-75">Verse by Verse Studies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          {books.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-12 text-center">
                Available Studies
              </h2>
              
              <div className="grid gap-8">
                {books.map((book) => (
                  <div key={book} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-blue-600 text-white px-6 py-4">
                      <h3 className="text-2xl font-heading font-bold">{book}</h3>
                      <p className="opacity-90">{entriesByBook[book].length} studies available</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {entriesByBook[book].map((entry) => (
                          <Link
                            key={entry._id}
                            href={`/verse-by-verse/${entry.book}/${entry.slug.current}`}
                            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
                          >
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                              {entry.title}
                            </h4>
                            {entry.chapter && (
                              <p className="text-sm text-gray-500 mb-2">Chapter {entry.chapter}</p>
                            )}
                            {entry.description && (
                              <p className="text-sm text-gray-600 line-clamp-2">{entry.description}</p>
                            )}
                            <div className="mt-3 flex items-center text-xs text-gray-500">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {entry.publishedAt ? 
                                new Date(entry.publishedAt).toLocaleDateString() : 
                                new Date(entry._createdAt).toLocaleDateString()
                              }
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // No content available yet
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white rounded-lg shadow-lg p-12">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                    Verse by Verse Studies Coming Soon
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    We're preparing comprehensive verse by verse studies through the Word of God. 
                    Check back soon for in-depth biblical teachings.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Link 
                    href="/topics" 
                    className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">Browse Topics</h3>
                    <p className="text-gray-600 text-sm">Explore teachings organized by biblical topics</p>
                  </Link>
                  <Link 
                    href="/ask" 
                    className="block p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">Ask Questions</h3>
                    <p className="text-gray-600 text-sm">Submit your biblical questions for study</p>
                  </Link>
                </div>

                <Link 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
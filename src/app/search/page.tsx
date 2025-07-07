import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface SearchResult {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  book?: string; // For verseByVerse
  excerpt?: string;
}

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q;

  if (!query) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <p>Please enter a search query.</p>
      </div>
    );
  }

  const searchResults: SearchResult[] = [];

  // Search in verse_by_verse table
  const { data: verseByVerseData, error: verseByVerseError } = await supabase
    .from('verse_by_verse')
    .select('id, title, passage, book, slug')
    .or(`title.ilike.%${query}%,passage.ilike.%${query}%`);
  if (verseByVerseError) console.error('Error fetching verseByVerse:', verseByVerseError);
  if (verseByVerseData) {
    searchResults.push(...verseByVerseData.map(item => ({
      _id: item.id,
      _type: 'verseByVerse',
      title: item.title,
      slug: item.slug,
      book: item.book,
      excerpt: item.passage,
    })));
  }

  // Search in topics table
  const { data: topicsData, error: topicsError } = await supabase
    .from('topics')
    .select('id, title, slug, description')
    .ilike('title', `%${query}%`);
  if (topicsError) console.error('Error fetching topics:', topicsError);
  if (topicsData) {
    searchResults.push(...topicsData.map(item => ({
      _id: item.id,
      _type: 'topics',
      title: item.title,
      slug: item.slug,
      excerpt: item.description,
    })));
  }

  // Search in resources table
  const { data: resourcesData, error: resourcesError } = await supabase
    .from('resources')
    .select('id, title, description, slug')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  if (resourcesError) console.error('Error fetching resources:', resourcesError);
  if (resourcesData) {
    searchResults.push(...resourcesData.map(item => ({
      _id: item.id,
      _type: 'resources',
      title: item.title,
      slug: item.slug,
      excerpt: item.description,
    })));
  }

  // Search in ask table
  const { data: askData, error: askError } = await supabase
    .from('ask')
    .select('id, question, answer, slug')
    .ilike('question', `%${query}%`);
  if (askError) console.error('Error fetching ask:', askError);
  if (askData) {
    searchResults.push(...askData.map(item => ({
      _id: item.id,
      _type: 'ask',
      title: item.question,
      slug: item.slug,
      excerpt: item.answer,
    })));
  }

  // Search in conferences table
  const { data: conferencesData, error: conferencesError } = await supabase
    .from('conferences')
    .select('id, title, description, slug')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  if (conferencesError) console.error('Error fetching conferences:', conferencesError);
  if (conferencesData) {
    searchResults.push(...conferencesData.map(item => ({
      _id: item.id,
      _type: 'conferences',
      title: item.title,
      slug: item.slug,
      excerpt: item.description,
    })));
  }

  const flattenedResults: SearchResult[] = searchResults;

  const getResultLink = (result: SearchResult) => {
    switch (result._type) {
      case 'verseByVerse':
        return `/verse-by-verse/${result.book}/${result.slug}`;
      case 'topics':
        return `/topics/${result.slug}`;
      case 'resources':
        return `/resources/${result.slug}`;
      case 'ask':
        return `/ask/${result.slug}`;
      case 'conferences':
        return `/conferences/${result.slug}`;
      default:
        return `/#`; // Fallback
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Search Results for &quot;{query}&quot;</h1>

        {flattenedResults.length > 0 ? (
          <div className="space-y-4">
            {flattenedResults.map((result) => (
              <Link key={result._id} href={getResultLink(result)} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <p className="text-sm text-gray-500">{result._type}</p>
                <h2 className="text-xl font-semibold mb-1">{result.title}</h2>
                {result.excerpt && <p className="text-gray-700 line-clamp-3">{result.excerpt}</p>}
              </Link>
            ))}
          </div>
        ) : (
          <p>No results found for &quot;{query}&quot;.</p>
        )}
      </main>
    </div>
  );
}

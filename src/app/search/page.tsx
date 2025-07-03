import Link from 'next/link';
import { client } from '@/sanity/lib/client';

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

  const groqQuery = `{
    "verseByVerse": *[_type == "verseByVerse" && (title match $query || passage match $query || content[].children[].text match $query || $query in tags)]{
      _id,
      _type,
      title,
      "slug": slug.current,
      "book": book,
      "excerpt": pt::text(content[0])
    },
    "topics": *[_type == "topics" && (title match $query || content[].children[].text match $query || $query in tags)]{
      _id,
      _type,
      title,
      "slug": slug.current,
      "excerpt": pt::text(content[0])
    },
    "resources": *[_type == "resources" && (title match $query || description match $query || $query in tags)]{
      _id,
      _type,
      title,
      "slug": slug.current,
      "excerpt": description
    },
    "ask": *[_type == "ask" && (question match $query || answer match $query || $query in tags)]{
      _id,
      _type,
      "title": question,
      "slug": slug.current,
      "excerpt": answer
    },
    "conferences": *[_type == "conferences" && (title match $query || description match $query || $query in tags)]{
      _id,
      _type,
      title,
      "slug": slug.current,
      "excerpt": description
    }
  }`;

  const results = await client.fetch(groqQuery, { query: `*${query}*` });

  const flattenedResults: SearchResult[] = Object.values(results).flat() as SearchResult[];

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

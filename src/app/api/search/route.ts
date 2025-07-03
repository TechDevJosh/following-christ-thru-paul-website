import { client } from '@/sanity/lib/client';
import { NextRequest, NextResponse } from 'next/server';

interface SearchResults {
  verseByVerse: any[];
  topics: any[];
  resources: any[];
  ask: any[];
  conferences: any[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  // Sanity GROQ query for fuzzy matching across multiple content types
  // This is a simplified example. For true fuzzy matching, you might need
  // to use a Sanity plugin like sanity-plugin-algolia or implement more complex GROQ.
  const groqQuery = `{
    "verseByVerse": *[_type == "verseByVerse" && (title match $query || passage match $query || content[].children[].text match $query || $query in tags)]{
      _id,
      _type,
      title,
      "slug": slug.current,
      "book": book,
      "excerpt": pt::text(content[0])
    }[0...5],
    "topics": *[_type == "topics" && (title match $query || content[].children[].text match $query || $query in tags)]{
      _id,
      _type,
      title,
      "slug": slug.current,
      "excerpt": pt::text(content[0])
    }[0...5],
    "resources": *[_type == "resources" && (title match $query || description match $query || $query in tags)]{
      _id,
      _type,
      title,
      "slug": slug.current,
      "excerpt": description
    }[0...5],
    "ask": *[_type == "ask" && (question match $query || answer match $query || $query in tags)]{
      _id,
      _type,
      "title": question,
      "slug": slug.current,
      "excerpt": answer
    }[0...5],
    "conferences": *[_type == "conferences" && (title match $query || description match $query || $query in tags)]{
      _id,
      _type,
      title,
      "slug": slug.current,
      "excerpt": description
    }[0...5]
  }`;

  try {
    const searchQuery = `*${query}*`;
    const results = await (client as any).fetch(groqQuery, { query: searchQuery });
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}

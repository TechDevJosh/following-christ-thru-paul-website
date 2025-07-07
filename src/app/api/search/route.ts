import { supabase } from '@/lib/supabase';
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

  try {
    const searchResults: SearchResults = {
      verseByVerse: [],
      topics: [],
      resources: [],
      ask: [],
      conferences: [],
    };

    // Search in verse_by_verse table
    const { data: verseByVerseData, error: verseByVerseError } = await supabase
      .from('verse_by_verse')
      .select('id, title, passage, book, slug')
      .or(`title.ilike.%${query}%,passage.ilike.%${query}%`);
    if (verseByVerseError) throw verseByVerseError;
    searchResults.verseByVerse = verseByVerseData || [];

    // Search in topics table
    const { data: topicsData, error: topicsError } = await supabase
      .from('topics')
      .select('id, title, slug')
      .ilike('title', `%${query}%`);
    if (topicsError) throw topicsError;
    searchResults.topics = topicsData || [];

    // Search in resources table
    const { data: resourcesData, error: resourcesError } = await supabase
      .from('resources')
      .select('id, title, description, slug')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    if (resourcesError) throw resourcesError;
    searchResults.resources = resourcesData || [];

    // Search in ask table
    const { data: askData, error: askError } = await supabase
      .from('ask')
      .select('id, question, slug')
      .ilike('question', `%${query}%`);
    if (askError) throw askError;
    searchResults.ask = askData || [];

    // Search in conferences table
    const { data: conferencesData, error: conferencesError } = await supabase
      .from('conferences')
      .select('id, title, description, slug')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    if (conferencesError) throw conferencesError;
    searchResults.conferences = conferencesData || [];

    return NextResponse.json({ results: searchResults });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}

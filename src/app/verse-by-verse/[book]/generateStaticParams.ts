
import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data: sermons } = await supabase
    .from('verse_by_verse')
    .select('book')
    .order('book', { ascending: true });

  if (!sermons) {
    return [];
  }

  const uniqueBooks = [...new Set(sermons.map(sermon => sermon.book))];

  return uniqueBooks.map(book => ({
    book: book.toLowerCase().replace(/ /g, '-'),
  }));
}

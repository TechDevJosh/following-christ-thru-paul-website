import { supabase } from './supabase';
import { Database } from '../types/supabase';

type VerseByVerse = Database['public']['Tables']['verse_by_verse']['Row'];
type Topics = Database['public']['Tables']['topics']['Row'];
type Resources = Database['public']['Tables']['resources']['Row'];
type Ask = Database['public']['Tables']['ask']['Row'];

// Verse by Verse queries
export async function getAllSermons() {
  const { data, error } = await supabase
    .from('verse_by_verse')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getSermonBySlug(slug: string) {
  const { data, error } = await supabase
    .from('verse_by_verse')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getSermonsByBook(book: string) {
  const { data, error } = await supabase
    .from('verse_by_verse')
    .select('*')
    .eq('book', book)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Topics queries
export async function getAllTopics() {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTopicBySlug(slug: string) {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getFeaturedTopics() {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('featured', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTopicsBySeries(series: string) {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('series', series)
    .order('series_order', { ascending: true });

  if (error) throw error;
  return data;
}

// Resources queries
export async function getAllResources() {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getResourceBySlug(slug: string) {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getResourcesByCategory(category: string) {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFeaturedResources() {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('featured', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Q&A queries
export async function getAllQA() {
  const { data, error } = await supabase
    .from('ask')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getQABySlug(slug: string) {
  const { data, error } = await supabase
    .from('ask')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data;
}

export async function getQAByCategory(category: string) {
  const { data, error } = await supabase
    .from('ask')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFeaturedQA() {
  const { data, error } = await supabase
    .from('ask')
    .select('*')
    .eq('featured', true)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Search functionality
export async function searchContent(query: string) {
  const searchTerm = `%${query}%`;
  
  const [sermons, topics, resources, qa] = await Promise.all([
    supabase
      .from('verse_by_verse')
      .select('id, title, slug, book, passage')
      .or(`title.ilike.${searchTerm},book.ilike.${searchTerm},passage.ilike.${searchTerm}`)
      .limit(5),
    
    supabase
      .from('topics')
      .select('id, title, slug, description')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .limit(5),
    
    supabase
      .from('resources')
      .select('id, title, slug, description, type')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .limit(5),
    
    supabase
      .from('ask')
      .select('id, question, slug, short_answer')
      .eq('status', 'published')
      .or(`question.ilike.${searchTerm},short_answer.ilike.${searchTerm}`)
      .limit(5)
  ]);

  return {
    sermons: sermons.data || [],
    topics: topics.data || [],
    resources: resources.data || [],
    qa: qa.data || []
  };
}

// Utility functions for static generation
export async function getAllSermonSlugs() {
  const { data, error } = await supabase
    .from('verse_by_verse')
    .select('slug');

  if (error) throw error;
  return data.map(item => ({ params: { slug: item.slug } }));
}

export async function getAllTopicSlugs() {
  const { data, error } = await supabase
    .from('topics')
    .select('slug');

  if (error) throw error;
  return data.map(item => ({ params: { slug: item.slug } }));
}

export async function getAllResourceSlugs() {
  const { data, error } = await supabase
    .from('resources')
    .select('slug');

  if (error) throw error;
  return data.map(item => ({ params: { slug: item.slug } }));
}

export async function getAllQASlugs() {
  const { data, error } = await supabase
    .from('ask')
    .select('slug')
    .eq('status', 'published');

  if (error) throw error;
  return data.map(item => ({ params: { slug: item.slug } }));
}
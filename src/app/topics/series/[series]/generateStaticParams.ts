import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('series')
      .not('series', 'is', null);
    
    if (error) throw error;
    
    // Get unique series and convert to slugs
    const uniqueSeries = [...new Set(data?.map(item => item.series).filter(Boolean))];
    
    return uniqueSeries.map((series) => ({
      series: series.toLowerCase().replace(/\s+/g, '-')
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
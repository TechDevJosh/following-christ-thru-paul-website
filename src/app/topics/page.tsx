import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import TopicsClient from './TopicsClient';

interface Topic {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags?: string;
  published_at: string;
  created_at: string;
  youtube_url?: string;
  content?: string;
  series?: string;
  series_order?: number;
  featured?: boolean;
}

// Supabase query will be done in the component

export default async function TopicsPage() {
  let topics: Topic[] = [];
  
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .order('series', { ascending: true })
      .order('series_order', { ascending: true })
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    topics = data || [];
  } catch (error) {
    console.error('Error fetching topics:', error);
  }



  // Separate Salvation Messages and other topics
  const allSalvationMessages = topics.filter(topic => topic.series === 'Salvation Messages');
  const otherTopics = topics.filter(topic => topic.series !== 'Salvation Messages');

  // Get top 3 salvation messages: most clicked, user preference, latest
  const latestSalvation = allSalvationMessages
    .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())[0];
  const userPreferred = allSalvationMessages
    .filter(msg => msg.featured)[0] || allSalvationMessages[1]; // fallback to second item

  // Create unique set of 3 salvation messages
  const salvationMessages = [topClicked, userPreferred, latestSalvation]
    .filter((msg, index, arr) => msg && arr.findIndex(m => m?.id === msg.id) === index)
    .slice(0, 3);

  // Group remaining topics by series
  const groupedTopics = otherTopics.reduce((acc, topic) => {
    const series = topic.series || 'General';
    if (!acc[series]) acc[series] = [];
    acc[series].push(topic);
    return acc;
  }, {} as Record<string, Topic[]>);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Bible Topics
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Explore the depths of Scripture through topical studies and thematic expositions
          </p>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
            Each topic is carefully examined through the lens of Pauline dispensational truth, maintaining fidelity to the KJV text.
          </p>
        </div>
      </section>

      {/* Salvation Messages Section */}
      {salvationMessages.length > 0 && (
        <section className="py-12">
          <div className="container-custom">
            <Link href="/salvation">
              <h2 className="font-heading text-3xl text-gray-900 mb-8 text-center">Salvation Messages</h2>
            </Link>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <TopicsClient topics={salvationMessages} />
            </div>
          </div>
        </section>
      )}

      {/* Latest Topics Section */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="font-heading text-3xl text-gray-900 mb-8 text-center">Latest Topics</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <TopicsClient topics={otherTopics.slice(0, 12)} />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container-custom">

          {/* Series Overview */}
          {Object.keys(groupedTopics).length > 1 && (
            <div className="mt-16">
              <h3 className="font-heading text-2xl text-gray-900 mb-8 text-center">Browse by Series</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/salvation" className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors block">
                  <h4 className="font-heading text-lg text-gray-900 mb-2 hover:text-blue-700 transition-colors">Salvation Messages</h4>
                  <p className="text-sm text-gray-600 mb-4">{allSalvationMessages.length} topics</p>
                  <div className="space-y-2">
                    {allSalvationMessages.slice(0, 3).map((topic) => (
                      <p key={topic.id} className="text-sm text-blue-700 truncate">
                        {topic.title}
                      </p>
                    ))}
                    {allSalvationMessages.length > 3 && (
                      <p className="text-xs text-gray-500">+{allSalvationMessages.length - 3} more</p>
                    )}
                  </div>
                  <div className="mt-4 text-xs text-blue-600 font-medium">
                    View Series →
                  </div>
                </Link>
                {Object.entries(groupedTopics).map(([series, seriesTopics]) => (
                  <Link key={series} href={`/topics/series/${encodeURIComponent(series.toLowerCase().replace(/\s+/g, '-'))}`} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors block">
                    <h4 className="font-heading text-lg text-gray-900 mb-2 hover:text-blue-700 transition-colors">{series}</h4>
                    <p className="text-sm text-gray-600 mb-4">{seriesTopics.length} topics</p>
                    <div className="space-y-2">
                      {seriesTopics.slice(0, 3).map((topic) => (
                        <p key={topic.id} className="text-sm text-blue-700 truncate">
                          {topic.title}
                        </p>
                      ))}
                      {seriesTopics.length > 3 && (
                        <p className="text-xs text-gray-500">+{seriesTopics.length - 3} more</p>
                      )}
                    </div>
                    <div className="mt-4 text-xs text-blue-600 font-medium">
                      View Series →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Coming Soon Section */}
          <div className="mt-16 text-center p-12 bg-gray-50 rounded-xl">
            <h3 className="font-heading text-3xl text-gray-900 mb-4">More Topics Coming Soon</h3>
            <p className="font-body text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're continuously adding new topical studies covering essential doctrines and practical Christian living from Paul's epistles.
            </p>
            <Link href="/newsletter" className="btn-primary">
              Subscribe for Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h3 className="font-heading text-2xl mb-4">Following Christ Thru Paul</h3>
              <p className="font-body text-gray-300 mb-6 leading-relaxed">
                "To make all men see what is the fellowship of the mystery" (Eph. 3:9)
              </p>
              <p className="font-body text-gray-400 text-sm">
                A KJV Bible-believing ministry dedicated to serious Bible study and doctrinal teaching.
              </p>
            </div>
            
            <div>
              <h4 className="font-subheading text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li><Link href="/verse-by-verse" className="hover:text-white transition-colors">Verse by Verse</Link></li>
                <li><Link href="/topics" className="hover:text-white transition-colors">Topics</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="/ask" className="hover:text-white transition-colors">Ask Questions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-subheading text-lg mb-4">Connect</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li><Link href="/connect/subscribe" className="hover:text-white transition-colors">Subscribe</Link></li>
                <li><Link href="/connect/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/connect/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="font-body text-gray-400 text-sm">&copy; {new Date().getFullYear()} Following Christ Thru Paul. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/terms-of-service" className="font-body text-gray-400 hover:text-white transition-colors text-sm">Terms</Link>
              <Link href="/privacy-policy" className="font-body text-gray-400 hover:text-white transition-colors text-sm">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
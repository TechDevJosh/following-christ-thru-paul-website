import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';

export const revalidate = 1800; // 30 minutes

interface Topic {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  sermons?: number;
  tags?: string[];
  publishedAt: string;
  _createdAt: string;
  youtubeUrl?: string;
  content?: any[];
  featuredImage?: any;
}

const TOPICS_QUERY = `*[_type == "topics"] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  description,
  slug,
  tags,
  publishedAt,
  _createdAt,
  youtubeUrl,
  content,
  featuredImage
}`;

export default async function TopicsPage() {
  let topics: Topic[] = [];
  
  try {
    topics = await client.fetch(TOPICS_QUERY);
  } catch (error) {
    console.error('Error fetching topics:', error);
  }

  // Fallback placeholder data if no topics from Sanity
  const placeholderTopics: Topic[] = [
    {
      _id: "1",
      title: "Salvation by Grace",
      description: "Understanding God's grace in salvation through Paul's epistles, exploring the distinction between law and grace.",
      slug: { current: "salvation-by-grace" },
      sermons: 8,
      tags: ["Grace", "Salvation", "Justification"],
      publishedAt: "2024-01-15",
      _createdAt: "2024-01-15"
    },
    {
      _id: "2", 
      title: "The Mystery of the Church",
      description: "Paul's revelation of the church as the body of Christ, distinct from Israel and the kingdom program.",
      slug: { current: "mystery-of-the-church" },
      sermons: 12,
      tags: ["Church", "Mystery", "Body of Christ"],
      publishedAt: "2024-01-10",
      _createdAt: "2024-01-10"
    },
    {
      _id: "3",
      title: "Dispensational Truth",
      description: "Rightly dividing the word of truth according to God's dispensational program throughout history.",
      slug: { current: "dispensational-truth" },
      sermons: 15,
      tags: ["Dispensations", "Rightly Dividing", "Truth"],
      publishedAt: "2024-01-05",
      _createdAt: "2024-01-05"
    },
    {
      _id: "4",
      title: "Eternal Security",
      description: "The believer's eternal security in Christ based on God's grace and the finished work of Christ.",
      slug: { current: "eternal-security" },
      sermons: 6,
      tags: ["Security", "Assurance", "Grace"],
      publishedAt: "2024-01-01",
      _createdAt: "2024-01-01"
    }
  ];

  const displayTopics = topics.length > 0 ? topics : placeholderTopics;

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

      {/* Topics Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayTopics.map((topic) => (
              <article key={topic._id} className="card-elevated p-0 group hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* YouTube Thumbnail */}
                {topic.youtubeUrl && (
                  <div className="aspect-video w-full bg-gray-100 relative">
                    <img
                      src={(() => {
                        const url = topic.youtubeUrl;
                        let videoId = '';
                        if (url.includes('youtube.com/watch?v=')) {
                          videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                        } else if (url.includes('youtu.be/')) {
                          videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                        }
                        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
                      })()}
                      alt={topic.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const url = topic.youtubeUrl;
                        if (url) {
                          let videoId = '';
                          if (url.includes('youtube.com/watch?v=')) {
                            videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                          } else if (url.includes('youtu.be/')) {
                            videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                          }
                          target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="font-heading text-2xl text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                      {topic.title}
                    </h2>
                    <p className="font-body text-gray-600 leading-relaxed mb-4">
                      {topic.description && topic.description.length > 150 
                        ? `${topic.description.substring(0, 150)}...` 
                        : topic.description}
                    </p>
                  </div>

                <div className="flex items-center justify-between mb-6">
                  {topic.sermons && (
                    <span className="font-body text-sm text-gray-500">
                      {topic.sermons} sermon{topic.sermons !== 1 ? 's' : ''}
                    </span>
                  )}
                  <time className="font-body text-sm text-gray-500">
                    {new Date(topic.publishedAt || topic._createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </time>
                </div>

                {topic.tags && Array.isArray(topic.tags) && topic.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {topic.tags.map((tag, index) => (
                      <span 
                        key={`${topic._id}-tag-${index}`}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-body font-medium text-xs"
                      >
                        {typeof tag === 'string' ? tag : String(tag)}
                      </span>
                    ))}
                  </div>
                )}

                  <Link 
                    href={`/topics/${topic.slug.current}`}
                    className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors group"
                  >
                    Explore Topic
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

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
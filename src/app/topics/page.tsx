'use client';

import Link from 'next/link';
import { client } from '@/lib/sanity';
import Navbar from '@/components/Navbar';

interface Topic {
  _id: string;
  title: string;
  description: string;
  slug: { current: string };
  sermons: number;
  tags: string[];
  publishedAt: string;
}

export default function TopicsPage() {
  // For now, we'll create placeholder data until the schema is implemented
  const topics: Topic[] = [
    {
      _id: "1",
      title: "Salvation by Grace",
      description: "Understanding God's grace in salvation through Paul's epistles, exploring the distinction between law and grace.",
      slug: { current: "salvation-by-grace" },
      sermons: 8,
      tags: ["Grace", "Salvation", "Justification"],
      publishedAt: "2024-01-15"
    },
    {
      _id: "2", 
      title: "The Mystery of the Church",
      description: "Paul's revelation of the church as the body of Christ, distinct from Israel and the kingdom program.",
      slug: { current: "mystery-of-the-church" },
      sermons: 12,
      tags: ["Church", "Mystery", "Body of Christ"],
      publishedAt: "2024-01-10"
    },
    {
      _id: "3",
      title: "Dispensational Truth",
      description: "Rightly dividing the word of truth according to God's dispensational program throughout history.",
      slug: { current: "dispensational-truth" },
      sermons: 15,
      tags: ["Dispensations", "Rightly Dividing", "Truth"],
      publishedAt: "2024-01-05"
    },
    {
      _id: "4",
      title: "Eternal Security",
      description: "The believer's eternal security in Christ based on God's grace and the finished work of Christ.",
      slug: { current: "eternal-security" },
      sermons: 6,
      tags: ["Security", "Assurance", "Grace"],
      publishedAt: "2024-01-01"
    }
  ];

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
            {topics.map((topic) => (
              <article key={topic._id} className="card-elevated p-8 group hover:-translate-y-1 transition-all duration-300">
                <div className="mb-6">
                  <h2 className="font-heading text-2xl text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {topic.title}
                  </h2>
                  <p className="font-body text-gray-600 leading-relaxed mb-4">
                    {topic.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-sm text-gray-500">
                    {topic.sermons} sermon{topic.sermons !== 1 ? &apos;s&apos; : &apos;&apos;}
                  </span>
                  <time className="font-body text-sm text-gray-500">
                    {new Date(topic.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </time>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {topic.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-body font-medium text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/topics/${topic.slug.current}`}
                  className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors group"
                >
                  Explore Topic
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 text-center p-12 bg-gray-50 rounded-xl">
            <h3 className="font-heading text-3xl text-gray-900 mb-4">More Topics Coming Soon</h3>
            <p className="font-body text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're continuously adding new topical studies covering essential doctrines and practical Christian living from Paul's epistles.
            </p>
            <Link href="/connect/subscribe" className="btn-primary">
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
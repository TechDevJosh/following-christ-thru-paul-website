"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Resource {
  _id: string;
  title: string;
  description: string;
  type: 'pdf' | 'audio' | 'video' | 'link';
  category: string;
  url: string;
  downloadUrl?: string;
  fileSize?: string;
  duration?: string;
  tags: string[];
  publishedAt: string;
  featured: boolean;
}

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Sample resources data - will be replaced with Sanity CMS data
  const resources: Resource[] = [
    {
      _id: "1",
      title: "Rightly Dividing the Word of Truth",
      description: "A comprehensive study guide on dispensational principles and proper Bible interpretation.",
      type: "pdf",
      category: "Study Guides",
      url: "/resources/rightly-dividing-guide.pdf",
      downloadUrl: "/resources/rightly-dividing-guide.pdf",
      fileSize: "2.4 MB",
      tags: ["Dispensations", "Bible Study", "Hermeneutics"],
      publishedAt: "2024-01-15",
      featured: true
    },
    {
      _id: "2",
      title: "Grace vs Law Audio Series",
      description: "A 6-part audio series explaining the distinction between law and grace in God's program.",
      type: "audio",
      category: "Audio Series",
      url: "/resources/grace-vs-law-series",
      duration: "3h 45m",
      tags: ["Grace", "Law", "Dispensations"],
      publishedAt: "2024-01-10",
      featured: true
    },
    {
      _id: "3",
      title: "The Mystery of the Church",
      description: "Video teaching on Paul's revelation of the church as the body of Christ.",
      type: "video",
      category: "Video Teachings",
      url: "https://youtube.com/watch?v=example",
      duration: "45 minutes",
      tags: ["Church", "Mystery", "Body of Christ"],
      publishedAt: "2024-01-08",
      featured: false
    },
    {
      _id: "4",
      title: "KJV Defense Articles",
      description: "Collection of articles defending the King James Version as God's preserved word.",
      type: "pdf",
      category: "Apologetics",
      url: "/resources/kjv-defense.pdf",
      downloadUrl: "/resources/kjv-defense.pdf",
      fileSize: "1.8 MB",
      tags: ["KJV", "Bible Versions", "Apologetics"],
      publishedAt: "2024-01-05",
      featured: false
    },
    {
      _id: "5",
      title: "Pauline Epistles Chart",
      description: "Visual chart showing the chronological order and themes of Paul's epistles.",
      type: "pdf",
      category: "Charts & Diagrams",
      url: "/resources/pauline-epistles-chart.pdf",
      downloadUrl: "/resources/pauline-epistles-chart.pdf",
      fileSize: "850 KB",
      tags: ["Paul", "Epistles", "Timeline"],
      publishedAt: "2024-01-01",
      featured: true
    },
    {
      _id: "6",
      title: "Recommended Reading List",
      description: "Curated list of books that align with dispensational, KJV-only principles.",
      type: "link",
      category: "Reading Lists",
      url: "/resources/recommended-books",
      tags: ["Books", "Reading", "Recommendations"],
      publishedAt: "2023-12-28",
      featured: false
    }
  ];

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];
  const types = ['all', 'pdf', 'audio', 'video', 'link'];

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const featuredResources = resources.filter(r => r.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        );
      case 'audio':
        return (
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,3A3,3 0 0,0 9,6V12A3,3 0 0,0 12,15A3,3 0 0,0 15,12V6A3,3 0 0,0 12,3M19,11C19,15.4 15.4,19 11,19C6.6,19 3,15.4 3,11H5C5,14.3 7.7,17 11,17C14.3,17 17,14.3 17,11H19Z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
          </svg>
        );
      case 'link':
        return (
          <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.59,13.41C11,13.8 11,14.4 10.59,14.81C10.2,15.2 9.6,15.2 9.19,14.81L7.77,13.39L6.36,14.81L10.59,19.04L21.41,8.22L20,6.81L10.59,16.22L8.5,14.13L7.77,13.39L10.59,13.41Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Study Resources
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Downloadable materials, audio teachings, and study aids for deeper Bible study
          </p>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
            All resources are created from a KJV, dispensational perspective to aid in your understanding of God's word.
          </p>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="font-heading text-3xl text-gray-900 mb-8 text-center">Featured Resources</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource) => (
                <div key={resource._id} className="card-elevated p-6 group hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    {getTypeIcon(resource.type)}
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-body font-medium text-xs">
                      Featured
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-xl text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="font-body text-gray-600 leading-relaxed mb-4">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-sm text-gray-500">{resource.category}</span>
                    {resource.fileSize && (
                      <span className="font-body text-sm text-gray-500">{resource.fileSize}</span>
                    )}
                    {resource.duration && (
                      <span className="font-body text-sm text-gray-500">{resource.duration}</span>
                    )}
                  </div>
                  
                  <Link 
                    href={resource.url}
                    target={resource.type === 'link' ? ' _blank' : ' _self'}
                    rel={resource.type === 'link' ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors group"
                  >
                    {resource.type === 'pdf' ? 'Download' : resource.type === 'link' ? 'Visit' : 'Access'}
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Resources */}
      <section className="py-16">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-gray-900 mb-8">All Resources</h2>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1">
                <label className="block font-body font-medium text-gray-900 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring font-body"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block font-body font-medium text-gray-900 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring font-body"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <div key={resource._id} className="card-elevated p-6 group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  {getTypeIcon(resource.type)}
                  <span className="font-body text-sm text-gray-500">{resource.type.toUpperCase()}</span>
                </div>
                
                <h3 className="font-heading text-xl text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {resource.title}
                </h3>
                
                <p className="font-body text-gray-600 leading-relaxed mb-4">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-body font-medium text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm text-gray-500">{resource.category}</span>
                  {resource.fileSize && (
                    <span className="font-body text-sm text-gray-500">{resource.fileSize}</span>
                  )}
                  {resource.duration && (
                    <span className="font-body text-sm text-gray-500">{resource.duration}</span>
                  )}
                </div>
                
                <Link 
                  href={resource.url}
                  target={resource.type === 'link' ? ' _blank' : ' _self'}
                  rel={resource.type === 'link' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors group"
                >
                  {resource.type === 'pdf' ? 'Download' : resource.type === 'link' ? 'Visit' : 'Access'}
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="font-body text-lg text-gray-500">No resources found matching your filters.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
                className="mt-4 btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h3 className="font-heading text-2xl mb-4">Following Christ Thru Paul</h3>
              <p className="font-body text-gray-300 mb-6 leading-relaxed">
                &quot;To make all men see what is the fellowship of the mystery&quot; (Eph. 3:9)
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
            </div>
          </div>
        </section>
      )}

      {/* Filters and Resources */}
      <section className="py-16">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-gray-900 mb-8">All Resources</h2>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1">
                <label className="block font-body font-medium text-gray-900 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring font-body"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block font-body font-medium text-gray-900 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring font-body"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <div key={resource._id} className="card-elevated p-6 group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  {getTypeIcon(resource.type)}
                  <span className="font-body text-sm text-gray-500">{resource.type.toUpperCase()}</span>
                </div>
                
                <h3 className="font-heading text-xl text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {resource.title}
                </h3>
                
                <p className="font-body text-gray-600 leading-relaxed mb-4">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-body font-medium text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm text-gray-500">{resource.category}</span>
                  {resource.fileSize && (
                    <span className="font-body text-sm text-gray-500">{resource.fileSize}</span>
                  )}
                  {resource.duration && (
                    <span className="font-body text-sm text-gray-500">{resource.duration}</span>
                  )}
                </div>
                
                <a 
                  href={resource.url}
                  target={resource.type === 'link' ? '_blank' : '_self'}
                  rel={resource.type === 'link' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors group"
                >
                  {resource.type === 'pdf' ? 'Download' : resource.type === 'link' ? 'Visit' : 'Access'}
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="font-body text-lg text-gray-500">No resources found matching your filters.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
                className="mt-4 btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
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
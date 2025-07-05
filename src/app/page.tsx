"use client";

import Link from 'next/link';
import RecentSermons from '@/components/RecentSermons';
import Navbar from '@/components/Navbar';
import TaglineRotator from '@/components/TaglineRotator';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <main className="gradient-hero relative overflow-x-hidden">
        <div className="container-custom py-8 lg:py-12 text-center relative">
          {/* Decorative elements - simplified for performance */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-20 left-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-100 rounded-full blur-2xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Scripture reference */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 border border-gray-200">
                "To make all men see what is the fellowship of the mystery" - Ephesians 3:9
              </span>
            </div>
            
            {/* Main heading with logo */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
              <img 
                src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png" 
                alt="FCTP Logo" 
                className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 flex-shrink-0"
              />
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight text-center sm:text-left">
                Following Christ
                <span className="block text-blue-700">Thru Paul</span>
              </h1>
            </div>
            
            {/* Dynamic Tagline Rotator */}
            <div className="mb-4">
              <TaglineRotator />
            </div>
            
            {/* Supporting text */}
            <p className="font-body text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Exploring the depths of Pauline dispensational truth with reverence, precision, and unwavering commitment to Scripture.
            </p>
            
            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/verse-by-verse"
                className="btn-primary focus-ring w-full sm:w-auto"
              >
                Start Here
              </Link>
              <Link
                href="/school"
                className="btn-secondary focus-ring w-full sm:w-auto"
              >
                Register Now
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">We Are Strong Proponents of</p>
              <div className="flex flex-wrap justify-center items-center gap-4 text-gray-400">
                <span className="text-xs font-medium whitespace-nowrap">AUTHORIZED VERSION (KJV)</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
                <span className="text-xs font-medium whitespace-nowrap">PAULINE DISPENSATIONALISM</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
                <span className="text-xs font-medium whitespace-nowrap">SUBMISSION TO A LOCAL BIBLE-BELIEVING CHURCH</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Recent Sermons Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">
              Recent Sermons
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deep into God&apos;s Word with our latest verse-by-verse expositions and topical studies.
            </p>
          </div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <RecentSermons />
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/verse-by-verse"
              className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors"
            >
              View All Sermons
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Video */}
      <section className="py-20">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-6">
              Welcome Message
            </h2>
            <p className="font-body text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Hear from our ministry about our heart for studying God&apos;s Word and following Christ through Paul&apos;s teachings.
            </p>
            
            <div className="card-elevated p-2 max-w-4xl mx-auto">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID"
                  title="Welcome to Following Christ Thru Paul"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Ministry Info */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-2xl mb-4">Following Christ Thru Paul</h3>
              <p className="font-body text-gray-300 mb-6 leading-relaxed">
                &quot;To make all men see what is the fellowship of the mystery&quot; (Eph. 3:9)
              </p>
              <p className="font-body text-gray-400 text-sm">
                A KJV Bible-believing ministry dedicated to serious Bible study and doctrinal teaching through the lens of Pauline dispensational truth.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-subheading text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li><Link href="/verse-by-verse" className="hover:text-white transition-colors">Verse by Verse</Link></li>
                <li><Link href="/topics" className="hover:text-white transition-colors">Topics</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="/ask" className="hover:text-white transition-colors">Ask Questions</Link></li>
                <li><Link href="/school" className="hover:text-white transition-colors">School</Link></li>
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="font-subheading text-lg mb-4">Connect</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li><Link href="/newsletter" className="hover:text-white transition-colors">Subscribe</Link></li>
                <li><Link href="/connect/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/connect/support" className="hover:text-white transition-colors">Support</Link></li>
                <li>
                  <button 
                    onClick={() => {
                      // Find and trigger the navbar's report modal
                      const reportButtons = document.querySelectorAll('[data-report-trigger]');
                      if (reportButtons.length > 0) {
                        (reportButtons[0] as HTMLElement).click();
                      }
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer relative z-50 pointer-events-auto"
                  >
                    Report an Issue
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Social Media & Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a
                href="https://facebook.com/FollowingChristThruPaul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@FollowingChristThruPaul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} Following Christ Thru Paul. All Rights Reserved.</p>
              <div className="flex space-x-4">
                <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
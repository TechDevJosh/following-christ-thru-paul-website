"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>About Us | Following Christ Thru Paul</title>
        <meta name="description" content="Learn about our KJV Bible-believing ministry, our heart for studying God's Word, and our commitment to Pauline dispensational truth." />
        <meta property="og:title" content="About Us | Following Christ Thru Paul" />
        <meta property="og:description" content="Learn about our KJV Bible-believing ministry and our commitment to Pauline dispensational truth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://followingchristthrupaul.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Following Christ Thru Paul" />
        <meta name="twitter:description" content="Learn about our KJV Bible-believing ministry and our commitment to Pauline dispensational truth." />
        <link rel="canonical" href="https://followingchristthrupaul.com/about" />
      </Head>
      <div className="min-h-screen bg-white text-gray-800">
        <header role="banner">
          <Navbar />
        </header>

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20" aria-labelledby="about-title">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 id="about-title" className="font-heading text-4xl md:text-6xl font-bold mb-6">
              About Bro. Josiah
            </h1>
            <p className="text-xl opacity-90">
              Following Christ through Paul's teachings with passion and purpose
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start gap-10">
            
            {/* Left Column - Image */}
            <div className="w-full md:w-1/2">
              <img
                src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/about-section-picture.jpg"
                alt="Bro. Josiah Manzano and wife"
                className="w-full max-w-md mx-auto md:mx-0 rounded-xl shadow-lg object-cover"
              />
            </div>
            
            {/* Right Column - Text Content */}
            <div className="w-full md:w-1/2">
              <div className="prose prose-xl max-w-none">
                <div className="font-serif text-gray-800 leading-relaxed space-y-8 text-lg">
                  <p>
                    Following Christ Thru Paul is my personal burden and ministry. I'm Bro. Josiah Manzano, the eldest of four siblings, born on September 21, 2000 to Pastor Rodelio and Merly Manzano. I'm married to Jessa Lee Manzano and serve under Shining Light Baptist Church in San Isidro, Subic, Zambales.
                  </p>
                  
                  <p>
                    At age 13, I surrendered my life to the Lord at a youth camp. But it was in 2017, during the In Christ Baptist Church Homecoming Conference, that I came to trust Christ alone for salvation. Forsaking my former decisions and works, I believed the gospel (1 Cor. 15:1–4; Eph. 1:13) and was saved by grace.
                  </p>
                  
                  <p>
                    I've always had a passion for computers and creative work. Today, I serve as a preacher and travel with Like-Faith churches to proclaim the fellowship of the mystery. This website is part of my effort to proclaim the truth revealed through the Apostle Paul.
                  </p>
                  
                  <p>
                    Like Paul, I'm a tentmaker—but instead of leather, I work with code and pixels. If you'd like to support this ministry or need help with a project, I'm available for hire. Your support helps sustain this mission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="max-w-2xl mx-auto">
                {!isSubmitted ? (
                  <>
                    <h3 className="font-heading text-3xl font-bold text-gray-900 mb-6 text-center">
                      Get in Touch
                    </h3>
                    <p className="text-gray-600 mb-8 text-center">
                      Have questions about the ministry or need help with a project? I'd love to hear from you.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                          placeholder="Your message..."
                        />
                      </div>
                      
                      {error && (
                        <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg">
                          {error}
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      ✅ Thank you for your inquiry. We have received your message and will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setError('');
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
        </main>
      </div>
    </>
  );
}
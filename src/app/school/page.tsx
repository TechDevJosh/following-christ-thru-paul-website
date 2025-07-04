"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function SchoolPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.fullName, 
          email: formData.email, 
          message: formData.message 
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
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
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-600 text-white px-6 py-4 rounded-lg mb-8 inline-block">
              <h1 className="font-heading text-2xl md:text-3xl font-bold">
                FCTP School of the Bible is not a replacement for the local church.
              </h1>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              FCTP School of the Bible
            </h2>
            <p className="text-xl opacity-90">
              Biblical education rooted in Pauline doctrine and local church principles
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            {/* Explanatory Content */}
            <div className="prose prose-lg max-w-none mb-16">
              <div className="font-serif text-gray-800 leading-relaxed space-y-6">
                <p>
                  FCTP adheres to the Local Church principle. While each believer is part of the One Body of Christ, they are also expected to be part of or help plant a local church consistent with Pauline Doctrine. We recognize that some believers may lack access to a nearby KJV Bible-believing local church. FCTP exists to offer Pauline doctrine education and edification—but in no wise substitutes the God-ordained role of the local church.
                </p>
                
                <p>
                  Founded by Bro. Josiah Manzano, FCTP upholds pastoral authority and encourages submission to the leadership of local pastors. This ministry exists to supplement the local church, not to supersede it. We operate as "helpers of your joy" (2 Cor. 1:24), not as "lords over God's heritage."
                </p>
              </div>
            </div>

            {/* Waitlist Form */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="max-w-2xl mx-auto">
                {!isSubmitted ? (
                  <>
                    <h3 className="font-heading text-3xl font-bold text-gray-900 mb-6 text-center">
                      Join the Waitlist
                    </h3>
                    <p className="text-gray-600 mb-8 text-center">
                      Be the first to know when enrollment opens for FCTP School of the Bible
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your full name"
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
                          Brief Message / Interest
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                          placeholder="Tell us about your interest in biblical education..."
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
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
                      Thank You!
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Thank you for expressing interest in FCTP School of the Bible. We will notify you as soon as we open enrollment.
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Return Home
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              About Bro. Josiah
            </h1>
            <p className="text-xl opacity-90">
              Following Christ through Paul's teachings with passion and purpose
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            {/* About Content */}
            <div className="prose prose-lg max-w-none mb-16">
              <div className="font-serif text-gray-800 leading-relaxed space-y-6">
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

            {/* Contact Form */}
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
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
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
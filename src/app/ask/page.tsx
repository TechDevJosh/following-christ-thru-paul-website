"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  publishedAt: string;
}

export default function AskPage() {
  const [formData, setFormData] = useState({
    question: '',
    context: '',
    email: '', // Optional for follow-up
    anonymous: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Sample FAQ data - will be replaced with Sanity CMS data
  const faqs: FAQ[] = [
    {
      id: "1",
      question: "What is the difference between the gospel of the kingdom and the gospel of grace?",
      answer: "The gospel of the kingdom was preached to Israel, promising the establishment of the Messianic kingdom on earth. The gospel of grace, revealed through Paul, is the good news of salvation by faith alone through Christ's finished work, apart from works or law-keeping.",
      tags: ["Gospel", "Kingdom", "Grace", "Dispensations"],
      publishedAt: "2024-01-15"
    },
    {
      id: "2",
      question: "How do we rightly divide the word of truth?",
      answer: "Rightly dividing (2 Timothy 2:15) means recognizing God's different dispensational programs. We must distinguish between what was written TO us versus what was written FOR us, understanding the progressive revelation of God's plan.",
      tags: ["Rightly Dividing", "Dispensations", "Scripture"],
      publishedAt: "2024-01-10"
    },
    {
      id: "3",
      question: "Is water baptism required for salvation today?",
      answer: "Under Paul's gospel of grace, water baptism is not required for salvation. We are baptized by the Holy Spirit into the body of Christ (1 Cor 12:13). Water baptism was part of the kingdom program but is not essential under grace.",
      tags: ["Baptism", "Salvation", "Grace", "Paul"],
      publishedAt: "2024-01-05"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.anonymous ? 'Anonymous' : 'User',
          email: formData.email || 'noreply@followingchristthrupaul.com',
          message: `Question: ${formData.question}\n\nContext: ${formData.context || 'None provided'}\n\nSubmitted: ${formData.anonymous ? 'Anonymously' : 'With contact info'}`
        }),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ question: '', context: '', email: '', anonymous: true });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, anonymous: e.target.checked }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Ask Questions
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Submit your Bible questions for thoughtful, Scripture-based answers
          </p>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
            All questions are answered from a KJV, dispensational perspective with careful attention to rightly dividing the word of truth.
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Question Form */}
          <div>
            <div className="card-elevated p-8">
              <h2 className="font-heading text-3xl text-gray-900 mb-6">Submit Your Question</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-body text-green-800">
                    ✅ Thank you for your question! We have received your inquiry and will review it for our Q&A section.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-body text-red-800">
                    There was an error submitting your question. Please try again.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="question" className="block font-body font-medium text-gray-900 mb-2">
                    Your Question *
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    rows={4}
                    required
                    value={formData.question}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring font-body"
                    placeholder="What would you like to know about the Bible?"
                  />
                </div>

                <div>
                  <label htmlFor="context" className="block font-body font-medium text-gray-900 mb-2">
                    Additional Context (Optional)
                  </label>
                  <textarea
                    id="context"
                    name="context"
                    rows={3}
                    value={formData.context}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring font-body"
                    placeholder="Provide any additional context or background for your question..."
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-body font-medium text-gray-900 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-ring font-body"
                    placeholder="your@email.com (for follow-up questions only)"
                  />
                  <p className="mt-2 text-sm text-gray-500 font-body">
                    We&apos;ll only use your email if we need clarification on your question.
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.anonymous}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="ml-2 font-body text-gray-900">
                    Submit anonymously (recommended)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.question.trim()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Question'}
                </button>
              </form>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-subheading text-lg text-blue-900 mb-2">Guidelines</h3>
                <ul className="font-body text-blue-800 text-sm space-y-1">
                  <li>• Questions should be Bible-related</li>
                  <li>• We answer from a KJV, dispensational perspective</li>
                  <li>• Responses may be featured publicly (anonymously)</li>
                  <li>• Please be respectful and specific in your questions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-heading text-3xl text-gray-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="card-elevated p-6">
                  <h3 className="font-subheading text-xl text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-body text-gray-700 leading-relaxed mb-4">
                    {faq.answer}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {faq.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-body font-medium text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <time className="font-body text-sm text-gray-500">
                    {new Date(faq.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/ask/all"
                className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors"
              >
                View All Q&A
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
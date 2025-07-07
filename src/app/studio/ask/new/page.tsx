'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '../../components/AuthGuard';
import { supabase } from '../../../../../lib/supabase';
import SimpleGrammarChecker from '../../../../components/SimpleGrammarChecker';

export default function NewAskPage() {
  const [formData, setFormData] = useState({
    question: '',
    short_answer: '',
    detailed_answer: '',
    category: 'theology',
    difficulty: 'beginner',
    tags: '',
    featured: false,
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  function generateSlug(question: string) {
    return question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('ask')
        .insert({
          question: formData.question,
          slug: generateSlug(formData.question),
          short_answer: formData.short_answer || null,
          detailed_answer: formData.detailed_answer || null,
          category: formData.category,
          difficulty: formData.difficulty,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
          featured: formData.featured,
          status: formData.status,
        });

      if (error) throw error;
      router.push('/studio/ask');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">New Q&A</h1>
            <p className="mt-2 text-gray-600">Create a new question and answer</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Question *
                  <span className="text-xs text-green-600 ml-2">Grammar checking enabled</span>
                </label>
                <div className="mt-1">
                  <SimpleGrammarChecker
                    text={formData.question}
                    onTextChange={(question) => setFormData({...formData, question})}
                    placeholder="Enter the question... Grammar checking will analyze your text automatically."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="theology">Theology</option>
                    <option value="doctrine">Doctrine</option>
                    <option value="scripture">Scripture</option>
                    <option value="christian-living">Christian Living</option>
                    <option value="prophecy">Prophecy</option>
                    <option value="church">Church</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Short Answer
                  <span className="text-xs text-green-600 ml-2">Grammar checking enabled</span>
                </label>
                <div className="mt-1">
                  <SimpleGrammarChecker
                    text={formData.short_answer}
                    onTextChange={(short_answer) => setFormData({...formData, short_answer})}
                    placeholder="Brief answer summary... Grammar checking will analyze your text automatically."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Detailed Answer
                  <span className="text-xs text-green-600 ml-2">Grammar checking enabled</span>
                </label>
                <div className="mt-1">
                  <SimpleGrammarChecker
                    text={formData.detailed_answer}
                    onTextChange={(detailed_answer) => setFormData({...formData, detailed_answer})}
                    placeholder="Comprehensive answer with biblical references... Grammar checking will analyze your text automatically."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Featured Question
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Q&A'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
}
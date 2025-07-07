'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '../../components/AuthGuard';
import { supabase } from '../../../../../lib/supabase';
import SimpleGrammarChecker from '../../../../components/SimpleGrammarChecker';

export default function NewResourcePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    type: 'pdf',
    category: 'study-guides',
    file_url: '',
    featured: false,
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('resources')
        .insert({
          title: formData.title,
          slug: generateSlug(formData.title),
          description: formData.description || null,
          content: formData.content || null,
          type: formData.type,
          category: formData.category,
          file_url: formData.file_url || null,
          featured: formData.featured,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
          published_at: new Date().toISOString(),
        });

      if (error) throw error;
      router.push('/studio/resources');
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
            <h1 className="text-3xl font-bold text-gray-900">New Resource</h1>
            <p className="mt-2 text-gray-600">Create a new downloadable resource</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="pdf">PDF</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="study-guides">Study Guides</option>
                    <option value="sermon-notes">Sermon Notes</option>
                    <option value="books">Books</option>
                    <option value="audio-sermons">Audio Sermons</option>
                    <option value="video-teachings">Video Teachings</option>
                    <option value="bible-studies">Bible Studies</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">File URL</label>
                <input
                  type="url"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.file_url}
                  onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                  placeholder="https://example.com/file.pdf"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                  <span className="text-xs text-green-600 ml-2">Grammar checking enabled</span>
                </label>
                <div className="mt-1">
                  <SimpleGrammarChecker
                    text={formData.description}
                    onTextChange={(description) => setFormData({...formData, description})}
                    placeholder="Brief description of the resource... Grammar checking will analyze your text automatically."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Content
                  <span className="text-xs text-green-600 ml-2">Grammar checking enabled</span>
                </label>
                <div className="mt-1">
                  <SimpleGrammarChecker
                    text={formData.content}
                    onTextChange={(content) => setFormData({...formData, content})}
                    placeholder="Detailed content about the resource... Grammar checking will analyze your text automatically."
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Featured Resource
                </label>
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
                {loading ? 'Creating...' : 'Create Resource'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
}
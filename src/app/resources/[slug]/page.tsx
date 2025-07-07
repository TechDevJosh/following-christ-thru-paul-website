import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface ResourcePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Define the query to get a specific resource


export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const { data: resource, error } = await supabase
      .from('resources')
      .select('title, description, content, slug, published_at, created_at')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    
    if (!resource) {
      return {
        title: 'Resource Not Found | Following Christ Thru Paul',
        description: 'The requested resource could not be found.',
      };
    }

    return {
      title: `${resource.title} | Following Christ Thru Paul`,
      description: resource.description || `Access ${resource.title} and other biblical resources.`,
    };
  } catch (error) {
    return {
      title: 'Resource | Following Christ Thru Paul',
      description: 'Biblical resources and study materials.',
    };
  }
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const resolvedParams = await params;
  let resource;
  
  try {
    const { slug } = resolvedParams;
    const { data: resource, error } = await supabase
      .from('resources')
      .select('title, description, content, slug, published_at, created_at')
      .eq('slug', slug)
      .single();

    if (error) throw error;
  } catch (error) {
    console.error('Error fetching resource:', error);
  }

  if (!resource) {
    // Show under construction for resources that don't exist yet
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
              Resource Coming Soon
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-body">
              This biblical resource is currently being prepared and will be available soon.
            </p>
            <p className="text-lg text-green-600 font-medium mb-8">
              We&apos;re working on: <span className="font-bold">{resolvedParams.slug.replace(/-/g, ' ')}</span>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
              Explore Other Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/resources"
                className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Browse All Resources</h3>
                <p className="text-gray-600 text-sm">See available study materials and tools</p>
              </Link>
              <Link
                href="/verse-by-verse"
                className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Verse by Verse</h3>
                <p className="text-gray-600 text-sm">Systematic Bible study through Scripture</p>
              </Link>
              <Link
                href="/topics"
                className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Topics</h3>
                <p className="text-gray-600 text-sm">Biblical topics and teachings</p>
              </Link>
              <Link
                href="/ask"
                className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Ask Questions</h3>
                <p className="text-gray-600 text-sm">Submit your biblical questions</p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Resources
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If resource exists, render the full resource page
  return (
    <div className="min-h-screen bg-white">
      <main className="container-custom py-16">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
              {resource.title}
            </h1>
            {resource.description && (
              <p className="text-xl text-gray-600 font-body leading-relaxed">
                {resource.description}
              </p>
            )}
            <div className="mt-6 text-sm text-gray-500">
              Published: {resource.published_at ? 
                new Date(resource.published_at).toLocaleDateString() : 
                new Date(resource.created_at).toLocaleDateString()
              }
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {resource.content ? (
              <div dangerouslySetInnerHTML={{ __html: resource.content }} />
            ) : (
              <p className="text-gray-600">Content for this resource is being prepared.</p>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

interface AskPageProps {
  params: {
    slug: string;
  };
}

// Define the query to get a specific Q&A
const ASK_QUERY = `*[_type == "ask" && slug.current == $slug][0]{
  _id,
  question,
  answer,
  slug,
  publishedAt,
  _createdAt
}`;

export async function generateMetadata({ params }: AskPageProps): Promise<Metadata> {
  try {
    const { slug } = params;
    const qa = await client.fetch(ASK_QUERY, { slug: slug });
    
    if (!qa) {
      return {
        title: 'Question Not Found | Following Christ Thru Paul',
        description: 'The requested question could not be found.',
      };
    }

    return {
      title: `${qa.question} | Following Christ Thru Paul`,
      description: qa.answer ? qa.answer.substring(0, 160) + '...' : 'Biblical question and answer.',
    };
  } catch (error) {
    return {
      title: 'Biblical Q&A | Following Christ Thru Paul',
      description: 'Biblical questions and answers.',
    };
  }
}

export default async function AskPage({ params }: AskPageProps) {
  const { slug } = params;
  let qa;
  
  try {
    qa = await client.fetch(ASK_QUERY, { slug: slug });
  } catch (error) {
    console.error('Error fetching Q&A:', error);
  }

  if (!qa) {
    // Show under construction for Q&As that don't exist yet
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
              Answer Coming Soon
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-body">
              This biblical question is being researched and the answer will be available soon.
            </p>
            <p className="text-lg text-purple-600 font-medium mb-8">
              Question about: <span className="font-bold">{resolvedParams.slug.replace(/-/g, ' ')}</span>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
              Explore Other Q&As
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/ask"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Browse All Questions</h3>
                <p className="text-gray-600 text-sm">See answered biblical questions</p>
              </Link>
              <Link
                href="/ask#submit"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Ask a Question</h3>
                <p className="text-gray-600 text-sm">Submit your own biblical question</p>
              </Link>
              <Link
                href="/topics"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Topics</h3>
                <p className="text-gray-600 text-sm">Biblical topics and teachings</p>
              </Link>
              <Link
                href="/verse-by-verse"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Verse by Verse</h3>
                <p className="text-gray-600 text-sm">Systematic Bible study</p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ask"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Q&A
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

  // If Q&A exists, render the full Q&A page
  return (
    <div className="min-h-screen bg-white">
      <main className="container-custom py-16">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              {qa.question}
            </h1>
            <div className="text-sm text-gray-500 mb-8">
              Answered: {qa.publishedAt ? 
                new Date(qa.publishedAt).toLocaleDateString() : 
                new Date(qa._createdAt).toLocaleDateString()
              }
            </div>
          </header>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Biblical Answer:</h2>
            <div className="prose prose-lg max-w-none text-blue-800">
              {qa.answer ? (
                <div dangerouslySetInnerHTML={{ __html: qa.answer }} />
              ) : (
                <p>The answer to this question is being prepared.</p>
              )}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ask"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse More Q&As
              </Link>
              <Link
                href="/ask#submit"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ask Your Own Question
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

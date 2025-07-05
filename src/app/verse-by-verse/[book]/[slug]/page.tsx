
import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { getYouTubeEmbedUrl } from '@/utils/youtube';
import Navbar from '@/components/Navbar';
import ShareButton from '@/components/ShareButton';
import { generateMetadata as generatePageMetadata, generateStructuredData } from '@/lib/metadata';

export const revalidate = 1800; // 30 minutes

interface Sermon {
  _id: string;
  title: string;
  book: string;
  passage: string;
  slug: { current: string };
  youtubeUrl: string;
  content: any[]; // Sanity Portable Text
  attachments: {
    label: string;
    url: string;
  }[];
  tags: string[];
  publishedAt: string;
}

interface PageProps {
  params: Promise<{
    book: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const book = decodeURIComponent(resolvedParams.book);
  const slug = resolvedParams.slug;

  const query = `*[_type == "verseByVerse" && book == $book && slug.current == $slug][0]{
    title,
    passage,
    youtubeUrl,
    content,
    publishedAt,
    _updatedAt,
    tags
  }`;
  const sermon = await client.fetch(query, { book, slug });

  if (!sermon) {
    return {
      title: 'Sermon Not Found',
    };
  }

  const embedUrl = getYouTubeEmbedUrl(sermon.youtubeUrl);
  const ogImage = embedUrl ? `https://img.youtube.com/vi/${embedUrl.split('/')[4].split('?')[0]}/hqdefault.jpg` : undefined;
  
  // Extract description from content
  const description = sermon.content && sermon.content.length > 0 
    ? sermon.content[0].children?.[0]?.text?.substring(0, 160) + '...' 
    : `Bible study on ${sermon.passage} - ${sermon.title}`;

  return generatePageMetadata({
    title: `${sermon.title} - ${sermon.passage}`,
    description,
    canonical: `https://followingchristthrupaul.com/verse-by-verse/${book}/${slug}`,
    ogImage,
    ogType: 'article',
    publishedTime: sermon.publishedAt,
    modifiedTime: sermon._updatedAt,
    tags: sermon.tags,
  });
}

export default async function SermonPage({ params }: PageProps) {
  const resolvedParams = await params;
  const book = decodeURIComponent(resolvedParams.book);
  const slug = resolvedParams.slug;

  const query = `*[_type == "verseByVerse" && book == $book && slug.current == $slug][0]{
    title,
    book,
    passage,
    slug,
    youtubeUrl,
    content,
    attachments,
    tags,
    publishedAt,
  }`;
  const sermon: Sermon = await client.fetch(query, { book, slug });

  if (!sermon) {
    return <p className="container mx-auto py-10 text-center">Sermon not found.</p>;
  }

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Verse by Verse', href: '/verse-by-verse' },
    { name: sermon.book, href: `/verse-by-verse/${sermon.book}` },
    { name: sermon.passage, href: `/verse-by-verse/${sermon.book}/${sermon.slug.current}` },
  ];

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => (
        <p className="font-body text-gray-800 leading-relaxed mb-6 text-lg">
          {children}
        </p>
      ),
      h1: ({ children }: any) => (
        <h1 className="font-heading text-4xl text-gray-900 mt-12 mb-6 leading-tight">
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="font-heading text-3xl text-gray-900 mt-10 mb-5 leading-tight">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="font-heading text-2xl text-gray-900 mt-8 mb-4 leading-tight">
          {children}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="font-subheading text-xl text-gray-900 mt-6 mb-3 leading-tight">
          {children}
        </h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-blue-600 pl-6 py-4 my-8 bg-blue-50 italic text-gray-700 text-lg leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside space-y-2 mb-6 text-lg text-gray-800 ml-4">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside space-y-2 mb-6 text-lg text-gray-800 ml-4">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="font-body leading-relaxed mb-2">{children}</li>
      ),
      number: ({ children }: any) => (
        <li className="font-body leading-relaxed mb-2">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic text-gray-700">{children}</em>
      ),
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          target={value.blank ? '_blank' : '_self'}
          rel={value.blank ? 'noopener noreferrer' : undefined}
          className="text-blue-700 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors"
        >
          {children}
        </a>
      ),
      code: ({ children }: any) => (
        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ),
    },
    types: {
      // Handle any custom block types you might have in Sanity
      break: () => <br className="my-4" />,
    },
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(sermon.youtubeUrl);

  const structuredData = generateStructuredData('Article', {
    title: sermon.title,
    description: sermon.content && sermon.content.length > 0 
      ? sermon.content[0].children?.[0]?.text?.substring(0, 160) + '...' 
      : `Bible study on ${sermon.passage} - ${sermon.title}`,
    url: `https://followingchristthrupaul.com/verse-by-verse/${book}/${slug}`,
    publishedTime: sermon.publishedAt,
    modifiedTime: sermon._updatedAt || sermon.publishedAt,
    image: embedUrl ? `https://img.youtube.com/vi/${embedUrl.split('/')[4].split('?')[0]}/hqdefault.jpg` : undefined,
  });

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <header role="banner">
        <Navbar />
      </header>

      <main className="container-custom py-12">
        {/* Breadcrumbs */}
        <nav className="font-body text-sm text-gray-500 mb-8 max-w-4xl mx-auto">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.name}>
              <Link href={crumb.href} className="hover:text-blue-700 transition-colors">{crumb.name}</Link>
              {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-300">/</span>}
            </span>
          ))}
        </nav>

        <article className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="text-center mb-12 pb-8 border-b border-gray-200">
            <h1 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">
              {sermon.title}
            </h1>
            <p className="font-subheading text-2xl md:text-3xl text-blue-700 mb-6">
              {sermon.passage}
            </p>
            
            {/* Publication Date */}
            {sermon.publishedAt && (
              <time className="font-body text-gray-500 text-sm">
                Published {new Date(sermon.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </header>

          {/* YouTube Embed */}
          {youtubeEmbedUrl && (
            <div className="mb-12">
              <div className="card-elevated p-2 max-w-4xl mx-auto">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={youtubeEmbedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {/* Rich Text Content */}
          <div className="prose prose-lg prose-blue max-w-none mb-12">
            {sermon.content && sermon.content.length > 0 ? (
              <PortableText value={sermon.content} components={portableTextComponents} />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="font-body text-lg">Content for this sermon is being prepared.</p>
                <p className="font-body text-sm mt-2">Please check back soon or watch the video above.</p>
              </div>
            )}
          </div>

          {/* Download Links */}
          {sermon.attachments && sermon.attachments.length > 0 && (
            <section className="mb-12 p-8 bg-gray-50 rounded-xl">
              <h3 className="font-heading text-2xl text-gray-900 mb-6">Study Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sermon.attachments.map((attachment, index) => (
                  <a 
                    key={index} 
                    href={attachment.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <span className="mr-3 text-2xl">
                      {attachment.label.toLowerCase().includes('pdf') && (
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                      )}
                      {attachment.label.toLowerCase().includes('audio') && (
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,3A3,3 0 0,0 9,6V12A3,3 0 0,0 12,15A3,3 0 0,0 15,12V6A3,3 0 0,0 12,3M19,11C19,15.4 15.4,19 11,19C6.6,19 3,15.4 3,11H5C5,14.3 7.7,17 11,17C14.3,17 17,14.3 17,11H19Z" />
                        </svg>
                      )}
                      {attachment.label.toLowerCase().includes('notes') && (
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M9,12H16V14H9V12M9,16H14V18H9V16Z" />
                        </svg>
                      )}
                      {!attachment.label.toLowerCase().includes('pdf') && 
                       !attachment.label.toLowerCase().includes('audio') && 
                       !attachment.label.toLowerCase().includes('notes') && (
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10.59,13.41C11,13.8 11,14.4 10.59,14.81C10.2,15.2 9.6,15.2 9.19,14.81L7.77,13.39L6.36,14.81L10.59,19.04L21.41,8.22L20,6.81L10.59,16.22L8.5,14.13L7.77,13.39L10.59,13.41M21.41,6.41L22.83,5L21.41,3.59L20,5L21.41,6.41M13.1,7.9L14.5,9.3L16.9,6.9L15.5,5.5L13.1,7.9M6.41,10.59L5,12L6.41,13.41L7.83,12L6.41,10.59Z" />
                        </svg>
                      )}
                    </span>
                    <div className="flex-1">
                      <span className="font-body font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                        {attachment.label}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {sermon.tags && sermon.tags.length > 0 && (
            <section className="mb-12">
              <h3 className="font-heading text-2xl text-gray-900 mb-6">Topics Covered</h3>
              <div className="flex flex-wrap gap-3">
                {sermon.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-body font-medium text-sm hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.77,14.05 22,13.55 22,13C22,12.45 21.77,11.95 21.41,11.58Z" />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Share Button */}
          <section className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl text-gray-900">Share This Study</h3>
              <ShareButton title={`${sermon.title} - ${sermon.passage}`} />
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Ministry Info */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-2xl mb-4">Following Christ Thru Paul</h3>
              <p className="font-body text-gray-300 mb-6 leading-relaxed">
                "To make all men see what is the fellowship of the mystery" (Eph. 3:9)
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
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h4 className="font-subheading text-lg mb-4">Connect</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li><Link href="/connect/subscribe" className="hover:text-white transition-colors">Subscribe</Link></li>
                <li><Link href="/connect/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/connect/support" className="hover:text-white transition-colors">Support</Link></li>
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

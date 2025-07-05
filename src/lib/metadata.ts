import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
}

const baseUrl = 'https://followingchristthrupaul.com';
const defaultOgImage = 'https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png';

export function generateMetadata({
  title,
  description,
  canonical,
  ogImage = defaultOgImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  tags,
  author = 'Following Christ Thru Paul Ministry'
}: PageMetadata): Metadata {
  const fullTitle = title.includes('Following Christ Thru Paul') 
    ? title 
    : `${title} | Following Christ Thru Paul`;
  
  const canonicalUrl = canonical || baseUrl;

  return {
    title: fullTitle,
    description,
    authors: [{ name: author }],
    keywords: tags?.join(', ') || 'KJV Bible, Paul\'s epistles, dispensational theology, Bible study, Christian ministry',
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl,
      siteName: 'Following Christ Thru Paul',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStructuredData(type: 'WebSite' | 'Organization' | 'Article', data: any) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'WebSite':
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        name: 'Following Christ Thru Paul',
        description: 'A KJV Bible-believing ministry for serious Bible study and doctrinal teaching',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Following Christ Thru Paul Ministry',
          logo: {
            '@type': 'ImageObject',
            url: defaultOgImage,
          },
        },
      };

    case 'Organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: 'Following Christ Thru Paul Ministry',
        description: 'A KJV Bible-believing ministry committed to serious Bible study and doctrinal teaching',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: defaultOgImage,
        },
        sameAs: [
          'https://facebook.com/FollowingChristThruPaul',
          'https://www.youtube.com/@FollowingChristThruPaul',
        ],
      };

    case 'Article':
      return {
        ...baseStructuredData,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Organization',
          name: 'Following Christ Thru Paul Ministry',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Following Christ Thru Paul Ministry',
          logo: {
            '@type': 'ImageObject',
            url: defaultOgImage,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url,
        },
        image: data.image || defaultOgImage,
      };

    default:
      return baseStructuredData;
  }
}
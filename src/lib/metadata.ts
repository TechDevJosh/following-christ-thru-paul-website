import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Following Christ Thru Paul',
  description: 'A KJV Bible-believing ministry committed to serious Bible study, saintly edification, and sound doctrinal teaching through Pauline dispensational truth.',
  openGraph: {
    title: 'Following Christ Thru Paul',
    description: 'A KJV Bible-believing ministry committed to serious Bible study and sound doctrinal teaching.',
    type: 'website',
    url: 'https://followingchristthrupaul.com',
    images: [
      {
        url: 'https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png',
        width: 1200,
        height: 630,
        alt: 'Following Christ Thru Paul Ministry Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Following Christ Thru Paul',
    description: 'A KJV Bible-believing ministry committed to serious Bible study and sound doctrinal teaching.',
    images: ['https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png'],
  },
  alternates: {
    canonical: 'https://followingchristthrupaul.com',
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const fullTitle = `${title} | Following Christ Thru Paul`;
  const url = `https://followingchristthrupaul.com${path}`;
  const ogImage = image || 'https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png';

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
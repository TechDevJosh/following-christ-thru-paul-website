'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { 
  generateBreadcrumbStructuredData, 
  generateFAQStructuredData, 
  generateArticleStructuredData,
  generateVideoStructuredData,
  BreadcrumbItem,
  FAQItem 
} from '@/lib/seo-utils';

interface StructuredDataProviderProps {
  type: 'article' | 'faq' | 'video' | 'breadcrumb';
  data: any;
  children?: React.ReactNode;
}

export default function StructuredDataProvider({ type, data, children }: StructuredDataProviderProps) {
  const pathname = usePathname();
  
  const generateStructuredData = () => {
    const baseUrl = 'https://followingchristthrupaul.com';
    
    switch (type) {
      case 'breadcrumb':
        // Auto-generate breadcrumbs from pathname
        const pathSegments = pathname.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [
          { name: 'Home', url: baseUrl }
        ];
        
        let currentPath = '';
        pathSegments.forEach((segment, index) => {
          currentPath += `/${segment}`;
          const name = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          breadcrumbs.push({
            name: index === pathSegments.length - 1 && data?.title ? data.title : name,
            url: `${baseUrl}${currentPath}`
          });
        });
        
        return generateBreadcrumbStructuredData(breadcrumbs);
        
      case 'article':
        return generateArticleStructuredData({
          title: data.title,
          description: data.description,
          author: data.author || 'Following Christ Thru Paul Ministry',
          publishedDate: data.publishedDate,
          modifiedDate: data.modifiedDate,
          url: `${baseUrl}${pathname}`,
          imageUrl: data.imageUrl,
          articleBody: data.content
        });
        
      case 'faq':
        const faqs: FAQItem[] = data.faqs || [];
        return generateFAQStructuredData(faqs);
        
      case 'video':
        return generateVideoStructuredData({
          title: data.title,
          description: data.description,
          thumbnailUrl: data.thumbnailUrl,
          uploadDate: data.uploadDate,
          duration: data.duration,
          embedUrl: data.embedUrl,
          contentUrl: data.contentUrl
        });
        
      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();

  if (!structuredData) {
    return <>{children}</>;
  }

  return (
    <>
      <Script
        id={`structured-data-${type}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      {children}
    </>
  );
}

// Convenience components for specific structured data types
export function BreadcrumbStructuredData({ title }: { title?: string }) {
  return <StructuredDataProvider type="breadcrumb" data={{ title }} />;
}

export function ArticleStructuredData({
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  imageUrl,
  content
}: {
  title: string;
  description: string;
  author?: string;
  publishedDate: string;
  modifiedDate?: string;
  imageUrl?: string;
  content?: string;
}) {
  return (
    <StructuredDataProvider
      type="article"
      data={{
        title,
        description,
        author,
        publishedDate,
        modifiedDate,
        imageUrl,
        content
      }}
    />
  );
}

export function FAQStructuredData({ faqs }: { faqs: FAQItem[] }) {
  return <StructuredDataProvider type="faq" data={{ faqs }} />;
}

export function VideoStructuredData({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  embedUrl,
  contentUrl
}: {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  embedUrl: string;
  contentUrl?: string;
}) {
  return (
    <StructuredDataProvider
      type="video"
      data={{
        title,
        description,
        thumbnailUrl,
        uploadDate,
        duration,
        embedUrl,
        contentUrl
      }}
    />
  );
}
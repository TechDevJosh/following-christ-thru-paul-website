// SEO utility functions for structured data and analysis

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateBreadcrumbStructuredData(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateFAQStructuredData(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateArticleStructuredData({
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  url,
  imageUrl,
  articleBody
}: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  url: string;
  imageUrl?: string;
  articleBody?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Following Christ Thru Paul",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(imageUrl && {
      "image": {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": 1200,
        "height": 630
      }
    }),
    ...(articleBody && { "articleBody": articleBody })
  };
}

export function generateVideoStructuredData({
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
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "embedUrl": embedUrl,
    ...(contentUrl && { "contentUrl": contentUrl }),
    ...(duration && { "duration": duration })
  };
}

export function analyzeInternalLinks(content: string, currentUrl: string): {
  totalLinks: number;
  internalLinks: number;
  externalLinks: number;
  linkDensity: number;
  suggestions: string[];
} {
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const linkMatches = content.match(/<a[^>]*href[^>]*>/gi) || [];
  const internalLinkMatches = linkMatches.filter(link => 
    link.includes('followingchristthrupaul.com') || 
    link.includes('href="/') || 
    link.includes("href='/")
  );
  
  const totalLinks = linkMatches.length;
  const internalLinks = internalLinkMatches.length;
  const externalLinks = totalLinks - internalLinks;
  const linkDensity = wordCount > 0 ? (totalLinks / wordCount) * 100 : 0;
  
  const suggestions: string[] = [];
  
  // Optimal link density is 1-3%
  if (linkDensity < 1) {
    suggestions.push('Consider adding more internal links to improve navigation and SEO');
  } else if (linkDensity > 3) {
    suggestions.push('Link density is high - consider reducing links or adding more content');
  }
  
  // Recommend 5-10 internal links per 2000 words
  const recommendedInternalLinks = Math.max(2, Math.floor(wordCount / 400));
  if (internalLinks < recommendedInternalLinks) {
    suggestions.push(`Add ${recommendedInternalLinks - internalLinks} more internal links to related content`);
  }
  
  // Check for descriptive anchor text
  const genericAnchors = linkMatches.filter(link => 
    link.toLowerCase().includes('>click here<') ||
    link.toLowerCase().includes('>read more<') ||
    link.toLowerCase().includes('>here<')
  );
  
  if (genericAnchors.length > 0) {
    suggestions.push('Use descriptive anchor text instead of generic phrases like "click here"');
  }
  
  return {
    totalLinks,
    internalLinks,
    externalLinks,
    linkDensity: Math.round(linkDensity * 100) / 100,
    suggestions
  };
}

export function validateHeadingStructure(content: string): {
  isValid: boolean;
  h1Count: number;
  headingHierarchy: { level: number; text: string }[];
  issues: string[];
} {
  const headingMatches = content.match(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi) || [];
  const h1Matches = content.match(/<h1[^>]*>/gi) || [];
  
  const headingHierarchy = headingMatches.map(match => {
    const levelMatch = match.match(/<h([1-6])/);
    const textMatch = match.match(/>(.*?)</);
    return {
      level: levelMatch ? parseInt(levelMatch[1]) : 1,
      text: textMatch ? textMatch[1].replace(/<[^>]*>/g, '') : ''
    };
  });
  
  const issues: string[] = [];
  
  // Check H1 count
  if (h1Matches.length === 0) {
    issues.push('Missing H1 heading - add exactly one H1 per page');
  } else if (h1Matches.length > 1) {
    issues.push(`Multiple H1 headings found (${h1Matches.length}) - use only one H1 per page`);
  }
  
  // Check heading hierarchy
  let previousLevel = 0;
  headingHierarchy.forEach((heading, index) => {
    if (index === 0 && heading.level !== 1) {
      issues.push('First heading should be H1');
    }
    
    if (heading.level > previousLevel + 1) {
      issues.push(`Heading hierarchy skip detected: H${previousLevel} to H${heading.level}`);
    }
    
    previousLevel = heading.level;
  });
  
  return {
    isValid: issues.length === 0,
    h1Count: h1Matches.length,
    headingHierarchy,
    issues
  };
}

export function extractImageAltIssues(content: string): {
  totalImages: number;
  imagesWithAlt: number;
  imagesWithoutAlt: number;
  emptyAltImages: number;
  suggestions: string[];
} {
  const imageMatches = content.match(/<img[^>]*>/gi) || [];
  const imagesWithAlt = content.match(/<img[^>]*alt=["'][^"']*["'][^>]*>/gi) || [];
  const imagesWithoutAlt = content.match(/<img(?![^>]*alt=)[^>]*>/gi) || [];
  const emptyAltImages = content.match(/<img[^>]*alt=["'][\s]*["'][^>]*>/gi) || [];
  
  const suggestions: string[] = [];
  
  if (imagesWithoutAlt.length > 0) {
    suggestions.push(`Add alt text to ${imagesWithoutAlt.length} images for accessibility and SEO`);
  }
  
  if (emptyAltImages.length > 0) {
    suggestions.push(`${emptyAltImages.length} images have empty alt text - add descriptive text`);
  }
  
  if (imageMatches.length > 0 && imagesWithAlt.length === imageMatches.length) {
    suggestions.push('All images have alt text - great for accessibility!');
  }
  
  return {
    totalImages: imageMatches.length,
    imagesWithAlt: imagesWithAlt.length,
    imagesWithoutAlt: imagesWithoutAlt.length,
    emptyAltImages: emptyAltImages.length,
    suggestions
  };
}
'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface SEOValidationResult {
  type: 'error' | 'warning' | 'success' | 'info';
  message: string;
  field?: string;
  suggestion?: string;
}

interface SEOValidatorProps {
  title?: string;
  description?: string;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
  className?: string;
}

export default function SEOValidator({
  title = '',
  description = '',
  content = '',
  seoTitle = '',
  seoDescription = '',
  className = ''
}: SEOValidatorProps) {
  const [validationResults, setValidationResults] = useState<SEOValidationResult[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const results: SEOValidationResult[] = [];

    // Title validation (50-60 characters optimal)
    const effectiveTitle = seoTitle || title;
    if (!effectiveTitle) {
      results.push({
        type: 'error',
        message: 'Title is required',
        field: 'title',
        suggestion: 'Add a compelling title for this content'
      });
    } else if (effectiveTitle.length < 30) {
      results.push({
        type: 'warning',
        message: `Title is too short (${effectiveTitle.length} chars)`,
        field: 'title',
        suggestion: 'Aim for 50-60 characters for optimal SEO'
      });
    } else if (effectiveTitle.length > 60) {
      results.push({
        type: 'warning',
        message: `Title is too long (${effectiveTitle.length} chars)`,
        field: 'title',
        suggestion: 'Keep titles under 60 characters to avoid truncation'
      });
    } else {
      results.push({
        type: 'success',
        message: `Title length is optimal (${effectiveTitle.length} chars)`,
        field: 'title'
      });
    }

    // Meta description validation (120-156 characters optimal)
    const effectiveDescription = seoDescription || description;
    if (!effectiveDescription) {
      results.push({
        type: 'error',
        message: 'Meta description is required',
        field: 'description',
        suggestion: 'Add a compelling description that summarizes the content'
      });
    } else if (effectiveDescription.length < 120) {
      results.push({
        type: 'warning',
        message: `Description is too short (${effectiveDescription.length} chars)`,
        field: 'description',
        suggestion: 'Aim for 120-156 characters for optimal SEO'
      });
    } else if (effectiveDescription.length > 156) {
      results.push({
        type: 'warning',
        message: `Description is too long (${effectiveDescription.length} chars)`,
        field: 'description',
        suggestion: 'Keep descriptions under 156 characters to avoid truncation'
      });
    } else {
      results.push({
        type: 'success',
        message: `Description length is optimal (${effectiveDescription.length} chars)`,
        field: 'description'
      });
    }

    // Content analysis
    if (content) {
      const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
      const headingMatches = content.match(/<h[1-6][^>]*>/gi) || [];
      const h1Matches = content.match(/<h1[^>]*>/gi) || [];
      const linkMatches = content.match(/<a[^>]*href[^>]*>/gi) || [];
      const imageMatches = content.match(/<img[^>]*>/gi) || [];
      const imagesWithoutAlt = content.match(/<img(?![^>]*alt=)[^>]*>/gi) || [];

      // Word count check
      if (wordCount < 300) {
        results.push({
          type: 'warning',
          message: `Content is short (${wordCount} words)`,
          field: 'content',
          suggestion: 'Consider expanding content to at least 300 words for better SEO'
        });
      } else {
        results.push({
          type: 'success',
          message: `Good content length (${wordCount} words)`,
          field: 'content'
        });
      }

      // Heading structure check
      if (h1Matches.length === 0) {
        results.push({
          type: 'error',
          message: 'No H1 heading found',
          field: 'content',
          suggestion: 'Add exactly one H1 heading to establish page hierarchy'
        });
      } else if (h1Matches.length > 1) {
        results.push({
          type: 'error',
          message: `Multiple H1 headings found (${h1Matches.length})`,
          field: 'content',
          suggestion: 'Use only one H1 heading per page'
        });
      } else {
        results.push({
          type: 'success',
          message: 'Proper H1 heading structure',
          field: 'content'
        });
      }

      // Internal linking check (5-10 links per 2000 words)
      const expectedLinks = Math.max(1, Math.floor(wordCount / 400)); // 5 links per 2000 words
      if (linkMatches.length < expectedLinks) {
        results.push({
          type: 'info',
          message: `Consider adding more internal links (${linkMatches.length}/${expectedLinks})`,
          field: 'content',
          suggestion: 'Add 5-10 internal links per 2000 words to improve SEO'
        });
      } else {
        results.push({
          type: 'success',
          message: `Good internal linking (${linkMatches.length} links)`,
          field: 'content'
        });
      }

      // Image alt text check
      if (imagesWithoutAlt.length > 0) {
        results.push({
          type: 'error',
          message: `${imagesWithoutAlt.length} images missing alt text`,
          field: 'content',
          suggestion: 'Add descriptive alt text to all images for accessibility and SEO'
        });
      } else if (imageMatches.length > 0) {
        results.push({
          type: 'success',
          message: `All images have alt text (${imageMatches.length} images)`,
          field: 'content'
        });
      }
    }

    setValidationResults(results);
  }, [title, description, content, seoTitle, seoDescription]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const errorCount = validationResults.filter(r => r.type === 'error').length;
  const warningCount = validationResults.filter(r => r.type === 'warning').length;
  const successCount = validationResults.filter(r => r.type === 'success').length;

  return (
    <div className={`bg-[#1A1A1A] border border-[#333] rounded-lg ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-[#222] transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{errorCount}</span>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{warningCount}</span>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{successCount}</span>
            </div>
          </div>
          <span className="text-white font-medium">SEO Analysis</span>
        </div>
        <div className="text-[#AAA]">
          {isExpanded ? '−' : '+'}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-[#333] p-4 space-y-3 max-h-64 overflow-y-auto">
          {validationResults.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded border ${getColorClasses(result.type)}`}
            >
              <div className="flex items-start space-x-2">
                {getIcon(result.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{result.message}</p>
                  {result.suggestion && (
                    <p className="text-xs mt-1 opacity-75">{result.suggestion}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
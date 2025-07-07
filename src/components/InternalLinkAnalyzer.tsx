'use client';

import { useState, useEffect } from 'react';
import { Link2, ExternalLink, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { analyzeInternalLinks } from '@/lib/seo-utils';

interface InternalLinkAnalyzerProps {
  content: string;
  currentUrl?: string;
  className?: string;
}

interface LinkSuggestion {
  text: string;
  url: string;
  reason: string;
}

export default function InternalLinkAnalyzer({ 
  content, 
  currentUrl = '', 
  className = '' 
}: InternalLinkAnalyzerProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<LinkSuggestion[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!content) return;

    const linkAnalysis = analyzeInternalLinks(content, currentUrl);
    setAnalysis(linkAnalysis);

    // Generate smart link suggestions based on content
    const contentLower = content.toLowerCase();
    const suggestedLinks: LinkSuggestion[] = [];

    // Bible book suggestions
    const bibleBooks = [
      'romans', 'ephesians', 'galatians', 'philippians', 'colossians', 
      'thessalonians', 'timothy', 'titus', 'philemon', 'corinthians'
    ];
    
    bibleBooks.forEach(book => {
      if (contentLower.includes(book) && !content.includes(`/verse-by-verse/${book}`)) {
        suggestedLinks.push({
          text: `${book.charAt(0).toUpperCase() + book.slice(1)} Study`,
          url: `/verse-by-verse/${book}`,
          reason: `Content mentions ${book} - link to verse-by-verse study`
        });
      }
    });

    // Topic suggestions
    const topics = [
      { keyword: 'salvation', url: '/topics/salvation', text: 'Salvation' },
      { keyword: 'grace', url: '/topics/grace', text: 'Grace' },
      { keyword: 'dispensation', url: '/topics/dispensational-truth', text: 'Dispensational Truth' },
      { keyword: 'eternal security', url: '/topics/eternal-security', text: 'Eternal Security' },
      { keyword: 'justification', url: '/topics/justification', text: 'Justification' },
      { keyword: 'sanctification', url: '/topics/sanctification', text: 'Sanctification' },
      { keyword: 'prophecy', url: '/topics/prophecy', text: 'Prophecy' },
      { keyword: 'rapture', url: '/topics/rapture', text: 'Rapture' }
    ];

    topics.forEach(topic => {
      if (contentLower.includes(topic.keyword) && !content.includes(topic.url)) {
        suggestedLinks.push({
          text: topic.text,
          url: topic.url,
          reason: `Content discusses ${topic.keyword} - link to related topic`
        });
      }
    });

    // Resource suggestions
    if (contentLower.includes('kjv') || contentLower.includes('king james')) {
      if (!content.includes('/resources/kjv')) {
        suggestedLinks.push({
          text: 'KJV Resources',
          url: '/resources/kjv-apologetics',
          text: 'KJV Bible Resources',
          reason: 'Content mentions KJV - link to Bible resources'
        });
      }
    }

    // Q&A suggestions
    if (contentLower.includes('question') || contentLower.includes('ask')) {
      if (!content.includes('/ask')) {
        suggestedLinks.push({
          text: 'Ask a Question',
          url: '/ask',
          reason: 'Content mentions questions - link to Q&A section'
        });
      }
    }

    // Limit suggestions to top 5
    setSuggestions(suggestedLinks.slice(0, 5));
  }, [content, currentUrl]);

  if (!analysis) return null;

  const getStatusColor = () => {
    if (analysis.internalLinks >= 3 && analysis.linkDensity >= 1 && analysis.linkDensity <= 3) {
      return 'text-green-500';
    } else if (analysis.internalLinks >= 1) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }
  };

  const getStatusIcon = () => {
    if (analysis.internalLinks >= 3 && analysis.linkDensity >= 1 && analysis.linkDensity <= 3) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (analysis.internalLinks >= 1) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    } else {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className={`bg-[#1A1A1A] border border-[#333] rounded-lg ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-[#222] transition-colors"
      >
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <span className="text-white font-medium">Internal Link Analysis</span>
          <div className="flex items-center space-x-4 text-sm text-[#AAA]">
            <div className="flex items-center space-x-1">
              <Link2 className="w-3 h-3" />
              <span>{analysis.internalLinks} internal</span>
            </div>
            <div className="flex items-center space-x-1">
              <ExternalLink className="w-3 h-3" />
              <span>{analysis.externalLinks} external</span>
            </div>
            <span>{analysis.linkDensity}% density</span>
          </div>
        </div>
        <div className="text-[#AAA]">
          {isExpanded ? '−' : '+'}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-[#333] p-4 space-y-4">
          {/* Analysis Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#222] p-3 rounded">
              <div className="text-[#AAA] text-xs uppercase tracking-wide">Total Links</div>
              <div className="text-white text-lg font-semibold">{analysis.totalLinks}</div>
            </div>
            <div className="bg-[#222] p-3 rounded">
              <div className="text-[#AAA] text-xs uppercase tracking-wide">Internal</div>
              <div className={`text-lg font-semibold ${getStatusColor()}`}>{analysis.internalLinks}</div>
            </div>
            <div className="bg-[#222] p-3 rounded">
              <div className="text-[#AAA] text-xs uppercase tracking-wide">External</div>
              <div className="text-white text-lg font-semibold">{analysis.externalLinks}</div>
            </div>
            <div className="bg-[#222] p-3 rounded">
              <div className="text-[#AAA] text-xs uppercase tracking-wide">Link Density</div>
              <div className="text-white text-lg font-semibold">{analysis.linkDensity}%</div>
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-500" />
                <span>Recommendations</span>
              </h4>
              {analysis.suggestions.map((suggestion: string, index: number) => (
                <div key={index} className="bg-blue-900/20 border border-blue-700/30 p-3 rounded text-blue-200 text-sm">
                  {suggestion}
                </div>
              ))}
            </div>
          )}

          {/* Smart Link Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <Link2 className="w-4 h-4 text-green-500" />
                <span>Suggested Internal Links</span>
              </h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-green-900/20 border border-green-700/30 p-3 rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-green-200 font-medium">{suggestion.text}</div>
                        <div className="text-green-300/70 text-xs">{suggestion.url}</div>
                        <div className="text-green-300/50 text-xs mt-1">{suggestion.reason}</div>
                      </div>
                      <button
                        onClick={() => {
                          // Copy link markdown to clipboard
                          navigator.clipboard.writeText(`[${suggestion.text}](${suggestion.url})`);
                        }}
                        className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best Practices */}
          <div className="bg-[#222] p-3 rounded">
            <h4 className="text-white font-medium mb-2">Best Practices</h4>
            <ul className="text-[#AAA] text-sm space-y-1">
              <li>• Aim for 5-10 internal links per 2,000 words</li>
              <li>• Keep link density between 1-3%</li>
              <li>• Use descriptive anchor text (avoid "click here")</li>
              <li>• Link to related content within your site</li>
              <li>• Balance internal and external links</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
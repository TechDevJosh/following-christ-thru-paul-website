'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, List } from 'lucide-react';
import { validateHeadingStructure } from '@/lib/seo-utils';

interface HeadingStructureValidatorProps {
  content: string;
  className?: string;
}

export default function HeadingStructureValidator({ 
  content, 
  className = '' 
}: HeadingStructureValidatorProps) {
  const [validation, setValidation] = useState<{
    isValid: boolean;
    h1Count: number;
    headingHierarchy: { level: number; text: string }[];
    issues: string[];
  } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!content) return;
    
    const result = validateHeadingStructure(content);
    setValidation(result);
  }, [content]);

  if (!validation) return null;

  const getStatusIcon = () => {
    if (validation.isValid) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    return validation.isValid ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className={`bg-[#1A1A1A] border border-[#333] rounded-lg ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-[#222] transition-colors"
      >
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <span className="text-white font-medium">Heading Structure</span>
          <div className="flex items-center space-x-4 text-sm text-[#AAA]">
            <span>H1: {validation.h1Count}</span>
            <span>Total: {validation.headingHierarchy.length}</span>
            <span className={validation.isValid ? 'text-green-500' : 'text-red-500'}>
              {validation.isValid ? 'Valid' : 'Issues'}
            </span>
          </div>
        </div>
        <div className="text-[#AAA]">
          {isExpanded ? '−' : '+'}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-[#333] p-4 space-y-4">
          {/* H1 Status */}
          <div className="bg-[#222] p-3 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">H1 Headings</span>
              <span className={`text-sm ${validation.h1Count === 1 ? 'text-green-500' : 'text-red-500'}`}>
                {validation.h1Count} found
              </span>
            </div>
            <div className="text-[#AAA] text-sm">
              {validation.h1Count === 0 && 'Add exactly one H1 heading per page'}
              {validation.h1Count === 1 && 'Perfect! One H1 heading found'}
              {validation.h1Count > 1 && `Too many H1 headings. Use only one H1 per page.`}
            </div>
          </div>

          {/* Issues */}
          {validation.issues.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Issues Found</span>
              </h4>
              {validation.issues.map((issue: string, index: number) => (
                <div key={index} className="bg-red-900/20 border border-red-700/30 p-3 rounded text-red-200 text-sm">
                  {issue}
                </div>
              ))}
            </div>
          )}

          {/* Heading Hierarchy */}
          {validation.headingHierarchy.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <List className="w-4 h-4 text-blue-500" />
                <span>Heading Hierarchy</span>
              </h4>
              <div className="bg-[#222] p-3 rounded space-y-2">
                {validation.headingHierarchy.map((heading: { level: number; text: string }, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      heading.level === 1 ? 'bg-blue-600 text-white' :
                      heading.level === 2 ? 'bg-green-600 text-white' :
                      heading.level === 3 ? 'bg-yellow-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      H{heading.level}
                    </span>
                    <span className="text-[#AAA] text-sm flex-1 truncate">
                      {heading.text || '(Empty heading)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best Practices */}
          <div className="bg-[#222] p-3 rounded">
            <h4 className="text-white font-medium mb-2">Best Practices</h4>
            <ul className="text-[#AAA] text-sm space-y-1">
              <li>• Use exactly one H1 heading per page</li>
              <li>• Follow logical hierarchy: H1 → H2 → H3 → H4</li>
              <li>• Don't skip heading levels (H1 → H3)</li>
              <li>• Make headings descriptive and keyword-rich</li>
              <li>• Use headings to structure content, not for styling</li>
            </ul>
          </div>

          {validation.isValid && (
            <div className="bg-green-900/20 border border-green-700/30 p-3 rounded text-green-200 text-sm">
              ✅ Heading structure is valid and follows SEO best practices!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
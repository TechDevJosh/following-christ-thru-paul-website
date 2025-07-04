"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  book?: string; // For verseByVerse
  excerpt?: string;
}

export default function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce search term
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 2) {
        setLoading(true);
        try {
          const response = await fetch(`/api/search?q=${searchTerm}`);
          const data = await response.json();
          // Flatten results from different content types
          const flattenedResults: SearchResult[] = Object.values(data.results).flat() as SearchResult[];
          setSearchResults(flattenedResults);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const getResultLink = (result: SearchResult) => {
    switch (result._type) {
      case 'verseByVerse':
        return `/verse-by-verse/${result.book}/${result.slug}`;
      case 'topics':
        return `/topics/${result.slug}`;
      case 'resources':
        return `/resources/${result.slug}`;
      case 'ask':
        return `/ask/${result.slug}`;
      case 'conferences':
        return `/conferences/${result.slug}`;
      default:
        return `/#`; // Fallback
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search studies, topics..."
          className="w-full sm:w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90 backdrop-blur-sm"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      {isOpen && searchTerm.length > 2 && (
        <div className="absolute z-50 mt-2 w-full sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-600">Searching...</span>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Search Results</p>
              </div>
              {searchResults.slice(0, 6).map((result) => (
                <Link 
                  key={result._id} 
                  href={getResultLink(result)} 
                  className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        {result._type === 'verseByVerse' && (
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        )}
                        {result._type === 'topics' && (
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        )}
                        {(result._type === 'resources' || result._type === 'ask') && (
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {result._type === 'verseByVerse' ? 'Study' : result._type}
                        </span>
                        {result.book && (
                          <span className="text-xs text-gray-500">{result.book}</span>
                        )}
                      </div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {result.title}
                      </p>
                      {result.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          {result.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
              {searchResults.length > 6 && (
                <div className="p-4 text-center border-t border-gray-100 bg-gray-50">
                  <Link 
                    href={`/search?q=${searchTerm}`} 
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    View all {searchResults.length} results →
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No results found for "{searchTerm}"</p>
              <p className="text-gray-400 text-xs mt-1">Try different keywords or browse our studies</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

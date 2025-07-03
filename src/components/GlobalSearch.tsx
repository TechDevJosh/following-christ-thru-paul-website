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
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && searchTerm.length > 2 && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : searchResults.length > 0 ? (
            <>
              {searchResults.map((result) => (
                <Link key={result._id} href={getResultLink(result)} className="block p-4 hover:bg-gray-100 border-b border-gray-200 last:border-b-0">
                  <p className="text-sm text-gray-500">{result._type}</p>
                  <p className="font-semibold">{result.title}</p>
                  {result.excerpt && <p className="text-sm text-gray-600 line-clamp-2">{result.excerpt}</p>}
                </Link>
              ))}
              <div className="p-4 text-center border-t border-gray-200">
                <Link href={`/search?q=${searchTerm}`} className="text-blue-600 hover:underline">
                  View all results
                </Link>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}

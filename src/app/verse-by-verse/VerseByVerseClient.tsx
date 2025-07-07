'use client';

import { useState } from 'react';
import Link from 'next/link';

interface VerseByVerseEntry {
  id: string;
  title: string;
  book: string;
  passage?: string;
  slug: string;
  content?: string;
  published_at?: string;
  created_at: string;
  youtube_url?: string;
  seo_description?: string;
}

interface VerseByVerseClientProps {
  entries: VerseByVerseEntry[];
}

export default function VerseByVerseClient({ entries }: VerseByVerseClientProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (entryId: string, videoId: string) => {
    setImageErrors(prev => new Set(prev).add(entryId));
    const img = document.querySelector(`img[data-entry-id="${entryId}"]`) as HTMLImageElement;
    if (img && !img.src.includes('hqdefault')) {
      img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  };

  return (
    <>
      {entries.map((entry) => (
        <article
          key={entry.id}
          className="card-elevated p-0 group hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* YouTube Thumbnail */}
          {entry.youtube_url && (
            <div className="aspect-video w-full bg-gray-100 relative">
              <img
                data-entry-id={entry.id}
                src={(() => {
                  const url = entry.youtube_url;
                  let videoId = '';
                  if (url.includes('youtube.com/watch?v=')) {
                    videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                  } else if (url.includes('youtu.be/')) {
                    videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                  }
                  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
                })()}
                alt={entry.title}
                className="w-full h-full object-cover"
                onError={() => {
                  const url = entry.youtube_url;
                  if (url) {
                    let videoId = '';
                    if (url.includes('youtube.com/watch?v=')) {
                      videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                    } else if (url.includes('youtu.be/')) {
                      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                    }
                    handleImageError(entry.id, videoId);
                  }
                }}
              />

            </div>
          )}
          
          <div className="p-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                {entry.title}
              </h2>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                {entry.seo_description && entry.seo_description.length > 150
                  ? `${entry.seo_description.substring(0, 150)}...`
                  : entry.seo_description || 'Study the Word of God verse by verse.'}
              </p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="font-body text-sm text-gray-500">
                {entry.book} {entry.passage && `• ${entry.passage}`}
              </span>
              <time className="font-body text-sm text-gray-500">
                {entry.published_at
                  ? new Date(entry.published_at).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'short',
                      }
                    )
                  : new Date(entry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
              </time>
            </div>

            <Link
              href={`/verse-by-verse/${entry.book.toLowerCase()}/${entry.slug}`}
              className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors group"
            >
              Study Passage
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </>
  );
}
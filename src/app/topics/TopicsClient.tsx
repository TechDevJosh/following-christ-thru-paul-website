'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  description: string;
  seo_description?: string;
  slug: string;
  tags?: string;
  published_at: string;
  created_at: string;
  youtube_url?: string;
  content?: string;
  series?: string;
  series_order?: number;
  featured?: boolean;
}

interface TopicsClientProps {
  topics: Topic[];
}

export default function TopicsClient({ topics }: TopicsClientProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (topicId: string, videoId: string) => {
    setImageErrors(prev => new Set(prev).add(topicId));
    // Try fallback image
    const img = document.querySelector(`img[data-topic-id="${topicId}"]`) as HTMLImageElement;
    if (img && !img.src.includes('hqdefault')) {
      img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  };

  return (
    <>
      {topics.map((topic) => (
        <article key={topic.id} className="card-elevated p-0 group hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          {/* YouTube Thumbnail */}
          {topic.youtube_url && (
            <div className="aspect-video w-full bg-gray-100 relative">
              <img
                data-topic-id={topic.id}
                src={(() => {
                  const url = topic.youtube_url;
                  let videoId = '';
                  if (url.includes('youtube.com/watch?v=')) {
                    videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                  } else if (url.includes('youtu.be/')) {
                    videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                  }
                  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
                })()}
                alt={topic.title}
                className="w-full h-full object-cover"
                onError={() => {
                  const url = topic.youtube_url;
                  if (url) {
                    let videoId = '';
                    if (url.includes('youtube.com/watch?v=')) {
                      videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
                    } else if (url.includes('youtu.be/')) {
                      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                    }
                    handleImageError(topic.id, videoId);
                  }
                }}
              />

            </div>
          )}
          
          <div className="p-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                {topic.title}
              </h2>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                {topic.seo_description && topic.seo_description.length > 150 
                  ? `${topic.seo_description.substring(0, 150)}...` 
                  : topic.seo_description || topic.description}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              {topic.series ? (
                <span className="font-body text-sm text-blue-600 font-medium">
                  {topic.series} {topic.series_order && `#${topic.series_order}`}
                </span>
              ) : (
                <span></span>
              )}
              <time className="font-body text-sm text-gray-500">
                {new Date(topic.published_at || topic.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short'
                })}
              </time>
            </div>

            {topic.tags && typeof topic.tags === 'string' && (
              <div className="flex flex-wrap gap-2 mb-6">
                {topic.tags.split(',').map((tag, index) => (
                  <span 
                    key={`${topic.id}-tag-${index}`}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-body font-medium text-xs"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            <Link 
              href={`/topics/${topic.slug}`}
              className="inline-flex items-center font-body text-blue-700 hover:text-blue-800 font-semibold transition-colors group"
            >
              Explore Topic
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </>
  );
}
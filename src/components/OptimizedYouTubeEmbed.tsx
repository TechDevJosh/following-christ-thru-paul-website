"use client";

import { useState } from 'react';
import Image from 'next/image';

interface OptimizedYouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function OptimizedYouTubeEmbed({ videoId, title, className = "" }: OptimizedYouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  const handlePlay = () => {
    setIsLoaded(true);
  };

  if (!isLoaded) {
    return (
      <div className={`relative cursor-pointer group ${className}`}>
        <Image
          src={thumbnailUrl}
          alt={`${title} - Video Thumbnail`}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg">
          <button
            onClick={handlePlay}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transform group-hover:scale-110 transition-all duration-200 shadow-lg"
            aria-label={`Play ${title}`}
          >
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
        
        {/* YouTube branding */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
          YouTube
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={`w-full h-full rounded-lg ${className}`}
      loading="lazy"
    />
  );
}
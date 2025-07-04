"use client";

import { useState, useEffect } from 'react';

const taglines = [
  "A KJV Bible-believing ministry committed to serious Bible study, saintly edification, and sound doctrinal teaching.",
  "A Pauline dispensationalist platform devoted to rightly dividing the word of truth.",
  "Reaching the regions beyond by redeeming modern marketplaces like the internet.",
  "A resource hub for biblical knowledge—learning the Book as God intended.",
  "A ministry-first platform glorifying God through forums, fellowship, and edifying conversation."
];

export default function TaglineRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % taglines.length);
        setIsTransitioning(false);
      }, 1000);
    }, 7000);

    return () => clearInterval(interval);
  }, [nextIndex]);

  return (
    <div className="relative h-16 overflow-hidden" aria-live="polite">
      <p
        className={`absolute top-0 left-0 w-full text-center font-body text-xl md:text-2xl text-gray-600 leading-relaxed px-4 transition-all duration-1000 ease-in-out transform ${
          isTransitioning ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        {taglines[currentIndex]}
      </p>
      <p
        className={`absolute top-0 left-0 w-full text-center font-body text-xl md:text-2xl text-gray-600 leading-relaxed px-4 transition-all duration-1000 ease-in-out transform ${
          isTransitioning ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {taglines[nextIndex]}
      </p>
    </div>
  );
}
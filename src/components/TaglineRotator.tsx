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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="min-h-[6rem] sm:min-h-[5rem] w-full max-w-4xl mx-auto px-4">
        <p className="text-center font-body text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
          {taglines[0]}
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[6rem] sm:min-h-[5rem] w-full max-w-4xl mx-auto overflow-hidden px-4" aria-live="polite">
      <p 
        key={currentIndex}
        className="text-center font-body text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed transition-opacity duration-1000 ease-in-out"
      >
        {taglines[currentIndex]}
      </p>
    </div>
  );
}
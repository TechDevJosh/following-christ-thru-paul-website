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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        setIsVisible(true);
      }, 350);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden h-20 sm:h-16 md:h-12 flex items-center justify-center">
      <p
        key={currentIndex}
        className={`font-body text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-center px-4 transition-all duration-700 transform ${
          isVisible 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-[-100%] opacity-0'
        }`}
        aria-live="polite"
      >
        {taglines[currentIndex]}
      </p>
    </div>
  );
}
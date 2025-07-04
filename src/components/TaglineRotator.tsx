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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[5rem] w-full max-w-4xl mx-auto overflow-hidden" aria-live="polite">
      {taglines.map((tagline, index) => (
        <p
          key={index}
          className={`absolute top-0 left-0 w-full min-w-full text-center font-body text-xl md:text-2xl text-gray-600 leading-relaxed px-4 whitespace-normal break-words transition-all duration-1000 ease-in-out transform ${
            index === currentIndex
              ? 'translate-x-0 opacity-100'
              : index === (currentIndex - 1 + taglines.length) % taglines.length
              ? '-translate-x-full opacity-0'
              : 'translate-x-full opacity-0'
          }`}
        >
          {tagline}
        </p>
      ))}
    </div>
  );
}
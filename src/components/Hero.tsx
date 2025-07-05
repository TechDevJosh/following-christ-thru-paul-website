import Link from 'next/link';
import TaglineRotator from './TaglineRotator';

export default function Hero() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Scripture Reference */}
        <p className="text-sm sm:text-base italic text-center text-gray-600 dark:text-gray-400">
          "To make all men see what is the fellowship of the mystery" - Ephesians 3:9
        </p>

        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png" 
            alt="FCTP Logo" 
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full shadow-lg"
          />
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          <span className="block text-gray-900 dark:text-white">Following Christ</span>
          <span className="block text-blue-600 dark:text-blue-400">Thru Paul</span>
        </h1>

        {/* Dynamic Tagline Rotator */}
        <div className="w-full">
          <TaglineRotator />
        </div>

        {/* Intro Paragraphs */}
        <div className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto space-y-4">
          <p>
            A <span className="font-semibold">KJV Bible-believing ministry</span> committed to serious Bible study, 
            saintly edification, and sound doctrinal teaching.
          </p>
          <p>
            Exploring the depths of Pauline dispensational truth with reverence, precision, 
            and unwavering commitment to Scripture.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/verse-by-verse"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Start Here
          </Link>
          <Link
            href="/school"
            className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
          >
            Register Now
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="pt-12 border-t border-gray-200 dark:border-gray-700 w-full max-w-2xl">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">We Are Strong Proponents of</p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-400 dark:text-gray-500">
            <span className="text-xs font-medium whitespace-nowrap">AUTHORIZED VERSION (KJV)</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full hidden sm:block"></span>
            <span className="text-xs font-medium whitespace-nowrap">PAULINE DISPENSATIONALISM</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full hidden sm:block"></span>
            <span className="text-xs font-medium whitespace-nowrap">SUBMISSION TO A LOCAL BIBLE-BELIEVING CHURCH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="py-12 px-6 bg-white" role="banner" aria-labelledby="hero-title">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Scripture Reference */}
        <p className="text-sm italic text-gray-600 mb-2">
          "To make all men see what is the fellowship of the mystery" – Ephesians 3:9
        </p>

        {/* Logo + Title Combined - Mobile: Stacked, Desktop: Side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4">
          <Image 
            src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png" 
            alt="Following Christ Thru Paul Ministry Logo" 
            width={112}
            height={112}
            priority
            loading="eager"
            className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full shadow-lg flex-shrink-0"
            sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 112px"
          />
          <h1 id="hero-title" className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-center sm:text-left">
            <span className="block text-gray-900">Following Christ</span>
            <span className="block text-blue-700">Thru Paul</span>
          </h1>
        </div>

        {/* Primary Statement */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed mb-3">
          A <strong className="font-semibold">KJV Bible-believing ministry</strong> committed to serious Bible study, saintly edification, and sound doctrinal teaching.
        </p>

        {/* Doctrinal Focus */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed mb-6">
          Exploring the depths of Pauline dispensational truth with reverence, precision, and unwavering commitment to Scripture.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/verse-by-verse"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-describedby="start-here-desc"
          >
            Start Here
          </Link>
          <span id="start-here-desc" className="sr-only">Begin your Bible study journey with our verse-by-verse teachings</span>
          <Link
            href="/school"
            className="px-6 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg text-lg font-medium shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-describedby="register-desc"
          >
            Register Now
          </Link>
          <span id="register-desc" className="sr-only">Register for our Bible school program</span>
        </div>

        {/* We Are Strong Proponents Of Section */}
        <div className="pt-6 border-t border-gray-200 w-full max-w-3xl">
          <p className="text-sm text-gray-500 mb-4">We Are Strong Proponents of</p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600">
            <span className="text-xs font-medium whitespace-nowrap">AUTHORIZED VERSION (KJV)</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
            <span className="text-xs font-medium whitespace-nowrap">PAULINE DISPENSATIONALISM</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
            <span className="text-xs font-medium whitespace-nowrap">SUBMISSION TO A LOCAL BIBLE-BELIEVING CHURCH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
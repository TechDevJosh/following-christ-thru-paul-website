import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Scripture Reference */}
        <p className="text-base sm:text-lg italic text-center text-gray-600">
          "To make all men see what is the fellowship of the mystery" – Ephesians 3:9
        </p>

        {/* Logo + Title */}
        <div className="flex flex-col items-center space-y-4">
          <img 
            src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png" 
            alt="FCTP Logo" 
            width={100} 
            height={100}
            className="rounded-full shadow-lg"
          />
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-tight">
            <span className="block text-gray-900">Following Christ</span>
            <span className="block text-blue-700">Thru Paul</span>
          </h1>
        </div>

        {/* Primary Statement */}
        <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl leading-relaxed">
          A <strong className="font-semibold">KJV Bible-believing ministry</strong> committed to serious Bible study, saintly edification, and sound doctrinal teaching.
        </p>

        {/* Doctrinal Focus */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-loose">
          Exploring the depths of Pauline dispensational truth with reverence, precision, and unwavering commitment to Scripture.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/verse-by-verse"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-medium shadow-lg transition-colors"
          >
            Start Here
          </Link>
          <Link
            href="/school"
            className="px-8 py-4 border border-gray-300 bg-white text-gray-900 rounded-xl text-xl font-medium shadow-md hover:bg-gray-50 transition-colors"
          >
            Register Now
          </Link>
        </div>

        {/* We Are Strong Proponents Of Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 w-full max-w-3xl">
          <p className="text-base text-gray-500 mb-6">We Are Strong Proponents of</p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-600">
            <span className="text-sm font-medium whitespace-nowrap">AUTHORIZED VERSION (KJV)</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
            <span className="text-sm font-medium whitespace-nowrap">PAULINE DISPENSATIONALISM</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
            <span className="text-sm font-medium whitespace-nowrap">SUBMISSION TO A LOCAL BIBLE-BELIEVING CHURCH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
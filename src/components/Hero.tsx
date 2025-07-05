import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#0e1a2b] to-[#141b2d] text-white py-20 px-6">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Logo + Title */}
        <div className="flex flex-col items-center space-y-3">
          <img 
            src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png" 
            alt="FCTP Logo" 
            width={80} 
            height={80}
            className="rounded-full"
          />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="block text-white">Following Christ</span>
            <span className="block text-blue-400">Thru Paul</span>
          </h1>
        </div>

        {/* Scripture Reference */}
        <p className="text-sm italic text-blue-300 max-w-xl">
          "To make all men see what is the fellowship of the mystery" – Ephesians 3:9
        </p>

        {/* Primary Statement */}
        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
          A <strong className="text-white font-semibold">KJV Bible-believing ministry</strong> committed to serious Bible study, saintly edification, and sound doctrinal teaching.
        </p>

        {/* Doctrinal Focus */}
        <p className="text-base text-gray-400 max-w-xl leading-loose">
          Exploring the depths of Pauline dispensational truth with reverence, precision, and unwavering commitment to Scripture.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/verse-by-verse"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium shadow transition-colors"
          >
            Start Here
          </Link>
          <Link
            href="/school"
            className="px-6 py-3 border border-gray-500 bg-transparent text-white rounded-xl text-lg font-medium shadow-sm hover:bg-white/10 transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}
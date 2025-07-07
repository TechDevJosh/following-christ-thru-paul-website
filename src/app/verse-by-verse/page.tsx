import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

export const revalidate = 1800; // 30 minutes

export const metadata: Metadata = {
  title: 'Verse by Verse Studies | Following Christ Thru Paul',
  description:
    'Explore in-depth verse by verse biblical studies through the teachings of the Apostle Paul.',
};

interface VerseByVerseEntry {
  id: string;
  book: string;
}

export default async function VerseByVersePage() {
  let verseByVerseEntries: VerseByVerseEntry[] = [];

  try {
    const { data, error } = await supabase
      .from('verse_by_verse')
      .select('book')
      .order('book', { ascending: true });
    
    if (error) throw error;
    verseByVerseEntries = data || [];
  } catch (error) {
    console.error('Error fetching verse by verse entries:', error);
  }

  const books = [...new Set(verseByVerseEntries.map(entry => entry.book))];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Verse by Verse Studies
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Deep, systematic study through the Word of God, verse by verse
          </p>
          <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
            Following the teachings and example of the Apostle Paul in careful
            exposition of Scripture.
          </p>
        </div>
      </section>

      {/* Studies Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {books.map(book => (
              <Link key={book} href={`/verse-by-verse/${book.toLowerCase().replace(/ /g, '-')}`} className="card-elevated p-4 block hover:shadow-lg transition-shadow duration-300 rounded-lg">
                <h2 className="font-heading text-2xl text-gray-900 mb-2">{book}</h2>
              </Link>
            ))}
          </div>

          {books.length === 0 && (
            <div className="mt-16 text-center p-12 bg-gray-50 rounded-xl">
              <h3 className="font-heading text-3xl text-gray-900 mb-4">
                Studies Coming Soon
              </h3>
              <p className="font-body text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We&apos;re preparing verse by verse studies through
                Paul&apos;s epistles and other books of the Bible.
              </p>
              <Link href="/newsletter" className="btn-primary">
                Subscribe for Updates
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png"
                  alt="FCTP Logo"
                  className="h-10 w-10 rounded-full"
                />
                <h3 className="font-heading text-2xl text-white">
                  Following Christ Thru Paul
                </h3>
              </div>
              <p className="font-body text-gray-300 mb-6 leading-relaxed">
                "To make all men see what is the fellowship of the mystery"
                (Eph. 3:9)
              </p>
              <p className="font-body text-gray-400 text-sm">
                A KJV Bible-believing ministry dedicated to serious Bible study
                and doctrinal teaching.
              </p>
            </div>

            <div>
              <h4 className="font-subheading text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li>
                  <Link
                    href="/verse-by-verse"
                    className="hover:text-white transition-colors"
                  >
                    Verse by Verse
                  </Link>
                </li>
                <li>
                  <Link
                    href="/topics"
                    className="hover:text-white transition-colors"
                  >
                    Topics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="hover:text-white transition-colors"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ask"
                    className="hover:text-white transition-colors"
                  >
                    Ask Questions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-subheading text-lg mb-4">Connect</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li>
                  <Link
                    href="/newsletter"
                    className="hover:text-white transition-colors"
                  >
                    Subscribe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/connect/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/connect/support"
                    className="hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="font-body text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Following Christ Thru Paul. All
              Rights Reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="/terms-of-service"
                className="font-body text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="font-body text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
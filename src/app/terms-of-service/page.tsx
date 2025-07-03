import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "Terms of Service | Following Christ Thru Paul",
  description: "Terms of Service for Following Christ Thru Paul ministry website and resources.",
  robots: "noindex, nofollow",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <main className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="font-body text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                By accessing and using the Following Christ Thru Paul website ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">2. Use License</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials on Following Christ Thru Paul&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• modify or copy the materials</li>
                <li className="mb-2">• use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li className="mb-2">• attempt to decompile or reverse engineer any software contained on the website</li>
                <li className="mb-2">• remove any copyright or other proprietary notations from the materials</li>
              </ul>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by Following Christ Thru Paul at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">3. Content and Doctrine</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Following Christ Thru Paul is a Bible-believing ministry that holds to the King James Version (KJV) of the Bible and dispensational theology. All content provided is based on our understanding of Scripture from this perspective. Users are encouraged to study the Scriptures for themselves and compare all teaching with the Word of God.
              </p>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                The materials on this website are provided for educational and spiritual growth purposes. They are not intended to replace personal Bible study or pastoral counsel.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">4. User Conduct</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                When using our Service, you agree to:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• Use the Service in a manner consistent with Christian principles</li>
                <li className="mb-2">• Respect the doctrinal position of this ministry</li>
                <li className="mb-2">• Not post or transmit any content that is offensive, inappropriate, or contrary to biblical principles</li>
                <li className="mb-2">• Not use the Service for any unlawful purpose</li>
                <li className="mb-2">• Not attempt to gain unauthorized access to any portion of the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">5. Questions and Submissions</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Questions submitted through our &quot;Ask&quot; feature may be answered publicly on the website. While we respect requests for anonymity, we reserve the right to use submitted questions for educational purposes. Personal information will not be shared without explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">6. Donations and Support</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Following Christ Thru Paul operates as a ministry supported by voluntary donations. All donations are used for ministry purposes including website maintenance, resource development, and spreading the Gospel. Donations are not tax-deductible unless specifically noted.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">7. Disclaimer</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                The materials on Following Christ Thru Paul&apos;s website are provided on an &apos;as is&apos; basis. Following Christ Thru Paul makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Further, Following Christ Thru Paul does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">8. Limitations</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                In no event shall Following Christ Thru Paul or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Following Christ Thru Paul&apos;s website, even if Following Christ Thru Paul or a Following Christ Thru Paul authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">9. Accuracy of Materials</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                The materials appearing on Following Christ Thru Paul&apos;s website could include technical, typographical, or photographic errors. Following Christ Thru Paul does not warrant that any of the materials on its website are accurate, complete, or current. Following Christ Thru Paul may make changes to the materials contained on its website at any time without notice. However, Following Christ Thru Paul does not make any commitment to update the materials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">10. Links</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Following Christ Thru Paul has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Following Christ Thru Paul of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">11. Modifications</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Following Christ Thru Paul may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">12. Governing Law</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of the Republic of the Philippines and you irrevocably submit to the exclusive jurisdiction of the courts in the Philippines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">13. Contact Information</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us through our <Link href="/connect/contact" className="text-blue-700 hover:text-blue-800 underline">contact page</Link>.
              </p>
            </section>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <p className="font-body text-blue-800 text-center">
                "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." - 2 Timothy 2:15 (KJV)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h3 className="font-heading text-2xl mb-4">Following Christ Thru Paul</h3>
              <p className="font-body text-gray-300 mb-6 leading-relaxed">
                "To make all men see what is the fellowship of the mystery" (Eph. 3:9)
              </p>
              <p className="font-body text-gray-400 text-sm">
                A KJV Bible-believing ministry dedicated to serious Bible study and doctrinal teaching.
              </p>
            </div>
            
            <div>
              <h4 className="font-subheading text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li><Link href="/verse-by-verse" className="hover:text-white transition-colors">Verse by Verse</Link></li>
                <li><Link href="/topics" className="hover:text-white transition-colors">Topics</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="/ask" className="hover:text-white transition-colors">Ask Questions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-subheading text-lg mb-4">Connect</h4>
              <ul className="space-y-2 font-body text-gray-300">
                <li><Link href="/connect/subscribe" className="hover:text-white transition-colors">Subscribe</Link></li>
                <li><Link href="/connect/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/connect/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="font-body text-gray-400 text-sm">&copy; {new Date().getFullYear()} Following Christ Thru Paul. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/terms-of-service" className="font-body text-gray-400 hover:text-white transition-colors text-sm">Terms</Link>
              <Link href="/privacy-policy" className="font-body text-gray-400 hover:text-white transition-colors text-sm">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
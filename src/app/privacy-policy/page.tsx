import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "Privacy Policy | Following Christ Thru Paul",
  description: "Privacy Policy for Following Christ Thru Paul ministry website and how we handle your personal information.",
  robots: "noindex, nofollow",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <main className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="font-body text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">1. Introduction</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Following Christ Thru Paul (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="font-subheading text-xl text-gray-900 mb-3">Personal Data</h3>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                We may collect personally identifiable information that you voluntarily provide to us when you:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• Subscribe to our newsletter or updates</li>
                <li className="mb-2">• Submit questions through our "Ask" feature</li>
                <li className="mb-2">• Contact us through our contact forms</li>
                <li className="mb-2">• Make donations or provide support</li>
                <li className="mb-2">• Participate in interactive features of our website</li>
              </ul>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                This information may include your name, email address, and any other information you choose to provide.
              </p>

              <h3 className="font-subheading text-xl text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information about your device and usage patterns, including:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• IP address and location data</li>
                <li className="mb-2">• Browser type and version</li>
                <li className="mb-2">• Operating system</li>
                <li className="mb-2">• Pages visited and time spent on pages</li>
                <li className="mb-2">• Referring website addresses</li>
                <li className="mb-2">• Device identifiers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• To provide and maintain our website and services</li>
                <li className="mb-2">• To send you newsletters, updates, and ministry-related communications</li>
                <li className="mb-2">• To respond to your questions and provide customer support</li>
                <li className="mb-2">• To improve our website and user experience</li>
                <li className="mb-2">• To analyze website usage and trends</li>
                <li className="mb-2">• To comply with legal obligations</li>
                <li className="mb-2">• To protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">4. Sharing of Your Information</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• With your explicit consent</li>
                <li className="mb-2">• To service providers who assist us in operating our website (e.g., email services, hosting providers)</li>
                <li className="mb-2">• When required by law or to protect our rights</li>
                <li className="mb-2">• In connection with a business transfer or merger</li>
              </ul>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Questions submitted through our &quot;Ask&quot; feature may be published on our website, but we will maintain your anonymity unless you specifically request attribution.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• Remember your preferences</li>
                <li className="mb-2">• Analyze website traffic and usage</li>
                <li className="mb-2">• Improve website functionality</li>
                <li className="mb-2">• Provide personalized content</li>
              </ul>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">6. Third-Party Services</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Our website may integrate with third-party services, including:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• YouTube (for video content)</li>
                <li className="mb-2">• Email service providers (for newsletters)</li>
                <li className="mb-2">• Payment processors (for donations)</li>
                <li className="mb-2">• Analytics services (for website statistics)</li>
                <li className="mb-2">• Content delivery networks</li>
              </ul>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">7. Data Security</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                We regularly review and update our security practices to ensure the protection of your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">8. Data Retention</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">9. Your Privacy Rights</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• Access: Request information about the personal data we hold about you</li>
                <li className="mb-2">• Correction: Request correction of inaccurate or incomplete data</li>
                <li className="mb-2">• Deletion: Request deletion of your personal data</li>
                <li className="mb-2">• Portability: Request a copy of your data in a portable format</li>
                <li className="mb-2">• Objection: Object to certain processing of your data</li>
                <li className="mb-2">• Withdrawal: Withdraw consent for data processing</li>
              </ul>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">11. International Data Transfers</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Following Christ Thru Paul is based in the Philippines. Your information may be transferred to and processed in countries other than your own, including the Philippines. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">13. Contact Us</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• Through our <Link href="/connect/contact" className="text-blue-700 hover:text-blue-800 underline">contact page</Link></li>
                <li className="mb-2">• By email: [Your ministry email address]</li>
                <li className="mb-2">• By mail: [Your ministry mailing address]</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">14. Philippine Data Privacy Act Compliance</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                As a ministry based in the Philippines, we comply with the Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules and regulations. We are committed to protecting your personal information in accordance with Philippine data protection laws.
              </p>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                Under Philippine law, you have rights regarding your personal data, including the right to be informed, access, rectification, erasure, and data portability, subject to certain limitations provided by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-heading text-2xl text-gray-900 mb-4">15. GDPR Compliance</h2>
              <p className="font-body text-gray-700 leading-relaxed mb-4">
                If you are a resident of the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR). We process your personal data based on the following legal grounds:
              </p>
              <ul className="font-body text-gray-700 leading-relaxed mb-4 ml-6">
                <li className="mb-2">• Consent: When you have given clear consent for processing</li>
                <li className="mb-2">• Legitimate interests: For ministry operations and website improvement</li>
                <li className="mb-2">• Legal obligation: When required by law</li>
              </ul>
            </section>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <p className="font-body text-blue-800 text-center">
                "The simple believeth every word: but the prudent man looketh well to his going." - Proverbs 14:15 (KJV)
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
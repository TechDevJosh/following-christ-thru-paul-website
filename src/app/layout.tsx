import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import SkipLink from "@/components/SkipLink";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';


const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Following Christ Thru Paul | KJV Bible Ministry",
  description: "A KJV Bible-believing ministry for serious Bible study, community engagement, and doctrinal teaching. Exploring Pauline dispensational truth with reverence and depth.",
  keywords: "KJV Bible, Paul's epistles, dispensational theology, Bible study, Christian ministry",
  authors: [{ name: "Following Christ Thru Paul Ministry" }],
  openGraph: {
    title: "Following Christ Thru Paul | KJV Bible Ministry",
    description: "A KJV Bible-believing ministry for serious Bible study and doctrinal teaching.",
    type: "website",
    url: "https://followingchristthrupaul.com",
    siteName: "Following Christ Thru Paul",
    images: [
      {
        url: "https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png",
        width: 1200,
        height: 630,
        alt: "Following Christ Thru Paul Ministry Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Following Christ Thru Paul | KJV Bible Ministry",
    description: "A KJV Bible-believing ministry for serious Bible study and doctrinal teaching.",
    images: ["https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png"],
  },
  alternates: {
    canonical: "https://followingchristthrupaul.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Following Christ Thru Paul",
    "url": "https://followingchristthrupaul.com",
    "description": "A KJV Bible-believing ministry for serious Bible study and doctrinal teaching.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://followingchristthrupaul.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Following Christ Thru Paul",
    "url": "https://followingchristthrupaul.com",
    "logo": "https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png",
    "description": "A KJV Bible-believing ministry committed to serious Bible study, saintly edification, and sound doctrinal teaching through Pauline dispensational truth.",
    "sameAs": [
      "https://facebook.com/FollowingChristThruPaul",
      "https://www.youtube.com/@FollowingChristThruPaul"
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png" 
          as="image"
          fetchPriority="high"
        />
        
        {/* Optimized favicons */}
        <link rel="icon" href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%2048X48.png?v=2" />
        <link rel="icon" type="image/png" sizes="48x48" href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%2048X48.png?v=2" />
        <link rel="icon" type="image/png" sizes="66x66" href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%2066X66.png?v=2" />
        <link rel="icon" type="image/png" sizes="84x84" href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%2084X84.png?v=2" />
        <link rel="icon" type="image/png" sizes="120x120" href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%20120X120.png?v=2" />
        <link rel="apple-touch-icon" sizes="120x120" href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%20120X120.png?v=2" />
        <link rel="shortcut icon" href="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%2048X48.png?v=2" />
        
        {/* Viewport and theme */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="color-scheme" content="light" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        
        <Script id="google-tag-manager" strategy="afterInteractive" defer>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PQ85MDM6');`}
        </Script>
      </head>
      <body className={`${inter.variable} ${crimsonText.variable} font-sans antialiased`}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQ85MDM6"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
            title="Google Tag Manager"
          />
        </noscript>
        <SkipLink />
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}

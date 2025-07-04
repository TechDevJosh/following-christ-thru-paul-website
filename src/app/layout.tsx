import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PQ85MDM6');`}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J7YNKRKHSP"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J7YNKRKHSP');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${crimsonText.variable} font-sans antialiased`}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQ85MDM6"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}

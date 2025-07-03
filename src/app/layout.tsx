import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

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
      <body className={`${inter.variable} ${crimsonText.variable} font-sans antialiased`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}

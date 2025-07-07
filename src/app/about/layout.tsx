import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Following Christ Thru Paul",
  description: "Learn about our KJV Bible-believing ministry, our heart for studying God's Word, and our commitment to Pauline dispensational truth.",
  openGraph: {
    title: "About Us | Following Christ Thru Paul",
    description: "Learn about our KJV Bible-believing ministry and our commitment to Pauline dispensational truth.",
    type: "website",
    url: "https://followingchristthrupaul.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Following Christ Thru Paul",
    description: "Learn about our KJV Bible-believing ministry and our commitment to Pauline dispensational truth.",
  },
  alternates: {
    canonical: "https://followingchristthrupaul.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

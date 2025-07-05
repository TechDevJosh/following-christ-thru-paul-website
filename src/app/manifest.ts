import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Following Christ Thru Paul',
    short_name: 'FCTP',
    description: 'A KJV Bible-believing ministry for serious Bible study and doctrinal teaching',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['education', 'lifestyle', 'books'],
    icons: [
      {
        src: 'https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%2048X48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%2066X66.png',
        sizes: '66x66',
        type: 'image/png',
      },
      {
        src: 'https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%2084X84.png',
        sizes: '84x84',
        type: 'image/png',
      },
      {
        src: 'https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20FAVICON%20120X120.png',
        sizes: '120x120',
        type: 'image/png',
      },
    ],
  }
}
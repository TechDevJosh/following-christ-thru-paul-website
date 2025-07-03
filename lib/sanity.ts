import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '', // Replace with your Sanity Project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',     // Replace with your Sanity Dataset
  apiVersion: '2023-05-03', // Use a consistent API version
  useCdn: true, // `false` if you want to ensure fresh data
});

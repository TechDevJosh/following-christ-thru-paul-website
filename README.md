# Following Christ Thru Paul - Ministry Website

A KJV Bible-believing ministry platform for serious Bible study, community engagement, and doctrinal teaching.

## Ministry Mission

"To make all men see what is the fellowship of the mystery" - Ephesians 3:9

## Technology Stack

- Frontend: Next.js 15 with TypeScript
- Styling: Tailwind CSS with custom design system
- CMS: Sanity.io for content management
- File Storage: Cloudflare R2 for resources
- Email: Resend for contact forms
- Deployment: Vercel with GitHub Actions CI/CD

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your actual values in .env.local

# Start development server
npm run dev
```

Open http://localhost:3000 to view the website.
Access the CMS at http://localhost:3000/studio.

## Features

- Professional UI/UX with custom typography
- Complete navigation with zero 404 errors
- Content management via Sanity Studio
- Authentication system for CMS access
- Cookie banner (GDPR compliant)
- Responsive design for all devices
- SEO optimized with meta tags and sitemap
- CI/CD pipeline with automated deployment

## Content Sections

- Home: Hero section with ministry introduction
- Verse by Verse: Systematic Bible studies
- Topics: Biblical teachings by topic
- Resources: Study materials and downloads
- Ask: Q&A submission and browsing
- Connect: Subscribe, contact, and support

## Deployment

Automatic deployment via GitHub Actions on push to main branch.

## Repository

https://github.com/TechDevJosh/following-christ-thru-paul-website

"For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth" - Romans 1:16
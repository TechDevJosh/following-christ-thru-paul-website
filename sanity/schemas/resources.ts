import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'resources',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'PDF Document', value: 'pdf' },
          { title: 'Audio', value: 'audio' },
          { title: 'Video', value: 'video' },
          { title: 'External Link', value: 'link' },
          { title: 'Image/Chart', value: 'image' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Study Guides', value: 'study-guides' },
          { title: 'Audio Series', value: 'audio-series' },
          { title: 'Video Teachings', value: 'video-teachings' },
          { title: 'Charts & Diagrams', value: 'charts-diagrams' },
          { title: 'Apologetics', value: 'apologetics' },
          { title: 'Reading Lists', value: 'reading-lists' },
          { title: 'Devotionals', value: 'devotionals' },
          { title: 'Reference Materials', value: 'reference' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File Upload',
      type: 'file',
      description: 'Upload PDF, audio, or other file types',
      hidden: ({ document }) => document?.type === 'link' || document?.type === 'video',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'For external links or video URLs',
      hidden: ({ document }) => document?.type === 'pdf' || document?.type === 'audio' || document?.type === 'image',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'YouTube video URL for video resources',
      hidden: ({ document }) => document?.type !== 'video',
    }),
    defineField({
      name: 'fileSize',
      title: 'File Size',
      type: 'string',
      description: 'e.g., "2.4 MB" - for downloadable files',
      hidden: ({ document }) => document?.type === 'link' || document?.type === 'video',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "45 minutes" or "3h 30m" - for audio/video',
      hidden: ({ document }) => document?.type === 'pdf' || document?.type === 'link' || document?.type === 'image',
    }),
    defineField({
      name: 'content',
      title: 'Additional Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optional additional content or description',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Thumbnail for the resource',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      description: 'Mark as featured to highlight on resources page',
      initialValue: false,
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      description: 'Track download statistics',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'relatedTopics',
      title: 'Related Topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topics' }],
        },
      ],
    }),
    defineField({
      name: 'relatedSermons',
      title: 'Related Sermons',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'verseByVerse' }],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines (optional)',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Description for search engines (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
      type: 'type',
    },
    prepare(selection) {
      const { title, subtitle, media, type } = selection;
      return {
        title,
        subtitle: `${type?.toUpperCase()} - ${subtitle}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Most Downloaded',
      name: 'downloadCountDesc',
      by: [{ field: 'downloadCount', direction: 'desc' }],
    },
  ],
});
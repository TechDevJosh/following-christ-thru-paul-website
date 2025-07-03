import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ask',
  title: 'Q&A',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortAnswer',
      title: 'Short Answer',
      type: 'text',
      description: 'Brief summary for previews and search results',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Salvation', value: 'salvation' },
          { title: 'Dispensations', value: 'dispensations' },
          { title: 'Church Doctrine', value: 'church-doctrine' },
          { title: 'Bible Versions', value: 'bible-versions' },
          { title: 'Prophecy', value: 'prophecy' },
          { title: 'Christian Living', value: 'christian-living' },
          { title: 'Apologetics', value: 'apologetics' },
          { title: 'Paul\'s Epistles', value: 'pauls-epistles' },
          { title: 'Law vs Grace', value: 'law-vs-grace' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
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
      name: 'relatedVerses',
      title: 'Related Bible Verses',
      type: 'array',
      of: [
        defineType({
          name: 'verse',
          title: 'Bible Verse',
          type: 'object',
          fields: [
            defineField({
              name: 'reference',
              title: 'Reference',
              type: 'string',
              description: 'e.g., "Romans 3:23"',
            }),
            defineField({
              name: 'text',
              title: 'Verse Text (KJV)',
              type: 'text',
            }),
          ],
        }),
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
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'resources' }],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Q&A',
      type: 'boolean',
      description: 'Mark as featured to highlight on ask page',
      initialValue: false,
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'submitterInfo',
      title: 'Submitter Information',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          description: 'Optional - for attribution if not anonymous',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'For follow-up (not displayed publicly)',
        }),
        defineField({
          name: 'anonymous',
          title: 'Anonymous Submission',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'Optional - city/state for context',
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Under Review', value: 'review' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      description: 'Track view statistics',
      initialValue: 0,
      readOnly: true,
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
      title: 'question',
      subtitle: 'category',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        title: title?.length > 60 ? `${title.substring(0, 60)}...` : title,
        subtitle: `${status?.toUpperCase()} - ${subtitle}`,
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
      title: 'Most Viewed',
      name: 'viewCountDesc',
      by: [{ field: 'viewCount', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});
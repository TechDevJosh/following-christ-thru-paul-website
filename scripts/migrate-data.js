require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Utility function to convert Portable Text to plain text
function convertPortableText(portableText) {
  if (!portableText || !Array.isArray(portableText)) return null;
  
  return portableText
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map(child => child.text || '')
          .join('');
      }
      return '';
    })
    .filter(text => text.trim())
    .join('\n\n');
}

// Utility function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function migrateVerseByVerse() {
  console.log('Migrating Verse by Verse sermons...');
  
  try {
    const { data: sanitySermons, error: fetchError } = await supabase
      .from('verse_by_verse_raw') // Assuming you have a raw table for import
      .select('*');

    if (fetchError) throw fetchError;

    console.log(`Found ${sanitySermons.length} sermons to migrate`);

    for (const sermon of sanitySermons) {
      const transformedSermon = {
        title: sermon.title,
        slug: sermon.slug?.current || generateSlug(sermon.title),
        book: sermon.book,
        passage: sermon.passage,
        youtube_url: sermon.youtubeUrl,
        content: convertPortableText(sermon.content),
        attachments: sermon.attachments || [],
        tags: sermon.tags || [],
        published_at: sermon.publishedAt || new Date().toISOString(),
      };

      const { error } = await supabase
        .from('verse_by_verse')
        .insert(transformedSermon);

      if (error) {
        console.error(`Error inserting sermon "${sermon.title}":`, error);
      } else {
        console.log(`✓ Migrated: ${sermon.title}`);
      }
    }
  } catch (error) {
    console.error('Error migrating verse by verse:', error);
  }
}

async function migrateTopics() {
  console.log('Migrating Topics...');
  
  try {
    const { data: sanityTopics, error: fetchError } = await supabase
      .from('topics_raw') // Assuming you have a raw table for import
      .select('*');

    if (fetchError) throw fetchError;

    console.log(`Found ${sanityTopics.length} topics to migrate`);

    for (const topic of sanityTopics) {
      const transformedTopic = {
        title: topic.title,
        slug: topic.slug?.current || generateSlug(topic.title),
        series: topic.series,
        series_order: topic.seriesOrder,
        description: topic.description,
        content: convertPortableText(topic.content),
        featured_image_url: topic.featuredImage?.asset?.url || null,
        youtube_url: topic.youtubeUrl,
        tags: topic.tags || [],
        featured: topic.featured || false,
        published_at: topic.publishedAt || new Date().toISOString(),
        seo_title: topic.seoTitle,
        seo_description: topic.seoDescription,
      };

      const { error } = await supabase
        .from('topics')
        .insert(transformedTopic);

      if (error) {
        console.error(`Error inserting topic "${topic.title}":`, error);
      } else {
        console.log(`✓ Migrated: ${topic.title}`);
      }
    }
  } catch (error) {
    console.error('Error migrating topics:', error);
  }
}

async function migrateResources() {
  console.log('Migrating Resources...');
  
  try {
    const { data: sanityResources, error: fetchError } = await supabase
      .from('resources_raw') // Assuming you have a raw table for import
      .select('*');

    if (fetchError) throw fetchError;

    console.log(`Found ${sanityResources.length} resources to migrate`);

    for (const resource of sanityResources) {
      const transformedResource = {
        title: resource.title,
        slug: resource.slug?.current || generateSlug(resource.title),
        description: resource.description,
        type: resource.type,
        category: resource.category,
        file_url: resource.file?.asset?.url || null,
        external_url: resource.externalUrl,
        youtube_url: resource.youtubeUrl,
        file_size: resource.fileSize,
        duration: resource.duration,
        content: convertPortableText(resource.content),
        thumbnail_url: resource.thumbnail?.asset?.url || null,
        tags: resource.tags || [],
        featured: resource.featured || false,
        download_count: resource.downloadCount || 0,
        published_at: resource.publishedAt || new Date().toISOString(),
        seo_title: resource.seoTitle,
        seo_description: resource.seoDescription,
      };

      const { error } = await supabase
        .from('resources')
        .insert(transformedResource);

      if (error) {
        console.error(`Error inserting resource "${resource.title}":`, error);
      } else {
        console.log(`✓ Migrated: ${resource.title}`);
      }
    }
  } catch (error) {
    console.error('Error migrating resources:', error);
  }
}

async function migrateAsk() {
  console.log('Migrating Q&A...');
  
  try {
    const { data: sanityAsk, error: fetchError } = await supabase
      .from('ask_raw') // Assuming you have a raw table for import
      .select('*');

    if (fetchError) throw fetchError;

    console.log(`Found ${sanityAsk.length} Q&A items to migrate`);

    for (const qa of sanityAsk) {
      const transformedQA = {
        question: qa.question,
        slug: qa.slug?.current || generateSlug(qa.question),
        answer: convertPortableText(qa.answer),
        short_answer: qa.shortAnswer,
        category: qa.category,
        tags: qa.tags || [],
        related_verses: qa.relatedVerses || [],
        featured: qa.featured || false,
        difficulty: qa.difficulty || 'beginner',
        submitter_info: qa.submitterInfo,
        status: qa.status || 'draft',
        published_at: qa.publishedAt,
        view_count: qa.viewCount || 0,
        seo_title: qa.seoTitle,
        seo_description: qa.seoDescription,
      };

      const { error } = await supabase
        .from('ask')
        .insert(transformedQA);

      if (error) {
        console.error(`Error inserting Q&A "${qa.question}":`, error);
      } else {
        console.log(`✓ Migrated: ${qa.question.substring(0, 50)}...`);
      }
    }
  } catch (error) {
    console.error('Error migrating Q&A:', error);
  }
}

async function main() {
  console.log('Starting Sanity to Supabase migration...');
  console.log('=====================================');
  
  try {
    await migrateVerseByVerse();
    await migrateTopics();
    await migrateResources();
    await migrateAsk();
    
    console.log('=====================================');
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  migrateVerseByVerse,
  migrateTopics,
  migrateResources,
  migrateAsk,
};
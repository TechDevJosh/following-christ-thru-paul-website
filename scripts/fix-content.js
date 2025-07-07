require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { createClient: createSanityClient } = require('next-sanity');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sanityClient = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false,
});

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

async function fixContent() {
  console.log('🔧 Fixing content formatting...');
  
  try {
    // Get Sanity content with proper formatting
    const sanitySermons = await sanityClient.fetch(`
      *[_type == "verseByVerse"] {
        _id,
        title,
        content
      }
    `);

    const sanityTopics = await sanityClient.fetch(`
      *[_type == "topics"] {
        _id,
        title,
        content
      }
    `);

    // Fix sermons
    for (const sermon of sanitySermons) {
      const convertedContent = convertPortableText(sermon.content);
      
      const { error } = await supabase
        .from('verse_by_verse')
        .update({ content: convertedContent })
        .eq('title', sermon.title);

      if (error) {
        console.error(`Error updating sermon "${sermon.title}":`, error);
      } else {
        console.log(`✅ Fixed: ${sermon.title}`);
      }
    }

    // Fix topics
    for (const topic of sanityTopics) {
      const convertedContent = convertPortableText(topic.content);
      
      const { error } = await supabase
        .from('topics')
        .update({ content: convertedContent })
        .eq('title', topic.title);

      if (error) {
        console.error(`Error updating topic "${topic.title}":`, error);
      } else {
        console.log(`✅ Fixed: ${topic.title}`);
      }
    }

    console.log('✅ Content formatting fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing content:', error);
  }
}

fixContent();
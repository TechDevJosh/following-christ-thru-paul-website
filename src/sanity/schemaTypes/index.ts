import { type SchemaTypeDefinition } from 'sanity'
import verseByVerse from '../../../sanity/schemas/verseByVerse';
import topics from '../../../sanity/schemas/topics';
import resources from '../../../sanity/schemas/resources';
import ask from '../../../sanity/schemas/ask';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [verseByVerse, topics, resources, ask],
}

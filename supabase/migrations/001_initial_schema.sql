-- Initial schema migration for CMS content
-- Migrating from Sanity.io to Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user roles
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'writer', 'user')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create verse_by_verse table
CREATE TABLE verse_by_verse (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  book text NOT NULL,
  passage text,
  youtube_url text,
  content jsonb, -- Portable text/markdown content
  attachments jsonb DEFAULT '[]'::jsonb, -- Array of {url, label} objects
  tags text[] DEFAULT '{}',
  published_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create topics table
CREATE TABLE topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  series text,
  series_order integer,
  description text NOT NULL,
  content jsonb, -- Portable text/markdown content
  featured_image_url text,
  youtube_url text,
  tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  published_at timestamp with time zone NOT NULL,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create resources table
CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('pdf', 'audio', 'video', 'link', 'image')),
  category text NOT NULL CHECK (category IN ('study-guides', 'audio-series', 'video-teachings', 'charts-diagrams', 'apologetics', 'reading-lists', 'devotionals', 'reference')),
  file_url text,
  external_url text,
  youtube_url text,
  file_size text,
  duration text,
  content jsonb, -- Additional content
  thumbnail_url text,
  tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  download_count integer DEFAULT 0,
  published_at timestamp with time zone NOT NULL,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create ask (Q&A) table
CREATE TABLE ask (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  slug text UNIQUE NOT NULL,
  answer jsonb NOT NULL, -- Portable text/markdown content
  short_answer text,
  category text NOT NULL CHECK (category IN ('salvation', 'dispensations', 'church-doctrine', 'bible-versions', 'prophecy', 'christian-living', 'apologetics', 'pauls-epistles', 'law-vs-grace', 'other')),
  tags text[] DEFAULT '{}',
  related_verses jsonb DEFAULT '[]'::jsonb, -- Array of {reference, text} objects
  featured boolean DEFAULT false,
  difficulty text DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  submitter_info jsonb, -- {name, email, anonymous, location}
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  published_at timestamp with time zone,
  view_count integer DEFAULT 0,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create relationship tables for cross-references
CREATE TABLE topic_related_sermons (
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  sermon_id uuid REFERENCES verse_by_verse(id) ON DELETE CASCADE,
  PRIMARY KEY (topic_id, sermon_id)
);

CREATE TABLE resource_related_topics (
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, topic_id)
);

CREATE TABLE resource_related_sermons (
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  sermon_id uuid REFERENCES verse_by_verse(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, sermon_id)
);

CREATE TABLE ask_related_sermons (
  ask_id uuid REFERENCES ask(id) ON DELETE CASCADE,
  sermon_id uuid REFERENCES verse_by_verse(id) ON DELETE CASCADE,
  PRIMARY KEY (ask_id, sermon_id)
);

CREATE TABLE ask_related_topics (
  ask_id uuid REFERENCES ask(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (ask_id, topic_id)
);

CREATE TABLE ask_related_resources (
  ask_id uuid REFERENCES ask(id) ON DELETE CASCADE,
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  PRIMARY KEY (ask_id, resource_id)
);

-- Create indexes for performance
CREATE INDEX idx_verse_by_verse_slug ON verse_by_verse(slug);
CREATE INDEX idx_verse_by_verse_published_at ON verse_by_verse(published_at DESC);
CREATE INDEX idx_verse_by_verse_book ON verse_by_verse(book);
CREATE INDEX idx_verse_by_verse_tags ON verse_by_verse USING GIN(tags);

CREATE INDEX idx_topics_slug ON topics(slug);
CREATE INDEX idx_topics_published_at ON topics(published_at DESC);
CREATE INDEX idx_topics_featured ON topics(featured) WHERE featured = true;
CREATE INDEX idx_topics_series ON topics(series) WHERE series IS NOT NULL;
CREATE INDEX idx_topics_tags ON topics USING GIN(tags);

CREATE INDEX idx_resources_slug ON resources(slug);
CREATE INDEX idx_resources_published_at ON resources(published_at DESC);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_featured ON resources(featured) WHERE featured = true;
CREATE INDEX idx_resources_tags ON resources USING GIN(tags);

CREATE INDEX idx_ask_slug ON ask(slug);
CREATE INDEX idx_ask_published_at ON ask(published_at DESC);
CREATE INDEX idx_ask_category ON ask(category);
CREATE INDEX idx_ask_status ON ask(status);
CREATE INDEX idx_ask_featured ON ask(featured) WHERE featured = true;
CREATE INDEX idx_ask_tags ON ask USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE verse_by_verse ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ask ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for content tables (public read, admin/writer write)
CREATE POLICY "Anyone can view published content" ON verse_by_verse
  FOR SELECT USING (true);

CREATE POLICY "Admins can do everything" ON verse_by_verse
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Writers can insert and update" ON verse_by_verse
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

CREATE POLICY "Writers can update" ON verse_by_verse
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

-- Repeat similar policies for other content tables
CREATE POLICY "Anyone can view published topics" ON topics
  FOR SELECT USING (true);

CREATE POLICY "Admins can do everything on topics" ON topics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Writers can insert topics" ON topics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

CREATE POLICY "Writers can update topics" ON topics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

CREATE POLICY "Anyone can view published resources" ON resources
  FOR SELECT USING (true);

CREATE POLICY "Admins can do everything on resources" ON resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Writers can insert resources" ON resources
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

CREATE POLICY "Writers can update resources" ON resources
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

CREATE POLICY "Anyone can view published Q&A" ON ask
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can do everything on ask" ON ask
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Writers can insert ask" ON ask
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

CREATE POLICY "Writers can update ask" ON ask
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

-- Create function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_verse_by_verse
  BEFORE UPDATE ON verse_by_verse
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_topics
  BEFORE UPDATE ON topics
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_resources
  BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_ask
  BEFORE UPDATE ON ask
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
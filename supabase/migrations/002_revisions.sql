-- Create revisions table for document history
CREATE TABLE revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL,
  schema_name text NOT NULL,
  snapshot jsonb NOT NULL,
  created_by uuid REFERENCES profiles(id),
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_revisions_document_id ON revisions(document_id);
CREATE INDEX idx_revisions_schema_name ON revisions(schema_name);
CREATE INDEX idx_revisions_created_at ON revisions(created_at DESC);

-- Enable RLS
ALTER TABLE revisions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view revisions" ON revisions
  FOR SELECT USING (true);

CREATE POLICY "Writers can insert revisions" ON revisions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'writer')
    )
  );

-- Create function to automatically create revisions
CREATE OR REPLACE FUNCTION create_revision()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO revisions (document_id, schema_name, snapshot, created_by)
  VALUES (
    OLD.id,
    TG_TABLE_NAME,
    to_jsonb(OLD),
    auth.uid()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all content tables
CREATE TRIGGER create_revision_verse_by_verse
  BEFORE UPDATE ON verse_by_verse
  FOR EACH ROW EXECUTE FUNCTION create_revision();

CREATE TRIGGER create_revision_topics
  BEFORE UPDATE ON topics
  FOR EACH ROW EXECUTE FUNCTION create_revision();

CREATE TRIGGER create_revision_resources
  BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION create_revision();

CREATE TRIGGER create_revision_ask
  BEFORE UPDATE ON ask
  FOR EACH ROW EXECUTE FUNCTION create_revision();
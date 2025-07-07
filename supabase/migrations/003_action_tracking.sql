-- Create action tracking table
CREATE TABLE action_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  action_type text NOT NULL, -- 'create', 'update', 'delete', 'publish', 'draft'
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  old_data jsonb,
  new_data jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_action_logs_user_id ON action_logs(user_id);
CREATE INDEX idx_action_logs_table_name ON action_logs(table_name);
CREATE INDEX idx_action_logs_record_id ON action_logs(record_id);
CREATE INDEX idx_action_logs_created_at ON action_logs(created_at DESC);

-- Enable RLS
ALTER TABLE action_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can view all action logs" ON action_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view their own action logs" ON action_logs
  FOR SELECT USING (user_id = auth.uid());

-- Function to log actions
CREATE OR REPLACE FUNCTION log_action()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO action_logs (user_id, action_type, table_name, record_id, new_data)
    VALUES (auth.uid(), 'create', TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO action_logs (user_id, action_type, table_name, record_id, old_data, new_data)
    VALUES (auth.uid(), 'update', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO action_logs (user_id, action_type, table_name, record_id, old_data)
    VALUES (auth.uid(), 'delete', TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all content tables
CREATE TRIGGER log_verse_by_verse_actions
  AFTER INSERT OR UPDATE OR DELETE ON verse_by_verse
  FOR EACH ROW EXECUTE FUNCTION log_action();

CREATE TRIGGER log_topics_actions
  AFTER INSERT OR UPDATE OR DELETE ON topics
  FOR EACH ROW EXECUTE FUNCTION log_action();

CREATE TRIGGER log_resources_actions
  AFTER INSERT OR UPDATE OR DELETE ON resources
  FOR EACH ROW EXECUTE FUNCTION log_action();

CREATE TRIGGER log_ask_actions
  AFTER INSERT OR UPDATE OR DELETE ON ask
  FOR EACH ROW EXECUTE FUNCTION log_action();
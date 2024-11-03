-- Create user_details table to store user role and other info
CREATE TABLE IF NOT EXISTS user_details (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to auto-update timestamps on user_details table
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_user_details_timestamp
BEFORE UPDATE ON user_details
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Enable Row-Level Security (RLS) on user_details
ALTER TABLE user_details ENABLE ROW LEVEL SECURITY;

-- Policy: Users can access only their own user details
CREATE POLICY "Allow individual access" ON user_details
FOR SELECT USING (auth.uid() = user_id);
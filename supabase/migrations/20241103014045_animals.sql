-- Create animals table to store information about animals in the shelter
CREATE TABLE IF NOT EXISTS animals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    age INTEGER CHECK (age >= 0),
    status VARCHAR(50) DEFAULT 'Available',  -- Status can be 'Available', 'Adopted', 'In Treatment'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to auto-update timestamps on animals table
CREATE TRIGGER update_animal_timestamp
BEFORE UPDATE ON animals
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Enable Row-Level Security (RLS) on animals
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;

-- Policies:
-- Admins can perform any action
CREATE POLICY "Allow admin access to animals" ON animals
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_details 
        WHERE user_details.user_id = auth.uid() 
        AND role_id = (SELECT id FROM roles WHERE role_name = 'Admin')
    )
);

-- Volunteers can only view animals
CREATE POLICY "Allow volunteer access to animals" ON animals
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM user_details 
        WHERE user_details.user_id = auth.uid() 
        AND role_id = (SELECT id FROM roles WHERE role_name = 'Volunteer')
    )
);
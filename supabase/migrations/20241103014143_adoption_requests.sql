-- Create adoption_requests table to store requests from users to adopt animals
CREATE TABLE IF NOT EXISTS adoption_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    animal_id UUID REFERENCES animals(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Pending',  -- Status can be 'Pending', 'Approved', 'Rejected'
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to auto-update timestamps on adoption_requests table
CREATE TRIGGER update_adoption_request_timestamp
BEFORE UPDATE ON adoption_requests
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Enable Row-Level Security (RLS) on adoption_requests
ALTER TABLE adoption_requests ENABLE ROW LEVEL SECURITY;

-- Policies:
-- Users can create adoption requests but can’t view others’ requests
CREATE POLICY "Allow user to create adoption requests" ON adoption_requests
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Admins can view, update, and delete requests
CREATE POLICY "Allow admin access to adoption requests" ON adoption_requests
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_details 
        WHERE user_details.user_id = auth.uid() 
        AND role_id = (SELECT id FROM roles WHERE role_name = 'Admin')
    )
);

-- Volunteers can only view requests
CREATE POLICY "Allow volunteer access to adoption requests" ON adoption_requests
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM user_details 
        WHERE user_details.user_id = auth.uid() 
        AND role_id = (SELECT id FROM roles WHERE role_name = 'Volunteer')
    )
);
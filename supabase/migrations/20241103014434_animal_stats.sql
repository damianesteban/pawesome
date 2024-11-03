-- Create animal_stats table for optional dashboard analytics
CREATE TABLE IF NOT EXISTS animal_stats (
    id SERIAL PRIMARY KEY,
    total_available INTEGER DEFAULT 0,
    total_adopted INTEGER DEFAULT 0,
    total_in_treatment INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initialize animal stats with zeros
INSERT INTO animal_stats (total_available, total_adopted, total_in_treatment) 
VALUES (0, 0, 0)
ON CONFLICT DO NOTHING;
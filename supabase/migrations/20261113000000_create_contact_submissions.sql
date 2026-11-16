-- Create table for freelance contact inquiries
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email TEXT NOT NULL CHECK (char_length(email) <= 150),
  scope TEXT NOT NULL DEFAULT 'General Inquiry' CHECK (char_length(scope) <= 120),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 3000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to INSERT messages only (no SELECT, UPDATE, DELETE)
CREATE POLICY "Allow public insert on contact_messages"
  ON public.contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);
-- Create decks table for dranki app
CREATE TABLE IF NOT EXISTS public.decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  emoji TEXT DEFAULT '📚',
  color TEXT DEFAULT '#58CC02',
  phrases JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (but allow public access since no auth required)
ALTER TABLE public.decks ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no auth required per spec)
CREATE POLICY "Allow public read" ON public.decks FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.decks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.decks FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.decks FOR DELETE USING (true);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_decks_slug ON public.decks(slug);

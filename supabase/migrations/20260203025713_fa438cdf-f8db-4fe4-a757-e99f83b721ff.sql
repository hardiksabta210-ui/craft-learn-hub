-- Create storage bucket for PDF uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdfs', 'pdfs', false);

-- Create storage bucket for generated book covers
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-covers', 'book-covers', true);

-- Create user interests table
CREATE TABLE public.user_interests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  interests TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create uploaded PDFs table
CREATE TABLE public.uploaded_pdfs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  extracted_text TEXT,
  status TEXT NOT NULL DEFAULT 'uploaded',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create custom books table
CREATE TABLE public.custom_books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  pdf_id UUID REFERENCES public.uploaded_pdfs(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  interests TEXT[] NOT NULL DEFAULT '{}',
  chapters JSONB NOT NULL DEFAULT '[]',
  cover_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'generating',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_pdfs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_books ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_interests (allow both authenticated users and anonymous via session_id)
CREATE POLICY "Users can view their own interests"
  ON public.user_interests FOR SELECT
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users can create interests"
  ON public.user_interests FOR INSERT
  WITH CHECK (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users can update their own interests"
  ON public.user_interests FOR UPDATE
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

-- RLS policies for uploaded_pdfs
CREATE POLICY "Users can view their own PDFs"
  ON public.uploaded_pdfs FOR SELECT
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users can upload PDFs"
  ON public.uploaded_pdfs FOR INSERT
  WITH CHECK (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users can update their own PDFs"
  ON public.uploaded_pdfs FOR UPDATE
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

-- RLS policies for custom_books
CREATE POLICY "Users can view their own books"
  ON public.custom_books FOR SELECT
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users can create books"
  ON public.custom_books FOR INSERT
  WITH CHECK (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users can update their own books"
  ON public.custom_books FOR UPDATE
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

-- Storage policies for PDFs bucket
CREATE POLICY "Allow PDF uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'pdfs');

CREATE POLICY "Allow PDF downloads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pdfs');

-- Storage policies for book covers bucket
CREATE POLICY "Allow book cover uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'book-covers');

CREATE POLICY "Allow book cover downloads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'book-covers');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_interests_updated_at
  BEFORE UPDATE ON public.user_interests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_uploaded_pdfs_updated_at
  BEFORE UPDATE ON public.uploaded_pdfs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_books_updated_at
  BEFORE UPDATE ON public.custom_books
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
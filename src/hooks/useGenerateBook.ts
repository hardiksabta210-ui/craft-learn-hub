import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GeneratedBook {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

interface Chapter {
  title: string;
  content: string;
  relatedInterest?: string;
}

export const useGenerateBook = (sessionId: string) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBook, setGeneratedBook] = useState<GeneratedBook | null>(null);
  const { toast } = useToast();

  const generateBook = async (
    pdfId: string | null,
    interests: string[],
    topic?: string
  ): Promise<GeneratedBook | null> => {
    if (interests.length === 0) {
      toast({
        title: "No interests selected",
        description: "Please select at least one interest",
        variant: "destructive",
      });
      return null;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-book", {
        body: {
          pdfId,
          interests,
          topic: topic || "general learning",
          sessionId,
        },
      });

      if (error) throw error;

      const book: GeneratedBook = {
        id: data.bookId,
        title: data.title,
        description: data.description,
        chapters: data.chapters,
      };

      setGeneratedBook(book);

      toast({
        title: "Book generated!",
        description: `"${book.title}" is ready to read`,
      });

      return book;
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your book",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateBook, isGenerating, generatedBook, setGeneratedBook };
};

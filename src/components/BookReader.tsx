import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Chapter {
  title: string;
  content: string;
  relatedInterest?: string;
}

interface BookReaderProps {
  title: string;
  description: string;
  chapters: Chapter[];
  onClose: () => void;
}

const BookReader = ({ title, description, chapters, onClose }: BookReaderProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);

  const goToNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const goToPrevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const chapter = chapters[currentChapter];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-coral" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-medium">{title}</h1>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close Book
          </Button>
        </div>

        {/* Chapter Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {chapters.map((ch, index) => (
            <button
              key={index}
              onClick={() => setCurrentChapter(index)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${index === currentChapter 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted hover:bg-muted/80"
                }
              `}
            >
              Chapter {index + 1}
            </button>
          ))}
        </div>

        {/* Chapter Content */}
        <Card className="p-8 rounded-3xl border-2 border-border/50 bg-card/50 backdrop-blur animate-fade-in-scale">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-coral" />
              <h2 className="text-2xl font-display font-medium">{chapter.title}</h2>
            </div>
            {chapter.relatedInterest && (
              <Badge variant="secondary" className="mb-4">
                ✨ Personalized for: {chapter.relatedInterest}
              </Badge>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            {chapter.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        {/* Chapter Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={goToPrevChapter}
            disabled={currentChapter === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Chapter
          </Button>

          <span className="text-muted-foreground">
            {currentChapter + 1} / {chapters.length}
          </span>

          <Button
            onClick={goToNextChapter}
            disabled={currentChapter === chapters.length - 1}
            className="gap-2 bg-coral hover:bg-coral/90"
          >
            Next Chapter
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookReader;

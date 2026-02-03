import { useState, useRef } from "react";
import { X, Sparkles, Upload, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PdfUploader from "./PdfUploader";

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInterests: string[];
  onGenerate: (pdfId: string | null, topic: string) => void;
  isUploading: boolean;
  uploadProgress: number;
  onUpload: (file: File) => Promise<{ id: string; fileName: string } | null>;
}

const CreateBookModal = ({
  isOpen,
  onClose,
  selectedInterests,
  onGenerate,
  isUploading,
  uploadProgress,
  onUpload,
}: CreateBookModalProps) => {
  const [topic, setTopic] = useState("");
  const [uploadedPdf, setUploadedPdf] = useState<{ id: string; fileName: string } | null>(null);

  if (!isOpen) return null;

  const handleUpload = async (file: File) => {
    const result = await onUpload(file);
    if (result) {
      setUploadedPdf(result);
    }
    return result;
  };

  const handleGenerate = () => {
    onGenerate(uploadedPdf?.id || null, topic);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-2 border-border rounded-3xl shadow-2xl animate-fade-in-scale overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-coral" />
            </div>
            <h2 className="text-2xl font-display font-medium">Create Your Book</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Selected Interests */}
          <div>
            <Label className="text-base font-medium mb-3 block">Your Interests</Label>
            {selectedInterests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 bg-coral/20 text-foreground rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No interests selected. Go back and select some!</p>
            )}
          </div>

          {/* Topic Input */}
          <div>
            <Label htmlFor="topic" className="text-base font-medium mb-3 block">
              What do you want to learn about?
            </Label>
            <Input
              id="topic"
              placeholder="e.g., World History, Machine Learning, Biology..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-xl h-12 text-base"
            />
          </div>

          {/* PDF Upload */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Or upload a PDF (optional)
            </Label>
            <PdfUploader
              onUpload={handleUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              uploadedFile={uploadedPdf}
              onRemove={() => setUploadedPdf(null)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={selectedInterests.length === 0 || (!topic && !uploadedPdf)}
            className="w-full bg-coral hover:bg-coral/90 text-foreground rounded-full h-14 text-lg font-medium gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate My Custom Book
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-3">
            Book Buddy will create a personalized book based on your interests
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CreateBookModal;

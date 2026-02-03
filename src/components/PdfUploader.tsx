import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PdfUploaderProps {
  onUpload: (file: File) => Promise<{ id: string; fileName: string } | null>;
  isUploading: boolean;
  uploadProgress: number;
  uploadedFile?: { id: string; fileName: string } | null;
  onRemove: () => void;
}

const PdfUploader = ({
  onUpload,
  isUploading,
  uploadProgress,
  uploadedFile,
  onRemove,
}: PdfUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await onUpload(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  if (uploadedFile) {
    return (
      <Card className="p-6 bg-accent/30 border-2 border-primary/20 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">{uploadedFile.fileName}</p>
              <p className="text-sm text-muted-foreground">
                Ready for customization
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`
        p-8 border-2 border-dashed rounded-2xl transition-all cursor-pointer
        ${isDragging 
          ? "border-primary bg-primary/5 scale-[1.02]" 
          : "border-border hover:border-primary/50 hover:bg-accent/20"
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="flex flex-col items-center gap-4 text-center">
        {isUploading ? (
          <>
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="w-full max-w-xs">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Uploading... {uploadProgress}%
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center animate-bounce-soft">
              <Upload className="w-8 h-8 text-coral" />
            </div>
            <div>
              <p className="font-medium text-lg">Drop your PDF here</p>
              <p className="text-muted-foreground">or click to browse</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum file size: 10MB
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default PdfUploader;

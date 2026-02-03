import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UploadResult {
  id: string;
  fileName: string;
  filePath: string;
}

export const usePdfUpload = (sessionId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const uploadPdf = async (file: File): Promise<UploadResult | null> => {
    if (!file || file.type !== "application/pdf") {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return null;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a PDF smaller than 10MB",
        variant: "destructive",
      });
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const fileName = `${sessionId}/${Date.now()}_${file.name}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      setUploadProgress(50);

      // Create database record
      const { data, error: dbError } = await supabase
        .from("uploaded_pdfs")
        .insert({
          session_id: sessionId,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          status: "uploaded",
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setUploadProgress(100);

      toast({
        title: "PDF uploaded successfully",
        description: "Your PDF is ready for processing",
      });

      return {
        id: data.id,
        fileName: file.name,
        filePath: fileName,
      };
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your PDF",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadPdf, isUploading, uploadProgress };
};

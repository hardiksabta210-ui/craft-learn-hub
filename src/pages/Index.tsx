import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CourseGrid from "@/components/CourseGrid";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import CreateBookModal from "@/components/CreateBookModal";
import GeneratingAnimation from "@/components/GeneratingAnimation";
import BookReader from "@/components/BookReader";
import { useSessionId } from "@/hooks/useSessionId";
import { usePdfUpload } from "@/hooks/usePdfUpload";
import { useGenerateBook } from "@/hooks/useGenerateBook";

const Index = () => {
  const sessionId = useSessionId();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { uploadPdf, isUploading, uploadProgress } = usePdfUpload(sessionId);
  const { generateBook, isGenerating, generatedBook, setGeneratedBook } = useGenerateBook(sessionId);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleTryNowClick = () => {
    setIsModalOpen(true);
  };

  const handleGenerate = async (pdfId: string | null, topic: string) => {
    setIsModalOpen(false);
    await generateBook(pdfId, selectedInterests, topic);
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection 
        selectedInterests={selectedInterests}
        onInterestsChange={setSelectedInterests}
        onUploadClick={handleUploadClick}
        onTryNowClick={handleTryNowClick}
      />
      <CourseGrid />
      <FeaturesSection />
      <Footer />

      {/* Create Book Modal */}
      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedInterests={selectedInterests}
        onGenerate={handleGenerate}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        onUpload={uploadPdf}
      />

      {/* Generating Animation */}
      {isGenerating && <GeneratingAnimation />}

      {/* Book Reader */}
      {generatedBook && (
        <BookReader
          title={generatedBook.title}
          description={generatedBook.description}
          chapters={generatedBook.chapters}
          onClose={() => setGeneratedBook(null)}
        />
      )}
    </main>
  );
};

export default Index;

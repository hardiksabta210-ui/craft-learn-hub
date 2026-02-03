import HeroSection from "@/components/HeroSection";
import CourseGrid from "@/components/CourseGrid";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <CourseGrid />
      <FeaturesSection />
      <Footer />
    </main>
  );
};

export default Index;

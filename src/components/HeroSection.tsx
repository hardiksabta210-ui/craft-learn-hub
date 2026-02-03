import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import InterestPicker from "./InterestPicker";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-0 right-0 w-[60%] h-[70%] bg-coral/40 blob-shape animate-blob"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute bottom-0 right-[20%] w-[40%] h-[50%] bg-peach/50 blob-shape animate-blob"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute top-[60%] left-0 w-[30%] h-[40%] bg-coral/30 blob-shape animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            {/* Logo/Title */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display font-medium tracking-tight">
                Learn Your Way
              </h1>
              <span className="px-3 py-1 text-xs font-medium border border-muted-foreground/30 rounded-full">
                EXPERIMENT
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-display font-medium leading-tight italic">
              Re-imagining textbooks for every learner
            </h2>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Learn Your Way transforms content into a dynamic and engaging learning 
              experience tailored for you.
            </p>

            {/* CTA Button */}
            <button className="flex items-center gap-2 text-lg font-medium hover:gap-4 transition-all group">
              <span className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-background ml-0.5" fill="currentColor" />
              </span>
              See how it works
            </button>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-coral hover:bg-coral/90 text-foreground rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                📋 Waitlist: Upload your PDF
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-medium border-2 hover:bg-accent transition-all hover:-translate-y-1"
              >
                📖 Try it now
              </Button>
            </div>
          </div>

          {/* Right Content - Interest Picker */}
          <div className="relative animate-slide-up stagger-2">
            <div className="absolute inset-0 bg-gradient-to-br from-peach/60 to-coral/40 rounded-[3rem] blur-3xl -z-10 animate-pulse-soft" />
            <InterestPicker />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

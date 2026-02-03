import { BookOpen, Sparkles, Wand2 } from "lucide-react";

const GeneratingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-8 animate-fade-in-scale">
        {/* Animated Book Icon */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Orbiting sparkles */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
              <Sparkles className="w-6 h-6 text-coral absolute top-0 left-1/2 -translate-x-1/2" />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s", animationDelay: "1s" }}>
              <Sparkles className="w-4 h-4 text-peach absolute top-1/2 right-0 -translate-y-1/2" />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s", animationDelay: "2s" }}>
              <Sparkles className="w-5 h-5 text-primary absolute bottom-0 left-1/2 -translate-x-1/2" />
            </div>
            
            {/* Central book */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-coral/20 flex items-center justify-center animate-pulse-soft">
                <BookOpen className="w-10 h-10 text-coral" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Wand2 className="w-5 h-5 text-primary animate-bounce" />
            <h3 className="text-2xl font-display font-medium">Creating your custom book...</h3>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Book Buddy is weaving your interests into personalized learning content. 
            This usually takes about 30 seconds.
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-coral animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-3 h-3 rounded-full bg-peach animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
};

export default GeneratingAnimation;

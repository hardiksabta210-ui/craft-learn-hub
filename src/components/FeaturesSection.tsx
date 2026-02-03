import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, BookOpen, Target, Upload } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Any PDF",
    description: "Drop your textbook, article, or any PDF - we'll transform it into engaging content.",
    color: "coral"
  },
  {
    icon: Sparkles,
    title: "AI-Personalized",
    description: "Content adapts to your interests, making complex topics relatable and fun.",
    color: "peach"
  },
  {
    icon: BookOpen,
    title: "Custom Books",
    description: "Get a beautifully structured book with chapters tailored just for you.",
    color: "coral"
  },
  {
    icon: Target,
    title: "Learn Your Way",
    description: "Whether you love sports, gaming, or cooking - learn through what you love.",
    color: "peach"
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-peach/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-display font-medium mb-4">
            Why Book Buddy?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience learning that actually connects with you. Your interests 
            become the lens through which you understand new concepts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="card-hover border-2 border-coral/10 bg-card/50 backdrop-blur rounded-3xl animate-slide-up"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <CardContent className="p-8 text-center">
                <div className={`
                  w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center
                  ${feature.color === 'coral' ? 'bg-coral/20' : 'bg-peach/40'}
                  animate-bounce-soft
                `}
                style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <feature.icon className="w-8 h-8 text-coral" />
                </div>
                <h3 className="text-xl font-display font-medium mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

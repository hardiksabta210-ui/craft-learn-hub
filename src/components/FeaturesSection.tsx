import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, BookOpen, Target, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Learning",
    description: "Personalized content that adapts to your learning style and pace.",
    color: "coral"
  },
  {
    icon: BookOpen,
    title: "Interactive Content",
    description: "Transform static textbooks into engaging, interactive experiences.",
    color: "peach"
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Track your progress and achieve your learning goals effectively.",
    color: "coral"
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get real-time feedback and explanations as you learn.",
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
            Why Learn Your Way?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how we're revolutionizing education with cutting-edge technology 
            and personalized learning experiences.
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

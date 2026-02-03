import { useState } from "react";
import { Card } from "@/components/ui/card";

const interests = [
  { emoji: "📚", label: "Reading" },
  { emoji: "⚽", label: "Soccer" },
  { emoji: "🎨", label: "Art" },
  { emoji: "🎵", label: "Music" },
  { emoji: "🎬", label: "Movies" },
  { emoji: "🏎️", label: "Cars" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "🏀", label: "Basketball" },
  { emoji: "🎾", label: "Tennis" },
  { emoji: "🏈", label: "Football" },
  { emoji: "🎸", label: "Guitar" },
  { emoji: "🍳", label: "Cooking" },
  { emoji: "🏊", label: "Swimming" },
  { emoji: "🚴", label: "Cycling" },
  { emoji: "🧘", label: "Yoga" },
  { emoji: "✈️", label: "Travel" },
  { emoji: "📷", label: "Photography" },
  { emoji: "🎭", label: "Theater" },
  { emoji: "🎯", label: "Darts" },
  { emoji: "🎪", label: "Circus" },
];

const InterestPicker = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null);

  const toggleInterest = (label: string) => {
    setSelectedInterests(prev => 
      prev.includes(label) 
        ? prev.filter(i => i !== label)
        : [...prev, label]
    );
  };

  return (
    <Card className="bg-card/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-0 max-w-md mx-auto">
      <h3 className="text-xl font-display font-medium text-center mb-6">
        What are your interests?
      </h3>
      
      <div className="grid grid-cols-5 gap-3">
        {interests.map((interest, index) => (
          <button
            key={interest.label}
            onClick={() => toggleInterest(interest.label)}
            onMouseEnter={() => setHoveredInterest(interest.label)}
            onMouseLeave={() => setHoveredInterest(null)}
            className={`
              emoji-button p-3 text-2xl rounded-xl transition-all duration-200 relative
              ${selectedInterests.includes(interest.label) 
                ? 'selected bg-coral-light ring-2 ring-coral scale-110' 
                : 'hover:bg-accent'}
              animate-fade-in-scale
            `}
            style={{ 
              animationDelay: `${index * 0.03}s`,
              animationFillMode: 'both'
            }}
            title={interest.label}
          >
            <span className={hoveredInterest === interest.label ? 'animate-wiggle inline-block' : ''}>
              {interest.emoji}
            </span>
            
            {/* Tooltip */}
            {hoveredInterest === interest.label && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium bg-foreground text-background px-2 py-1 rounded whitespace-nowrap z-10">
                {interest.label}
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedInterests.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border animate-slide-up">
          <p className="text-sm text-muted-foreground mb-2">Selected interests:</p>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map(interest => (
              <span 
                key={interest}
                className="px-3 py-1 bg-coral/20 text-coral-foreground rounded-full text-sm font-medium animate-fade-in-scale"
              >
                {interests.find(i => i.label === interest)?.emoji} {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default InterestPicker;

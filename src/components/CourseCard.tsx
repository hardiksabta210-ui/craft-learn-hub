import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  icon: string;
  category: string;
  title: string;
  image: string;
  color?: string;
  delay?: number;
}

const CourseCard = ({ icon, category, title, image, color = "coral", delay = 0 }: CourseCardProps) => {
  return (
    <Card 
      className="card-hover overflow-hidden rounded-3xl border-2 border-coral/20 bg-card cursor-pointer group animate-slide-up"
      style={{ 
        animationDelay: `${delay}s`,
        animationFillMode: 'both'
      }}
    >
      <CardContent className="p-0">
        {/* Category Badge */}
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-lg">{icon}</span>
            <span className="text-sm font-medium">{category}</span>
          </div>
          <h3 className="text-lg font-display font-medium mt-2 leading-snug group-hover:text-coral transition-colors">
            {title}
          </h3>
        </div>
        
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;

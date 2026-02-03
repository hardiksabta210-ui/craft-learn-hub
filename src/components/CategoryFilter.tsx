import { useState } from "react";

const categories = [
  "All",
  "Astronomy",
  "Biology",
  "Chemistry",
  "Computer Science",
  "ELA",
  "Economics",
  "Health",
  "History",
  "Philosophy",
  "Psychology",
  "Sociology",
];

interface CategoryFilterProps {
  onCategoryChange?: (category: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 py-8">
      {categories.map((category, index) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
            animate-fade-in-scale
            ${activeCategory === category
              ? 'bg-foreground text-background shadow-lg scale-105'
              : 'bg-muted hover:bg-muted/80 text-foreground hover:scale-105'
            }
          `}
          style={{ 
            animationDelay: `${index * 0.05}s`,
            animationFillMode: 'both'
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

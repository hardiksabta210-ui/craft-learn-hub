import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import CourseCard from "./CourseCard";

const courses = [
  {
    icon: "💰",
    category: "Economics",
    title: "An Overview of Economic Systems",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    categoryTag: "Economics"
  },
  {
    icon: "📜",
    category: "History",
    title: "Early Human Evolution and Migration",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
    categoryTag: "History"
  },
  {
    icon: "🗣️",
    category: "Sociology",
    title: "What is Sociology?",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    categoryTag: "Sociology"
  },
  {
    icon: "🧬",
    category: "Biology",
    title: "Disruptions in the Immune System",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    categoryTag: "Biology"
  },
  {
    icon: "📖",
    category: "ELA",
    title: '"Reading" to understand and respond',
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    categoryTag: "ELA"
  },
  {
    icon: "⚗️",
    category: "Chemistry",
    title: "Atoms and Molecules",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    categoryTag: "Chemistry"
  },
  {
    icon: "🌟",
    category: "Astronomy",
    title: "Introduction to the Solar System",
    image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80",
    categoryTag: "Astronomy"
  },
  {
    icon: "💻",
    category: "Computer Science",
    title: "Fundamentals of Programming",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    categoryTag: "Computer Science"
  },
  {
    icon: "🧠",
    category: "Psychology",
    title: "Understanding Human Behavior",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    categoryTag: "Psychology"
  },
  {
    icon: "🤔",
    category: "Philosophy",
    title: "Introduction to Ethics",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    categoryTag: "Philosophy"
  },
  {
    icon: "❤️",
    category: "Health",
    title: "Nutrition and Wellness",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    categoryTag: "Health"
  },
  {
    icon: "⚗️",
    category: "Chemistry",
    title: "Chemical Reactions Explained",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&q=80",
    categoryTag: "Chemistry"
  },
];

const CourseGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = activeCategory === "All" 
    ? courses 
    : courses.filter(course => course.categoryTag === activeCategory);

  return (
    <section className="py-16 bg-cream/50">
      <div className="container mx-auto px-6">
        <CategoryFilter onCategoryChange={setActiveCategory} />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={`${course.title}-${index}`}
              icon={course.icon}
              category={course.category}
              title={course.title}
              image={course.image}
              delay={index * 0.1}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 animate-fade-in-scale">
            <p className="text-2xl text-muted-foreground">No courses found in this category yet.</p>
            <p className="text-muted-foreground mt-2">Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseGrid;

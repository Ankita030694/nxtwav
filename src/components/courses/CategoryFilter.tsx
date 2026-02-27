import { Button } from "@/components/ui/button";
import { CourseCategory, categoryInfo } from "@/data/courses";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  activeCategory: CourseCategory | "all";
  onCategoryChange: (category: CourseCategory | "all") => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: { value: CourseCategory | "all"; label: string }[] = [
    { value: "all", label: "All Courses" },
    { value: "production", label: "Production" },
    { value: "djing", label: "DJing" },
    { value: "artist-dev", label: "Artist Dev" },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.value;
        
        let colorClasses = "bg-muted text-muted-foreground hover:bg-muted-foreground/20";
        if (isActive) {
          if (cat.value === "production") {
            colorClasses = "bg-primary text-primary-foreground";
          } else if (cat.value === "djing") {
            colorClasses = "bg-secondary text-secondary-foreground";
          } else if (cat.value === "artist-dev") {
            colorClasses = "bg-accent text-accent-foreground";
          } else {
            colorClasses = "bg-foreground text-background";
          }
        }

        return (
          <Button
            key={cat.value}
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange(cat.value)}
            className={cn(
              "px-6 py-2 rounded-full transition-all duration-300",
              colorClasses
            )}
          >
            {cat.label}
          </Button>
        );
      })}
    </div>
  );
}

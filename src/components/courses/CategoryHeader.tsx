import { CourseCategory, categoryInfo } from "@/data/courses";
import { Sliders, Headphones, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryHeaderProps {
  category: CourseCategory;
}

const icons = {
  production: Sliders,
  djing: Headphones,
  "artist-dev": Sparkles,
};

export function CategoryHeader({ category }: CategoryHeaderProps) {
  const info = categoryInfo[category];
  const Icon = icons[category];

  const colorClasses = {
    production: "text-primary border-primary/30",
    djing: "text-secondary border-secondary/30",
    "artist-dev": "text-accent border-accent/30",
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-3">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border",
          colorClasses[category],
          category === "production" && "bg-primary/10",
          category === "djing" && "bg-secondary/10",
          category === "artist-dev" && "bg-accent/10",
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className={cn(
            "font-display text-2xl sm:text-3xl font-bold",
            category === "production" && "text-primary",
            category === "djing" && "text-secondary",
            category === "artist-dev" && "text-accent",
          )}>
            {info.label}
          </h2>
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>
      </div>
    </div>
  );
}

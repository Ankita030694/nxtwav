import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Users, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import { Course, CourseCategory, categoryInfo, formatPrice } from "@/data/courses";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const category = categoryInfo[course.category];
  
  const colorClasses = {
    production: {
      border: "hover:border-primary/50",
      accent: "bg-primary",
      badge: "bg-primary/10 text-primary",
      button: "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    },
    djing: {
      border: "hover:border-secondary/50",
      accent: "bg-secondary",
      badge: "bg-secondary/10 text-secondary",
      button: "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
    },
    "artist-dev": {
      border: "hover:border-accent/50",
      accent: "bg-accent",
      badge: "bg-accent/10 text-accent",
      button: "border-accent text-accent hover:bg-accent hover:text-accent-foreground",
    },
  };

  const colors = colorClasses[course.category];

  const levelLabels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    "all-levels": "All Levels",
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        colors.border
      )}
    >
      {/* Category Accent Bar */}
      <div className={cn("absolute top-0 left-0 right-0 h-1", colors.accent)} />

      {/* Featured Badge */}
      {course.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-cta text-primary-foreground text-xs font-medium rounded-full">
            <Sparkles className="w-3 h-3" />
            Featured
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Category & Level */}
        <div className="flex items-center gap-2 mb-4">
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide", colors.badge)}>
            {course.category === "artist-dev" ? "Artist Dev" : course.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            {levelLabels[course.level]}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
          {course.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-muted-foreground/70" />
            <span>{course.duration.months ? `${course.duration.months} Months` : `${course.duration.weeks} Weeks`}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-muted-foreground/70" />
            <span>{course.sessionsPerWeek} sessions/week</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="w-4 h-4 text-muted-foreground/70" />
            <span>{course.totalSessions} Total Sessions</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="text-muted-foreground/70">₹</span>
            <span>{formatPrice(course.price).replace("₹", "")}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          variant="outline" 
          className={cn("w-full transition-all duration-300", colors.button)}
          asChild
        >
          <Link to="/auth/signup">
            View This Course
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import heroStudio from "@/assets/hero-studio.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroStudio}
          alt="Professional music production studio"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
         

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            From Producer to{" "}
            <span className="text-gradient">Paycheck</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Master music production and DJing with <span className="text-foreground font-medium">guaranteed career outcomes</span>. 
            We don't just teach beats - we teach business. Join founders live in the studio every month.
          </p>

          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="bg-gradient-cta hover:opacity-90 text-primary-foreground shadow-glow-blue" asChild>
              <Link to="/auth/signup">
                Explore Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

         
        </div>
      </div>

    </section>
  );
}

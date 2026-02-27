import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight">
            NxtWav
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            The Next Wave of Music Artists Starts Here
          </p>
          <p className="text-lg text-primary mb-12 font-medium">
            Co-founded by industry insiders who've lived the music scene
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-cta hover:opacity-90 text-primary-foreground px-8 py-6 text-lg"
            asChild
          >
          
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

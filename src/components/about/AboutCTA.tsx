import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your <span className="text-gradient">Journey</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Explore our courses and find the perfect path for your music career.
            The next wave starts with you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-cta hover:opacity-90 text-primary-foreground px-8 py-6 text-lg"
              asChild
            >
              <Link to="/courses">
                Explore Our Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border text-foreground hover:bg-muted px-8 py-6 text-lg"
              asChild
            >
              <Link to="/pricing">
                <BookOpen className="mr-2 w-5 h-5" />
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

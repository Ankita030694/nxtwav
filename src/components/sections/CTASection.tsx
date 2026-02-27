import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to Turn Your{" "}
            <span className="text-gradient">Passion Into Paychecks?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join 2,500+ students who've launched successful music careers. Start your journey today 
            with our proven roadmaps, expert mentorship, and live founder sessions.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth/signup">
              <Button size="lg" className="bg-gradient-cta hover:opacity-90 text-primary-foreground shadow-glow-blue">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

        
        </div>
      </div>
    </section>
  );
}

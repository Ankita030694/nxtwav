import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroStudio from "@/assets/hero-studio.jpg";
import { LeadForm } from "@/components/LeadForm";
import { LeadFormSheet } from "@/components/LeadFormSheet";

export function LandingHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroStudio}
          alt="Professional music production studio"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              From Producer to{" "}
              <span className="text-gradient">Paycheck</span>
            </h1>

            <p className="text-xl font-bold text-accent mb-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
              Courses Starting from INR 34,999/-
            </p>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Master music production and DJing with <span className="text-foreground font-medium">guaranteed career outcomes</span>. 
              We don't just teach beats - we teach business. Join founders live in the studio every month.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-gradient-cta hover:opacity-90 text-primary-foreground shadow-glow-blue" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <LeadFormSheet 
                trigger={
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
                    Talk to our career expert
                  </Button>
                } 
              />
            </div>
          </div>

          {/* Right Form */}
          <div id="lead-form" className="w-full max-w-md mx-auto lg:ml-auto animate-fade-in scroll-mt-24" style={{ animationDelay: '0.4s' }}>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}

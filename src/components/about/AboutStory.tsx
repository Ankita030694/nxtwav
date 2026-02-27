import { Music, Users, Star, Zap } from "lucide-react";

export function AboutStory() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text Content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Why NxtWav Exists
            </span>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="text-xl text-foreground font-medium">
                NxtWav was built with one simple belief. The next wave of artists shouldn't
                have to figure it out the hard way.
              </p>
              
              <p>
                Co-founded by <span className="text-primary">Siddharth Sethi (BeatCrush)</span>,{" "}
                <span className="text-secondary">Lakshay Nanda (Skopòs)</span> and{" "}
                <span className="text-accent">Kanav Kumar (SLCT)</span>, NxtWav is a music
                academy created to shape the next generation of talent, not just technically, 
                but professionally.
              </p>
              
              <p>
                We've spent years inside clubs, festivals, weddings, tours, and real-world 
                lineups, and we've seen the gap. Great talent, wrong guidance. Passion, 
                but no direction.
              </p>
              
              <p className="text-xl text-foreground font-semibold border-l-4 border-primary pl-6">
                NxtWav exists to change that.
              </p>
            </div>
          </div>

          {/* Visual Element - 40% */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <Music className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Clubs</h4>
                <p className="text-sm text-muted-foreground">Years behind the decks at top venues</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-colors">
                <Star className="w-8 h-8 text-secondary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Festivals</h4>
                <p className="text-sm text-muted-foreground">Main stage experiences across India</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-colors">
                <Zap className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Tours</h4>
                <p className="text-sm text-muted-foreground">Nationwide performances and residencies</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Talent</h4>
                <p className="text-sm text-muted-foreground">Mentored dozens of successful artists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

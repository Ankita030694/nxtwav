import mission1 from "@/assets/missionvision1.jpg";
import mission2 from "@/assets/missionvision2.jpg";
import mission3 from "@/assets/missionvision3.jpg";
import mission4 from "@/assets/missionvision4.jpg";
import mission6 from "@/assets/missionvision6.jpg";

export function MissionSection() {
  const missionImages = [mission1, mission2, mission3, mission4, mission6];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            The Name Says It All
          </span>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8">
            Creating the <span className="text-gradient">Next Wave</span>
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className="text-xl text-foreground">
              The name <span className="font-bold text-primary">NxtWav</span> comes from 
              exactly what we stand for, creating the next wave of artists who are confident, 
              skilled, and ready for the real scene.
            </p>
            
            <p>
              Whether you're starting from scratch or looking to level up, NxtWav is where 
              raw interest turns into real potential.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <span className="px-6 py-3 rounded-full border border-primary/30 text-primary font-medium">
                No shortcuts
              </span>
              <span className="px-6 py-3 rounded-full border border-secondary/30 text-secondary font-medium">
                No gimmicks
              </span>
              <span className="px-6 py-3 rounded-full border border-accent/30 text-accent font-medium">
                Just proper learning
              </span>
            </div>

            {/* Mission & Vision Containers */}
            <div className="py-12 px-2 max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Vision Container */}
                <div className="group relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl transition-all duration-300 hover:border-primary/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={mission3} 
                    alt="Our Vision" 
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-left">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Our Vision</h3>
                    <p className="text-white/80 text-sm">Empowering the next generation of digital artists and performers.</p>
                  </div>
                </div>

                {/* Mission Container */}
                <div className="group relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl transition-all duration-300 hover:border-secondary/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={mission4} 
                    alt="Our Mission" 
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-left">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Our Mission</h3>
                    <p className="text-white/80 text-sm">Providing hands-on expertise and real-world exposure for career success.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-foreground font-semibold pt-4 italic">
              "Real exposure. The right push."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";


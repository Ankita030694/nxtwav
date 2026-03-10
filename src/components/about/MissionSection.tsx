import { Target, Eye, ArrowRight, Zap, Play, Radio, Music } from "lucide-react";
import { motion } from "framer-motion";

export function MissionSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background from CTA Section */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 tracking-wide uppercase"
            >
              The Name Says It All
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-8"
            >
              Creating the <span className="text-gradient">Next Wave</span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p className="text-xl font-medium text-foreground/90">
                The name <span className="font-bold text-primary">NxtWav</span> comes from 
                exactly what we stand for: creating the next wave of artists who are confident, 
                skilled, and ready for the real scene.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {["No shortcuts", "No gimmicks", "Just proper learning"].map((pill, idx) => (
                  <span key={pill} className="px-5 py-2 rounded-full border border-border bg-card/30 backdrop-blur-sm text-sm font-medium text-foreground/70">
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Cards Container */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 lg:p-12 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-foreground mb-4 uppercase tracking-tight">
                  Our <span className="text-primary">Vision</span>
                </h3>
                
                <div className="space-y-4">
                  <p className="text-lg text-foreground font-semibold leading-snug">
                    To build culturally aware, industry-ready creators and set a new global standard for creative education in India.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We bridge the gap between skill and career - training artists to move beyond classrooms into stages, platforms, and markets.
                  </p>
                </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 lg:p-12 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-all duration-300 group"
            >
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary/20 transition-colors">
                  <Target className="w-8 h-8 text-secondary" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-foreground mb-4 uppercase tracking-tight">
                  Our <span className="text-secondary">Mission</span>
                </h3>
                
                <div className="space-y-4">
                  <p className="text-lg text-foreground font-semibold leading-snug">
                    To build culturally aware, industry-ready creators and set a new global standard for creative education in India.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We bridge the gap between skill and career - training artists to move beyond classrooms into stages, platforms, and markets.
                  </p>
                </div>
            </motion.div>
          </div>

          {/* Pillars Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] text-foreground/30">
              <span className="hover:text-primary transition-colors">Learn.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
              <span className="hover:text-secondary transition-colors">Build.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
              <span className="hover:text-accent transition-colors">Perform.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
              <span className="hover:text-primary transition-colors">Release.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




export function MissionSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
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
            
            <p className="text-xl text-foreground font-semibold pt-4">
              Real exposure. The right push.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

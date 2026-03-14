import { useState } from "react";
import { Instagram, ExternalLink, X, Plus } from "lucide-react";
import { founders, Founder } from "@/data/founders";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function FoundersSection() {
  const [activeFounder, setActiveFounder] = useState<string | null>(null);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  return (
    <section id="founders" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Meet the Team
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            The <span className="text-gradient">Founders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry insiders who've walked the path, and now guide the next generation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {founders.map((founder, index) => {
            const colors = ["primary", "secondary", "accent"];
            const colorClass = colors[index % 3];
            const isActive = activeFounder === founder.id;

            return (
              <Dialog key={founder.id}>
                <DialogTrigger asChild>
                  <div
                    className={cn(
                      "group relative rounded-2xl overflow-hidden bg-card border transition-all duration-500 cursor-pointer",
                      isActive 
                        ? `border-${colorClass}/50 shadow-lg` 
                        : "border-border hover:border-muted-foreground/30"
                    )}
                    onMouseEnter={() => setActiveFounder(founder.id)}
                    onMouseLeave={() => setActiveFounder(null)}
                    onClick={() => setSelectedFounder(founder)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={founder.photo}
                        alt={founder.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Plus className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Color accent bar */}
                      <div className={cn(
                        "absolute bottom-0 left-0 right-0 h-1 transition-all duration-300",
                        colorClass === "primary" && "bg-primary",
                        colorClass === "secondary" && "bg-secondary",
                        colorClass === "accent" && "bg-accent",
                        isActive ? "opacity-100" : "opacity-50"
                      )} />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {founder.name}
                          </h3>
                          <p className={cn(
                            "font-medium text-sm",
                            colorClass === "primary" && "text-primary",
                            colorClass === "secondary" && "text-secondary",
                            colorClass === "accent" && "text-accent",
                          )}>
                            {founder.stageName}
                          </p>
                        </div>
                        
                        {/* Social Links - Stop propagation to allow clicking icons */}
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          {founder.socialLinks.instagram && (
                            <a
                              href={founder.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                            >
                              <Instagram className="w-4 h-4 text-muted-foreground" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-muted-foreground mb-3">
                        {founder.role}
                      </p>

                     

                      {/* Short Bio */}
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                        {founder.shortBio}
                      </p>

                      <button className={cn(
                        "text-xs font-bold flex items-center gap-1 group/btn",
                        colorClass === "primary" && "text-primary",
                        colorClass === "secondary" && "text-secondary",
                        colorClass === "accent" && "text-accent",
                      )}>
                        VIEW FULL BIO <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl w-[95vw] md:w-[85vw] bg-card border-border p-0 overflow-hidden shadow-2xl h-auto max-h-[90vh] md:max-h-[680px]">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Left: Image (40%) */}
                    <div className="w-full md:w-[40%] relative bg-muted h-[30vh] md:h-auto">
                      <img 
                        src={founder.photo} 
                        alt={founder.name} 
                        className="w-full h-full object-cover bg-muted/50"
                      />
                      <div className={cn(
                        "absolute bottom-0 left-0 right-0 h-2 z-10",
                        colorClass === "primary" && "bg-primary",
                        colorClass === "secondary" && "bg-secondary",
                        colorClass === "accent" && "bg-accent",
                      )} />
                    </div>

                    {/* Right: Content (60%) */}
                    <div className="w-full md:w-[60%] p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-card/95 backdrop-blur-sm overflow-hidden">
                      <div className="mb-6">
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-widest",
                          colorClass === "primary" && "text-primary",
                          colorClass === "secondary" && "text-secondary",
                          colorClass === "accent" && "text-accent",
                        )}>
                          {founder.role}
                        </span>
                        <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                          {founder.name}
                        </h2>
                        <p className="text-lg font-medium text-muted-foreground">
                          {founder.stageName}
                        </p>
                      </div>

                      <div className="space-y-3 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {founder.bio}
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/50">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-2">Core Focus</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-medium border border-border">
                            {founder.specialty}
                          </span>
                        </div>
                      </div>

                      {/* Socials in popup */}
                      <div className="mt-4 flex gap-4">
                        {founder.socialLinks.instagram && (
                          <a 
                            href={founder.socialLinks.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Instagram className="w-5 h-5" />
                            <span>Instagram</span>
                          </a>
                        )}
                        {founder.socialLinks.spotify && (
                          <a 
                            href={founder.socialLinks.spotify} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span>Artist Profile</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";

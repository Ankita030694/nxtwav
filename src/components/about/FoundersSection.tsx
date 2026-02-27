import { useState } from "react";
import { Instagram, ExternalLink } from "lucide-react";
import { founders } from "@/data/founders";
import { cn } from "@/lib/utils";

export function FoundersSection() {
  const [activeFounder, setActiveFounder] = useState<string | null>(null);

  return (
    <section className="py-24 bg-card/50">
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
              <div
                key={founder.id}
                className={cn(
                  "group relative rounded-2xl overflow-hidden bg-card border transition-all duration-500",
                  isActive 
                    ? `border-${colorClass}/50 shadow-lg` 
                    : "border-border hover:border-muted-foreground/30"
                )}
                onMouseEnter={() => setActiveFounder(founder.id)}
                onMouseLeave={() => setActiveFounder(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  


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
                    
                    {/* Social Links */}
                    <div className="flex gap-2">
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
                      {founder.socialLinks.spotify && (
                        <a
                          href={founder.socialLinks.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {founder.role}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      colorClass === "primary" && "bg-primary/10 text-primary",
                      colorClass === "secondary" && "bg-secondary/10 text-secondary",
                      colorClass === "accent" && "bg-accent/10 text-accent",
                    )}>
                      {founder.specialty}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      10+ years
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground italic border-l-2 border-muted pl-3">
                    "{founder.teachingPhilosophy}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

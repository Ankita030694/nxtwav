import { Instagram, ExternalLink } from "lucide-react";
import { faculty } from "@/data/faculty";
import { cn } from "@/lib/utils";

export function FacultySection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Learn From The Best
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Academy <span className="text-gradient">Faculty</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry veterans and accomplished artists who bring real-world expertise to your learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {faculty.map((member, index) => {
            const colors = ["secondary", "accent", "primary"];
            const colorClass = colors[index % 3];

            return (
              <div
                key={member.id}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-muted-foreground/30 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Color accent bar */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-1",
                    colorClass === "primary" && "bg-primary",
                    colorClass === "secondary" && "bg-secondary",
                    colorClass === "accent" && "bg-accent",
                  )} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {member.stageName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {member.name}
                      </p>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-2">
                      {member.socialLinks.instagram && (
                        <a
                          href={member.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                        >
                          <Instagram className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                      {member.socialLinks.spotify && (
                        <a
                          href={member.socialLinks.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </div>

                  <span className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-medium mb-3",
                    colorClass === "primary" && "bg-primary/10 text-primary",
                    colorClass === "secondary" && "bg-secondary/10 text-secondary",
                    colorClass === "accent" && "bg-accent/10 text-accent",
                  )}>
                    {member.specialty}
                  </span>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {member.bio}
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

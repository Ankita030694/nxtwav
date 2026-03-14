import { useState, useEffect } from "react";
import { Instagram, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { faculty } from "@/data/faculty";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

function FacultyImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${name} - Photo ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "w-full h-full object-cover",
            name === "Garry Bedi" && "object-top"
          )}
        />
      </AnimatePresence>
      
      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black/40 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={handleNext}
              initial={false}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover/carousel:hidden transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hidden group-hover/carousel:flex items-center justify-center text-white hover:bg-black/40 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function FacultySection() {
  return (
    <section id="faculty" className="py-24 bg-background">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {faculty.map((member) => {
            const getSpecialtyColor = (specialty: string) => {
              if (specialty === "Artist Development Programme") return "accent";
              if (specialty === "DJ Performance & Industry Mastery") return "secondary";
              if (specialty === "Music Production & Sound Design") return "primary";
              return "primary";
            };

            const colorClass = getSpecialtyColor(member.specialty);

            return (
              <div
                key={member.id}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-muted-foreground/30 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Carousel Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <FacultyImageCarousel images={member.photos} name={member.name} />
                  
                  {/* Color accent bar */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-1 z-10",
                    colorClass === "primary" && "bg-primary",
                    colorClass === "secondary" && "bg-secondary",
                    colorClass === "accent" && "bg-accent",
                  )} />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
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

                  <div className="mt-auto">
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-medium mb-3",
                      colorClass === "primary" && "bg-primary/10 text-primary",
                      colorClass === "secondary" && "bg-secondary/10 text-secondary",
                      colorClass === "accent" && "bg-accent/10 text-accent",
                    )}>
                      {member.specialty}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


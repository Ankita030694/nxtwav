import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Headphones, Star } from "lucide-react";
import { Link } from "react-router-dom";
import djSetup from "@/assets/dj-setup.jpg";
import producerStudio from "@/assets/producer-studio.jpg";
import heroStudio from "@/assets/hero-studio.jpg";

const categoryCards = [
  {
    id: "production",
    title: "Music Production Launchpad",
    description: "Master the art of music production from DAW basics to professional releases.",
    image: producerStudio,
    icon: <Music className="w-5 h-5 text-primary" />,
    href: "/courses#production",
    colorClass: "bg-primary/20",
    outcomes: [
      "DAW Fundamentals",
      "Sound Design",
      "Mixing & Mastering",
    ],
  },
  {
    id: "djing",
    title: "DJing Essentials",
    description: "Learn DJ techniques from beatmatching to commanding the crowd.",
    image: djSetup,
    icon: <Headphones className="w-5 h-5 text-secondary" />,
    href: "/courses#djing",
    colorClass: "bg-secondary/20",
    outcomes: [
      "Beatmatching & Mixing",
      "Set Construction",
      "Live Performance Skills",
    ],
  },
  {
    id: "artist-dev",
    title: "Artist Development Programme",
    description: "Build your brand and career with industry-focused training.",
    image: heroStudio,
    icon: <Star className="w-5 h-5 text-accent" />,
    href: "/courses#artist-dev",
    colorClass: "bg-accent/20",
    outcomes: [
      "Brand Building",
      "Release Strategies",
      "Music Business Fundamentals",
    ],
  }
];

export function CoursesSection() {
  return (
    <section id="courses" className="py-24 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Our Programs
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Courses Built for{" "}
              <span className="text-gradient">Your Career</span>
            </h2>
            
          </div>
          <Link to="/auth/signup">
            <Button variant="outline" className="border-border text-foreground hover:bg-muted mb-2 md:mb-0">
              View All Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categoryCards.map((category) => (
            <Link
              to="/auth/signup"
              key={category.id}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 pt-4 flex-1 flex flex-col relative -mt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border mb-6 shadow-xl relative z-10 mx-auto">
                  {category.icon}
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3 text-center">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 text-center flex-1">
                  {category.description}
                </p>

                {/* Outcomes */}
                <div className="space-y-2 mb-6">
                  {category.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span className="text-sm text-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-cta hover:opacity-90 text-primary-foreground mt-auto">
                  Explore Category
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

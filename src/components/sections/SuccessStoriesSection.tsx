import { Quote, ExternalLink, Music } from "lucide-react";

const successStories = [
  {
    id: 1,
    name: "Rohan Kapoor",
    role: "Electronic Music Producer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    story: "From Zero to Beatport Top 100 in 6 Months",
    quote: "The structured roadmap and mentor support changed everything. I went from bedroom producer to charting on Beatport with my debut EP.",
    achievement: "Beatport Top 100",
    label: "Armada Music",
    spotifyLink: "#",
  },
  {
    id: 2,
    name: "Ananya Singh",
    role: "DJ & Producer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    story: "Landed a Club Residency Within 8 Months",
    quote: "The live sessions gave me insights I couldn't get anywhere else. Now I'm a resident DJ at one of Mumbai's top clubs.",
    achievement: "Club Residency",
    label: "Kitty Su Mumbai",
    spotifyLink: "#",
  },
  {
    id: 3,
    name: "Vikram Desai",
    role: "Music Producer & Audio Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    story: "Signed to Major Label in Under a Year",
    quote: "The career roadmap showed me exactly what labels look for. I got signed to Spinnin' Records for my progressive house tracks.",
    achievement: "Label Deal",
    label: "Spinnin' Records",
    spotifyLink: "#",
  },
];

export function SuccessStoriesSection() {
  return (
    <section id="success" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real Students,{" "}
            <span className="text-gradient">Real Careers</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't take our word for it - hear from students who launched successful music careers with our help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-6" />

              {/* Quote */}
              <p className="text-foreground mb-8 leading-relaxed">
                "{story.quote}"
              </p>

              {/* Achievement badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                  {story.achievement}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  {story.label}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{story.name}</h4>
                  <p className="text-sm text-muted-foreground">{story.role}</p>
                </div>
                <a
                  href={story.spotifyLink}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-muted/80 transition-colors"
                >
                  <Music className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">50+</div>
              <p className="text-sm text-muted-foreground">Label Signings</p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">200+</div>
              <p className="text-sm text-muted-foreground">DJ Residencies</p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">₹2Cr+</div>
              <p className="text-sm text-muted-foreground">Student Earnings</p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">15+</div>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

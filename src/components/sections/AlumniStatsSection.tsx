import { Disc3, Users, Globe, Award, Music, ListMusic } from "lucide-react";

const stats = [
  {
    icon: Disc3,
    value: "28M+",
    label: "Total Streams",
    description: "Cumulative streams across all alumni releases",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Music,
    value: "450+",
    label: "Tracks Released",
    description: "Original productions by NXTwav students",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Award,
    value: "32",
    label: "Label Signings",
    description: "Artists signed to major & indie labels",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Globe,
    value: "147",
    label: "Countries",
    description: "Global listener reach across platforms",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ListMusic,
    value: "2,800+",
    label: "Playlist Features",
    description: "Editorial & algorithmic playlist placements",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Users,
    value: "89%",
    label: "Career Success",
    description: "Alumni actively earning from music",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function AlumniStatsSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Community Impact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Numbers Don't Lie
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real metrics from real artists. Our community's success speaks louder than any marketing claim.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <h3 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-medium text-foreground mb-2">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Motivational CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl text-muted-foreground">
            These aren't just numbers - they're <span className="text-foreground font-medium">dreams realized</span>.
            <br />
            <span className="text-primary">Your story could be next.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

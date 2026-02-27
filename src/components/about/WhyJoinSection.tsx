import { Users, Star, Target, UserCheck, Network, Heart } from "lucide-react";

const points = [
  {
    icon: Users,
    title: "Founders Are Working Artists",
    description: "Learn from mentors who are actively performing and producing, not just teaching from textbooks.",
  },
  {
    icon: Star,
    title: "Real-World Experience",
    description: "Our curriculum is built from years in clubs, festivals, weddings, and tours, not academic theory.",
  },
  {
    icon: Target,
    title: "Career-Focused Training",
    description: "We prepare you for the industry, not just teach you skills. From branding to bookings, we cover it all.",
  },
  {
    icon: UserCheck,
    title: "Small Batch Cohorts",
    description: "Personalized attention in every session. No mass courses, just focused mentorship.",
  },
  {
    icon: Network,
    title: "Industry Connections",
    description: "Access to our network of venues, labels, and industry professionals for real opportunities.",
  },
  {
    icon: Heart,
    title: "Community of Serious Students",
    description: "Join a network of like-minded artists committed to growth and supporting each other.",
  },
];

export function WhyJoinSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Join <span className="text-gradient">NxtWav</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What makes us different from every other music course out there.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {points.map((point, index) => (
            <div
              key={point.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <point.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

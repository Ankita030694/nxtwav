import { Sliders, Briefcase, Megaphone, Theater } from "lucide-react";

const cards = [
  {
    icon: Sliders,
    title: "Technical Skills",
    description: "Master the tools of the trade, from DAWs to DJ equipment, sound design to mixing.",
  },
  {
    icon: Briefcase,
    title: "Industry Knowledge",
    description: "Understand how the music business works, labels, booking, licensing, and more.",
  },
  {
    icon: Megaphone,
    title: "Artist Branding",
    description: "Build your identity, develop your image, and create a brand that stands out.",
  },
  {
    icon: Theater,
    title: "Real-World Experience",
    description: "Learn what actually matters when you step behind the console or walk into a studio.",
  },
];

export function WhatWeTeach() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            What We Teach
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            More Than Just <span className="text-gradient">Software & Equipment</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To build culturally aware, industry-ready creators and set a new global standard for creative education in India.
We bridge the gap between skill and career - training artists to move beyond classrooms into stages, platforms, and markets.

          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <card.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

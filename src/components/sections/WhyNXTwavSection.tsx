import { CheckCircle, Target, Radio, TrendingUp } from "lucide-react";

const differentiators = [
  {
    icon: Target,
    title: "Guaranteed Career Outcomes",
    description: "Unlike generic courses, we provide mentorship, industry connections, and placement support. Our students don't just learn - they launch careers.",
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Structured Career Roadmaps",
    description: "Follow our proven path: Producer → First Releases → Label Deals → Revenue Diversification. Every step mapped, every milestone tracked.",
    color: "secondary",
  },
  {
    icon: Radio,
    title: "Live in the Studio Sessions",
    description: "Watch our founders produce music live every month. Ask questions in real-time. See the creative process unfold - no pre-recorded fluff.",
    color: "accent",
  },
];

export function WhyNXTwavSection() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Why NXTwav Academy
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            While Others Teach Courses,{" "}
            <span className="text-gradient">We Launch Careers</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We identified three critical gaps in music education. Here's how we fill them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-${item.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-7 h-7 text-${item.color}`} />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {item.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

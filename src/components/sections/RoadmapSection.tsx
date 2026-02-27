import { ArrowRight, CheckCircle, Star, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";

const roadmapSteps = [
  {
    id: 1,
    title: "Beginner Course",
    duration: "Month 1-3",
    description: "Master the fundamentals of music production or DJing",
    icon: Star,
    color: "primary",
    outcomes: ["Software proficiency", "Basic composition", "Sound design intro"],
  },
  {
    id: 2,
    title: "Intermediate Course",
    duration: "Month 4-6",
    description: "Develop your unique sound and advanced techniques",
    icon: Zap,
    color: "secondary",
    outcomes: ["Genre specialization", "Mixing techniques", "Arrangement mastery"],
  },
  {
    id: 3,
    title: "First Original Release",
    duration: "Month 7-8",
    description: "Produce and release your first commercial-ready track",
    icon: CheckCircle,
    color: "accent",
    outcomes: ["Complete original track", "Distribution setup", "Release strategy"],
  },
  {
    id: 4,
    title: "Label Submissions",
    duration: "Month 9-10",
    description: "Submit to labels or launch independent releases",
    icon: ArrowRight,
    color: "primary",
    outcomes: ["Label research", "Pitch preparation", "PR basics"],
  },
  {
    id: 5,
    title: "Revenue Diversification",
    duration: "Month 11-12",
    description: "Build multiple income streams from your music career",
    icon: Crown,
    color: "secondary",
    outcomes: ["Sync licensing", "Production services", "DJ bookings"],
  },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Your Career Roadmap
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            From Zero to{" "}
            <span className="text-gradient">Full-Time Musician</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A structured 12-month journey with milestones, mentor check-ins, and guaranteed progress.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {roadmapSteps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              key={step.id}
              className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Icon */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                <div className={`w-8 h-8 rounded-full bg-${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-4 h-4 text-background" />
                </div>
              </div>

              {/* Content */}
              <div className={`ml-20 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary">{step.duration}</span>
                    <span className="text-xs text-muted-foreground">Step {step.id}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.outcomes.map((outcome) => (
                      <span
                        key={outcome}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

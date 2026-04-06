import { useState } from "react";
import { Check, X, Headphones, Music, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadFormSheet } from "@/components/LeadFormSheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { courses, formatPrice } from "@/data/courses";

const getPrice = (id: string) => {
  const course = courses.find(c => c.id === id);
  return course ? course.price : 0;
};

const getFormattedPrice = (id: string) => {
  const course = courses.find(c => c.id === id);
  return course ? formatPrice(course.price) : "₹0";
};

const getOriginalFormattedPrice = (id: string) => {
  const course = courses.find(c => c.id === id);
  return course?.originalPrice ? formatPrice(course.originalPrice) : undefined;
};

const productionPlans = [
  {
    id: "daw-fundamentals",
    name: "DAW Fundamentals",
    description: "Beginners exploring music production",
    price: getPrice("daw-fundamentals"),
    displayPrice: getFormattedPrice("daw-fundamentals"),
    originalDisplayPrice: getOriginalFormattedPrice("daw-fundamentals"),
    period: "/ 1 month",
    popular: false,
  },
  {
    id: "intro-to-music-production",
    name: "Production Pro",
    description: "Building a strong foundation",
    price: getPrice("intro-to-music-production"),
    displayPrice: getFormattedPrice("intro-to-music-production"),
    originalDisplayPrice: getOriginalFormattedPrice("intro-to-music-production"),
    period: "/ 3 months",
    popular: true,
  },
  {
    id: "advanced-production-mastery",
    name: "Elite Mastery",
    description: "Professional-level mastery",
    price: getPrice("advanced-production-mastery"),
    displayPrice: getFormattedPrice("advanced-production-mastery"),
    originalDisplayPrice: getOriginalFormattedPrice("advanced-production-mastery"),
    period: "/ 5 months",
    popular: false,
  },
];

const djingPlans = [
  {
    id: "dj-beginner",
    name: "DJ Foundations",
    description: "Technical foundations & clean mixing",
    price: getPrice("dj-beginner"),
    displayPrice: getFormattedPrice("dj-beginner"),
    originalDisplayPrice: getOriginalFormattedPrice("dj-beginner"),
    period: "/ 4 weeks",
    popular: false,
  },
  {
    id: "dj-artistry-program",
    name: "DJ Artistry",
    description: "Transform into a performance artist",
    price: getPrice("dj-artistry-program"),
    displayPrice: getFormattedPrice("dj-artistry-program"),
    originalDisplayPrice: getOriginalFormattedPrice("dj-artistry-program"),
    period: "/ 8 weeks",
    popular: true,
  },
];

const productionComparison = [
  { feature: "Duration", values: ["1 Month", "3 Months", "5 Months"] },
  { feature: "Sessions/Week", values: ["3", "3", "3"] },
  { feature: "Total Depth", values: ["Basic", "Structured", "Professional"] },
  { feature: "DAW Navigation", values: [true, true, true] },
  { feature: "Sound Design", values: [false, true, true] },
  { feature: "Mixing", values: ["Basic", "Intermediate", "Advanced"] },
  { feature: "Portfolio", values: [false, false, true] },
  { feature: "Mentorship", values: [false, "Limited", true] },
  { feature: "Certification", values: [true, true, true] },
];

const djingComparison = [
  { feature: "Duration", values: ["4 Weeks", "8 Weeks"] },
  { feature: "Total Sessions", values: ["8 Sessions", "16 Sessions"] },
  { feature: "Beatmatching", values: [true, true] },
  { feature: "Effects Mastery", values: [false, true] },
  { feature: "Live Showcase", values: ["30-min", "60-min"] },
  { feature: "Professional Mixtape", values: [false, true] },
  { feature: "Branding", values: [false, true] },
  { feature: "Booking Guidance", values: [false, true] },
  { feature: "Certification", values: [true, true] },
];

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<"production" | "djing">("production");

  const renderComparisonTable = (plans: any[], data: any[]) => (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-6 px-6 text-left text-muted-foreground text-xs font-semibold bg-muted/10 border-b border-border min-w-[150px]">
                Features
              </th>
              {plans.map(plan => (
                <th key={plan.id} className={cn("py-6 px-6 text-center bg-muted/10 border-b border-border min-w-[140px]", plan.popular && "relative")}>
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-cta" />
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <span className={cn("font-display text-sm font-bold", plan.popular ? "text-primary" : "text-foreground")}>
                      {plan.name}
                    </span>
                    <div className="flex flex-col items-center">
                       {plan.originalDisplayPrice && (
                        <span className="text-[10px] text-muted-foreground line-through font-normal">
                          {plan.originalDisplayPrice}
                        </span>
                      )}
                      <span className="text-base font-bold text-foreground">{plan.displayPrice}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-muted/5 transition-colors group">
                <td className="py-4 px-6 text-foreground text-xs font-medium group-hover:text-primary transition-colors">
                  {row.feature}
                </td>
                {row.values.map((val: any, i: number) => {
                  const isPopular = plans[i].popular;
                  return (
                    <td key={i} className={cn("py-4 px-6 text-center", isPopular && "bg-primary/[0.02]")}>
                      {typeof val === 'boolean' ? (
                        val ? (
                          <div className="flex justify-center">
                            <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                              <Check className="w-3 h-3 text-accent" />
                            </div>
                          </div>
                        ) : (
                          <X className="w-3.5 h-3.5 text-muted-foreground/20 mx-auto" />
                        )
                      ) : (
                        <span className={cn("text-xs font-medium", isPopular ? "text-foreground" : "text-muted-foreground")}>
                          {val}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-amber-500/20 animate-pulse">
            Introductory Offer - Limited Time Only
          </div>
          <p className="text-muted-foreground mb-8 text-base">
            Choose the program that fits your goals. Start your journey into the music industry today.
          </p>

          <Tabs defaultValue="production" className="w-full max-w-sm mx-auto mb-12" onValueChange={(v) => setActiveCategory(v as any)}>
            <TabsList className="grid grid-cols-2 p-1 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-full">
              <TabsTrigger 
                value="production" 
                className="rounded-full data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm flex items-center justify-center gap-2 py-2 text-xs transition-all"
              >
                <Music className="w-3.5 h-3.5" />
                Production
              </TabsTrigger>
              <TabsTrigger 
                value="djing" 
                className="rounded-full data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm flex items-center justify-center gap-2 py-2 text-xs transition-all"
              >
                <Headphones className="w-3.5 h-3.5" />
                DJing
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeCategory} className="w-full">
            <TabsContent value="production" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              {renderComparisonTable(productionPlans, productionComparison)}
            </TabsContent>
            <TabsContent value="djing" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              {renderComparisonTable(djingPlans, djingComparison)}
            </TabsContent>
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-muted/10 border border-border/50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">Not sure which one to choose?</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            Our career consultants are available to guide you through the process and help select the best program for your journey.
          </p>
          <LeadFormSheet 
            trigger={
              <Button size="lg" className="bg-gradient-cta hover:opacity-90 text-primary-foreground group">
                Talk to an Expert <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}

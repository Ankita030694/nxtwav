import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Loader2, X, Music, Headphones } from "lucide-react";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { courses, formatPrice } from "@/data/courses";
import SEO from "@/components/SEO";

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

const offlineProductionPlans = [
  {
    id: "daw-fundamentals-offline",
    name: "DAW Fundamentals",
    description: "Beginners exploring music production with focus on software understanding",
    price: 39999,
    displayPrice: "₹39,999",
    originalDisplayPrice: "₹54,999",
    popular: false,
    cta: "Enroll Now",
  },
  {
    id: "intro-to-music-production-offline",
    name: "Introduction to Music Production",
    description: "Serious learners building a strong foundation in structured production",
    price: 99999,
    displayPrice: "₹99,999",
    originalDisplayPrice: "₹1,24,999",
    popular: true,
    cta: "Enroll Now",
  },
  {
    id: "advanced-production-mastery-offline",
    name: "Advanced Production Mastery",
    description: "Complete professional-level mastery for aspiring producers",
    price: 179999,
    displayPrice: "₹1,79,999",
    originalDisplayPrice: "₹2,24,999",
    popular: false,
    cta: "Enroll Now",
  },
];

const onlineProductionPlans = [
  {
    id: "daw-fundamentals-online",
    name: "DAW Fundamentals",
    description: "Beginners exploring music production with focus on software understanding",
    price: 19999,
    displayPrice: "₹19,999",
    originalDisplayPrice: "₹29,999",
    popular: false,
    cta: "Enroll Now",
  },
  {
    id: "intro-to-music-production-online",
    name: "Introduction to Music Production",
    description: "Serious learners building a strong foundation in structured production",
    price: 49999,
    displayPrice: "₹49,999",
    originalDisplayPrice: "₹89,999",
    popular: true,
    cta: "Enroll Now",
  },
  {
    id: "advanced-production-mastery-online",
    name: "Advanced Production Mastery",
    description: "Complete professional-level mastery for aspiring producers",
    price: 99999,
    displayPrice: "₹99,999",
    originalDisplayPrice: "₹1,49,999",
    popular: false,
    cta: "Enroll Now",
  },
  {
    id: "logic-pro-kickstart",
    name: "LOGIC PRO KICKSTART",
    description: "Beginners who want to learn Logic Pro basics and start making beats",
    price: 19999,
    displayPrice: "₹19,999",
    originalDisplayPrice: "₹29,999",
    popular: false,
    cta: "Enroll Now",
  },
  {
    id: "logic-pro-mastery",
    name: "LOGIC PRO MASTERY",
    description: "Serious learners who want to produce, mix, master, and build portfolio-ready tracks",
    price: 49999,
    displayPrice: "₹49,999",
    originalDisplayPrice: "₹89,999",
    popular: false,
    cta: "Enroll Now",
  },
];

const djingPlans = [
  {
    id: "dj-beginner",
    name: "DJ Beginner",
    description: "Build strong technical foundations and learn to mix clean sets with confidence.",
    price: getPrice("dj-beginner"),
    displayPrice: getFormattedPrice("dj-beginner"),
    originalDisplayPrice: getOriginalFormattedPrice("dj-beginner"),
    period: "/ 4 weeks",
    popular: false,
    cta: "Get Started",
  },
  {
    id: "advanced-djing-program",
    name: "Advanced DJing Program",
    description: "Transform from a technically good DJ into a performance-ready artist.",
    price: getPrice("advanced-djing-program"),
    displayPrice: getFormattedPrice("advanced-djing-program"),
    originalDisplayPrice: getOriginalFormattedPrice("advanced-djing-program"),
    period: "/ 8 weeks",
    popular: true,
    cta: "Enroll Now",
  },
];

const artistDevPlans = [
  {
    id: "pro-remix-alchemy",
    name: "Remix Masterclass w/ Su Real",
    description: "Master the art of remixing, edits, and mashups with a world-class producer.",
    price: getPrice("pro-remix-alchemy"),
    displayPrice: getFormattedPrice("pro-remix-alchemy"),
    originalDisplayPrice: getOriginalFormattedPrice("pro-remix-alchemy"),
    period: "/ 1 month",
    popular: true,
    cta: "Book Now",
  },
];

const offlineProductionComparison = [
  { feature: "Original Price | Discounted Price", values: ["₹54,999 | ₹39,999", "₹1,24,999 | ₹99,999", "₹2,24,999 | ₹1,79,999"] },
  { feature: "Duration", values: ["1 Month | 12 Sessions", "3 Month | 36 Sessions", "5 Month | 60 Sessions"] },
  { feature: "Sessions Per Week", values: ["3", "3", "3"] },
  { feature: "Hours Per Session", values: ["2 Hours", "2 Hours", "2 Hours"] },
  { feature: "Total Learning Depth", values: ["Basic Software Understanding", "Structured Production Training", "Professional-Level Mastery"] },
  { feature: "DAW Navigation & Workflow", values: [true, true, true] },
  { feature: "Arrangement Basics", values: [true, true, true] },
  { feature: "Sound Design Fundamentals", values: [false, true, true] },
  { feature: "Sampling & Beat Creation", values: [false, true, true] },
  { feature: "Full Track Production", values: [false, true, true] },
  { feature: "Advanced Sound Design", values: [false, false, true] },
  { feature: "Advanced Arrangement Techniques", values: [false, false, true] },
  { feature: "Mixing Techniques", values: ["Basic", "Intermediate", "Advanced / Release-Ready"] },
  { feature: "Creative Workflow Systems", values: [false, true, true] },
  { feature: "Portfolio Development", values: [false, false, "✔ (Professional Level)"] },
  { feature: "Industry-Ready Track Output", values: [false, "Partial", true] },
  { feature: "Live Performance Techniques", values: [false, false, true] },
  { feature: "Career Guidance", values: [false, "Basic Direction", "Advanced Strategy & Mentorship"] },
  { feature: "Post-Course Mentorship", values: [false, "Limited", true] },
  { feature: "Ableton License Included", values: [false, false, true] },
  { feature: "Apple Creator Studio - 1 Year Subscription", values: [false, false, false] },
  { feature: "Splice Free Samples Included", values: [false, true, true] },
  { feature: "Certification", values: [true, true, true] },
  { feature: "Best For", values: ["Beginners exploring music production", "Serious learners building strong foundation", "Aspiring professional producers"] },
];

const onlineProductionComparison = [
  { feature: "Original Price | Discounted Price", values: ["₹29,999 | ₹19,999", "₹89,999 | ₹49,999", "₹1,49,999 | ₹99,999", "₹29,999 | ₹19,999", "₹89,999 | ₹49,999"] },
  { feature: "Duration", values: ["1 Month | 12 Sessions", "3 Month | 36 Sessions", "5 Month | 60 Sessions", "1 Month | 12 Sessions", "3 Month | 36 Sessions"] },
  { feature: "Sessions Per Week", values: ["3", "3", "3", "3", "3"] },
  { feature: "Hours Per Session", values: ["2 Hours", "2 Hours", "2 Hours", "2 Hours", "2 Hours"] },
  { feature: "Total Learning Depth", values: ["Basic Software Understanding", "Structured Production Training", "Professional-Level Mastery", "Basic Software Understanding", "Professional-Level Mastery"] },
  { feature: "DAW Navigation & Workflow", values: [true, true, true, true, true] },
  { feature: "Arrangement Basics", values: [true, true, true, true, true] },
  { feature: "Sound Design Fundamentals", values: [false, true, true, true, true] },
  { feature: "Sampling & Beat Creation", values: [false, true, true, true, true] },
  { feature: "Full Track Production", values: [false, true, true, true, true] },
  { feature: "Advanced Sound Design", values: [false, false, true, true, true] },
  { feature: "Advanced Arrangement Techniques", values: [false, false, true, true, true] },
  { feature: "Mixing Techniques", values: ["Basic", "Intermediate", "Advanced / Release-Ready", "Basic", "Advanced / Release-Ready"] },
  { feature: "Creative Workflow Systems", values: [false, true, true, true, true] },
  { feature: "Portfolio Development", values: [false, false, "✔ (Professional Level)", false, true] },
  { feature: "Industry-Ready Track Output", values: [false, "Partial", true, false, true] },
  { feature: "Live Performance Techniques", values: [false, false, true, false, false] },
  { feature: "Career Guidance", values: [false, "Basic Direction", "Advanced Strategy & Mentorship", false, true] },
  { feature: "Post-Course Mentorship", values: [false, "Limited", true, false, true] },
  { feature: "Ableton License Included", values: [false, false, true, false, false] },
  { feature: "Apple Creator Studio - 1 Year Subscription", values: [false, false, false, false, true] },
  { feature: "Splice Free Samples Included", values: [false, true, true, true, true] },
  { feature: "Certification", values: [true, true, true, true, true] },
  { feature: "Best For", values: [
    "Beginners exploring music production", 
    "Serious learners building strong foundation", 
    "Aspiring professional producers", 
    "Beginners who want to learn Logic Pro basics and start making beats", 
    "Serious learners who want to produce, mix, master, and build portfolio-ready tracks"
  ] },
];

const djingComparison = [
  { feature: "Price", values: [
    courses.find(c => c.id === "dj-beginner")?.originalPrice ? `${formatPrice(courses.find(c => c.id === "dj-beginner")!.originalPrice!)} ${getFormattedPrice("dj-beginner")}` : getFormattedPrice("dj-beginner"),
    courses.find(c => c.id === "advanced-djing-program")?.originalPrice ? `${formatPrice(courses.find(c => c.id === "advanced-djing-program")!.originalPrice!)} ${getFormattedPrice("advanced-djing-program")}` : getFormattedPrice("advanced-djing-program")
  ] },
  { feature: "Duration", values: ["4 Weeks", "8 Weeks"] },
  { feature: "Total Sessions", values: ["8 Sessions", "16 Sessions"] },
  { feature: "Manual Beatmatching", values: [true, true] },
  { feature: "EQ Mixing & Clean Transitions", values: [true, true] },
  { feature: "Phrasing & Phrasing Structure", values: [true, true] },
  { feature: "Basic Looping", values: [true, true] },
  { feature: "Emergency DJ Techniques", values: [true, true] },
  { feature: "Intro to Beat FX & Color FX", values: [true, true] },
  { feature: "Library Preparation (Rekordbox)", values: [true, true] },
  { feature: "Harmonic Mixing (Camelot)", values: [true, true] },
  { feature: "Mixing in Key", values: [false, true] },
  { feature: "Advanced FX Mastery", values: [false, true] },
  { feature: "Portfolio Listing", values: [true, true] },
  { feature: "Memory Cues & Hot Cues", values: [false, true] },
  { feature: "Grid Alignment & Mapping", values: [false, true] },
  { feature: "Advanced Looping & Rolls", values: [false, true] },
  { feature: "Creative Sampling", values: [false, true] },
  { feature: "Genre & BPM Transitions", values: [false, true] },
  { feature: "Live Practice Evaluation", values: ["30-min set", "60-min showcase"] },
  { feature: "Basic Scratching (Vinyl)", values: [false, true] },
  { feature: "Professional Mixtape", values: [false, true] },
  { feature: "Branding & Identity", values: [false, true] },
  { feature: "Booking & Career Guidance", values: [false, true] },
  { feature: "Industry AMA / Guest", values: [false, true] },
  { feature: "Graduation Certificate", values: [true, true] },
];

const artistDevComparison = [
  { feature: "Price", values: [courses.find(c => c.id === "pro-remix-alchemy")?.originalPrice ? `${formatPrice(courses.find(c => c.id === "pro-remix-alchemy")!.originalPrice!)} ${getFormattedPrice("pro-remix-alchemy")}` : getFormattedPrice("pro-remix-alchemy")] },
  { feature: "Duration", values: ["1 Month"] },
  { feature: "Total Sessions", values: ["8 Sessions"] },
  { feature: "Format", values: ["Intensive Masterclass"] },
  { feature: "Software Used", values: ["Logic Pro X (Open to all DAWs)"] },
  { feature: "Remixing Techniques", values: [true] },
  { feature: "Stem Separation", values: [true] },
  { feature: "Mashups & Edits", values: [true] },
  { feature: "Advanced Creative FX", values: [true] },
  { feature: "Mixdown & Mastering", values: [true] },
  { feature: "Compilation Album Feature", values: [true] },
  { feature: "Distribution Guidance", values: [true] },
  { feature: "Mentorship w/ Su Real", values: [true] },
  { feature: "Certification", values: [true] },
];

const Pricing = () => {
  const { initiatePayment, isLoading } = useRazorpay();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<"production" | "djing">("production");
  const [productionMode, setProductionMode] = useState<"offline" | "online">("offline");

  const handlePurchase = async (plan: any) => {
    await initiatePayment({
      id: plan.id,
      name: plan.name,
      amount: plan.price,
    });
  };

  const renderComparisonTable = (plans: any[], data: any[]) => (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 text-left text-muted-foreground text-[10px] uppercase tracking-wider font-semibold bg-muted/10 border-b border-border min-w-[150px]">
                Features / Benefits
              </th>
              {plans.map(plan => (
                <th 
                  key={plan.id} 
                  className={cn("py-4 px-4 text-center bg-muted/10 border-b border-border min-w-[130px]", plan.popular && "relative")}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-cta" />
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <span className={cn("font-display text-sm font-bold", plan.popular ? "text-primary" : "text-foreground")}>
                      {plan.name}
                    </span>
                    <div className="flex flex-col items-center">
                      {plan.originalDisplayPrice && (
                        <span className="text-xs text-muted-foreground line-through font-normal mb-0.5">
                          {plan.originalDisplayPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold text-foreground">{plan.displayPrice}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-muted/5 transition-colors group">
                <td className="py-2.5 px-6 text-foreground text-[11px] font-medium group-hover:text-primary transition-colors">
                  {row.feature}
                </td>
                {row.values.map((val, i) => {
                  const isPopular = plans[i].popular;
                  return (
                    <td 
                      key={i} 
                      className={cn("py-2.5 px-6 text-center", isPopular && "bg-primary/[0.02]")}
                    >
                      {typeof val === 'boolean' ? (
                        val ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-accent" />
                            </div>
                          </div>
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground/20 mx-auto" />
                        )
                      ) : (
                        <span className={cn("text-[11px] font-medium leading-tight block", isPopular ? "text-foreground" : "text-muted-foreground")}>
                          {typeof val === 'string' && val.includes(' | ') ? (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="text-[10px] text-muted-foreground/60 line-through">{val.split('|')[0].trim()}</span>
                              <span className="text-foreground font-bold">{val.split('|')[1].trim()}</span>
                            </div>
                          ) : typeof val === 'string' && val.includes(' ₹') ? (
                            <>
                              <span className="line-through text-muted-foreground/60 mr-1.5">{val.split(' ')[0]}</span>
                              <span>{val.split(' ')[1]}</span>
                            </>
                          ) : val}
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
    <main className="min-h-screen bg-background">
      <SEO 
        title="Pricing & Course Comparison | NXTwav Academy"
        description="Compare our music production and DJing programs. Find the perfect fit for your skill level and career goals with transparent pricing and detailed feature comparisons."
        keywords="music production course fees, DJ course price India, music academy pricing, Ableton course cost"
      />
      <Navigation />
      
      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium mb-3">
            Simple Pricing
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Compare Our <span className="text-gradient">Programs</span>
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-amber-500/20 animate-pulse">
            <Sparkles className="w-3 h-3" />
            Introductory Offer - Limited Time Only
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the right path for your journey. From DJing fundamentals to 
            professional music production mastery.
          </p>

          <Tabs defaultValue="production" className="w-full max-w-sm mx-auto" onValueChange={(v) => setActiveCategory(v as any)}>
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
      </section>

      {/* Pricing Comparison Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {activeCategory === "production" ? "Production Comparison" : "DJing Comparison"}
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                Compare every feature and benefit to find the perfect fit.
              </p>
            </div>
            
            <Tabs value={activeCategory} className="w-full">
              <TabsContent value="production" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="flex justify-center mb-8">
                  <div className="inline-flex p-1 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-xl">
                    <button
                      onClick={() => setProductionMode("offline")}
                      className={cn(
                        "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                        productionMode === "offline" 
                          ? "bg-background text-primary shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      OFFLINE
                    </button>
                    <button
                      onClick={() => setProductionMode("online")}
                      className={cn(
                        "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                        productionMode === "online" 
                          ? "bg-background text-primary shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      ONLINE
                    </button>
                  </div>
                </div>
                {productionMode === "offline" 
                  ? renderComparisonTable(offlineProductionPlans, offlineProductionComparison)
                  : renderComparisonTable(onlineProductionPlans, onlineProductionComparison)
                }
              </TabsContent>
              <TabsContent value="djing" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                {renderComparisonTable(djingPlans, djingComparison)}
              </TabsContent>
            </Tabs>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-muted/10 border border-border/50 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Not sure which one to choose?</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Our career consultants are available to guide you through the process and help select the best program for your current skill level and future ambitions.
            </p>
            <Button size="lg" className="bg-gradient-cta hover:opacity-90 text-primary-foreground group" asChild>
              <Link to="/auth/signup" className="flex items-center gap-2">
                Talk to an Expert <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Questions about pricing?
          </h2>
          <p className="text-muted-foreground mb-6">
            Check out our FAQ or get in touch with our team.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="border-border text-foreground hover:bg-muted" asChild>
              <Link to="/#faq">View FAQ</Link>
            </Button>
            <Button className="bg-gradient-cta hover:opacity-90 text-primary-foreground" asChild>
              <Link to="/auth/signup">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Pricing;

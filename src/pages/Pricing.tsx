import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Loader2, X } from "lucide-react";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    id: "daw-fundamentals",
    name: "DAW Fundamentals",
    description: "Beginners exploring music production with focus on software understanding",
    price: 39999,
    displayPrice: "₹39,999",
    period: "/ 1 month",
    popular: false,
    features: [
      "1 Month Duration",
      "3 Sessions Per Week (2 Hours each)",
      "DAW Navigation & Workflow",
      "Arrangement Basics",
      "Basic Mixing Techniques",
      "Official Certification",
    ],
    cta: "Get Started",
  },
  {
    id: "intro-production",
    name: "Introduction to Music Production",
    description: "Serious learners building a strong foundation in structured production",
    price: 99999,
    displayPrice: "₹99,999",
    period: "/ 3 months",
    popular: true,
    features: [
      "3 Months Duration",
      "3 Sessions Per Week (2 Hours each)",
      "Sound Design Fundamentals",
      "Sampling & Beat Creation",
      "Full Track Production",
      "Intermediate Mixing Techniques",
      "Creative Workflow Systems",
      "Splice Free Samples Included",
      "Official Certification",
    ],
    cta: "Enroll Now",
  },
  {
    id: "advanced-mastery",
    name: "Advanced Production Mastery",
    description: "Complete professional-level mastery for aspiring producers",
    price: 179999,
    displayPrice: "₹1,79,999",
    period: "/ 5 months",
    popular: false,
    features: [
      "5 Months Duration",
      "3 Sessions Per Week (2 Hours each)",
      "Advanced Sound Design",
      "Advanced Arrangement Techniques",
      "Advanced / Release-Ready Mixing",
      "Professional Portfolio Development",
      "Live Performance Techniques",
      "Advanced Strategy & Mentorship",
      "Ableton License Included",
      "Official Certification",
    ],
    cta: "Apply Now",
  },
];

const comparisonData = [
  { feature: "Price", values: ["₹39,999", "₹99,999", "₹1,79,999"] },
  { feature: "Duration", values: ["1 Month", "3 Months", "5 Months"] },
  { feature: "Sessions Per Week", values: ["3", "3", "3"] },
  { feature: "Hours Per Session", values: ["2 Hours", "2 Hours", "2 Hours"] },
  { feature: "Total Learning Depth", values: ["Basic Software", "Structured Training", "Professional Mastery"] },
  { feature: "DAW Navigation & Workflow", values: [true, true, true] },
  { feature: "Arrangement Basics", values: [true, true, true] },
  { feature: "Sound Design Fundamentals", values: [false, true, true] },
  { feature: "Sampling & Beat Creation", values: [false, true, true] },
  { feature: "Full Track Production", values: [false, true, true] },
  { feature: "Advanced Sound Design", values: [false, false, true] },
  { feature: "Advanced Arrangement", values: [false, false, true] },
  { feature: "Mixing Techniques", values: ["Basic", "Intermediate", "Advanced / Release-Ready"] },
  { feature: "Creative Workflow Systems", values: [false, true, true] },
  { feature: "Portfolio Development", values: [false, false, "Professional Level"] },
  { feature: "Industry-Ready Track", values: [false, "Partial", true] },
  { feature: "Live Performance", values: [false, false, true] },
  { feature: "Career Guidance", values: [false, "Basic Direction", "Advanced / Mentorship"] },
  { feature: "Post-Course Mentorship", values: [false, "Limited", true] },
  { feature: "Ableton License", values: [false, false, true] },
  { feature: "Splice Free Samples", values: [false, true, false] },
  { feature: "Certification", values: [true, true, true] },
  { feature: "Best For", values: ["Beginners", "Serious learners", "Aspiring professionals"] },
];

const Pricing = () => {
  const { initiatePayment, isLoading } = useRazorpay();
  const { user } = useAuth();

  const handlePurchase = async (plan: typeof pricingPlans[0]) => {
    await initiatePayment({
      id: plan.id,
      name: plan.name,
      amount: plan.price,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Music Production{" "}
            <span className="text-gradient">Launchpad</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the right path for your musical journey. From fundamentals to 
            professional mastery, we have a plan designed to launch your career.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
        

          {/* Detailed Comparison Table */}
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Comparison
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">Detailed Comparison</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Compare every feature to find the perfect fit for your goals.</p>
            </div>
            
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="py-8 px-8 text-left text-muted-foreground font-semibold bg-muted/10 border-b border-border">
                        Features / Benefits
                      </th>
                      {pricingPlans.map(plan => (
                        <th 
                          key={plan.id} 
                          className={`py-8 px-8 text-center bg-muted/10 border-b border-border ${
                            plan.popular ? "relative" : ""
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-cta" />
                          )}
                          <div className="flex flex-col items-center gap-2">
                            <span className={`font-display text-lg font-bold ${plan.popular ? "text-primary" : "text-foreground"}`}>
                              {plan.name}
                            </span>
                            <span className="text-2xl font-bold text-foreground">{plan.displayPrice}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="hover:bg-muted/5 transition-colors group">
                        <td className="py-5 px-8 text-foreground font-medium group-hover:text-primary transition-colors">
                          {row.feature}
                        </td>
                        {row.values.map((val, i) => {
                          const isPopular = pricingPlans[i].popular;
                          return (
                            <td 
                              key={i} 
                              className={`py-5 px-8 text-center ${
                                isPopular ? "bg-primary/[0.02]" : ""
                              }`}
                            >
                              {typeof val === 'boolean' ? (
                                val ? (
                                  <div className="flex justify-center">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                      <Check className="w-5 h-5 text-accent" />
                                    </div>
                                  </div>
                                ) : (
                                  <X className="w-5 h-5 text-muted-foreground/20 mx-auto" />
                                )
                              ) : (
                                <span className={`text-sm font-medium ${isPopular ? "text-foreground" : "text-muted-foreground"}`}>
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
          </div>

          {/* Guarantee */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-xl">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">14-Day Money-Back Guarantee</p>
                <p className="text-sm text-muted-foreground">Not satisfied? Get a full refund, no questions asked.</p>
              </div>
            </div>
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
            <Button className="bg-gradient-cta hover:opacity-90 text-primary-foreground">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Pricing;

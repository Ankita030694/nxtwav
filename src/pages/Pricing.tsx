import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    id: "self-paced",
    name: "Self-Paced",
    description: "Learn at your own speed with lifetime access to all recorded content",
    price: 14999,
    displayPrice: "₹14,999",
    period: "one-time",
    popular: false,
    features: [
      "All recorded course content",
      "Lifetime access",
      "Community forum access",
      "Course project templates",
      "Certificate of completion",
    ],
    cta: "Get Started",
  },
  {
    id: "live-mentorship",
    name: "Live Mentorship",
    description: "Join live sessions with expert feedback and personalized guidance",
    price: 4999,
    displayPrice: "₹4,999",
    period: "/month",
    popular: true,
    features: [
      "Everything in Self-Paced",
      "3x weekly live group sessions",
      "Track feedback from mentors",
      "Monthly founder sessions access",
      "Private Discord community",
      "Career roadmap guidance",
    ],
    cta: "Start Free Trial",
  },
  {
    id: "one-on-one",
    name: "1-on-1 Mentorship",
    description: "Personal attention from industry professionals for accelerated growth",
    price: 19999,
    displayPrice: "₹19,999",
    period: "/month",
    popular: false,
    features: [
      "Everything in Live Mentorship",
      "Weekly 1-on-1 sessions",
      "Personalized track reviews",
      "Career planning & strategy",
      "Industry introductions",
      "Label submission support",
      "Priority support",
    ],
    cta: "Schedule a Call",
  },
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
            Invest in Your{" "}
            <span className="text-gradient">Music Career</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible plans designed to match your learning style and career goals. 
            All plans include our 14-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/10 to-card border-2 border-primary"
                    : "bg-card border border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-cta text-primary-foreground text-sm font-medium rounded-full">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-4xl font-bold text-foreground">
                      {plan.displayPrice}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {user ? (
                  <Button
                    onClick={() => handlePurchase(plan)}
                    disabled={isLoading}
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-cta hover:opacity-90 text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    {plan.cta}
                    {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                ) : (
                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-cta hover:opacity-90 text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    <Link to="/auth/signup">
                      Sign up to Purchase
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            ))}
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

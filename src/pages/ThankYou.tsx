import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, Home } from "lucide-react";
import ParticleBackground from "@/components/ui/particle-background";
import SEO from "@/components/SEO";
import nxtwavLogo from "@/assets/nxtwav-logo-v2.png";

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasSubmitted = location.state?.submitted;

  useEffect(() => {
    if (!hasSubmitted) {
      navigate("/auth/signup", { replace: true });
    } else {
      // Track Lead conversion on successful submission for Meta Pixel
      if (typeof window !== 'undefined' && 'fbq' in window) {
        // @ts-ignore
        window.fbq('track', 'Lead');
      }
    }
  }, [hasSubmitted, navigate]);

  if (!hasSubmitted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <SEO 
        title="Thank You | NXTwav Academy"
        description="Thank you for getting in touch with NXTwav Academy."
        noindex={true}
        trackEvent={{ name: 'generate_lead', params: { page_path: '/thank-you' } }}
      />
      <ParticleBackground />
      
      <Card className="w-full max-w-lg relative z-10 bg-card/95 backdrop-blur-xl border-border animate-in fade-in zoom-in duration-500">
        <CardHeader className="text-center space-y-4 pb-2">
          <Link to="/" className="inline-block mx-auto mb-4">
            <img 
              src={nxtwavLogo} 
              alt="NXTwav Academy" 
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex justify-center mb-2">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-green-500 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-3xl font-display bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Thank You!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've received your information successfully. Our team will review your request and get back to you within 24-48 hours.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <Button asChild variant="outline" className="border-border/50 hover:bg-white/5">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button asChild className="bg-gradient-cta hover:opacity-90 text-primary-foreground group">
              <Link to="/courses" className="flex items-center gap-2">
                Explore Courses
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

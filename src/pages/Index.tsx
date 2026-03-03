import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { WhyNXTwavSection } from "@/components/sections/WhyNXTwavSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { LiveSessionsSection } from "@/components/sections/LiveSessionsSection";
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { WhyJoinSection } from "@/components/about/WhyJoinSection";
import { ConsultationButton } from "@/components/ConsultationButton";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const scrollWithRetries = (retries = 0) => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          setTimeout(() => {
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 100);
        } else if (retries < 10) {
          setTimeout(() => scrollWithRetries(retries + 1), 200);
        }
      };

      scrollWithRetries();
    }
  }, [location.hash]);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <RoadmapSection />
      <WhyNXTwavSection />
      <CoursesSection />
        <WhyJoinSection />
      {/* <LiveSessionsSection /> */}
      {/* <SuccessStoriesSection /> */}
      <FAQSection />
      <CTASection />
      <Footer />
      <ConsultationButton />
    </main>
  );
};

export default Index;

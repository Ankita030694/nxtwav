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

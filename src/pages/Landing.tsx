import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LandingHero } from "@/components/sections/LandingHero";
import { WhyNXTwavSection } from "@/components/sections/WhyNXTwavSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { WhyJoinSection } from "@/components/about/WhyJoinSection";
import { WhatWeTeach } from "@/components/about/WhatWeTeach";
import { MissionSection } from "@/components/about/MissionSection";
import { FoundersSection } from "@/components/about/FoundersSection";
import { FacultySection } from "@/components/about/FacultySection";
import { PartnersSection } from "@/components/about/PartnersSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import SEO from "@/components/SEO";

const Landing = () => {
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
      <SEO 
        title="NXTwav Academy | Master Music Production & DJing in India"
        description="Level up your music career with NXTwav Academy. Professional music production and DJ courses with industry roadmaps and career guidance. Join the next wave of music producers."
        keywords="music production course, music academy India, DJ training, Ableton course, music career, music producer school"
      />
      <Navigation />
      <LandingHero />
      <WhyNXTwavSection />
      <CoursesSection />
      <WhyJoinSection />
      <WhatWeTeach />
      <MissionSection />
      <FoundersSection />
      <FacultySection />
      <PartnersSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Landing;

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { WhatWeTeach } from "@/components/about/WhatWeTeach";
import { MissionSection } from "@/components/about/MissionSection";
import { FoundersSection } from "@/components/about/FoundersSection";
import { FacultySection } from "@/components/about/FacultySection";
import { WhyJoinSection } from "@/components/about/WhyJoinSection";
import { AboutCTA } from "@/components/about/AboutCTA";
import { CTASection } from "@/components/sections/CTASection";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <AboutHero />
      <AboutStory />
      <WhatWeTeach />
      <MissionSection />
      <FoundersSection />
      <FacultySection />
    
      <CTASection />
      <Footer />
    </main>
  );
};

export default About;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { WhatWeTeach } from "@/components/about/WhatWeTeach";
import { MissionSection } from "@/components/about/MissionSection";
import { FoundersSection } from "@/components/about/FoundersSection";
import { FacultySection } from "@/components/about/FacultySection";
import { PartnersSection } from "@/components/about/PartnersSection";
import { WhyJoinSection } from "@/components/about/WhyJoinSection";
import { AboutCTA } from "@/components/about/AboutCTA";
import { CTASection } from "@/components/sections/CTASection";
import SEO from "@/components/SEO";

const About = () => {
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
          setTimeout(() => scrollWithRetries(retries + 1), 100);
        }
      };

      scrollWithRetries();
    }
  }, [location.hash]);

  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="About NXTwav Academy | Our Mission & Founders"
        description="Learn about NXTwav Academy's mission to empower the next generation of music creators. Meet our founders and discover why we're India's premier music production school."
        keywords="NXTwav founders, music production school India, music education, music coaching India"
      />
      <Navigation />
      <AboutHero />
      <AboutStory />
      <WhatWeTeach />
      <MissionSection />
      <FoundersSection />
      <FacultySection />
      <PartnersSection />
    
      <CTASection />
      <Footer />
    </main>
  );
};

export default About;

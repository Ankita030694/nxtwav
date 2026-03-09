import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SocialHeroSection } from "@/components/sections/SocialHeroSection";
import { TrendingFeedSection } from "@/components/sections/TrendingFeedSection";
import { ViralHitsSection } from "@/components/sections/ViralHitsSection";
import { AlumniStatsSection } from "@/components/sections/AlumniStatsSection";
import { CommunityCtaSection } from "@/components/sections/CommunityCtaSection";
import SEO from "@/components/SEO";

const SocialCorner = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Social Corner | NXTwav Academy Student Success"
        description="See what our students are creating! Explore viral hits from our alumni, community trends, and success stories from the NXTwav Academy."
        keywords="NXTwav alumni, music production success stories, music community India, student music releases"
      />
      <Navigation />
      <SocialHeroSection />
      <TrendingFeedSection />
      <ViralHitsSection />
      <AlumniStatsSection />
      <CommunityCtaSection />
      <Footer />
    </main>
  );
};

export default SocialCorner;

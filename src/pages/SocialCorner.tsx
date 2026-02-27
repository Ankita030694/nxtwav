import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SocialHeroSection } from "@/components/sections/SocialHeroSection";
import { TrendingFeedSection } from "@/components/sections/TrendingFeedSection";
import { ViralHitsSection } from "@/components/sections/ViralHitsSection";
import { AlumniStatsSection } from "@/components/sections/AlumniStatsSection";
import { CommunityCtaSection } from "@/components/sections/CommunityCtaSection";

const SocialCorner = () => {
  return (
    <main className="min-h-screen bg-background">
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

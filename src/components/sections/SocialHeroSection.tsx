import { Button } from "@/components/ui/button";
import { Instagram, Sparkles } from "lucide-react";
import heroStudio from "@/assets/hero-studio.jpg";

export function SocialHeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroStudio}
          alt="Music studio"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Community Showcase</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            The Heartbeat of{" "}
            <span className="text-gradient">NXTwav</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Watch our community's music go viral. Real artists, real impact, real success stories.
            Celebrate the wins that prove our education works.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white"
              asChild
            >
              <a href="https://www.instagram.com/nxtwavacademy/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 mr-2" />
                Follow on Instagram
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10"
              asChild
            >
              <a href="https://soundcloud.com/nxtwavacademy" target="_blank" rel="noopener noreferrer">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 mr-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.562 16.216h.463v-6.936l-.463.155v6.781zm-1.385-.461h.463V9.754l-.463.784v5.217zm-1.387-.768h.463V11.23l-.463.538v3.717zm-1.386-.77h.463v-2.34l-.463.078v2.262zm-1.387-.23h.463v-.539H5.53v.539zm7.394 2.229h7.322c1.7 0 3.078-1.378 3.078-3.078s-1.378-3.078-3.078-3.078c-.28 0-.547.037-.802.106-.29-2.008-2.015-3.562-4.102-3.562-.977 0-1.874.343-2.58.918-.21-.19-.462-.338-.737-.435v9.129z"/>
                </svg>
                Listen on SoundCloud
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

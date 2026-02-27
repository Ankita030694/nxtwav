import { Button } from "@/components/ui/button";
import { ArrowRight, Music2, MessageCircle, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function CommunityCtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Want to See <span className="text-gradient">Your Music</span> Here?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10">
            Join the NXTwav community and start your journey from student to 
            streaming sensation. Whether you're just starting out or ready to level up, 
            we have a path for you.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-gradient-cta hover:opacity-90 text-primary-foreground"
              asChild
            >
              <Link to="/courses">
                <Music2 className="w-5 h-5 mr-2" />
                Explore Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-muted"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact for Feature
            </Button>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground mb-4">Join our community</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/nxtwavacademy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-muted hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all group"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-muted-foreground group-hover:text-white" />
              </a>
              <a
                href="https://www.youtube.com/@nxtwavacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-muted hover:bg-[#FF0000] transition-all group"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6 text-muted-foreground group-hover:text-white" />
              </a>
              <a
                href="https://soundcloud.com/nxtwavacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-muted hover:bg-[#ff5500] transition-all group"
                aria-label="SoundCloud"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 fill-muted-foreground group-hover:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.562 16.216h.463v-6.936l-.463.155v6.781zm-1.385-.461h.463V9.754l-.463.784v5.217zm-1.387-.768h.463V11.23l-.463.538v3.717zm-1.386-.77h.463v-2.34l-.463.078v2.262zm-1.387-.23h.463v-.539H5.53v.539zm7.394 2.229h7.322c1.7 0 3.078-1.378 3.078-3.078s-1.378-3.078-3.078-3.078c-.28 0-.547.037-.802.106-.29-2.008-2.015-3.562-4.102-3.562-.977 0-1.874.343-2.58.918-.21-.19-.462-.338-.737-.435v9.129z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

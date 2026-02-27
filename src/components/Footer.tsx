import { Link } from "react-router-dom";
import { Headphones, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-cta flex items-center justify-center">
                <Headphones className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                NXTwav<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Transforming aspiring musicians into professional producers and DJs with
              guaranteed career outcomes.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/nxtwavacademy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@nxtwavacademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://soundcloud.com/nxtwavacademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors"
                aria-label="SoundCloud"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.562 16.216h.463v-6.936l-.463.155v6.781zm-1.385-.461h.463V9.754l-.463.784v5.217zm-1.387-.768h.463V11.23l-.463.538v3.717zm-1.386-.77h.463v-2.34l-.463.078v2.262zm-1.387-.23h.463v-.539H5.53v.539zm7.394 2.229h7.322c1.7 0 3.078-1.378 3.078-3.078s-1.378-3.078-3.078-3.078c-.28 0-.547.037-.802.106-.29-2.008-2.015-3.562-4.102-3.562-.977 0-1.874.343-2.58.918-.21-.19-.462-.338-.737-.435v9.129z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary text-sm transition-colors">Courses</Link></li>

              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary text-sm transition-colors">Pricing</Link></li>

              <li><a href="#faq" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary text-sm transition-colors">Blog</Link></li>
              <li><Link to="/interactive-learning" className="text-muted-foreground hover:text-primary text-sm transition-colors">Interactive Learning</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get production tips, industry insights, and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-muted border-border"
              />
              <Button className="bg-gradient-cta hover:opacity-90 text-primary-foreground shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 NXTwav Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";
import nxtwavLogo from "@/assets/nxtwav-logo-v2.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/interactive-learning", label: "Interactive Learning" },
  { href: "/pricing", label: "Pricing" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img 
            src={nxtwavLogo} 
            alt="NXTwav Academy" 
            className="h-10 md:h-12 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA / User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <UserMenu />
          ) : (
            <>

              <Button size="sm" className="bg-gradient-cta hover:opacity-90 text-primary-foreground" asChild>
                <a href="/auth/signup">Start Learning</a>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              {loading ? (
                <div className="h-10 bg-muted animate-pulse rounded" />
              ) : user ? (
                <>
                  <Button variant="ghost" size="sm" asChild onClick={() => setIsOpen(false)}>
                    <a href="/dashboard">Dashboard</a>
                  </Button>
                  <UserMenu />
                </>
              ) : (
                <>

                  <Button size="sm" className="bg-gradient-cta hover:opacity-90 text-primary-foreground" asChild onClick={() => setIsOpen(false)}>
                    <a href="/auth/signup">Start Learning</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
